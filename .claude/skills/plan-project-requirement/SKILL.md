---
name: plan-project-requirement
description: Nail down the purpose/use-cases/scope/requirements interactively and write them down in `docs/`
allowed-tools: Read, Write
---

# Summarize project requirements and plan development direction

With the designated framework defined in `AGENTS.md` and the user's requirements, the Agent should

- ask the user for missing information
- supplement the user's requirements from both general and technical perspectives
- propose how to implement the feature using GAS

Then summarize the requirements, breaking them down into the following documents

- user-story.md
  - High-level document describing what the user wants to do with this app
- use-case.md
  - Document describing possible use cases of this app
- design.md
  - High-level document describing the system's input/output, UI, and test methods
- gas-setting.md
  - Document describing the required GCP APIs and GAS permissions

to decide on the development plan.
