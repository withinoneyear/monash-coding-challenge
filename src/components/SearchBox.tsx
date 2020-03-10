import React, { useState } from "react";
import { useDebounce } from "react-use";
import { ReactComponent as Search } from "../images/search.svg";
import styles from "./SearchBox.module.scss";

export interface SearchBoxProps {
  onChange: (filter: string) => void;
  debounceMs?: number;
}

export default (props: SearchBoxProps) => {
  const [val, setVal] = useState();
  useDebounce(
    () => {
      if (props.onChange) props.onChange(val);
    },
    props.debounceMs || 200,
    [val]
  );
  return (
    <div className={styles.searchBox}>
      <Search />
      <input
        type="text"
        data-testid="search-input"
        onChange={e => setVal(e.currentTarget.value)}
      />
    </div>
  );
};
