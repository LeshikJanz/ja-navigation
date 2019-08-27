declare global {
  interface Window { ymaps: any; jaMap: any; }
}

export interface IWaypoint {
  id: string;
  value: string;
  coords: [string, string];
}

export interface FormElements extends HTMLFormElement {
  suggest: HTMLInputElement;
}
