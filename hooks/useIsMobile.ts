import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
  const isClient = typeof window !== "undefined";

  const [isMobile, setIsMobile] = useState<boolean>(() => (isClient ? window.innerWidth < breakpoint : false));

  useEffect(() => {
    if (!isClient) return;

    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile("matches" in e ? e.matches : mq.matches);
    };

    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler as EventListener);
    } else {
      // @ts-ignore
      mq.addListener(handler);
    }

    setIsMobile(mq.matches);

    return () => {
      if ("removeEventListener" in mq) {
        mq.removeEventListener("change", handler as EventListener);
      } else {
        // @ts-ignore
        mq.removeListener(handler);
      }
    };
  }, [breakpoint, isClient]);

  return isMobile;
}