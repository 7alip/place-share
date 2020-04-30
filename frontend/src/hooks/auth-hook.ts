import { useCallback, useEffect, useState } from "react";

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
  const [token, setToken] = useState<string | null>();
  const [
    tokenExpirationState,
    setTokenExpirationState,
  ] = useState<Date | null>();
  const [userId, setUserId] = useState<string | null>();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationState(tokenExpirationDate);

    console.log("typeof tokenExpirationDate", typeof tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationDate,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationState(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationState) {
      const remainingTime =
        new Date(tokenExpirationState).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationState]);

  useEffect(() => {
    const storedData: {
      userId: string;
      token: string;
      expiration: Date;
    } = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.expiration);
    }
  }, [login]);

  return { token, login, logout, userId };
};
