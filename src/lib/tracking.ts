export function trackWithGTM(
  event: string,
  variables?: Record<string, string>
) {
  // @ts-expect-error
  window.dataLayer?.push({ event: event, ...variables });
}
