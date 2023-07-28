// components/DeleteEmployee.js
import { useState } from "react";

const DeleteEmployee = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const toggleDelete = () => {
    // if true set false if false set true
    setShowForm((prevValue) => !prevValue);
    };


  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/deleteEmployee", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Employee deleted successfully
        setMessage("Employee deleted successfully!");
        setEmail("");
      } else {
        const data = await response.json();
        // Handle error response and display error message
        setMessage(data.error || "Error deleting employee. Please try again.");
      }
    } catch (error) {
      setMessage("Error deleting employee. Please try again.");
    }
  };

  return (
      <div className="delete-wrapper">
      <h2>Delete an Employee by Email</h2>
      <div className="deleteEmp-container">
      <form onSubmit={handleDelete}>
        <label>
          Email:
          <input
          id="delete-email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </label>
        <button id="submit-delete" type="submit">Delete Employee</button>
        {message && <p>{message}</p>}
      </form>
    </div>
    </div>
  );
  };

export default DeleteEmployee;