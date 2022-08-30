import React from 'react'
import Login from '../components/Login'
import Calendar from '../components/Calendar'
import { useAuthContext } from "../contexts/AuthContext";

const checkForToken = (token) => {
    if (token === '') {
        return <Login />
    } else {
        return <Calendar />
    }
}

export default function Home() {
    const { token } = useAuthContext();

    return checkForToken(token)
}