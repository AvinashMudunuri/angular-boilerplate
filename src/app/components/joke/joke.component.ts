import { Component, OnInit } from '@angular/core';

import { Joke } from './joke';
import { JokeService } from './joke.service';


@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})

export class JokeComponent implements OnInit {
  currentJoke: Joke;
  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.getJoke();
  }

  getJoke(): void {
    this.jokeService.getJoke().subscribe((data: Joke ) => this.currentJoke = data);
  }
  rateJoke(currentJoke, rating): void {
    this.jokeService.rateJoke(currentJoke, rating);
    this.getJoke();
  }
}
