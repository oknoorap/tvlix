import { FC, useRef, useState, useEffect } from "react";
import { Image as ChakraImage, ImageProps } from "@chakra-ui/react";

type ChannelLogoProps = ImageProps & {
  src: string;
  alt: string;
};

const blankPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const ChannelExplorerLogo: FC<ChannelLogoProps> = ({
  src,
  alt = "",
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>();
  const [isLoaded, setLoadStatus] = useState(false);
  const imgPlaceholder = require("../../../public/assets/images/channel.png?url");

  useEffect(() => {
    if (!process.browser || isLoaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              if (imgRef.current) {
                imgRef.current.setAttribute("src", src);
                setLoadStatus(true);
              }
            };
            img.onerror = () => {
              if (imgRef.current) {
                imgRef.current.setAttribute("src", imgPlaceholder);
                setLoadStatus(true);
              }
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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [isLoaded]);

  return (
    <ChakraImage
      {...props}
      ref={imgRef}
      src={blankPixel}
      fallbackSrc={blankPixel}
      w="full"
      h="auto"
      minH="full"
      maxH="32"
      alt={alt}
    />
  );
};

export default ChannelExplorerLogo;
