from __future__ import annotations

import plistlib
import uuid
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional

from flask import Flask, Response, jsonify, request

APPLE_MDM_CONTENT_TYPE = "application/x-apple-aspen-mdm"
BASELINE_PROFILE_PATH = Path(__file__).resolve().parent / "profiles" / "safeweb_baseline.mobileconfig"


@dataclass
class Command:
    uuid: str
    body: Dict


@dataclass
class DeviceState:
    udid: str
    push_magic: str
    token: bytes
    unlock_token: Optional[bytes]
    commands: List[Command] = field(default_factory=list)
    last_status: Optional[str] = None
    last_command: Optional[str] = None


app = Flask(__name__)
devices: Dict[str, DeviceState] = {}


def _load_baseline_profile() -> bytes:
    if not BASELINE_PROFILE_PATH.exists():
        raise FileNotFoundError(f"Missing baseline profile at {BASELINE_PROFILE_PATH}")
    return BASELINE_PROFILE_PATH.read_bytes()


def queue_baseline_profile(device: DeviceState) -> None:
    profile_bytes = _load_baseline_profile()
    command_uuid = str(uuid.uuid4()).upper()
    install_profile_command = {
        "RequestType": "InstallProfile",
        "Payload": profile_bytes,
    }
    device.commands.append(Command(uuid=command_uuid, body=install_profile_command))
    app.logger.info("Queued baseline profile for device %s as %s", device.udid, command_uuid)


@app.post("/mdm/checkin")
def mdm_checkin() -> Response:
    payload = plistlib.loads(request.data)
    message_type = payload.get("MessageType")
    udid = payload.get("UDID")

    if not message_type:
        return Response("Missing MessageType", status=400)

    if message_type == "Authenticate":
        app.logger.info("Authenticate from UDID %s", udid)
        return Response(status=200)

    if message_type == "TokenUpdate":
        if not udid:
            return Response("Missing UDID", status=400)

        device = devices.get(udid)
        if device:
            device.token = payload.get("Token", device.token)
            device.push_magic = payload.get("PushMagic", device.push_magic)
            device.unlock_token = payload.get("UnlockToken", device.unlock_token)
            app.logger.info("Refreshed tokens for UDID %s", udid)
        else:
            device = DeviceState(
                udid=udid,
                push_magic=payload.get("PushMagic", ""),
                token=payload.get("Token", b""),
                unlock_token=payload.get("UnlockToken"),
            )
            devices[udid] = device
            app.logger.info("Registered new device with UDID %s", udid)

        queue_baseline_profile(device)
        return Response(status=200)

    if message_type == "CheckOut":
        if udid and udid in devices:
            devices.pop(udid)
            app.logger.info("Device %s checked out and was removed", udid)
        return Response(status=200)

    return Response(f"Unsupported MessageType: {message_type}", status=400)


@app.post("/mdm/connect")
def mdm_connect() -> Response:
    payload = plistlib.loads(request.data)
    udid = payload.get("UDID")
    status = payload.get("Status")
    command_uuid = payload.get("CommandUUID")

    if udid and command_uuid and status and udid in devices:
        device = devices[udid]
        device.last_status = status
        device.last_command = command_uuid
        app.logger.info("Device %s reported %s for command %s", udid, status, command_uuid)

    if not udid:
        return Response("Missing UDID", status=400)

    device = devices.get(udid)
    if not device:
        app.logger.warning("Connect from unknown UDID %s", udid)
        return Response(plistlib.dumps({}), mimetype=APPLE_MDM_CONTENT_TYPE)

    if not device.commands:
        return Response(plistlib.dumps({}), mimetype=APPLE_MDM_CONTENT_TYPE)

    command = device.commands.pop(0)
    response_payload = {
        "CommandUUID": command.uuid,
        "Command": command.body,
    }
    return Response(plistlib.dumps(response_payload), mimetype=APPLE_MDM_CONTENT_TYPE)


@app.get("/admin/devices")
def list_devices() -> Response:
    serialized = []
    for device in devices.values():
        serialized.append(
            {
                "udid": device.udid,
                "queued_commands": len(device.commands),
                "last_status": device.last_status,
                "last_command": device.last_command,
                "has_unlock_token": device.unlock_token is not None,
            }
        )
    return jsonify(serialized)


@app.post("/admin/devices/<udid>/queue/baseline")
def admin_queue_baseline(udid: str) -> Response:
    device = devices.get(udid)
    if not device:
        return Response(status=404)

    queue_baseline_profile(device)
    return Response(status=202)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
