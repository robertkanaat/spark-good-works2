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
    const publicKey = "checkout_public_NmyzpM3D3g952jwP8k6K26cWm5qe7cKU";
    const gatewayId = "949487";

    if (!privateKey) {
      throw new Error("Payment gateway private key not configured");
    }

    // Create payment request payload
    const paymentData = {
      amount: amount * 100, // Convert to cents
      currency: currency.toLowerCase(),
      reference: `donation-${Date.now()}`,
      description: `Genius Recovery ${isRecurring ? 'Monthly' : 'One-time'} Donation`,
      customer: customerEmail ? { email: customerEmail } : undefined,
      success_url: `${req.headers.get("origin")}/payment-success`,
      failure_url: `${req.headers.get("origin")}/payment-failed`,
      cancel_url: `${req.headers.get("origin")}/donation`,
      metadata: {
        donation_type: isRecurring ? "monthly" : "one_time",
        organization: "Genius Recovery"
      }
    };

    // If recurring, set up subscription
    if (isRecurring) {
      paymentData.payment_type = "Recurring";
      paymentData.billing = {
        plan: {
          name: `Monthly Donation - $${amount}`,
          plan_track_id: `monthly-${amount}`,
          auto_cap_time: "0",
          interval: "1",
          interval_type: "month"
        }
      };
    }

    console.log("Creating payment with data:", paymentData);

    // Make payment request to checkout gateway
    const response = await fetch("https://api.checkout.com/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${privateKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Payment creation failed:", result);
      throw new Error(result.error_type || "Payment creation failed");
    }

    console.log("Payment created successfully:", result);

    return new Response(JSON.stringify({ 
      payment_url: result._links?.redirect?.href || result.redirect_url,
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