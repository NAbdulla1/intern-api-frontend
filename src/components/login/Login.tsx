import {Alert} from "bootstrap-react";
import React, {useState} from "react";

async function doLogin(email: string, password: string) {
    let resp = await fetch(`/api/users/login.php`, {
        method: 'POST',
        headers: {
            "Access-Control-Request-Headers": "Access-Control-Request-Method,Access-Control-Allow-Headers,Origin,Content-Type,access_token,Access-Control-Request-Headers",
            "Access-Control-Request-Method": "POST",
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({"email": email, "password": password}),
        mode: "cors"
    });
    if (!resp.ok) {
        console.log(resp.statusText);
    }
    return resp.json();
}

const Login = (props: { tokenExpired: boolean, setToken: Function }) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
    const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

    const logInHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setEmptyEmail(!email);
        setEmptyPassword(!password);
        if (email && password) {
            let loginResponse = await doLogin(email, password);
            if ('access_token' in loginResponse) props.setToken(loginResponse['access_token']);
            else setAlertVisibility(true);
        }
    }
    return (
        <div className={"m-5"}>
            <div className={"shadow p-5 mx-auto col-md-6"}>
                <h1 className={"text-center"}>Login</h1>
                {
                    props.tokenExpired &&
                    <Alert dismissable={true} className={"my-4"}>Token Expired Please Login Again</Alert>
                }
                {
                    alertVisibility &&
                    <Alert dismissable={true} onDismiss={(v) => setAlertVisibility(false)}
                           className={"my-4"}>Login Failed! Invalid email or password</Alert>
                }
                <form onSubmit={logInHandler}>
                    <div className={"form-group"}>
                        <label htmlFor={"email"}>Email</label>
                        <input id={"email"} name={"email"} className={"form-control"} type={"email"}
                               placeholder={"Email Address"} onChange={event => setEmail(event.target.value)}/>
                        {emptyEmail && <span className={"text-warning"}>Provide Email Address</span>}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"password"}>Password</label>
                        <input id={"password"} name={"password"} className={"form-control"} type={"password"}
                               placeholder={"Password"} onChange={event => setPassword(event.target.value)}/>
                        {emptyPassword && <span className={"text-warning"}>Provide Password</span>}
                    </div>
                    <button className={"btn btn-primary w-100 text-center"} type={"submit"}>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;