# Security Policy

Mukammal Training LMS is a work-in-progress LMS frontend. Security matters because education platforms can handle users, roles, schedules, grades, documents, and institutional data.

## Supported Versions

The project is currently in early development. Security fixes are applied to the main development branch.

| Version | Supported |
| ------- | --------- |
| main    | Yes       |

## Reporting a Vulnerability

Please do not open a public issue for sensitive security problems.

Instead, contact the maintainer privately with:

* a clear description of the vulnerability;
* affected files, routes, or flows;
* reproduction steps;
* expected and actual behavior;
* suggested fix, if available.

Maintainer:

* GitHub: [@hojiakbardevs](https://github.com/hojiakbardevs)

## Security Focus Areas

Current and planned review areas include:

* authentication and session handling;
* role-based route protection;
* backend permission boundaries;
* JWT storage and refresh flow;
* CORS and allowed host configuration;
* API validation and error handling;
* secure file upload patterns;
* environment variable handling;
* dependency vulnerability checks.

## Current Limitations

The current frontend uses mock authentication data for UI development. Production authentication, backend authorization, token refresh, and database security must be implemented and reviewed before using this project with real users or sensitive data.
