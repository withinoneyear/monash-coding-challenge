import React from "react";
import { shallow } from "enzyme";
import Loading from "./Loading";
import Spinner from "./Spinner";

test("Loading should render properly", () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper.find(Spinner)).toHaveLength(1);
});
