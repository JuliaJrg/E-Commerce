import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Login = ({
    handleChange,
    user,
    setUser,
    setUserRole,
    setAuthenticated,
    authenticated,
}) => {
    // //Google login
    // const handleCallBackResponse = (response) => {
    //     setUser(jwt_decode(response.credential));
    //     setUserRole("user");
    //     localStorage.setItem("token", response.credential);
    // };
    // useEffect(() => {
    //     // eslint-disable-next-line no-undef
    //     google.accounts.id.initialize({
    //         client_id:
    //             "323151070959-606839skqvtcduht3lt1586ii0noq8di.apps.googleusercontent.com",
    //         callback: handleCallBackResponse,

    //     });
    //     // eslint-disable-next-line no-undef
    //     google.accounts.id.renderButton(document.getElementById("btnLogin"), {
    //         theme: "outline",
    //         size: "large",
    //     });
    // }, []);
    // // ------------------
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        loginUser(email, password, setAuthenticated);
    };

    return (
        <div className="login-container">
            <div className="container mx-3 py-3">
                <div className="content">
                    <div className="title-container">
                        <h2>Se Connecter</h2>
                    </div>
                    <form
                        className="subscribe-container"
                        onSubmit={handleSubmitForm}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={handleChangeEmail}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            required
                            onChange={handleChangePassword}
                        />
                        <button type="submit" className="btn">Connexion</button>
                        <Link to="/register" className="register">S'inscrire</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

async function loginUser(email, password, setAuthenticated) {
    const data = JSON.stringify({
        email: email,
        password: password,
    });
    const loginResponse = await fetch("http://localhost:4242/user/login", {
        method: "post",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });
    if (loginResponse.ok) {
        const jsonResponse = await loginResponse.text();
        localStorage.setItem("token", jsonResponse);
        window.location.href = "/user";
    }
}

export default Login;