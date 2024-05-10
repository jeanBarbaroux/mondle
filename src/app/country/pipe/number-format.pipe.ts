import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (/^\d+$/.test(value)) {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return value;
  }
}
