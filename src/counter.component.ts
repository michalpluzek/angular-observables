import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "counter-app",
  template: ` <p>Counter: {{ result }}</p> `,
})
export class CounterComponent {
  result;

  constructor() {
    this.countDown(5).subscribe(
      (result) => (this.result = result),
      null,
      () => (this.result = "Complete!")
    );
  }

  countDown(start): Observable<number> {
    return Observable.timer(1, 1000)
      .map((x) => start - x)
      .takeWhile((x) => x > 0);
  }
}
