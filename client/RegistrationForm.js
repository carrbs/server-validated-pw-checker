import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function RegistrationForm({ onAccountCreated }) {
  const [password, setPassword] = useState("");
  const [validationReasons, setValidationReasons] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  React.useEffect(() => {
    fetchValidationRules("");
  }, []);

  const fetchValidationRules = async (password) => {
    try {
      const response = await axios.post("http://localhost:3000/validate", {
        password,
      });
      setValidationReasons(response.data.validations);
      setIsDataLoaded(true);
    } catch (error) {
      // TODO: This is only looking for validation errors.
      //       What if the server is down or something else??
      if (error.response) {
        setValidationReasons(error.response.data.validations);
      } else {
        setValidationReasons([]);
      }
      setIsDataLoaded(true);
    }
  };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
    fetchValidationRules(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password,
      });
      if (response.status === 200) {
        onAccountCreated();
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  if (!isDataLoaded) {
    return (
      <div>
        <p className="title">Loading...</p>;
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="title">Create Your Account</h1>
        <label htmlFor="email">Email address</label>
        <div className="input-group">
          <input
            name="email"
            className="disabled-input"
            type="email"
            id="email"
            value="email@example.com"
            readOnly
          />
          <span className="checkmark">✅</span>
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-group">
          <input
            name="password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            required
            placeholder="enter password..."
          />
          <button
            type="submit"
            disabled={validationReasons.some((reason) => !reason.isMet)}
          >
            Submit
          </button>
        </div>
        <div className="validation-box">
          <p className="validation-header">
            Valid passwords must include 1 uppercase letter, 1 lowercase letter,
            1 number, 1 special character and be at least 8 characters long
          </p>

          {validationReasons.map((reason, index) => (
            <p key={index} style={{ color: reason.isMet ? "green" : "red" }}>
              <span>{reason.isMet ? "✅" : "❌"}</span>
              {reason.message}
            </p>
          ))}
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;
