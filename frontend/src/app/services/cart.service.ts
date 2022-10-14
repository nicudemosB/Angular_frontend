import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart()
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() { }

  addToCart(food:Food):void {
                    //search through the items of the cart and try to find the food insideit when their id's are equal to id of the food that we want to add to the cart 
    let cartItem = this.cart.items
    .find(item => item.food.id === food.id)
    if(cartItem)
      return
  
    this.cart.items.push(new CartItem(food))
  }
// adding remove functionality to cart 
removeFromCart(foodId: string):void {
  this.cart.items = this.cart.items
  .filter(item => item.food.id != foodId)
  }

  changeQuantity(foodId:string, quantity:number) {
    let cartItem = this.cart.items
    .find(item => item.food.id === foodId)
    if(!cartItem) return

    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.food.price
  }
  clear Cart() {
    this.cart = new Cart()
  }
  getCartObservable():Observable<Cart> {
    return this.cartSubject.asObservable()
  }
}
