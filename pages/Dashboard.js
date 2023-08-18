import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DeleteEmployee from './DeleteEmployee';
import SearchEmployee from './SearchEmployee';
import AddEmployee from "./AddEmployee";

const Dashboard = () => { 

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    handleRedirect();
  }, []);

  const handleSignout = async () => {
    await signOut();
    router.push("/Login");
  }

  const handleRedirect = async () => {
    //check if user email is within allowed list
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


  if (status == "loading") {
    //show loader - will be modernized later
    return <div>Loading...</div>
  }

  if (status == "authenticated") {
    // user authenticated, show dashboard
    return (
      <div className="dashboard-container">
        <div className="dashboard">
        <button id="sign-out" onClick={handleSignout}>Sign out</button>
          <h1>Dashboard</h1>
          <p>Signed in as {session.user.email}</p>
          {/* ... Dashboard content ... */}
          <button id="show-all" onClick={ showAll }>Show All (Edit)</button>
          <AddEmployee />
          <DeleteEmployee />
          <SearchEmployee />
        </div>
      </div>
    )
  }
}

export default Dashboard;