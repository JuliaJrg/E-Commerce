import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import jwtDecode from "jwt-decode";
import BillAdress from "./BillAdress";

export default function Account({ authenticated, setAuthenticated }) {
    const [userData, setUserData] = useState({});
    const [btnFirstName, setBtnFirstName] = useState(true);
    const [btnLastName, setBtnLastName] = useState(true);
    const [btnEmail, setBtnEmail] = useState(true);
    const [btnPassword, setBtnPassword] = useState(true);
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState(userData.password);
    const [verifyPassword, setVerifyPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStyle, setAlertStyle] = useState("");

    const [displayOption, setDisplayOption] = useState("none");
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://localhost:4242/user`, {
                method: "get",
                headers: {
                    authorization: jwtDecode(localStorage.getItem("token"))
                        .userInfo.id,
                },
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                setUserData(jsonResponse);
            }
        };
        if (Object.keys(userData).length === 0) {
            getUser();
        }
    });
    const [styleInputActive, setStyleInputActive] = useState({
        backgroundColor: "white",
        borderColor: "#ccc",
    });

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeVerifyPassword = (e) => {
        setVerifyPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = jwtDecode(localStorage.getItem("token")).userInfo.id;
        if (password !== "" && password && verifyPassword !== "") {
            if (password === verifyPassword) {
                const data = {
                    password,
                };
                const response = await fetch("http://localhost:4242/user", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: auth,
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    setStyleInputActive({
                        backgroundColor: "white",
                        borderColor: "green",
                    });
                    setAlertStyle("#4caf50");
                    setAlertMessage("Enregistrement réussi");
                }
            } else {
                setStyleInputActive({
                    backgroundColor: "white",
                    borderColor: "red",
                });
                setAlertStyle("#f94144");
                setAlertMessage("Les mots de passe ne correspondent pas");
            }
        } else if (email && email !== "" && validateEmail(email)) {
            if (email !== userData.email) {
                const data = {
                    email,
                };
                const response = await fetch("http://localhost:4242/user", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: auth,
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    setStyleInputActive({
                        backgroundColor: "white",
                        borderColor: "green",
                    });
                    setAlertStyle("#4caf50");
                    setAlertMessage("Enregistrement réussi");
                }
            } else {
                setStyleInputActive({
                    backgroundColor: "white",
                    borderColor: "red",
                });
                setAlertStyle("#f94144");
                setAlertMessage(
                    "L'email ne doit pas être identique à l'ancien"
                );
            }
        } else if (firstName && firstName !== "") {
            if (firstName !== userData.first_name) {
                const data = {
                    first_name: firstName,
                };
                const response = await fetch("http://localhost:4242/user", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: auth,
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    setStyleInputActive({
                        backgroundColor: "white",
                        borderColor: "green",
                    });
                    setAlertStyle("#4caf50");
                    setAlertMessage("Enregistrement réussi");
                }
            } else {
                setStyleInputActive({
                    backgroundColor: "white",
                    borderColor: "red",
                });
                setAlertStyle("#f94144");
                setAlertMessage(
                    "Le prénom ne doit pas être identique à l'ancien"
                );
            }
        } else if (lastName && lastName !== "") {
            if (lastName !== userData.last_name) {
                const data = {
                    last_name: lastName,
                };
                const response = await fetch("http://localhost:4242/user", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: auth,
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    setStyleInputActive({
                        backgroundColor: "white",
                        borderColor: "green",
                    });
                    setAlertStyle("#4caf50");
                    setAlertMessage("Enregistrement réussi");
                }
            } else {
                setStyleInputActive({
                    backgroundColor: "white",
                    borderColor: "red",
                });
                setAlertStyle("#f94144");
                setAlertMessage("Le nom ne doit pas être identique à l'ancien");
            }
        } else {
            setStyleInputActive({
                backgroundColor: "white",
                borderColor: "red",
            });
            setAlertStyle("#f94144");
            setAlertMessage(
                "Email ou mot de passe n'est pas remplis correctement"
            );
        }
    };
    let user = null;
    if (localStorage.getItem("tokenG")) {
        user = jwtDecode(localStorage.getItem("tokenG"));
    }
    const handleClick = () => {
        if (!user) {
            const signUserResponse = fetch("http://localhost:4242/user/sign", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: user.given_name,
                    lastname: user.family_name,
                    birthday: new Date(Date.now()).toString(),
                    email: user.email,
                    password: `ggAuth${user.sub}-${user.given_name}-${user.family_name}`,
                }),
            });
            signUserResponse.then((success) => {
                if (success.status === 409 || success.ok) {
                    setAuthenticated(true);
                }
            });
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("tokenG");
        localStorage.removeItem("token");
        window.location.reload();
        window.location.href = "/";
    };
    return (
        <div className="container-user-page">
            <div className="row">
                <div className="row-center">
                    <div id="name" className="col">
                        <h2>
                            Bonjour {userData.first_name} {userData.last_name}
                        </h2>
                    </div>
                </div>
                <div className="row-item">
                    <form onSubmit={handleSubmit}>
                        <h2>Vos informations :</h2>
                        {alertMessage !== "" && (
                            <h3
                                style={{
                                    backgroundColor: alertStyle,
                                    color: "white",
                                    fontSize: "1.2rem",
                                    borderRadius: "5px",
                                }}
                            >
                                <FiAlertCircle
                                    style={{ marginRight: ".5em" }}
                                />
                                {alertMessage}
                            </h3>
                        )}
                        <div className="form-row">
                            <label for="firstname">
                                Prénom:
                                <AiFillEdit
                                    style={{
                                        padding: 5,
                                        border: "1.5px solid black",
                                        borderRadius: 15,
                                    }}
                                    size={25}
                                    onClick={() => {
                                        setBtnFirstName(false);
                                        setDisplayOption("block");
                                    }}
                                />
                            </label>
                            <input
                                type="text"
                                placeholder={userData.first_name}
                                value={firstName}
                                onChange={handleChangeFirstName}
                                id="firstname"
                                disabled={btnFirstName}
                                style={btnFirstName ? {} : styleInputActive}
                            />
                        </div>
                        <div className="form-row">
                            <label for="lastname">
                                Nom de famille:
                                <AiFillEdit
                                    style={{
                                        padding: 5,
                                        border: "1.5px solid black",
                                        borderRadius: 15,
                                    }}
                                    size={25}
                                    onClick={() => {
                                        setBtnLastName(false);
                                        setDisplayOption("block");
                                    }}
                                />
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                placeholder={userData.last_name}
                                onChange={handleChangeLastName}
                                id="lastname"
                                disabled={btnLastName}
                                style={btnLastName ? {} : styleInputActive}
                            />
                        </div>
                        <div className="form-row">
                            <label for="email">
                                Email:
                                <AiFillEdit
                                    style={{
                                        padding: 5,
                                        border: "1.5px solid black",
                                        borderRadius: 15,
                                    }}
                                    size={25}
                                    onClick={() => {
                                        setBtnEmail(false);
                                        setDisplayOption("block");
                                    }}
                                />
                            </label>
                            <input
                                type="text"
                                placeholder={userData.email}
                                value={email}
                                id="email"
                                onChange={handleChangeEmail}
                                disabled={btnEmail}
                                style={btnEmail ? {} : styleInputActive}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label for="password">
                                Mot de passe:
                                <AiFillEdit
                                    style={{
                                        padding: 5,
                                        border: "1.5px solid black",
                                        borderRadius: 15,
                                    }}
                                    size={25}
                                    onClick={() => {
                                        setBtnPassword(false);
                                        setDisplayOption("block");
                                    }}
                                />
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Mot de passe"
                                style={btnPassword ? {} : styleInputActive}
                                onChange={handleChangePassword}
                                disabled={btnPassword}
                            />
                        </div>
                        {!btnPassword && (
                            <div className="form-row">
                                <label for="verify_password">
                                    Confirmer le mot de passe:
                                </label>
                                <input
                                    type="password"
                                    id="verify_password"
                                    placeholder="Confirmer le mot de passe"
                                    style={btnPassword ? {} : styleInputActive}
                                    disabled={btnPassword}
                                    onChange={handleChangeVerifyPassword}
                                />
                            </div>
                        )}
                        <button
                            className="btnSend"
                            type="submit"
                            style={{ display: displayOption }}
                        >
                            Enregistrer
                        </button>
                    </form>
                </div>
                <div className="row-item-adress">
                    <BillAdress />
                </div>
                {user && authenticated === false && (
                    <button
                        className="btn-valid"
                        onClick={handleClick}
                    ></button>
                )}
            </div>
            <button className="btn-logout" onClick={handleLogout}>
                Se déconnecter
            </button>
        </div>
    );
}

const validateEmail = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
