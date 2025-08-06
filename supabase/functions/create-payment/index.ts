import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency = "USD", isRecurring = false, customerEmail } = await req.json();

    if (!amount || amount < 1) {
      throw new Error("Invalid amount");
    }

    // Get the private key from Supabase secrets
    const privateKey = Deno.env.get("CHECKOUT_PRIVATE_KEY");

    if (!privateKey) {
      throw new Error("Payment gateway private key not configured");
    }

    console.log("Creating payment session for amount:", amount, "currency:", currency, "recurring:", isRecurring);

    // Checkout.com API endpoint for creating payment sessions
    const apiUrl = "https://api.checkout.com/hosted-payments";
    
    // Create payment session payload for Checkout.com
    const paymentData = {
      amount: amount * 100, // Convert to cents
      currency: currency.toUpperCase(),
      reference: `donation-${Date.now()}`,
      description: `Genius Recovery ${isRecurring ? 'Monthly' : 'One-time'} Donation`,
      customer: customerEmail ? { email: customerEmail } : undefined,
      success_url: `${req.headers.get("origin")}/payment-success`,
      failure_url: `${req.headers.get("origin")}/payment-failed`,
      cancel_url: `${req.headers.get("origin")}/donation`,
      metadata: {
        donation_type: isRecurring ? "monthly" : "one_time",
        organization: "Genius Recovery"
      },
      billing: isRecurring ? {
        plan: {
          type: "recurring",
          interval: "month",
          interval_count: 1
        }
      } : undefined
    };

    console.log("Sending request to Checkout.com with data:", JSON.stringify(paymentData, null, 2));

    // Make payment request to Checkout.com
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${privateKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    console.log("Checkout.com response status:", response.status);
    console.log("Checkout.com response headers:", Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log("Checkout.com response body:", responseText);

    if (!response.ok) {
      console.error("Payment creation failed with status:", response.status);
      throw new Error(`Payment gateway error: ${response.status} - ${responseText}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
      throw new Error("Invalid response from payment gateway");
    }

    console.log("Payment session created successfully:", result);

    return new Response(JSON.stringify({ 
      payment_url: result._links?.redirect?.href || result.url || result.redirect_url,
      payment_id: result.id,
      status: result.status 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Payment processing error:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Payment processing failed",
      details: error.toString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});