import Order from "../models/Order";
import React, {useEffect, useState} from "react";
import Product from "../models/Product";
import {getSingleProductService} from "../services/getSingleProduct";
import {updateOrderStatus} from "../services/updateOrderStatus";
import {deleteOrderService} from "../services/deleteOrder";

const OrderItemInAdmin = (p: {
    order: Order, orderUpdateCallback: Function, setError: Function, setSucc: Function,
    deleteOrderCallback: Function
}) => {
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
                p.setError(reason);
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
            .catch((reason => p.setError(reason['message'])));
    }

    function deleteOrder() {
        deleteOrderService(p.order.id)
            .then(_ => {
                p.deleteOrderCallback(p.order.id);
                p.setSucc("Order Deleted Successfully");
            })
            .catch(fail => p.setError(fail['message']));
    }

    return (
        <>
            <tr>
                <td>{p.order.id}</td>
                <td><span className={'text-capitalize'}>{productName}</span></td>
                <td>{productPrice}</td>
                <td>
                    <form className={'form-inline m-0'}>
                        <select disabled={updatingStatus}
                                className={'p-0 m-0 border-0 bg-transparent p-0 ml-2'}
                                onChange={(e) => updateStatus(e.target.value)}
                                value={p.order.status}>
                            <option value={'processing'}>Processing</option>
                            <option value={'shipped'}>Shipped</option>
                            <option value={'delivered'}>Delivered</option>
                        </select>
                    </form>
                </td>
                <td><a href={`mailto:${p.order.user_email}`}
                       className={'m-0 text-decoration-none'}>{p.order.user_email}</a>
                </td>
                <td className={'text-center'}>
                    <span onClick={() =>
                        window.confirm('Are you sure to delete this order?')
                            ? deleteOrder()
                            : ''
                    } className={'material-icons w-100 h-100'}>delete</span>
                </td>
            </tr>
        </>
    )
}

export default OrderItemInAdmin;
