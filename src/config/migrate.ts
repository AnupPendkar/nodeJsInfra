import { db, psConnection } from "./index";
import { migrate } from "drizzle-orm/postgres-js/migrator";

export default async function migrateSchema() {
  console.log("migrations started");
  await migrate(db, { migrationsFolder: "drizzle" });
  await psConnection.end();
  process.exit(1);
}

migrateSchema().catch((err) => {
  console.log("migration failed", err);
  process.exit(1);
});
