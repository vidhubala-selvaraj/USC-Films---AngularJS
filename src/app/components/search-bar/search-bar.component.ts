import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {PostsService} from '../../services/posts.service';

// const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const WIKI_URL = "http://localhost:5000/search?query=";
// const WIKI_URL = "https://pacific-legend-310201.wl.r.appspot.com/search?query=";
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient,  private postService: PostsService) {}
  result = []
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http.get<any>(WIKI_URL+term)      
  }
}

@Component({
      selector: 'app-search-bar',
      templateUrl: './search-bar.component.html',
      providers: [WikipediaService],
      styleUrls: ['./search-bar.component.css']
    })
export class SearchBarComponent {
  model: any;
  searching = false;
  searchFailed = false;
  public vid: any;
  public det: any;
  public cast: any;
  public rev: any;
  public sim: any;
  public rcmd: any;
  public cast_det:any;
 

  constructor(private _service: WikipediaService,private route: ActivatedRoute, private router: Router, private postService: PostsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;}
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
           
           this.router.navigated = false;
           
           window.scrollTo(0, 0);
        }
    });}

  ngOnInit() {
    this.fetchData();
  }

  formatter = (x: {name: string}) => x.name;
  search: OperatorFunction<string, readonly {name: string, picture: string}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        this._service.search(term)),
      catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
    )

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
      });
    }

}

  