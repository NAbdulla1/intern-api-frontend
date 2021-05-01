import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";
import Config from "../Config";

export function getUsers(page: number, pageSize: number) {
    return fetch(`${Config.base_url}/api/users/get-all.php?page=${page}&page_size=${pageSize}`, {
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