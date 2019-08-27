import React from "react";
import { shallow } from "enzyme";
import Map from "../Map";

describe("Map component", () => {
  it("matches snapshot", () => {
    const onMapInit = jest.fn();
    const component = shallow(<Map onMapInit={onMapInit} />);
    expect(component).toMatchSnapshot();
  });

  it("should onMapInit to be called at componentDidMount", () => {
    const onMapInit = jest.fn();
    expect(onMapInit.mock.calls.length).toBe(0);
    const component = shallow(<Map onMapInit={onMapInit} />);
    expect(onMapInit.mock.calls.length).toBe(1);
  });
});
