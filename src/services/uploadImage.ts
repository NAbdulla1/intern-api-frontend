import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import getStoredToken from "../user_and_token/GetToken";

export function uploadImageService(formData: FormData) {
    return fetch(`/api/products/upload-image/upload.php`, {
        method: "POST",
        body: formData,
        headers: {
            //'Content-type': 'application/json; charset=utf-8',
            'access_token': getStoredToken()
        },
    }).then(async (resp) => {
        if (!resp.ok) throw new Error((await resp.json())['message']);
        return (await resp.json());
    }, (reason) => {
        handlePromiseRejected();
    });
}