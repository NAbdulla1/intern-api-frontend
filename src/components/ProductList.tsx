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

const ProductList = () => {
    const [productList, setProductList] = useState<Product[]>();
    const [error, setError] = useState<string>("");
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [priceLowFilter, setPriceLowFilter] = useState<number>(0.0);
    const [priceHighFilter, setPriceHighFilter] = useState<number>(1000000000000000.0);
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [pageFilter, setPageFilter] = useState<number>(1);
    const [filtering, setFiltering] = useState<boolean>(false);
    const {pageSize: pageSizeFilter, setPageSize: setPageSizeFilter} = usePageSize(10);

    useEffect(() => {
        function buildParams() {
            const params: URLParameter[] = [];
            if (priceLowFilter > 0.0) params.push(new URLParameter('price_low', priceLowFilter));
            if (priceHighFilter < 1000000000000000.0) params.push(new URLParameter('price_high', priceHighFilter));
            if (pageFilter !== 1) params.push(new URLParameter('page', pageFilter));
            if (pageSizeFilter !== 10) params.push(new URLParameter('page_size', pageSizeFilter));
            if (categoryFilter.length > 0) params.push(new URLParameter('category', categoryFilter));
            return params;
        }

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
                    className={'btn-sm d-inline-flex align-items-center'}>
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

            <nav>
                <ul className="pagination justify-content-center">
                    <li className={(pageFilter > 1) ? "page-item" : "page-item disabled"}>
                        <button
                            onClick={() => setPageFilter(Math.max(1, pageFilter - 1))}
                            className="page-link"
                            type={'button'}
                            tabIndex={(pageFilter <= 1) ? -1 : undefined}>Previous
                        </button>
                    </li>
                    <li className="page-item active">
                        <button className="page-link" type={"button"}>{pageFilter}</button>
                    </li>
                    <li className={(productList === undefined || productList.length === 0 || productList.length < pageSizeFilter) ? "page-item disabled" : "page-item"}>
                        <button
                            onClick={() => setPageFilter(pageFilter + 1)}
                            className="page-link"
                            type={"button"}
                            tabIndex={(productList === undefined || productList.length === 0 || productList.length < pageSizeFilter) ? -1 : undefined}>Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProductList;