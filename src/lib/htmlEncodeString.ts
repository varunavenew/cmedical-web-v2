export const htmlEncodeString = (str: string) =>
  str?.replaceAll(/[&<>]/g, (i) => "&#" + i.charCodeAt(0) + ";") ?? "";
