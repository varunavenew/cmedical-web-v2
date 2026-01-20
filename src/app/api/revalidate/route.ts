import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.SANITY_REVALIDATE_SECRET) {
  throw new Error("Missing environment variable: SANITY_REVALIDATE_SECRET");
}

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({
          message: "Invalid signature",
          isValidSignature,
          body,
        }),
        {
          status: 401,
        }
      );
    }

    if (!body?._type) {
      return new Response(JSON.stringify({ message: "Missing _type", body }), {
        status: 400,
      });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      body,
      message: `Revalidated tag: ${body._type}`,
    });
  } catch (error) {
    console.error(error);

    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(message, { status: 500 });
  }
}
