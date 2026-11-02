"use client";

import * as React from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/axios";

interface AuthSyncContextType {
  isPending: boolean;
  isJwtReady: boolean;
  session: ReturnType<typeof authClient.useSession>["data"];
  refetchJwt: () => Promise<void>;
}

const AuthSyncContext = React.createContext<AuthSyncContextType>({
  isPending: true,
  isJwtReady: false,
  session: null,
  refetchJwt: async () => {},
});

export function JwtSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [isJwtReady, setIsJwtReady] = React.useState(false);

  const syncJwt = React.useCallback(async () => {
    if (isPending) return;

    if (!session?.user?.email) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
      setIsJwtReady(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/jwt`, {
        email: session.user.email,
        name: session.user.name || session.user.email.split("@")[0],
        image: session.user.image,
      });

      if (response.data?.token && typeof window !== "undefined") {
        localStorage.setItem("access_token", response.data.token);
      }
    } catch (error) {
      console.error("[JwtSync] Failed to exchange JWT with backend:", error);
    } finally {
      setIsJwtReady(true);
    }
  }, [session, isPending]);

  React.useEffect(() => {
    syncJwt();
  }, [syncJwt]);

  return (
    <AuthSyncContext.Provider
      value={{
        isPending,
        isJwtReady,
        session,
        refetchJwt: syncJwt,
      }}
    >
      {children}
    </AuthSyncContext.Provider>
  );
}

export function useAuthSync() {
  return React.useContext(AuthSyncContext);
}
