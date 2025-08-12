import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { DonationConfirmationEmail } from "./_templates/donation-confirmation.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonationEmailData {
  donor_name: string;
  donor_email: string;
  amount: number; // Amount in cents
  currency: string;
  donation_id: string;
  is_recurring: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Send donation email function called");

  try {
    // Parse request body
    const requestBody = await req.text();
    console.log("Raw request body:", requestBody);
    
    const data: DonationEmailData = JSON.parse(requestBody);
    console.log("Parsed donation data:", data);

    const { donor_name, donor_email, amount, currency, donation_id, is_recurring } = data;

    if (!donor_name || !donor_email || !amount) {
      console.error("Missing required fields:", { donor_name, donor_email, amount });
      return new Response(
        JSON.stringify({ error: "Missing required fields: donor_name, donor_email, amount" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Rendering email template...");

    // Render the email template
    const emailHtml = await renderAsync(
      React.createElement(DonationConfirmationEmail, {
        donorName: donor_name,
        donationAmount: amount / 100, // Convert cents to dollars
        donationId: donation_id,
        isRecurring: is_recurring || false
      })
    );

    console.log("Email template rendered successfully");

    // Send confirmation email to donor
    console.log(`Sending confirmation email to donor: ${donor_email}`);
    const donorEmailResult = await resend.emails.send({
      from: "Genius Recovery <hello@geniusrecovery.org>",
      to: [donor_email],
      subject: "Thank you for your donation to Genius Recovery",
      html: emailHtml,
    });

    console.log("Donor email result:", donorEmailResult);

    if (donorEmailResult.error) {
      console.error("Failed to send donor email:", donorEmailResult.error);
      throw donorEmailResult.error;
    }

    // Send notification email to admin
    try {
      console.log("Sending notification email to admin...");
      const adminEmailResult = await resend.emails.send({
        from: "Genius Recovery <hello@geniusrecovery.org>",
        to: ["hello@geniusrecovery.org"],
        subject: `New donation received: $${(amount / 100).toFixed(2)}`,
        html: `
          <h2>New Donation Received</h2>
          <p><strong>Donor:</strong> ${donor_name}</p>
          <p><strong>Email:</strong> ${donor_email}</p>
          <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)} ${currency}</p>
          <p><strong>Donation ID:</strong> ${donation_id}</p>
          <p><strong>Type:</strong> ${is_recurring ? 'Recurring' : 'One-time'}</p>
          <p><strong>Date:</strong> ${new Date().toISOString()}</p>
        `,
      });

      console.log("Admin email result:", adminEmailResult);
    } catch (adminEmailError) {
      console.error("Failed to send admin email (non-critical):", adminEmailError);
      // Don't fail the whole process if admin email fails
    }

    console.log("Donation emails sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Donation confirmation emails sent successfully",
        donorEmailId: donorEmailResult.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-donation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send donation emails" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);