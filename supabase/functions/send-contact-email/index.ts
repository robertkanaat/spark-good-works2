import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Will be restricted in production
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY", 
  "X-XSS-Protection": "1; mode=block",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, subject, message }: ContactFormData = await req.json();
    
    // Basic input validation
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid email address" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to denise.mcintyre@joepolish.com
    const emailToDirector = await resend.emails.send({
      from: "Genius Recovery Contact Form <noreply@geniusrecovery.org>",
      to: ["denise.mcintyre@joepolish.com"],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
            <p>This message was sent from the Genius Recovery contact form on ${new Date().toLocaleString()}.</p>
            <p>Please respond directly to: ${email}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the person who submitted the form
    const confirmationEmail = await resend.emails.send({
      from: "Genius Recovery <noreply@geniusrecovery.org>",
      to: [email],
      subject: "Thank you for contacting Genius Recovery",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Genius Recovery</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              line-height: 1.6; 
              color: #1c1917; 
              background: #f8fafc;
              margin: 0;
              padding: 20px;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.15);
            }
            .header {
              background: #ffffff;
              padding: 40px 30px;
              text-align: center;
              color: #1c1917;
              border-bottom: 1px solid #e5e7eb;
            }
            .logo {
              max-width: 200px;
              height: auto;
              margin-bottom: 10px;
            }
            .header-subtitle {
              font-size: 16px;
              opacity: 0.95;
              font-weight: 300;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 24px;
              font-weight: 600;
              color: #1c1917;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              color: #44403c;
              margin-bottom: 25px;
              line-height: 1.7;
            }
            .highlight-box {
              background: linear-gradient(145deg, rgba(245, 158, 11, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%);
              border-left: 4px solid #f59e0b;
              padding: 25px;
              margin: 30px 0;
              border-radius: 8px;
            }
            .highlight-title {
              font-size: 18px;
              font-weight: 600;
              color: #ea580c;
              margin-bottom: 15px;
            }
            .emergency-list {
              list-style: none;
              margin: 15px 0;
            }
            .emergency-list li {
              margin: 8px 0;
              padding-left: 20px;
              position: relative;
            }
            .emergency-list li:before {
              content: "🆘";
              position: absolute;
              left: 0;
            }
            .emergency-number {
              font-weight: 600;
              color: #dc2626;
            }
            .mission-statement {
              text-align: center;
              padding: 30px;
              background: linear-gradient(145deg, rgba(245, 158, 11, 0.03) 0%, rgba(249, 115, 22, 0.03) 100%);
              border-radius: 8px;
              margin: 30px 0;
            }
            .mission-text {
              font-size: 18px;
              font-weight: 500;
              background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            .footer {
              text-align: center;
              padding: 30px;
              border-top: 1px solid #f3f4f6;
              background: #fafaf9;
            }
            .footer-text {
              font-size: 14px;
              color: #78716c;
              margin-bottom: 5px;
            }
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%);
              margin: 20px 0;
            }
            @media only screen and (max-width: 600px) {
              .container { margin: 10px; border-radius: 8px; }
              .header, .content { padding: 25px 20px; }
              .greeting { font-size: 20px; }
              .message { font-size: 15px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://geniusrecovery.org/lovable-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png" alt="Genius Recovery" class="logo">
              <div class="header-subtitle">On A Mission To Heal Addiction Around The World</div>
            </div>
            
            <div class="content">
              <div class="greeting">Thank You, ${firstName}! 🙏</div>
              
              <div class="message">
                We've received your message and are truly grateful that you reached out to us. Your journey matters, and we're honored to be part of it.
              </div>
              
              <div class="message">
                Our team will review your message carefully and get back to you as soon as possible. We're committed to providing you with the support and resources you need.
              </div>
              
              <div class="divider"></div>
              
              <div class="highlight-box">
                <div class="highlight-title">🚨 Need Immediate Support?</div>
                <div class="message">If you're experiencing a crisis, don't wait for our response. Help is available 24/7:</div>
                <ul class="emergency-list">
                  <li><span class="emergency-number">Call 988</span> - Suicide & Crisis Lifeline</li>
                  <li><span class="emergency-number">Call 911</span> - For immediate emergencies</li>
                  <li><span class="emergency-number">Call 1-800-662-4357</span> - SAMHSA National Helpline</li>
                </ul>
              </div>
              
              <div class="mission-statement">
                <div class="mission-text">One Human At A Time</div>
                <div style="color: #78716c; font-size: 14px;">
                  Every person's recovery journey is unique, and we're here to support yours with compassion and expertise.
                </div>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">
                This is an automated confirmation. Please do not reply to this email.
              </div>
              <div class="footer-text">
                © ${new Date().getFullYear()} Genius Recovery. All rights reserved.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Force redeploy - using verified domain
    console.log("Emails sent successfully:", { emailToDirector, confirmationEmail });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Log more specific error information
    if (error.name) console.error("Error name:", error.name);
    if (error.message) console.error("Error message:", error.message);
    if (error.response) console.error("Error response:", error.response);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error" // Don't expose detailed error messages
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);