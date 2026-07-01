"use client";

import { Suspense } from "react";
import { useFunnel } from "@use-funnel/browser";
import { CompleteStep } from "./components/CompleteStep";
import { EmailInputStep } from "./components/EmailInputStep";
import { NewPasswordStep } from "./components/NewPasswordStep";
import { VerifyStep } from "./components/VerifyStep";

type ResetPasswordFunnel = {
  EmailInput: { email?: string };
  Verify: { email: string };
  NewPassword: { email: string };
  Complete: { email: string };
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
          onNext={(email) => history.push("Verify", { email })}
          onPrev={() => history.go(-1)}
        />
      )}
      Verify={({ context, history }) => (
        <VerifyStep
          email={context.email}
          onNext={() => history.push("NewPassword", (prev) => ({ ...prev }))}
          onPrev={() => history.go(-1)}
        />
      )}
      NewPassword={({ history }) => (
        <NewPasswordStep
          onNext={() => history.push("Complete", (prev) => ({ ...prev }))}
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
