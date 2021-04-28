import Product from "../models/Product";
import {useEffect, useState} from "react";
import {getProducts} from "../services/getProducts";
import {Alert, Button} from "bootstrap-react";
import ProductItem from "./ProductItem";
import {deleteProductService} from "../services/deleteProduct";
import ProductUpdateModal from "./ProductUpdateModal";
import getUser from "../user_and_token/GetUser";

const ProductList = () => {
    const [productList, setProductList] = useState<Product[]>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getProducts([])
            .then((products) => {
                products = products['products'];
                const list: Product[] = products.map((product: any) => product);
                setProductList(list);
            }).catch((reason) => {
            setError(reason);
        });
    }, []);

    function deleteProduct(sku: string) {
        deleteProductService(sku)
            .then(async (response) => {
                if (response.ok) setProductList(productList?.filter((prod) => prod.sku !== sku));
                else setError((await response.json())['message']);
            }).catch(reason => {
                setError(reason)
            }
        );
    }

    function productUpdateListener(updProd: Product) {
        setProductList(
            productList?.map(function (prod) {
                if (prod.sku !== updProd.sku) return prod;
                else return updProd;
            })
        );
    }

    const [showAddProductModal, setShowAddProductModal] = useState(false);

    function addProductListener(product: Product) {
        const prods: Product[] = [];
        productList?.forEach(prod => prods.push(prod));
        prods.push(product);
        setProductList(prods);
    }

    return (
        <div>
            <ProductUpdateModal prod={new Product("", "", "", "", 0, "")} show={showAddProductModal}
                                setShow={setShowAddProductModal} createOrUpdateProduct={addProductListener}
                                isUpdate={false}/>
            {
                error.length > 0 ? <Alert className={'my-2'} onDismiss={() => setError("")}
                                          dismissable={true} color={"danger"}>{error}</Alert> : ""
            }
            {getUser()?.role === 'admin' &&
            <Button onClick={() => setShowAddProductModal(true)} className={'mt-1 d-flex justify-content'}><span
                className={'material-icons'}>add</span> Add Product</Button>}
            {
                productList !== undefined ? productList.map((product, index) =>
                        <ProductItem key={index}
                                     deleteProduct={deleteProduct}
                                     product={product}
                                     updProdListener={productUpdateListener}
                                     setError={setError}/>)
                    : <Alert color={"info"}>No Product to be shown</Alert>
            }
        </div>
    )
}

export default ProductList;