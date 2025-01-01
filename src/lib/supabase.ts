import { createClient } from '@supabase/supabase-js';
import type { FormData } from './types';
import { config, validateConfig } from './config';

// Validate configuration before creating client
validateConfig();

export const supabase = createClient(config.supabase.url, config.supabase.key);

export async function submitApplication(formData: FormData) {
  try {
    const { error } = await supabase
      .from('applications')
      .insert([{
        full_name: formData.fullName,
        email: formData.email,
        position: formData.position,
        resume_link: formData.resumeLink,
        why_join_us: formData.whyJoinUs,
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { 
      success: false, 
      error: 'Failed to submit application. Please try again later.'
    };
  }
}