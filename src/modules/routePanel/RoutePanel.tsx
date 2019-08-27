import React, { FormEvent, Fragment } from "react";
import WaypointList from "./WaypointList";
import { reorder } from "./utils";

import { IWaypoint } from "./types";
import { DropResult } from "react-beautiful-dnd";
import SearchBox from "./SearchBox";

class RoutePanel extends React.Component<
  { isMapInit: boolean },
  { waypoints: IWaypoint[] }
> {
  state = {
    waypoints: []
  };

  addDestination = (destination: string, coords: [string, string]): void => {
    console.log("coords", coords);
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

  deleteWaypoint = (id: string) =>
    this.setState(prevState => ({
      waypoints: prevState.waypoints.filter(waypoint => waypoint.id !== id)
    }));

  reorderWaypoints = (result: DropResult) => {
    if (!result.destination) return;

    const waypoints = reorder(
      this.state.waypoints,
      result.source.index,
      result.destination.index
    );

    this.setState({ waypoints });
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
