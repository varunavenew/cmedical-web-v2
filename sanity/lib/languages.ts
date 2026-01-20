export const LANGUAGES = [
  { id: "no", title: "Norway" },
  { id: "se", title: "Sweden" },
  { id: "en", title: "English" },
];

export const LANGUAGES_ISO: Record<string, string> = {
  no: "no",
  se: "sv",
  en: "en",
};

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.id);
