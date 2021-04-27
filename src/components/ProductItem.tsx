import Product from "../models/Product";
import ProductUpdateModal from "./ProductUpdateModal";
import {useState} from "react";

const ProductItem = (props: { product: Product, deleteProduct: Function, updProdListener: Function }) => {
    const [showProductUpdateModal, setShowProductUpdateModal] = useState(false);
    const [fullDescription, setFullDescription] = useState(false);
    return (
        <>
            <ProductUpdateModal prod={props.product} show={showProductUpdateModal} setShow={setShowProductUpdateModal}
                                createOrUpdateProduct={props.updProdListener} isUpdate={true}/>
            <div className={"row mx-1 my-2 border-secondary border rounded"}>
                <div className={"col-3 p-0 m-auto"}>
                    <img src={props.product.imageUrl} className={'w-100'} alt="product"/>
                </div>
                <div className={"col-8 flex-column align-items-start"}>
                    <h4>{props.product.name}</h4>
                    <small>Price: {props.product.price}/-</small>
                    <small className={'ml-3'}>Category: {props.product.category}</small>
                    {
                        fullDescription?<p onClick={()=>setFullDescription(false)} style={{lineHeight: '1rem', cursor: 'pointer'}} className={"text-justify"}>
                                {props.product.description}
                            </p>
                            :<p onClick={()=>setFullDescription(true)} style={{height: '3rem', lineHeight: '1rem', cursor: 'pointer'}} className={"text-justify overflow-hidden"}>
                                {props.product.description}
                            </p>
                    }

                </div>
                <div className={"col-1 flex-column my-auto"}>
                <span style={{cursor: "pointer"}} onClick={(event) => {
                    event.preventDefault();
                    props.deleteProduct(props.product.sku);
                }} className={'material-icons'}>
                    delete
                </span>
                    <span style={{cursor: "pointer"}} onClick={(e) => {
                        e.preventDefault();
                        setShowProductUpdateModal(true);
                        //call update product function
                    }} className={'material-icons'}>
                    update
                </span>
                </div>
            </div>
        </>
    );
};

export default ProductItem;