import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  myListSplit:any = [];
  myList:any = [];
  myListMain:any = [];
  temp:any = {};

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage);
    this.myList = localStorage.getItem("myList");
    this.myList = JSON.parse(this.myList);
    console.log(this.myList);
  }
  checkListLength(){
    if(this.myList.length != 0){
      return true;
    }
    else{
      return false;
    }
  }

}
