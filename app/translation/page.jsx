"use client";

import React, { useState } from "react";
import CommonLayout from "../components/common/CommonLayout";
import { useLanguage } from "../context/LanguageContext";

const languages = [
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ny", name: "Chichewa" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "ko", name: "Korean" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "or", name: "Odia (Oriya)" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "tk", name: "Turkmen" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
];

export default function TranslationDeveloperPage() {
  const { setTargetLang } = useLanguage();
  const [selectedLang, setSelectedLang] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [progressStatus, setProgressStatus] = useState("");
  const [generatedLanguages, setGeneratedLanguages] = useState([]);
  const [isFetchingLanguages, setIsFetchingLanguages] = useState(true);

  React.useEffect(() => {
    // Fetch the list of already generated languages on mount
    fetch(`/api/generated-languages/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.generatedLanguages) {
          setGeneratedLanguages(data.generatedLanguages);
        }
      })
      .catch((err) =>
        console.error("Could not fetch generated languages:", err),
      )
      .finally(() => setIsFetchingLanguages(false));
  }, []);

  const handleTranslate = async () => {
    setIsTranslating(true);
    setProgressStatus(
      `Started connecting to Google Translate API for ${selectedLang}.json This will take a few minutes as it iterates over all keys.`,
    );

    try {
      const response = await fetch("/api/generate-translation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetLang: selectedLang }),
      });

      const rawText = await response.text();
      let data = {};
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        throw new Error(
          `Server crashed or returned HTML. Check Next.js terminal logs. Preview: ${rawText.slice(0, 50)}...`,
        );
      }

      if (response.ok) {
        setProgressStatus(
          `✅ Success! Translations saved permanently to both /${selectedLang}.json and /public/${selectedLang}.json. You can now test it on the site.`,
        );
        // Add to generated languages to immediately disable
        if (!generatedLanguages.includes(selectedLang)) {
          setGeneratedLanguages([...generatedLanguages, selectedLang]);
        }
      } else {
        setProgressStatus(
          `❌ Error: ${data.error || "Failed to generate translations"}`,
        );
      }
    } catch (error) {
      setProgressStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleApplyLanguage = () => {
    localStorage.setItem("ethereal_explicit_lang", selectedLang);
    setTargetLang(selectedLang);
    window.location.href = "/";
  };

  const isAlreadyGenerated = generatedLanguages.includes(selectedLang);

  return (
    <div
      page="Translation Tools"
      className="min-h-screen bg-[#121212] w-full flex items-center justify-center relative px-4"
    >
      <div className="bg-[#121212] border border-[#ffffff1a] rounded-[32px] p-8 md:p-12 max-w-xl w-full flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D9FF00] to-transparent" />

        <h1 className="text-white text-3xl font-antonio font-bold mb-2 tracking-wide">
          Developer Translation Tool
        </h1>
        <p className="text-white/60 mb-8 font-light text-[13px] font-antonio tracking-widest leading-relaxed">
          Automatically duplicate and translate all key-value pairs from{" "}
          <span className="text-[#D9FF00] font-bold">en.json</span> into a new
          language file.
        </p>

        <label className="text-white font-antonio mb-2 tracking-wider text-sm flex items-center gap-2">
          SELECT TARGET LANGUAGE
        </label>
        <select
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value);
            setProgressStatus(""); // clear previous statuses when switching
          }}
          disabled={isTranslating}
          className="w-full bg-[#1A1A1A] border border-[#ffffff33] text-white p-4 rounded-xl mb-8 outline-none focus:border-[#D9FF00] transition-colors appearance-none font-antonio text-lg"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name} ({lang.code}){" "}
              {generatedLanguages.includes(lang.code) ? "✓ (Generated)" : ""}
            </option>
          ))}
        </select>

        {isFetchingLanguages ? (
          <div className="w-full py-4 rounded-xl font-antonio font-bold text-center text-sm md:text-base tracking-widest uppercase bg-[#ffffff1a] text-white/40 border border-[#ffffff1a] animate-pulse">
            Loading Languages...
          </div>
        ) : (
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className={`w-full py-4 rounded-xl font-antonio font-bold text-lg tracking-widest transition-all uppercase ${isTranslating ? "bg-[#ffffff1a] text-white/40 cursor-not-allowed" : "bg-[#D9FF00] text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(217,255,0,0.3)]"}`}
          >
            {isTranslating ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Translating... Do not close
              </span>
            ) : (
              "Generate Translation File"
            )}
          </button>
        )}

        {progressStatus && (
          <div
            className={`mt-6 p-5 rounded-xl border ${progressStatus.includes("✅") ? "bg-green-900/20 border-green-500/50 text-green-300" : progressStatus.includes("❌") ? "bg-red-900/20 border-red-500/50 text-red-300" : "bg-[#D9FF00]/10 border-[#D9FF00]/40 text-[#D9FF00]"} text-sm leading-relaxed font-antonio tracking-wider`}
          >
            {progressStatus}
          </div>
        )}

        {progressStatus.includes("✅") && (
          <button
            onClick={handleApplyLanguage}
            className="mt-6 w-full py-4 bg-transparent border border-[#wite]/30 text-white rounded-xl font-antonio font-bold tracking-widest uppercase hover:bg-white/5 transition-colors"
          >
            Switch to {languages.find((l) => l.code === selectedLang)?.name}
          </button>
        )}
      </div>
    </div>
  );
}
