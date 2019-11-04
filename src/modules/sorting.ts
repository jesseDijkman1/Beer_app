export default function <T>(data: T[], key: string, ascending: boolean): void {
  data.sort((dataA: T | any, dataB: T | any) => {
    const b: string | number = dataB[key];
    const a: string | number = dataA[key];

    if (a > b) {
      return ascending ? 1 : -1;
    }

    if (b > a) {
      return ascending ? -1 : 1;
    }

    return 0;
  });
}
