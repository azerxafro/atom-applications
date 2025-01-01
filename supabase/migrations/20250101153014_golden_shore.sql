/*
  # Create applications table

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `full_name` (text)
      - `email` (text)
      - `position` (text)
      - `resume_link` (text)
      - `why_join_us` (text)
  2. Security
    - Enable RLS on `applications` table
    - Add policy for inserting applications
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  position text NOT NULL,
  resume_link text NOT NULL,
  why_join_us text NOT NULL
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);