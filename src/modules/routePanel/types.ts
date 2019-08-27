export interface IWaypoint {
  id: string;
  value: string;
  coords: [string, string];
}

declare global {
  interface Window { ymaps: any; jaMap: any; }
}
