"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./SubmitBtn";
import { createPrompt } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function Generate({ license_key }: { license_key: string }) {
  const createWithId = createPrompt.bind(null, license_key);
  const [res, setRes] = useState<{ success: boolean; content: string }>();
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        const data = await createWithId(formData);
        setRes(data);
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
      {res && (
        <p
          className={cn(
            "text-center",
            res.success ? "text-green-500" : "text-red-500",
          )}
        >
          {res.content}
        </p>
      )}
    </form>
  );
}
