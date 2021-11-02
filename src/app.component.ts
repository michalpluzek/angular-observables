import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  template: `
    <p>Result: {{ result }}</p>
    <p>Time: {{ time }}</p>
    <p>Error: {{ error }}</p>
    <counter-app></counter-app>
  `,
})
export class AppComponent {
  result;
  time;
  error;

  constructor() {
    const startTime = Date.now();
    this.add(2, 3)
      .mergeMap((result) => this.add(result, 4))
      .mergeMap((result) => this.add(result, 10))
      .finally(() => (this.time = Date.now() - startTime))
      .subscribe(
        (result) => (this.result = result),
        (error) => (this.error = error)
      );
  }

  add(x, y): Observable<number> {
    return Observable.create((observer) => {
      setTimeout(() => {
        const result = x + y;

        if (result >= 0) {
          observer.next(result);
          observer.complete();
        } else observer.error(`Nieprawidłowa wartość: ${result}`);
      }, 1000);
    });
  }
}
