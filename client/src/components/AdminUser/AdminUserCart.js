import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function AdminUserCart({ userCart }) {
    let trElements = null;
    const [product_id, setProductId] = useState([]);
    const [number_product, setNumberProduct] = useState([]);
    const [btnUpdate, setBtnUpdate] = useState([]);
    const handleDelete = async (id) => {
        const deleteUser = await fetch(`http://localhost:4242/admin/cart`, {
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
    const handleCancel = (index, cartKey) => {
        product_id[index] = userCart[index][cartKey].product_id;
        setProductId([...product_id]);
        number_product[index] = userCart[index][cartKey].number_product;
        setNumberProduct([...number_product]);

        btnUpdate[index] = !btnUpdate[index];
        setBtnUpdate([...btnUpdate]);
    };
    const handleEdit = (key) => {
        btnUpdate[key] = !btnUpdate[key];
        setBtnUpdate([...btnUpdate]);
    };
    const handleUpdate = async (index, cartKey) => {
        if (
            (product_id[index] !== "" && product_id[index]) ||
            (number_product[index] !== "" && number_product[index])
        ) {
            const updateUser = await fetch(`http://localhost:4242/admin/cart`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    id: userCart[index][cartKey].id,
                    product_id: product_id[index],
                    number_product: number_product[index],
                }),
            });
            if (updateUser.ok) {
                window.location.reload();
            }
        }
    };
    if (userCart) {
        trElements = Object.keys(userCart).map((key) => {
            if (userCart[key].length > 0) {
                return Object.keys(userCart[key]).map((cartKey) => {
                    return (
                        <tr key={cartKey}>
                            <td>{userCart[key][cartKey].user_id}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder={
                                        userCart[key][cartKey].product_id
                                    }
                                    value={product_id[key]}
                                    onChange={(e) => {
                                        product_id[key] = e.target.value;
                                        setProductId([...product_id]);
                                    }}
                                    disabled={!btnUpdate[key]}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder={
                                        userCart[key][cartKey].number_product
                                    }
                                    value={number_product[key]}
                                    onChange={(e) => {
                                        number_product[key] = e.target.value;
                                        setNumberProduct([...number_product]);
                                    }}
                                    disabled={!btnUpdate[key]}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        btnUpdate[key] === true
                                            ? handleUpdate(key, cartKey)
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
                                            ? handleCancel(key, cartKey)
                                            : handleDelete(userCart[key][cartKey].id);
                                    }}
                                >
                                    {btnUpdate[key] === true ? (
                                        "Annuler"
                                    ) : (
                                        <AiFillDelete />
                                    )}
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
                    <h2>Panier utilisateur</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id User</th>
                                <th>Id Produit</th>
                                <th>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>{trElements}</tbody>
                    </table>
                </>
            ) : null}
        </>
    );
}
