import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {

  @Input()
  label!:string
  @Input()
  constructor() { }

  ngOnInit(): void {
  }

}
