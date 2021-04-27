import Product from "../models/Product";
import React, {useState} from "react";
import {Alert} from "bootstrap-react";
import {uploadImageService} from "../services/uploadImage";
import {deleteImageService} from "../services/deleteImage.";
import assert from "assert";
import {updateProductService} from "../services/updateProduct";
import {createProductService} from "../services/createProduct";


const ProductCreateUpdateForm = (props: { product: Product, isUpdate: boolean, closeModal: Function, createOrUpdateProductCallBack: Function }) => {
    let product = new Product("", "", "", "", 0, "");
    product = props.product;
    const [name, setName] = useState(product.name);
    const [sku, setSku] = useState(product.sku);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.toString());
    const [category, setCategory] = useState(product.category);
    const [image, setImage] = useState<File | null>(null);

    function validateProductForm() {
        let errMsg = "";
        if (name.length === 0) errMsg += 'Name is empty. ';
        if (sku.length === 0) errMsg += 'Sku is empty. ';
        if (description.length === 0) errMsg += 'description is empty. ';
        if (price.length === 0) errMsg += 'price is empty. ';
        if (category.length === 0) errMsg += 'category is empty. ';
        if (parseFloat(price) < 0) errMsg += 'price must be > 0. ';
        if (!props.isUpdate && image == null) errMsg += 'Image is empty. ';
        return errMsg;
    }

    const [submitting, setSubmitting] = useState(false);

    function updateProduct(nProduct: Product) {
        updateProductService(nProduct)
            .then(json => {
                    const updProd = [json].map((prodjson: any) => prodjson)[0];
                    props.createOrUpdateProductCallBack(updProd);
                    setSuccess("Product Update Successful");
                    setTimeout(() => props.closeModal(), 1000);
                }
            ).catch(r => {
                setError(`Product Update failed ${r['message']}`)
            }
        );
    }

    function createProduct(imageFormData: FormData, nProduct: Product) {
        uploadImageService(imageFormData)
            .then((json) => {
                    console.log(json);
                    if ('path' in json) {
                        nProduct.imageUrl = json['path'];
                        createProductService(nProduct)
                            .then(json => {
                                    const updProd = [json].map((prodjson: any) => prodjson)[0];
                                    props.createOrUpdateProductCallBack(updProd);
                                    setSuccess("Product Created Successfully");
                                    setTimeout(() => props.closeModal(), 2 * 500);
                                }
                            ).catch(r => {
                                deleteImageService(nProduct.imageUrl);
                                setError(`Product Creation failed ${r['message']}`);
                            }
                        )
                    }
                    return json;
                }
            ).catch(reason => {
                console.log(reason);
                setError(`Product Creation failed due to image update failed`)
            }
        );
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let errorMsg = validateProductForm();
        if (errorMsg.length > 0) {
            setError(errorMsg);
            return;
        }
        const nProduct = new Product(name, sku, description, category, parseFloat(price), product.imageUrl);
        console.log(props.isUpdate);
        if (props.isUpdate) {
            if (image != null) {
                const imageFormData = new FormData();
                imageFormData.append('product_image', image, image.name);
                uploadImageService(imageFormData)
                    .then((json) => {
                            console.log(json);
                            deleteImageService(product.imageUrl).then(r => console.log(r));
                            if ('path' in json) {
                                nProduct.imageUrl = json['path'];
                                updateProduct(nProduct);
                            }
                            return json;
                        }
                    ).catch(reason => {
                        console.log(reason);
                        setError("Product Update failed due to image update failed")
                    }
                );
            } else {
                updateProduct(nProduct);
            }
        } else {//create new product
            assert(image != null);
            const imageFormData = new FormData();
            imageFormData.append('product_image', image, image.name);
            createProduct(imageFormData, nProduct);
        }
    }
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    return (
        <div>
            {success.length > 0 &&
            <Alert color={"success"} dismissable={true} onDismiss={() => setSuccess("")}>{success}</Alert>}
            {error.length > 0 &&
            <Alert color={"warning"} dismissable={true} onDismiss={() => setError("")}>{error}</Alert>}

            <form onSubmit={handleFormSubmit}>
                <div className={"form-group"}>
                    <label>Product Name</label>
                    <input name={"name"} required minLength={1} maxLength={50} type={'text'} className={'form-control'}
                           value={name}
                           onChange={event => setName(event.target.value)}/>
                </div>
                {!props.isUpdate &&
                <div className={"form-group"}>
                    <label>Product SKU (Must Be Unique)</label>
                    <input name={'sku'} required minLength={1} maxLength={20} type={'text'} className={'form-control'}
                           value={sku}
                           onChange={event => setSku(event.target.value)}/>
                </div>
                }
                <div className={"form-group"}>
                    <label>Product Description</label>
                    <input name={"description"} required minLength={1} maxLength={500} type={'text'}
                           className={'form-control'} value={description}
                           onChange={event => setDescription(event.target.value)}/>
                </div>
                <div className={"form-group"}>
                    <label>Product Category</label>
                    <input name={'category'} required minLength={1} maxLength={20} type={'text'}
                           className={'form-control'}
                           value={category}
                           onChange={event => setCategory(event.target.value)}/>
                </div>
                <div className={"form-group"}>
                    <label>Product Price</label>
                    <input name={'price'} required step={0.001} type={'number'} className={'form-control-range'}
                           value={price}
                           onChange={event => setPrice(event.target.value)}/>
                </div>
                <div className={"form-group"}>
                    <label>Product Image</label>
                    {props.isUpdate ?
                        <input name={'image-file'} type={'file'} className={'form-control-file'} id={'image-file'}
                               onChange={event => setImage(event.target.files ? event.target.files[0] : null)}/>
                        : <input required name={'image-file'} type={'file'} className={'form-control-file'}
                                 id={'image-file'}
                                 onChange={event => setImage(event.target.files ? event.target.files[0] : null)}/>}
                </div>
                <button className={'btn btn-primary w-100'}
                        type={"submit"}>{props.isUpdate ? "Update Product" : "Create Product"}</button>
            </form>
        </div>
    );
}

export default ProductCreateUpdateForm;