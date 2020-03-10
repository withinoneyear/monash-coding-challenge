import React from "react";
import styles from "./Character.module.scss";
import { Character } from "../../apiHooks/marvelCharacterTypes";

interface CharacterProps {
  value: Character;
}

export default (props: CharacterProps) => {
  const detailUrl = props.value.urls.find(x => x.type === "detail");
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <ul className={styles.summary}>
          <li>
            <b>{props.value.comics.available}</b> comics
          </li>
          <li>
            <b>{props.value.events.available}</b> events
          </li>
          <li>
            <b>{props.value.series.available}</b> series
          </li>
          <li>
            <b>{props.value.stories.available}</b> stories
          </li>
        </ul>
      </div>
      <a href={detailUrl?.url} target="_blank" rel="noopener noreferrer">
        <img
          alt="thumb"
          className={styles.thumb}
          src={
            props.value.thumbnail?.path + "." + props.value.thumbnail?.extension
          }
        />
      </a>
      <div className={styles.details}>
        <div className={styles.detailsText}>
          <div className={styles.title}>{props.value.name}</div>
        </div>
      </div>
    </div>
  );
};
