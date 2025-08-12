import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { safeWindow } from "@/utils/ssrHelpers";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    safeWindow.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;