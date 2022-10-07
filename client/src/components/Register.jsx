import React, { useState } from "react";

const Register = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [accountType, setAccountType] = useState("user");
    const [companyName, setCompanyName] = useState(null);
    const [siretCode, setSiretCode] = useState(null);

    const allUserInfo = [];
    const handleInputChange = (e) => {
        if (e.target.name === "lastName") {
            setLastName(e.target.value);
        }
        if (e.target.name === "firstName") {
            setFirstName(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "birthday") {
            setBirthday(e.target.value);
        }
        if (e.target.name === "phone") {
            setPhone(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
        if (e.target.name === "accountType") {
            setAccountType(e.target.value);
        }
        if (e.target.name === "companyName") {
            setCompanyName(e.target.value);
        }
        if (e.target.name === "siretCode") {
            setSiretCode(e.target.value);
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            birthday !== "" &&
            phone !== "" &&
            password !== "" &&
            accountType !== ""
        ) {
            if (
                accountType === "pro" &&
                companyName !== "" &&
                siretCode !== ""
            ) {
                allUserInfo.push(
                    lastName,
                    firstName,
                    email,
                    birthday,
                    phone,
                    password,
                    companyName,
                    siretCode
                );
            } else {
                allUserInfo.push(
                    lastName,
                    firstName,
                    email,
                    birthday,
                    phone,
                    password
                );
            }
        }
        registerUser(allUserInfo);
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setBirthday(null);
        setPhone(null);
        setPassword(null);
        setCompanyName(null);
        setSiretCode(null);
    };

    return (
        <div className="register-container">
            <div className="container mx-3 py-3">
                <div className="content">
                    <div className="title-container">
                        <h2>S'inscrire</h2>
                    </div>
                    <form
                        onSubmit={handleSubmitForm}
                        className="subscribe-container"
                    >
                        <input
                            type="text"
                            label="Nom"
                            placeholder="Nom"
                            value={lastName}
                            required
                            onChange={handleInputChange}
                            name="lastName"
                            aria-label="Nom"
                        />
                        <input
                            type="text"
                            label="Prénom"
                            placeholder="Prénom"
                            value={firstName}
                            required
                            onChange={handleInputChange}
                            name="firstName"
                            aria-label="Prénom"
                        />
                        <input
                            type="email"
                            label="Email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={handleInputChange}
                            name="email"
                            aria-label="Email"
                        />
                        <input
                            type="date"
                            id="date"
                            name="birthday"
                            value={birthday}
                            onChange={handleInputChange}
                            max="2022-08-31"
                            min="1940-01-01"
                            required
                            aria-label="Date de naissance"
                        />
                        <input
                            type="tel"
                            label="Téléphone"
                            placeholder="Téléphone"
                            value={phone}
                            onChange={handleInputChange}
                            name="phone"
                            aria-label="Téléphone"
                        />
                        <input
                            type="password"
                            label="Mot de passe"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={handleInputChange}
                            name="password"
                            aria-label="Mot de passe"
                        />
                        <h2>Type de compte</h2>
                        <select
                            labelId="Compte"
                            label="Compte"
                            id="Compte"
                            value={accountType}
                            onChange={handleInputChange}
                            name="accountType"
                            aria-label="Compte"
                            required
                        >
                            <option value={"user"}>Utilisateur</option>
                            <option value={"pro"}>Profesionnel</option>
                        </select>
                        {accountType === "pro" && (
                            <div>
                                <input
                                    type="text"
                                    label="Nom de la société"
                                    placeholder="Nom de la société"
                                    value={companyName}
                                    onChange={handleInputChange}
                                    name="companyName"
                                    aria-label="Nom de la société"
                                />
                                <input
                                    type="number"
                                    label="Numéro de SIRET"
                                    placeholder="Numéro de SIRET"
                                    value={siretCode}
                                    onChange={handleInputChange}
                                    name="siretCode"
                                    aria-label="Numéro de SIRET"
                                />
                            </div>
                        )}
                        <button type="submit">S'inscrire</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
/**
 *
 * @param {Array} allUserInfo
 */
const registerUser = async (allUserInfo) => {
    let iter = 0;
    const data = {
        firstname: null,
        lastname: null,
        email: null,
        birthday: null,
        phone: null,
        password: null,
        companyName: null,
        siretCode: null,
    };

    for (const key in data) {
        if (iter < allUserInfo.length) {
            data[key] = allUserInfo[iter];
        }
        iter++;
    }

    // Register Request
    const registerResponse = await fetch("http://localhost:4242/user/sign", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (registerResponse.ok) {
        console.log("Registered !");
        const registerResponseData = await registerResponse.text();
        localStorage.setItem("token", registerResponseData);
        window.location.href = "/";
    } else {
        console.log("Verify your Information");
    }
};

export default Register;
