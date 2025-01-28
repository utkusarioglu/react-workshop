import { Pool } from "pg";
import type { PoolClient } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "cat",
  host: "react-workshop-postgres",
  port: 5432,
  database: "music",
});

export async function withPool<T>(cb: (client: PoolClient) => Promise<T>) {
  const client = await pool.connect();
  const response = cb(client);
  client.release();
  return response;
}
