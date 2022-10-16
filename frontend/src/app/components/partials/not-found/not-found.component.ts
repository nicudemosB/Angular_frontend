import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false
  // ngIf is set dynamically by default with visible
  @Input()
  notFoundMessage = 'Nothing Found!'
  @Input()
  resetLinkText = 'Reset'
  @Input()
  resetLinkRoute ='/'
  constructor() { }

  ngOnInit(): void {
  }

}
