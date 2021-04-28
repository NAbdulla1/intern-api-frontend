import React from 'react';
import './App.css';
import AdminHome from "./components/admin";
import CustomerHome from "./components/customer";
import Login from "./components/Login";
import jwtDecode from "jwt-decode";
import JWTStructure from "./models/JWTStructure";
import useToken from "./user_and_token/useToken";
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
            const path = window.location.pathname;

            return (
                <div className={"w-100"}>
                    <div className={"col-md-6 mx-auto pb-1"}>
                        <Navbar className={"bg-dark w-100 pr-1 rounded-bottom"}>
                            <NavbarBrand className={"text-white mr-auto"}>
                                {isAdmin ? <span>Admin Area</span> : <span>Customer Area</span>}
                            </NavbarBrand>

                            {
                                isAdmin ?
                                    <>
                                        <NavLink href={'/admin/products'}
                                                 className={path.includes('products') || path === '/admin' ? 'text-white' : 'text-white-50'}>Products</NavLink>
                                        <NavLink href={'/admin/orders'}
                                                 className={path.includes('orders') ? 'text-white' : 'text-white-50'}>Orders</NavLink>
                                    </> :
                                    <>
                                        <NavLink href={'/customer/products'}
                                                 className={path.includes('products') || path === '/customer' ? 'text-white' : 'text-white-50'}>Products</NavLink>
                                        <NavLink href={'/customer/orders'}
                                                 className={path.includes('orders') ? 'text-white' : 'text-white-50'}>Orders</NavLink>
                                    </>
                            }

                            <NavbarText className={"text-white font-weight-bolder d-block px-3"}>
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
                </div>
            );
        }
    }
}

function isExpired(decoded: JWTStructure) {
    return decoded.exp * 1000 < Date.now();
}
export default App;
