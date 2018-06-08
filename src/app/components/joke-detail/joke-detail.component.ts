import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { RatedJoke } from '../joke/joke';
import { JokeService } from '../joke/joke.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joke-detail',
  templateUrl: '../joke/joke.component.html',
  styleUrls: ['../joke/joke.component.scss']
})
export class JokeDetailComponent implements OnInit {
  @Input() currentJoke: RatedJoke;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jokeService: JokeService,
  ) { }

  ngOnInit() {
    this.getSelectedJoke();
  }

  getSelectedJoke() {
    const id = this.route.snapshot.paramMap.get('id');
    this.currentJoke = this.jokeService.getSelectedJoke(id);
    if (!this.currentJoke.id) {
      this.router.navigate(['/']);
    }
  }

  rateJoke(currentJoke, rating): void {
    this.jokeService.rateJoke(currentJoke, rating);
    this.router.navigate(['/']);
  }

}
