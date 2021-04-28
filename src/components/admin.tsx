import ProductList from "./ProductList";
import {Route, Switch} from "react-router-dom";
import getUser from '../user_and_token/GetUser';
import OrderList from "./OrderList";
import {Alert} from "bootstrap-react";

const AdminHome = () => {

    return (
        getUser() !== null && getUser()?.role === 'admin' ?
            <div>
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
            :
            <div className={'mt-3'}>
                <Alert color={'danger'}>Sorry, You don't have right to see this page.</Alert>
            </div>
    )
}

export default AdminHome;