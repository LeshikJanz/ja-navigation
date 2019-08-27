import { IWaypoint } from "../types";

const makeRouteInstance = () => {
  let placemarks: any[] = []
  let route: any

  const addPlacemark = (coordinates: [number, number], bounds: string) => {
    const placemark = new window.ymaps.Placemark(coordinates);
    placemarks.push(placemark)
    window.jaMap.geoObjects.add(placemark);

    window.jaMap.setBounds(bounds, {
      checkZoomRange: true
    });
    // if (waypoints.length >= 2) this.createRoute();
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
    if (waypoints.length < 2) return
    route = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: waypoints.map(
          waypoint => waypoint.coords
        ),
        params: {
          results: 2
        }
      },
      {
        boundsAutoApply: true
      }
    );
    window.jaMap.geoObjects.add(route);
  }

  const removeRoute = () => {
    const routeIndex = window.jaMap.geoObjects.indexOf(route);
    console.log("routeIndex", routeIndex)
    window.jaMap.geoObjects.remove(window.jaMap.geoObjects.get(routeIndex))
  }

  return { addPlacemark, removePlacemark, createRoute, removeRoute }
};

export const routeInstance = makeRouteInstance()
