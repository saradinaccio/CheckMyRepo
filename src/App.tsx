import React from "react";
import "./App.css";

import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./store";
import { Navigation } from "./navigation/Routes";

function App() {


  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
}

export default App;
