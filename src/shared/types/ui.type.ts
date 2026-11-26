import type { Language } from "./site.type.ts";
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from "react";
import type { Href, LinkProps } from "@nexy/client";
import type { HTMLMotionProps } from "motion/react";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export type IconTileProps = HTMLAttributes<HTMLDivElement>;

export type ButtonVariant = "primary" | "outline" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type AppLinkProps = Omit<LinkProps, "href"> & {
  href: Href;
  language?: Language;
};

export type MotionBoxProps = Pick<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> & {
  className?: string;
  children?: React.ReactNode;
  "aria-hidden"?: boolean | "true" | "false";
  "data-testid"?: string;
};

export type CardProps = HTMLAttributes<HTMLDivElement>;
