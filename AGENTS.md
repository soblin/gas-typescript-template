# AGENTS.md

## Language/Framework

- Node.js
- GAS (Google Apps Script)
  - in TypeScript
  - `clasp`
    - for connecting to Drive and Apps Script
    - for calling functions running in the cloud and fetching their results
    - for managing credentials
- Jest (test framework)
- GCP (for remote function calls)
- npm

## Rules for development

### In the first setup or startup session

When you create a new project from this template,

1. run `/plan-project-requirement` to create `docs/` and decide GAS permission scope
2. run `/initial-env-cred-setup <permission scope description>`

When the user or Agent uses the `clasp` command, the credentials may have expired since they were last used. We recommend running

```bash
clasp login --creds creds.json
```

once before (re)starting development.

### New features

When the user explicitly calls `add-feature` or the user prompt triggers development, the Agent should act as follows.

1. Refer to and align with `docs/`
2. If the given task spans multiple features or consists of different phases (e.g., `feat`, `refactor`, `chore`), break it into smaller tasks with appropriate granularity and organize them in an effective order
3. For each task, use the `add-feature` command and process it in parallel if possible. Before starting the task, wait for the user's review and approval. Note that the `clasp run` and `npm test` commands can access Google Cloud Platform. Therefore, they should not be run simultaneously when multiple Agents are active. (`jest` can be run concurrently if the tasks are properly isolated by `git worktree`, as specified in the `add-feature` command.)

### Unit tests

There are two kinds of tests.

#### local unit test

This is a standard unit test that runs in the local environment. One should test functions that do not need access to remote resources.

`Jest` is used as the testing framework, and these tests target the `./test` folder.

```bash
jest
```

#### remote unit test

This test is invoked with

```bash
clasp run test
clasp tail-logs
```

and its result is checked by inspecting the logs to see whether the array contains a successful test result, as follows:

```txt
Array
  #hello-world
    ✓ hello-world
```

Since the test result must be fetched remotely and there is no return code to check, one has to read the logs to determine pass/fail.

The entry point of this test is `src/test.ts`, and this test has access to remote test resources (such as the `test/` folder containing test data, the `"test"` tab in the project spreadsheet, etc.). This makes it possible to test GAS-specific functionality and its side effects on those resources (e.g., whether a file is created with the correct name in the correct folder, or whether an expected value is stored in the specified cell of a spreadsheet tab, etc.).

One should take care not to break existing project resources while manipulating remote resources. When adding this kind of test, it is recommended to include

- `initRemoteTest()`: initializes/creates test resources
- the test itself, which uses those resources and checks whether the expected change (or side effect) occurs in the data
- `tearDown()`: clears/removes the test resources

`src/test.ts` must use the test utility functions in `src/utest` so that it can be compiled into a GAS script. Note that `src/test.ts` is bundled into a `global.test` function in `src/index.ts`, pushed to remote, and `global.test` can be invoked by running `clasp run test` from the CLI (naturally, `test` is the function you select when running `clasp run`).
