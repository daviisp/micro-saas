"use client";

import { ReactNode, useEffect, useState } from "react";

type HydrateType = {
  children?: ReactNode;
};

const Hydrate = ({ children }: HydrateType) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <>{children}</> : <></>;
};
export default Hydrate;
