import styles from './sidebar.module.css';
import boyComputer from 'assets/boy-computer.png';

import { useContext } from 'react';
import { NavLink } from 'react-router';

import { UserContext } from 'stores/UserContext';


const AdminSidebar = () => {
    const userInfo = useContext(UserContext);
    const navbarClass = ({ isActive }) => `${styles.navbarLink} ${isActive ? styles.navbarLinkActive : ''}`;

    return (
        <nav className={styles.adminSidebar}>
            <div className={styles.userInfo}>
                <i className="fa-solid fa-circle-user"></i>
                <span>{userInfo.username}</span>
            </div>
            <div className="img-container">
                <img src={boyComputer} alt="Fruitfly" className={styles.logo} />
            </div>
            <NavLink to="shows" className={navbarClass}><i className="fa-solid fa-ticket"></i><span>Shows</span></NavLink>
            <NavLink to="venues" className={navbarClass}><i className="fa-solid fa-people-roof"></i><span>Venues</span></NavLink>
        </nav>
    );
};

export default AdminSidebar;