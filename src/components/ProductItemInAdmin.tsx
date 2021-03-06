import Product from "../models/Product";
import React, {useState} from "react";
import ProductCreateUpdateModal from "./ProductCreateUpdateModal";

const ProductItemInAdmin = (props: {
    product: Product,
    deleteProduct: Function,
    updProdListener: Function,
    setError: React.Dispatch<React.SetStateAction<string>>
}) => {
    const [showProductUpdateModal, setShowProductUpdateModal] = useState(false);
    const [fullDescription, setFullDescription] = useState(false);

    return (
        <>
            <tr>
                <td>{props.product.name}</td>
                <td>{props.product.price}</td>
                <td>{props.product.category}</td>
                <td>{
                    fullDescription ?
                        <p onClick={() => setFullDescription(false)} style={{lineHeight: '1rem', cursor: 'pointer'}}
                           className={"text-justify"}>
                            {props.product.description}
                        </p>
                        : <p onClick={() => setFullDescription(true)}
                             style={{height: '2rem', lineHeight: '1rem', cursor: 'pointer'}}
                             className={"text-justify overflow-hidden overflow-auto"}>
                            {props.product.description}
                        </p>
                }</td>
                <td><img src={props.product.imageUrl} style={{width: '9vw', padding: '1vw'}} alt="product"/></td>
                <td className={'position-relative'}>
                    <div className={'d-flex flex-column align-items-center justify-content-center'}
                         style={{position: 'absolute', top: '0', bottom: '0', left:'0', right:'0'}}>
                    <span style={{cursor: "pointer", marginBottom: '.5rem'}} onClick={(event) => {
                        event.preventDefault();
                        if (window.confirm("Are you sure to delete this product?")) props.deleteProduct(props.product.sku);
                    }} className={'material-icons'}>
                        delete
                    </span>
                        <span style={{cursor: "pointer", marginTop: '.5rem'}} onClick={(e) => {
                            e.preventDefault();
                            setShowProductUpdateModal(true);
                        }} className={'material-icons'}>
                            update
                    </span>
                    </div>
                    <ProductCreateUpdateModal prod={props.product} show={showProductUpdateModal}
                                              setShow={setShowProductUpdateModal}
                                              createOrUpdateProduct={props.updProdListener} isUpdate={true}/>
                </td>
            </tr>
        </>
    );
};

export default ProductItemInAdmin;