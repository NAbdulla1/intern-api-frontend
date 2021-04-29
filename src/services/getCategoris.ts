import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import URLParameter from "../models/URLParameter";

export function getCategoriesLike(pattern: string) {
    return fetch(`/api/products/category.php?pattern=${pattern}`, {
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