import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";

function BillAdress({ setSelectedAdress }) {
    const [adress, setAdress] = useState("");
    const [city, setCity] = useState("");
    const [postal_code, setPostal_code] = useState("");
    const [userAdress, setUserAdress] = useState([]);
    const [btnMore, setBtnMore] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStyle, setAlertStyle] = useState("");
    const [styleInputActive, setStyleInputActive] = useState({
        backgroundColor: "white",
        borderColor: "#ccc",
    });
    useEffect(() => {
        const getUserInfo = async (token) => {
            const auth = jwtDecode(token).userInfo.id;
            const userResponse = await fetch(`http://localhost:4242/user`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    authorization: auth,
                },
            });
            if (userResponse.ok) {
                const jsonUserResponse = await userResponse.json();
                if (jsonUserResponse.user_adress !== undefined) {
                    setUserAdress(jsonUserResponse.user_adress);
                    console.log(userAdress.length);
                }
            }
        };
        if (
            localStorage.getItem("token") !== undefined ||
            localStorage.getItem("token") !== null
        ) {
            getUserInfo(localStorage.getItem("token"));
        }
    }, []);

    const handleChangeAdress = (event) => {
        setAdress(event.target.value);
    };
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };
    const handleChangePostal_code = (event) => {
        setPostal_code(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isNaN(parseInt(postal_code))) {
            const auth = jwtDecode(localStorage.getItem("token")).userInfo.id;
            const response = await fetch(
                "http://localhost:4242/user/residence",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: auth,
                    },
                    body: JSON.stringify({
                        adress,
                        city,
                        postal_code,
                        country: "France",
                    }),
                }
            );
            if (response.ok) {
                window.location.reload();
            }
        } else {
            setStyleInputActive({
                backgroundColor: "white",
                borderColor: "red",
                color: "#f94144",
            });
            setAlertMessage("Le code postal doit être un nombre");
            setAlertStyle("#f94144");
        }
    };
    return (
        <div className="adress">
            <h2>Adresse(s) de facturation</h2>
            {alertMessage !== "" && (
                <h3
                    style={{
                        backgroundColor: alertStyle,
                        color: "white",
                        fontSize: "1.2rem",
                        borderRadius: "5px",
                    }}
                >
                    <FiAlertCircle style={{ marginRight: ".5em" }} />
                    {alertMessage}
                </h3>
            )}
            {!userAdress && userAdress.length <= 0 ? (
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Adresse de facturation"
                        name="adress"
                        onChange={handleChangeAdress}
                        required
                    />
                    <input
                        placeholder="Ville"
                        name="city"
                        onChange={handleChangeCity}
                        required
                    />
                    <input
                        placeholder="Code postal"
                        name="postal_code"
                        onChange={handleChangePostal_code}
                        style={styleInputActive}
                        required
                    />
                    <input
                        name="country"
                        placeholder="Pays"
                        value="France"
                        disabled
                    />
                    <button className="btn" type="submit">
                        Enregistrer
                    </button>
                </form>
            ) : (
                <ListUserAdress
                    userAdress={userAdress}
                    btnMore={btnMore}
                    setBtnMore={setBtnMore}
                    setSelectedAdress={setSelectedAdress}
                />
            )}
            {btnMore === true && (
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Adresse de facturation"
                        name="adress"
                        onChange={handleChangeAdress}
                        required
                    />
                    <input
                        placeholder="Ville"
                        name="city"
                        onChange={handleChangeCity}
                        required
                    />
                    <input
                        placeholder="Code postal"
                        name="postal_code"
                        onChange={handleChangePostal_code}
                        required
                    />
                    <input
                        name="country"
                        placeholder="Pays"
                        value="France"
                        disabled
                    />
                    <button className="btn" type="submit">
                        Enregistrer
                    </button>
                </form>
            )}
        </div>
    );
}

function ListUserAdress(props) {
    const { userAdress, btnMore, setBtnMore, setSelectedAdress } = props;
    const [styleDeleteIcon, setStyleDeleteIcon] = useState({
        backgroundColor: "red",
        color: "white",
        borderRadius: "50%",
        padding: "5px",
        width: "15%",
        height: "auto",
    });
    const handleDeleteAdress = async (id) => {
        const response = await fetch(
            `http://localhost:4242/user/residence/?adress=${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.ok) {
            window.location.reload();
        }
    };
    const adresses = userAdress.map((adress, index) => {
        return (
            <div className="radio-buttons-container">
                <label htmlFor={index}>
                    <div>
                        <input
                            key={index}
                            type="radio"
                            name="adress"
                            value={adress.adress}
                            id={index}
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                    <div>
                        {adress.adress} - {adress.city} - {adress.postal_code}
                    </div>
                    <div id="btn-del"></div>
                    <AiFillDelete
                        style={styleDeleteIcon}
                        onClick={() => handleDeleteAdress(adress.id)}
                    />
                </label>
            </div>
        );
    });
    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedAdress(event.target.value);
    };
    return (
        <div className="panel-adress">
            {adresses}
            <button
                className="btn"
                disabled={btnMore}
                onClick={() => setBtnMore(true)}
            >
                Ajouter une adresse
            </button>
        </div>
    );
}

export default BillAdress;
