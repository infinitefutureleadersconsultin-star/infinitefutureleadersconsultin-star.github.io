import { Resend } from 'resend';

/**
 * Lazy-initialized Resend client
 * Created only when needed to avoid build-time errors
 */
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
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
      from: 'Infinite Future Leaders <noreply@infinitefutureleaders.com>',
      to: recipient,
      subject: `${devNote}${subject}`,
      html,
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
