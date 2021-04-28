import React, {useEffect, useState} from "react";
import {getOrders} from "../services/getOrders";
import Order from "../models/Order";
import OrderItem from "./OrderItem";
import {Alert} from "bootstrap-react";
import getUser from "../user_and_token/GetUser";

const OrderList = () => {
    const [orderList, setOrderList] = useState<Order[]>();
    const [error, setError] = useState<string>("");
    useEffect(() => {
        getOrders()
            .then((orders) => {
                orders = orders['orders'];
                const list: Order[] = orders.map((order: any) => order);
                setOrderList(list);
            }).catch((reason) => {
            setError(reason);
        });
    }, []);

    function orderUpdated(updOrder: Order) {
        setOrderList(orderList?.map(order => {
            if (order.id !== updOrder.id) return order;
            else return updOrder;
        }))
    }

    return (
        <div>
            {error.length > 0 &&
            <Alert color={"warning"} dismissable={true} onDismiss={() => setError("")}>{error}</Alert>}
            <h2 className={'text-center'}>{getUser()?.role === 'admin' ? 'All Orders' : 'Your Orders'}</h2>
            {
                orderList?.map((order, index) => {
                    return <OrderItem key={index} order={order} orderUpdateCallback={orderUpdated}/>
                })
            }
        </div>
    );
}

export default OrderList;
