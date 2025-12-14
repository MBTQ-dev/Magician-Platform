// lib/db.ts — helper to connect to Postgres using npm:postgres
import Postgres from "pg";

export async function connectDb() {
  const SUPABASE_DB_URL = Deno.env.get("SUPABASE_DB_URL");
  if (!SUPABASE_DB_URL) throw new Error("SUPABASE_DB_URL not set");

  // Postgres client using npm:postgres
  const client = new Postgres(SUPABASE_DB_URL);
  // connect() returns a connected client in this driver
  await client.connect();

  return client;
}
