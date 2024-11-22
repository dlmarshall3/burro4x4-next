import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export const runtime = "edge";

export async function POST(req: Request) {
  const supabase = createClient();
  const formData = await req.formData();

  const year = formData.get("year") as string;
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const client = formData.get("client") as string;
  const file = formData.get("file") as File;

  if (!year || !make || !model || !client || !file) {
    return new Response("All fields are required.", { status: 400 });
  }

  try {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("vehicles")
      .upload(`public/${file.name}`, file.stream(), {
        contentType: file.type,
      });

    if (storageError) {
      throw new Error(storageError.message);
    }

    const {
      data: { publicUrl: image_url },
    } = supabase.storage.from("vehicles").getPublicUrl(storageData.path);

    const { error: dbError } = await supabase.from("vehicles").insert({
      year,
      make,
      model,
      client,
      image_url,
    });

    if (dbError) {
      throw new Error(dbError.message);
    }

    return NextResponse.json({ message: "Vehicle added successfully." });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
