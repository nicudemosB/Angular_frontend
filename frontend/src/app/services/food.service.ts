import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food'
import { Tag } from '../shared/models/Tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
// inject HttpClient here.
  constructor(private http:HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL)
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    // toLowerCase means, if you search Pizza, it shouldn't be different than pizza lowercase
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_BY_TAG_URL)
  }

  getAllFoodsByTag(tag:string): Observable<Food[]> {
    return tag == "All"?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getFoodById(foodId:string): Observable<Food> {
    // when first part is not definied ?? returns new food
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId)
  }
}
