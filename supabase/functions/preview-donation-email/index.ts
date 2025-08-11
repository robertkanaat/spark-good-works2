import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { DonationConfirmationEmail } from '../send-donation-email/_templates/donation-confirmation.tsx';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Render a sample donation email for preview
    const emailHtml = await renderAsync(
      React.createElement(DonationConfirmationEmail, {
        donor_name: "Sarah Johnson",
        amount: 10000, // $100.00 in cents
        currency: "USD",
        donation_id: "donation-preview-12345",
        donation_date: new Date().toISOString(),
        is_recurring: false,
        frequency: "monthly"
      })
    );

    // Return the HTML for preview in browser
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
      JSON.stringify({ 
        success: false, 
        error: "Failed to render email preview" 
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