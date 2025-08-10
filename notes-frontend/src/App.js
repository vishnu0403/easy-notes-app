import React, { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Notes from "./pages/Notes"; // ✅ now importing Notes component

function App() {
  // initialise from localStorage so refresh keeps us logged in
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [showLogin, setShowLogin] = useState(true);

  // keep localStorage in sync whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Notes App</h1>

      {!token ? (
        <div>
          {showLogin ? (
            <>
              <Login setToken={setToken} />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setShowLogin(false)}>Sign up</button>
              </p>
            </>
          ) : (
            <>
              <Signup />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowLogin(true)}>Login</button>
              </p>
            </>
          )}
        </div>
      ) : (
        <div>
          {/* ✅ Show notes list instead of static text */}
          <Notes />
          <button onClick={handleLogout} style={{ marginTop: 10 }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
