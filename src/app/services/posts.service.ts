import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  getAllPost() {
    let URL = "http://localhost:5000/posts";
    // let URL = "https://pacific-legend-310201.wl.r.appspot.com/posts";
    return this.httpClient.get<any>(URL);
  }

  getAll(details_id:any, details_media_type:any) {
    let url = "http://localhost:5000/watch?id=" + details_id + "&media_type=" + details_media_type;
    // let url = "https://pacific-legend-310201.wl.r.appspot.com/watch?id=" + details_id + "&media_type=" + details_media_type;
    return this.httpClient.get<any>(url);
  
  }

  getCast(id:any){
    let url = "http://localhost:5000/modal?id=" + id;
    // let url = "https://pacific-legend-310201.wl.r.appspot.com/modal?id=" + id;
    return this.httpClient.get<any>(url);

  }

  getSearch(qry: any) {
    let URL = "http://localhost:5000/search?query=" +qry;
    // let URL = "http://localhost:8080/search";
    // let URL = "https://pacific-legend-310201.wl.r.appspot.com/search?query=" +qry;
    return this.httpClient.get<any>(URL);
  }
  
}
