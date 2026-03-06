"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import enTranslations from "../../en.json";
import deTranslations from "../../de.json";

const translationsCache = {
  en: enTranslations,
  de: deTranslations
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [targetLang, setTargetLang] = useState("en");
  const [detectedLang, setDetectedLang] = useState("de");
  const [isReady, setIsReady] = useState(false);
  const [activeTranslations, setActiveTranslations] = useState(translationsCache);

  const loadLanguageTranslations = async (lang) => {
    if (activeTranslations[lang]) return activeTranslations[lang];

    try {
      // By putting these json files in /public, they act identically to images on a CDN
      // Prevents `output: export` static build crashing in Next.js from dynamic APIs
      const resp = await fetch(`/${lang}.json`);
      if (resp.ok) {
        const data = await resp.json();
        translationsCache[lang] = data;
        setActiveTranslations(prev => ({ ...prev, [lang]: data }));
        return data;
      }
    } catch (e) {
      console.error(`Failed to load ${lang}.json`, e);
    }
    return null;
  };

  useEffect(() => {
    const detectLanguage = async () => {
      // 1. Explicit User Preference
      const explicitLang = localStorage.getItem("ethereal_explicit_lang");
      if (explicitLang) {
        await loadLanguageTranslations(explicitLang); // Warm up cache
        return explicitLang;
      }

      // 2. Browser Language Priority
      const browserLang = typeof navigator !== "undefined" ? (navigator.language || navigator.userLanguage || "") : "";
      const shortLang = browserLang.split("-")[0];
      if (shortLang) {
          if (activeTranslations[shortLang] || await loadLanguageTranslations(shortLang)) {
            return shortLang;
          }
      }

      // 3. IP Detection Fallback
      try {
        const ipResponse = await fetch("https://ipapi.co/json/");
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          if (ipData && ipData.languages) {
            const primaryIpLang = ipData.languages.split(",")[0].split("-")[0];
            if (activeTranslations[primaryIpLang] || await loadLanguageTranslations(primaryIpLang)) {
              return primaryIpLang;
            }
          }
        }
      } catch (error) {
        console.warn("IP detection failed");
      }

      return "en";
    };

    const initLanguage = async () => {
      let lang = await detectLanguage();
      // Ensure it's loaded before we declare ready
      const data = await loadLanguageTranslations(lang);
      if(!data && !activeTranslations[lang]) {
        lang = "en"; // fallback completely
      }
      setTargetLang(lang);
      
      const browserLang = typeof navigator !== "undefined" ? (navigator.language || navigator.userLanguage || "") : "";
      const shortLang = browserLang.split("-")[0];
      setDetectedLang(shortLang && shortLang !== "en" ? shortLang : "de");
      
      setIsReady(true);
    };

    initLanguage();

    const handleLanguageChange = async () => {
      localStorage.removeItem("ethereal_explicit_lang");
      const lang = await detectLanguage();
      await loadLanguageTranslations(lang);
      setTargetLang(lang);
    };

    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, []);

  // Sync setTargetLang with actual fetching when explicitly set
  const changeLanguage = async (newLang) => {
    await loadLanguageTranslations(newLang);
    setTargetLang(newLang);
  };

  const t = (key, defaultText) => {
    if (!isReady) return defaultText;

    // Return exact match from current language
    if (activeTranslations[targetLang] && activeTranslations[targetLang][key] !== undefined) {
      return activeTranslations[targetLang][key];
    }
    
    // Fallback to English dictionary if target language is missing a key
    if (targetLang !== "en" && activeTranslations["en"] && activeTranslations["en"][key] !== undefined) {
      return activeTranslations["en"][key];
    }

    // Ultimate fallback
    return defaultText;
  };

  return (
    <LanguageContext.Provider value={{ targetLang, detectedLang, isReady, t, setTargetLang: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);

