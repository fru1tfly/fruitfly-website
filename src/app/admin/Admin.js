import 'app/styles/admin.css';

import { useEffect, useState } from 'react';
import { UserContext, UserUpdateContext } from 'stores/UserContext';
import { getUserInfo } from 'utils';

import Login from './login';
import AdminLayout from './home/layout';

const Admin = () => {

    const [pageLoaded, setPageLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        setUserInfo(getUserInfo());
        setPageLoaded(true);
    }, []);

    return (
        <div className="admin-bg">
            <UserContext.Provider value={userInfo}>
                <UserUpdateContext.Provider value={setUserInfo}>
                    {!userInfo && pageLoaded && <Login /> }
                    {userInfo && pageLoaded && <AdminLayout />}
                </UserUpdateContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default Admin;