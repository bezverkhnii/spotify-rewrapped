import React from "react";
import styles from "./BlurLight.module.css";

interface IDirections {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

const BlurLight = ({ top, left, right, bottom }: IDirections) => {
  return (
    <div
      className={styles.container}
      style={{ left: left, right: right, top: top, bottom: bottom }}
    />
  );
};

export default BlurLight;
