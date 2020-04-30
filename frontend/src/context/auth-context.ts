import { createContext } from "react";

export interface AuthContextProps {
  isLoggedIn: boolean;
  userId?: string | null;
  token?: string | null;
  login: (uid: string | null, token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
