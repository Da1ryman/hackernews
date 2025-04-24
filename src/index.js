import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { MainPage } from "./screen/main/MainPage";
import { store } from "./store/store";
import { NewsPage } from "./screen/news/NewsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news/:id" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
