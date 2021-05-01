import handlePromiseRejected from "../exception_handlers/PromiseRejectedHandler";
import Config from "../Config";

export function userSignup(name: string, email: string, password: string) {
    return fetch(`${Config.base_url}/api/users/signup.php`, {
        method: "POST",
        body: JSON.stringify({'name': name, 'email': email, 'password': password, 'role': 'customer'}),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
    }).then(async (resp) => {
        if (!resp.ok) throw new Error((await resp.json())['message']);
        return (await resp.json());
    }, (reason) => {
        handlePromiseRejected();
    });
}