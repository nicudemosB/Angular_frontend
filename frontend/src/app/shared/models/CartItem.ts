import { Food } from "./Food"

export class CartItem {
    // this shorthand allows the food to be accessed from the outside
    constructor(public food:Food){
    }
    quantity:number = 1
    price: number = this.food.price
}