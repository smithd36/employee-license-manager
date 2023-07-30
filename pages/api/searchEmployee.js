// pages/api/searchEmployee.js
import prisma from "./prisma/client";

export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { q } = req.query;
  
    try {
      const results = await prisma.employees.findMany({
        where: {
          OR: [
            { NAME: { contains: q } },
            { EMAIL: { contains: q } },
          ],
        },
      });
  
      return res.status(200).json({ results });
    } catch (error) {
      console.error("Error searching employee:", error);
      return res.status(500).json({ error: "Error searching employee" });
    }
  }