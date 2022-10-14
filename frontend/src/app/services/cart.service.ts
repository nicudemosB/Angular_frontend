import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage()
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() { }

  addToCart(food:Food):void {
                    //search through the items of the cart and try to find the food insideit when their id's are equal to id of the food that we want to add to the cart 
    let cartItem = this.cart.items
    .find(item => item.food.id === food.id)
    if(cartItem)
      return
  
    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage()
  }
// adding remove functionality to cart 
removeFromCart(foodId: string):void {
  this.cart.items = this.cart.items
  .filter(item => item.food.id != foodId)
  this.setCartToLocalStorage()
  }

  changeQuantity(foodId:string, quantity:number) {
    let cartItem = this.cart.items
    .find(item => item.food.id === foodId)
    if(!cartItem) return

    cartItem.quantity = quantity
    cartItem.price = quantity * cartItem.food.price
  }
  clearCart() {
    this.cart = new Cart()
    this.setCartToLocalStorage()
  }
  getCartObservable():Observable<Cart> {
    return this.cartSubject.asObservable()
  }
  // setting local storage so that when we refresh the browser, we won't lose what's in the cart//
  // this is also private because we do not want the cart to be accessed anywhere else//
  private setCartToLocalStorage():void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0)
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0)
    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson)
    // notifying all the listeners of the cart 
    this.cartSubject.next(this.cart)
  }
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart')
    return cartJson? JSON.parse(cartJson): new Cart()
  }
}
