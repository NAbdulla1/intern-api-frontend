import handlePromiseRejected from "../PromiseRejectedHandler";
import getStoredToken from "../GetToken";

export function deleteProductService(sku: string) {
    return fetch(`/api/products/delete.php?sku=${sku}`, {
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