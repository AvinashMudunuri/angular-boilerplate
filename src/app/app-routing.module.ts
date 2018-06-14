import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JokeDetailComponent } from './components/joke-detail/joke-detail.component';
import { JokeComponent } from './components/joke/joke.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/joke', pathMatch: 'full' },
  { path: 'joke', component: JokeComponent },
  { path: 'joke/:id', component: JokeDetailComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
