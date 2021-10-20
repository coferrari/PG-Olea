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
import Checkout from "./components/Checkout/Checkout";
import { decodeToken } from "./utils/index";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct";
import UsersTable from "./components/Admin/Tables/UsersTable/UsersTable";
import ProductTable from "./components/Admin/Tables/ProductTable/ProductTable";
import CategoriasTable from "./components/Admin/Tables/CategoriasTable/CategoriasTable";
import Review from "./components/Review/Review";
import ReviewsTable from "./components/Admin/Tables/ReviewsTable/ReviewsTable";
import Profile from "./components/Profile/Profile";
import EditProduct from "./components/Admin/EditProduct/EditProduct";
import Footer from "./components/Footer/Footer";
import BarraAdmin from "./components/Profile/BarraAdmin";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import OfertasTable from "./components/Admin/Tables/OfertasTable/OfertasTable.jsx";
import CheckoutConfirm from "./components/Checkout/CheckoutConfirm";
import Wishlist from "./components/Wishlist/Wishlist";
import Map from "./components/Map/Map";
import Stores from "./components/Admin/Stores/Stores";
import Desuscribe from "./components/Profile/DesuscribeNewsLetter";
import Chat from "./components/Chat/Chat";


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
          {loggedIn ? <Redirect to="/home" /> : <LoginButton />}
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/logout">
          {loggedIn ? <LogoutButton /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/requestchangepassword">
          <RequestChangePassword />
        </Route>
        <Route exact path="/changepassword/:token">
          <ChangePassword />
        </Route>
        <Route exact path="/home">
          <Home />
          <Footer />
        </Route>
        <Route path="/home/:attribute/:order">
          <Home />
          <Footer />
        </Route>
        <Route path="/category/:nameCategory/:attribute/:order">
          <ShoppingCart />
          <CategoryProduct />
          <Footer />
        </Route>
        <Route exact path="/product/:idParams">
          <ProductDetail />
          <Footer />
        </Route>
        <Route path="/auth/confirmregister/:token">
          <ConfirmRegister />
        </Route>
        <Route path="/checkout">
          <Checkout />
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
        <Route exact path="/createreview/:productid">
          <Review />
        </Route>
        <Route exact path="/admin/reviews/:productid"></Route>
        <Route exact path="/admin/editproduct/:productid">
          {loggedIn.admin ? <EditProduct /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/categoriestable">
          {loggedIn.admin ? <CategoriasTable /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/account">
          {loggedIn.admin ? (
            <BarraAdmin />
          ) : loggedIn ? (
            <Profile />
          ) : (
            <Redirect to="/home" />
          )}
        </Route>
        <Route exact path="/order/:id">
          <OrderDetail />
        </Route>
        <Route exact path="/checkoutconfirm">
          <CheckoutConfirm />
        </Route>
        <Route exact path="/newsletter/desuscribe/:token">
          <Desuscribe />
        </Route>
        <Route exact path="/wishlist">
          <Wishlist />
        </Route>
        <Route exact path="/chat">
          {loggedIn ? <Chat /> : <Redirect to="/home" />}
    </Route>
        <Route exact path="/account/stores">
          {loggedIn.admin ? <Stores /> : <Redirect to="/home" />}

        </Route>
      </Switch>
    </div>
  );
}

export default App;
