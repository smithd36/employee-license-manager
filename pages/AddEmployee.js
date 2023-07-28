// components/AddEmployee.js
import { useState } from "react";

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    NAME: "",
    EMAIL: "",
    cevoIss: null,
    dotExp: null,
    palsExp: null,
    aclsExp: null,
    emsExp: null,
    driversExp: null,
    blsExp: null,
    licensureLevel: "",
    mvrExp: null,
  });

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    // sets showForm to the opposite of its current value
    setShowForm((prevValue) => !prevValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      const response = await fetch("/api/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        // Employee added successfully
        alert("Employee added successfully!");
        // You can do any other actions you want after successful addition
      } else {
        const data = await response.json();
        alert(`Error adding employee: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee. Please try again.");
    }
    handleClick();
  };

  return (
      <div className="add-wrapper">
      <button onClick={handleClick}>Add Employee</button>
      <div className={`addEmp-container ${showForm ? 'show' : ''}`}>        <h2>Add Employee</h2>
      <label>
        Name:
        <input
          type="text"
          name="NAME"
          value={employeeData.NAME}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="EMAIL"
          value={employeeData.EMAIL}
          onChange={handleInputChange}
        />
      </label>
      <label>
        CEVO Iss:
        <input
          type="date"
          name="cevoIss"
          value={employeeData.cevoIss}
          onChange={handleInputChange}
        />
      </label>
      <label>
        DOT Exp:
        <input
          type="date"
          name="dotExp"
          value={employeeData.dotExp}
          onChange={handleInputChange}
        />
      </label>
      <label>
        PALS Exp:
        <input
          type="date"
          name="palsExp"
          value={employeeData.palsExp}
          onChange={handleInputChange}
        />
      </label>
      <label>
        ACLS Exp:
        <input
          type="date"
          name="aclsExp"
          value={employeeData.aclsExp}
          onChange={handleInputChange}
        />
      </label>
      <label>
        EMS Exp:
        <input
          type="date"
          name="emsExp"
          value={employeeData.emsExp}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Drivers Exp:
        <input
          type="date"
          name="driversExp"
          value={employeeData.driversExp}
          onChange={handleInputChange}
        />
      </label>
      <label>
        BLS Exp:
        <input
          type="date"
          name="blsExp"
          value={employeeData.blsExp}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Licensure Level:
        <input
          type="text"
          name="licensureLevel"
          value={employeeData.licensureLevel}
          onChange={handleInputChange}
        />
      </label>
      <label>
        MVR Exp:
        <input
          type="date"
          name="mvrExp"
          value={employeeData.mvrExp}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
    </div>
  );
};

export default AddEmployee;
