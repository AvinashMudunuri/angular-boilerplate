import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { JokeService } from './components/joke/joke.service';

@Injectable()
export class AppRouteGaurd implements CanActivate {

  constructor(private jokeService: JokeService, private router: Router) {}

  canActivate() {
    if (this.jokeService.getRatedJokes().length > 0) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
