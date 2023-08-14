// components/SearchEmployee.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


const SearchEmployee = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");

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

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchEmployee?q=${searchQuery}`);

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        setMessage("");
      } else {
        setSearchResults([]);
        setMessage("No results found");
      }
    } catch (error) {
      setSearchResults([]);
      setMessage("Error searching employee. Please try again.");
    }
  };

  return (
    <div className="search-wrapper">
      <h2>Search Employee</h2>
      <input
        id="search-field"
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Enter name or email"
      />
      <button id="search-button" onClick={handleSearch}>Search</button>
      {message && <p>{message}</p>}
      {searchResults.length > 0 && (
        <ul id="results">
          {searchResults.map((employee) => (
            <li id="result" key={employee.EMAIL}>
              {employee.NAME} - {employee.EMAIL}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchEmployee;
