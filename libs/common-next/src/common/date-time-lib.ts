export class DateTimeLib {
  constructor() {}

  static mySqlDatetimeToString(date?: string) {
    if (!date) return '';
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
}
