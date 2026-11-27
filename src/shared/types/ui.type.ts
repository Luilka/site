import type { Language } from "./site.type.ts";
import type { ButtonHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes } from "react";
import type { Href, LinkProps } from "@nexy/client";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export type IconTileProps = HTMLAttributes<HTMLDivElement>;

export type ButtonVariant = "primary" | "outline" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> & {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LogoProps = {
  className?: string;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type LocalizedLinkProps = Omit<LinkProps, "href"> & {
  href: Href;
  language?: Language;
};


export type CardProps = HTMLAttributes<HTMLDivElement>;
