import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VolunteerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  availability: string;
  experience: string;
  message: string;
  turnstileToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: VolunteerRequest = await req.json();
    console.log('Received volunteer application:', { email: requestData.email, name: `${requestData.firstName} ${requestData.lastName}` });

    // Verify Turnstile token
    const turnstileSecret = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    if (!turnstileSecret) {
      console.error('Turnstile secret key not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Verifying Turnstile token...');
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: requestData.turnstileToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();
    console.log('Turnstile verification result:', turnstileResult);

    if (!turnstileResult.success) {
      console.error('Turnstile verification failed:', turnstileResult);
      return new Response(
        JSON.stringify({ error: 'Verification failed. Please try again.' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Turnstile verification successful, forwarding to Zapier...');

    // Forward to Zapier webhook
    const zapierUrl = 'https://hooks.zapier.com/hooks/catch/155028/u6j9txh/';
    const payload = {
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      email: requestData.email,
      phone: requestData.phone,
      interest: requestData.interest,
      availability: requestData.availability,
      experience: requestData.experience,
      message: requestData.message,
      timestamp: new Date().toISOString(),
      source: 'Genius Recovery Volunteer Application',
      verified: true,
    };

    const zapierResponse = await fetch(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Zapier response status:', zapierResponse.status);

    if (!zapierResponse.ok) {
      throw new Error('Failed to forward to Zapier');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Application submitted successfully' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing volunteer application:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process application' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);
