export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}

export const AUTH_STORAGE_KEY = 'blog-admin-auth';

export function setAuthUser(user: AuthUser): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}

export function getAuthUser(): AuthUser | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearAuthUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function isAuthenticated(): boolean {
  const user = getAuthUser();
  return user?.isAuthenticated ?? false;
}
