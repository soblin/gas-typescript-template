---
description: Use `/planning-with-files:plan` skill and implement given feature at best
---

# add-feature

## create steering directory

Let `feature-name` the simple abbreviation of given prompt(#ARGUMENTS), get current timestamp, and create `<project_root>/.steering/[YYYY-MM-DD-HH-MM]-<feature-name>` directory.

Plese create `.steering` directory at the original project folder, not inside the worktree folder, so that one can refer to past tasks for retrospective.

## create git worktree

Create a new `git worktree` with corresponding branch name(like `(feat|fix|refactor)/<feature-name>`)

## start development

Use `/planning-with-files:plan` skill and create planning files under the created steering directory.

Basically this skill delegates everything to `/planning-with-files:plan` but with the additional following requests:

- If all of the remaining incomplete tasks are considered to be infeasible due to following reasons, it is OK to leave them incomplete. If so, fill in them in `findings.md` and terminate the task
  - The task turns out to require changes to `docs/`
  - Current implementation is close to the limit
- If the picked-up task turns out to be too big, separate them into smaller tasks
- When each task is complete, verify the unit test passes and make a commit
