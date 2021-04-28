import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";

export function createOrder(product_sku: string) {
    return fetch(`/api/orders/create.php`, {
        method: "POST",
        body: JSON.stringify({'product_sku': product_sku}),
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