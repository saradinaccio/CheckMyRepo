import React from "react";
import { Button } from "antd";

interface Props {
  loading?: boolean;
  onClick?: () => void;
  title: string;
}

export const MyButton = ({ loading, onClick, title }: Props) => {
  return (
    <Button onClick={onClick} type="text">
      {loading ? "LOADING..." : title}
    </Button>
  );
};
