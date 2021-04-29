import React from 'react';
import './App.css';
import AdminHome from "./components/admin";
import CustomerHome from "./components/customer";
import Login from "./components/Login";
import jwtDecode from "jwt-decode";
import JWTStructure from "./models/JWTStructure";
import useToken from "./custom_hooks/useToken";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';

function App() {
    const {token, setToken} = useToken();
    if (!token)
        return <Login tokenExpired={false} setToken={setToken}/>;
    else {
        let decoded = jwtDecode<JWTStructure>(token);
        if (isExpired(decoded)) {
            localStorage.removeItem('user');
            return <Login tokenExpired={true} setToken={setToken}/>;
        } else {
            let user = decoded.user;
            let isAdmin = user.role === "admin";
            localStorage.setItem('user', JSON.stringify(user));
            const path = window.location.pathname;

            return (
                <div className={"w-100"}>
                    {
                        <BrowserRouter>
                            <Switch>
                                <Route path={"/admin"}>
                                    <AdminHome/>
                                </Route>
                                <Route path={"/customer"}>
                                    <CustomerHome/>
                                </Route>
                                {
                                    (path === "/") ?
                                        (<Redirect to={isAdmin ? '/admin' : '/customer'}/>)
                                        : <Redirect to={path}/>
                                }
                            </Switch>
                        </BrowserRouter>
                    }
                </div>
            );
        }
    }
}

function isExpired(decoded: JWTStructure) {
    return decoded.exp * 1000 < Date.now();
}
export default App;
