import Order from "../models/Order";

const OrderTable = (props: { orders: Order[], callbackfn: (order: Order, index: number) => JSX.Element }) => {
    return <div className={'table-responsive'}>
        <table className={"table table-bordered"}>
            <thead>
            <tr>
                <th scope="col"><abbr title={'Serial Number'}>SL</abbr></th>
                <th scope="col"><abbr title={'Product Name'}>Name</abbr></th>
                <th scope="col"><abbr title={'Product Price'}>Price</abbr></th>
                <th scope="col"><abbr title={'Order Status'}>Status</abbr></th>
                <th scope="col"><abbr title={'Customer Email'}>Email</abbr></th>
                <th scope="col" className={'text-center'}>
                    <abbr title={'Action'}>
                        <span className={"material-icons"}>settings</span>
                    </abbr>
                </th>
            </tr>
            </thead>
            <tbody>{
                props.orders.map(props.callbackfn)
            }
            </tbody>
        </table>
    </div>
}

export default OrderTable;