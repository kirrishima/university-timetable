
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

    mq.addEventListener("change", handler as EventListener);
    
    // Initial check
    handler(mq);

    return () => {
      mq.removeEventListener("change", handler as EventListener);
    };
  }, [breakpoint, isClient]);

  return isMobile;
}
