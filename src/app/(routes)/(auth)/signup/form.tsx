"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SignUpSchema, SignUpValues } from "./validate";
import InputStartIcon from "../components/input-start-icon";
import InputPasswordContainer from "../components/input-password";
import { cn } from "@/lib/utils";
import { AtSign, MailIcon, UserIcon } from "lucide-react";
import { GenderRadioGroup } from "../components/gender-radio-group";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: false
    },
  });

  function onSubmit(data: SignUpValues) {
    startTransition(async () => {
      console.log("submit data:", data);
      const response = await signUp.email(data);

      if (response.error) {
        console.log("SIGN_UP:", response.error.status);
        toast.error(response.error.message);
      } else {
        redirect("/");
      }
    });
  }

  const getInputClassName = (fieldName: keyof SignUpValues) =>
    cn(
      "rounded-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800",
      "focus-visible:border-red-400 dark:focus-visible:border-red-600 focus-visible:ring-red-100 dark:focus-visible:ring-red-900/30",
      form.formState.errors[fieldName] &&
        "border-red-400 text-red-600 focus-visible:border-red-400 focus-visible:ring-red-100",
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputStartIcon icon={UserIcon}>
                  <Input
                    placeholder="Full Name"
                    className={cn("peer ps-9 h-11", getInputClassName("name"))}
                    disabled={isPending}
                    {...field}
                  />
                </InputStartIcon>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputStartIcon icon={MailIcon}>
                  <Input
                    placeholder="Email Address"
                    className={cn("peer ps-9 h-11", getInputClassName("email"))}
                    disabled={isPending}
                    {...field}
                  />
                </InputStartIcon>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputStartIcon icon={AtSign}>
                  <Input
                    placeholder="Username"
                    className={cn("peer ps-9 h-11", getInputClassName("username"))}
                    disabled={isPending}
                    {...field}
                  />
                </InputStartIcon>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPasswordContainer>
                  <Input
                    className={cn("pe-9 h-11", getInputClassName("password"))}
                    placeholder="Password"
                    disabled={isPending}
                    {...field}
                  />
                </InputPasswordContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPasswordContainer>
                  <Input
                    className={cn("pe-9 h-11", getInputClassName("confirmPassword"))}
                    placeholder="Confirm Password"
                    disabled={isPending}
                    {...field}
                  />
                </InputPasswordContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Gender</FormLabel>
              <GenderRadioGroup
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full h-12 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/30 transition-all"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
