---
name: plan-project-requirement
description: Nail down the purpose/use-case/scope/requirement interactively and write down `docs/`
allowed-tools: Read, Write
---

# Summarize project requirements and plan development direction

With the designated framework defined in `AGENTS.md` and the user's requirements, the Agent is supposed to

- ask the user for missing information
- complement the user requirements from both general and technical perspectives
- propose how to realize the feature using GAS

Then summarize the requirements, breaking them down into the following documents

- user-story.md
  - High-level document describing what the user wants to do with this app
- use-case.md
  - Document describing possible use cases of this app
- design.md
  - High-level document describing the system input/output, UI, and test methods
- gas-setting.md
  - Document describing required APIs for GCP and permissions for GAS

to decide the development plan.
