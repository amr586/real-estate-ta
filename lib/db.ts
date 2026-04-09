import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/real_estate',
});

export async function query(
  text: string,
  params?: any[]
): Promise<QueryResult> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('[DB] Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('[DB] Query error', { text, error });
    throw error;
  }
}

export async function getClient() {
  return pool.connect();
}

export interface User {
  id: string;
  email: string;
  phone: string;
  password_hash: string;
  role: 'super_admin' | 'admin_properties' | 'admin_analytics' | 'admin_data' | 'owner' | 'user';
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  property_type: 'apartment' | 'villa' | 'land' | 'commercial';
  price: number;
  currency: string;
  location: string;
  latitude: number;
  longitude: number;
  area_sqm: number;
  bedrooms: number;
  bathrooms: number;
  listing_type: 'sale' | 'rent';
  status: 'active' | 'inactive' | 'sold' | 'rented';
  images: string[];
  announcement_code: string;
  created_at: Date;
  updated_at: Date;
}

export interface Unit {
  id: string;
  property_id: string;
  unit_number: string;
  type: string;
  price: number;
  status: 'available' | 'sold' | 'rented';
  down_payment: number;
  installment_amount: number;
  installment_months: number;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: string;
  unit_id: string;
  user_id: string;
  amount: number;
  type: 'down_payment' | 'installment';
  status: 'pending' | 'completed' | 'failed';
  payment_method: 'instapay' | 'vodafone_cash' | 'transfer' | 'screenshot';
  screenshot_url?: string;
  transaction_reference?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Subscription {
  id: string;
  owner_id: string;
  plan_type: 'free' | 'premium' | 'professional';
  listing_limit: number;
  used_listings: number;
  status: 'active' | 'inactive' | 'expired';
  started_at: Date;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
}
