import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import Config from "../Config";

export function doLogin(email: string, password: string) {
    return fetch(`${Config.base_url}/api/users/login.php`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({"email": email, "password": password}),
        mode: "cors"
    }).then((resp) => {
        if (!resp.ok) throw new Error("Invalid email or password");
        return resp.json();
    }, (reason) => {
        handlePromiseRejected();
    });
}