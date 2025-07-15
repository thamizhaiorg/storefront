export const prerender = false;

export async function POST({ request }) {
  try {
    // Better JSON parsing with error handling
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid JSON in request body'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { email, code } = body;

    if (!email || !code) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email and code are required'
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

    // Return success - the actual verification will be handled client-side
    return new Response(JSON.stringify({
      success: true,
      message: 'Request validated. Verifying code...',
      email: email,
      code: code
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing verification request:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to process request'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
