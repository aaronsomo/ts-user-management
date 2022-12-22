import dotenv from 'dotenv'
dotenv.config()

import { Pool, Client } from 'pg'

const db = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT) || 5432,
  host: process.env.PGHOST,
});

db.connect().then(() => {
  console.log(`Connected to database.`);
});

export default db