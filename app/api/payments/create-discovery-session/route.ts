import { NextRequest, NextResponse } from 'next/server';
import { createDiscoveryCheckoutSession } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, userId } = body;

    // Validation
    if (!submissionId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: submissionId and userId' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createDiscoveryCheckoutSession(submissionId, userId);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Error creating discovery checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
