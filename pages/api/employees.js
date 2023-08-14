// pages/api/employees.js
import prisma from './prisma/client';

export default async function handler(req, res) {
  try {
      const employeee = await prisma.employees.findMany();
      res.status(200).json(employeee);
  } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}