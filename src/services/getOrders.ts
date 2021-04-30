import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";

export function getOrders(page: number, pageSize: number) {
    return fetch(`/api/orders/get.php?page=${page}&page_size=${pageSize}`, {
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