import { parseISO } from 'date-fns';
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, cevoIss, dotExp, palsExp, aclsExp, emsExp, blsExp, licensureLevel, mvrExp } = req.body;

  // Helper function to parse date fields only if not null
  const parseDateIfNotNull = (dateString) => (dateString ? parseISO(dateString) : null);

  try {
    const updatedEmployee = await prisma.employees.update({
      where: { EMAIL: email },
      data: {
        NAME: name,
        cevoIss: parseDateIfNotNull(cevoIss),
        dotExp: parseDateIfNotNull(dotExp),
        palsExp: parseDateIfNotNull(palsExp),
        aclsExp: parseDateIfNotNull(aclsExp),
        emsExp: parseDateIfNotNull(emsExp),
        blsExp: parseDateIfNotNull(blsExp),
        licensureLevel,
        mvrExp: parseDateIfNotNull(mvrExp),
      },
    });

    return res.status(200).json({ message: "Employee details updated successfully", employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee details:", error);
    return res.status(500).json({ error: "Error updating employee details" });
  }
}