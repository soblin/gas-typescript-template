# AGENTS.md

## Language/Framework

- Node.js
- GAS (google-app-script)
  - in TypeScript
  - `clasp`
    - for connecting to Drive and Apps Script
    - for calling functions on the Cloud side and fetching the result
    - for managing credentials
- Jest (test framework)
- GCP (for remote function call)
- npm

## Rules for development

### In the first setup or startup session

When you create a new project from this template,

1. run `/plan-project-requirement` to create `docs/` and decide GAS permission scope
2. run `/initial-env-cred-setup <permission scope description>`

When the user or Agent uses the `clasp` command, the credentials may have expired since the last session's usage. It is recommended to call

```bash
clasp login --creds creds.json
```

just once before (re)starting the development.

### New features

When the user explicitly calls `add-feature` or the user prompt triggers development, the Agent should act as follows.

1. Refer to and align with `docs/`
2. If the given task ranges across multiple features or can consist of different phases (like `feat`, `refactor`, `chore`), divide the task into smaller ones with proper granularity and organize them in an effective order
3. For each task, use the `add-feature` command and process it in parallel if possible. Before starting the task, wait for the review and approval from the user. Note that the `clasp run` and `npm test` commands can access Google Cloud Platform. Therefore they should not be called simultaneously when multiple Agents are running. (`jest` can be called concurrently if the tasks are properly isolated by `git worktree`, as specified in the `add-feature` command.)

### Unit tests

There are two kinds of tests.

#### local unit test

This is the unit test in the normal sense and is executed in the local environment. One should test functions that do not need access to remote resources.

`Jest` is used as the testing framework, and this test targets the `./test` folder.

```bash
jest
```

#### remote unit test

This test is called by

```bash
clasp run test
clasp tail-logs
```

and checked to see if the array in the logs contains a successful test result, as follows:

```txt
Array
  #hello-world
    ✓ hello-world
```

Since the test result needs to be fetched remotely and does not have a return code, one has to read the log to check pass/fail.

The entry point of this test is `src/test.ts`, and this test can have access to remote test resources (like the `test/` folder containing test data, the `"test"` tab in the project spreadsheet, etc.). Then it is possible to test GAS-specific functionality and the side effects on the resource (e.g. if the file is created with the correct name under the correct folder, if an expected value is stored in the specified cell on a spreadsheet tab, etc.).

One should take care not to break existing project resources while manipulating the remote resources. When one considers adding this test, it is recommended to have

- `initRemoteTest()`: initializes/creates test resources
- This test uses that resource and checks if the expected change (or side effect) happens to the data
- `tearDown()`: clears/removes the test resources

`src/test.ts` must use the test utility functions in `src/utest` so that it can be compiled into a GAS script. Note that `src/test.ts` is bundled into a `global.test` function in `src/index.ts`, pushed to remote, and `global.test` can be called by `clasp run test` from the CLI (of course, the "test" function can be selected).
