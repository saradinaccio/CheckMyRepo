import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../constants";
import { Button, Typography } from "antd";
import { useAppSelector } from "../store";
import "../App.css";
import Header from "../components/Header";
import ApiService from "../services/apiService";
import { MyButton } from "../components/Button";

const { Title } = Typography;

const SetRepoAddress = () => {
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState(
    constants.colors.default
  );
  const statusCodeUsername = useAppSelector(
    (state) => state.checkRepo.statusCodeUsername
  );
  const statusCodeRepo = useAppSelector(
    (state) => state.checkRepo.statusCodeRepo
  );
  const username = useAppSelector((state) => state.checkRepo.username);
  const repository = useAppSelector((state) => state.checkRepo.repository);
  const isOnline = useAppSelector((state) => state.checkRepo.isOnline);

  const [showSendButton, setShowSendButton] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setBackgroundColor(constants.colors.default);
    }
    if (
      statusCodeUsername === constants.statusCodes.notFound ||
      statusCodeRepo === constants.statusCodes.notFound ||
      !isOnline
    ) {
      setBackgroundColor(constants.colors.errorBackground);
    } else if (
      statusCodeUsername === constants.statusCodes.success &&
      statusCodeRepo === constants.statusCodes.success
    ) {
      setBackgroundColor(constants.colors.successBackground);
      setShowSendButton(true);
    }
  }, [statusCodeUsername, statusCodeRepo, isOnline]);

  const sendRepo = () => {
    ApiService.sendRepositoryUrl(username, repository)
      .then((res) => {
        if (res.status === constants.statusCodes.success && res.data === "OK") {
          navigate(constants.routes.allDone);
        } else {
          setShowErrorMessage(true);
        }
      })
      .catch(() => {
        setShowErrorMessage(true);
      });
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
      }}
      className="appContainer"
    >
      <Header
        showBackButton={false}
        title={"Set the repository address"}
      ></Header>
      <Title level={1}>github.com</Title>
      <Title>
        /
        <Button
          type="link"
          onClick={() => navigate(constants.routes.checkUser)}
        >
          {username && statusCodeUsername === 200
            ? username
            : statusCodeUsername === 404
            ? "badUser"
            : "user"}
        </Button>
      </Title>
      <Title>
        /
        <Button
          type="link"
          onClick={() => navigate(constants.routes.checkRepository)}
        >
          {repository && statusCodeRepo === 200
            ? repository
            : statusCodeRepo === 404
            ? "badRepo"
            : "repo"}
        </Button>
      </Title>
      {statusCodeUsername === 404 && (
        <p style={{ marginTop: 20 }}>
          Check your <span className="errorMessage">username</span>
        </p>
      )}

      {statusCodeRepo === 404 && (
        <p style={{ marginTop: 20 }}>
          Check your <span className="errorMessage">repository</span>
        </p>
      )}

      {!isOnline && (
        <p>
          Check your <span className="errorMessage">internet connection</span>
        </p>
      )}

      {showErrorMessage && (
        <p>
          The message
          <span className="errorMessage">was not sent successfully</span>
        </p>
      )}

      {showSendButton && <MyButton title="SEND" onClick={sendRepo}></MyButton>}
    </div>
  );
};

export default SetRepoAddress;
