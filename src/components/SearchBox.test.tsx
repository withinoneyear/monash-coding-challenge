import React from "react";
import wait from "waait";
import { mount, shallow } from "enzyme";
// import { render, fireEvent, screen } from "@testing-library/react";
import SearchBox from "./SearchBox";
import { act } from "react-dom/test-utils";

describe("SearchBox", () => {
  test("should render properly", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<SearchBox onChange={onChange} />);
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
  });

  test("should call onChange callback", async () => {
    const onChange = jest.fn();
    const wrapper = mount(<SearchBox onChange={onChange} debounceMs={1} />);
    const input = wrapper.find("input");
    act(() => {
      (input.getDOMNode() as HTMLInputElement).value = "Hello";
      input.simulate("change");
    });
    wrapper.update();
    await wait(10);

    expect(onChange).toBeCalledWith("Hello");
  });
});
