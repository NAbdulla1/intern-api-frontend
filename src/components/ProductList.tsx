import Product from "../models/Product";
import {useEffect, useState} from "react";
import {getProducts} from "../services/getProducts";
import {Alert, Button} from "bootstrap-react";
import ProductItem from "./ProductItem";
import {deleteProductService} from "../services/deleteProduct";
import ProductCreateUpdateModal from "./ProductCreateUpdateModal";
import getUser from "../user_and_token/GetUser";
import URLParameter from "../models/URLParameter";
import Filters from "./filters";

const ProductList = () => {
    const [productList, setProductList] = useState<Product[]>();
    const [error, setError] = useState<string>("");
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [priceLowFilter, setPriceLowFilter] = useState<number>(0.0);
    const [priceHighFilter, setPriceHighFilter] = useState<number>(1000000000000000.0);
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [pageFilter, setPageFilter] = useState<number>(1);
    const [pageSizeFilter, setPageSizeFilter] = useState<number>(10);
    const [filtering, setFiltering] = useState<boolean>(false);

    function buildParams() {
        const params: URLParameter[] = [];
        if (priceLowFilter > 0.0) params.push(new URLParameter('price_low', priceLowFilter));
        if (priceHighFilter < 1000000000000000.0) params.push(new URLParameter('price_high', priceHighFilter));
        if (pageFilter !== 1) params.push(new URLParameter('page', pageFilter));
        if (pageSizeFilter !== 10) params.push(new URLParameter('page_size', pageSizeFilter));
        if (categoryFilter.length > 0) params.push(new URLParameter('category', categoryFilter));
        return params;
    }

    useEffect(() => {
        getProducts(buildParams())
            .then((products) => {
                products = products['products'];
                const list: Product[] = products.map((product: any) => product);
                setProductList(list);
                setFiltering(false);
            }).catch((reason) => {
            setError(reason);
        });
    }, [priceLowFilter, priceHighFilter, categoryFilter, pageFilter, pageSizeFilter]);

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

    function addProductListener(product: Product) {
        const prods: Product[] = [];
        productList?.forEach(prod => prods.push(prod));
        prods.push(product);
        setProductList(prods);
    }

    return (
        <div>
            <ProductCreateUpdateModal prod={new Product("", "", "", "", 0, "")} show={showAddProductModal}
                                      setShow={setShowAddProductModal} createOrUpdateProduct={addProductListener}
                                      isUpdate={false}/>
            {error.length > 0 ? <Alert className={'my-2'} onDismiss={() => setError("")}
                                       dismissable={true} color={"danger"}>{error}</Alert> : ""}

            <div className={'row justify-content-end pr-3 pl-1 align-items-center'}>
                <Filters filtering={filtering} slpf={setPriceLowFilter} shpf={setPriceHighFilter}
                         spsf={setPageSizeFilter} scf={setCategoryFilter}/>
                {getUser()?.role === 'admin' &&
                <Button style={{maxWidth: '20%'}} onClick={() => setShowAddProductModal(true)}
                        className={'btn-sm mt-1 d-inline-flex align-items-center'}>
                    <span className={'material-icons'}>add</span> Add Product
                </Button>}
            </div>
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