"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "../ui/field";

const formSchema = z.object({
  link: z
    .string()
    .regex(
      /^https:\/\/github\.com\/.+$/,
      "Por favor, insira uma URL válida do GitHub",
    ),
});

export default function Forms() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <form
      className="relative w-full max-w-2xl"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="link"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                placeholder="Cole a URL do repositório (ex: https://github.com/usuario/repo)"
                className="bg-primary text-secondary-white  pr-36 "
              />

              <div className="min-h-5">
                {fieldState.invalid && (
                  <FieldError
                    className="text-red-400"
                    errors={[fieldState.error]}
                  />
                )}
              </div>
            </Field>
          )}
        />
        <Button
          type="submit"
          className="absolute right-3 top-[32%] -translate-y-1/2 bg-secondary-white text-primary hover:text-secondary-white cursor-pointer rounded-md font-bold py-4.5 hover:border-secondary-white"
        >
          <ArrowRight className="size-5" />
          <span className="text-sm">Explorar</span>
        </Button>
      </FieldGroup>
    </form>
  );
}
