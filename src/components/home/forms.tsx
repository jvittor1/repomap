"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";

export default function Forms() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("value:", inputValue);
  };

  return (
    <form className="relative w-full max-w-2xl" onSubmit={handleSubmit}>
      <Input
        placeholder="Type here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-primary text-secondary-white  pr-36 "
      />
      <Button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-secondary-white text-primary hover:text-secondary-white cursor-pointer rounded-md font-bold py-4.5 hover:border-secondary-white"
      >
        <ArrowRight className="size-5" />
        <span className="text-sm">Explorar</span>
      </Button>
    </form>
  );
}
