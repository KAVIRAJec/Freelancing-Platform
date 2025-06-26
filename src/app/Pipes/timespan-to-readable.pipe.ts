import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespanToReadable',
  standalone: true
})
export class TimespanToReadablePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    // Accepts both '5.00:00:00' and '00:00:00:00' and '03:04:05:00' formats
    if (!value || typeof value !== 'string') return value || '';
    // Match 'd.hh:mm:ss' or 'hh:mm:ss' or 'dd:hh:mm:ss'
    let days = 0, hours = 0, minutes = 0, seconds = 0;
    // Format: '5.00:00:00' (d.hh:mm:ss)
    const dotMatch = value.match(/^(\d+)\.(\d{2}):(\d{2}):(\d{2})$/);
    if (dotMatch) {
      days = parseInt(dotMatch[1], 10);
      hours = parseInt(dotMatch[2], 10);
      minutes = parseInt(dotMatch[3], 10);
      seconds = parseInt(dotMatch[4], 10);
    } else if (/^\d{2}:\d{2}:\d{2}:\d{2}$/.test(value)) {
      // Format: 'dd:hh:mm:ss'
      const parts = value.split(':').map(Number);
      days = parts[0];
      hours = parts[1];
      minutes = parts[2];
      seconds = parts[3];
    } else {
      return value;
    }
    let result = '';
    if (days) result += `${days}d `;
    if (hours) result += `${hours}h `;
    if (minutes) result += `${minutes}m`;
    return result.trim() || '0m';
  }
}
