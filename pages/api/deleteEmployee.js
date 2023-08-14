// pages/api/deleteEmployee.js
import prisma from "./prisma/client";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    // Find the employee by email
    const employee = await prisma.employees.findUnique({
      where: { EMAIL: email },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Delete the employee
    await prisma.employees.delete({
      where: { EMAIL: email },
    });

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ error: "Error deleting employee" });
  }
}