import { FC, ReactText } from "react";
import CountryISO from "i18n-iso-countries";
import Flag from "react-country-flag";

CountryISO.registerLocale(require("i18n-iso-countries/langs/en.json"));

type CountryProps = {
  code: ReactText;
};

const Country: FC<CountryProps> = ({ code }) => {
  const country = CountryISO.getName(code, "en", { select: "official" });
  return (
    <span className="inline-flex leading-none">
      <Flag countryCode={code} svg title={country} className="mr-2" />
      <span>{country}</span>
    </span>
  );
};

export default Country;
