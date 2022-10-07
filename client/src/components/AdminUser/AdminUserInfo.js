import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function AdminUserInfo({ users }) {
    const [btnUpdate, setBtnUpdate] = useState([]);
    const [first_name, setFirstName] = useState([]);
    const [last_name, setLastName] = useState([]);
    const [birthday, setBirthday] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [phone, setPhone] = useState([]);
    const [roles, setRoles] = useState([]);
    const [company, setCompany] = useState([]);
    const [siret, setSiret] = useState([]);
    const [pro_verify, setProVerify] = useState([]);

    const handleDelete = async (id) => {
        const deleteUser = await fetch(`http://localhost:4242/admin/`, {
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
    const handleUpdate = async (index) => {
        if (
            (first_name[index] !== "" && first_name[index]) ||
            (last_name[index] !== "" && last_name[index]) ||
            (birthday[index] !== "" && birthday[index]) ||
            (email[index] !== "" && email[index]) ||
            (password[index] !== "" && password[index]) ||
            (phone[index] !== "" && phone[index]) ||
            (roles[index] !== "" && roles[index]) ||
            (company[index] !== "" && company[index]) ||
            (siret[index] !== "" && siret[index]) ||
            (pro_verify[index] !== "" && pro_verify[index])
        ) {
            const updateUser = await fetch(`http://localhost:4242/admin/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    id: users[index].id,
                    first_name: first_name[index],
                    last_name: last_name[index],
                    birthday: birthday[index],
                    email: valideEmail(email[index]) ? email[index] : users[index].email,
                    password: password[index],
                    phone: phone[index],
                    roles: roles[index],
                    company: company[index],
                    siret: siret[index],
                    pro_verify: pro_verify[index],
                }),
            });
            if (updateUser.ok) {
                window.location.reload();
            }
        }
    };
    const handleCancel = (index) => {
        first_name[index] = users[index].first_name;
        setFirstName([...first_name]);
        last_name[index] = users[index].last_name;
        setLastName([...last_name]);
        birthday[index] = users[index].birthday;
        setBirthday([...birthday]);
        email[index] = users[index].email;
        setEmail([...email]);
        phone[index] = users[index].phone;
        setPhone([...phone]);
        roles[index] = users[index].roles;
        setRoles([...roles]);
        company[index] = users[index].company;
        setCompany([...company]);
        siret[index] = users[index].siret;
        setSiret([...siret]);
        pro_verify[index] = users[index].pro_verify;
        setProVerify([...pro_verify]);
        btnUpdate[index] = !btnUpdate[index];
        setBtnUpdate([...btnUpdate]);
    };
    const handleEdit = (key) => {
        btnUpdate[key] = !btnUpdate[key];
        setBtnUpdate([...btnUpdate]);
    };
    const trElements = users.map((user, index) => {
        return (
            <tr key={index}>
                <td>{user.id}</td>
                <td>
                    <input
                        type="text"
                        placeholder={user.first_name}
                        value={first_name[index]}
                        onChange={(e) => {
                            first_name[index] = e.target.value;
                            setFirstName([...first_name]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder={user.last_name}
                        value={last_name[index]}
                        onChange={(e) => {
                            last_name[index] = e.target.value;
                            setLastName([...last_name]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="date"
                        placeholder={user.birthday}
                        value={birthday[index]}
                        onChange={(e) => {
                            birthday[index] = e.target.value;
                            setBirthday([...birthday]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="tel"
                        placeholder={user.phone}
                        value={phone[index]}
                        onChange={(e) => {
                            phone[index] = e.target.value;
                            setPhone([...phone]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="password"
                        placeholder="/"
                        value={password[index]}
                        onChange={(e) => {
                            password[index] = e.target.value;
                            setPassword([...password]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="email"
                        placeholder={user.email}
                        value={email[index]}
                        onChange={(e) => {
                            email[index] = e.target.value;
                            setEmail([...email]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <select
                        value={roles[index]}
                        onChange={(e) => {
                            roles[index] = e.target.value;
                            setRoles([...roles]);
                        }}
                        disabled={!btnUpdate[index]}
                    >
                        <option value="">Role: {user.roles}</option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>
                </td>
                <td>
                    <input
                        type="text"
                        placeholder={
                            user.company ? user.company : "Aucune entreprise"
                        }
                        value={company[index]}
                        onChange={(e) => {
                            company[index] = e.target.value;
                            setCompany([...company]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="number"
                        placeholder={user.siret ? user.siret : "Aucun siret"}
                        value={siret[index]}
                        onChange={(e) => {
                            siret[index] = e.target.value;
                            setSiret([...siret]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        checked={user.pro_verify}
                        value={pro_verify[index]}
                        onChange={(e) => {
                            console.log(e.target.checked);
                            pro_verify[index] = e.target.checked;
                            setProVerify([...pro_verify]);
                        }}
                        disabled={!btnUpdate[index]}
                    />
                </td>
                <td>
                    <button
                        className="btn"
                        onClick={() => {
                            btnUpdate[index] === true
                                ? handleUpdate(index)
                                : handleEdit(index);
                        }}
                    >
                        {btnUpdate[index] === true ? "Sauvegarder" : "Editer"}
                    </button>
                </td>
                <td>
                    <button
                        onClick={() => {
                            btnUpdate[index] === true
                                ? handleCancel(index)
                                : handleDelete(user.id);
                        }}
                    >
                        {btnUpdate[index] === true ? "Annuler" : <AiFillDelete />}
                    </button>
                </td>
            </tr>
        );
    });
    return (
        <>
            {trElements ? (
                <>
                    <h2>Utilisateurs</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Date de naissance</th>
                                <th>Téléphone</th>
                                <th>Mot de passe</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Entreprise</th>
                                <th>N° SIRET</th>
                                <th>Pro</th>
                            </tr>
                        </thead>
                        <tbody>{trElements}</tbody>
                    </table>
                </>
            ) : null}
        </>
    );
}

const valideEmail = (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
}