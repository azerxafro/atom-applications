import type { APIRoute } from 'astro';
import { addRowToSheet } from '../../lib/sheets';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();
    
    const result = await addRowToSheet(formData);
    
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}