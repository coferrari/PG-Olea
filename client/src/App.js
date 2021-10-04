import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import CategoryProduct from "./components/CategoryProduct/CategoryProduct";

import LoginButton from "./components/Login/Login";
import LogoutButton from "./components/Logout/Logout";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import { ProductDetail } from "./components/ProductDetail/ProductDetail";
import ConfirmRegister from "./components/ConfirmRegister/ConfirmRegister";
import Landing from "./components/Landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import RequestChangePassword from "./components/RequestChangePassword/RequestChangePassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <div>
      <Navbar />
      <ShoppingCart />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login">
          <LoginButton />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/logout">
          <LogoutButton />
        </Route>
        <Route exact path="/requestchangepassword">
          <RequestChangePassword />
        </Route>
        <Route exact path="/changepassword">
          <ChangePassword />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/home/:attribute/:order">
          <Home />
        </Route>
        <Route path="/category/:nameCategory">
          <CategoryProduct />
        </Route>
        <Route path="/product/:idParams">
          <ProductDetail />
        </Route>
        <Route path="/auth/confirmregister/:token">
          <ConfirmRegister />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
