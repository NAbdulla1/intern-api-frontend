export function doLogin(email: string, password: string) {
    return fetch(`/api/users/login.php`, {
        method: 'POST',
        headers: {
            "Access-Control-Request-Headers": "Access-Control-Request-Method,Access-Control-Allow-Headers,Origin,Content-Type,access_token,Access-Control-Request-Headers",
            "Access-Control-Request-Method": "POST",
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({"email": email, "password": password}),
        mode: "cors"
    }).then((resp) => {
        if (!resp.ok) throw new Error("Invalid email or password");
        return resp.json();
    }, (reject) => {
        throw new Error("An Unknown Problem occurred");
    });
}