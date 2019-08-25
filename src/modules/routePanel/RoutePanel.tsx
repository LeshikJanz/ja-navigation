import React from "react";
import styled from "styled-components";

const WaypointField = styled.div`
  display: flex;
  max-width: 350px;
  flex-direction: column;
  padding-bottom: 10px;
`;

const startedPointId = "0";

class RoutePanel extends React.Component<{}, { waypoints: {} }> {
  state = {
    waypoints: { [startedPointId]: "" }
  };

  addDestination = () => {
    console.log("addDestionation");
    this.setState(prevState => ({
      waypoints: {
        ...prevState.waypoints,
        [Object.keys(prevState.waypoints).length]: ""
      }
    }));
  };

  handleWaypointChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    console.log("target", target);
    if (!target) return;
    this.setState(prevState => ({
      waypoints: {
        ...prevState.waypoints,
        [target.id]: target.value
      }
    }));
  };

  render() {
    const { waypoints } = this.state;
    console.log("waypoints", waypoints);
    return (
      <div>
        <h1>Waypoints:</h1>
        {Object.entries(waypoints).map(([id, value]) => (
          <WaypointField key={id}>
            <label htmlFor={id}>
              {id === startedPointId
                ? "Starting point"
                : `Point ${Number(id) + 1}`}
              :{" "}
            </label>
            <input
              id={id}
              type="text"
              value={value}
              onChange={this.handleWaypointChange}
            />
          </WaypointField>
        ))}

        <button onClick={this.addDestination}>Add new destination</button>
      </div>
    );
  }
}

export default RoutePanel;
