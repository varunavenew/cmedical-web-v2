import { geolocation } from "@vercel/edge";

export async function GET(request: Request) {
  const { latitude, longitude } = geolocation(request);
  const coordinates = { lat: latitude, lng: longitude };
  return Response.json({ coordinates });
}

export const runtime = "edge";
