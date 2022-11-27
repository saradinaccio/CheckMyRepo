import { Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { AxiosResponse } from "axios";
import constants from "../constants";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import "../App.css";
import {
  setRepository,
  setStatusCodeRepo,
  setStatusCodeUsername,
  setUsername,
} from "../features/CheckUserRepoSlice";
import Header from "../components/Header";
import { MyButton } from "../components/Button";

const CheckUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.checkRepo.username);
  const isOnline = useAppSelector((state) => state.checkRepo.isOnline);
  const [loading, setLoading] = useState(false);

  const checkUser = () => {
    if (!isOnline) {
      navigate(-1);
    }
    setLoading(true);

    apiService
      .checkUsername(username)
      .then((res) => {
        dispatch(setStatusCodeUsername(res.status));
        navigate(constants.routes.setRepoAddress);
      })
      .catch((error: { response: AxiosResponse }) => {
        if (error.response.status === 404) {
          dispatch(setStatusCodeUsername(error.response.status));
          navigate(constants.routes.setRepoAddress);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="container">
      <Header showBackButton={true} title={"USER"}></Header>
      <Input
        placeholder="Type your github username"
        onChange={(e) => {
          dispatch(setUsername(e.target.value));
          dispatch(setRepository(""));
          dispatch(setStatusCodeRepo(constants.statusCodes.default));
        }}
      />
      <MyButton title="DONE" loading={loading} onClick={checkUser}></MyButton>
    </div>
  );
};

export default CheckUser;
