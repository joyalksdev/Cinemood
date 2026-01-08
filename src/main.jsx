import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { WatchlistProvider } from "./context/WatchlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

