import {Alert} from "bootstrap-react";
import React, {useState} from "react";
import {doLogin} from "../services/userLogin";

const Login = (props: { tokenExpired: boolean, setToken: Function }) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
    const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const logInHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setEmptyEmail(!email);
        setEmptyPassword(!password);
        if (email && password) {
            try {
                let loginResponse = await doLogin(email, password);
                if ('access_token' in loginResponse) props.setToken(loginResponse['access_token']);
                else {
                    setMessage(loginResponse['message']);
                    setAlertVisibility(true);
                }
            } catch (e) {
                setMessage(e.message);
                setAlertVisibility(true);
                console.log(e.message);
            }
        }
    }
    return (
        <div className={"m-5"}>
            <div className={"shadow p-5 mx-auto col-md-6 shadow-sm"}>
                <h1 className={"text-center"}>Login</h1>
                {
                    props.tokenExpired &&
                    <Alert dismissable={true} className={"my-4"}>Token Expired Please Login Again</Alert>
                }
                {
                    alertVisibility &&
                    <Alert dismissable={true} onDismiss={(_) => setAlertVisibility(false)}
                           className={"my-4"}>{message}</Alert>
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