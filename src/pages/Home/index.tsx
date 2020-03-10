import React, { useState, useCallback, useEffect } from "react";
import { useCharactersApi } from "../../apiHooks/marvelHooks";
import { Character } from "../../apiHooks/marvelCharacterTypes";
import View from "./View";

export default () => {
  const limit = 100;
  const [lastOffset, setLastOffset] = useState(0);
  const [lastCount, setLastCount] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState();
  const state = useCharactersApi({ offset: lastOffset, limit }, filter, []);

  useEffect(() => {
    if (!state.loading && state.value) {
      setLastCount(state.value.count);
      if (state.value.offset === 0) {
        setCharacters(state.value.results);
      } else {
        setCharacters([...characters, ...state.value.results]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading, state.value]);

  const onSearch = useCallback(
    txt => {
      setFilter(txt);
      setLastOffset(0);
      setCharacters([]);
    },
    [setFilter, setLastOffset]
  );

  const loadMore = useCallback(() => {
    setLastOffset(lastCount + lastOffset);
  }, [lastCount, lastOffset]);

  const hasMore = state.value && state.value.count >= state.value.limit;

  return (
    <View
      loading={state.loading}
      error={state.error}
      hasMore={hasMore}
      characters={characters}
      onSearch={onSearch}
      loadMore={loadMore}
    />
  );
};
