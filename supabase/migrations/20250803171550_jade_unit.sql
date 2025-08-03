/*
  # Fix RLS policy for consultations table

  1. Security Updates
    - Drop existing INSERT policy that may be misconfigured
    - Create new INSERT policy allowing anonymous users to submit consultation requests
    - Ensure the policy allows all anonymous users to insert data

  This migration fixes the "new row violates row-level security policy" error
  by properly configuring the INSERT policy for anonymous form submissions.
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON consultations;

-- Create a new INSERT policy that allows anonymous users to submit consultation requests
CREATE POLICY "Allow anonymous consultation submissions"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert (for admin purposes)
CREATE POLICY "Allow authenticated consultation submissions"
  ON consultations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);