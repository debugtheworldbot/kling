import React from "react";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { validateLicense } from "@/utils/utils";
import { SubmitButton } from "./SubmitBtn";
import { revalidatePath } from "next/cache";

const getInputs = async (key: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("prompts")
    .select("*")
    .eq("license_key", key);
  return data ? data[0] : null;
};
export default async function Generate({
  license_key,
}: {
  license_key: string;
}) {
  const input = await getInputs(license_key);
  async function create(formData: FormData) {
    "use server";
    const res = await validateLicense(license_key);
    console.log(res);
    if (!res.valid) {
      throw new Error("invalid key");
    }
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const input = (formData.get("input") as string) || "";

    const { data, error } = await supabase
      .from("prompts")
      .upsert([{ license_key, input }], { onConflict: "license_key" })
      .select();
    revalidatePath("/");
    console.log(data, error);

    // mutate data
    // revalidate cache
  }

  return (
    <form action={create} className="mt-6 w-full flex flex-col gap-3">
      <p className="text-center">Your previous input: {input?.input}</p>
      <Textarea
        name="input"
        placeholder="your prompt here..."
        className="w-full"
        rows={5}
      />
      <SubmitButton className="mx-auto block">SEND</SubmitButton>
    </form>
  );
}
