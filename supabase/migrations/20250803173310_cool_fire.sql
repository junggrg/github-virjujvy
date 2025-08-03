/*
  # Ensure consultations table exists with proper structure

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, required)
      - `business_size` (text, required)
      - `service` (text, required)
      - `processes` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for anonymous users to insert consultation requests
    - Add policy for authenticated users to read consultations
*/

-- Create consultations table if it doesn't exist
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  business_size text NOT NULL,
  service text NOT NULL,
  processes text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous users to insert consultations" ON consultations;
DROP POLICY IF EXISTS "Allow authenticated users to read consultations" ON consultations;

-- Create policy for anonymous users to insert consultation requests
CREATE POLICY "Allow anonymous users to insert consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to read all consultations
CREATE POLICY "Allow authenticated users to read consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it exists and create new one
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;
CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();