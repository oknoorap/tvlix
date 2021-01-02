import { sha256 } from "js-sha256";

export const hash = (string: string) =>
  sha256(string)
    .split("")
    .filter((_, index) => index % 2 === 0)
    .join("");
