import { useEffect, useState } from "react";

export const useHash = () => {
  const [hash, setHash] = useState(new URLSearchParams());
  useEffect(() => {
    setHash(new URLSearchParams(location.hash.substring(1)));
  }, []);
  return hash;
};
