import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
<<<<<<< HEAD
import UserInfo from "./components/UserInfo/UserInfo";
import { getToken, decodeToken } from "./utils/index";
=======
import User from "./components/User/User";
import { decodeToken } from "./utils/index";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import UsersTable from "./components/UsersTable/UsersTable";
import ProductsList from "./components/ProductsList/ProductsList";

>>>>>>> 83741580125a28f83d0580f7bca89b71857f1206
function App() {
  const loggedIn = decodeToken();
  return (
    <div>
      <Navbar />
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
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
        <Route path="/auth/confirmregister/:token">
          <ConfirmRegister />
        </Route>
<<<<<<< HEAD
        <Route exact path="/user/">
          <UserInfo /> {loggedIn.admin ? <UserInfo /> : <Redirect to="/home" />}
=======
        <Route exact path="/admin/createproduct">
          {loggedIn.admin ? <CreateProduct /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/userstable">
          {loggedIn.admin ? <UsersTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/productslist">
          {loggedIn.admin ? <ProductsList /> : <Redirect to="/home" />}
>>>>>>> 83741580125a28f83d0580f7bca89b71857f1206
        </Route>
      </Switch>
    </div>
  );
}

export default App;
