import { useEffect, useRef, useState } from "react";

const useIntersection = () => {
  let isMounted = true;
  const ref = useRef<HTMLDivElement>();
  const [isRender, setRenderStatus] = useState(false);

  useEffect(() => {
    if (!process.browser || isRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            setRenderStatus(true);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      isMounted = false;
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isRender]);

  return {
    ref,
    isRender,
  };
};

export default useIntersection;
