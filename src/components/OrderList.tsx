import React, {useEffect, useState} from "react";
import {getOrders} from "../services/getOrders";
import Order from "../models/Order";
import OrderItemInCustomer from "./OrderItemInCustomer";
import {Alert} from "bootstrap-react";
import getUser from "../user_and_token/GetUser";
import OrderItemInAdmin from "./OrderItemInAdmin";
import OrderTable from "./OrderTable";

const OrderList = () => {
    const [orderList, setOrderList] = useState<Order[]>();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
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

    function deleteOrderCallback(order_id: number) {
        setOrderList(orderList?.filter(order => order.id !== order_id));
    }

    return (
        <div>
            {error.length > 0 &&
            <Alert color={"warning"} dismissable={true} onDismiss={() => setError("")}>{error}</Alert>}
            {success.length > 0 &&
            <Alert color={"success"} dismissable={true} onDismiss={() => setSuccess("")}>{success}</Alert>}
            <h2 className={'text-center'}>{getUser()?.role === 'admin' ? 'All Orders' : 'Your Orders'}</h2>
            {orderList === undefined || orderList.length === 0
                ? <Alert className={'my-3'} color={"info"}>No Order to be shown</Alert>
                : (
                    getUser()?.role === 'admin'
                        ? <OrderTable orders={orderList} callbackfn={(order, index) => {
                            return <OrderItemInAdmin setError={setError}
                                                     key={index}
                                                     order={order}
                                                     orderUpdateCallback={orderUpdated}
                                                     deleteOrderCallback={deleteOrderCallback}
                            setSucc={setSuccess}/>
                        }}/>
                        :
                        orderList?.map((order, index) => {
                            return <OrderItemInCustomer key={index} order={order} orderUpdateCallback={orderUpdated}/>
                        })
                )
            }
        </div>
    );
}

export default OrderList;
