/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import App from '../../App';
import { StorageUtil } from '../../StorageUtil';
import { User, UserContext } from './UserContext';

const AppContext = () => {
    const [user, setUser] = useState<User>({});
    const { saveData, loadData } = StorageUtil();

    useEffect(() => {
        const userData = loadData("user");
        if (userData?.uid !== undefined) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        if (user?.uid !== undefined) {
            saveData("user", user);
        } else {
            saveData("user", {});
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <App />
        </UserContext.Provider>
    )
}

export default AppContext;