"use client"

import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

export function useDebounce(effect, dependencies, delay) {
  const callbackDependencies = useMemo(() => dependencies, [dependencies]);
  const callback = useCallback(effect, callbackDependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}