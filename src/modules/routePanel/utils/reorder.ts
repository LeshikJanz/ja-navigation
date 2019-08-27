import { IWaypoint } from "../types";

export const reorder = (list: IWaypoint[], startIndex: number, endIndex: number): IWaypoint[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
