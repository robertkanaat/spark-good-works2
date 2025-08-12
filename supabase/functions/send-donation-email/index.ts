import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { DonationConfirmationEmail } from './_templates/donation-confirmation.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY", 
  "X-XSS-Protection": "1; mode=block",
};

interface DonationEmailData {
  donor_name: string;
  donor_email: string;
  amount: number; // Amount in cents
  currency?: string;
  donation_id: string;
  is_recurring?: boolean;
  frequency?: string; // monthly, yearly, etc.
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Send donation email function called:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle GET request for email preview (for testing)
  if (req.method === "GET" && req.url.includes("preview")) {
    try {
      console.log("Rendering email preview...");
      
      const emailHtml = await renderAsync(
        React.createElement(DonationConfirmationEmail, {
          donor_name: "Sarah Johnson",
          amount: 10000, // $100.00 in cents
          currency: "USD",
          donation_id: "preview-12345",
          donation_date: new Date().toISOString(),
          is_recurring: false,
          frequency: "monthly"
        })
      );

      return new Response(emailHtml, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...corsHeaders,
        },
      });
    } catch (error: any) {
      console.error("Error rendering email preview:", error);
      return new Response(
        JSON.stringify({ error: "Failed to render email preview" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  }

  try {
    const {
      donor_name,
      donor_email,
      amount,
      currency = "USD",
      donation_id,
      is_recurring = false,
      frequency = "monthly"
    }: DonationEmailData = await req.json();

    console.log("Processing donation email for:", { donor_name, donor_email, amount, donation_id });

    // Basic input validation
    if (!donor_name?.trim() || !donor_email?.trim() || !amount || !donation_id?.trim()) {
      console.error("Missing required fields:", { donor_name, donor_email, amount, donation_id });
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields: donor_name, donor_email, amount, donation_id" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donor_email)) {
      console.error("Invalid email address:", donor_email);
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

    // Amount validation (should be positive integer in cents)
    if (typeof amount !== 'number' || amount <= 0) {
      console.error("Invalid amount:", amount);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Amount must be a positive number in cents" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Render the React email template
    console.log("Rendering email template...");
    const emailHtml = await renderAsync(
      React.createElement(DonationConfirmationEmail, {
        donor_name,
        amount,
        currency,
        donation_id,
        donation_date: new Date().toISOString(),
        is_recurring,
        frequency
      })
    );

    console.log("Email template rendered successfully");

    // Format amount for subject line
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);

    // Send confirmation email to donor
    console.log("Sending donation confirmation email...");
    const emailResponse = await resend.emails.send({
      from: "Genius Recovery <onboarding@resend.dev>",
      to: [donor_email],
      subject: `Thank you for your ${formattedAmount} donation to Genius Recovery! 🙏`,
      html: emailHtml,
    });

    console.log("Donation email sent successfully:", emailResponse);

    // Send notification to admin (optional)
    try {
      console.log("Sending admin notification...");
      const adminNotification = await resend.emails.send({
        from: "Genius Recovery Donations <onboarding@resend.dev>",
        to: ["denise.mcintyre@joepolish.com"],
        subject: `New ${is_recurring ? `${frequency} ` : ''}donation received: ${formattedAmount}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
              🎉 New Donation Received!
            </h2>
            
            <div style="background: linear-gradient(145deg, rgba(245, 158, 11, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="margin-top: 0; color: #1c1917;">Donation Details</h3>
              <p><strong>Donor Name:</strong> ${donor_name}</p>
              <p><strong>Email:</strong> ${donor_email}</p>
              <p><strong>Amount:</strong> ${formattedAmount}</p>
              <p><strong>Donation ID:</strong> ${donation_id}</p>
              <p><strong>Type:</strong> ${is_recurring ? `Recurring (${frequency})` : 'One-time'}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
              <p>Confirmation email has been automatically sent to the donor.</p>
              <p>This notification was generated automatically by the Genius Recovery donation system.</p>
            </div>
          </div>
        `,
      });

      console.log("Admin notification sent:", adminNotification);
    } catch (adminError) {
      console.error("Failed to send admin notification (non-critical):", adminError);
      // Don't fail the whole function if admin notification fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Donation confirmation email sent successfully",
        email_id: emailResponse.data?.id
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
    console.error("Error in send-donation-email function:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to send donation confirmation email" 
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