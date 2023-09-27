import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
})
export class CounterPageComponent {
  constructor() {
    effect(() => {
      console.log(`signal effect: ${this._counter()}, ${this._counter2()}`);
    });
    combineLatest([this.count$, this.count2$]).subscribe(([count1, count2]) => {
      console.log(`rxjs subscription: ${count1}, ${count2}`);
    });
  }

  // Signal
  private _counter = signal(10);
  private _counter2 = signal(5);

  public counter = computed(() => this._counter());
  public counter2 = computed(() => this._counter2());
  public squareCounter = computed(() => this.counter() * this.counter());
  public count1PlusCount2 = computed(() => {
    console.log(`signal: ${this._counter() + this._counter2()}`);
    return this._counter() + this._counter2();
  });

  increaseBy(value: number): void {
    this._counter.update((current) => current + value);
  }

  reset(): void {
    this._counter.set(10);
  }

  // RXJS
  public count$ = new BehaviorSubject(10);
  public count2$ = new BehaviorSubject(5);
  public squareCounter$ = this.count$.pipe(map((value) => value * value));
  public count1PlusCount2$ = combineLatest([this.count$, this.count2$]).pipe(
    tap(([v1, v2]) => console.log(`rxjs: ${v1 + v2}`)),
    map(([count1, count2]) => count1 + count2)
  );

  increaseBy$(value: number): void {
    this.count$.next(this.count$.value + value);
  }

  reset$(): void {
    this.count$.next(10);
  }
}
