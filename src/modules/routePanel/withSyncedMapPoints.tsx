import React from "react";

function withSyncedMapPoints(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<any> {
    addPointOnMap = (coordinates: [number, number], bounds: string) => {
      window.jaMap.geoObjects.add(
        new window.ymaps.GeoObject(
          {
            geometry: {
              type: "Point",
              coordinates
            },
            properties: {}
          },
          {
            preset: "islands#blackStretchyIcon",
            draggable: true
          }
        )
      );
      window.jaMap.setBounds(bounds, {
        checkZoomRange: true
      });
      if (this.props.waypoints.length >= 2) this.createRoute();
    };

    createRoute = () => {
      const multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
          referencePoints: this.props.waypoints.map(
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

      window.jaMap.geoObjects.add(multiRoute);
    };

    render() {
      return (
        <WrappedComponent {...this.props} addPointOnMap={this.addPointOnMap} />
      );
    }
  };
}

export default withSyncedMapPoints;
