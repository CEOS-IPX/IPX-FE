"use client";

import { Suspense } from "react";
import { useFunnel } from "@use-funnel/browser";
import { CompleteStep } from "./components/CompleteStep";
import { EmailInputStep } from "./components/EmailInputStep";
import { NewPasswordStep } from "./components/NewPasswordStep";
import { VerifyStep } from "./components/VerifyStep";

type ResetPasswordFunnel = {
  EmailInput: { email?: string };
  Verify: { email: string; expiresIn: number; resendAvailableIn: number };
  NewPassword: { email: string; verificationToken: string };
  Complete: { email: string; verificationToken: string };
};

function ResetPasswordContent() {
  const funnel = useFunnel<ResetPasswordFunnel>({
    id: "reset-password",
    initial: {
      step: "EmailInput",
      context: {},
    },
  });

  return (
    <funnel.Render
      EmailInput={({ history }) => (
        <EmailInputStep
          onNext={(email, expiresIn, resendAvailableIn) =>
            history.push("Verify", { email, expiresIn, resendAvailableIn })
          }
          onPrev={() => history.go(-1)}
        />
      )}
      Verify={({ context, history }) => (
        <VerifyStep
          email={context.email}
          expiresIn={context.expiresIn}
          onNext={(verificationToken) =>
            history.push("NewPassword", { email: context.email, verificationToken })
          }
          onPrev={() => history.go(-1)}
        />
      )}
      NewPassword={({ context, history }) => (
        <NewPasswordStep
          verificationToken={context.verificationToken}
          onNext={() =>
            history.push("Complete", {
              email: context.email,
              verificationToken: context.verificationToken,
            })
          }
          onPrev={() => history.go(-1)}
        />
      )}
      Complete={() => <CompleteStep />}
    />
  );
}

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
