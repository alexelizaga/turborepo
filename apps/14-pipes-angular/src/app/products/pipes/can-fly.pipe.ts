import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): 'It flies' | "It doesn't fly" {
    return value ? 'It flies' : "It doesn't fly";
  }
}
