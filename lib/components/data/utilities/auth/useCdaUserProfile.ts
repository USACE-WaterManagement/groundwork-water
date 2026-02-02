import { useQuery } from "@tanstack/react-query";

export interface CdaRoles {
  [office: string]: string[];
}

interface CdaUserProfileRaw {
  "user-name": string;
  principal: string;
  "cac-auth": boolean;
  roles: CdaRoles;
}

export interface CdaUserProfile {
  userName: string;
  principal: string;
  cacAuth: boolean;
  roles: CdaRoles;
}

const fetchCdaUserProfile = async (
  cdaUrl?: string,
  token?: string,
): Promise<CdaUserProfile> => {
  const res = await fetch(`${cdaUrl}/user/profile`, {
    credentials: "include",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 401) return Promise.reject("Unauthorized");
    throw new Error("Failed to load profile");
  }

  const profileRaw: CdaUserProfileRaw = await res.json();
  return {
    userName: profileRaw["user-name"],
    principal: profileRaw.principal,
    cacAuth: profileRaw["cac-auth"],
    roles: profileRaw.roles,
  };
};

export const useCdaUserProfile = (isAuth: boolean, cdaUrl?: string, token?: string) => {
  return useQuery({
    queryKey: ["auth", "profile", cdaUrl, token ?? "cookie"],
    queryFn: async () => {
      if (!cdaUrl) {
        throw new Error("No cdaUrl has been provided");
      }
      return fetchCdaUserProfile(cdaUrl, token);
    },
    enabled: !!cdaUrl && !!isAuth,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
