import React, {useEffect, useState} from "react";
import {getOrders} from "../services/getOrders";
import Order from "../models/Order";
import OrderItemInCustomer from "./OrderItemInCustomer";
import {Alert} from "bootstrap-react";
import getUser from "../user_and_token/GetUser";
import OrderItemInAdmin from "./OrderItemInAdmin";
import OrderTable from "./OrderTable";
import PageNavigator from "./PageNavigator";

const OrderList = () => {
    const [orderList, setOrderList] = useState<Order[]>();
    const [orderCount, setOrderCount] = useState<number>(1);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    let totalPages = Math.floor((orderCount + pageSize - 1) / pageSize);

    useEffect(() => {
        getOrders(pageNum, pageSize)
            .then((orders) => {
                setOrderCount(orders['count']);
                setPageNum(Math.max(1, Math.min(pageNum, totalPages)));
                orders = orders['orders'];
                const list: Order[] = orders.map((order: any) => order);
                setOrderList(list);
            }).catch((reason) => {
            setError(reason);
        });
    }, [pageNum, pageSize]);

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
                        : orderList?.map((order, index) => {
                            return <OrderItemInCustomer key={index} order={order} orderUpdateCallback={orderUpdated}/>
                        })
                )
            }
            <PageNavigator currentPageNumber={pageNum} setPageNum={setPageNum} totalPages={totalPages}/>

            <div className={'form-inline justify-content-center'}>
                <label>Select Page Size </label>
                <select className={'ml-2 form-control'} value={pageSize}
                        onChange={e => setPageSize(parseInt(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
}

export default OrderList;
