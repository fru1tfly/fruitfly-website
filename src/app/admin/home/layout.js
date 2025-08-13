import { Outlet } from "react-router";
import AdminSidebar from "./sidebar/adminSidebar";

const AdminLayout = () => {
    return (
        <div className="admin-container">
            <AdminSidebar />
            <Outlet />
        </div>
    );
};

export default AdminLayout;