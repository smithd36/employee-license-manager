// prisma/client.js
import { PrismaClient } from '@prisma/client';

// Get the DATABASE_URL from the environment variable
const env_url = process.env.DATABASE_URL;

// Create the PrismaClient instance with the correct configuration
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env_url,
    },
  },
  // Enable query logging
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;