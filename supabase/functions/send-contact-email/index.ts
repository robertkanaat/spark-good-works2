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

    // Send email to robert@joepolish.com
    const emailToDirector = await resend.emails.send({
      from: "Genius Recovery Contact Form <onboarding@resend.dev>",
      to: ["robert@joepolish.com"],
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
      from: "Genius Recovery <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Genius Recovery",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">Thank You for Reaching Out</h1>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Dear ${firstName},</p>
            <p>Thank you for contacting Genius Recovery. We have received your message and will get back to you as soon as possible.</p>
            <p>Your message is important to us, and we're committed to helping you on your journey.</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Need Immediate Support?</h3>
            <p style="margin-bottom: 10px;">If you're experiencing a crisis, don't wait for our response:</p>
            <ul style="margin: 10px 0;">
              <li><strong>Call 988</strong> - Suicide & Crisis Lifeline</li>
              <li><strong>Call 911</strong> - For immediate emergencies</li>
              <li><strong>Call 1-800-662-4357</strong> - SAMHSA National Helpline</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b;">
              On A Mission To Heal Addiction Around The World One Human At A Time
            </p>
            <p style="color: #64748b; font-size: 14px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    });

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