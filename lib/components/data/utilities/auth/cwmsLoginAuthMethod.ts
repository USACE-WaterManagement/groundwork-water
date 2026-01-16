import { AuthMethod } from "./AuthProvider";

interface CwmsLoginConfig {
  authUrl: string;
  authCheckUrl: string;
  statusPollInterval?: number;
}

/**
 * Generates a CWMSLogin authentation method from the provided configuration.
 *
 * The authUrl should point to the root of the CWMSLogin servlet, e.g.
 * 'https://localhost:7000/CWMSLogin'.  The authCheckUrl will be used in a standard
 * GET request and will return true if it receives an 'ok' response.  The
 * CDA '/auth/keys' endpoint can be used for this purpose.
 *
 * @param {object} config - An object containing configuration details.
 * @param {string} config.authUrl - The URL of the auth provider.
 * @param {string} config.authCheckUrl - The URL of an endpoint to check auth status.
 * @returns A CWMSLogin-based auth method for use in an AuthProvider.
 */
export const createCwmsLoginAuthMethod = ({
  authUrl,
  authCheckUrl,
  statusPollInterval = 15,
}: CwmsLoginConfig) => {
  const cwmsLoginAuthMethod: AuthMethod = {
    refreshInterval: statusPollInterval,

    async login() {
      location.href =
        `${authUrl}/login?OriginalLocation=` + encodeURIComponent(location.href);
    },

    async logout() {
      location.href =
        `${authUrl}/logout?OriginalLocation=` + encodeURIComponent(location.href);
    },

    async isAuth() {
      const keysRequest = await fetch(authCheckUrl, {
        credentials: "include",
      });
      return keysRequest.ok;
    },
  };

  return cwmsLoginAuthMethod;
};
