import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminUserAdress from "../components/AdminUser/AdminUserAdress";
import AdminUserCart from "../components/AdminUser/AdminUserCart";
import AdminUserInfo from "../components/AdminUser/AdminUserInfo";
import AdminUserPayment from "../components/AdminUser/AdminUserPayment";
import AdminUserReview from "../components/AdminUser/AdminUserReview";

function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [userAdress, setUserAdress] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    useEffect(() => {
        const getUserInfo = async () => {
            const userResponse = await fetch("http://localhost:4242/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUsers(userData);
                Object.keys(userData).forEach((key) => {
                    Object.keys(userData[key]).forEach((userKey) => {
                        if (userKey === "cart") {
                            userCart[key] = userData[key][userKey];
                        } else if (userKey === "user_adress") {
                            userAdress[key] = userData[key][userKey];
                        } else if (userKey === "user_payment") {
                            userOrders[key] = userData[key][userKey];
                        } else if (userKey === "review_product") {
                            userReviews[key] = userData[key][userKey];
                        }
                    });
                });
            }
        };
        if (users.length === 0) {
            getUserInfo();
        }
    }, []);
    return (
        <div className="user-admin-container">
            <h1>AdminUserPage</h1>
            {/* <AdminSidebar /> */}
            <div className="user-infos-container">
                <AdminUserInfo users={users} />
                <AdminUserAdress userAdress={userAdress} />
                <AdminUserCart userCart={userCart} />
                <AdminUserReview userReviews={userReviews} />
                <AdminUserPayment userOrders={userOrders} />
            </div>
        </div>
    );
}

export default AdminUserPage;
