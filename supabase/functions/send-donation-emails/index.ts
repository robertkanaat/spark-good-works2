import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Get payments that need emails sent
    const { data: payments, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'completed')
      .eq('email_sent', false)
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('Failed to fetch payments:', fetchError);
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const results = [];

    for (const payment of payments || []) {
      try {
        console.log(`Sending emails for payment ${payment.id}...`);

        // Send donor confirmation email
        const donorEmailResult = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: [payment.donor_email],
          subject: "Thank you for your donation to Genius Recovery",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #2563eb; text-align: center;">Thank You for Your Donation!</h1>
              
              <p>Dear ${payment.donor_name},</p>
              
              <p>Thank you so much for your generous donation of <strong>$${payment.amount.toFixed(2)}</strong> to Genius Recovery.</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #374151;">Donation Details:</h3>
                <p style="margin: 5px 0;"><strong>Amount:</strong> $${payment.amount.toFixed(2)}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(payment.created_at).toLocaleDateString()}</p>
                <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${payment.stripe_session_id}</p>
              </div>
              
              <p>Your support helps us continue our mission to provide resources and support for addiction recovery. Every donation makes a real difference in someone's journey to recovery.</p>
              
              <p>If you have any questions about your donation, please don't hesitate to contact us at hello@geniusrecovery.org.</p>
              
              <p>With gratitude,<br>The Genius Recovery Team</p>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                  This email confirms your donation. Please keep it for your records.
                </p>
              </div>
            </div>
          `,
        });

        // Send admin notification email
        const adminEmailResult = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["hello@geniusrecovery.org"],
          subject: `New donation received: $${payment.amount.toFixed(2)}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #dc2626;">New Donation Received</h2>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="margin: 0 0 15px 0; color: #374151;">Donation Details:</h3>
                <p style="margin: 5px 0;"><strong>Donor:</strong> ${payment.donor_name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${payment.donor_email}</p>
                <p style="margin: 5px 0;"><strong>Amount:</strong> $${payment.amount.toFixed(2)}</p>
                <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${payment.stripe_session_id}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(payment.created_at).toISOString()}</p>
              </div>
              
              <p style="margin-top: 20px;">This donation has been processed successfully through INCHEK payment gateway.</p>
            </div>
          `,
        });

        // Mark email as sent
        const { error: updateError } = await supabase
          .from('payments')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString()
          })
          .eq('id', payment.id);

        if (updateError) {
          console.error(`Failed to update payment ${payment.id}:`, updateError);
        }

        results.push({
          payment_id: payment.id,
          donor_email: donorEmailResult,
          admin_email: adminEmailResult,
          success: true
        });

        console.log(`Emails sent successfully for payment ${payment.id}`);

      } catch (emailError) {
        console.error(`Failed to send emails for payment ${payment.id}:`, emailError);
        results.push({
          payment_id: payment.id,
          error: emailError.message,
          success: false
        });
      }
    }

    return new Response(JSON.stringify({
      message: `Processed ${payments?.length || 0} payments`,
      results
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (error) {
    console.error('Failed to process donation emails:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
});