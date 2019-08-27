import React, { FormEvent, Fragment } from "react";
import { DropResult } from "react-beautiful-dnd";
import SearchBox from "./SearchBox";
import WaypointList from "./WaypointList";
import { reorder } from "./utils/reorder";
import { routeInstance } from "./utils/routeFormatters";

import { IWaypoint } from "./types";

class RoutePanel extends React.Component<
  { isMapInit: boolean },
  { waypoints: IWaypoint[] }
> {
  state = {
    waypoints: []
  };

  addDestination = (
    destination: string,
    coords: [string, string],
    bounds: string
  ): void => {
    this.setState(
      prevState => ({
        waypoints: [
          ...prevState.waypoints,
          {
            id: `${new Date().getTime()}`,
            value: destination,
            coords
          }
        ]
      }),
      () => {
        const placemark = routeInstance.addPlacemark(
          this.state.waypoints[this.state.waypoints.length - 1]
        );
        routeInstance.assignDragEndEvent(placemark, this.updateWaypoint);
        routeInstance.createRoute(this.state.waypoints);
        window.jaMap.setBounds(bounds, {
          checkZoomRange: true
        });
      }
    );
  };

  deleteWaypoint = (id: string) => {
    routeInstance.removePlacemark(id);
    this.setState(
      prevState => ({
        waypoints: prevState.waypoints.filter(waypoint => waypoint.id !== id)
      }),
      () => routeInstance.updateRoute(this.state.waypoints, this.updateWaypoint)
    );
  };

  updateWaypoint = (
    waypointId: string,
    coords: [string, string],
    value: string
  ) => {
    const waypoints = this.state.waypoints.reduce(
      (result: IWaypoint[], waypoint: IWaypoint) => {
        if (waypoint.id === waypointId)
          return [...result, { ...waypoint, coords, value }];
        return [...result, waypoint];
      },
      []
    );
    this.setState({ waypoints });
    return waypoints;
  };

  reorderWaypoints = (result: DropResult) => {
    if (!result.destination) return;

    const waypoints = reorder(
      this.state.waypoints,
      result.source.index,
      result.destination.index
    );

    this.setState({ waypoints }, () =>
      routeInstance.updateRoute(this.state.waypoints, this.updateWaypoint)
    );
  };

  render() {
    if (!this.props.isMapInit) return null;
    const { waypoints } = this.state;
    return (
      <Fragment>
        <SearchBox waypoints={waypoints} addDestination={this.addDestination} />
        <WaypointList
          waypoints={waypoints}
          reorderWaypoints={this.reorderWaypoints}
          deleteWaypoint={this.deleteWaypoint}
        />
      </Fragment>
    );
  }
}

export default RoutePanel;
