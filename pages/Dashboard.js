import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteEmployee from './DeleteEmployee';
import SearchEmployee from './SearchEmployee';
import AddEmployee from "./AddEmployee";

const Dashboard = () => { 
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showDeleteEmployee, setShowDeleteEmployee] = useState(true); // Initially show the Delete Employee component
  const [showSearchEmployee, setShowSearchEmployee] = useState(true); // Initially show the Search Employee component

  useEffect(() => {
    handleRedirect();
  }, []);

  const handleSignout = async () => {
    await signOut();
    router.push("/Login");
  }

  const handleRedirect = async () => {
    // Check if user email is within the allowed list
    const allowedEmails = ["dreysmith101@gmail.com", "piglife60@gmail.com"];
    if (!session) {
      router.push("/Login"); // Redirect to login if there is no session
    } else if (!allowedEmails.includes(session.user.email)) {
      router.push("/Unauthorized"); // Redirect to unauthorized if not allowed
    }
  }

  const showAll = () => {
    router.push("/EmployeeList");
  }

  const handleClick = () => {
    // Toggle the showAddEmployee state based on its current value
    setShowAddEmployee((prevValue) => !prevValue);
    // Set the other states to true to show them
    setShowDeleteEmployee((prevValue) => !prevValue);
    setShowSearchEmployee((prevValue) => !prevValue);
  };

  const handleToggleForm = (showForm) => {
    // Update the state in the Dashboard component
    setShowAddEmployee(showForm);
    setShowDeleteEmployee(true); // Set other states as needed
    setShowSearchEmployee(true); // Set other states as needed
  };

  if (status === "loading") {
    // Show loader - will be modernized later
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    // User authenticated, show dashboard
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <button id="sign-out" onClick={handleSignout}>Sign out</button>
          <h1>Dashboard</h1>
          <p>Signed in as {session.user.email}</p>
          {/* ... Dashboard content ... */}
          <button id="show-all" onClick={showAll}>Show Employee Table/Edit Employees</button>
          <button id="add-toggle" onClick={handleClick}>Add an Employee</button>
          {showAddEmployee && (
            <AddEmployee
              showForm={showAddEmployee}
              onToggleForm={handleToggleForm}
              setShowDeleteEmployee={setShowDeleteEmployee} // Pass setShowDeleteEmployee
              setShowSearchEmployee={setShowSearchEmployee} // Pass setShowSearchEmployee
            />
          )}
          {showDeleteEmployee && <DeleteEmployee />}
          {showSearchEmployee && <SearchEmployee />}
        </div>
      </div>
    )
  }
}

export default Dashboard;