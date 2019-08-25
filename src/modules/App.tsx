import React, { Fragment } from "react";
import Map from "./map/Map";
import RoutePanel from "./routePanel/RoutePanel";

export default function App() {
  return (
    <Fragment>
      <Map />
      <RoutePanel />
    </Fragment>
  );
}
