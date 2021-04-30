import Order from "../models/Order";
import React, {useEffect, useState} from "react";
import Product from "../models/Product";
import {getSingleProductService} from "../services/getSingleProduct";
import {Alert} from "bootstrap-react";

const OrderItemInCustomer = (p: { order: Order, orderUpdateCallback: Function }) => {
    const [error, setError] = useState<string>("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);

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
                    <p className={'m-0'}>Order Status: <span className={'text-capitalize'}>{p.order.status}</span></p>
                    <p className={'m-0'}>Product Name: <span className={'text-capitalize'}>{productName}</span></p>
                    <p className={'m-0'}>Product Price: {productPrice}/-</p>
                </div>
            </div>
        </>
    )
}

export default OrderItemInCustomer;
