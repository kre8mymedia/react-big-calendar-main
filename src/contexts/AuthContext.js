// context/todoContext.tsx
import * as React from "react";
import {
    loginUser
} from "../utils/api";

export const AuthContext = React.createContext('');

const AuthProvider = (props) => {
	const [token, setToken] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const submitLoginForm = async () => {
		console.log("AuthContext.submitLoginForm: ", {email});
        try {
            const creds = await loginUser({
                email,
                password
            });
            
            setToken(creds.token)
            localStorage.setItem('token', creds.token)
            setEmail('')
            setPassword('')
            console.log('AuthContext.submitLoginForm: ', creds)
        } catch(e) {
            alert(e)
            throw new Error(e);
        }
		
	};

    React.useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])

	return (
        <AuthContext.Provider value={{
                token,
                setToken,
                setEmail,
                setPassword,
                submitLoginForm
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export function useAuthContext() {
	return React.useContext(AuthContext);
}
