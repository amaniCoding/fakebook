"use client";

import { useAppSelector } from "@/app/store/hooks";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPostBoxShown = useAppSelector(
    (state) => state.userPost.isPostBoxShown
  );

  const isCommentBoxShown = useAppSelector(
    (state) => state.userComment.isCommentBoxShown
  );
  return (
    <body
      className={`${inter.className} antialiased ${
        isPostBoxShown || isCommentBoxShown
          ? "overflow-hidden"
          : "overflow-auto"
      }`}
    >
      {children}
    </body>
  );
}
