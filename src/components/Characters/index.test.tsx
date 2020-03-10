import React from "react";
import Character from "./Character";
import { shallow } from "enzyme";
import Characters from "./index";

test("Characters component should render properly", () => {
  const list: any = [1, 2, 3];
  const wrapper = shallow(<Characters list={list} />);
  const cs = wrapper.find(Character);
  expect(cs).toHaveLength(3);
  expect(cs.get(0).props.value).toBe(1);
  expect(cs.get(2).props.value).toBe(3);
});
