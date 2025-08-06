import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Get credentials
    const privateKey = Deno.env.get("CHECKOUT_PRIVATE_KEY");
    const publicKey = "checkout_public_NmyzpM3D3g952jwP8k6K26cWm5qe7cKU";
    const gatewayId = "949487";

    if (!privateKey) {
      throw new Error("Payment gateway private key not configured");
    }

    console.log("=== PAYMENT PROCESSING START ===");
    console.log("Amount:", amount);
    console.log("Currency:", currency);
    console.log("Recurring:", isRecurring);
    console.log("Customer Email:", customerEmail);
    console.log("Gateway ID:", gatewayId);
    console.log("Public Key:", publicKey);

    // Try multiple possible API endpoints and formats
    const possibleEndpoints = [
      "https://api.checkout.com/payments",
      "https://api.checkout.com/hosted-payments", 
      "https://gateway.checkout.com/api/v1/payments",
      "https://checkout.com/api/payments",
      `https://api.checkout.com/gateway/${gatewayId}/payments`
    ];

    // Base payment data
    const basePaymentData = {
      amount: amount * 100, // Convert to cents
      currency: currency.toUpperCase(),
      reference: `donation-${Date.now()}`,
      description: `Genius Recovery ${isRecurring ? 'Monthly' : 'One-time'} Donation`,
      success_url: `${req.headers.get("origin")}/payment-success`,
      failure_url: `${req.headers.get("origin")}/payment-failed`,
      cancel_url: `${req.headers.get("origin")}/donation`,
      metadata: {
        donation_type: isRecurring ? "monthly" : "one_time",
        organization: "Genius Recovery"
      }
    };

    // Add customer info if provided
    if (customerEmail) {
      basePaymentData.customer = { email: customerEmail };
    }

    // Add recurring info if needed
    if (isRecurring) {
      basePaymentData.billing = {
        plan: {
          name: `Monthly Donation - $${amount}`,
          plan_track_id: `monthly-${amount}`,
          interval: "1",
          interval_type: "month"
        }
      };
    }

    console.log("Payment data:", JSON.stringify(basePaymentData, null, 2));

    let lastError = null;
    
    // Try different authentication methods and endpoints
    const authMethods = [
      { header: "Authorization", value: `Bearer ${privateKey}` },
      { header: "Authorization", value: `Basic ${btoa(`${publicKey}:${privateKey}`)}` },
      { header: "X-API-Key", value: privateKey },
      { header: "Authorization", value: privateKey }
    ];

    for (const endpoint of possibleEndpoints) {
      for (const auth of authMethods) {
        try {
          console.log(`\n--- Trying endpoint: ${endpoint} with auth: ${auth.header} ---`);
          
          const headers = {
            "Content-Type": "application/json",
            [auth.header]: auth.value
          };
          
          const response = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(basePaymentData),
          });

          console.log("Response status:", response.status);
          console.log("Response headers:", Object.fromEntries(response.headers.entries()));

          const responseText = await response.text();
          console.log("Response body:", responseText);

          if (response.ok) {
            let result;
            try {
              result = JSON.parse(responseText);
            } catch (parseError) {
              console.log("Response is not JSON, treating as plain text");
              result = { redirect_url: responseText };
            }

            console.log("SUCCESS! Payment created:", result);

            // Look for different possible redirect URL fields
            const redirectUrl = result._links?.redirect?.href || 
                              result.url || 
                              result.redirect_url || 
                              result.payment_url ||
                              result.checkout_url;

            return new Response(JSON.stringify({ 
              payment_url: redirectUrl,
              payment_id: result.id || result.payment_id,
              status: result.status || "created",
              raw_response: result
            }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            });
          } else {
            lastError = `${endpoint} - ${response.status}: ${responseText}`;
            console.log("Failed:", lastError);
          }
        } catch (fetchError) {
          lastError = `${endpoint} - Network error: ${fetchError.message}`;
          console.log("Network error:", fetchError.message);
        }
      }
    }

    // If we get here, all attempts failed
    console.log("=== ALL ENDPOINTS FAILED ===");
    throw new Error(`All payment endpoints failed. Last error: ${lastError}`);

  } catch (error) {
    console.error("=== PAYMENT PROCESSING ERROR ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message || "Payment processing failed",
      details: error.toString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});