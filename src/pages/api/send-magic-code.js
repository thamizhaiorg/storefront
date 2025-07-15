export const prerender = false;

export async function POST({ request }) {
  console.log('POST /api/send-magic-code called');

  try {
    // Better JSON parsing with error handling
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed:', body);
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid JSON in request body'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { email } = body;
    console.log('Extracted email:', email);

    if (!email) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please provide a valid email address'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return success - the actual magic code sending will be handled client-side
    return new Response(JSON.stringify({
      success: true,
      message: 'Request validated. Sending magic code...',
      email: email
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing magic code request:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to process request'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
