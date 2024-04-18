import 'dotenv/config';
import { randomUUID } from 'crypto';
import { execSync } from 'node:child_process';
import { Environment } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
function generateDatabaseName(schema: string) {
    if(!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)
    return url.toString()
 }

export default <Environment>{
    name: 'prisma',
    transformMode:'ssr',
    async setup() {
        const schema = randomUUID();
        const dataBaseUrl = generateDatabaseName(schema);
        process.env.DATABASE_URL = dataBaseUrl;
        execSync('npx prisma migrate deploy')
        return {
          async teardown() {
            await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
            await prisma.$disconnect();
          },
        }
      },
}