# luilka

A Nexy project: client-routed, React, styled with Tailwind.

## Order of work

1. If the change has a view, audit the experience first: load `nexy-ux-audit`.
2. Write the failing test, then the least code that passes.
3. Run `nx check`, `nx test` and `nx build`, and report what they print.

## Rules

- One function does one treatment, one class carries one intention, one folder holds one set of related intentions. Keep it simple.
- No emoji anywhere. Icons are real SVG. Text is plain and written for people.
- Write idiomatic code for the framework: no hand-written DOM scripts.
- `__nexy__/` is generated: never edit it, never commit it.

## Commands

`nx dev`, `nx build`, `nx start`, `nx test`, `nx check`.

Run them inside the project's virtual environment (`.venv`), or through `uv run`, for example `uv run nx dev`: outside it the project's own packages cannot be found.

## Skills

Installed in `.agents/skills/` and `.claude/skills/`. Load the one that matches the task:

- `nexy-principles`: The rules for every task in a Nexy project or in Nexy itself - order of work, KISS, SOLID, TDD, one function one treatment, no emoji, real SVG icons, human text, human-centred information architecture.
- `nexy-ux-audit`: The UX and information-architecture audit to run before building or changing any page, component, form or message in a Nexy project.
- `nexy-react`: Writing React 19 routes, layouts and components in a Nexy project in idiomatic React - hooks and state, never hand-written DOM scripts.
- `nexy-styling`: Styling a Nexy project in the style mode it was created with - Tailwind utilities, UnoCSS utilities or plain CSS - with design tokens in src/globale.css.

Do not run `nx skills`.
