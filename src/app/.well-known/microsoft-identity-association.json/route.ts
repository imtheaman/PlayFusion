import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      associatedApplications: [
        { applicationId: 'd8cdc6ac-51da-4cdc-a6ef-918d21575ba3' },
      ],
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
