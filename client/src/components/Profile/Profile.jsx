import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return <h1>{isAuthenticated ? user.name : ""}</h1>;
};
export default Profile;
