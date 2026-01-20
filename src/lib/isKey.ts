/**
 * From https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
 *
 * Usage:
 * Object.keys(user).forEach((key) => {
 *   if (isKey(user, key)) {
 *     console.log(user[key]);
 *   }
 * });
 */
export function isKey<T extends object>(
  object: T,
  key: PropertyKey
): key is keyof T {
  return key in object;
}
