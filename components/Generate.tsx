import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { validateLicense } from "@/utils/utils";

export default function Generate({ license_key }: { license_key: string }) {
  async function create(formData: FormData) {
    "use server";
    const res = await validateLicense(license_key);
    console.log(res);
    if (!res.valid) {
      throw new Error("invalid key");
    }
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const rawFormData = {
      input: formData.get("input"),
    };
    console.log({ rawFormData });

    const { data, error } = await supabase
      .from("prompts")
      .insert([{ license_key: "someValue", input: "otherValue" }])
      .select();
    console.log(data, error);
    // mutate data
    // revalidate cache
  }

  return (
    <form action={create} className="mt-6 w-full">
      <Textarea
        name="input"
        placeholder="your prompt here..."
        className="w-full"
        rows={5}
      />
      <Button className="mt-2 mx-auto block">SEND</Button>
    </form>
  );
}
