import React, { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    Link,
} from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import jwt_decode from "jwt-decode";

const Login = ({
    handleChange,
    user,
    setUser,
    setUserFirstName,
    setUserLastName,
    setUserRole,
    setAuthenticated,
    authenticated,
}) => {
    //Google login
    const handleCallBackResponse = (response) => {
        setUser(jwt_decode(response.credential));
        setUserRole("user");
        localStorage.setItem("tokenG", response.credential);
    };
    useEffect(() => {
        // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
            client_id:
                "323151070959-606839skqvtcduht3lt1586ii0noq8di.apps.googleusercontent.com",
            callback: handleCallBackResponse,

        });
        // eslint-disable-next-line no-undef
        google.accounts.id.renderButton(document.getElementById("btnLogin"), {
            theme: "outline",
            size: "large",
        });
    }, []);
    // ------------------
    const paperStyle = {
        padding: 50,
        height: "40vh",
        width: 280,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "blue" };
    const btnstyle = { margin: "8px 0" };
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
        loginUser(
            email,
            password,
            setUserFirstName,
            setUserLastName,
            setUserRole,
            setAuthenticated
        );
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <PersonOutlineOutlinedIcon />
                    </Avatar>
                    {authenticated === false ? (
                        <h2>Se connecter</h2>
                    ) : (
                        <h2>Connexion réussi</h2>
                    )}
                </Grid>
                <div id="btnLogin"></div>
                <form onSubmit={handleSubmitForm}>
                    <TextField
                        label="E-mail"
                        placeholder="Entrer votre e-mail"
                        fullWidth
                        required
                        onChange={handleChangeEmail}
                    />
                    <TextField
                        label="Mot de Passe"
                        placeholder="Mot de Passe"
                        type="password"
                        fullWidth
                        required
                        onChange={handleChangePassword}
                    />

                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Se souvenir de moi"
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Se connecter
                    </Button>
                    <Typography>
                        <Link href="#">Mot de passe oublié ?</Link>
                    </Typography>
                    <Typography>
                        Vous n'avez pas de compte ?
                        <Link href="#" onClick={() => handleChange("event", 1)}>
                            S'inscrire
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

async function loginUser(
    email,
    password,
    setFirstName,
    setLastName,
    setUserRole,
    setAuthenticated
) {
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
        const jsonResponse = await loginResponse.json();
        console.log(jsonResponse);
        localStorage.setItem("token", jsonResponse.id);
        setAuthenticated(true);
        setUserRole(jsonResponse.roles);
        window.location.reload();
    }
}

export default Login;
