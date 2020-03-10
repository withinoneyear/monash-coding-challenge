import React from "react";
import Character from "./Character";
import { shallow } from "enzyme";

describe("Character", () => {
  test("should render properly", () => {
    const value: any = {
      urls: [{ type: "detail", url: "https://www.google.com" }],
      comics: {},
      events: {},
      series: {},
      stories: {},
    };
    const wrapper = shallow(<Character value={value} />);
    expect(wrapper.find("li")).toHaveLength(4);
    expect(wrapper.find("a").props().href).toBe("https://www.google.com");
  });

  test("should have link without url if detail url not found", () => {
    const value: any = {
      urls: [],
      comics: {},
      events: {},
      series: {},
      stories: {},
    };
    const wrapper = shallow(<Character value={value} />);
    expect(wrapper.find("a").props().href).toBeUndefined();
  });
});
