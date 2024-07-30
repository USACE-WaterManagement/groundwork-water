import { Text } from "@usace/groundwork";

const NwpsApiLink = () => (
  <Text className="gw-my-2">
    For more information, see the{" "}
    <a href="https://api.water.noaa.gov/nwps/v1/docs/" className="gw-underline">
      NWPS API Documentation
    </a>
    .
  </Text>
);

export { NwpsApiLink };
export default NwpsApiLink;
