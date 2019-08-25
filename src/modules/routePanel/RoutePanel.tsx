import React, { FormEvent } from "react";
import styled from "styled-components";
import { IWaypoint } from "./types";
import WaypointList from "./WaypointList";

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
          id: prevState.waypoints.length,
          value: prevState.newWaypointValue,
          order: prevState.waypoints.length
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
          deleteWaypoint={this.deleteWaypoint}
        />
      </form>
    );
  }
}

export default RoutePanel;
