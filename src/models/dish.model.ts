export class Dish {
    name: string;
    price: number;
    sundayOnly: boolean;

    constructor(name: string, price: number, sundayOnly: boolean = false) {
        this.name = name;
        this.price = price;
        this.sundayOnly = sundayOnly;
    }
}