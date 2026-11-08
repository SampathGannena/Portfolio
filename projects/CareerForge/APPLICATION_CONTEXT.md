# CareerForge Pro - Agent Application Context

## 1. Application identity

- **Product name:** CareerForge Pro
- **Repository/project name:** AI Resume Architect & ATS Optimizer
- **Application type:** Authenticated full-stack web application
- **Primary purpose:** Help job seekers create, tailor, evaluate, and export resumes that are easier for Applicant Tracking Systems (ATS) and recruiters to understand.

CareerForge Pro combines a resume editor, AI-assisted job-specific optimization, ATS-style scoring, resume templates, cover-letter generation, and subscription limits in one workflow.

## 2. Problem solved

Job seekers commonly have to:

1. Rewrite the same resume for every job application.
2. Guess which terms from a job description matter to an ATS.
3. Identify missing skills and keywords manually.
4. Convert unstructured resumes into a consistent, professional format.
5. Create a matching cover letter separately.
6. Produce a final document without losing formatting.

These tasks are time-consuming, inconsistent, and easy to get wrong. A resume may contain relevant experience but still perform poorly when its wording does not match the target job description or when important information is difficult for an ATS to parse.

CareerForge Pro solves this by accepting an existing resume and a target job description, then using AI to:

- Parse resume text into structured resume data.
- Identify relevant and missing job-description keywords.
- Rewrite summary, experience bullets, projects, and skills while preserving factual content.
- Calculate an ATS-style score and an optimized score.
- Provide suggestions for further improvements.
- Present the result in editable, ATS-friendly templates.
- Generate and export a targeted cover letter.

The application improves alignment and presentation; it must not invent employers, education, dates, achievements, or metrics.

## 3. Main user workflow

### Resume optimization

1. User signs in or creates an account.
2. User opens the builder.
3. User uploads a PDF, DOCX, TXT, or Markdown file, or pastes resume text.
4. User pastes the target job description.
5. User starts optimization.
6. The backend sends the resume and job description to the AI service.
7. The AI returns structured resume data, keyword analysis, scores, and suggestions.
8. The result is saved to the user's resume record.
9. User opens the editor to review and modify the content.
10. User reviews ATS feedback, missing keywords, and rewrite suggestions.
11. User selects a template and exports the final resume as a PDF.

### Resume editing

The editor supports:

- Contact details, headline, summary, experience, education, skills, and projects.
- Live resume preview.
- Multiple resume templates, including premium templates.
- Manual editing and autosave/update behavior.
- ATS score recalculation from current resume content.
- AI ATS boosting and suggestion application.
- Comparison of changed bullets where available.
- PDF export.

### Cover-letter generation

1. User selects a saved resume.
2. User supplies a target job description and optional company information.
3. User chooses a tone such as professional, enthusiastic, concise, warm, or confident.
4. AI generates the cover letter.
5. User edits and saves it.
6. User can download it as TXT, PDF, or DOCX.

## 4. Core capabilities

### AI capabilities

The backend AI service currently defines prompt flows for:

- `parse-resume`: Convert resume text into structured JSON.
- `rewrite-resume`: Compare a resume with a job description and return optimized resume data, scores, keywords, missing keywords, and suggestions.
- `boost-ats`: Improve a saved resume using missing keywords.
- `apply-suggestion`: Apply one selected improvement to the current resume.
- `generate-cover-letter`: Generate a structured cover letter from resume data and a job description.

The AI integration uses the Groq SDK. AI responses are expected to be JSON and are normalized defensively before being used by the frontend.

### ATS analysis

ATS analysis is intended to show:

- Current ATS score.
- Optimized score.
- Relevant keywords.
- Missing keywords.
- Section or content feedback.
- Suggested rewrites.

The frontend also calculates a live score from the currently edited resume so the displayed score can reflect manual changes.

### Accounts, plans, and limits

- Protected features require an authenticated user.
- Resume and cover-letter records belong to the authenticated user.
- Free users are subject to configured resume and cover-letter limits.
- Pro users receive expanded access, including premium templates and AI features gated as Pro.
- Billing and subscription state are handled through the backend subscription/billing APIs, with Stripe support and local development fallback behavior.

## 5. Technical architecture

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- React Query
- Tailwind CSS and Radix-based UI components
- Vitest and Testing Library
- `mammoth` for DOCX text extraction
- `pdfjs-dist` for PDF text extraction
- `jspdf`, `html2canvas`, and `docx` for client-side document export

The frontend lives in `Frontend/` and is a single-page application.

### Backend

- Node.js
- Express
- MongoDB through Mongoose
- JWT authentication
- Groq SDK for AI requests
- Stripe for billing
- Express rate limiting
- Multer and file parsing support

The backend lives in `server/`.

### Request flow

```text
Browser
  -> React page/component
  -> frontend API helper
  -> Express route
  -> authentication and plan-limit middleware
  -> controller
  -> Mongoose model and/or AI service
  -> JSON response
  -> editor/dashboard state
```

The backend applies CORS, JSON body limits, API rate limiting, authentication middleware, and centralized error handling.

## 6. Important routes

### Frontend routes

The main protected screens include:

- `/dashboard` - saved resumes and cover letters
- `/builder` - upload/paste resume and target job description
- `/editor/:id` - edit, analyze, preview, and export a resume
- `/cover-letter` - create a cover letter
- `/cover-letter/:id` - edit an existing cover letter
- `/billing` - subscription and plan management

Authentication screens and public landing-page sections are also present.

### Backend API routes

- `/api/auth` - registration, login, current-user/session behavior
- `/api/resumes` - resume CRUD, rewrite, parsing, ATS boost, and suggestions
- `/api/cover-letters` - cover-letter CRUD and generation
- `/api/subscription` - subscription state and entitlements
- `/api/billing` - checkout and webhook handling
- `/api/health` - service health check

Important resume endpoints include:

- `GET /api/resumes`
- `GET /api/resumes/:id`
- `POST /api/resumes`
- `PUT /api/resumes/:id`
- `DELETE /api/resumes/:id`
- `POST /api/resumes/rewrite`
- `POST /api/resumes/parse-upload`
- `POST /api/resumes/boost-ats`
- `POST /api/resumes/apply-suggestion`

## 7. Key implementation locations

- `Frontend/src/pages/Builder.tsx` - resume/JD input and optimization entry point
- `Frontend/src/pages/Editor.tsx` - resume editor, template selection, ATS review, and export
- `Frontend/src/pages/Dashboard.tsx` - saved document management and score summaries
- `Frontend/src/pages/CoverLetter.tsx` - cover-letter generation, editing, and downloads
- `Frontend/src/components/resume/AtsPanel.tsx` - ATS feedback UI
- `Frontend/src/components/resume/ResumePreview.tsx` - rendered resume preview
- `Frontend/src/components/resume/templates/` - resume template implementations
- `Frontend/src/lib/atsScore.ts` - live ATS scoring logic
- `Frontend/src/lib/fileParser.ts` - uploaded resume text extraction
- `Frontend/src/lib/pdfExport.ts` - resume PDF export
- `Frontend/src/lib/api/resume.ts` - typed resume API client
- `Frontend/src/lib/api/coverLetter.ts` - typed cover-letter API client
- `server/src/services/aiService.js` - AI prompt definitions and response normalization
- `server/src/controllers/resumeController.js` - resume and AI workflow orchestration
- `server/src/controllers/coverLetterController.js` - cover-letter workflow
- `server/src/middleware/auth.js` - JWT protection
- `server/src/middleware/limits.js` - free/pro access limits
- `server/src/models/` - MongoDB data models
- `server/src/routes/` - Express route definitions

## 8. Data and behavior rules for future agents

1. Preserve user-provided facts. AI rewrites may improve wording but must not fabricate claims.
2. Keep resume data compatible with both normalized editor shape and legacy AI response shapes; adapters currently exist for this purpose.
3. Keep all user-owned records scoped to the authenticated user.
4. Apply plan limits consistently in both UI behavior and backend enforcement.
5. Keep ATS scoring explainable. Do not silently replace a score with a successful-looking fallback when analysis fails.
6. Maintain JSON-only contracts for AI prompt types and validate/normalize model output.
7. Preserve editable content before export; PDF/DOCX output is derived from saved or current content.
8. Reuse existing API helpers, types, adapters, UI components, and notification patterns before adding new abstractions.
9. Treat `PRODUCTION_BLUEPRINT.md` as planned architecture; verify the current implementation before assuming a planned service or endpoint exists.
10. Avoid exposing API keys, JWT secrets, database credentials, Stripe secrets, or AI credentials in frontend code or committed files.

## 9. Local development

### Backend

```bash
cd server
npm install
npm run dev
```

Configure `server/.env` from `server/.env.example`, including the MongoDB connection, JWT secret, and AI configuration required by the current environment.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`. The backend port is controlled by `PORT` and commonly runs at `http://localhost:5000`.

### Validation

```bash
cd Frontend
npm test
npm run build
```

For frontend linting:

```bash
cd Frontend
npm run lint
```

## 10. Product terminology

- **ATS:** Applicant Tracking System used by employers to parse, filter, and rank applications.
- **ATS score:** A heuristic match/readiness score based on resume content and job-description alignment.
- **Optimized score:** The projected or resulting score after AI-assisted changes.
- **Keyword:** A skill, technology, responsibility, or phrase extracted from a target job description.
- **Resume data:** The structured representation used by the editor and templates.
- **AI result:** The stored analysis/rewrite response associated with a resume.
- **Template:** A visual resume layout; templates should remain readable and ATS-friendly.
- **Free/Pro:** Subscription entitlements that control limits and premium features.

## 11. Agent task framing

When modifying this project, first identify whether the task affects:

- Resume input/parsing
- AI prompt or response normalization
- ATS scoring
- Editor state and autosave
- Template rendering or export
- Cover letters
- Authentication, ownership, or plan limits
- Billing/subscription behavior

Then trace the complete path from UI to API/controller/service/model and back. Make the smallest complete change, update related types and tests, and run the narrowest relevant frontend or backend validation command.
