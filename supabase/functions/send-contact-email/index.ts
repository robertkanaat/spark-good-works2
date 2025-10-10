import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, subject, message, turnstileToken }: ContactEmailRequest = await req.json();

    console.log("Received contact request:", { firstName, lastName, email, subject });

    // Verify Cloudflare Turnstile token
    const turnstileSecret = Deno.env.get("CLOUDFLARE_TURNSTILE_SECRET_KEY");
    if (!turnstileSecret) {
      console.error("Turnstile secret key not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Verifying Turnstile token...");
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();
    console.log("Turnstile verification result:", turnstileResult);

    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return new Response(
        JSON.stringify({ error: "Verification failed. Please try again." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Turnstile verification successful, sending email...");

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Genius Recovery <notifications@geniusrecovery.org>",
      to: ["contact@geniusrecovery.org"], // Replace with actual recipient
      replyTo: email,
      subject: subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to user
    await resend.emails.send({
      from: "Genius Recovery <notifications@geniusrecovery.org>",
      to: [email],
      subject: "Thank You for Contacting Genius Recovery",
      html: `
        <h2>Thank you for reaching out, ${firstName}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>If you need immediate assistance, please call our support line or visit our emergency resources page.</p>
        <p>Best regards,<br>The Genius Recovery Team</p>
      `,
    });

    // Trigger Zapier webhook if configured
    const zapierWebhook = Deno.env.get("ZAPIER_CONTACT_WEBHOOK_URL");
    if (zapierWebhook) {
      console.log("Triggering Zapier webhook...");
      try {
        await fetch(zapierWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: phone || '',
            subject,
            message,
            timestamp: new Date().toISOString(),
            source: "contact-form"
          }),
        });
        console.log("Zapier webhook triggered successfully");
      } catch (zapierError) {
        console.error("Error triggering Zapier webhook:", zapierError);
        // Don't fail the entire request if webhook fails
      }
    } else {
      console.log("No Zapier webhook URL configured");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
