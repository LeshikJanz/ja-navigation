import { IWaypoint } from "../types";
import { IGeoObject } from "yandex-maps";

const minPointsCount = 2

const makeRouteInstance = () => {
  let placemarks: { geometry: { _coordinates: [string, string] } }[] = []
  let route: IGeoObject

  const addPlacemark = (coordinates: [string, string]) => {
    const placemark = new window.ymaps.Placemark(coordinates);
    placemarks.push(placemark)
    window.jaMap.geoObjects.add(placemark);
  };

  const removePlacemark = (waypoints: IWaypoint[], waypointId: string) => {
    const waypointIndex = waypoints.findIndex(
      waypoint => waypoint.id === waypointId
    );

    const placemark = placemarks.find(placemark => placemark.geometry._coordinates === waypoints[waypointIndex].coords)
    placemarks = placemarks.filter(p => p !== placemark)
    window.jaMap.geoObjects.remove(placemark)
  };

  const createRoute = (waypoints: IWaypoint[]) => {
    if (waypoints.length < minPointsCount) return
    route = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: waypoints.map(
          waypoint => waypoint.coords
        ),
        params: {
          results: minPointsCount
        }
      },
      {
        boundsAutoApply: true
      }
    );
    window.jaMap.geoObjects.add(route);
  }

  const updateRoute = (waypoints: IWaypoint[]) => {
    window.jaMap.geoObjects.removeAll()
    waypoints.forEach(waypoint => addPlacemark(waypoint.coords))
    createRoute(waypoints)
  }

  return { addPlacemark, removePlacemark, createRoute, updateRoute }
};

export const routeInstance = makeRouteInstance()
