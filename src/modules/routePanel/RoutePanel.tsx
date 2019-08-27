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

  addDestination = (destination: string, coords: [string, string]): void => {
    this.setState(prevState => ({
      waypoints: [
        ...prevState.waypoints,
        {
          id: `${new Date().getTime()}`,
          value: destination,
          coords
        }
      ]
    }));
  };

  deleteWaypoint = (id: string) => {
    routeInstance.removePlacemark(this.state.waypoints, id);
    this.setState(
      prevState => ({
        waypoints: prevState.waypoints.filter(waypoint => waypoint.id !== id)
      }),
      () => {
        routeInstance.removeRoute(this.state.waypoints)
        // routeInstance.createRoute(this.state.waypoints)
      }
    );
  };

  reorderWaypoints = (result: DropResult) => {
    if (!result.destination) return;

    const waypoints = reorder(
      this.state.waypoints,
      result.source.index,
      result.destination.index
    );

    this.setState({ waypoints });
  };

  // removePointFromMap = (waypointForDelete: any) => {
  //   window.jaMap.geoObjects.remove(waypointForDelete);
  // };

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
