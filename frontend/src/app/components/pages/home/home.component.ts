import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // This holds the data that we get from the food service
  foods:Food[] = []
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      // if there is any params.searchTerm it will filter the result otherwise it will show all the foods
      if(params.searchTerm)
      this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm)
      else
      // foods are filled with the data from the food service that uses sample foods data 
    this.foods = foodService.getAll()
    })
      
  }
    
  

  ngOnInit(): void {
  }

}
