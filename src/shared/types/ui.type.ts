import type { Language } from "./site.type.ts";
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from "react";
import type { Href, LinkProps } from "@nexy/client";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export type IconTileProps = HTMLAttributes<HTMLDivElement>;

export type ButtonVariant = "primary" | "outline" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type LocalizedLinkProps = Omit<LinkProps, "href"> & {
  href: Href;
  language?: Language;
};


export type CardProps = HTMLAttributes<HTMLDivElement>;
