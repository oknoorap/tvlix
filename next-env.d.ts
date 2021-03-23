/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.svg?sprite" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.m3u" {
  const content: string;
  export default content;
}
