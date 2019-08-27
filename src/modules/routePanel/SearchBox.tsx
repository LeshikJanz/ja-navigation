import React, { FormEvent } from "react";
import styled from "styled-components";

import { IWaypoint } from "./types";
import withSyncedMapPoints from "./withSyncedMapPoints";

const WaypointField = styled.div`
  display: flex;
  max-width: 350px;
  flex-direction: column;
  padding-bottom: 10px;
`;

class SearchBox extends React.Component<
  {
    waypoints: IWaypoint[];
    addDestination: (waypoint: string, coords: [string, string]) => void;
    addPointOnMap: (coords: [string, string], bounds: string) => void;
  },
  { searchValue: string; errors: string }
> {
  state = {
    searchValue: "",
    errors: ""
  };
  componentDidMount() {
    if (window.ymaps.SuggestView) {
      new window.ymaps.SuggestView("suggest");
    }
  }

  geocode = (request: string) => {
    try {
      return window.ymaps.geocode(request, { results: 1 }).then((res: any) => {
        const geoObject = res.geoObjects.get(0);
        const address = geoObject.getAddressLine();
        const coords = geoObject.geometry.getCoordinates();
        const bounds = geoObject.properties.get("boundedBy");
        return { address, coords, bounds };
      });
    } catch (errors) {
      this.setState({ errors });
    }
  };

  handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target) return;
    this.setState({ searchValue: target.value });
  };

  onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { suggest } = e.target.elements;
    if (!suggest) return;
    const { address, coords, bounds } = await this.geocode(suggest.value || this.state.searchValue);
    this.props.addDestination(address, coords);
    this.props.addPointOnMap(coords, bounds);
    this.setState({ searchValue: "" });
  };

  render() {
    console.log("searchValue", this.state.searchValue);
    const { waypoints } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <WaypointField>
          <label htmlFor="waypoint">
            Enter point {Number(waypoints.length + 1)}:{" "}
          </label>
          <input
            id="suggest"
            name="suggest"
            type="text"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </WaypointField>
        <button>Add</button>
      </form>
    );
  }
}

export default withSyncedMapPoints(SearchBox);
