import React from "react";
import { shallow } from "enzyme";
import RoutePanel from "../RoutePanel";
import { routeInstance } from "../utils/routeFormatters";

describe("RoutePanel component", () => {
  it("matches snapshot with isMapInit = false", () => {
    const props = {
      isMapInit: false
    };
    const component = shallow(<RoutePanel {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot with isMapInit = true", () => {
    const props = {
      isMapInit: true
    };
    const component = shallow(<RoutePanel {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("should addDestination add waypoint to state", () => {
    const props = {
      isMapInit: true
    };
    const component = shallow(<RoutePanel {...props} />);
    expect(component.state().waypoints.length).toBe(0);
    component.instance().addDestination("Minsk", ["52.52", "22.55"], "");
    expect(component.state().waypoints.length).toBe(1);
  });

  it("should deleteWaypoint call routeInstance.removePlacemark", () => {
    const props = {
      isMapInit: true
    };
    routeInstance.removePlacemark = jest.fn();
    const component = shallow(<RoutePanel {...props} />);
    expect(routeInstance.removePlacemark.mock.calls.length).toBe(0);
    component.instance().deleteWaypoint("123");
    expect(routeInstance.removePlacemark.mock.calls.length).toBe(1);
  });

  it("should deleteWaypoint delete waypoint by id", () => {
    const props = {
      isMapInit: true
    };
    const component = shallow(<RoutePanel {...props} />);
    component.setState({
      waypoints: [{ id: "123", value: "Minsk", coords: ["52.34", "55.33"] }]
    });
    expect(component.state().waypoints.length).toBe(1);
    component.instance().deleteWaypoint("123");
    expect(component.state().waypoints.length).toBe(0);
  });

  it("should updateWaypoint update waypoint by id", () => {
    const props = {
      isMapInit: true
    };
    const prevCoords = ["25.25", "52.52"];
    const nextCoords = ["55.55", "22.22"];
    const component = shallow(<RoutePanel {...props} />);
    component.setState({
      waypoints: [{ id: "123", value: "Minsk", coords: prevCoords }]
    });
    expect(component.state().waypoints[0].coords).toBe(prevCoords);
    expect(component.state().waypoints[0].value).toBe("Minsk");
    component.instance().updateWaypoint("123", nextCoords, "Moscow");
    expect(component.state().waypoints[0].coords).toBe(nextCoords);
    expect(component.state().waypoints[0].value).toBe("Moscow");
  });
});
