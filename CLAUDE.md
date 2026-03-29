# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WME E40 Geometry is a TamperMonkey/GreaseMonkey userscript for Waze Map Editor (WME). It provides tools for manipulating POI geometry — orthogonalize, smooth, simplify, scale, rotate, copy, and convert points to circles/squares.

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/WME-E40.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch` (rebuild on changes)
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts          # userscript header (comment block, not TS code)
├── style.css        # plain CSS, imported as string
├── globals.d.ts     # declares WME runtime globals
├── translations.ts  # NAME, REQUIRED_LEVEL, TRANSLATION (en, uk, ru)
├── types.ts         # TYPES (road type constants)
├── settings.ts      # SETTINGS defaults (navigation point options)
├── layers.ts        # layerConfig (style rules for navigation vectors)
├── buttons.ts       # getPlaceButtons(), getPointButtons(), getTabButtons()
├── geo-utils.ts     # GeoUtils class (spherical geometry: bearings, angles, distances)
├── geometry.ts      # createCirclePolygon, createSquarePolygon, simplifyPolygon, normalizeRightAngles
├── e40.ts           # E40 class (extends WMEBase) — UI, panels, handlers, geometry operations
├── helpers.ts       # standalone wrapper functions (scale, orthogonalize, smooth, etc.)
└── index.ts         # bootstrap: registers translations/CSS, instantiates E40
```

**Build output:** `dist/WME-E40.user.js` — IIFE with userscript header prepended as banner. Version is read from `package.json` via `{{version}}` placeholder in `meta.ts`.

**Key external dependencies** (loaded via `@require` in userscript header, not bundled):
- WME-Bootstrap.js, WME-Base.js, WME-UI.js, CommonUtils.js (WME script ecosystem)
- TurfJS v7.2.0 (geospatial operations)

## Key Design Notes

- `buttons.ts` exports getter functions (not constants) because button titles use `I18n.t(NAME)` which requires translations to be registered first
- `helpers.ts` holds thin wrapper functions that delegate to the E40 instance via a `setE40Instance()` setter
- `geo-utils.ts` is a standalone math utility class (no WME dependencies) for spherical geometry calculations
- `geometry.ts` contains polygon manipulation functions used by the E40 class
- GitHub Actions auto-builds `dist/` on push to master

## Coding Conventions

- TypeScript with `strict: false` — minimal type annotations, `any` for WME SDK types
- Road types use the `TYPES` constant from `types.ts`, not raw numbers
