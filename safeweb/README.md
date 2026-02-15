SafeWeb iOS Hardening Plan
==========================

This document captures the work required to deliver a resilient, parental-control experience on Apple platforms that mirrors the Android posture already built into SafeWeb. The focus is on using Apple’s supported supervision and management hooks so the solution survives device wipes, resists tampering, and stays App Store compliant.

1. Prepare Apple infrastructure
-------------------------------

- Enroll the company in **Apple Business Manager (ABM)** (or Apple School Manager for education use).
  - Add all corporate/parental Apple IDs as administrators.
  - Accept the MDM and automated device enrollment terms of service.
- Select a reseller/distributor that supports automated device enrollment (DEP) and link their reseller ID inside ABM so every purchased device is automatically assigned to SafeWeb’s MDM server.
- Request **Managed Apple IDs** for guardians/administrators who will approve parental-control changes.

2. Stand up the MDM service
---------------------------

- Either integrate with a commercial MDM (Jamf, Kandji, Mosyle, etc.) or build a bespoke MDM server that implements Apple’s MDM protocol.
  - Generate the APNs Push Certificate via ABM and upload it to the MDM.
  - Implement device enrollment, command queueing, and profile delivery APIs.
  - Store device inventory (serial, push token, supervision status, last check-in).
- Define configuration profiles to deliver through the MDM:
  - **Restrictions** payload: disable account changes, iCloud pairing, profile removal, AirDrop, and erase options.
  - **DNS Proxy / Content Filter** payloads: point traffic at SafeWeb’s AdGuard DNS relay and block VPN changes.
  - **Always-on VPN** profile (per-app or device-wide) for enforced tunnelling if a Network Extension is deployed.
  - **Single App Mode / Autonomous Single App Mode** for kiosk scenarios, if needed.
- Implement compliance monitoring so any failed profile installs or tamper attempts raise alerts.

3. Enforce supervised enrollment
--------------------------------

- Create an Automated Device Enrollment profile in ABM that:
  - Forces supervision.
  - Skips consumer-focused Setup Assistant panes (Apple ID, Siri, etc.).
  - Requires enrollment with the SafeWeb MDM server during activation.
  - Blocks “Depersonalize”/“Remove MDM” actions in Settings.
- Test the flow with a staging device: erase the device, confirm it auto-enrolls, and see that SafeWeb profiles are non-removable without MDM approval.

4. Build the SafeWeb iOS agent
------------------------------

- Implement a Screen Time-enabled app using **FamilyControls**, **ManagedSettings**, and **DeviceActivity** frameworks (iOS 16+).
  - Parent companion app: approves requests, manages schedules, and authenticates with Managed Apple ID (MFA recommended).
  - Child agent app: enforces local restrictions using Screen Time APIs, reports usage to the backend, and obeys MDM-installed profiles.
- Handle background refresh to sync policy changes from the SafeWeb cloud service (careful with Background Tasks limitations).
- Integrate with the MDM backend so the agent can request temporary overrides or profile updates.

5. Optional Network Extension
-----------------------------

- If DNS filtering must stay on-device, build a **DNS Proxy** or **Packet Tunnel** Network Extension.
  - Ship the extension inside the SafeWeb agent.
  - Create a supervised-only VPN payload that sets it as always-on and prevents user removal.
  - Ensure the extension exposes health signals back to the MDM (e.g., via a managed app configuration or custom API).

6. Parent workflow & compliance
-------------------------------

- Provide a management UI (web or parent app) tied to SafeWeb’s backend to:
  - View device health (supervision active, profiles installed, Screen Time status).
  - Rotate FRP-like recovery codes (ABM “bypass” codes) if parents forget their Managed Apple ID passwords.
  - Trigger remote actions (lock device, clear Screen Time passcodes, schedule downtime).
- Document recovery procedures if parents lose access (e.g., how to use ABM bypass codes, how to re-enroll devices).

7. Release readiness
--------------------

- Confirm all App Store Review guidelines for parental-control apps are met (especially Screen Time entitlement requirements).
- Provide in-app disclosure about data collection/storage to satisfy Apple’s privacy guidelines.
- Run supervised device regression tests after OS upgrades (beta builds) to ensure profiles and Screen Time integrations still apply.

8. Next steps
-------------

1. Acquire a test iPhone/iPad, enroll it in ABM, and validate the automated device enrollment flow.
2. Prototype the minimal MDM backend (even if using a hosted service) to push restrictions/DNS profiles.
3. Build the Screen Time agent skeleton to confirm it can apply app/web limits under supervision.
4. Iterate on UI/UX, reporting, and parental workflows before scaling to production hardware.

By anchoring SafeWeb to Apple’s supervised MDM stack and Screen Time APIs, we achieve the same “hard-to-remove” posture as the Android device-owner approach without stepping outside Apple’s supported boundaries.

MDM Prototype
-------------

- `mdm/profiles/safeweb_baseline.mobileconfig` enforces SafeWeb DNS over HTTPS and blocks users from adding VPN configurations. Update the server URL or payload UUIDs as you evolve the rollout.
- `mdm/server.py` hosts a minimal Apple MDM endpoint. Enrolled devices receive the baseline profile immediately after the `TokenUpdate` check-in.
- `mdm/requirements.txt` lists the runtime dependencies (Flask and Gunicorn). Create a Python 3.12 virtual environment, run `pip install -r mdm/requirements.txt`, then launch the service with `python mdm/server.py`.
- Test with Apple Configurator or a supervised test device: point the DEP/MDM profile at this server, confirm the device installs the profile, and verify that DNS resolution funnels through SafeWeb while VPN controls are unavailable in Settings.
- Deploy to Google App Engine by placing `mdm/app.yaml` at the service root and running `gcloud app deploy mdm/app.yaml` once you configure your project (App Engine runtime pinned to Python 3.12).
