import handlePromiseRejected from "../PromiseRejectedHandler";
import getStoredToken from "../GetToken";

export function getSingleProductService(sku: string) {
    return fetch(`/api/products/get-one.php?sku=${sku}`, {
        method: "GET",
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