import { useEffect, useState, type FocusEvent, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";

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
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setActiveLabel(null);
    }
  }, [open]);

  const activeImage =
    dropdown.items.find((item) => item.label === activeLabel)?.image ?? dropdown.items[0]?.image ?? "";

  function closeOnBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setActiveLabel(null);
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
        <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
      </AppLink>
      <div id={id} className={`dropdown-panel${open ? " is-open" : ""}`} onMouseLeave={() => setActiveLabel(null)}>
        <div className="dropdown-media">
          <img src={activeImage} alt="" />
        </div>
        <div className="dropdown-list">
          {dropdown.items.map((item) => (
            <AppLink
              key={item.label}
              className="dropdown-item"
              href={item.href}
              onClick={onClose}
              onMouseEnter={() => setActiveLabel(item.label)}
              onFocus={() => setActiveLabel(item.label)}
            >
              <span className="dropdown-label">{item.label}</span>
              <span className="dropdown-description">{item.description}</span>
            </AppLink>
          ))}
        </div>
      </div>
    </div>
  );
}
