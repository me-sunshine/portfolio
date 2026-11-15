---
title: "Intelligent Business Operations Assistant"
summary: A working prototype that turns a project request into tasks, risks and a draft stakeholder update using a local AI model, and waits for a person to approve each item before anything is saved.
date: 2026-11-15
status_note: Independent portfolio project. This prototype was built to demonstrate how I approach an AI implementation. It is not a commercial product and was not built for a client. All project data in it is synthetic.
image: /media/images/ops-assistant-preview.svg
image_alt: "Three steps: a project request, an AI draft with items labelled stated or AI suggestion, and human approval. Caption: the AI drafts, a person decides."
featured: true
order: 1
published: true
overview: |
  **AI-powered project coordination and stakeholder management.**

  A requester fills in a short form. A workflow passes the request to an AI model that runs on the same machine. The model extracts the objective, requirements, tasks, dependencies, risks and gaps, then drafts a project summary and a stakeholder update. A reviewer accepts, edits or rejects each item. Only accepted items become the project record, and every decision is logged.

  I defined the business problem and requirements, selected the tools against a zero budget, set the oversight rules and designed the test plan. The prototype was built with the help of an AI coding assistant, which is how I expect technology managers to work with engineering capacity: by specifying, reviewing and testing.
problem: |
  In many organisations a project starts as an email, a form or a spreadsheet row. Before any real work begins, someone has to:

  - read the request and work out what is actually being asked,
  - list the tasks, owners and deadlines,
  - spot what is missing, such as an owner, a budget or success criteria,
  - identify risks and dependencies,
  - write a summary and a first update for stakeholders.

  I did this work by hand for years while running multi-city programmes. It is repetitive, it depends on who does it, and gaps are often noticed late.
why_it_matters: |
  - **Late discovery is expensive.** A missing owner or an unconfirmed dependency found in week one costs a conversation. Found in week six, it costs a deadline.
  - **Inconsistency hides risk.** When every coordinator structures intake differently, leadership cannot compare projects.
  - **Coordinator time is limited.** Time spent re-typing a request into a tracker is time not spent with stakeholders.

  I have not measured how much time this prototype saves, so I make no claim about it. The test plan below describes how that would be measured.
solution: |
  An assistant that prepares the first draft of project intake and leaves every decision to a person.

  1. **Extraction.** The model pulls out the objective, requirements, tasks, suggested owners, deadlines, dependencies, risks and missing information.
  2. **Provenance.** Every item is labelled **stated** (the request says it, with the quote shown) or **AI suggestion** (the model inferred it). Fixed rules that involve no AI are labelled **system check**.
  3. **Summary and draft update.** A structured project summary and a draft stakeholder message.
  4. **Review.** Nothing is saved as fact, no owner is assigned and no deadline is set until a reviewer approves it.

  The assistant cannot send email or messages. An approved update is a record for a person to copy and send.
requirements: |
  | Business objective | Requirement in the prototype |
  |---|---|
  | Reduce repetitive administrative work | Automatic first draft of tasks, risks, summary and update |
  | Improve organisation of project information | One structure for every request: six item types, each with a status |
  | Faster project summaries | Summary generated with the extraction, in a fixed format |
  | Better visibility of outstanding tasks | Pending, accepted and rejected items visible per request |
  | More consistent stakeholder communication | Every update follows the same five headings |
  | Human oversight of AI output | Item-by-item approval, labels for AI content, audit log |

  Constraints I set: zero recurring cost, no data sent to a cloud AI service, synthetic data only, and nothing reachable from the internet.
architecture: |
  Three components run on one machine. The public portfolio you are reading is separate and does not depend on any of them.
architecture_diagram: /media/images/ops-assistant-architecture.svg
workflow: |
  1. The **review app** validates the form, stores the request, runs the fixed checks and calls the workflow.
  2. The **n8n workflow** makes three calls to the model: extract, summarise, draft the update. Each call must return data in a fixed structure.
  3. **Ollama** runs the language model locally.
  4. The workflow returns the result with a one-time token. The app stores every item as **pending**.
  5. The **reviewer** accepts, edits or rejects each item. Accepted items form the confirmed record. Each action is written to an append-only audit log.
tools: |
  | Component | Choice | Licence | Why |
  |---|---|---|---|
  | Workflow automation | n8n Community Edition 2.35 | Sustainable Use License: free to self-host, **not open source** | Widely used in industry; visual workflow a non-developer can read |
  | AI runtime | Ollama | MIT | Runs models locally, no usage fees, supports fixed output structures |
  | Language model | Qwen2.5 7B | Apache 2.0 | Runs on a laptop with about 8 GB of memory |
  | Review app | Python (FastAPI) | Open source | Keeps the approval and audit rules explicit and testable |
  | Storage | SQLite | Public domain | One file, no database server |

  I compared n8n with Activepieces (MIT core, commercial licence for enterprise features) and with plain Python automation. "Free to use" and "open source" are different claims, and I checked each project's licence file before choosing. Total recurring cost: zero.
methodology: |
  I ran the project in the phases I would use at work:

  1. **Business requirements** before any tool was chosen.
  2. **Technology selection** against cost, licence and data-privacy constraints.
  3. **Architecture** with the oversight controls designed in from the start.
  4. **Build** in small steps, each tested before the next.
  5. **Evaluation** on a prepared set of requests with a written answer key.
  6. **Documentation** of results and limitations, including what failed.

  After the first live run I made one revision to the model's instructions, because it had not attached a named person to their task. The evaluation showed that this weakness remained.
oversight: |
  | Risk | Control |
  |---|---|
  | An AI assumption is treated as fact | AI output is stored as pending and excluded from the project record until a person accepts it |
  | The model claims the request said something it did not | A "stated" label is kept only if the quoted text is really found in the request; otherwise the item is relabelled as a suggestion |
  | The model assigns an owner or deadline | Shown as a suggestion; applied only when the reviewer accepts, with the original proposal kept beside any edit |
  | A draft is sent to stakeholders by mistake | The system has no way to send anything. Approval only changes a status |
  | Decisions cannot be traced | Every submission, AI run, approval, edit and rejection is logged; the log cannot be changed or deleted |
  | The AI step fails or returns nonsense | The request is marked as failed with a clear message and can be retried; the rest of the app keeps working |
  | Confidential data reaches a third party | The model runs locally; no cloud AI service is used |
testing: |
  **Automated tests (29).** Valid and invalid input, missing information, malformed AI output, approval rules, audit log and error handling. These use a stand-in for the model, so they test the controls, not the AI.

  **End-to-end evaluation.** Eight synthetic project requests, each with an answer key written in advance: the facts the request states, and the gaps a project manager should notice. One request is deliberately vague. A script submits each request through the real workflow and compares the output with the key.

  **Human evaluation (designed, not yet run).** Correction rate, summary usefulness, and a timed comparison between manual processing and AI-assisted review. These need a person and are the next step.
results: |
  Measured on 15 November 2026 with Qwen2.5 7B on a 4-core machine without a graphics card. Sample: 8 synthetic requests.

  | Measure | Result |
  |---|---|
  | Workflow reliability | 8 of 8 requests completed |
  | Processing time per request | Median 298 seconds (275 to 358) |
  | Stated facts captured | 24 of 31 (77%) |
  | Missing information detected by the AI | 18 of 26 (69%) |
  | Missing information detected by AI plus fixed rules | 20 of 26 (77%) |
  | Automated tests | 29 of 29 pass |

  **Errors found, which the review step is there to catch:**

  - In 12 of 35 cases the model labelled an item "stated" but its quote did not match the request. The app relabelled all 12 as suggestions. Most were paraphrases, not inventions.
  - In all 6 requests that supplied a completion date, the model still listed a deadline as missing.
  - 4 of 20 suggested task owners were teams that the request never mentioned.
  - 7 of 8 summaries did not mark inferred content as instructed.

  **What worked consistently:** all 8 draft updates correctly said that no work had been completed. None invented progress.

  **Not measured:** time saved, summary usefulness and human correction rate. I make no productivity claim. Eight synthetic requests are also too few to generalise from.
lessons: |
  - **The controls mattered more than the model.** A small local model made errors in most requests. The design decision that paid off was treating its output as a draft from the start.
  - **Simple rules beat AI for simple checks.** "No completion date supplied" needs no language model, and the fixed rules caught gaps the model missed.
  - **Instructions are not guarantees.** The model was told to mark inferred content and to use only owners named in the request. It often did not. Anything that must hold has to be enforced in code, as the quote check is.
  - **Measure before claiming.** It would have been easy to write "saves hours per week". The honest result is a reliable five-minute draft with known error types, and a plan to measure the rest.
  - **Licences deserve a line in the business case.** The most popular automation tool in this space is free to use but not open source, which matters if a company later wants to embed or resell it.
future: |
  - Run the human evaluation: correction rate, usefulness scores and a timed manual baseline.
  - Fix the deadline false alarm by passing the supplied date to the model more explicitly, then re-test.
  - Compare a smaller and a larger model, and measure speed on a machine with a graphics card.
  - Test German-language requests.
  - Add sign-in for reviewers so the audit log records a verified identity.
  - Track a project over time, so status updates reflect real progress and not just the initial request.
screenshots:
  - image: /media/images/ops-assistant-01-intake-form.png
    caption: The intake form. Only four fields are required, so the assistant has gaps to find.
  - image: /media/images/ops-assistant-02-review-pending.png
    caption: The review screen. Each item shows whether it was stated in the request or suggested by the AI.
  - image: /media/images/ops-assistant-03-review-decisions.png
    caption: After review. One task was edited to add an owner, one was rejected, and the original AI proposal stays visible.
  - image: /media/images/ops-assistant-04-stakeholder-draft.png
    caption: The stakeholder update is a draft. The system cannot send it.
  - image: /media/images/ops-assistant-05-confirmed-record.png
    caption: The confirmed project record contains only what a person accepted.
  - image: /media/images/ops-assistant-06-audit-log.png
    caption: The audit log for one request.
links:
  - label: Source code, setup instructions and full test report on GitHub
    url: https://github.com/me-sunshine/ops-assistant/tree/prototype-build
---
