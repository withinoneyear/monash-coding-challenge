import React, { useState } from "react";
import { useDebounce } from "react-use";
import { ReactComponent as Search } from "../images/search.svg";
import styles from "./SearchBox.module.scss";

interface SearchBoxProps {
  onChange: (filter: string) => void;
}

export default (props: SearchBoxProps) => {
  const [val, setVal] = useState();
  useDebounce(
    () => {
      if (props.onChange) props.onChange(val);
    },
    200,
    [val]
  );
  return (
    <div className={styles.searchBox}>
      <Search />
      <input type="text" onChange={e => setVal(e.currentTarget.value)} />
    </div>
  );
};
