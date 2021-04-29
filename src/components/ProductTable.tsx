import {Component} from "react";
import Product from "../models/Product";

export class ProductTable extends Component<{ products: Product[], callbackfn: (product: Product, index: number) => JSX.Element }> {
    render() {
        return <table className={"my-2 table table-bordered"}>
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col" className={'text-center'}><span className={"material-icons"}>settings</span></th>
            </tr>
            </thead>
            <tbody>{
                this.props.products.map(this.props.callbackfn)
            }
            </tbody>
        </table>;
    }
}