import { useRef, FC, useEffect, useState } from "react";

type ImageProps = {
  src?: string;
  placeholderSrc?: string;
  srcSet?: string;
  className?: any;
  width?: number;
  height?: number;
  alt: string;
  useStyle?: boolean;
  withInitialSize?: boolean;
  interaction?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
};

const ImageComponent: FC<ImageProps> = ({
  src,
  placeholderSrc,
  srcSet,
  className,
  alt,
  width,
  height,
  useStyle,
  withInitialSize,
  interaction = false,
  onHover = () => {},
  onLeave = () => {},
}) => {
  const ref = useRef<HTMLImageElement>();
  const [isLoaded, setLoadStatus] = useState(false);
  const additionalProps: any = {};
  if (withInitialSize) {
    additionalProps.width = width;
    additionalProps.height = height;
  }

  useEffect(() => {
    if (!process.browser || isLoaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image(width, height);
            ref.current.removeAttribute("style");

            if (width && width > 0) {
              if (!useStyle) {
                ref.current.width = width;
              } else {
                ref.current.style.width = `${width}px`;
              }
            }

            if (height && height > 0) {
              if (!useStyle) {
                ref.current.height = height;
              } else {
                ref.current.style.height = `${height}px`;
              }
            }

            img.src = src;
            img.onload = () => {
              if (!ref?.current) {
                return null;
              }
              ref.current.setAttribute("src", src);
              setLoadStatus(true);
            };
            img.onerror = () => {
              if (!ref?.current) {
                return null;
              }
              ref.current.setAttribute("src", placeholderSrc);
              setLoadStatus(true);
            };
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
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isLoaded]);

  return (
    <img
      ref={ref}
      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      srcSet={srcSet}
      alt={alt}
      {...additionalProps}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
      loading="lazy"
      // className={cx(
      //   {
      //     "pointer-events-none": !interaction,
      //   },
      //   className
      // )}
    />
  );
};

export default ImageComponent;
