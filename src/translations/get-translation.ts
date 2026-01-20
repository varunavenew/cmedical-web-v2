export const t = <T>(texts: Record<"no" | "se" | "en", T>, language: string) =>
  language in texts ? texts[language as "no" | "se" | "en"] : texts.en;
