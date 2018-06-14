import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JokeComponent } from './components/joke/joke.component';
import { SummaryComponent } from './components/summary/summary.component';
import { httpInterceptorProviders } from './interceptors';
import { JokeDetailComponent } from './components/joke-detail/joke-detail.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CallbackComponent } from './components/callback/callback.component';
import { filterProviders } from './filters';
import { HeaderComponent } from './shared/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
// import { AppRouteGaurd } from './app-route-gaurd';

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    SummaryComponent,
    JokeDetailComponent,
    LoaderComponent,
    CallbackComponent,
    filterProviders,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
