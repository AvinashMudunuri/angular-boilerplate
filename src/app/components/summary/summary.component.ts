import { Component, OnInit, HostBinding } from '@angular/core';
import { JokeService } from '../joke/joke.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  options: string[] = ['All', 'Like', 'Dislike'];
  selected: string = 'All';
  ratedJokes: any;
  sortBy: boolean = false;
  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.ratedJokes = this.jokeService.getRatedJokes();
  }
  sortColumn() {
    this.sortBy = !this.sortBy;
  }
}
