
import "./App.css";
import './App.css';
import { Route } from "react-router-dom";


import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/Login/Login";
import LogoutButton from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <Profile />
      <Route path="products/:name" />
      {/* <Route path="products/:name" component={ProductsByName} /> */} 
    </div>
  );
}

export default App;
