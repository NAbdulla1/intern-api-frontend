import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";

export function deleteImageService(url: string) {
    return fetch(`/api/products/upload-image/delete.php`, {
        method: "DELETE",
        body: JSON.stringify({'url': url}),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'access_token': getStoredToken()
        },
    }).then(async (resp) => {
        if (!resp.ok && resp.status !== 404)throw new Error((await resp.json())['message']);
        return resp;
    }, (reason) => {
        handlePromiseRejected();
    });
}