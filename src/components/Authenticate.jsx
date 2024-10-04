import { useState, useEffect } from "react";

export default function Authenticate({ token, setToken, username }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      handleClick();
    }
  }, [token]); //only run this effect when token is updated

  async function handleClick(e) {
    e.preventDefault();
    console.log(error);
    console.log(successMessage);
    console.log("token being sent: ", token);
    console.log("username is: ", username);

    if (!token) {
        setError("Failed to authenticate, please try again!")
    } else {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response: ", response);
        const result = await response.json();
        console.log("result: ", result);

        // Check if the response is successful
        if (response.ok) {
          setSuccessMessage(result.message); // Handle successful response
          setError(null); // Clear any previous errors
          if (setToken) setToken(result.token); // Optionally update token
        } else {
          // Handle unsuccessful responses (including JWT malformed)
          setError("Failed to authenticate, please try again!"); // Set error message
          setSuccessMessage(""); // Clear the success message
        }
      } catch (error) {
        // Handle network errors or exceptions
        console.error("Fetch Error: ", error);
        setError("Failed to authenticate. Please try again!");
        setSuccessMessage(""); // Clear the success message
      }
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      {/* Show the success message only if it exists */}
      {successMessage && (
        <>
          <p className="success-message">{successMessage}</p>
          {username && <p>{`Welcome, ${username}!`}</p>}
        </>
      )}

      {/* Show the error message only if it exists */}
      {error && <p className="error-message">{error}</p>}

      <button onClick={handleClick}>Authenticate Token!</button>
    </>
  );
}
