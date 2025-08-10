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
            * {
                box-sizing: border-box !important;
            }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%) !important;
                margin: 0; 
                padding: 20px; 
                min-height: 100vh; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
            }
            .form-container { 
                background: white; 
                padding: 30px; 
                border-radius: 12px; 
                box-shadow: 0 25px 50px rgba(0,0,0,0.15); 
                max-width: 450px; 
                width: 100%; 
                overflow: hidden;
            }
            h2 { 
                text-align: center; 
                color: hsl(25, 95%, 53%); 
                margin-bottom: 20px; 
                font-size: 24px; 
            }
            h3 { 
                color: hsl(25, 95%, 53%); 
                margin: 20px 0 10px 0; 
                font-size: 16px; 
                border-bottom: 2px solid #f0f0f0; 
                padding-bottom: 5px; 
            }
            label { 
                display: block; 
                margin: 15px 0 5px 0; 
                color: #666; 
                font-weight: 500; 
            }
            input[type="text"], input[type="email"], select { 
                width: 100% !important; 
                max-width: 100% !important;
                padding: 12px; 
                border: 2px solid #e1e5e9; 
                border-radius: 6px; 
                font-size: 14px; 
                transition: border-color 0.3s ease; 
                box-sizing: border-box !important;
            }
            input[type="text"]:focus, input[type="email"]:focus, select:focus { 
                outline: none; 
                border-color: hsl(25, 95%, 53%); 
                box-shadow: 0 0 0 3px hsla(25, 95%, 53%, 0.1); 
            }
            .button { 
                width: 100%; 
                background: linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(24, 100%, 50%) 100%); 
                color: white; 
                padding: 15px; 
                border: none; 
                border-radius: 6px; 
                font-size: 16px; 
                font-weight: 600; 
                cursor: pointer; 
                margin-top: 20px; 
                transition: transform 0.2s ease; 
            }
            .button:hover { 
                transform: translateY(-2px); 
                box-shadow: 0 5px 15px hsla(25, 95%, 53%, 0.4); 
            }
            .form-row { 
                display: flex !important; 
                gap: 8px !important; 
                margin-bottom: 10px; 
                width: 100% !important;
                max-width: 100% !important;
            }
            .form-row input, .form-row select { 
                flex: 1 !important; 
                min-width: 0 !important;
                max-width: calc(50% - 4px) !important;
                box-sizing: border-box !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                width: auto !important;
            }
            #state-container { 
                margin-top: 10px; 
            }
            .amount-display {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
                color: hsl(25, 95%, 53%);
            }
            .error-message {
                background: #fee2e2;
                border: 1px solid #fecaca;
                color: #dc2626;
                padding: 12px 16px;
                border-radius: 8px;
                margin: 20px 0;
                font-size: 14px;
                display: none;
                text-align: center;
            }
        </style>
        <script>
            function formatCardNumber(input) {
                let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                
                // Cap at 16 digits maximum
                if (value.length > 16) {
                    value = value.substring(0, 16);
                }
                
                let formattedValue = '';
                
                // American Express: 4-6-5 format (15 digits)
                if (value.match(/^3[47]/)) {
                    if (value.length > 15) {
                        value = value.substring(0, 15);
                    }
                    for (let i = 0; i < value.length; i++) {
                        if (i === 4 || i === 10) {
                            formattedValue += ' ';
                        }
                        formattedValue += value[i];
                    }
                    input.maxLength = 17;
                } else {
                    // All other cards: 4-4-4-4 format (16 digits)
                    for (let i = 0; i < value.length; i++) {
                        if (i > 0 && i % 4 === 0) {
                            formattedValue += ' ';
                        }
                        formattedValue += value[i];
                    }
                    input.maxLength = 19;
                }
                
                input.value = formattedValue;
            }
            
            function formatExpiryDate(input) {
                let value = input.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0,2) + '/' + value.substring(2,4);
                }
                input.value = value;
            }
            
            function showError(message) {
                const errorDiv = document.getElementById('error-message');
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
                errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            function checkForErrors() {
                const urlParams = new URLSearchParams(window.location.search);
                const response = urlParams.get('response');
                const responseText = urlParams.get('responsetext');
                
                if (response === '3' || response === '2') {
                    let errorMessage = 'Payment failed. Please try again.';
                    
                    if (responseText) {
                        if (responseText.includes('Invalid Credit Card Number')) {
                            errorMessage = 'Invalid credit card number. Please check your card number and try again.';
                        } else if (responseText.includes('Invalid CVV')) {
                            errorMessage = 'Invalid CVV code. Please check the security code on your card.';
                        } else if (responseText.includes('Expired')) {
                            errorMessage = 'Your card has expired. Please use a different card.';
                        } else if (responseText.includes('Insufficient')) {
                            errorMessage = 'Insufficient funds. Please use a different card or contact your bank.';
                        } else if (responseText.includes('Declined')) {
                            errorMessage = 'Your card was declined. Please contact your bank or use a different card.';
                        }
                    }
                    
                    showError(errorMessage);
                    
                    // Clean up URL parameters
                    const cleanUrl = window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, cleanUrl);
                }
            }
            
            document.addEventListener('DOMContentLoaded', function() {
                const cardInput = document.getElementById('card-number');
                const expiryInput = document.getElementById('expiry-date');
                
                if (cardInput) {
                    cardInput.addEventListener('input', function() {
                        formatCardNumber(this);
                    });
                }
                
                if (expiryInput) {
                    expiryInput.addEventListener('input', function() {
                        formatExpiryDate(this);
                    });
                }
                
                // Check for error parameters on page load
                checkForErrors();
            });
        </script>
</head>
<body>
    <div class="form-container">
        <h2>Complete Your Donation</h2>
        <div class="amount-display">$${amount} ${isRecurring ? 'Monthly' : 'One-time'} Donation</div>
        <p>${description}</p>
        
        <div id="error-message" class="error-message"></div>
        
        <form action="https://secure.inchekgateway.com/api/transact.php" method="POST">
            <input type="hidden" name="type" value="sale">
            <input type="hidden" name="security_key" value="${securityKey}">
            <input type="hidden" name="amount" value="${amount}">
            <input type="hidden" name="currency" value="USD">
            <input type="hidden" name="order_description" value="${description}">
            <input type="hidden" name="orderid" value="${paymentId}">
            <input type="hidden" name="redirect_url" value="${successUrl}">
            <input type="hidden" name="decline_url" value="${failureUrl}">
            <input type="hidden" name="postback_url" value="${failureUrl}">
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
            <div class="form-row">
                <input type="text" name="first_name" placeholder="First Name" required>
                <input type="text" name="last_name" placeholder="Last Name" required>
            </div>
            
            <label>Credit Card Number:</label>
            <input type="text" name="ccnumber" placeholder="1234 5678 9012 3456" required id="card-number" maxlength="19">
            
            <label>Expiration Date:</label>
            <input type="text" name="ccexp" placeholder="MM/YY" maxlength="5" required id="expiry-date">
            
            <label>CVV:</label>
            <input type="text" name="cvv" placeholder="123" maxlength="4" required>
            
            <h3>Billing Address</h3>
            <input type="text" name="address1" placeholder="Street Address" required>
            <div class="form-row">
                <input type="text" name="city" placeholder="City" required>
                <input type="text" name="zip" placeholder="ZIP Code" required>
            </div>
            <div class="form-row">
                <select name="country" id="country" required onchange="updateStateField()">
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="NL">Netherlands</option>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="DK">Denmark</option>
                    <option value="FI">Finland</option>
                    <option value="CH">Switzerland</option>
                    <option value="AT">Austria</option>
                    <option value="BE">Belgium</option>
                    <option value="IE">Ireland</option>
                    <option value="PT">Portugal</option>
                    <option value="LU">Luxembourg</option>
                    <option value="JP">Japan</option>
                    <option value="KR">South Korea</option>
                    <option value="SG">Singapore</option>
                    <option value="HK">Hong Kong</option>
                    <option value="NZ">New Zealand</option>
                </select>
                <select name="state" required style="flex: 1; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff !important; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease; cursor: pointer; z-index: 100;" onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'" onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
                    <option value="">Select State</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                    <option value="DC">DC</option>
                </select>
            </div>
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
        <div style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%) !important; padding: 30px; border-radius: 15px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.1); max-width: 500px; overflow: hidden; box-sizing: border-box;">
          <style>
            .card-form * { box-sizing: border-box !important; }
            .card-form input { width: 100% !important; max-width: 100% !important; }
            .card-form .form-row { display: flex !important; gap: 10px !important; width: 100% !important; }
            .card-form .form-row input { flex: 1 !important; min-width: 0 !important; }
          </style>
          <script>
            function formatCardNumber(input) {
                let value = input.value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
                
                // Cap at 16 digits maximum
                if (value.length > 16) {
                    value = value.substring(0, 16);
                }
                
                let formattedValue = '';
                if (value.match(/^3[47]/)) {
                    if (value.length > 15) {
                        value = value.substring(0, 15);
                    }
                    for (let i = 0; i < value.length; i++) {
                        if (i === 4 || i === 10) { formattedValue += ' '; }
                        formattedValue += value[i];
                    }
                    input.maxLength = 17;
                } else {
                    for (let i = 0; i < value.length; i++) {
                        if (i > 0 && i % 4 === 0) { formattedValue += ' '; }
                        formattedValue += value[i];
                    }
                    input.maxLength = 19;
                }
                input.value = formattedValue;
            }
            function formatExpiryDate(input) {
                let value = input.value.replace(/\\D/g, '');
                if (value.length >= 2) { value = value.substring(0,2) + '/' + value.substring(2,4); }
                input.value = value;
            }
            setTimeout(function() {
                const cardInput = document.querySelector('.card-form input[name="ccnumber"]');
                const expiryInput = document.querySelector('.card-form input[name="ccexp"]');
                if (cardInput) { cardInput.addEventListener('input', function() { formatCardNumber(this); }); }
                if (expiryInput) { expiryInput.addEventListener('input', function() { formatExpiryDate(this); }); }
            }, 100);
          </script>
          <form action="https://secure.inchekgateway.com/api/transact.php" method="POST" class="card-form">
            <input type="hidden" name="type" value="sale">
            <input type="hidden" name="security_key" value="${securityKey}">
            <input type="hidden" name="amount" value="${amount}">
            <input type="hidden" name="currency" value="${currency.toUpperCase()}">
            <input type="hidden" name="order_description" value="${description}">
            <input type="hidden" name="orderid" value="${orderid}">
            <input type="hidden" name="redirect_url" value="${successUrl}">
            <input type="hidden" name="decline_url" value="${failureUrl}">
            <input type="hidden" name="postback_url" value="${failureUrl}">
            ${customerEmail ? `<input type="hidden" name="email" value="${customerEmail}">` : ''}
            
            ${isRecurring ? `
            <input type="hidden" name="billing_method" value="recurring">
            <input type="hidden" name="recurring" value="add_subscription">
            <input type="hidden" name="plan_amount" value="${amount}">
            <input type="hidden" name="month_frequency" value="1">
            <input type="hidden" name="day_of_month" value="1">
            <input type="hidden" name="plan_payments" value="0">
            ` : ''}
            
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="font-size: 28px; font-weight: bold; margin-bottom: 8px; background: linear-gradient(45deg, #fff, #f0f0f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                $${amount} ${isRecurring ? 'Monthly' : 'One-time'} Donation
              </div>
              <div style="opacity: 0.9; font-size: 16px;">${description}</div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #fff;">Cardholder Name</label>
              <div class="form-row">
                <input type="text" name="first_name" placeholder="First Name" required 
                       style="padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                       onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                       onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
                <input type="text" name="last_name" placeholder="Last Name" required 
                       style="padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                       onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                       onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #fff;">Credit Card Number</label>
              <input type="text" name="ccnumber" placeholder="1234 5678 9012 3456" required maxlength="19"
                     style="width: 100%; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                     onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                     onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
            </div>
            
            <div style="margin-bottom: 20px;">
              <div class="form-row">
                <div style="flex: 1;">
                  <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #fff;">Expiry (MM/YY)</label>
                  <input type="text" name="ccexp" placeholder="12/25" maxlength="5" required
                         style="width: 100%; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                         onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                         onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
                </div>
                <div style="flex: 1;">
                  <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #fff;">CVV</label>
                  <input type="text" name="cvv" placeholder="123" maxlength="4" required 
                         style="width: 100%; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                         onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                         onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
                </div>
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #fff;">Billing Address</label>
              <input type="text" name="address1" placeholder="Street Address" required 
                     style="width: 100%; padding: 15px; margin-bottom: 10px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                     onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                     onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
              <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <input type="text" name="city" placeholder="City" required 
                       style="flex: 2; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease; box-sizing: border-box;"
                       onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                       onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
                <input type="text" name="zip" placeholder="ZIP/Postal" required 
                       style="flex: 1; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease; box-sizing: border-box;"
                       onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                       onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
              </div>
              <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <select name="country" required 
                        style="flex: 1; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease; cursor: pointer;"
                        onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                        onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'"
                        onchange="toggleStateField(this.value)">
                  <option value="US" selected>United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="NL">Netherlands</option>
                  <option value="BE">Belgium</option>
                  <option value="CH">Switzerland</option>
                  <option value="AT">Austria</option>
                  <option value="SE">Sweden</option>
                  <option value="NO">Norway</option>
                  <option value="DK">Denmark</option>
                  <option value="FI">Finland</option>
                  <option value="IE">Ireland</option>
                  <option value="NZ">New Zealand</option>
                  <option value="JP">Japan</option>
                  <option value="SG">Singapore</option>
                  <option value="HK">Hong Kong</option>
                  <option value="IN">India</option>
                  <option value="BR">Brazil</option>
                  <option value="MX">Mexico</option>
                  <option value="AR">Argentina</option>
                  <option value="CL">Chile</option>
                  <option value="CO">Colombia</option>
                  <option value="PE">Peru</option>
                  <option value="ZA">South Africa</option>
                  <option value="EG">Egypt</option>
                  <option value="NG">Nigeria</option>
                  <option value="KE">Kenya</option>
                  <option value="GH">Ghana</option>
                  <option value="IL">Israel</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="TR">Turkey</option>
                  <option value="GR">Greece</option>
                  <option value="PT">Portugal</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="PL">Poland</option>
                  <option value="HU">Hungary</option>
                  <option value="RO">Romania</option>
                  <option value="BG">Bulgaria</option>
                  <option value="HR">Croatia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SK">Slovakia</option>
                  <option value="LV">Latvia</option>
                  <option value="LT">Lithuania</option>
                  <option value="EE">Estonia</option>
                  <option value="IS">Iceland</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MT">Malta</option>
                  <option value="CY">Cyprus</option>
                  <option value="OTHER">Other</option>
                </select>
                <select id="stateField" name="state" style="flex: 1; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff !important; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease; cursor: pointer; z-index: 100;"
                        onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                        onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'"
                        required>
                  <option value="">Select State</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                  <option value="DC">DC</option>
                </select>
              </div>
              <input type="text" name="phone" placeholder="Phone Number (optional)" 
                     style="width: 100%; padding: 15px; border: 2px solid transparent; border-radius: 10px; background: #ffffff; color: #333; font-size: 16px; box-sizing: border-box; box-shadow: 0 4px 6px rgba(0,0,0,0.1); outline: none; transition: all 0.3s ease;"
                     onfocus="this.style.borderColor='#4CAF50'; this.style.boxShadow='0 0 0 3px rgba(76, 175, 80, 0.1)'"
                     onblur="this.style.borderColor='transparent'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'">
             </div>
             
             <script>
               const usStates = [
                 {code: 'AL', name: 'Alabama'}, {code: 'AK', name: 'Alaska'}, {code: 'AZ', name: 'Arizona'}, {code: 'AR', name: 'Arkansas'},
                 {code: 'CA', name: 'California'}, {code: 'CO', name: 'Colorado'}, {code: 'CT', name: 'Connecticut'}, {code: 'DE', name: 'Delaware'},
                 {code: 'FL', name: 'Florida'}, {code: 'GA', name: 'Georgia'}, {code: 'HI', name: 'Hawaii'}, {code: 'ID', name: 'Idaho'},
                 {code: 'IL', name: 'Illinois'}, {code: 'IN', name: 'Indiana'}, {code: 'IA', name: 'Iowa'}, {code: 'KS', name: 'Kansas'},
                 {code: 'KY', name: 'Kentucky'}, {code: 'LA', name: 'Louisiana'}, {code: 'ME', name: 'Maine'}, {code: 'MD', name: 'Maryland'},
                 {code: 'MA', name: 'Massachusetts'}, {code: 'MI', name: 'Michigan'}, {code: 'MN', name: 'Minnesota'}, {code: 'MS', name: 'Mississippi'},
                 {code: 'MO', name: 'Missouri'}, {code: 'MT', name: 'Montana'}, {code: 'NE', name: 'Nebraska'}, {code: 'NV', name: 'Nevada'},
                 {code: 'NH', name: 'New Hampshire'}, {code: 'NJ', name: 'New Jersey'}, {code: 'NM', name: 'New Mexico'}, {code: 'NY', name: 'New York'},
                 {code: 'NC', name: 'North Carolina'}, {code: 'ND', name: 'North Dakota'}, {code: 'OH', name: 'Ohio'}, {code: 'OK', name: 'Oklahoma'},
                 {code: 'OR', name: 'Oregon'}, {code: 'PA', name: 'Pennsylvania'}, {code: 'RI', name: 'Rhode Island'}, {code: 'SC', name: 'South Carolina'},
                 {code: 'SD', name: 'South Dakota'}, {code: 'TN', name: 'Tennessee'}, {code: 'TX', name: 'Texas'}, {code: 'UT', name: 'Utah'},
                 {code: 'VT', name: 'Vermont'}, {code: 'VA', name: 'Virginia'}, {code: 'WA', name: 'Washington'}, {code: 'WV', name: 'West Virginia'},
                 {code: 'WI', name: 'Wisconsin'}, {code: 'WY', name: 'Wyoming'}, {code: 'DC', name: 'District of Columbia'}
               ];
               
               const canadianProvinces = [
                 {code: 'AB', name: 'Alberta'}, {code: 'BC', name: 'British Columbia'}, {code: 'MB', name: 'Manitoba'},
                 {code: 'NB', name: 'New Brunswick'}, {code: 'NL', name: 'Newfoundland and Labrador'}, {code: 'NS', name: 'Nova Scotia'},
                 {code: 'NT', name: 'Northwest Territories'}, {code: 'NU', name: 'Nunavut'}, {code: 'ON', name: 'Ontario'},
                 {code: 'PE', name: 'Prince Edward Island'}, {code: 'QC', name: 'Quebec'}, {code: 'SK', name: 'Saskatchewan'},
                 {code: 'YT', name: 'Yukon'}
               ];
               
               function toggleStateField(country) {
                 const stateField = document.getElementById('stateField');
                 stateField.innerHTML = '<option value="">Select State/Province</option>';
                 
                 if (country === 'US') {
                   stateField.style.display = 'block';
                   stateField.required = true;
                    usStates.forEach(state => {
                      const option = document.createElement('option');
                      option.value = state.code;
                      option.textContent = state.code;
                      stateField.appendChild(option);
                    });
                 } else if (country === 'CA') {
                   stateField.style.display = 'block';
                   stateField.required = true;
                   canadianProvinces.forEach(province => {
                     const option = document.createElement('option');
                     option.value = province.code;
                     option.textContent = province.name;
                     stateField.appendChild(option);
                   });
                 } else {
                   stateField.style.display = 'none';
                   stateField.required = false;
                 }
               }
               
               // Initialize on page load
               document.addEventListener('DOMContentLoaded', function() {
                 toggleStateField('US'); // Default to US
               });
             </script>
            
            <button type="submit" 
                    style="background: linear-gradient(45deg, #4CAF50, #45a049); color: white; padding: 18px 30px; border: none; border-radius: 12px; cursor: pointer; font-size: 18px; font-weight: bold; width: 100%; box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px rgba(76, 175, 80, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 16px rgba(76, 175, 80, 0.3)'">
              🔒 Complete $${amount} ${isRecurring ? 'Monthly' : ''} Donation
            </button>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                <span style="font-size: 12px; opacity: 0.8;">🔒 Secure encryption</span>
                <span style="font-size: 12px; opacity: 0.8;">💳 Safe payment processing</span>
              </div>
              <div style="font-size: 12px; opacity: 0.8;">
                ${isRecurring ? 'Cancel your monthly donation anytime • ' : ''}Tax deductible • Genius Recovery is a registered 501(c)(3)
              </div>
            </div>
          </form>
        </div>`;
      
      return new Response(JSON.stringify({ html: formHtml }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Generate a direct payment URL using INCHEK
    const paymentFormUrl = `https://98ead7f7-984d-400e-8140-92b6075fec1e.lovableproject.com/api/create-payment?payment_id=${orderid}&amount=${amount}&recurring=${isRecurring}&email=${encodeURIComponent(customerEmail || '')}`;
    
    return new Response(JSON.stringify({ 
      payment_url: paymentFormUrl,
      payment_id: orderid 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});