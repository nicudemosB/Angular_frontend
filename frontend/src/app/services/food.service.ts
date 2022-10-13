import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food'
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sample_foods
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    // toLowerCase means, if you search Pizza, it shouldn't be different than pizza lowercase
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}
