import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('count is greater than 3'));
        }
        count++;
      }, 1000)
    })
    customObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round' + (data + 1);
    })).subscribe(count => {
      console.log(count);
    }, error => { console.log(error.message) },
      () => {
        console.log('complete');
      })
  }

  ngOnDestroy(): void {
    // this.firstObsSubscription.unsubscribe();
  }

}
