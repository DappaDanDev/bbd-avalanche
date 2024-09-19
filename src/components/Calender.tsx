import React from "react";
import { PopupButton } from "react-calendly";
import type { ComponentProps } from "react";

export const Calender: React.FC = () => {
  const rootElement = 
    typeof window !== 'undefined' ? document.getElementById("root") : null;

  const buttonProps: ComponentProps<typeof PopupButton> = {
    url: "https://calendly.com/your_scheduling_page",
    rootElement: rootElement!,
    text: "Click here to schedule!"
  };

  return <PopupButton {...buttonProps} />;
};
