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
            <h1 className="text-2xl font-bold">Privacy Policy </h1>
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
            <form>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <h1 className="text-center font-bold text-3xl ">
                    Sharing Your personal Information <br />{" "}
                  </h1>
                  <a className="text-blue-500 text-center" href="/terms">
                    terms and conditions
                  </a>
                  <br />
                  <p>
                    We do not sell, trade, or rent Student personal
                    identification information to others. We may share your
                    personal identification information with third party
                    applications or service providers in order to provide an
                    enhanced experience. In certain situations, we may be
                    required to disclose personal data in response to lawful
                    requests by public authorities, including to meet national
                    security or law enforcement requirements. We may disclose
                    your personal information to third parties:
                  </p>
                  <p>
                    1. In the event that we sell or buy any business or assets
                    of the Company or another entity, in which case we may
                    disclose your personal data to the prospective seller or
                    buyer of such business or assets. <br />
                    2. If the Company or its assets are acquired by a third
                    party, in which case personal data about Students may be one
                    of the transferred assets. <br />
                  </p>
                  {/* <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  /> */}
                  <div></div>
                  {/* {termsAccepted === true ? (
                    <Label
                      htmlFor="termsAccepted"
                      className="text-center text-blue-400">
                      I agree to the terms and conditions
                    </Label>
                  ) : (
                    <Label htmlFor="termsAccepted" className="text-center">
                      I agree to the terms and conditions
                    </Label>
                  )} */}
                </div>
                {/* <Button disabled={!termsAccepted}>
                  <Link href="/sign-up">Sign Up</Link>
                </Button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
