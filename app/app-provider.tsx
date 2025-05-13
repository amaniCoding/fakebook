"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import React from "react";
import App from "./app";

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  );
}
