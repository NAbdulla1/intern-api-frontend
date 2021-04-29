import ProductList from "./ProductList";
import {Route, Switch} from "react-router-dom";
import getUser from '../user_and_token/GetUser';
import OrderList from "./OrderList";
import {Alert, Navbar, NavbarBrand, NavbarText, NavLink} from "bootstrap-react";
import React from "react";
import useToken from "../custom_hooks/useToken";
import LeftPanelLink from "./LeftPanelLink";
import UserList from "./UserList";

const AdminHome = () => {
    const path = window.location.pathname;
    const userName = getUser()?.name;
    const {token, setToken} = useToken();
    return (
        getUser() !== null && getUser()?.role === 'admin' ?
            <div>
                <div>
                    <div className={"mx-auto pb-1"}>
                        <Navbar className={"bg-dark w-100 pr-1 rounded-bottom"}>
                            <NavbarBrand className={"text-white mr-auto"}>
                                <span>Admin Area</span>
                            </NavbarBrand>
                            <NavbarText className={"text-white font-weight-bolder d-block px-3"}>
                                {userName ? userName : 'Unknown'}
                            </NavbarText>
                            <NavLink className={"text-white-50"} href={"/"} onClick={() => {
                                setToken("");
                                localStorage.removeItem('user');
                            }}><small>Logout</small></NavLink>
                        </Navbar>

                        <div className={'row mt-2'}>
                            <div className={'col-md-3 col-2 p-2 p-md-4'} style={{position: 'sticky', top: 10}}>
                                <div className="list-group">
                                    <LeftPanelLink href={'/admin/products'} text={'Products'} icon={'inventory_2'}/>
                                    <LeftPanelLink href={'/admin/orders'} text={'Orders'} icon={'local_mall'}/>
                                    <LeftPanelLink href={'/admin/users'} text={'Users'} icon={'people'}/>
                                </div>
                            </div>
                            <div className={'col-md-7 col-10 p-2 p-md-4'}>
                                <Switch>
                                    <Route path={"/admin/products"}>
                                        <ProductList/>
                                    </Route>
                                    <Route path={"/admin/orders"}>
                                        <OrderList/>
                                    </Route>
                                    <Route path={"/admin/users"}>
                                        <UserList/>
                                    </Route>
                                    <Route path={"/admin"}>
                                        <ProductList/>
                                    </Route>
                                </Switch>
                            </div>
                            <div className={'d-none d-md-block col-2'}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className={'mt-3'}>
                <Alert color={'danger'}>Sorry, You don't have right to see this page.</Alert>
            </div>
    )
}

export default AdminHome;