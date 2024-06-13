import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function Generate() {
  return (
    <form className="mt-6 w-full">
      <Textarea placeholder="your prompt here..." className="w-full" rows={5} />
      <Button className="mt-2 mx-auto block">SEND</Button>
    </form>
  );
}
