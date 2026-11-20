# TypeScript OOP Notes Example

A console-based TypeScript and Node.js project demonstrating classes, inheritance, access modifiers, relationships between objects, and generic types.

![Class diagram](./Class%20Diagram.png)

## Demonstrated Concepts

### Object-Oriented Programming

- `User` is a base class with public, protected, and private members.
- `Admin` inherits from `User` and overrides `displayInfo()`.
- `Admin.manageNotes()` removes a note from a notebook.
- `Note` stores its author and keeps a matching `userId`.
- `NoteBook` owns a collection of notes and creates note IDs.
- `User` aggregates notebooks by storing references to them.
- `Storage<T>` provides generic add, remove, and retrieval operations.

### TypeScript Features

- Strict type checking
- Readonly properties
- Getters and setters
- Protected and private fields
- Method and constructor overrides
- Generic classes
- ESNext and NodeNext module configuration
- Runtime age validation

## Project Structure

```text
.
├── src/
│   └── index.ts       # Classes and example application logic
├── .gitignore         # Ignored dependencies, build output, and local files
├── package.json       # Project metadata and npm scripts
├── package-lock.json  # Exact npm dependency versions
├── tsconfig.json      # Strict TypeScript compiler configuration
├── Class Diagram.png  # UML-style class diagram
└── readme.md          # Project documentation
```

## Classes

### `User`

Stores basic user information and notebooks associated with the user.

- Valid ages range from 18 through 60.
- Invalid ages throw an `Error`.
- `addNotebook()`, `removeNotebook()`, and `getNotebooks()` manage notebook aggregation.
- `displayInfo()` prints the user's details.

### `Admin`

Extends `User` and adds note-management behavior.

- Calls `super.displayInfo()` before printing admin-specific contact information.
- Removes notes through `manageNotes()`.

### `Note`

Represents a note title and content.

- Links to a `User` as `author`.
- Copies the author's ID into `userId`.
- `preview()` returns up to 20 characters followed by `...` when content is longer.

### `NoteBook`

Represents a notebook that contains notes.

- Creates notes with incrementing IDs.
- Returns a copy of the note collection.
- Removes notes by ID.

### `Storage<T>`

Provides a reusable in-memory collection for any type.

The example program uses both `Storage<number>` and `Storage<User>`.

## Example Output

Running the project prints user and admin information, age-validation errors, note previews, remaining note counts, number storage results, and the number of stored users.

```text
User #1 | Name: Abdelrahman | Email: abd@example.com | Phone: 01000000000 | Age: 24
User #2 | Name: Sara | Email: sara@example.com | Phone: 01111111111 | Age: 30
(Admin contact: 01111111111)
Error: Age must be between 18 and 60
Note 1 by Abdelrahman (userId 1): Classes, generics an...
Note 2 by Abdelrahman (userId 1): Inheritance, composi...
Admin Sara is removing note 1 from "Study Notes"
Notes left: 1
Numbers: [ 20 ]
Users stored: 2
```

The exact note previews may be shortened according to the `preview()` method.

## Requirements

- Node.js 18 or later
- npm

## Installation

Install the locked dependencies:

```bash
npm install
```

Or, for a lockfile-only install:

```bash
npm ci
```

## Running the Project

Start the source in watch mode:

```bash
npm run dev
```

Build and run the compiled JavaScript:

```bash
npm run build
npm run start
```

## Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `tsx watch src/index.ts` | Run and reload the TypeScript entry point |
| `build` | `tsc` | Compile `src` into `dist` |
| `start` | `node dist/index.js` | Run the compiled application |
| `typecheck` | `tsc --noEmit` | Check types without emitting files |
| `concurrently` | `concurrently "tsc -w" "node --watch dist/index.js"` | Run watch compilation and output watching together |

## TypeScript Configuration

The project uses strict compiler settings, including:

- `rootDir`: `src`
- `outDir`: `dist`
- `module`: `nodenext`
- `target`: `esnext`
- `strict`: enabled
- `noUncheckedIndexedAccess`: enabled
- `exactOptionalPropertyTypes`: enabled
- `verbatimModuleSyntax`: enabled
- `isolatedModules`: enabled

No test runner or test script is currently configured.