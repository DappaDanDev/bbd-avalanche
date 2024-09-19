import React from "react";
import { PopupButton } from "react-calendly";
import type { ComponentProps } from "react";

export const Calendar: React.FC = () => {
  const rootElement = 
    typeof window !== 'undefined' ? document.getElementById("root") : null;

  const buttonProps: ComponentProps<typeof PopupButton> = {
    url: "https://calendly.com/dappadandev/15-minute-meeting",
    rootElement: rootElement!,
    text: "Thanks for paying, you can now meet with me!"
  };

  return <PopupButton {...buttonProps} />;
};
