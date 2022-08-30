// context/todoContext.tsx
import * as React from "react";

export const AuthContext = React.createContext('');

const AuthProvider = (props) => {
	const [token, setToken] = React.useState('');

	return (
        <AuthContext.Provider value={{
                token,
                setToken
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export function useAuthContext() {
	return React.useContext(AuthContext);
}
