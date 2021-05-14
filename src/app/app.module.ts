import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import {YouTubePlayerModule} from '@angular/youtube-player';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { WatchComponent } from './components/watch/watch.component';
import { ModalComponent } from './components/modal/modal.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CarouselComponent,
    NavBarComponent,
    SearchBarComponent,
    FirstPageComponent,
    WatchComponent,
    ModalComponent,
    WatchlistComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule, 
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
