import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Account from "../components/Account/Account";

function UserPage({
    user,
    setUser,
    setUserRole,
    setAuthenticated,
    authenticated,
}) {
    useEffect(() => {
        if (localStorage.getItem("tokenG")) {
            const user = jwtDecode(localStorage.getItem("tokenG"));
            const getUser = async () => {
                const response = await fetch(
                    "http://localhost:4242/user/login",
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            password: `ggAuth${user.sub}-${user.given_name}-${user.family_name}`,
                        }),
                    }
                );
                if (response.ok) {
                    setAuthenticated(true);
                    const json = await response.json();
                    localStorage.setItem("token", json.id);
                }
            };
            if (authenticated === false) {
                getUser();
            }
        }
    }, []);
    return (
        <Account
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
        />
    );
}

export default UserPage;