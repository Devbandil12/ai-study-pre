
import { defineConfig } from 'drizzle-kit';


export default defineConfig({

  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:g6tlsqESc1Xw@ep-lucky-pond-a1zmsgeb.ap-southeast-1.aws.neon.tech/Ai-study-prep?sslmode=require",
  },
});