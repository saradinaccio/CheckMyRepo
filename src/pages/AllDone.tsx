import Title from "antd/es/typography/Title";
import React from "react";
import { MyButton } from "../components/Button";
import '../App.css'

export const AllDone = () => {
  return (
    <div className="allDone">
      <Title>All Done!</Title>
      <Title>Repository sent.</Title>
      <MyButton title='COOL'></MyButton>
    </div>
  );
};
