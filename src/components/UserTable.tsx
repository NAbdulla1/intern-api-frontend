import User from "../models/User";

const UserTable = (props: { users: User[], callbackfn: (user: User, index: number) => JSX.Element }) => {
    return <div className={'table-responsive'}>
        <table className={"table table-bordered"}>
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
            </tr>
            </thead>
            <tbody>{
                props.users.map(props.callbackfn)
            }
            </tbody>
        </table>
    </div>
}

export default UserTable;