"use client";

import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPostBoxOpened = useAppSelector(
    (state) => state.userPost.isPostBoxShown
  );
  const isCommentBoxOpened = useAppSelector(
    (state) => state.userComment.isCommentBoxShown
  );
  useEffect(() => {
    if (isPostBoxOpened || isCommentBoxOpened) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isCommentBoxOpened, isPostBoxOpened]);
  return <>{children}</>;
}
