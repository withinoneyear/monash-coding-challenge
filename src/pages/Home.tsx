import React, { useState, useCallback, useEffect } from "react";
import cn from "classnames";
import styles from "./Home.module.scss";
import logo from "../logo.svg";
import Characters from "../components/Characters";
import SearchBox from "../components/SearchBox";
import { useCharactersApi } from "../apiHooks/marvelHooks";
import { Character } from "../apiHooks/marvelCharacter";
import Loading from "../components/Loading";

export default () => {
  const limit = 100;
  const [offset, setOffset] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState();
  const state = useCharactersApi({ offset, limit }, filter, []);

  useEffect(() => {
    if (!state.loading && state.value) {
      setOffset(state.value.offset);
      if (state.value.offset === 0) {
        setCharacters(state.value.results);
      } else {
        setCharacters([...characters, ...state.value.results]);
      }
    }
  }, [characters, state.loading, state.value]);

  const onSearch = useCallback(
    txt => {
      setFilter(txt);
      setOffset(0);
    },
    [setFilter, setOffset]
  );

  const hasMore = state.value && state.value.total > state.value.offset;

  return (
    <div className={styles.main}>
      {state.loading && <Loading />}

      <header className={styles.header}>
        <p className={styles.title}>Characters</p>
        <SearchBox onChange={onSearch} />
        <img src={logo} className="logo" alt="logo" />
      </header>
      {characters && <Characters list={characters} />}
      {hasMore && (
        <div
          className={cn(styles.loadMore, { loading: state.loading })}
          onClick={() => {}}
        >
          Load More...
        </div>
      )}
    </div>
  );
};
