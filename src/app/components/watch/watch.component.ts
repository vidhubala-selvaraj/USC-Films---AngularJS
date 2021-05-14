import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PostsService} from '../../services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  template: '<youtube-player videoId="{{vid[0].video}}"></youtube-player>',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  public vid: any;
  public det: any;
  public cast: any;
  public rev: any;
  public sim: any;
  public rcmd: any;
  public cast_det: any;
  public storage_list: any = [];
  public storage_list_check: any = [];
  button_content = "Add to WatchList";
  trigger_message = "";
  trigger_add = false;
  trigger_remove = false;
  content: any;
  test:any = [];



  constructor(private route: ActivatedRoute, router: Router, private http: HttpClient, private postService: PostsService, private modalService: NgbModal) {}

  

  ngOnInit(): void { 
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.fetchData();
    this.check_LocalStorage();
  }

  // Modal
  openLg(content: any,id:number) {
    this.postService.getCast(id).subscribe(res => {
      this.cast_det = res;   
    })
    console.log(this.cast_det);
    this.modalService.open(content, { size: 'lg' });
  }

  fetchData() {
    var id = this.route.snapshot.params['id'];
    var media_type = this.route.snapshot.params['media_type'];

    this.postService.getAll(id, media_type).subscribe(res => {
     
      this.vid = res.v;
      this.det= res.d;
      this.cast = res.c;
      this.rev = res.r;
      this.sim = res.s;
      this.rcmd = res.rd;
      console.log(this.vid)
    });
  }

  Local_Storage(id:string, media_type:string, poster_path:string, title: string) {
    this.storage_list = window.localStorage.getItem("myList");
    var key = id + "," + media_type;
    var temp:any = {};
    temp.mainkey = key;
    temp.id = id;
    temp.media_type = media_type;
    temp.poster_path = poster_path;
    temp.title = title;
    var flag = false;

    if(JSON.parse(this.storage_list)){
      var temp_arr = JSON.parse(this.storage_list);
    
      for(var i = 0 ; i < temp_arr.length ; i++){
        if(temp_arr[i]['mainkey'] == key){
          temp_arr.splice(i,1);
          this.trigger_message = "Removed from watchlist."
          this.trigger_remove = true;
          this.trigger_add = false;
          flag = true;
        }
      }
      if(!flag){
        temp_arr.unshift(temp);
        this.trigger_message = "Added to watchlist."
        this.trigger_add = true;
        this.trigger_remove = false;
      }
      window.localStorage.setItem("myList",JSON.stringify(temp_arr));
    }
    else{
      window.localStorage.setItem("myList",JSON.stringify([temp]));
    }
    this.test = window.localStorage.getItem("myList");
    console.log(JSON.parse(this.test));

    setTimeout(() => {
      this.closeTrigger();
    }, 5000);
    this.check_LocalStorage();
  }
  
  closeTrigger(){
    this.trigger_add = false;
    this.trigger_remove = false;
  }

  private check_LocalStorage(){
    var id = this.route.snapshot.params['id'];
    var media_type = this.route.snapshot.params['media_type'];

    var key = id + "," + media_type;
    this.storage_list_check = window.localStorage.getItem("myList");
    if (JSON.parse(this.storage_list_check)){
      var temp_arr = JSON.parse(this.storage_list_check);
      for(var i = 0 ; i < temp_arr.length ; i++){
        if(temp_arr[i]['mainkey'] == key){
          this.button_content = "Remove from WatchList";
          return;
        }
      }
      this.button_content = "Add to WatchList";
    }
  }
}


