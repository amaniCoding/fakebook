"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import React from "react";
import Body from "./ui/home/body";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Body>{children}</Body>
    </Provider>
  );
}
