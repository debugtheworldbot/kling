"use server";

import { createClient } from "@/utils/supabase/server";
import { validateLicense } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createPrompt(license_key: string, formData: FormData) {
  const res = await validateLicense(license_key);
  console.log(res);
  if (!res.valid) {
    return {
      success: false,
      content: "invalid key",
    };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const input = (formData.get("input") as string) || "";
  if (!input) {
    return {
      success: false,
      content: "no input",
    };
  }

  const { data, error } = await supabase
    .from("prompts")
    .upsert([{ license_key, input }], { onConflict: "license_key" })
    .select();
  revalidatePath("/");
  return {
    success: true,
    content: "success",
  };

  // mutate data
  // revalidate cache
}
