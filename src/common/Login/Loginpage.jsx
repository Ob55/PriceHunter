import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fillError, setFillError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    if (loggedInStatus === "true") {
      setLoggedIn(true);
      setEmail(localStorage.getItem("email"));
      setPhoneNumber(localStorage.getItem("phoneNumber"));
    }
  }, []);

  const handleLogin = () => {
    if (!email || !phoneNumber || !password || emailError || passwordError) {
      setFillError(true);
    } else {
      // Store email, phone number, and login status in localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("loggedIn", true);

      // Update state to indicate user is logged in
      setLoggedIn(true);
      setShowSuccessMessage(true);

      // Redirect user after successful login
      setTimeout(() => {
        setShowSuccessMessage(false);
        history.push("/");
      }, 3000);
    }
  };

  const handleRegister = () => {
    if (!email || !phoneNumber || !password || emailError || passwordError) {
      setFillError(true);
    } else {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsLoginMode(true);
      }, 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    history.push("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const isValidEmail = value.includes("@gmail.com");
      setEmail(value);
      setEmailError(isValidEmail ? "" : "Email must contain '@gmail.com'");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError(
        value.length < 6
          ? "Password must be at least 6 characters long"
          : !/[!@#$%^&*(),.?":{}|<>]/.test(value)
          ? "Password must contain at least one special character"
          : ""
      );
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  return (
    <section className="login-items">
      <div className="container d_flex">
        <div className="cart-details">
          {loggedIn ? (
            <>
              <h3>Welcome!</h3>
              <p>Email: {localStorage.getItem("email")}</p>
              <p>Phone Number: {localStorage.getItem("phoneNumber")}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <h3>{isLoginMode ? "Log in To PriceHunter" : "Register To PriceHunter"}</h3>
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
              {showSuccessMessage && (
                <p className="success">{isLoginMode ? "Logged in Successfully" : "Registered Successfully"}</p>
              )}
              <div className="brian">
                <button onClick={isLoginMode ? handleLogin : handleRegister}>
                  {isLoginMode ? "Submit" : "Register"}
                </button>
              </div>
              <div className="toggle-mode">
                <p>
                  {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                  <button onClick={() => setIsLoginMode(!isLoginMode)}>
                    {isLoginMode ? "Register" : "Login"}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
