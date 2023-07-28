import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import DeleteEmployee from './DeleteEmployee';
import SearchEmployee from './SearchEmployee';
import AddEmployee from "./AddEmployee";


const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRoute = () => {
    router.push('/EmployeeList');
  }

  if (status == "loading") {
    //show loader - will be modernized later
    return <div>Loading...</div>
  }

  if (!session) {
    // user not authenticated, redirect to login
    router.replace("/");
    return null;
  }

  if (session) {
    // user authenticated, show dashboard
    return (
      <div className="dashboard-container">
        <h1>Secure Dashboard</h1>
        {/* ... Dashboard content ... */}
        <button id="show-all" onClick={ handleRoute }>Show All Employees</button>
        <AddEmployee />
        <DeleteEmployee />
        <SearchEmployee />
        <Sidebar />
      </div>
    )
  }
}

export default Dashboard;