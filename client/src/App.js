import "../src/scss/index.scss";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./View/HomePage";
import MainProduct from "./View/MainProductPage";
import DescProduct from "./View/DescProdPage";
import MainCategory from "./View/CategoryPage";
import ConfigPc from "./View/ConfigPc";
import Login from "./components/Login";
import Register from "./components/Register";
import UserPage from "./View/UserPage";
import AdminUserPage from "./View/AdminUserPage";
import AdminProductPage from "./View/AdminProductPage";
import AdminHome from "./components/AdminDashboard/AdminHome";
import jwtDecode from "jwt-decode";
import "./scss/index.scss";
import CartPage from "./View/CartPage";

function App(props) {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    const changeTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <div className="app" data-theme={theme}>
            <Navbar changeTheme={changeTheme} currentTheme={theme} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/produits" element={<MainProduct />} />
                <Route path="/description/:produit" element={<DescProduct />} />
                <Route path="/categories" element={<MainCategory />} />
                <Route path="/categories/:category" element={<MainProduct />} />
                <Route path="/configurateur" element={<ConfigPc />} />
                {/* <Route path="/promos" element={<SalePage />} /> */}
                {localStorage.getItem("token") && (jwtDecode(localStorage.getItem("token")).userInfo.roles) === "admin" ? (
                    <>
                        <Route path='/admin' element={<AdminHome />} />
                        <Route path="/admin/product" element={<AdminProductPage />} />
                        <Route path="/admin/users" element={<AdminUserPage />} />
                    </>

                ) : null}
                {localStorage.getItem("token") && jwtDecode(localStorage.getItem("token")).userInfo ? (
                    <Route path="/user" element={<UserPage />} />
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
                <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;