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

export default function SyncTranslationPage() {
  const { setTargetLang } = useLanguage();
  const [selectedLang, setSelectedLang] = useState("all");
  const [isSyncing, setIsSyncing] = useState(false);
  const [progressStatus, setProgressStatus] = useState("");
  const [syncedKeys, setSyncedKeys] = useState([]);
  const [detectedKeys, setDetectedKeys] = useState(null);
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

  const handleDetect = async () => {
    setIsSyncing(true);
    setSyncedKeys([]);
    setDetectedKeys(null);

    let langsToProcess =
      selectedLang === "all" ? generatedLanguages : [selectedLang];
    let aggregatedDetectedKeys = new Set();
    let hasError = false;
    let errorMsg = "";

    try {
      for (const lang of langsToProcess) {
        setProgressStatus(
          `Scanning en.json and ${lang}.json for missing or modified keys...`,
        );

        const response = await fetch("/api/sync-translation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLang: lang, dryRun: true }),
        });

        const rawText = await response.text();
        let data = {};
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          throw new Error("Crashed server response");
        }

        if (response.ok) {
          if (data.keysToTranslate) {
            data.keysToTranslate.forEach((k) => aggregatedDetectedKeys.add(k));
          }
        } else {
          hasError = true;
          errorMsg = data.error;
          break;
        }
      }

      if (hasError) {
        setProgressStatus(`❌ Error detecting changes: ${errorMsg}`);
      } else {
        setProgressStatus("");
        const keysArr = Array.from(aggregatedDetectedKeys);
        setDetectedKeys(keysArr);
      }
    } catch (error) {
      setProgressStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncedKeys([]);

    let langsToProcess =
      selectedLang === "all" ? generatedLanguages : [selectedLang];
    let aggregatedSyncedKeys = new Set();
    let hasError = false;
    let errorMsg = "";

    try {
      for (const lang of langsToProcess) {
        setProgressStatus(
          `Syncing ${detectedKeys ? detectedKeys.length : "missing"} keys to Google Translate API for ${lang}.json...`,
        );

        const response = await fetch("/api/sync-translation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetLang: lang }),
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
          if (data.translatedKeys && data.translatedKeys.length > 0) {
            data.translatedKeys.forEach((k) => aggregatedSyncedKeys.add(k));
          }
        } else {
          hasError = true;
          errorMsg = data.error;
          break;
        }
      }

      if (hasError) {
        setProgressStatus(
          `❌ Error: ${errorMsg || "Failed to sync translations"}`,
        );
      } else {
        const targetLabel =
          selectedLang === "all" ? "all languages" : `${selectedLang}.json`;
        setProgressStatus(
          `✅ Success! Translations synced permanently for ${targetLabel}.`,
        );
        const keysArr = Array.from(aggregatedSyncedKeys);
        if (keysArr.length > 0) {
          setSyncedKeys(keysArr);
        }
      }
    } catch (error) {
      setProgressStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleApplyLanguage = () => {
    localStorage.setItem("ethereal_explicit_lang", selectedLang);
    setTargetLang(selectedLang);
    window.location.href = "/";
  };

  return (
    <div
      page="Translation Sync"
      className="min-h-screen bg-[#121212] w-full flex items-center justify-center relative px-4"
    >
      <div className="bg-[#121212] border border-[#ffffff1a] rounded-[32px] p-8 md:p-12 max-w-xl w-full flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent" />

        <h1 className="text-white text-3xl font-antonio font-bold mb-2 tracking-wide">
          Sync Missing Translations
        </h1>
        <p className="text-white/60 mb-8 font-light text-[13px] font-antonio tracking-widest leading-relaxed">
          Fast incremental sync: Automatically scan{" "}
          <span className="text-[#00f2fe] font-bold">en.json</span> for new or
          missing keys and translate ONLY those parameters into the target
          language file.
        </p>

        <label className="text-white font-antonio mb-2 tracking-wider text-sm flex items-center gap-2">
          SELECT TARGET LANGUAGE TO SYNC
        </label>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          disabled={isSyncing || isFetchingLanguages}
          className="w-full bg-[#1A1A1A] border border-[#ffffff33] text-white p-4 rounded-xl mb-8 outline-none focus:border-[#00f2fe] transition-colors appearance-none font-antonio text-lg"
        >
          {isFetchingLanguages ? (
            <option value="all">Loading languages...</option>
          ) : (
            <>
              <option value="all">🌐 All Generated Languages</option>
              {languages
                .filter((lang) => generatedLanguages.includes(lang.code))
                .map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code}.json ({lang.name})
                  </option>
                ))}
            </>
          )}
        </select>

        {detectedKeys === null ? (
          <button
            onClick={handleDetect}
            disabled={isSyncing}
            className={`w-full py-4 rounded-xl font-antonio font-bold text-lg tracking-widest transition-all uppercase ${isSyncing ? "bg-[#ffffff1a] text-white/40 cursor-not-allowed" : "bg-[#00f2fe] text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,242,254,0.3)]"}`}
          >
            {isSyncing ? (
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
                Scanning Changes...
              </span>
            ) : (
              "Detect Changes & Missing Keys"
            )}
          </button>
        ) : detectedKeys.length === 0 ? (
          <div className="bg-green-900/20 border border-green-500/50 text-green-300 p-6 rounded-xl font-antonio text-center tracking-wider">
            ✅ All parameters for{" "}
            {selectedLang === "all"
              ? "all languages"
              : languages.find((l) => l.code === selectedLang)?.name}{" "}
            are already up to date!
            <button
              onClick={() => setDetectedKeys(null)}
              className="block mx-auto mt-4 py-2 px-6 border border-green-500/30 rounded-lg text-xs hover:bg-green-500/10 transition-colors uppercase"
            >
              Scan another language
            </button>
          </div>
        ) : (
          <div className="bg-[#00f2fe]/10 border border-[#00f2fe]/40 p-5 rounded-xl flex flex-col text-sm leading-relaxed font-antonio tracking-wider">
            <span className="font-bold text-[#00f2fe] mb-3 block">
              ⚠️ Detected {detectedKeys.length} parameters that changed or are
              missing:
            </span>
            <ul className="max-h-40 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-[#00f2fe]/30 scrollbar-track-transparent">
              {detectedKeys.map((key) => (
                <li
                  key={key}
                  className="text-xs text-[#00f2fe] font-mono opacity-80 break-all bg-black/40 px-2 py-1 rounded"
                >
                  {key}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-4">
              <button
                onClick={() => setDetectedKeys(null)}
                className="py-3 px-6 text-white/70 border border-white/20 rounded-xl text-xs uppercase hover:bg-white/5 transition-colors font-bold tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className={`flex-1 py-3 rounded-xl font-bold tracking-widest text-sm uppercase transition-all ${isSyncing ? "bg-[#ffffff1a] text-white/40 cursor-not-allowed" : "bg-[#00f2fe] text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,242,254,0.3)]"}`}
              >
                {isSyncing
                  ? "Syncing..."
                  : `Sync ${detectedKeys.length} Changes`}
              </button>
            </div>
          </div>
        )}

        {progressStatus && (
          <div
            className={`mt-6 p-5 rounded-xl border ${progressStatus.includes("✅") ? "bg-green-900/20 border-green-500/50 text-green-300" : progressStatus.includes("❌") ? "bg-red-900/20 border-red-500/50 text-red-300" : "bg-[#00f2fe]/10 border-[#00f2fe]/40 text-[#00f2fe]"} text-sm leading-relaxed font-antonio tracking-wider flex flex-col gap-3`}
          >
            <div>{progressStatus}</div>

            <div className="mt-2 border-t border-[currentColor]/20 pt-3">
              {syncedKeys.length > 0 ? (
                <>
                  <span className="font-bold underline mb-2 block">
                    Newly Synced Parameters ({syncedKeys.length}):
                  </span>
                  <ul className="max-h-40 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-[currentColor]/30 scrollbar-track-transparent">
                    {syncedKeys.map((key) => (
                      <li
                        key={key}
                        className="text-xs font-mono opacity-80 break-all bg-black/40 px-2 py-1 rounded"
                      >
                        {key}
                      </li>
                    ))}
                  </ul>
                </>
              ) : progressStatus.includes("✅") ? (
                <span className="font-bold opacity-80">
                  All parameters are already synced! (0 missing files)
                </span>
              ) : null}
            </div>
          </div>
        )}

        {progressStatus.includes("✅") && selectedLang !== "all" && (
          <button
            onClick={handleApplyLanguage}
            className="mt-6 w-full py-4 bg-transparent border border-[#ffffff]/30 text-white rounded-xl font-antonio font-bold tracking-widest uppercase hover:bg-white/5 transition-colors"
          >
            Switch to {languages.find((l) => l.code === selectedLang)?.name}
          </button>
        )}
      </div>
    </div>
  );
}
