import React from "react";

function withSyncedMapPoints(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<any> {
    // addPointOnMap = (coordinates: [number, number], bounds: string) => {
    //   const geoObject = window.jaMap.geoObjects.add(
    //     сщтые new window.ymaps.GeoObject(
    //       {
    //         geometry: {
    //           type: "Point",
    //           coordinates
    //         }
    //       },
    //       {
    //         preset: "islands#blackStretchyIcon",
    //         draggable: true
    //       }
    //     )
    //   );

    //   console.log("geoObject", geoObject);
    //   window.jaMap.setBounds(bounds, {
    //     checkZoomRange: true
    //   });
    //   console.log("IndexOf", window.jaMap.geoObjects.indexOf(geoObject))
    //   if (this.props.waypoints.length >= 2) this.createRoute();
    // };

    // createRoute = () => {
    //   const multiRoute = new window.ymaps.multiRouter.MultiRoute(
    //     {
    //       referencePoints: this.props.waypoints.map(
    //         waypoint => waypoint.coords
    //       ),
    //       params: {
    //         results: 2
    //       }
    //     },
    //     {
    //       boundsAutoApply: true
    //     }
    //   );
    //   window.jaMap.geoObjects.add(multiRoute);
    // };

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  };
}

export default withSyncedMapPoints;
