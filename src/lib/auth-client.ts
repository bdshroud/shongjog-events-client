import { createAuthClient } from "better-auth/react";

// Clean and sanitize BetterAuth Base URL (prevents double-slash routing errors and cross-origin fetch drops)
const getAuthBaseUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL;

  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  // If in browser and env var is not explicitly set, use same origin with Next.js rewrites
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:5000";
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseUrl(),
});

export const { useSession, signIn, signOut, signUp, updateUser } = authClient;
