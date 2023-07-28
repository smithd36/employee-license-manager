// pages/api/addEmployee.js
import prisma from "./prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { NAME, EMAIL, cevoIss, dotExp, palsExp, aclsExp, emsExp, driversExp, blsExp, licensureLevel, mvrExp } = req.body;

  try {
    const newEmployee = await prisma.employees.create({
      data: {
        NAME,
        EMAIL,
        cevoIss,
        dotExp,
        palsExp,
        aclsExp,
        emsExp,
        driversExp,
        blsExp,
        licensureLevel,
        mvrExp,
      },
    });

    return res.status(200).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ error: "Error adding employee" });
  }
}
