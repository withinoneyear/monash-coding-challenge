import React from "react";
import cn from "classnames";
import { Character } from "../../apiHooks/marvelCharacterTypes";
import Loading from "../../components/Loading";
import Characters from "../../components/Characters";
import SearchBox from "../../components/SearchBox";
import styles from "./View.module.scss";
import logo from "../../images/logo.svg";

interface IHomeViewProps {
  loading: boolean;
  hasMore?: boolean;
  error?: Error;
  characters?: Character[];
  onSearch: (filter: string) => void;
  loadMore: React.ReactEventHandler;
}

export default (props: IHomeViewProps) => (
  <div className={styles.main}>
    {props.loading && <Loading />}

    <header className={styles.header}>
      <p className={styles.title}>Characters</p>
      <SearchBox onChange={props.onSearch} />
      <img src={logo} className={styles.logo} alt="logo" />
    </header>

    <div className={styles.body}>
      {/* Character list */}
      {props.characters && <Characters list={props.characters} />}

      {/* Load More */}
      {props.hasMore && (
        <div
          className={cn(styles.loadMore, styles.infoBar, {
            loading: props.loading,
          })}
          onClick={props.loadMore}
          data-testId="load-more-bar"
        >
          Load More...
        </div>
      )}

      {/* Not Found */}
      {!props.loading &&
        !props.error &&
        (!props.characters || !props.characters.length) && (
          <div className={styles.infoBar} data-testId="not-found-bar">
            Not Found
          </div>
        )}

      {/* Error */}
      {props.error && (
        <div className={cn(styles.infoBar, styles.error)}>Fetching failed!</div>
      )}
    </div>
  </div>
);
