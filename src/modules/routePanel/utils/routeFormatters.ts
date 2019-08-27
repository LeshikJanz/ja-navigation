import { IWaypoint } from "../types";
import { IGeoObject, GeoObject } from "yandex-maps";

const minPointsCount = 2

export const getPlacemarkId = (placemark: IGeoObject | any) => placemark.properties &&
  placemark.properties._data &&
  placemark.properties._data.iden

const makeRouteInstance = () => {
  let placemarks: IGeoObject[] = []
  let route: IGeoObject

  const addPlacemark = (waypoint: IWaypoint) => {
    const placemark = new window.ymaps.Placemark(waypoint.coords, {
      balloonContent: waypoint.value,
      iden: waypoint.id,
    }, {
        draggable: true
      });

    placemarks.push(placemark);
    window.jaMap.geoObjects.add(placemark);
    return placemark
  };

  const removePlacemark = (waypointId: string) => {
    const placemark = placemarks.find(placemark => getPlacemarkId(placemark) === waypointId)
    placemarks = placemarks.filter(p => p !== placemark)
    window.jaMap.geoObjects.remove(placemark)
  };

  const assignDragEndEvent = async (placemark: GeoObject, updateWaypoint: any) => {
    placemark.events.add("dragend", async (e: any) => {
      const thisPlacemark = e.get("target");
      const coords = thisPlacemark.geometry.getCoordinates();
      const { address } = await geocode(coords)
      const waypoints = updateWaypoint(getPlacemarkId(placemark), coords, address)
      routeInstance.updateRoute(waypoints, updateWaypoint)
    });
  };

  const geocode = (request: string) => {
    try {
      return window.ymaps.geocode(request, { results: 1 }).then((res: any) => {
        if (!res.geoObjects) throw new Error("Bad address");
        const geoObject = res.geoObjects.get(0);
        if (!geoObject) throw new Error("Bad address");
        const address = geoObject.getAddressLine();
        const coords = geoObject.geometry.getCoordinates();
        const bounds = geoObject.properties.get("boundedBy");
        return { address, coords, bounds };
      });
    } catch (errors) {
      console.error("errors", errors)
    }
  };

  const createRoute = (waypoints: IWaypoint[]) => {
    if (waypoints.length < minPointsCount) return
    route = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: waypoints.map(waypoint => waypoint.coords),
        params: { results: minPointsCount }
      },
      { boundsAutoApply: true }
    );
    window.jaMap.geoObjects.add(route);
  }

  const updateRoute = (waypoints: IWaypoint[], updateWaypoint: any) => {
    window.jaMap.geoObjects.removeAll()
    placemarks = []
    waypoints.forEach(waypoint => assignDragEndEvent(addPlacemark(waypoint), updateWaypoint))
    createRoute(waypoints)
  }

  return { addPlacemark, removePlacemark, geocode, assignDragEndEvent, createRoute, updateRoute, placemarks }
};

export const routeInstance = makeRouteInstance()
