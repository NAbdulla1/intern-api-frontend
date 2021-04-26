import React from 'react';
import './App.css';
import AdminHome from "./components/admin";
import CustomerHome from "./components/customer";
import Login from "./components/login/Login";
import jwtDecode from "jwt-decode";
import JWTStructure from "./models/JWTStructure";
import useToken from "./components/useToken";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';

function App() {
    const {token, setToken} = useToken();
    if (!token)
        return <Login tokenExpired={false} setToken={setToken}/>;
    else {
        let decoded = jwtDecode<JWTStructure>(token);
        if (isExpired(decoded)) {
            return <Login tokenExpired={true} setToken={setToken}/>;
        } else {
            let user = decoded.user;
            localStorage.setItem('user', JSON.stringify(user));
            return (
                <div className={"container row"}>
                    <div className={"col-md-6 mx-auto p-5"}>
                        {
                            <BrowserRouter>
                                <Route path={"/"}>
                                    {(user.role === "admin") ? <Redirect to={"/admin"}/> : <Redirect to={"/customer"}/>}
                                </Route>
                                <Switch>
                                    <Route path={"/admin"}>
                                        <AdminHome/>
                                        {(user.role === "admin") ? <Redirect to={"/admin"}/> :
                                            <Redirect to={"/customer"}/>}
                                    </Route>
                                    <Route path={"/customer"}>
                                        <CustomerHome/>
                                        {(user.role === "admin") ? <Redirect to={"/admin"}/> :
                                            <Redirect to={"/customer"}/>}
                                    </Route>
                                </Switch>
                            </BrowserRouter>
                        }
                    </div>
                </div>
            );
        }
    }
}

function isExpired(decoded: JWTStructure) {
    return decoded.exp * 1000 < Date.now();
}
export default App;
