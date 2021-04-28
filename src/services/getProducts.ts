import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import URLParameter from "../models/URLParameter";

export function getProducts(urlParams: URLParameter[]) {
    let queryParam = "";
    if (urlParams.length > 0) {
        queryParam =
            "?" + urlParams.map(value => `${value.key}=${value.value}`).join("&");
        console.log(queryParam);
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