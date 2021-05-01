import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import Config from "../Config";

export function deleteOrderService(id: number) {
    return fetch(`${Config.base_url}/api/orders/delete.php`, {
        method: "DELETE",
        body: JSON.stringify({"id": id}),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'access_token': getStoredToken()
        },
    }).then(async (resp) => {
        if (!resp.ok) throw new Error((await resp.json())['message']);
        return resp;
    }, (_) => {
        handlePromiseRejected();
    });
}