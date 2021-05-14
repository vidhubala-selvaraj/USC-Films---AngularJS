import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { WatchComponent } from './components/watch/watch.component';
import { WatchlistComponent } from  './components/watchlist/watchlist.component';
import {ModalComponent} from '././components/modal/modal.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'posts/:id', component: CarouselComponent},
  {path: 'watch/:media_type/:id', component: WatchComponent},
  {path: 'watch/:media_type/:id', component: SearchBarComponent},
  {path: 'myList', component: WatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// There are 4 routes for this application:

// a) Home page Route [‘/’] – It is a default route of this application.
// b) Movie Details Route [‘/watch/movie/<id>’] – It displays the details of the movie with
// id=<id>
// c) TV show Details Route [ ‘/watch/tv/<id>’] – It displays the details of the TV show with
// id=<id>
// d) Watchlist Route [‘/mylist’] – It displays the watchlist of the user.
