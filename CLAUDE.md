# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Architecture

This is a GitHub Action for posting to Bluesky Social using the AT Protocol. The
action is built with Node.js ES modules and follows a modular architecture:

- **src/index.js**: Main entry point that orchestrates the posting flow
- **src/agent.js**: Handles AT Protocol agent creation and authentication
- **src/post.js**: Creates rich text posts with automatic facet detection
  (links, mentions)
- **src/validate.js**: Validates post records against AT Protocol schemas

The action uses the official `@atproto/api` package for Bluesky integration and
`@actions/core` for GitHub Actions functionality.

## Common Commands

### Development

- `npm test` - Run tests using Node.js built-in test runner
- `npm run lint` - Lint code with ESLint
- `npm run build` - Build action for distribution using ncc
- `npm start` - Run the action locally

### Building

- The action must be built with `npm run build` before commits to update
  `dist/index.js`
- The build process uses `@vercel/ncc` to bundle everything into a single file

### Testing

- Tests use Node.js built-in test runner (no external framework)
- Local testing can be done with [act](https://github.com/nektos/act):
  ```bash
  act -P node:16-buster-slim workflow_dispatch -e payload.json --secret-file .secrets
  ```

## Environment Variables

The action requires these environment variables:

- `BSKY_IDENTIFIER`: Bluesky username/handle
- `BSKY_PASSWORD`: Bluesky app password

## Code Style

- ES modules are used throughout
- Prettier formatting is enforced via lint-staged
- ESLint configuration is in eslint.config.js (flat config format)
- Husky manages pre-commit hooks
