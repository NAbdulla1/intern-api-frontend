import handlePromiseRejected from "../PromiseRejectedHandler";
import getStoredToken from "../GetToken";

export function getProducts(urlParams: { key: string, value: any }[]) {
    let queryParam = "";
    if (urlParams.length > 0) {
        queryParam = "?" + urlParams.map(value => `${value.key}=${value.value}`)
            .join("&");
    }
    return fetch(`/api/products/get-all.php${queryParam}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'access_token': getStoredToken()
        },
    }).then(async (resp) => {
        if (!resp.ok) throw new Error((await resp.json())['message']);
        return await resp.json();
    }, (reason) => {
        handlePromiseRejected();
    });
}