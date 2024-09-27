import React from "react";
import { PopupButton } from "react-calendly";
import type { ComponentProps } from "react";

interface CalendarProps {
  url: string;
}

export const Calendar: React.FC<CalendarProps> = ({ url }) => {
  const rootElement = 
    typeof window !== 'undefined' ? document.getElementById("root") : null;

  const buttonProps: ComponentProps<typeof PopupButton> = {
    url: url,
    rootElement: rootElement!,
    text: "Thanks for paying, you can now meet with me!"
  };

  return <PopupButton {...buttonProps} />;
};
