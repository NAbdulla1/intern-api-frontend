import Product from "../models/Product";
import {useEffect, useState} from "react";
import {getProducts} from "../services/getProducts";
import {Alert} from "bootstrap-react";
import ProductItemInCustomer from "./ProductItemInCustomer";
import {deleteProductService} from "../services/deleteProduct";
import ProductCreateUpdateModal from "./ProductCreateUpdateModal";
import getUser from "../user_and_token/GetUser";
import URLParameter from "../models/URLParameter";
import Filters from "./Filters";
import usePageSize from "../custom_hooks/usePageSize";
import ProductItemInAdmin from "./ProductItemInAdmin";
import {ProductTable} from "./ProductTable";
import PageNavigator from "./PageNavigator";

const ProductList = () => {
    const [productList, setProductList] = useState<Product[]>();
    const [error, setError] = useState<string>("");
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [priceLowFilter, setPriceLowFilter] = useState<number>(0.0);
    const [priceHighFilter, setPriceHighFilter] = useState<number>(1000000000000000.0);
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [pageFilter, setPageFilter] = useState<number>(1);
    const [filtering, setFiltering] = useState<boolean>(false);
    const {pageSizeFilter, setPageSizeFilter} = usePageSize(10);
    const [productCount, setProductCount] = useState<number>(1);

    let totalPages = Math.floor((productCount + pageSizeFilter - 1) / pageSizeFilter);

    useEffect(() => {
        function buildParams() {
            const params: URLParameter[] = [];
            if (priceLowFilter > 0.0) params.push(new URLParameter('price_low', priceLowFilter));
            if (priceHighFilter < 1000000000000000.0) params.push(new URLParameter('price_high', priceHighFilter));
            if (pageFilter > 1) params.push(new URLParameter('page', pageFilter));
            if (pageSizeFilter !== 10 && !(pageSizeFilter <= 0)) params.push(new URLParameter('page_size', pageSizeFilter));
            if (categoryFilter.length > 0) params.push(new URLParameter('category', categoryFilter));
            return params;
        }

        getProducts(buildParams())
            .then((products) => {
                setProductCount(products['count']);
                setPageFilter(Math.max(1, Math.min(pageFilter, totalPages)));
                products = products['products'];
                const list: Product[] = products.map((product: any) => product);
                setProductList(list);
                setFiltering(false);
            }).catch((reason) => {
            setError(reason);
        });
    }, [priceLowFilter, priceHighFilter, categoryFilter, pageFilter, pageSizeFilter, productCount]);

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
            <h2 className={'text-center'}>Products</h2>
            <ProductCreateUpdateModal prod={new Product("", "", "", "", 0, "")} show={showAddProductModal}
                                      setShow={setShowAddProductModal} createOrUpdateProduct={addProductListener}
                                      isUpdate={false}/>

            <Filters filtering={filtering} slpf={setPriceLowFilter} shpf={setPriceHighFilter}
                     spsf={setPageSizeFilter} scf={setCategoryFilter} pageSize={pageSizeFilter}/>

            {error.length > 0 ? <Alert className={'my-2'} onDismiss={() => setError("")}
                                       dismissable={true} color={"danger"}>{error}</Alert> : ""}

            {getUser()?.role === 'admin' &&
            <button style={{maxWidth: '20%', float: 'right'}} onClick={() => setShowAddProductModal(true)}
                    className={'btn btn-primary btn-sm d-inline-flex align-items-center'}>
                <span className={'material-icons'}>add</span> Add Product
            </button>
            }
            <div className={'clearfix'}/>

            {
                productList !== undefined && productList.length !== 0
                    ?
                    (getUser()?.role !== 'admin'
                            ? productList.map((product, index) =>
                                <ProductItemInCustomer key={index}
                                                       deleteProduct={deleteProduct}
                                                       product={product}
                                                       updProdListener={productUpdateListener}
                                                       setError={setError}/>)
                            : <ProductTable products={productList} callbackfn={(product, index) =>
                                <ProductItemInAdmin key={index}
                                                    deleteProduct={deleteProduct}
                                                    product={product}
                                                    updProdListener={productUpdateListener}
                                                    setError={setError}/>}/>
                    )
                    : <Alert className={'my-3'} color={"info"}>No Product to be shown</Alert>
            }

            <PageNavigator currentPageNumber={pageFilter} setPageNum={setPageFilter} totalPages={totalPages}/>
        </div>
    )
}

export default ProductList;