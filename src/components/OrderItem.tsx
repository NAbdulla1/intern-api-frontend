import Order from "../models/Order";
import getUser from "../GetUser";
import React, {useEffect, useState} from "react";
import Product from "../models/Product";
import {getSingleProductService} from "../services/getSingleProduct";
import {Alert} from "bootstrap-react";
import {updateOrderStatus} from "../services/updateOrderStatus";

const OrderItem = (p: { order: Order, orderUpdateCallback: Function }) => {
    const [error, setError] = useState<string>("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        getSingleProductService(p.order.product_sku)
            .then((productJson) => {
                const prod: Product = [productJson].map((json) => json)[0];
                setProductName(prod.name);
                setProductPrice(prod.price);
            })
            .catch((reason) => {
                setError(reason);
            });
    }, [p]);

    function updateStatus(newStatus: string) {
        newStatus = newStatus.toLowerCase();
        setUpdatingStatus(true);
        updateOrderStatus(p.order.id, newStatus)
            .then((updOrderJson) => {
                const updOrder: Order = [updOrderJson].map((updOrderJson) => updOrderJson)[0];
                p.orderUpdateCallback(updOrder);
                setUpdatingStatus(false);
            })
            .catch((reason => setError(reason['message'])));
    }

    return (
        <>
            <div className={'rounded-lg my-4'} style={{backgroundColor: "lightgray"}}>
                {error.length > 0 &&
                <Alert color={"warning"} dismissable={true} onDismiss={() => setError("")}>{error}</Alert>}
                <h4 className={'rounded-pill py-1 px-2 d-inline-block mb-0'}
                    style={{
                        backgroundColor: 'darkorange', color: 'blue',
                        transform: 'translate(5%, -30%)'
                    }}>Order #{p.order.id}</h4>
                <div className={'px-3 py-0'} style={{transform: 'translate(0%, -15%)'}}>
                    {
                        getUser()?.role !== 'admin' ?
                            <p className={'m-0'}>Order Status: <span
                                className={'text-capitalize'}>{p.order.status}</span>
                            </p>
                            : <>
                                <form className={'form-inline m-0'}>
                                    <label>Change Order Status:</label>
                                    <select disabled={updatingStatus} className={'form-control bg-transparent p-0 ml-2'}
                                            onChange={(e) => {
                                                updateStatus(e.target.value)
                                            }}>
                                        <option selected={p.order.status === 'processing'}>Processing</option>
                                        <option selected={p.order.status === 'shipped'}>Shipped</option>
                                        <option selected={p.order.status === 'delivered'}>Delivered</option>
                                    </select>
                                </form>
                                <p className={'m-0'}>User Email: <a href={`mailto:${p.order.user_email}`}
                                                                    className={'m-0 text-decoration-none'}>{p.order.user_email}</a>
                                </p>
                            </>
                    }
                    <p className={'m-0'}>Product Name: <span className={'text-capitalize'}>{productName}</span></p>
                    <p className={'m-0'}>Product Price: {productPrice}/-</p>
                </div>
            </div>
        </>
    )
}

export default OrderItem;
