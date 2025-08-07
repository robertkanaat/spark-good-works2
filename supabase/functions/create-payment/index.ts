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

    // Get INCHEK credentials from environment
    const securityKey = Deno.env.get("INCHEK_SECURITY_KEY");
    
    if (!securityKey) {
      // For testing purposes, use demo credentials
      console.log("Using demo credentials for testing");
    }

    console.log("=== INCHEK PAYMENT PROCESSING START ===");
    console.log("Amount:", amount);
    console.log("Currency:", currency);
    console.log("Recurring:", isRecurring);
    console.log("Customer Email:", customerEmail);

    // INCHEK Payment API endpoint
    const apiUrl = "https://secure.inchekgateway.com/api/transact.php";
    
    // For demo/testing, we'll create a hosted payment page
    // In production, you would use the actual security key
    const useDemoCredentials = !securityKey;
    
    if (useDemoCredentials) {
      // For demo purposes, we'll simulate creating a payment session
      // In production, you would integrate with INCHEK's hosted payment pages or use their API
      
      const baseUrl = req.headers.get("origin") || "https://geniusrecovery.org";
      const successUrl = `${baseUrl}/payment-success?amount=${amount}&type=${isRecurring ? 'monthly' : 'one-time'}`;
      const failureUrl = `${baseUrl}/payment-failed`;
      
      // Create a mock hosted payment URL (in production, this would be INCHEK's actual hosted page)
      const mockPaymentUrl = `https://secure.inchekgateway.com/demo-payment?amount=${amount}&recurring=${isRecurring}&success_url=${encodeURIComponent(successUrl)}&failure_url=${encodeURIComponent(failureUrl)}&email=${encodeURIComponent(customerEmail || '')}`;
      
      console.log("Demo mode - Generated mock payment URL:", mockPaymentUrl);
      
      return new Response(JSON.stringify({ 
        payment_url: mockPaymentUrl,
        payment_id: `demo-${Date.now()}`,
        status: "pending",
        message: "Demo payment URL generated (no actual charges)"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Production INCHEK API integration
    const paymentData = new URLSearchParams();
    paymentData.append('type', 'sale');
    paymentData.append('security_key', securityKey);
    paymentData.append('amount', amount.toString());
    paymentData.append('currency', currency.toUpperCase());
    paymentData.append('order_description', `Genius Recovery ${isRecurring ? 'Monthly' : 'One-time'} Donation`);
    paymentData.append('orderid', `donation-${Date.now()}`);
    
    // Add customer information if provided
    if (customerEmail) {
      paymentData.append('email', customerEmail);
    }
    
    // Add recurring billing if needed
    if (isRecurring) {
      paymentData.append('billing_method', 'recurring');
      paymentData.append('recurring', 'add_subscription');
      paymentData.append('plan_amount', amount.toString());
      paymentData.append('month_frequency', '1');
      paymentData.append('day_of_month', '1');
      paymentData.append('plan_payments', '0'); // Until canceled
    }
    
    // Set success/failure URLs
    const baseUrl = req.headers.get("origin") || "https://geniusrecovery.org";
    paymentData.append('redirect_url', `${baseUrl}/payment-success`);
    paymentData.append('decline_url', `${baseUrl}/payment-failed`);

    console.log("Payment data:", Object.fromEntries(paymentData.entries()));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: paymentData.toString(),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log("Response body:", responseText);

    if (response.ok) {
      // Parse the response (INCHEK returns key=value&key=value format)
      const responseParams = new URLSearchParams(responseText);
      const responseData = Object.fromEntries(responseParams.entries());
      
      console.log("Parsed response:", responseData);

      if (responseData.response === '1') {
        // Success - transaction approved
        return new Response(JSON.stringify({ 
          payment_url: responseData.redirect_url || `${baseUrl}/payment-success`,
          payment_id: responseData.transactionid,
          status: "approved",
          response_code: responseData.response_code,
          auth_code: responseData.authcode,
          raw_response: responseData
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } else if (responseData.response === '2') {
        // Declined
        throw new Error(`Transaction declined: ${responseData.responsetext}`);
      } else if (responseData.response === '3') {
        // Error
        throw new Error(`Transaction error: ${responseData.responsetext}`);
      } else {
        // Unknown response
        throw new Error(`Unknown response: ${responseText}`);
      }
    } else {
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }

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