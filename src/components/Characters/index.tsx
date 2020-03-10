import React from "react";
import Character from "./Character";
import styles from "./index.module.scss";
import { Character as CharacterType } from "../../apiHooks/marvelCharacterTypes";

interface CharactersProps {
  list: CharacterType[];
}

export default (props: CharactersProps) => {
  return (
    <div className={styles.container} data-testid="character-list">
      {props.list && props.list.map((x, i) => <Character key={i} value={x} />)}
    </div>
  );
};
