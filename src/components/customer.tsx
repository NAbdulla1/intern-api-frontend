import getUser from "../user_and_token/GetUser";
import {Route, Switch} from "react-router-dom";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import {Alert, Navbar, NavbarBrand, NavbarText, NavLink} from "bootstrap-react";
import React from "react";
import useToken from "../custom_hooks/useToken";

const CustomerHome = () => {
    const path = window.location.pathname;
    const userName = getUser()?.name;
    const {token, setToken} = useToken();
    return (
        getUser() !== null && getUser()?.role !== 'admin' ?
            <div>
                <div className={"col-md-6 mx-auto pb-1"}>
                    <Navbar className={"bg-dark w-100 pr-1 rounded-bottom"}>
                        <NavbarBrand className={"text-white mr-auto"}>
                            <span>Customer Area</span>
                        </NavbarBrand>
                        {
                            <>
                                <NavLink href={'/customer/products'}
                                         className={path.includes('products') || path === '/customer' ? 'text-white' : 'text-white-50'}>Products</NavLink>
                                <NavLink href={'/customer/orders'}
                                         className={path.includes('orders') ? 'text-white' : 'text-white-50'}>Orders</NavLink>
                            </>
                        }
                        <NavbarText className={"text-white font-weight-bolder d-block px-3"}>
                            {userName ? userName : 'Unknown'}
                        </NavbarText>
                        <NavLink className={"text-white-50"} href={"/"} onClick={() => {
                            setToken("");
                            localStorage.removeItem('user');
                        }}><small>Logout</small></NavLink>
                    </Navbar>
                    <Switch>
                        <Route path={"/customer/products"}>
                            <ProductList/>
                        </Route>
                        <Route path={"/customer/orders"}>
                            <OrderList/>
                        </Route>
                        <Route path={"/customer"}>
                            <ProductList/>
                        </Route>
                    </Switch>
                </div>
            </div>
            :
            <div className={'mt-3'}>
                <Alert color={'danger'}>Sorry, You don't have right to see this page.</Alert>
            </div>
    )
}

export default CustomerHome;