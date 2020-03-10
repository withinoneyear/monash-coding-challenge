import React from "react";
import { mount } from "enzyme";
import Home from ".";
import View from "./View";
import { act } from "react-dom/test-utils";
import { useCharactersApi } from "../../apiHooks/marvelHooks";

jest.mock("../../apiHooks/marvelHooks", () => ({
  useCharactersApi: jest.fn(),
}));

jest.mock("./View", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div />),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockData = {
  code: 200,
  data: {
    offset: 0,
    limit: 100,
    total: 1493,
    count: 100,
    results: [
      {
        id: 1011334,
        name: "3-D Man",
        description: "",
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
          extension: "jpg",
        },
        comics: { available: 12 },
        series: { available: 3 },
        stories: { available: 21 },
        events: { available: 1 },
        urls: [
          { type: "detail", url: "url1" },
          { type: "wiki", url: "url2" },
        ],
      },
    ],
  },
};

describe("Home Page", () => {
  test("should render properly when loading data", () => {
    (useCharactersApi as any).mockReturnValue({ loading: true });
    mount(<Home />);
    const props = (View as any).mock.calls.pop()[0];
    expect(props.loading).toBeTruthy();
    expect(props.error).toBeUndefined();
    expect(props.hasMore).toBeFalsy();
    expect(props.characters).toHaveLength(0);
  });

  test("should render HasMore when there is more data", () => {
    (useCharactersApi as any).mockReturnValue({
      loading: false,
      value: mockData.data,
    });
    mount(<Home />);
    const props = (View as any).mock.calls.pop()[0];
    expect(props.loading).toBeFalsy();
    expect(props.error).toBeUndefined();
    expect(props.hasMore).toBeTruthy();
    expect(props.characters).toHaveLength(1);
  });

  test("should render Error when fetching data failed", () => {
    (useCharactersApi as any).mockReturnValue({
      loading: false,
      error: new Error(),
    });
    mount(<Home />);
    const props = (View as any).mock.calls.pop()[0];
    expect(props.loading).toBeFalsy();
    expect(props.error).toBeTruthy();
    expect(props.hasMore).toBeFalsy();
    expect(props.characters).toHaveLength(0);
  });

  test("should call api when search filter changes", () => {
    (useCharactersApi as any).mockReturnValue({
      loading: false,
      value: mockData.data,
    });
    const wrapper = mount(<Home />);

    let props = (View as any).mock.calls.pop()[0];
    act(() => {
      props.onSearch("Hello");
    });
    wrapper.update();

    const lastCall = (useCharactersApi as any).mock.calls.pop();
    const [{ offset, limit }, filter] = lastCall;
    expect(offset).toBe(0);
    expect(limit).toBe(100);
    expect(filter).toBe("Hello");
  });

  test("should call api again when load more", () => {
    (useCharactersApi as any).mockReturnValue({
      loading: false,
      value: mockData.data,
    });
    const wrapper = mount(<Home />);

    const calls = (useCharactersApi as any).mock.calls.length;

    let props = (View as any).mock.calls.pop()[0];
    act(() => {
      props.loadMore();
    });
    wrapper.update();

    const newCalls = (useCharactersApi as any).mock.calls.length;
    expect(newCalls).toBe(calls + 1);
  });
});
