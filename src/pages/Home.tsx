import React, { useState, useCallback, useEffect } from "react";
import cn from "classnames";
import styles from "./Home.module.scss";
import logo from "../images/logo.svg";
import Characters from "../components/Characters";
import SearchBox from "../components/SearchBox";
import { useCharactersApi } from "../apiHooks/marvelHooks";
import { Character } from "../apiHooks/marvelCharacter";
import Loading from "../components/Loading";

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
    <div className={styles.main}>
      {state.loading && <Loading />}

      <header className={styles.header}>
        <p className={styles.title}>Characters</p>
        <SearchBox onChange={onSearch} />
        <img src={logo} className={styles.logo} alt="logo" />
      </header>
      <div className={styles.body}>
        {characters && <Characters list={characters} />}
        {hasMore && (
          <div
            className={cn(styles.loadMore, styles.infoBar, {
              loading: state.loading,
            })}
            onClick={loadMore}
          >
            Load More...
          </div>
        )}
        {!state.loading &&
          !state.error &&
          (!characters || !characters.length) && (
            <div className={styles.infoBar}>Not Found</div>
          )}
        {state.error && (
          <div className={cn(styles.infoBar, styles.error)}>
            Fetching failed!
          </div>
        )}
      </div>
    </div>
  );
};
