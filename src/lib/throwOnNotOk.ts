export const throwOnNotOk = <T>(r: Response) => {
  if (!r.ok) throw new Error(r.statusText);
  return r.json() as Promise<T>;
};
