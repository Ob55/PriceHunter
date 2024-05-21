import React from "react";

const UserAccount = () => {
  // Retrieve user data from localStorage
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const handleSignOut = () => {
    // Clear user data from localStorage and redirect to the login page
    localStorage.removeItem("email");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("loggedIn");
    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <div className="user-account">
      <h2>User Account</h2>
      <p>Email: {email}</p>
      <p>Phone Number: {phoneNumber}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UserAccount;
