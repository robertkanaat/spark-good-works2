import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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
  
  // Handle payment gateway postback/response
  if (req.method === "GET" && (url.searchParams.has('response') || url.searchParams.has('responsetext'))) {
    const response = url.searchParams.get('response');
    const responseText = url.searchParams.get('responsetext');
    const referer = req.headers.get("referer");
    const origin = req.headers.get("origin");
    const baseUrl = referer?.split('?')[0].replace(/\/[^\/]*$/, '') || origin || "https://geniusrecovery.org";
    
    console.log(`Kit purchase gateway response | response=${response} | responsetext=${responseText} | baseUrl=${baseUrl}`);
    
    // If error response, redirect to failure page
    if (response === '2' || response === '3' || (responseText?.includes('exceed') && response !== '1')) {
      const errorMessage = encodeURIComponent(responseText || 'Payment failed');
      const redirectUrl = `${baseUrl}/payment-failed?error=${errorMessage}`;
      console.log(`REDIRECTING TO FAILURE: ${redirectUrl}`);
      return new Response(null, {
        status: 302,
        headers: { 'Location': redirectUrl }
      });
    }
    
    // If success response
    if (response === '1') {
      const transactionId = url.searchParams.get('transactionid');
      const amount = url.searchParams.get('amount');
      const email = url.searchParams.get('email');
      const firstName = url.searchParams.get('firstname');
      const lastName = url.searchParams.get('lastname');
      
      if (email && firstName && amount) {
        try {
          const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? ''
          );
          
          const donorName = `${firstName} ${lastName || ''}`.trim();
          const orderAmount = parseFloat(amount);
          
          // Log kit purchase to database
          const { data: paymentRecord, error: insertError } = await supabase
            .from('payments')
            .insert({
              inchek_session_id: transactionId,
              donor_email: email,
              donor_name: donorName,
              amount: orderAmount,
              currency: 'USD',
              status: 'completed',
              metadata: {
                type: 'recovery_kit',
                firstName,
                lastName,
                source: 'inchek',
                gateway_response: response,
                created_at: new Date().toISOString()
              }
            })
            .select()
            .single();
          
          if (insertError) {
            console.error('Failed to log kit purchase to database:', insertError);
          } else {
            console.log('Kit purchase logged successfully:', paymentRecord);
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
        }
      }
      
      const redirectUrl = `${baseUrl}/payment-success?transaction=${transactionId || ''}&type=kit`;
      console.log(`REDIRECTING TO SUCCESS: ${redirectUrl}`);
      return new Response(null, {
        status: 302,
        headers: { 'Location': redirectUrl }
      });
    }
  }
  
  // Handle form POST from Inchek gateway
  if (req.method === "POST" && req.headers.get("content-type")?.includes("application/x-www-form-urlencoded")) {
    const formData = await req.formData();
    const referer = req.headers.get("referer");
    const origin = req.headers.get("origin");
    const baseUrl = referer?.split('?')[0].replace(/\/[^\/]*$/, '') || origin || "https://geniusrecovery.org";
    
    console.log("Kit purchase form POST received from gateway");
    
    // Forward to Inchek
    const inchekResponse = await fetch("https://secure.inchekgateway.com/api/transact.php", {
      method: "POST",
      body: formData
    });
    
    const responseText = await inchekResponse.text();
    console.log("Inchek response:", responseText);
    
    // Parse the response
    if (responseText.includes('response=2') || responseText.includes('response=3')) {
      let errorMessage = 'Payment failed';
      if (responseText.includes('DECLINE')) {
        errorMessage = 'Payment declined - Please check your card details';
      }
      
      const redirectUrl = `${baseUrl}/payment-failed?error=${encodeURIComponent(errorMessage)}`;
      return new Response(null, {
        status: 302,
        headers: { 'Location': redirectUrl }
      });
    }
    
    if (responseText.includes('response=1')) {
      console.log("Kit purchase successful");
      const redirectUrl = `${baseUrl}/payment-success?type=kit`;
      return new Response(null, {
        status: 302,
        headers: { 'Location': redirectUrl }
      });
    }
    
    const defaultRedirectUrl = `${baseUrl}/payment-failed?error=${encodeURIComponent('Payment processing error')}`;
    return new Response(null, {
      status: 302,
      headers: { 'Location': defaultRedirectUrl }
    });
  }

  try {
    const { amount, quantity = 1, currency = "USD", customerEmail, customerName, embedForm = false } = await req.json();

    if (!amount || amount < 1) {
      throw new Error("Invalid amount");
    }

    const securityKey = Deno.env.get("INCHEK_SECURITY_KEY");
    
    if (!securityKey) {
      throw new Error("INCHEK security key not configured");
    }

    const orderid = `kit-${Date.now()}`;
    const description = `Genius Recovery Kit (x${quantity})`;
    
    console.log(`Kit purchase initiated: $${amount} for ${quantity} kit(s)`);
    
    if (embedForm) {
      const baseUrl = req.headers.get("origin") || "https://98ead7f7-984d-400e-8140-92b6075fec1e.lovableproject.com";
      const successUrl = `${baseUrl}/payment-success?type=kit`;
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
              if (!stateField) return;
              stateField.innerHTML = '<option value="">Select State/Province</option>';
              
              if (country === 'US') {
                stateField.style.display = 'block';
                stateField.required = true;
                usStates.forEach(function(state) {
                  const option = document.createElement('option');
                  option.value = state.code;
                  option.textContent = state.code;
                  stateField.appendChild(option);
                });
              } else if (country === 'CA') {
                stateField.style.display = 'block';
                stateField.required = true;
                canadianProvinces.forEach(function(province) {
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
            
            function formatCardNumber(input) {
                let value = input.value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
                if (value.length > 16) { value = value.substring(0, 16); }
                
                let formattedValue = '';
                if (value.match(/^3[47]/)) {
                    if (value.length > 15) { value = value.substring(0, 15); }
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
            
            function checkAndRedirectOnError() {
                const params = new URLSearchParams(window.location.search);
                const response = params.get('response');
                const responseText = params.get('responsetext');
                
                if ((response === '2' || response === '3') || 
                    (responseText && responseText.includes('Activity limit exceeded') && response !== '1')) {
                    const baseUrl = '${baseUrl}';
                    const failureUrl = baseUrl + '/payment-failed?error=' + encodeURIComponent(responseText || 'Payment failed');
                    window.top.location.href = failureUrl;
                    return true;
                }
                return false;
            }
            
            function setupFormHandler() {
                const form = document.querySelector('.card-form');
                if (form) {
                    form.addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        const requiredFields = form.querySelectorAll('input[required], select[required]');
                        let isValid = true;
                        
                        requiredFields.forEach(function(field) {
                            if (!field.value.trim()) {
                                field.style.borderColor = '#ff0000';
                                isValid = false;
                            } else {
                                field.style.borderColor = 'transparent';
                            }
                        });
                        
                        if (!isValid) {
                            alert('Please fill in all required fields.');
                            return;
                        }
                        
                        const submitBtn = form.querySelector('button[type="submit"]');
                        if (submitBtn) {
                            submitBtn.innerHTML = '🔄 Processing... Please wait';
                            submitBtn.disabled = true;
                        }
                        
                        const formData = new FormData(form);
                        
                        fetch(form.action, {
                            method: 'POST',
                            body: formData
                        }).then(function(response) {
                            if (response.redirected) {
                                window.top.location.href = response.url;
                            } else {
                                return response.text();
                            }
                        }).catch(function(error) {
                            console.error('Form submission error:', error);
                            alert('Payment processing error. Please try again.');
                            if (submitBtn) {
                                submitBtn.innerHTML = 'Complete Order';
                                submitBtn.disabled = false;
                            }
                        });
                    });
                }
            }
            
            setTimeout(function() {
                if (checkAndRedirectOnError()) { return; }
                
                const cardInput = document.querySelector('.card-form input[name="ccnumber"]');
                const expiryInput = document.querySelector('.card-form input[name="ccexp"]');
                if (cardInput) { cardInput.addEventListener('input', function() { formatCardNumber(this); }); }
                if (expiryInput) { expiryInput.addEventListener('input', function() { formatExpiryDate(this); }); }
                
                setupFormHandler();
                toggleStateField('US');
                setInterval(checkAndRedirectOnError, 1000);
            }, 100);
          </script>
          <form action="https://lhwxxzxdsrykvznrtigf.supabase.co/functions/v1/kit-purchase" method="POST" class="card-form">
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
            
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="font-size: 28px; font-weight: bold; margin-bottom: 8px; background: linear-gradient(45deg, #fff, #f0f0f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Recovery Kit Order
              </div>
              <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">
                $${amount} - ${quantity} Kit${quantity > 1 ? 's' : ''}
              </div>
              <div style="opacity: 0.9; font-size: 16px;">${description}</div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600;">Cardholder Name</label>
              <div class="form-row" style="display: flex; gap: 10px;">
                <input type="text" name="first_name" placeholder="First Name" required 
                  style="flex: 1; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
                <input type="text" name="last_name" placeholder="Last Name" required
                  style="flex: 1; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600;">Card Number</label>
              <input type="text" name="ccnumber" placeholder="1234 5678 9012 3456" required maxlength="19"
                style="width: 100%; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
            </div>
            
            <div class="form-row" style="display: flex; gap: 10px; margin-bottom: 20px;">
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Expiry</label>
                <input type="text" name="ccexp" placeholder="MM/YY" maxlength="5" required
                  style="width: 100%; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
              </div>
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">CVV</label>
                <input type="text" name="cvv" placeholder="123" maxlength="4" required
                  style="width: 100%; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600;">Shipping Address</label>
              <input type="text" name="address1" placeholder="Street Address" required
                style="width: 100%; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333; margin-bottom: 10px;">
              <div class="form-row" style="display: flex; gap: 10px;">
                <input type="text" name="city" placeholder="City" required
                  style="flex: 1; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
                <input type="text" name="zip" placeholder="ZIP" required
                  style="flex: 1; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
              </div>
            </div>
            
            <div class="form-row" style="display: flex; gap: 10px; margin-bottom: 25px;">
              <select name="country" id="countryField" required onchange="toggleStateField(this.value)"
                style="flex: 1; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
              <select name="state" id="stateField"
                style="flex: 1; padding: 14px; border: none; border-radius: 10px; background: rgba(255,255,255,0.95); font-size: 16px; color: #333;">
                <option value="">Select State</option>
              </select>
            </div>
            
            <button type="submit" style="width: 100%; padding: 18px; background: rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.5); border-radius: 12px; color: white; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.3s ease;">
              ✓ Complete Order - $${amount}
            </button>
            
            <div style="text-align: center; margin-top: 15px; opacity: 0.8; font-size: 13px;">
              🔒 Secure checkout • 📦 Free shipping
            </div>
          </form>
        </div>
      `;
      
      return new Response(JSON.stringify({ html: formHtml }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(
      JSON.stringify({ error: "embedForm is required" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );

  } catch (error) {
    console.error("Kit purchase error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
