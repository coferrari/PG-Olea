import React from 'react';
import "./App.css";
import { Route } from "react-router-dom";
import Home from './components/home/home';
import CategoryProduct from './components/categoryProduct/categoryProduct';
import LoginButton from "./components/Login/Login";
import LogoutButton from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/login">
        <LoginButton />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/logout">
        <LogoutButton />
      </Route>
      <Route exact path='/home' component={Home}/>
      <Route path='/category/:id' component={CategoryProduct}/>
    </div>
  );
}

export default App;
