import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  public posts: any;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.postService.getAllPost().subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    })
  }

}
