import React from "react";
import { runMap } from "./utils";

class Map extends React.Component<{ onMapInit: (result: boolean) => void }> {
  componentDidMount() {
    const result = runMap();
    this.props.onMapInit(!!result);
  }

  render() {
    return <div id="map" style={{ width: "600px", height: "400px" }} />;
  }
}

export default Map;
