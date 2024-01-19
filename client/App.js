import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import RegistrationForm from "./RegistrationForm";

import "./App.css";

function SuccessMessage() {
  return (
    <div>
      Account created! Check your inbox to verify your email address and login.
    </div>
  );
}

function App() {
  const [accountCreated, setAccountCreated] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="header-links">
            <a href="#about" onClick={(e) => e.preventDefault()}>
              About
            </a>
            <a href="#products" onClick={(e) => e.preventDefault()}>
              Products
            </a>
          </div>
        </div>
        <div className="header-right">
          <a
            href="#login"
            className="header-button"
            onClick={(e) => e.preventDefault()}
          >
            Login
          </a>
          <div className="hamburger-menu">☰</div>
        </div>
      </div>
      <div className="container">
        <div className="password-box">
          {accountCreated ? (
            <SuccessMessage />
          ) : (
            <RegistrationForm
              onAccountCreated={() => setAccountCreated(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(root).render(<App />);

export default App;
