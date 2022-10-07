import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function AdminUserAdress({ userAdress }) {
    const [adress, setAdress] = useState([]);
    const [city, setCity] = useState([]);
    const [postal_code, setPostalCode] = useState([]);
    const [btnUpdate, setBtnUpdate] = useState([]);
    let trElements = null;
    const handleDelete = async (id) => {
        const deleteUser = await fetch(`http://localhost:4242/admin/residence`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                id,
            }),
        });
        if (deleteUser.ok) {
            window.location.reload();
        }
    };
    const handleCancel = (index, adressKey) => {
        adress[index] = userAdress[index][adressKey].adress;
        setAdress([...adress]);
        city[index] = userAdress[index][adressKey].city;
        setCity([...city]);
        postal_code[index] = userAdress[index][adressKey].postal_code;
        setPostalCode([...postal_code]);

        btnUpdate[index] = !btnUpdate[index];
        setBtnUpdate([...btnUpdate]);
    };
    const handleEdit = (key) => {
        btnUpdate[key] = !btnUpdate[key];
        setBtnUpdate([...btnUpdate]);
    };
    const handleUpdate = async (index, adressKey) => {
        if (
            (adress[index] !== "" && adress[index]) ||
            (city[index] !== "" && city[index]) ||
            (postal_code[index] !== "" && postal_code[index])
        ) {
            const updateUser = await fetch(`http://localhost:4242/admin/residence`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    id: userAdress[index][adressKey].id,
                    adress: adress[index],
                    city: city[index],
                    postal_code: postal_code[index],
                }),
            });
            if (updateUser.ok) {
                window.location.reload();
            }
        }
    };
    if (userAdress) {
        trElements = Object.keys(userAdress).map((key) => {
            if (userAdress[key].length > 0) {
                return Object.keys(userAdress[key]).map((adressKey) => {
                    return (
                        <tr key={adressKey}>
                            <td>{userAdress[key][adressKey].user_id}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder={
                                        userAdress[key][adressKey].adress
                                    }
                                    value={adress[key]}
                                    onChange={(e) => {
                                        adress[key] = e.target.value;
                                        setAdress([...adress]);
                                    }}
                                    disabled={!btnUpdate[key]}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder={
                                        userAdress[key][adressKey].city
                                    }
                                    value={city[key]}
                                    onChange={(e) => {
                                        city[key] = e.target.value;
                                        setCity([...city]);
                                    }}
                                    disabled={!btnUpdate[key]}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder={
                                        userAdress[key][adressKey].postal_code
                                    }
                                    value={postal_code[key]}
                                    onChange={(e) => {
                                        postal_code[key] = e.target.value;
                                        setPostalCode([...postal_code]);
                                    }}
                                    disabled={!btnUpdate[key]}
                                />
                            </td>
                            <td>{userAdress[key][adressKey].country}</td>
                            <td>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        btnUpdate[key] === true
                                            ? handleUpdate(key, adressKey)
                                            : handleEdit(key);
                                    }}
                                >
                                    {btnUpdate[key] === true
                                        ? "Sauvegarder"
                                        : "Editer"}
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        btnUpdate[key] === true
                                            ? handleCancel(key, adressKey)
                                            : handleDelete(key);
                                    }}
                                >
                                    {btnUpdate[key] === true
                                        ? "Annuler"
                                        : <AiFillDelete />}
                                </button>
                            </td>
                        </tr>
                    );
                });
            }
        });
    }
    return (
        <>
            {trElements ? (
                <>
                    <h2>Adresses Utilisateur</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>UserId</th>
                                <th>Adresse</th>
                                <th>Ville</th>
                                <th>Code Postal</th>
                                <th>Pays</th>
                            </tr>
                        </thead>
                        <tbody>{trElements}</tbody>
                    </table>
                </>
            ) : null}
        </>
    );
}
