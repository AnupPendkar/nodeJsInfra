import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Welcome@123",
    database: "mydb",
  },
} satisfies Config;
