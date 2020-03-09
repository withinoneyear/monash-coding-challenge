import React from "react";
import styles from "./Character.module.scss";
import { Character } from "../../apiHooks/marvelCharacter";

interface CharacterProps {
  value: Character;
}

export default (props: CharacterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cover}></div>
      <img
        alt="thumb"
        className={styles.thumb}
        src={props.value.thumbnail.path + "." + props.value.thumbnail.extension}
      />
      <div className={styles.details}>
        <div className={styles.detailsText}>
          <div className={styles.title}>{props.value.name}</div>
        </div>
      </div>
    </div>
  );
};
