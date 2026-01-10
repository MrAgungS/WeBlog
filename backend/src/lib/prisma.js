// Prisma v7 requires a database adapter and the mysql2 package.
// Without them, Prisma will throw a runtime initialization error.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

const adapter = new PrismaMariaDb(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;
