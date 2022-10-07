import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import jwtDecode from "jwt-decode";

function Navbar({ changeTheme, currentTheme }) {
    const [navState, setNavState] = useState(false);
    const html = document.querySelector("html");
    html.addEventListener("click", () => setNavState(false));
    return (
        <nav>
            <div className="container py-3 mx-3">
                <div className="brand">
                    <img
                        src="../../logo_e_commerce.png"
                        alt="logo Deus Ex Machina"
                    />
                    <Link to="/" className="span">
                        Deus Ex Machina
                    </Link>
                </div>
                <div
                    className="links-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="toggle">
                        {navState ? (
                            <MdClose onClick={() => setNavState(false)} />
                        ) : (
                            <GiHamburgerMenu
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setNavState(true);
                                }}
                            />
                        )}
                        <div onClick={changeTheme}>
                            {currentTheme === "dark" ? (
                                <ImSun className="sun" />
                            ) : (
                                <BsFillMoonFill className="moon" />
                            )}
                        </div>
                    </div>
                    <div
                        className={`links ${
                            navState ? "responsive-toggle" : ""
                        }`}
                    >
                        <ul>
                            {localStorage.getItem("token") &&
                            jwtDecode(localStorage.getItem("token")).userInfo
                                .roles === "admin" ? (
                                <li>
                                    <Link to="/admin">Admin</Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/">Accueil</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/produits">Produits</Link>
                            </li>
                            <li>
                                <Link to="/categories">Catégories</Link>
                            </li>
                            <li>
                                <Link to="/configurateur">Configurateur</Link>
                            </li>
                            <li>
                                <Link to="/promos">Promotions</Link>
                            </li>
                            <li>
                                {localStorage.getItem("token") &&
                                jwtDecode(localStorage.getItem("token")) ? (
                                    <Link to="/user">
                                        <AiOutlineUser className="user" />
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <AiOutlineUser className="user" />
                                    </Link>
                                )}
                            </li>
                            <li>
                                <Link to="/cart">
                                    <AiOutlineShoppingCart className="cart-icon" />
                                </Link>
                            </li>
                            <li onClick={changeTheme} className="color-mode">
                                {currentTheme === "dark" ? (
                                    <ImSun className="sun" />
                                ) : (
                                    <BsFillMoonFill className="moon" />
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
