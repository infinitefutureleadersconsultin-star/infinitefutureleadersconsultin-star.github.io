import { getFirstName } from '../utils/formatting';

/**
 * Email template for when client clicks "Ready to Post"
 * Sent to admin
 */
export function readyToPostEmail(data: {
  clientName: string;
  appName: string;
  primaryGoal: string;
  adminDashboardUrl: string;
}) {
  return {
    subject: `Ready to Post: ${data.appName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            .details { background: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎬 Client Ready for Video Posting</h1>
            </div>
            <div class="content">
              <p><strong>${data.clientName}</strong> has indicated they are ready for you to post their video.</p>

              <div class="details">
                <h3 style="margin-top: 0;">Project Details:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li><strong>App:</strong> ${data.appName}</li>
                  <li><strong>Primary Goal:</strong> ${data.primaryGoal}</li>
                </ul>
              </div>

              <p>All project details and client information are available in your admin dashboard.</p>

              <a href="${data.adminDashboardUrl}" class="button">View in Admin Dashboard →</a>
            </div>
            <div class="footer">
              <p>Infinite Future Leaders Consulting • Client Management Portal</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

/**
 * Email template for when video is posted
 * Sent to client
 */
export function videoPostedEmail(data: {
  clientName: string;
  videoUrl: string;
  dashboardUrl: string;
}) {
  const firstName = getFirstName(data.clientName);

  return {
    subject: '🎉 Your Video is Live!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 10px 0; font-weight: 600; }
            .button.primary { background: #2563eb; }
            .steps { background: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .steps ol { margin: 0; padding-left: 20px; }
            .steps li { margin: 10px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">🎉</h1>
              <h2 style="margin: 10px 0 0 0;">Your Video is Live!</h2>
            </div>
            <div class="content">
              <p>Hey ${firstName},</p>
              <p>Great news! Your app review video has been posted and is now live on TikTok.</p>

              <div style="text-align: center;">
                <a href="${data.videoUrl}" class="button">🎬 Watch Your Video</a>
              </div>

              <div class="steps">
                <h3 style="margin-top: 0;">Next Steps:</h3>
                <ol>
                  <li>Watch the video and share it with your team</li>
                  <li>Complete your final 50% payment to close out the project</li>
                  <li>Track the performance as views come in</li>
                </ol>
              </div>

              <p><a href="${data.dashboardUrl}" class="button primary">Go to Your Dashboard →</a></p>

              <p>Thanks for trusting me with your app!</p>
              <p style="margin-top: 30px;">
                <strong>Issiah Mclean</strong><br>
                @zaydevelops
              </p>
            </div>
            <div class="footer">
              <p>Infinite Future Leaders Consulting</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

/**
 * Email template for when final payment is received
 * Sent to admin
 */
export function paymentCompleteEmail(data: {
  clientName: string;
  appName: string;
  totalAmount: number;
}) {
  return {
    subject: `💰 Payment Complete: ${data.appName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .details { background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #10b981; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">💰 Final Payment Received</h1>
            </div>
            <div class="content">
              <p><strong>${data.clientName}</strong> has completed their final payment.</p>

              <div class="details">
                <ul style="margin: 0; padding-left: 20px;">
                  <li><strong>App:</strong> ${data.appName}</li>
                  <li><strong>Total Project Value:</strong> $${data.totalAmount.toFixed(2)}</li>
                </ul>
              </div>

              <p style="text-align: center; font-size: 24px; margin: 30px 0;">🎉 This project is now complete!</p>
            </div>
            <div class="footer">
              <p>Infinite Future Leaders Consulting • Client Management Portal</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

/**
 * Email template for discovery call booking reminders
 * Sent to client
 */
export function discoveryCallReminderEmail(data: {
  clientName: string;
  daysRemaining: number;
  calendlyUrl: string;
}) {
  const firstName = getFirstName(data.clientName);

  return {
    subject: `Reminder: Book Your Discovery Call (${data.daysRemaining} days remaining)`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 15px 0; font-weight: 600; }
            .warning { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #f59e0b; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">⏰ Discovery Call Reminder</h2>
            </div>
            <div class="content">
              <p>Hey ${firstName},</p>
              <p>You've paid your discovery call fee but haven't booked your call yet.</p>

              <div class="warning">
                <p style="margin: 0;"><strong>⚠️ ${data.daysRemaining} days remaining</strong></p>
                <p style="margin: 5px 0 0 0;">Your booking fee will expire in ${data.daysRemaining} days if not used.</p>
              </div>

              <p>Let's get your call scheduled! The discovery call is a great opportunity to discuss your app, align on goals, and determine the best approach for your campaign.</p>

              <div style="text-align: center;">
                <a href="${data.calendlyUrl}" class="button">📅 Book Your Call Now</a>
              </div>

              <p>Looking forward to speaking with you!</p>
              <p style="margin-top: 30px;">
                <strong>Issiah Mclean</strong><br>
                @zaydevelops
              </p>
            </div>
            <div class="footer">
              <p>Infinite Future Leaders Consulting</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
