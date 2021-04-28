import getUser from "../GetUser";
import {Route, Switch} from "react-router-dom";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import {Alert} from "bootstrap-react";

const CustomerHome = () => {
    return (
        getUser() !== null && getUser()?.role !== 'admin' ?
            <div>
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
            :
            <div className={'mt-3'}>
                <Alert color={'danger'}>Sorry, You don't have right to see this page.</Alert>
            </div>
    )
}

export default CustomerHome;