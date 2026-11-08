# GitGuard AI - Application Overview for Agents

## 1. Application identity

- **Name:** GitGuard AI
- **Type:** Automated GitHub pull-request security and code-review platform
- **Primary goal:** Detect meaningful risks in changed code and return actionable, fix-first feedback directly on pull requests.
- **Audience:** Development teams, security engineers, repository maintainers, and engineering managers.
- **Repository shape:** A Node.js/Express backend, a React/Vite frontend, MongoDB persistence, and automated tests.

## 2. Problem solved

Traditional code review is often:

- Manual and slow, especially when reviewers must inspect every changed file.
- Inconsistent across repositories and teams.
- Too broad, because tools may analyze the entire repository instead of the code that changed.
- Poor at turning a finding into an immediately usable fix.
- Difficult to measure operationally: teams may not know review latency, recurring findings, or overall PR risk.
- Vulnerable to duplicate work when a webhook is delivered more than once.

GitGuard AI solves this by automatically reacting to GitHub pull-request events, isolating the changed diff hunks, applying repository-specific rules, asking an AI model to analyze relevant changes, and posting structured review comments with explanations and corrected code suggestions.

## 3. Core value proposition

GitGuard AI makes pull-request security review:

1. **Automatic:** GitHub webhooks start analysis when a PR is opened, updated, or reopened.
2. **Focused:** Only changed files and changed hunks are analyzed.
3. **Actionable:** Findings include severity, category, explanation, and a suggested fix.
4. **Configurable:** Each repository can define strictness, security-first behavior, ignored files, comment limits, and explanation tone.
5. **Traceable:** Review runs, findings, risk scores, fingerprints, statuses, and processing timings are stored for later analysis.
6. **Team-friendly:** Dashboards, history, heatmaps, compliance views, tracker views, and repository chat expose the results to different roles.

## 4. End-to-end workflow

```text
GitHub pull request event
        |
        v
Webhook signature verification
        |
        v
Event/action filtering
        |
        v
Persistent webhook job queue
        |
        v
Replay guard and PR metadata lookup
        |
        v
Fetch changed files/diff from GitHub
        |
        v
Parse files into changed hunks and added line numbers
        |
        v
Apply repository rules and analysis limits
        |
        v
Groq AI analysis for eligible hunks
        |
        v
Normalize, filter, score, and fingerprint findings
        |
        v
Post one structured review with inline comments to GitHub
        |
        v
Persist run metrics and expose dashboard/API data
```

## 5. Main capabilities

### Pull-request analysis

- Handles GitHub `pull_request` events for `opened`, `synchronize`, and `reopened`.
- Verifies webhook authenticity with HMAC SHA-256.
- Fetches and parses GitHub patches into files, hunks, changed lines, and new-file line positions.
- Limits analysis to changed code rather than scanning the full repository.
- Posts inline review comments anchored to added lines when possible.
- Produces fix-first findings with corrected code blocks and explanations.

### Rules and controls

Repository settings can control:

- Whether analysis is enabled.
- Strict mode for broader and more cautious checks.
- Security-first mode for prioritizing security-sensitive changes.
- Ignoring lint/configuration files.
- Maximum hunks analyzed per PR.
- Maximum comments posted per PR.
- Explanation tone.

### Reliability and deduplication

- Webhook work is persisted as jobs with `queued`, `processing`, `completed`, and `failed` states.
- A replay guard prevents duplicate analysis for the same PR head SHA.
- Finding fingerprints help identify repeated or equivalent findings.
- Queue status can be queried by job ID.
- The worker supports graceful shutdown.

### Risk and operational analytics

- Findings receive severity and category metadata.
- Risk scores account for factors such as severity, security sensitivity, file path, and changed-line volume.
- Blast-radius information classifies likely impact.
- Review runs record fetch, AI, comment-posting, and total processing timings.
- Insights APIs support rolling health and trend metrics.

### User-facing product areas

The React frontend includes views for:

- Landing and authentication.
- Repository dashboard and pull-request scanning.
- Pull-request analysis details.
- Finding history.
- Security tracker.
- Risk heatmap.
- Compliance reports.
- Team analytics.
- Configuration/rules lab.
- Webhook monitor.
- Repository chat and finding discussions.
- Application and GitHub connection settings.

## 6. Architecture

### Backend

- **Runtime:** Node.js 18+
- **Framework:** Express
- **Persistence:** MongoDB through Mongoose
- **GitHub integration:** Octokit REST API and GitHub App/OAuth support
- **AI integration:** Groq API
- **Security middleware:** Helmet, CORS, raw-body capture, webhook signature verification
- **Authentication:** Password hashing and JWT-based sessions, with GitHub authentication support
- **Logging:** Winston

Important backend areas:

- `server/index.js`: Express bootstrap, middleware, routes, database connection, and queue worker lifecycle.
- `server/routes/`: HTTP route definitions for webhooks, auth, settings, chat, and queue operations.
- `server/controllers/`: Request handling and API orchestration.
- `server/services/diffAnalyzer.js`: Raw diff and hunk parsing.
- `server/services/rulesEngine.js`: Repository rule decisions and analysis limits.
- `server/services/aiService.js`: Groq prompts, retries, response parsing, and normalization.
- `server/services/commentService.js`: GitHub review comment formatting and posting.
- `server/services/webhookProcessor.js`: End-to-end pull-request processing.
- `server/services/jobQueue.js`: Persistent webhook job queue and worker.
- `server/services/reviewInsights.js`: Risk scores, fingerprints, and analytics.
- `server/models/`: Users, repository settings, review runs, webhook jobs, and chat messages.

### Frontend

- **Runtime:** React 18
- **Build tool:** Vite
- **Styling:** Tailwind CSS and application CSS
- **Motion/UI:** Framer Motion
- **Testing:** Playwright end-to-end configuration

The frontend calls the backend API, maintains authenticated repository context, and renders review data for engineers, security users, and team leads.

## 7. API surface

Key endpoints include:

- `GET /health`: Server health check.
- `POST /webhook`: Receives and validates GitHub webhook events.
- `POST /auth/register`: Creates a user and returns an auth token.
- `POST /auth/login`: Authenticates a user.
- `GET /auth/me`: Returns the current authenticated user.
- `GET|PUT /settings/:owner/:repo`: Reads or updates repository rules.
- `GET /settings/:owner/:repo/history`: Returns previous review runs.
- `GET /settings/:owner/:repo/insights`: Returns repository review insights.
- `GET /settings/:owner/:repo/pulls`: Lists repository pull requests.
- `POST /settings/:owner/:repo/pulls/:prNumber/scan`: Starts a manual scan.
- `GET /queue/jobs/status`: Returns queue job status.
- `/chat/...`: Loads and manages PR review discussions and replies.

## 8. Configuration and required integrations

The backend expects environment configuration for:

- `PORT`
- `MONGODB_URI`
- `GITHUB_TOKEN` and/or GitHub App/OAuth credentials
- `WEBHOOK_SECRET`
- `AUTH_JWT_SECRET`
- `GROQ_API_KEY`
- `GROQ_MODEL`

Secrets must remain in environment variables or a secure secret manager. They must never be committed to source control or included in frontend bundles.

## 9. Agent operating instructions

When an agent works on this application:

1. Treat GitHub webhook processing, diff analysis, AI analysis, comment posting, and persistence as one connected workflow.
2. Preserve the diff-only behavior; do not silently expand analysis to full repositories.
3. Preserve webhook signature verification and authentication boundaries.
4. Keep replay protection and finding deduplication intact.
5. Respect repository settings and analysis caps when changing review behavior.
6. Keep AI output normalized and validated before it reaches GitHub or the UI.
7. Surface errors through the existing logger/error-handler patterns; do not hide failures behind successful-looking responses.
8. Update backend routes, frontend consumers, models, and tests together when an API contract changes.
9. Prefer targeted tests for diff parsing, rules, queue behavior, insights, and webhook processing.
10. Do not expose tokens, webhook secrets, or AI credentials in logs, responses, or client-side code.

## 10. Verification commands

From the repository root:

```powershell
npm run check:server
npm test
```

For the frontend:

```powershell
Set-Location .\frontend
npm run build
npm run test:e2e
```

## 11. Scope boundaries

GitGuard AI is an automated review assistant, not a replacement for human approval. Its findings should support engineering and security decisions, while maintainers remain responsible for validating fixes, understanding business context, and approving or rejecting pull requests.

