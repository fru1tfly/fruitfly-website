import styles from './sidebar.module.css';
import boyComputer from 'assets/boy-computer.png';

import MediaQuery from 'react-responsive';

import { useContext, useState } from 'react';
import { NavLink } from 'react-router';

import { UserContext } from 'stores/UserContext';


const AdminSidebar = () => {
    const [mobileIsOpen, setMobileIsOpen] = useState(false);
    const userInfo = useContext(UserContext);
    const navbarClass = ({ isActive }) => `${styles.navbarLink} ${isActive ? styles.navbarLinkActive : ''}`;

    const sidebar = (
        <nav className={styles.adminSidebar}>
            <div className={styles.userInfo}>
                <i className="fa-solid fa-circle-user"></i>
                <span>{userInfo.username}</span>
            </div>
            <div className="img-container">
                <img src={boyComputer} alt="Fruitfly" className={styles.logo} />
            </div>
            <NavLink to="shows" className={navbarClass} onClick={() => setMobileIsOpen(false)}><i className="fa-solid fa-ticket"></i><span>Shows</span></NavLink>
            <NavLink to="venues" className={navbarClass} onClick={() => setMobileIsOpen(false)}><i className="fa-solid fa-people-roof"></i><span>Venues</span></NavLink>
        </nav>
    );

    return (
        <>
            <MediaQuery query="(min-width: 601px)">
                {sidebar}
            </MediaQuery>
            <MediaQuery query="(max-width: 600px)">
                {mobileIsOpen ? (sidebar) : (
                    <button className={styles.mobileAdminSidebarBtn} onClick={() => setMobileIsOpen(true)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                )}
            </MediaQuery>
        </>
    );
};

export default AdminSidebar;