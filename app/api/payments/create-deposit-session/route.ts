import { NextRequest, NextResponse } from 'next/server';
import { createDepositCheckoutSession } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, userId, appName, depositAmountCents } = body;

    // Validation
    if (!submissionId || !userId || !appName || !depositAmountCents) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createDepositCheckoutSession(
      submissionId,
      userId,
      appName,
      depositAmountCents
    );

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Error creating deposit checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
