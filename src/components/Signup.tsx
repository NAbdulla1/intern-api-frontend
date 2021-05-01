import {Alert, Button, Modal, ModalBody, ModalHeader, ModalTitle} from "bootstrap-react";
import React, {useState} from "react";
import {userSignup} from "../services/userSignup";

const Signup = (props: { showSignup: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (name === undefined || email === undefined || password === undefined
            || name === null || name?.length === 0 || !isValidEmail(email ?? '') || doesPasswordMismatch(password, password2)) {
            setError('Invalid Form Data');
            return;
        }
        userSignup(name, email, password)
            .then((_) => {
                setSuccess("Sign up Successful. Please login.");
                setTimeout(() => props.setShowModal(false), 1000);
            })
            .catch((reason => setError(reason['message'])));
    }

    function doesPasswordMismatch(p1: string, p2: string) {
        return p1 !== p2;
    }

    function isValidEmail(email: string) {
        return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
    }

    return (<>
        <Modal visible={props.showSignup} onDismiss={() => props.setShowModal(false)}>
            {error.length > 0 &&
            <Alert dismissable={true} onDismiss={() => setError('')} color={'warning'}>{error}</Alert>}
            {success.length > 0 &&
            <Alert dismissable={true} onDismiss={() => setSuccess('')} color={'success'}>{success}</Alert>}

            <ModalHeader>
                <ModalTitle>Sign Up</ModalTitle>
                <Button type={'button'} className={'text-dark border-0 font-weight-bolder bg-transparent'}
                        onClick={() => props.setShowModal(false)}>
                    &times;
                </Button>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSignUp} noValidate>
                    <div className={'form-group'}>
                        <label>Name</label>
                        <input required maxLength={100} className={'form-control'} type={'text'}
                               onChange={e => setName(e.target.value)}/>
                        {(name == null || (name.length === 0 || name.length > 100)) &&
                        <div className={'d-block invalid-feedback'}>Invalid Name</div>}
                    </div>
                    <div className={'form-group'}>
                        <label>Email</label>
                        <input required maxLength={100} className={'form-control'} type={'email'}
                               onChange={e => {
                                   setEmail(e.target.value);
                                   setValidEmail(isValidEmail(e.target.value ?? ''));
                               }}/>
                        {!validEmail && <div className={'d-block invalid-feedback'}>Invalid Email</div>}
                    </div>
                    <div className={'form-group'}>
                        <label>Password</label>
                        <input required maxLength={100} className={'form-control'} type={'password'}
                               onChange={e => {
                                   setPassword(e.target.value)
                                   setPasswordMismatch(doesPasswordMismatch(e.target.value, password2))
                               }}/>
                        {passwordMismatch && <div className={'d-block invalid-feedback'}>Password mismatch</div>}
                    </div>
                    <div className={'form-group'}>
                        <label>Confirm Password</label>
                        <input required maxLength={100} className={'form-control'} type={'password'}
                               onChange={e => {
                                   setPassword2(e.target.value)
                                   setPasswordMismatch(doesPasswordMismatch(password, e.target.value))
                               }}/>
                    </div>
                    <div>
                        <button type={'submit'} className={'btn btn-outline-primary'}>Sign Up</button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    </>);
}

export default Signup;