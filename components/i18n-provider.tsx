"use client";

import React from "react";
import i18next, { i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../public/locales/en/common.json";
import taCommon from "../public/locales/ta/common.json";

let initialized = false;

function initI18n(): I18nInstance {
  if (!initialized) {
    i18next.use(initReactI18next).init({
      lng: "en",
      fallbackLng: "en",
      supportedLngs: ["en", "ta"],
      defaultNS: "common",
      ns: ["common"],
      resources: {
        en: { common: enCommon as any },
        ta: { common: taCommon as any },
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
    initialized = true;
  }
  return i18next;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    initI18n();
  }, []);
  return <>{children}</>;
}
