import handlePromiseRejected from "../PromiseRejectedHandler";
import getStoredToken from "../GetToken";
import Product from "../models/Product";

export function createProductService(product: Product) {
    return fetch(`/api/products/create.php`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'access_token': getStoredToken()
        },
    }).then(async (resp) => {
        if (!resp.ok) throw new Error((await resp.json())['message']);
        return (await resp.json());
    }, (reason) => {
        handlePromiseRejected();
    });
}