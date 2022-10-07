import AdminProductPage from "../../View/AdminProductPage";
import AdminUserPage from "../../View/AdminUserPage";
import AdminSidebar from "./AdminSidebar";

const AdminHome = () => {
    return (
        <div className="adminhome">
            <AdminSidebar />
            <div className="adminhomeContainer">
                <AdminProductPage />
                <AdminUserPage />
            </div>
        </div>
    );
};

export default AdminHome;
