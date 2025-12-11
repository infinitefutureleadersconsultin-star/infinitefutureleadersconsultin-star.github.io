import { Resend } from 'resend';

/**
 * Lazy-initialized Resend client
 * Created only when needed to avoid build-time errors
 */
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * Send an email with automatic dev mode handling
 * In development, all emails go to admin email with a note
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const adminEmail = process.env.ADMIN_EMAIL!;

  // In development, override recipient and add note to subject
  const recipient = isDev ? adminEmail : to;
  const devNote = isDev ? `[DEV - Would send to: ${to}] ` : '';

  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: 'Infinite Future Leaders <onboarding@resend.dev>',
      to: recipient,
      subject: `${devNote}${subject}`,
      html,
      headers: {
        'X-Entity-Ref-ID': '123456789', // Disable click tracking
      },
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
