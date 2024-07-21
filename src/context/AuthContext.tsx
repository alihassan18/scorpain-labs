import React, { createContext, useState } from 'react';

export const UserContext = createContext<{ userData: any; setUserData: React.Dispatch<React.SetStateAction<string>> }>({ userData: "", setUserData: () => { } });

type Props = {
    children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
    const [userData, setUserData] = useState('');


    const values = {
        setUserData,
        userData
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
}

export default AuthProvider;
