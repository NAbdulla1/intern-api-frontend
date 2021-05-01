import React, {useEffect, useState} from "react";
import {getUsers} from "../services/getUsers";
import User from "../models/User";
import {Alert} from "bootstrap-react";
import UserRow from "./UserRow";
import UserTable from "./UserTable";
import PageNavigator from "./PageNavigator";

const UserList = () => {
    const [userList, setUserList] = useState<User[]>();
    const [userCount, setUserCount] = useState<number>(1);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    let totalPages = Math.floor((userCount + pageSize - 1) / pageSize);

    useEffect(() => {
        getUsers(pageNum, pageSize)
            .then((users) => {
                setUserCount(users['count']);
                setPageNum(Math.max(1, Math.min(pageNum, totalPages)));
                users = users['users'];
                const list: User[] = users.map((user: any) => user);
                setUserList(list);
            }).catch((reason) => {
            setError(reason);
        });
    }, [pageNum, pageSize]);

    function userUpdated(updUser: User) {
        setUserList(userList?.map(user => {
            if (user.email !== updUser.email) return user;
            else return updUser;
        }))
    }

    return (
        <div>
            {error.length > 0 &&
            <Alert color={"warning"} dismissable={true} onDismiss={() => setError("")}>{error}</Alert>}
            {success.length > 0 &&
            <Alert color={"success"} dismissable={true} onDismiss={() => setSuccess("")}>{success}</Alert>}
            <h2 className={'text-center'}>All Users</h2>
            {userList === undefined || userList.length === 0
                ? <Alert className={'my-3'} color={"info"}>No User to be shown</Alert>
                : (
                    <UserTable users={userList} callbackfn={(user, index) => {
                        return <UserRow setError={setError}
                                        key={index}
                                        user={user}
                                        userUpdateCallback={userUpdated}
                                        setSucc={setSuccess}/>
                    }}/>
                )
            }
            <PageNavigator currentPageNumber={pageNum} setPageNum={setPageNum} totalPages={totalPages}/>

            <div className={'form-inline justify-content-center'}>
                <label>Select Page Size </label>
                <select className={'ml-2 form-control'} value={pageSize}
                        onChange={e => setPageSize(parseInt(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={3}>3</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
}

export default UserList;
