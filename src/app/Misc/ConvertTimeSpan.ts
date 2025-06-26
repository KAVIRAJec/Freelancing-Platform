export class ConvertTimeSpan {
  public static toCSharpTimeSpan(input: string | number): string {
  let totalMinutes = 0;
  if (typeof input === 'number') {
    totalMinutes = input;
  } else if (typeof input === 'string') {
    // Parse '3d 4h 5m'
    const regex = /(?:(\d+)d)?\s*(?:(\d+)h)?\s*(?:(\d+)m)?/i;
    const match = input.match(regex);
    if (match) {
      const days = parseInt(match[1] || '0', 10);
      const hours = parseInt(match[2] || '0', 10);
      const minutes = parseInt(match[3] || '0', 10);
      totalMinutes = days * 24 * 60 + hours * 60 + minutes;
    } else if (!isNaN(Number(input))) {
      totalMinutes = Number(input);
    }
  }
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  // Always output as dd:hh:mm:00
  return `${days.toString().padStart(2, '0')}:${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  }
}