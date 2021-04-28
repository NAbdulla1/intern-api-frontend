import {useState} from "react";

function useToken() {
    const getToken = () => {
        return localStorage.getItem('token');
    }

    const [token, setToken] = useState(getToken());

    const storeToken = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    }
    return {
        token,
        setToken: storeToken
    };
}

export default useToken;