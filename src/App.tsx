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
import {Navbar, NavbarBrand, NavbarText, NavLink} from "bootstrap-react";

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
            return (
                <div className={"w-100"}>
                    <div className={"col-md-6 mx-auto pb-1"}>
                        <Navbar className={"bg-dark w-100 pr-1"}>
                            <NavbarBrand className={"text-white mr-auto"}>
                                {isAdmin ? <span>Admin Area</span> : <span>Customer Area</span>}
                            </NavbarBrand>
                            <NavbarText className={"text-white font-weight-bolder d-block"}>
                                {user.name}
                            </NavbarText>
                            <NavLink className={"text-white-50"} href={"/"} onClick={(e) => {
                                e.preventDefault();
                                setToken("");
                                localStorage.removeItem('user');
                            }}><small>Logout</small></NavLink>
                        </Navbar>

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
