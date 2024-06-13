"use client";
import React, { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./SubmitBtn";
import { createPrompt } from "@/app/actions";

export default function Generate({ license_key }: { license_key: string }) {
  const createWithId = createPrompt.bind(null, license_key);
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createWithId(formData);
        ref.current?.reset();
      }}
      className="mt-6 w-full flex flex-col gap-3"
    >
      <Textarea
        name="input"
        required
        placeholder="your prompt here..."
        className="w-full"
        rows={5}
      />
      <SubmitButton className="mx-auto block">SEND</SubmitButton>
    </form>
  );
}
