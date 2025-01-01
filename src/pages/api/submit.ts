import type { APIRoute } from 'astro';
import { submitApplication } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };
  
  try {
    const formData = await request.json();
    const result = await submitApplication(formData);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error }), 
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true }), 
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Server error' }), 
      { status: 500, headers }
    );
  }
}