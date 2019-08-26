import React, { FormEvent } from "react";
import styled from "styled-components";
import WaypointList from "./WaypointList";
import { reorder } from "./utils";

import { IWaypoint } from "./types";

const WaypointField = styled.div`
  display: flex;
  max-width: 350px;
  flex-direction: column;
  padding-bottom: 10px;
`;

const startedPointId = "0";

class RoutePanel extends React.Component<
  {},
  { newWaypointValue: string; waypoints: IWaypoint[] }
> {
  state = {
    newWaypointValue: "",
    waypoints: []
  };

  addDestination = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!this.state.newWaypointValue) return;
    this.setState(prevState => ({
      newWaypointValue: "",
      waypoints: [
        ...prevState.waypoints,
        {
          id: new Date().getTime(),
          value: prevState.newWaypointValue
        }
      ]
    }));
  };

  handleWaypointChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target) return;
    this.setState({ newWaypointValue: target.value });
  };

  deleteWaypoint = (id: number) =>
    this.setState(prevState => ({
      waypoints: prevState.waypoints.filter(waypoint => waypoint.id !== id)
    }));

  reorderWaypoints = result => {
    if (!result.destination) {
      return;
    }

    const waypoints = reorder(
      this.state.waypoints,
      result.source.index,
      result.destination.index
    );

    this.setState({ waypoints });
  };

  render() {
    const { newWaypointValue, waypoints } = this.state;
    console.log("waypoints", waypoints);
    return (
      <form onSubmit={this.addDestination}>
        <WaypointField>
          <label htmlFor="waypoint">
            Enter point {Number(waypoints.length + 1)}:{" "}
          </label>
          <input
            id="waypoint"
            type="text"
            value={newWaypointValue}
            onChange={this.handleWaypointChange}
          />
        </WaypointField>
        <button>Add</button>
        <WaypointList
          waypoints={waypoints}
          reorderWaypoints={this.reorderWaypoints}
          deleteWaypoint={this.deleteWaypoint}
        />
      </form>
    );
  }
}

export default RoutePanel;
