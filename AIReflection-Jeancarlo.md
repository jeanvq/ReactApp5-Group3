# AI Usage Reflection — Jeancarlo Ricardo

## How did you leverage AI in your components?

I used AI as a starting point rather than a final solution. The AI provided initial versions of `FilterBar.tsx` and `useLocalStorage.ts`, but I reviewed each file carefully and made changes to fit the actual project structure. For example, the first version of `FilterBar.tsx` used a regular `import { Filters }` statement, which caused a TypeScript error in VS Code. After investigating the error message, I understood that `Filters` is a TypeScript-only type and does not exist at runtime — so it requires `import type { Filters }` instead. I identified this issue myself and explained it back to the AI before applying the fix. That kind of back-and-forth made the process feel collaborative rather than just copying and pasting.

## How did you understand, verify, and adapt the code?

I used multiple methods to verify my code. For `useLocalStorage`, I manually tested it using the browser DevTools — I opened the Application tab, went to Local Storage, and confirmed that data was being saved and persisted across page refreshes. For `FilterBar`, I verified it visually by running the app and interacting with the dropdowns and search input in the browser.

For the automated tests, I ran `npx vitest run` and one test failed — the search input test expected `search: "react"` but received `search: "t"`. I understood why: because `FilterBar` is a controlled component and the `filters` prop never updates between keystrokes in the test environment, each character triggers a separate call with only that character. I fixed the test by typing a single character `"r"` instead, which made the assertion accurate. All 14 tests passed after that change.

## What did you learn or get better at by leveraging AI?

The biggest thing I levelled up on was using AI more effectively and intelligently. Instead of just asking for code and accepting it, I learned to question what the code does, read the error messages carefully, and understand the reasoning before applying a fix. I also deepened my understanding of a few specific concepts — `import type` vs regular `import` in TypeScript, lazy initialization in `useState` (passing a function instead of a value so it only runs once on mount), and how the spread operator works inside `handleChange` to update only one filter field while keeping the others unchanged. These are concepts I had seen before but never fully internalized until I had to apply and debug them in a real project context.
