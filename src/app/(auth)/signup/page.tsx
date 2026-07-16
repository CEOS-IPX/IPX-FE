"use client";

import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";

import { CompleteStep } from "./components/CompleteStep";
import { EmailInputStep } from "./components/EmailInputStep";
import { EmailSentStep } from "./components/EmailSentStep";
import { ProfileStep } from "./components/ProfileStep";
import { SIGNUP_FUNNEL_ID, SIGNUP_STEPS } from "@/constants/signup/funnel";
import type { SignupFunnelSteps } from "@/types/signup/funnel.type";

export default function Signup() {
  const router = useRouter();

  const funnel = useFunnel<SignupFunnelSteps>({
    id: SIGNUP_FUNNEL_ID,
    initial: {
      step: SIGNUP_STEPS.EMAIL_INPUT,
      context: {},
    },
  });

  return (
    <funnel.Render
      EmailInput={({ context, history }) => (
        <EmailInputStep
          email={context.email}
          onNext={({ email, expiresIn, resendAvailableIn }) =>
            history.push(SIGNUP_STEPS.EMAIL_SENT, { email, expiresIn, resendAvailableIn })
          }
        />
      )}
      EmailSent={({ context, history }) => (
        <EmailSentStep
          email={context.email}
          expiresIn={context.expiresIn}
          onNext={(verificationToken) =>
            history.push(SIGNUP_STEPS.PROFILE, { email: context.email, verificationToken })
          }
          onBack={() => history.back()}
        />
      )}
      Profile={({ context, history }) => (
        <ProfileStep
          onSubmit={() =>
            history.push(SIGNUP_STEPS.COMPLETE, {
              email: context.email,
              verificationToken: context.verificationToken,
            })
          }
          onBack={() => history.back()}
        />
      )}
      Complete={() => <CompleteStep onGoLogin={() => router.push("/login")} />}
    />
  );
}
