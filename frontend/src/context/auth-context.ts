import { createContext } from "react";

export interface AuthContextProps {
  isLoggedIn: boolean;
  userId?: string | null;
  login: (uid: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
