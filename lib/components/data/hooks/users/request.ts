export interface CdaRequestOptions extends RequestInit {
  token?: string;
}

export const cdaRequest = async <T>(
  cdaUrl: string,
  path: string,
  { token, ...options }: CdaRequestOptions = {},
): Promise<T> => {
  // TODO: Replace this direct fetch with the cwmsjs users method once it is available.
  const response = await fetch(`${cdaUrl.replace(/\/$/, "")}${path}`, {
    credentials: token ? undefined : "include",
    ...options,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`.trim();
    try {
      const payload = await response.json();
      detail = payload.message ?? payload.detail ?? detail;
    } catch {
      // CDA gateways do not always return a JSON error body.
    }
    throw new Error(detail);
  }

  return (response.status === 204 ? undefined : await response.json()) as T;
};
