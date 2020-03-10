import React from "react";
// import { render } from '@testing-library/react';
import { shallow } from "enzyme";
import App from "./App";
import Home from "./pages/Home";

test("renders learn react link", () => {
  const wrapper = shallow(<App />);
  const home = wrapper.find(Home);
  expect(home).toHaveLength(1);
});
