"use client";

// import { Icons } from "@/components/Icons";
import { Icons } from "./../../../components/Icons";
import Link from "next/link";
import { buttonVariants, Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
// import { Input } from "/components/ui/input";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
// import { Button } from "@/components/ui/Button";
import { cn } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ZodError, z } from "zod";
import { trpc } from "../../../trpc/client";
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "../../../lib/validators/account-credentials-validator";
// import { appRouter } from "../../../trpc/index";
import { toast } from "sonner";
import { router } from "../../../trpc/trpc";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  // const { data } = trpc.anyApiRoute.useQuery();

  //   const router = useRouter();

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    // onError: (err) => {
    //   if (err.data?.code === "CONFLICT") {
    //     toast.error("This email is already in use. Sign in instead?");
    //     return;
    //   }
    //   if (err instanceof ZodError) {
    //     toast.error(err.issues[0].message);
    //     return;
    //   }

    //   toast.error("Somthing went wrong. Please try again.");
    // },
    // onSuccess: ({ sentToEmail }) => {
    //   toast.success(`Verification email sent to ${sentToEmail}.`);
    //   router.push("/verify-email?to=" + sentToEmail);
    // },
    onSuccess: () => {
      toast.success("Signed in successfully");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller" : ""} account
            </h1>
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "link",
                // className: "text-muted-foreground",
                className: "gap-1.5",
              })}>
              Don&apos;t have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  {/* <label htmlFor="email">Email</label> */}
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Sign In</Button>
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}>
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}>
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
