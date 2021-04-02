import React from "react";
import { BookmarkIcon, PostIcon } from "../Icons";
import styles from "./Placeholder.module.css";

const Placeholder = ({ icon, title, text }) => {
  return (
    <div className={styles.Wrapper}>
      {icon === "bookmark" && <BookmarkIcon />}
      {icon === "post" && <PostIcon />}
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default Placeholder;
