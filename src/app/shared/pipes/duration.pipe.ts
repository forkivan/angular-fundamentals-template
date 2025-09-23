import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || value < 0) {
      return '00:00 hours';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');

    return `${hh}:${mm} hours`;
  }
}
