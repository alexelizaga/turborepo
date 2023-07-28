import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): 'it flies' | "it doesn't fly" {
    return value ? 'it flies' : "it doesn't fly";
  }
}
