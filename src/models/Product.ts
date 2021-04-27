export default class Product {
    name: string;
    sku: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;

    constructor(name: string, sku: string, description: string, category: string, price: number, imageUrl: string) {
        this.name = name;
        this.sku = sku;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    /*static fromJson(json: object){
        return new Product(json['name'], json['sku'], json['description'] ,json['category'], json['price'], json['imageUrl']);
    }*/
}