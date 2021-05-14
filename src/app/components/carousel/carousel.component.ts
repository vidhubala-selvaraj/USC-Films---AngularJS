import { Component, OnInit } from '@angular/core';  
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import {PostsService} from '../../services/posts.service';
import { ViewChild,ViewEncapsulation } from '@angular/core';

@Component({  
  selector: 'app-carousel',  
  templateUrl: './carousel.component.html',
  encapsulation: ViewEncapsulation.None,  
  styleUrls: ['./carousel.component.css']
})  
export class CarouselComponent implements OnInit {  

  public csl: any = [];
  public pm: any = [];
  public tm: any = [];
  public trm: any = [];
  public ps: any = [];
  public ts: any = [];
  public trs: any = [];


  
  constructor(config: NgbCarouselConfig, private postService: PostsService) {  
    config.interval = 5000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
  }  
  ngOnInit() {  
    this.fetchData();
  }  

  fetchData() {
    this.postService.getAllPost().subscribe(res => {
      this.csl = res.carousel;
      this.pm= res.popular_movies;
      this.tm = res.top_rated_movies;
      this.trm = res.trending_movies;
      this.ps = res.popular_shows;
      this.ts = res.top_rated_shows;
      this.trs = res.trending_shows;
    })
  }
  
} 
