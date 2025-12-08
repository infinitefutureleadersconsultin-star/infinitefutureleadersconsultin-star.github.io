import { NextRequest, NextResponse } from 'next/server';
import { createFinalCheckoutSession } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, userId, appName, finalAmountCents } = body;

    // Validation
    if (!submissionId || !userId || !appName || !finalAmountCents) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createFinalCheckoutSession(
      submissionId,
      userId,
      appName,
      finalAmountCents
    );

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Error creating final checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
