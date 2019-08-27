import React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import withSyncedMapPoints from "./withSyncedMapPoints";

import { IWaypoint } from "./types";

const WaypointsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Point = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 20px;
`;

const Cross = styled.button`
  margin-left: 18px;
  border: none;
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

interface Props {
  waypoints: IWaypoint[];
  reorderWaypoints: (result: DropResult) => void;
  deleteWaypoint: (id: string) => void;
}

function WaypointList({ waypoints, reorderWaypoints, deleteWaypoint }: Props) {
  if (!waypoints.length) return null;
  return (
    <DragDropContext onDragEnd={reorderWaypoints}>
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <h2>Waypoints:</h2>
            <WaypointsContainer>
              {waypoints.map(({ id, value }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <Point
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {index + 1}:&nbsp;<span>{value}</span>
                      <Cross onClick={() => deleteWaypoint(id)} />
                    </Point>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </WaypointsContainer>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default WaypointList;
