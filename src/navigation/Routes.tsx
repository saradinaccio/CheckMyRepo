import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import constants from "../constants";
import { setIsOnline } from "../features/CheckUserRepoSlice";
import CheckRepo from "../pages/CheckRepo";
import CheckUser from "../pages/CheckUser";
import SetRepoAddress from "../pages/SetRepoAddress";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { AllDone } from "../pages/AllDone";

export const Navigation = () => {
    const isOnline = useAppSelector((state) => state.checkRepo.isOnline);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      const handleStatusChange = () => {
        dispatch(setIsOnline(navigator.onLine));
      };
  
      window.addEventListener("online", handleStatusChange);
  
      window.addEventListener("offline", handleStatusChange);
  
      return () => {
        window.removeEventListener("online", handleStatusChange);
        window.removeEventListener("offline", handleStatusChange);
      };
    }, [dispatch, isOnline]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path={constants.routes.setRepoAddress}
          element={<SetRepoAddress />}
        />
        <Route path={constants.routes.checkUser} element={<CheckUser />} />
        <Route
          path={constants.routes.checkRepository}
          element={<CheckRepo />}
        />
         <Route
          path={constants.routes.allDone}
          element={<AllDone />}
        />
      </Routes>
    </HashRouter>
  );
};
