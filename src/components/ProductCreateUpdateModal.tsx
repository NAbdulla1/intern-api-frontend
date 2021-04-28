import {Button, Modal, ModalBody, ModalHeader, ModalTitle} from "bootstrap-react";
import Product from "../models/Product";
import React from "react";
import ProductCreateUpdateForm from "./ProductCreateUpdateFrom";

const ProductCreateUpdateModal = (props: {
    prod: Product,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    createOrUpdateProduct: Function,
    isUpdate: boolean
}) => {

    const handleClose = () => props.setShow(false);

    return (
        <>
            <Modal
                visible={props.show}
                onDismiss={handleClose}

            >
                <ModalHeader>
                    <ModalTitle>Update Product</ModalTitle>
                    <Button className={'text-dark border-0 font-weight-bolder bg-transparent'} onClick={handleClose}>
                        &times;
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <ProductCreateUpdateForm product={props.prod} isUpdate={props.isUpdate} closeModal={handleClose}
                                             createOrUpdateProductCallBack={props.createOrUpdateProduct}/>
                </ModalBody>
            </Modal>
        </>
    );
}

export default ProductCreateUpdateModal;