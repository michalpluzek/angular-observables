import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <p>Result: {{ result }}</p>
    <p>Time: {{ time }}</p>
    <p>Error: {{ error }}</p>
  `,
})
export class AppComponent {
  result;
  time;
  error;

  constructor() {
    const startTime = Date.now();
    this.add(2, 3)
      .then((result) => this.add(result, 4))
      .then((result) => this.add(result, 10))
      .then((result) => (this.result = result))
      .catch((error) => (this.error = error))
      .then(() => (this.time = Date.now() - startTime));
  }

  add(x, y): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = x + y;

        if (result >= 0) resolve(result);
        else reject(`Nieprawidłowa wartość: ${result}`);
      }, 1000);
    });
  }
}
