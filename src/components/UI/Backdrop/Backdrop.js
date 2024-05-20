import React from "react";
import classes from "./Backdrop.module.css";

export const Backdrop = ({ onClick }) => {
  const a = 0;
  return <div className={classes.Backdrop} onClick={onClick}></div>;
};
