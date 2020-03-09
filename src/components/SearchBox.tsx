import React, { useState } from "react";
import { useDebounce } from "react-use";

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
    <div>
      <span>Search: </span>
      <input type="text" onChange={e => setVal(e.currentTarget.value)} />
    </div>
  );
};
