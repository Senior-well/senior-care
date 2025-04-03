import React from "react";
import "./Profile.sass";

class Profile extends React.Component {
  render() {
    const { name, email, fname, lname, role, phnumber } = this.props;
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h1>Welcome, {name}!</h1>
          <p>First Name: {fname}</p>
          <p>Last Name: {lname}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {phnumber}</p>
          <p>Role: {role}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
