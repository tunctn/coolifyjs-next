import { Suspense } from "react";
import { ResetPasswordForm } from "./reset-password-form";

interface ResetPasswordPageProps {}

export default function ResetPasswordPage({}: ResetPasswordPageProps) {
  return (
    <Suspense>
      <ResetPasswordForm />;
    </Suspense>
  );
}
