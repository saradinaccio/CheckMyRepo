import { Button, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back.png";

interface Props {
  showBackButton: boolean;
  title: string;
}

const Header = ({ showBackButton, title }: Props) => {
  const navigate = useNavigate();

  return (
    <Row>
      {showBackButton && (
        <Button
          icon={<Image src={back} />}
          onClick={() => navigate(-1)}
        />
      )}
      <Title level={2} >
        {title}
      </Title>
    </Row>
  );
};

export default Header;
