import { Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { AxiosResponse } from "axios";
import constants from "../constants";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import {
  setRepository,
  setStatusCodeRepo,
} from "../features/CheckUserRepoSlice";
import Text from "antd/es/typography/Text";
import Header from "../components/Header";
import { MyButton } from "../components/Button";

const CheckRepo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.checkRepo.username);
  const repository = useAppSelector((state) => state.checkRepo.repository);
  const isOnline = useAppSelector((state) => state.checkRepo.isOnline);
  const [loading, setLoading] = useState(false);

  const checkRepo = () => {
    if (!isOnline) {
      navigate(-1);
    }
    setLoading(true);
    apiService
      .checkRepository(username, repository)
      .then((res) => {
        dispatch(setStatusCodeRepo(res.status));
        navigate(constants.routes.setRepoAddress);
      })
      .catch((error: { response: AxiosResponse }) => {
        if (error.response.status === 404) {
          dispatch(setStatusCodeRepo(error.response.status));
          navigate(constants.routes.setRepoAddress);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="container">
      <Header showBackButton={true} title={"REPOSITORY"}></Header>
      {username === "" ? (
        <Text type="danger" style={{ marginTop: 20 }}>
          Inserire username
        </Text>
      ) : (
        <>
          <Input
            style={{ marginTop: 20 }}
            placeholder="Type your repository name"
            onChange={(e) => dispatch(setRepository(e.target.value))}
          />
          <MyButton title="DONE" loading={loading} onClick={checkRepo}></MyButton>
        </>
      )}
    </div>
  );
};

export default CheckRepo;
