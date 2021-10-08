import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import CategoryProduct from "./components/CategoryProduct/CategoryProduct";
import { Search } from "./components/Search/Search";
import Selects from "./components/Selects/Selects";
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
import ProductsByName from "./components/ProductsByName/ProductsByName";
import { decodeToken } from "./utils/index";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct";
import UsersTable from "./components/Admin/Tables/UsersTable/UsersTable";
import ProductTable from "./components/Admin/Tables/ProductTable/ProductTable";
import CategoriasTable from "./components/Admin/Tables/CategoriasTable/CategoriasTable";
import Review from "./components/Review/Review";
import ReviewsTable from "./components/Admin/Tables/ReviewsTable/ReviewsTable";
import Profile from "./components/Profile/Profile";
import EditProduct from "./components/Admin/EditProduct/EditProduct";

function App() {
  const loggedIn = decodeToken();

  return (
    <div>
      <Navbar />
      <ShoppingCart />

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
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
        <Route exact path="/changepassword/:token">
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
        <Route exact path="/product/:idParams">
          <ProductDetail />
        </Route>
        <Route path="/auth/confirmregister/:token">
          <ConfirmRegister />
        </Route>
        <Route exact path="/admin/createproduct">
          {loggedIn.admin ? <CreateProduct /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/userstable">
          {loggedIn.admin ? <UsersTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/productslist">
          {loggedIn.admin ? <ProductTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/categoriestable">
          {loggedIn.admin ? <CategoriasTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/search/:name">
          <Search />
          <Selects />
          <ProductsByName />
        </Route>
        <Route exact path="/createreview/:productid">
          <Review />
        </Route>
        <Route exact path="/admin/reviews/:productid">
          {loggedIn.admin ? <ReviewsTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/editproduct/:productid">
          {loggedIn.admin ? <EditProduct /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/categoriestable">
          {loggedIn.admin ? <CategoriasTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/account">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
