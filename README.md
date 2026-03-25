# SASS Learning Game

An interactive game to learn SASS/SCSS by solving challenges — covering all major topics commonly asked in interviews.

## Features

- **30 challenges** across **13 categories** (Variables, Nesting, Mixins, Inheritance, Functions, Control Flow, Maps, Responsive design, and more)
- Live SASS compilation in the browser using the official `sass` compiler
- CodeMirror editor with SCSS syntax highlighting and autocomplete
- Visual preview of your styles via sandboxed iframe
- Side-by-side compiled CSS output vs expected CSS comparison
- Auto-validation — the app checks your answer in real time
- Progress tracking persisted to localStorage
- Must complete each challenge before advancing to the next
- Hint system for every challenge
- Fully responsive for mobile (sidebar drawer, stacked layout)

## Tech Stack

- React + Vite
- SASS (in-browser compilation)
- CodeMirror 6 (`@uiw/react-codemirror`)
- SCSS for app styles (Catppuccin Mocha theme)

## Getting Started

```bash
npm install
npm run dev
```

## Challenge Categories

| Category | Topics Covered |
|---|---|
| Basics | Variables, Nesting, Parent Selector (`&`), BEM |
| Modules | Partials, `@use` |
| Mixins | Basic, with arguments, default values, `@content` blocks |
| Inheritance | `@extend`, Placeholder selectors (`%`) |
| Operations | Math operators, `sass:math` |
| Functions | Built-in color functions, custom `@function` |
| Control Flow | `@if/@else`, `@for`, `@each`, `@while` |
| Data Types | Lists, Maps, `map-get` |
| Advanced Mixins | `@content` directive |
| Advanced | Interpolation, variable scoping, `!default`, `!global`, `@at-root` |
| Built-in Functions | String functions, advanced color functions (`mix`, `rgba`) |
| Responsive | Nested media queries, responsive mixin systems |
| Final Challenge | Combining everything into a mini design system |
