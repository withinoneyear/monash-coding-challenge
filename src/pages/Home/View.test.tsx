import React from "react";
import { shallow } from "enzyme";
import View from "./View";
import Loading from "../../components/Loading";
import SearchBox from "../../components/SearchBox";
import Characters from "../../components/Characters";

describe("Home View", () => {
  test("should render properly", () => {
    const search = jest.fn();
    const wrapper = shallow(
      <View loading={false} onSearch={search} loadMore={jest.fn()} />
    );
    expect(wrapper.find("header")).toHaveLength(1);
    expect(wrapper.find(SearchBox).props().onChange).toBe(search);
  });

  test("should show Loading properly", () => {
    let wrapper = shallow(
      <View loading={false} onSearch={jest.fn()} loadMore={jest.fn()} />
    );
    expect(wrapper.find(Loading)).toHaveLength(0);

    wrapper = shallow(
      <View loading={true} onSearch={jest.fn()} loadMore={jest.fn()} />
    );
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  test("should show LoadMore properly", () => {
    const loadMore = jest.fn();
    let wrapper = shallow(
      <View
        loading={false}
        hasMore={false}
        onSearch={jest.fn()}
        loadMore={loadMore}
      />
    );
    expect(wrapper.find('[data-testId="load-more-bar"]')).toHaveLength(0);

    wrapper = shallow(
      <View
        loading={false}
        hasMore={true}
        onSearch={jest.fn()}
        loadMore={loadMore}
      />
    );
    expect(wrapper.find('[data-testId="load-more-bar"]')).toHaveLength(1);
    expect(wrapper.find('[data-testId="load-more-bar"]').props().onClick).toBe(
      loadMore
    );
  });

  test("should show NotFound properly", () => {
    const characters: any = [1, 2, 3];
    let wrapper = shallow(
      <View
        loading={false}
        characters={characters}
        onSearch={jest.fn()}
        loadMore={jest.fn()}
      />
    );
    expect(wrapper.find('[data-testId="not-found-bar"]')).toHaveLength(0);

    wrapper = shallow(
      <View
        loading={false}
        characters={[]}
        onSearch={jest.fn()}
        loadMore={jest.fn()}
      />
    );
    expect(wrapper.find('[data-testId="not-found-bar"]')).toHaveLength(1);

    wrapper = shallow(
      <View
        loading={false}
        characters={undefined}
        onSearch={jest.fn()}
        loadMore={jest.fn()}
      />
    );
    expect(wrapper.find('[data-testId="not-found-bar"]')).toHaveLength(1);
  });

  test("should show Error properly", () => {
    let wrapper = shallow(
      <View loading={false} onSearch={jest.fn()} loadMore={jest.fn()} />
    );
    expect(wrapper.find(".error")).toHaveLength(0);

    wrapper = shallow(
      <View
        loading={false}
        error={new Error()}
        onSearch={jest.fn()}
        loadMore={jest.fn()}
      />
    );
    expect(wrapper.find(".error")).toHaveLength(1);
  });

  test("should show characters properly", () => {
    const characters: any = [1, 2, 3];
    let wrapper = shallow(
      <View
        loading={false}
        characters={undefined}
        onSearch={jest.fn()}
        loadMore={jest.fn()}
      />
    );
    expect(wrapper.find(Characters)).toHaveLength(0);

    wrapper = shallow(
      <View
        loading={false}
        characters={characters}
        onSearch={jest.fn()}
        loadMore={jest.fn()}
      />
    );
    expect(wrapper.find(Characters).props().list).toEqual(characters);
  });
});
