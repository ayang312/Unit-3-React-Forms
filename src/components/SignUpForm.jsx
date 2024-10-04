import { useState } from "react";

export default function SignUpForm({ setToken, setUsername }) {
  const [username, setFormUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //   make an async function to handleSubmit
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username);

    if (!username && !password) {
      setError("Please try again");
    } else {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
          }
        );
        const result = await response.json();
        console.log(result);
        setSuccess(result.message);
        setToken(result.token);
        setUsername(username);
        console.log(token);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {success ? (
        <p className="success-message">{success}</p>
      ) : (
        <p className="error-message">{error}</p>
      )}

      {/* make sure to handleSubmit */}
      <form onSubmit={handleSubmit}>
        {/* Make the Username label and input */}
        <label>
          Username:{" "}
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            minLength={6}
            onChange={(e) => {
              setFormUsername(e.target.value);
            }}
          />
        </label>
        <br />

        {/* Make the Password label and input */}
        <label>
          Password:{" "}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            minLength={8}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        {/* make a submit button */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
