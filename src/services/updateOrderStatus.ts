import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import Config from "../Config";

export function updateOrderStatus(id: number, status: string) {
    return fetch(`${Config.base_url}/api/orders/update.php`, {
        method: "PATCH",
        body: JSON.stringify({'id':id, 'status':status}),
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