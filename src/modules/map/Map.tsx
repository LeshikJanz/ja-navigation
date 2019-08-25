import React from "react";
import { runMap } from "./utils/runMap";

class Map extends React.Component {
  componentDidMount() {
    runMap();
  }

  render() {
    return <div id="map" style={{ width: "600px", height: "400px" }} />;
  }
}

export default Map
