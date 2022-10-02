import countries from "assets/countries.json";

import { CountryComponentProps } from "./types";
import { FlagStyled, CountryContainer } from "./styled";

export const CountryComponent = (props: CountryComponentProps) => {
  const { name } = props;
  const countryCode = (countries as any)[name];
  return (
    <CountryContainer>
      <FlagStyled src={`https://countryflagsapi.com/svg/${countryCode}`} />
      {name}
    </CountryContainer>
  );
};
