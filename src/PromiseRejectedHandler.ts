const handlePromiseRejected = (msg: string = "An unknown error has occurred") => {
    throw new Error(msg);
}

export default handlePromiseRejected;