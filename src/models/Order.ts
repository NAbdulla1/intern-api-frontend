class Order {
    id: number;
    product_sku: string;
    user_email: string;
    status: string;

    constructor(id: number, product_sku: string, user_email: string, status: string) {
        this.id = id;
        this.product_sku = product_sku;
        this.user_email = user_email;
        this.status = status;
    }
}

export default Order;
