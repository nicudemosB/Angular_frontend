import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food'
import { Tag } from '../shared/models/Tag';
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

  getAllTags():Tag[] {
    return sample_tags
  }

  getAllFoodsByTag(tag:string):Food[] {
    return tag == "All"?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag))
  }
}
