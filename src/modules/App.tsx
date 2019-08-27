import React, { Fragment } from "react";
import Map from "./map/Map";
import RoutePanel from "./routePanel/RoutePanel";

export default class App extends React.Component<{}, { isMapInit: boolean }> {
  state = {
    isMapInit: false
  };

  handleMapInit = (isMapInit: boolean) => this.setState({ isMapInit });

  render() {
    return (
      <Fragment>
        <Map onMapInit={this.handleMapInit} />
        <RoutePanel isMapInit={this.state.isMapInit} />
      </Fragment>
    );
  }
}
