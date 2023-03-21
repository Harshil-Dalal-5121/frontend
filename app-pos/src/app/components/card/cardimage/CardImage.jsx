import React from "react";
import styles from "./CardImage.module.css";

const CardImage = ({ image }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className={styles.image}
    ></div>
  );
};

export default CardImage;
