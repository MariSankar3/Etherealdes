# Ethereal Design - Translation & Localization Guide

This guide outlines the step-by-step process for translating new or existing components in the Ethereal Design Next.js application.

The project uses a custom context-based localization approach rather than standard libraries like `react-i18next`. All translations are managed via a custom `useLanguage` hook and raw JSON dictionary files.

## 1. Directory Structure

The core localization logic lives in two places:

1. **The Language Context:** `app/context/LanguageContext.js` (Contains the `useLanguage` hook and the logic for IP/Browser detection).
2. **The Dictionaries:** The root directory contains `en.json` (English) and `de.json` (German) files which hold the key-value pairs for translations.

## 2. Step-by-Step Translation Process

Whenever you encounter hardcoded English strings in a component (e.g., `<p>Hello World</p>`), follow these steps to localize it:

### Step 1: Add Keys to the Dictionaries

Open **both** `en.json` and `de.json` and add a new unique key for the text.

**In `en.json`:**

```json
{
  "greeting_hello": "Hello World"
}
```

**In `de.json`:**

```json
{
  "greeting_hello": "Hallo Welt"
}
```

_Tip:_ Use a clear naming convention for keys, such as `pageName_component_description` (e.g., `about_hero_title` or `pricing_tier_pro_desc`). This prevents naming collisions as the app grows.

### Step 2: Import the `useLanguage` Hook

Go to the component file (e.g., `MyComponent.jsx`) that contains the hardcoded string. Import the custom `useLanguage` hook from the context folder. _Ensure the component is a Client Component by marking it with `"use client";` at the very top of the file._

```javascript
"use client";
import React from "react";
// Adjust the relative path based on the file depth
import { useLanguage } from "../../context/LanguageContext";
```

### Step 3: Initialize the Hook

Inside the component function, call the hook to extract the `t` (translate) function.

```javascript
export default function MyComponent() {
  const { t } = useLanguage();

  // ... rest of component
```

### Step 4: Replace Hardcoded Strings

Replace the static text with the `t()` function. The `t()` function takes two arguments:

1. The `key` string you defined in the JSON files.
2. A `fallback string` (usually the English text) in case the key is missing from the dictionary.

**Before:**

```javascript
<p>Hello World</p>
```

**After:**

```javascript
<p>{t("greeting_hello", "Hello World")}</p>
```

### Dynamic Keys (Advanced)

If you are mapping over an array (like pricing tiers or case studies), you can use template literals to generate translation keys dynamically.

```javascript
{
  cards.map((card, index) => (
    <div key={index}>
      <h2>{t(`pricing_tier_${card.id}_title`, card.defaultTitle)}</h2>
      <p>{t(`pricing_tier_${card.id}_desc`, card.defaultDesc)}</p>
    </div>
  ));
}
```

## 3. Best Practices & Troubleshooting

- **Silent English Fallbacks:** If a German translation isn't appearing, ensure the key in `de.json` _exactly_ matches the key used in the `t()` function. If the key is missing in `de.json`, the app will automatically display the English fallback text provided as the second argument.
- **Client Components Only:** The `useLanguage` hook relies on React Context (`createContext`, `useContext`), which only works in Client Components. Always ensure files using translations have `"use client";` at the top.
- **Do Not Use `react-i18next`:** Some older components might have attempted to use `import { useTranslation } from "react-i18next";`. **Do not use this.** Always replace it with `import { useLanguage } from "../../context/LanguageContext";`.
- **JSON Syntax:** Ensure your JSON files have valid syntax (no missing commas or trailing commas), or the app might fail to load the dictionary.
