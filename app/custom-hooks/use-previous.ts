"use client";
import { useEffect, useRef } from "react";

export default function usePrevious(value: number) {
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
