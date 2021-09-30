import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CategoryProduct from "./components/CategoryProduct/CategoryProduct";
import LoginButton from "./components/Login/Login";
import LogoutButton from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import { ProductDetail } from "./components/ProductDetail/ProductDetail";

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
      <Route exact path="/home">
        <Home />
      </Route>
      <Route path="/home/:attribute/:order">
        <Home />
      </Route>
      <Route path="/category/:id">
        <CategoryProduct />
      </Route>
      <Route path="/product/:id">
        <ProductDetail />
      </Route>
    </div>
  );
}

export default App;
