# Contributing

Thank you for your interest in contributing to Mukammal Training LMS.

This project is still evolving, so contributions that improve clarity, stability, accessibility, and maintainability are especially welcome.

## Ways to Contribute

You can help by:

* improving React components and UI states;
* fixing bugs;
* improving accessibility;
* improving responsive behavior;
* adding or refining documentation;
* preparing backend integration examples;
* adding tests;
* improving security practices;
* reviewing issues and pull requests.

## Development Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Run lint checks:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

Build the project:

```bash
npm run build
```

## Contribution Guidelines

Before opening a pull request:

* keep changes focused and easy to review;
* avoid unrelated refactors;
* use existing project structure and naming patterns;
* keep UI changes responsive;
* do not commit real `.env` files or credentials;
* run lint, typecheck, and build when possible;
* document new behavior if it affects usage or setup.

## Pull Request Checklist

* [ ] The change has a clear purpose.
* [ ] The UI still works on common desktop and mobile sizes.
* [ ] Role-based routes and redirects still behave correctly.
* [ ] No secrets or private environment files are committed.
* [ ] Relevant commands were run and results are noted.

## Security Issues

Please do not report sensitive security issues in public issues. Follow the process in `SECURITY.md`.
