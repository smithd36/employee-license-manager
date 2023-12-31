/**
 * Author: Drey Smith
 * 
 * This page displays a list of all employees in the database.
 * It also allows the user to edit employee data.
 * 
 * @since 2023-05-17
 * @updated 09/24/2023
 */

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"; // to confirm user is logged in
import { useRouter } from "next/router";
import EditEmployeeForm from "./EditEmployeeForm";

const EmployeeList = () => {

  // Declare state variables
  const [employees, setEmployees] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  
  // Redirect user if not logged in or not authorized
  useEffect(() => {
    handleRedirect();
  }, []);

  // Handle the edit button
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditForm(true);
  };

  // Redirect user if not logged in or not authorized
  const handleRedirect = async () => {
    //check if user email is within allowed list
    const allowedEmails = ["dreysmith101@gmail.com", "piglife60@gmail.com"];
    if (!session) {
      router.push("/Login"); // Redirect to login if there is no session
    } else if (!allowedEmails.includes(session.user.email)) {
      router.push("/Unauthorized"); // Redirect to unauthorized if not allowed
    }
  }

  const formatDate = (date) => {
    if (date) {
      const options = { timeZone: 'GMT' }; // for Mountain Time Zone
      return new Date(date).toLocaleDateString(undefined, options);
    } else {
      return ""; // Return an empty string if the date is null
    }
  };  

  const handleBack = () => {
    // directs user to previous page
    window.history.back();
  };

  useEffect(() => {
    // Fetch the data from the API route when the component mounts
    fetch('/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div className="employee-list-container">
      <button onClick={handleBack} id="back-btn">Back</button>
      <div className="employee-list">
        <h2>Employee List</h2>
        <p>To edit employee data, select the "Edit" button at the end of the employee's column.</p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CEVO Iss</th>
                <th>DOT Exp</th>
                <th>EMS Exp</th>
                <th>Drivers Exp</th>
                <th>BLS Exp</th>
                <th>Licensure Level</th>
                <th>MVR Exp</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.EMAIL}>
                  <td>{employee.NAME}</td>
                  <td>{employee.EMAIL}</td>
                  <td>{formatDate(employee.cevoIss)}</td>
                  <td>{formatDate(employee.dotExp)}</td>
                  <td>{formatDate(employee.emsExp)}</td>
                  <td>{formatDate(employee.driversExp)}</td>
                  <td>{formatDate(employee.blsExp)}</td>
                  <td>{employee.licensureLevel}</td>
                  <td>{formatDate(employee.mvrExp)}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)} id="edit-btn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Conditionally render the EditEmployeeForm pop-up */}
      {showEditForm && selectedEmployee && (
        <EditEmployeeForm
          selectedEmployee={selectedEmployee}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );  
};

export default EmployeeList;