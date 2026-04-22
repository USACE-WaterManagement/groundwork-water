const KEYCLOAK_REALMS_SEGMENT = "/realms/";

export const normalizeKeycloakHost = (host: string) => {
  const trimmedHost = host.trim().replace(/\/$/, "");
  const realmsIndex = trimmedHost.indexOf(KEYCLOAK_REALMS_SEGMENT);

  if (realmsIndex >= 0) {
    return trimmedHost.slice(0, realmsIndex);
  }

  return trimmedHost;
};
