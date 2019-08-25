import React, { Fragment } from "react";
import styled from "styled-components";
import { IWaypoint } from "./types";

const WaypointsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Point = styled.div`
  display: flex;
  margin: 10px 0;
  font-size: 20px;
`;

const Cross = styled.span`
  margin-left: 18px;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 20px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

class WaypointList extends React.Component<{
  waypoints: IWaypoint[];
  deleteWaypoint: (id: number) => void;
}> {
  render() {
    const { waypoints, deleteWaypoint } = this.props;
    if (!waypoints.length) return null;
    return (
      <Fragment>
        <h2>Waypoints:</h2>
        <WaypointsContainer>
          {waypoints.map(({ id, value, order }, index) => (
            <Point key={id}>
              {index + 1}:&nbsp;<span key={id}>{value}</span>
              <Cross onClick={() => deleteWaypoint(id)} />
            </Point>
          ))}
        </WaypointsContainer>
      </Fragment>
    );
  }
}

export default WaypointList;
