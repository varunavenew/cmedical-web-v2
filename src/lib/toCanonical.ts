export function toCanonical({
  language,
  path,
}: {
  language: string;
  path?: string[];
}) {
  let url = `https://cmedical.no/${language}`;
  if (path != null) {
    url = `${url}/${path.join("/")}`;
  }

  return url;
}
