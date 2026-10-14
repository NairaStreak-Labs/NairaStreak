# Contributing to NairaStreak

Welcome to **NairaStreak**! We are building a non-custodial savings consistency and goal-tracking platform (Group 8B team project).

This guide outlines our team development workflow, branch hygiene, AI tooling standards, code review procedures, and security non-negotiables.

---

## 1. Core Principles & Attribution

1. **Read `AGENTS.md` First**: All engineering and product work must strictly respect [`AGENTS.md`](./AGENTS.md).
2. **Original Author Attribution**: The project origin must never be erased. Maintain attribution to Zuokemefa Oyinmiebi Peter (Learn2Earn) and the original prototype (see [`docs/ORIGIN_AND_ATTRIBUTION.md`](./docs/ORIGIN_AND_ATTRIBUTION.md)). Never overwrite, redirect, or redeploy `https://500ksavgoal.netlify.app`.
3. **Keep `index.html` Edits Minimal**: Most legacy application logic resides in `index.html`. Parallel edits cause severe merge conflicts. **Place all new logic in separate modular files** (e.g. `js/`, `tests/`, `supabase/migrations/`, `docs/`) and keep `index.html` changes strictly to minimal function calls or mount points.
4. **AI Tooling Responsibility**: If you use an AI coding assistant (Antigravity `agy`, Claude Code, Codex, Cursor), you are personally responsible for inspecting, testing, and understanding every line of code submitted.

---

## 2. Claiming an Issue

Each team contributor claims exactly one issue at a time:

1. Browse open issues with the label `team-contribution` on GitHub.
2. In the issue discussion, post:
   > *I would like to work on this issue.*
3. Wait for confirmation from the maintainer before starting work.
4. Each issue has a single primary owner.

---

## 3. Contributor Setup & Workflow

### 3.1 Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/NairaStreak-Labs/NairaStreak.git
   cd NairaStreak
   ```
2. Ensure you are on the latest `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
3. Create your feature branch following conventional naming:
   ```bash
   git checkout -b <type>/<short-description>
   # Examples:
   # feat/core-calculation-engine
   # fix/settings-input-validation
   # test/playwright-e2e-suite
   ```

### 3.2 AI Agent Setup
If using an AI coding agent, run it from the repository root:
- **Antigravity CLI**: `agy` (no optional plugins or paid tiers required).
- **Claude Code / Codex / Cursor**: Point the agent to `AGENTS.md` and paste the "Suggested coding-agent prompt" provided in your assigned GitHub issue.
- Verify the agent does not touch unrelated files or invent dependencies.

### 3.3 Verification & Quality Gate
Before staging or committing:
1. Run all relevant unit and integration tests:
   ```bash
   node --test tests/test_calculations.js
   ```
2. Verify git status and check for accidental whitespace or formatting issues:
   ```bash
   git status
   git diff --check
   ```
3. Inspect `git diff` thoroughly to ensure no secrets or debug statements are staged.

---

## 4. Secrets & Security Non-Negotiables

Never commit or log sensitive data (AGENTS.md §13):
- Supabase secret / service-role keys
- Database passwords
- Private authentication credentials or JWT tokens
- Personal access tokens

Always use environment variables for private credentials and test using `.env.example` placeholders.

---

## 5. Commit & Rebase Policy

1. Use conventional commit messages matching your issue:
   ```bash
   git commit -m "feat(core): extract shared savings calculations into a tested module"
   ```
2. Push your feature branch:
   ```bash
   git push -u origin <branch-name>
   ```
3. **Rebase Before Merge**: Before your pull request is merged, always rebase onto the latest `origin/main` to ensure a clean linear history:
   ```bash
   git fetch origin
   git rebase origin/main
   git push --force-with-lease origin <branch-name>
   ```
4. **One PR Merged at a Time**: The team merges pull requests sequentially. When a PR touching `index.html` is merged, subsequent open PRs must rebase on `main` and re-verify before merging.

---

## 6. Pull Request Rules & Review

1. Open a Pull Request into `main` with the title matching your issue and include `Closes #<number>` in the body.
2. The pull request template will automatically populate required fields.
3. Every PR requires:
   - Summary of what was changed and why.
   - Exact terminal test outputs demonstrating genuine execution (no fabricated results).
   - Responsive screenshots (at 390px and 1440px in light and dark modes) for any UI changes.
   - Security and accessibility verification notes.
   - The mandatory AI disclosure statement:
     > *AI tooling was used as an engineering assistant. The contributor reviewed, tested, and is responsible for the submitted changes.*
4. **Code Review**: A different team member must review and approve the PR before merge. **Do not merge your own Pull Request.**
5. Be prepared to answer the 3-5 technical questions listed in your issue's "Be prepared to explain" section during review.
