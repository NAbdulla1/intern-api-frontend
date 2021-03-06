import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import Config from "../Config";

export function deleteProductService(sku: string) {
    return fetch(`${Config.base_url}/api/products/delete.php?sku=${sku}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'access_token': getStoredToken()
        },
    }).then(async (resp) => {
        return resp;
    }, (reason) => {
        handlePromiseRejected();
        return reason;
    });
}