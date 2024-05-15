import React, { useState } from "react";
import "./LoginPage.css";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fillError, setFillError] = useState(false);

  const handleLogin = () => {
    if (!username || !email || !phoneNumber || !password || emailError || passwordError) {
      setFillError(true); // Set fill error to true if any field is empty or has an error
    } else {
      // Perform any other login logic here
      setLoggedIn(true); // Set loggedIn to true only when there are no errors
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const isValidEmail = value.includes("@gmail.com");
      setEmail(value);
      if (!isValidEmail) {
        setEmailError("Email must contain '@gmail.com'");
      } else {
        setEmailError("");
      }
    } else if (name === "password") {
      setPassword(value);
      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        setPasswordError("Password must contain at least one special character");
      } else {
        setPasswordError("");
      }
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  return (
    <>
      <section className="login-items">
        <div className="container d_flex">
          <div className="cart-details">
            <h3>Enter Your Information</h3>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            {fillError && <p className="error">Please fill in all required fields</p>}
            <button onClick={handleLogin}>Submit</button>
            {loggedIn && <p>Logged in Successful</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
