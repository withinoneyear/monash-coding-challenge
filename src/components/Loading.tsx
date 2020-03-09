import React from "react";
import Spinner from "./Spinner";
import styles from "./Loading.module.scss";

export default () => (
  <div className={styles.loader}>
    <div className={styles.loaderBody}>
      <Spinner />
    </div>
  </div>
);
