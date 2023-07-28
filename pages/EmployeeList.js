// components/EmployeeList.js
import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString();
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
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CEVO Iss</th>
                <th>DOT Exp</th>
                <th>PALS Exp</th>
                <th>ACLS Exp</th>
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
                  <td>{formatDate(employee.palsExp)}</td>
                  <td>{formatDate(employee.aclsExp)}</td>
                  <td>{formatDate(employee.emsExp)}</td>
                  <td>{formatDate(employee.driversExp)}</td>
                  <td>{formatDate(employee.blsExp)}</td>
                  <td>{employee.licensureLevel}</td>
                  <td>{formatDate(employee.mvrExp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );  
};
export default EmployeeList;