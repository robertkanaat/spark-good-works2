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

  const url = new URL(req.url);
  
  // If requesting payment form directly, serve the HTML
  if (req.method === "GET" && url.searchParams.has('payment_id')) {
    const paymentId = url.searchParams.get('payment_id');
    const amount = url.searchParams.get('amount');
    const isRecurring = url.searchParams.get('recurring') === 'true';
    const customerEmail = url.searchParams.get('email');
    
    if (!paymentId || !amount) {
      return new Response("Missing required parameters", { status: 400 });
    }
    
    const securityKey = Deno.env.get("INCHEK_SECURITY_KEY");
    if (!securityKey) {
      return new Response("Payment gateway not configured", { status: 500 });
    }
    
    const baseUrl = "https://98ead7f7-984d-400e-8140-92b6075fec1e.lovableproject.com";
    const successUrl = `${baseUrl}/payment-success`;
    const failureUrl = `${baseUrl}/payment-failed`;
    const description = `Genius Recovery ${isRecurring ? 'Monthly' : 'One-time'} Donation`;
    
    const paymentFormHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Genius Recovery Donation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 50px auto; 
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .form-container {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 15px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        input, select {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: none;
            border-radius: 8px;
            background: rgba(255,255,255,0.9);
            color: #333;
            box-sizing: border-box;
        }
        .button {
            background: #4CAF50;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            width: 100%;
        }
        .button:hover { background: #45a049; }
        .amount-display {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        label {
            display: block;
            margin-top: 15px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Complete Your Donation</h2>
        <div class="amount-display">$${amount} ${isRecurring ? 'Monthly' : 'One-time'} Donation</div>
        <p>${description}</p>
        
        <form action="https://secure.inchekgateway.com/api/transact.php" method="POST">
            <input type="hidden" name="type" value="sale">
            <input type="hidden" name="security_key" value="${securityKey}">
            <input type="hidden" name="amount" value="${amount}">
            <input type="hidden" name="currency" value="USD">
            <input type="hidden" name="order_description" value="${description}">
            <input type="hidden" name="orderid" value="${paymentId}">
            <input type="hidden" name="redirect_url" value="${successUrl}">
            <input type="hidden" name="decline_url" value="${failureUrl}">
            ${customerEmail ? `<input type="hidden" name="email" value="${customerEmail}">` : ''}
            
            ${isRecurring ? `
            <input type="hidden" name="billing_method" value="recurring">
            <input type="hidden" name="recurring" value="add_subscription">
            <input type="hidden" name="plan_amount" value="${amount}">
            <input type="hidden" name="month_frequency" value="1">
            <input type="hidden" name="day_of_month" value="1">
            <input type="hidden" name="plan_payments" value="0">
            ` : ''}
            
            <h3>Payment Information</h3>
            <label>Cardholder Name:</label>
            <input type="text" name="first_name" placeholder="First Name" required>
            <input type="text" name="last_name" placeholder="Last Name" required>
            
            <label>Credit Card Number:</label>
            <input type="text" name="ccnumber" placeholder="1234 5678 9012 3456" required>
            
            <label>Expiration Date:</label>
            <input type="text" name="ccexp" placeholder="MMYY" maxlength="4" required>
            
            <label>CVV:</label>
            <input type="text" name="cvv" placeholder="123" maxlength="4" required>
            
            <h3>Billing Address</h3>
            <input type="text" name="address1" placeholder="Street Address" required>
            <input type="text" name="city" placeholder="City" required>
            <input type="text" name="state" placeholder="State" maxlength="2" required>
            <input type="text" name="zip" placeholder="ZIP Code" required>
            <input type="text" name="phone" placeholder="Phone Number">
            
            <button type="submit" class="button">
                Complete $${amount} ${isRecurring ? 'Monthly' : ''} Donation
            </button>
        </form>
        
        <p style="text-align: center; margin-top: 20px; font-size: 12px; opacity: 0.8;">
            Secure donation processing • ${isRecurring ? 'Cancel anytime • ' : ''}Tax deductible
        </p>
    </div>
</body>
</html>`;
    
    return new Response(paymentFormHtml, {
      headers: { 
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache"
      },
    });
  }

  try {
    const { amount, currency = "USD", isRecurring = false, customerEmail, embedForm = false } = await req.json();

    if (!amount || amount < 1) {
      throw new Error("Invalid amount");
    }

    // Get INCHEK credentials from environment
    const securityKey = Deno.env.get("INCHEK_SECURITY_KEY");
    
    if (!securityKey) {
      throw new Error("INCHEK security key not configured");
    }

    const orderid = `donation-${Date.now()}`;
    const description = `Genius Recovery ${isRecurring ? 'Monthly' : 'One-time'} Donation`;
    
    if (embedForm) {
      // Return just the form HTML for embedding
      const baseUrl = "https://98ead7f7-984d-400e-8140-92b6075fec1e.lovableproject.com";
      const successUrl = `${baseUrl}/payment-success`;
      const failureUrl = `${baseUrl}/payment-failed`;
      
      const formHtml = `
        <form action="https://secure.inchekgateway.com/api/transact.php" method="POST" style="color: white;">
          <input type="hidden" name="type" value="sale">
          <input type="hidden" name="security_key" value="${securityKey}">
          <input type="hidden" name="amount" value="${amount}">
          <input type="hidden" name="currency" value="${currency.toUpperCase()}">
          <input type="hidden" name="order_description" value="${description}">
          <input type="hidden" name="orderid" value="${orderid}">
          <input type="hidden" name="redirect_url" value="${successUrl}">
          <input type="hidden" name="decline_url" value="${failureUrl}">
          ${customerEmail ? `<input type="hidden" name="email" value="${customerEmail}">` : ''}
          
          ${isRecurring ? `
          <input type="hidden" name="billing_method" value="recurring">
          <input type="hidden" name="recurring" value="add_subscription">
          <input type="hidden" name="plan_amount" value="${amount}">
          <input type="hidden" name="month_frequency" value="1">
          <input type="hidden" name="day_of_month" value="1">
          <input type="hidden" name="plan_payments" value="0">
          ` : ''}
          
          <div style="margin-bottom: 20px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">$${amount} ${isRecurring ? 'Monthly' : 'One-time'} Donation</div>
            <div style="opacity: 0.8;">${description}</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Cardholder Name:</label>
            <input type="text" name="first_name" placeholder="First Name" required style="width: 48%; padding: 10px; margin-right: 4%; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
            <input type="text" name="last_name" placeholder="Last Name" required style="width: 48%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Credit Card Number:</label>
            <input type="text" name="ccnumber" placeholder="1234 5678 9012 3456" required style="width: 100%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333; box-sizing: border-box;">
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Expiration Date:</label>
            <input type="text" name="ccexp" placeholder="MMYY" maxlength="4" required style="width: 48%; padding: 10px; margin-right: 4%; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
            <input type="text" name="cvv" placeholder="CVV" maxlength="4" required style="width: 48%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
          </div>
          
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Billing Address:</label>
            <input type="text" name="address1" placeholder="Street Address" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333; box-sizing: border-box;">
            <input type="text" name="city" placeholder="City" required style="width: 48%; padding: 10px; margin-right: 4%; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
            <input type="text" name="state" placeholder="State" maxlength="2" required style="width: 23%; padding: 10px; margin-right: 4%; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
            <input type="text" name="zip" placeholder="ZIP" required style="width: 21%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333;">
          </div>
          
          <div style="margin-bottom: 15px;">
            <input type="text" name="phone" placeholder="Phone Number (Optional)" style="width: 100%; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333; box-sizing: border-box;">
          </div>
          
          <button type="submit" style="background: #4CAF50; color: white; padding: 15px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold; width: 100%;">
            Complete $${amount} ${isRecurring ? 'Monthly' : ''} Donation
          </button>
          
          <p style="text-align: center; margin-top: 15px; font-size: 12px; opacity: 0.8;">
            Secure donation processing • ${isRecurring ? 'Cancel anytime • ' : ''}Tax deductible
          </p>
        </form>`;

      return new Response(JSON.stringify({ 
        form_html: formHtml,
        payment_id: orderid,
        status: "form_html_generated",
        message: "Payment form HTML generated successfully"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // Generate unique order ID and create payment form URL
      const baseUrl = "https://98ead7f7-984d-400e-8140-92b6075fec1e.lovableproject.com";
      const functionUrl = `https://lhwxxzxdsrykvznrtigf.supabase.co/functions/v1/create-payment`;
      const paymentUrl = `${functionUrl}?payment_id=${orderid}&amount=${amount}&recurring=${isRecurring}&email=${encodeURIComponent(customerEmail || '')}`;

      console.log("Generated payment URL for order:", orderid);
      
      return new Response(JSON.stringify({ 
        payment_url: paymentUrl,
        payment_id: orderid,
        status: "payment_url_generated",
        message: "Payment URL generated successfully"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
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