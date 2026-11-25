import { type FocusEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import AppLink from "@/components/ui/link.tsx";
import type { Dropdown, PageHref } from "@/i18n";

type NavDropdownProps = {
  id: string;
  label: string;
  href: PageHref;
  dropdown: Dropdown;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function NavDropdown({ id, label, href, dropdown, open, onOpen, onClose }: NavDropdownProps) {
  function closeOnBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      onClose();
    }
  }

  function closeOnEscape(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  return (
    <div className="nav-item" onMouseEnter={onOpen} onFocus={onOpen} onBlur={closeOnBlur} onKeyDown={closeOnEscape}>
      <AppLink
        className="nav-trigger"
        href={href}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
      >
        {label}
        <ChevronDown size={16} strokeWidth={2.5} aria-hidden="true" />
      </AppLink>
      <div id={id} className={`mega-panel${open ? " is-open" : ""}`}>
        <div className="container mega-inner">
          <div className="mega-content">
            <div className="mega-head">
              <span className="mega-eyebrow">{dropdown.eyebrow}</span>
              <h2 className="mega-title">{dropdown.title}</h2>
            </div>
            <div className="mega-grid">
              {dropdown.items.map((item) => (
                <AppLink key={item.label} className="mega-card" href={item.href} onClick={onClose}>
                  <div className="mega-media">
                    <img src={item.image} alt="" />
                  </div>
                  <span className="mega-card-eyebrow">{item.eyebrow}</span>
                  <h3 className="mega-card-title">{item.label}</h3>
                  <p className="mega-card-description">{item.description}</p>
                  <span className="mega-card-action">
                    {item.action}
                    <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                  </span>
                </AppLink>
              ))}
            </div>
          </div>
          <aside className="mega-aside">
            <h3>{dropdown.linksTitle}</h3>
            {dropdown.links.map((link) => (
              <AppLink key={link.label} href={link.href} onClick={onClose}>
                {link.label}
              </AppLink>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
