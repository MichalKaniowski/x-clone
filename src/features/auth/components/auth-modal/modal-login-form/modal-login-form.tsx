import { useState } from "react";
import { ForgotPasswordForm } from "./forgot-password-form";
import { LoginForm } from "./login-form";

export const ModalLoginForm = ({ toggleMode }: { toggleMode: () => void }) => {
  const [isInForgotPasswordMode, setIsInForgotPasswordMode] = useState(false);

  return isInForgotPasswordMode ? (
    <ForgotPasswordForm
      onTurnPasswordModeOff={() => setIsInForgotPasswordMode(false)}
    />
  ) : (
    <LoginForm
      toggleSignupMode={toggleMode}
      onTurnPasswordModeOn={() => setIsInForgotPasswordMode(true)}
    />
  );
};
