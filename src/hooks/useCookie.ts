import { useCallback, useState } from "react";
import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

const useCookie = () => {
  // Cookie qiymatini olish
  const getCookie = useCallback((name: string): string | undefined => {
    return Cookies.get(name);
  }, []);

  // Cookie qiymatini o'rnatish
  const setCookie = useCallback(
    (name: string, value: string, options: CookieOptions = {}) => {
      const defaultOptions: CookieOptions = {
        expires: 7, // 7 kun default muddat
        secure: true, // HTTPS orqali yuboriladi
        sameSite: "Strict", // CSRF himoyasi
        ...options,
      };
      Cookies.set(name, value, defaultOptions);
    },
    []
  );

  // Cookie'ni o'chirish
  const removeCookie = useCallback((name: string) => {
    Cookies.remove(name);
  }, []);

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
};

export default useCookie;
