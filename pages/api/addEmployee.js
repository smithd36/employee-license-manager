// pages/api/addEmployee.js

const { parseISO } = require('date-fns');
import prisma from "./prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { NAME, EMAIL, cevoIss, dotExp, palsExp, aclsExp, emsExp, driversExp, blsExp, licensureLevel, mvrExp } = req.body;

  // Helper function to parse date fields only if not null
  const parseDateIfNotNull = (dateString) => (dateString ? parseISO(dateString) : null);

  try {
    const newEmployee = await prisma.employees.create({
      data: {
        NAME,
        EMAIL,
        cevoIss: parseDateIfNotNull(cevoIss), // parse date if not null with date-fns
        dotExp: parseDateIfNotNull(dotExp),
        palsExp: parseDateIfNotNull(palsExp),
        aclsExp: parseDateIfNotNull(aclsExp),
        emsExp: parseDateIfNotNull(emsExp),
        driversExp: parseDateIfNotNull(driversExp),
        blsExp: parseDateIfNotNull(blsExp),
        licensureLevel,
        mvrExp: parseDateIfNotNull(mvrExp),
      },
    });

    return res.status(200).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ error: "Error adding employee" });
  }
}