import User from "../models/User";
import React from "react";

const UserItemInAdmin = (p: {
    user: User, userUpdateCallback: Function, setError: Function, setSucc: Function
}) => {
    return (
        <>
            <tr>
                <td>{p.user.name}</td>
                <td><a href={`mailto:${p.user.email}`}
                       className={'m-0 text-decoration-none'}>{p.user.email}</a>
                </td>
                <td>{p.user.role}</td>
            </tr>
        </>
    )
}

export default UserItemInAdmin;
