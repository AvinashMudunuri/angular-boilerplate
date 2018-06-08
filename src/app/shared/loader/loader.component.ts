import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.createServiceSubscription();
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  createServiceSubscription() {
    this.subscription = this.loaderService.getMessage().subscribe(state => {
      this.show = state.show;
    });
  }
}
