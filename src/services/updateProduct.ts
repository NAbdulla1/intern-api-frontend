import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import Product from "../models/Product";
import Config from "../Config";

export function updateProductService(product: Product) {
    return fetch(`${Config.base_url}/api/products/update.php`, {
        method: "PATCH",
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