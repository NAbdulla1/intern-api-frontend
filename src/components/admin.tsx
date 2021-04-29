import ProductList from "./ProductList";
import {Route, Switch} from "react-router-dom";
import getUser from '../user_and_token/GetUser';
import OrderList from "./OrderList";
import {Alert, Navbar, NavbarBrand, NavbarText, NavLink} from "bootstrap-react";
import React from "react";
import useToken from "../custom_hooks/useToken";

class LeftPanelLink extends React.Component {
    render() {
        return <li className="px-2 list-group-item border-right-0 bg-dark">
            <a href="#" className="text-light d-flex align-bottom">
                <span className="material-icons mr-1">article</span>
                <span className="d-none d-sm-inline">Blog Posts</span>
            </a>
        </li>;
    }
}

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
                            {
                                <>
                                    <NavLink href={'/admin/products'}
                                             className={path.includes('products') || path === '/admin' ? 'text-white' : 'text-white-50'}>Products</NavLink>
                                    <NavLink href={'/admin/orders'}
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
                        <div className={'row'}>
                            <div className={'col-md-3 col-2 p-2 p-md-4'}>
                                <ul className="list-group p-0">
                                    <LeftPanelLink/>
                                    <LeftPanelLink/>
                                    <LeftPanelLink/>
                                    <LeftPanelLink/>
                                </ul>
                            </div>
                            <div className={'col-md-7 col-10 p-lg-4'}>
                                <Switch>
                                    <Route path={"/admin/products"}>
                                        <ProductList/>
                                    </Route>
                                    <Route path={"/admin/orders"}>
                                        <OrderList/>
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