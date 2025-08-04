# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test` (interactive watch mode)
- **Lint code**: `npm run lint` (ESLint with max 0 warnings)
- **Fix linting issues**: `npm run lint:fix`
- **Type checking**: No separate command - TypeScript checking is integrated with build process

## Project Architecture

This is a React TypeScript application for ONDC RSF (Retail Seller Frontend) built with:

### Core Stack
- **React 17** with TypeScript
- **Material-UI v7** for UI components with custom theme
- **React Router v6** for navigation
- **React Query v3** for data fetching and state management
- **Styled Components** + **Emotion** for styling
- **Axios** for HTTP requests

### Project Structure
- **Layout System**: Sidebar + Navbar layout with main content area
- **Path Aliases**: Configured in tsconfig.json with `@` prefixes:
  - `@components/*` → `src/components/*`
  - `@pages/*` → `src/pages/*`
  - `@styles/*` → `src/styles/*`
  - `@theme/*` → `src/theme/*`
  - `@types/*` → `src/types/*` (note: currently moved to `src/interfaces/`)
  - Additional aliases for assets, constants, data, routes

### Key Architectural Patterns
- **Component Organization**: Separated into `common` (reusable) and `layout` components
- **Styling Approach**: Mix of styled-components and MUI theme system
- **Data Fetching**: Custom hooks `useGet` and `usePost` wrapping React Query
- **Theming**: Centralized theme with custom colors, typography, and component overrides
- **Routing**: Private route wrapper pattern with layout composition

### Current State
- Main feature: Orders management (OrdersInProgress page)
- Uses custom Table, Pagination, Select, Button components
- Font integration: Inter font family with multiple weights
- Environment-based API configuration via `REACT_APP_BASE_URL`

### Development Notes
- Git hooks configured with Husky for pre-commit linting
- Prettier + ESLint integration with lint-staged
- Type interfaces located in `src/interfaces/` (not `src/types/`)
- Base API URL configured through environment variables