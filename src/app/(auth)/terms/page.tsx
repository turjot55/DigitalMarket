"use client";

import { Icons } from "../../../components/Icons";
import Link from "next/link";
import { buttonVariants, Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  // const { data } = trpc.anyApiRoute.useQuery();

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
        return;
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }

      toast.error("Somthing went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  // const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
  //   mutate({ email, password });

  // };

  const [termsAccepted, setTermsAccepted] = useState(false);

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    mutate({ email, password });
  };
  // function useState(arg0: boolean): [any, any] {
  //   throw new Error("Function not implemented.");
  // }
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Terms and Condition </h1>
            <p>Last Updated February 11 2024</p>
            {/* <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                // className: "text-muted-foreground",
                className: "gap-1.5",
              })}>
              Already have an account ? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link> */}
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <p className="text-center">
                    By signing up, you agree to our{" "}
                    <a className="text-blue-500">terms and conditions</a>
                  </p>

                  <div>
                    <h1 className="text-center text-3xl font-bold">
                      Payment Procedures
                    </h1>
                    <p className="text-center">
                      Payments for services or products available on the Website
                      will be charged to you in accordance with the policies,
                      procedures, and timelines posted on the relevant sections
                      of the Website. You agree to pay the fees applicable to
                      your subscription and any other applicable fees, including
                      but not limited to fees relating to the processing of
                      transactions under your account (“Fees”). All initial and
                      recurring Fees will be charged to the credit card that you
                      authorize for your account
                    </p>
                  </div>
                  <div>
                    <h1 className="text-center text-3xl font-bold">Refunds</h1>
                    <p>
                      If for some reason you’re not happy with your membership,
                      please send an email to{" "}
                      <a href="turjo_t@yahoo.com" className="text-blue-500">
                        turjo_t@yahoo.com
                      </a>{" "}
                      and let us know why within 30 days of purchasing and we’ll
                      gladly provide you with a refund.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  {termsAccepted === true ? (
                    <Label
                      htmlFor="termsAccepted"
                      className="text-center text-blue-400">
                      I agree to the terms and conditions
                    </Label>
                  ) : (
                    <Label htmlFor="termsAccepted" className="text-center">
                      I agree to the terms and conditions
                    </Label>
                  )}
                </div>
                <Button disabled={!termsAccepted}>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
