import { FC, ReactText } from "react";
import { Box, Icon } from "@chakra-ui/react";
import CountryISO from "i18n-iso-countries";
import Flag from "react-country-flag";

CountryISO.registerLocale(require("i18n-iso-countries/langs/en.json"));

type CountryProps = {
  code: ReactText;
};

const Country: FC<CountryProps> = ({ code }) => {
  const country = CountryISO.getName(code, "en", { select: "official" });
  return (
    <Box as="span" display="inline-flex" lineHeight="none">
      <Icon as={Flag} countryCode={code} svg title={country} mr="2" />
      <Box as="span">{country}</Box>
    </Box>
  );
};

export default Country;
