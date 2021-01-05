export class DateHelper {
  public static getNowUnixTime() {
    return Math.floor(Date.now() / 1000);
  }
}
