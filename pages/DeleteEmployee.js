// components/DeleteEmployee.js
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


const DeleteEmployee = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  //auth
  const router = useRouter(); // used for redirecting
  const { data: session } = useSession(); // grab session data
  useEffect(() => {
    handleRedirect();
  }, []);

  const handleRedirect = async () => {
    //check if user email is within allowed list
    const allowedEmails = ["dreysmith101@gmail.com", "piglife60@gmail.com"];
    if (!session) {
      router.push("/Login"); // Redirect to login if there is no session

    } else if (!allowedEmails.includes(session.user.email)) {
        router.push("/Unauthorized"); // Redirect to unauthorized if not allowed
      }
  }
  //  end auth

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
          <input
            id="delete-field"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter email"
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