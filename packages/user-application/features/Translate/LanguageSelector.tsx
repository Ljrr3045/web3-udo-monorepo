import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { COOKIE_NAME } from "../../utils/Constants";

/* Top Declarations */
interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

/* Component */
export const LanguageSelector = () => {
  const [usedLanguage, setUsedLanguage] = useState<string>();
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

/* Internal functions */
  const switchLanguage = (lang: string) => () => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang)
    window.location.reload();
  };

  const handleLanguageChange = () => {
    if (currentLanguage === "en" || currentLanguage === "auto"){
      switchLanguage("es")();
    } else {
      switchLanguage("en")();
    }
  };

/* Effects */
  useEffect(() => {
    if (currentLanguage === "en" || currentLanguage === "auto"){
      setUsedLanguage("EN");
    } else {
      setUsedLanguage("ES");
    }
  }, [currentLanguage]);

  useEffect(() => {
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    if (languageValue) {
      setCurrentLanguage(languageValue);
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

/* Validations */
  if (!currentLanguage || !languageConfig) {
    return null;
  }

  return (
    <div
      className="border-2 border-white rounded-xl px-10 py-2 cursor-pointer select-none"
      onClick={handleLanguageChange}
    >
      <p className="text-base font-bold text-white">
        {usedLanguage}
      </p>
    </div>
  );
};

