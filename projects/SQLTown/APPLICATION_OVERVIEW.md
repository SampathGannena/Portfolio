# SQLTown Application Overview

## 1. What is SQLTown?

SQLTown is an interactive SQL learning and practice platform. It combines:

- Structured SQL lessons and documentation
- A browser-based SQL playground
- A hands-on practice environment
- Interview-style SQL questions
- Progress tracking and authenticated user accounts
- A city-building game that makes database concepts visible and motivating

The central idea is simple: instead of learning SQL only by reading theory, users write queries, see the results, solve realistic problems, and build a virtual city as they progress.

## 2. Purpose of the Application

SQLTown was created to make SQL and database learning more practical, engaging, and easier to remember.

Many learners understand SQL syntax when they see examples, but struggle when they need to:

- Choose the correct query for a real problem
- Understand how tables and relationships work together
- Practice without access to a prepared database
- Identify and correct SQL errors
- Stay motivated through a long learning path
- Prepare for SQL interviews using realistic questions

SQLTown addresses these challenges by turning SQL learning into an interactive experience. A user can read a concept, execute a query against a database, inspect the schema, solve a challenge, and receive a visible result in the learning game.

## 3. The Problem SQLTown Solves

### Traditional SQL learning can be too theoretical

Books and videos are useful for explaining concepts, but they do not always provide enough opportunities to write and test queries. SQLTown provides an executable environment where users can immediately apply what they learn.

### Practice environments are often difficult to set up

New learners may spend more time installing a database, importing sample data, and configuring tools than practicing SQL. SQLTown includes browser-based SQL execution for playground and game activities, reducing setup friction.

### SQL concepts can feel disconnected

Commands such as `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, joins, and aggregations may feel like isolated syntax rules. SQLTown connects these actions to database schemas, query output, problem-solving tasks, and city progression.

### Learners need feedback while solving problems

The application provides query results, execution errors, test-case results, and progress status. Interview submissions can be evaluated against visible and hidden test cases, helping users understand whether a solution works beyond one example.

### Motivation can decrease over time

SQLTown uses game mechanics such as levels, XP, coins, quests, buildings, and a growing city. These mechanics provide short-term goals and visible progress while the user develops a long-term technical skill.

### Interview preparation needs more than a question list

The interview area supports filtering, searching, sorting, pagination, difficulty levels, topics, companies, submission status, and user progress. This helps users organize practice instead of randomly attempting questions.

## 4. Who Will Benefit from SQLTown?

### Beginners learning SQL

Beginners can start with documentation and guided learning paths, then move to simple queries in the playground and game levels. The visual city-building model helps explain how database actions create or change data.

### Students and academic learners

Students can use SQLTown to reinforce classroom topics such as:

- Data definition language (DDL)
- Data manipulation language (DML)
- Filtering and sorting
- Joins
- Aggregations
- Subqueries
- Set operators
- String and date functions
- Indexes and database fundamentals

### Developers and data professionals

Developers, analysts, QA engineers, and other professionals can use the playground and practice areas to refresh SQL skills, experiment with queries, and work through realistic database questions.

### Job seekers preparing for interviews

The interview section provides a structured way to practice SQL problems by difficulty, topic, company, and completion status. Submitted solutions and progress summaries help users monitor preparation.

### Instructors and training programs

SQLTown can support classroom demonstrations, guided exercises, self-paced assignments, and database fundamentals training. The combination of explanations, execution, and visual feedback can make abstract topics easier to teach.

### Users who prefer visual and game-based learning

The city dashboard, buildings, quests, rewards, and progression system are designed for users who learn better through interaction, experimentation, and visible outcomes.

## 5. Main Application Features

### 5.1 Dashboard and city visualization

The dashboard presents a virtual city that represents learning progress. City elements can correspond to SQL activities and game levels, allowing users to see their progress instead of viewing it only as a percentage or checklist.

The game data model includes concepts such as:

- Cities
- Buildings
- Quests
- Achievements
- XP and coins
- Level progression
- Leaderboards

### 5.2 SQL learning paths

Learning paths organize SQL education into chapters and lessons. The application includes beginner, intermediate, and advanced learning-path concepts, with lesson counts, estimated time, difficulty labels, and progress indicators.

### 5.3 Interactive SQL documentation

The documentation area covers SQL and database topics through dedicated pages. It includes topics such as:

- Introduction to SQL
- MySQL basics
- `SELECT` queries
- Filtering and sorting
- DDL and DML
- CRUD operations
- Joins
- Aggregations
- `CASE WHEN`
- Subqueries
- Set operators
- String functions
- Date and time functions
- NULL functions
- Indexes
- Sample databases

Documentation is paired with code examples and SQL-oriented learning components so users can move from explanation to practice.

### 5.4 Browser-based SQL playground

The playground provides a three-panel database workspace:

1. A schema browser for inspecting tables
2. A SQL editor for writing queries
3. An output panel for viewing results and errors

Users can run queries, format SQL, reset the workspace, resize panels, hide panels, and inspect table data. The browser-side SQL engine uses SQL.js and an in-memory SQLite database, which makes experimentation fast and isolated.

### 5.5 SQL game levels

Game levels connect SQL commands to city changes. Examples include:

- Creating a database to start a city
- Creating a table to create a building foundation
- Inserting rows to populate a building
- Counting records to display an occupancy indicator
- Updating records to upgrade a building

Each level can define a schema, expected command or result, difficulty, XP reward, coin reward, and city change.

### 5.6 Practice databases and schema exploration

The practice area includes database-oriented exercises with tools for:

- Viewing tables and data
- Exploring entity relationships
- Generating or viewing ER diagrams
- Finding join paths
- Reviewing query libraries
- Inspecting query coverage
- Working with realistic database scenarios

This helps users progress from isolated SQL examples to multi-table problem solving.

### 5.7 Interview preparation

The interview section loads SQL questions and supports:

- Search by question title
- Filtering by topic, company, difficulty, and status
- Sorting question columns
- Pagination
- Difficulty-based progress
- Accepted, rejected, and in-progress submissions
- Submission statistics and summaries
- Discussion posts and replies for questions

The backend evaluates solutions using test cases, including hidden test cases for submission validation.

### 5.8 Authentication and user progress

Users can create an account, sign in, sign out, and continue a session using token-based authentication. Authenticated features can store question submissions and learning progress on the server.

The application supports:

- Email and password signup
- Email and password login
- JWT-based session handling
- OAuth callback handling
- Protected user operations
- Progress records linked to users and questions

### 5.9 Community and competition features

The application includes routes and models for community-oriented features such as leaderboards, discussions, achievements, and shared progress. These features can help learners compare progress, ask questions, and stay engaged.

### 5.10 Resume upload integration

The FastAPI server includes an upload-url endpoint and AWS S3 integration for generating presigned upload URLs. This supports resume or profile-document workflows associated with interview and career preparation.

## 6. How the Application Works

### Typical learning flow

1. The user opens SQLTown and signs up or logs in.
2. The user selects a learning path, documentation topic, game level, or practice database.
3. The user reads an explanation and reviews the schema or example.
4. The user writes a SQL query in the editor.
5. The query runs against a browser-side or server-side database engine.
6. SQLTown displays rows, affected records, execution feedback, or an error.
7. The user corrects the query if necessary.
8. A successful activity updates progress and may award game rewards.
9. The user continues to the next lesson, quest, or interview problem.

### Query execution

The frontend uses SQL.js and in-memory SQLite databases for interactive playground and game operations. A level can initialize its own isolated schema, execute DDL/DML/SELECT statements, inspect tables, and reset the database.

The backend also exposes SQL execution for interview questions. It compares a user's output with expected output across test cases and returns pass/fail summaries, including visible and hidden test-case counts.

## 7. Technical Architecture

### Frontend

- React
- TypeScript
- Vite
- React Router
- Zustand and React Context patterns
- Tailwind CSS and custom CSS
- Framer Motion
- Monaco Editor and syntax highlighting
- SQL.js and AlaSQL for SQL-related browser functionality
- Recharts for data visualization

Important frontend areas include:

| Area | Responsibility |
|---|---|
| `src/pages/` | Application pages and user flows |
| `src/components/documentation/` | Documentation layout and lesson content |
| `src/components/playground/` | SQL editor, schema browser, and result panels |
| `src/components/practice/` | Practice tools, relationships, and query support |
| `src/components/game/` | City visualization |
| `src/services/` | API access, SQL execution, authentication, and interview logic |
| `src/data/` | Learning paths, game levels, mock content, and application data |
| `src/context/` | Shared authentication and application state |

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic schemas
- JWT authentication
- SQLite or configured relational database support
- AWS S3 presigned uploads
- CORS middleware
- Automatic Swagger and ReDoc documentation

Important backend areas include:

| Area | Responsibility |
|---|---|
| `server/main.py` | FastAPI application setup and router registration |
| `server/src/auth/` | Authentication and authorization |
| `server/src/routes/` | SQL execution, progress, and interview APIs |
| `server/src/controllers/` | Health, question, and upload endpoints |
| `server/src/models/` | Users, questions, test cases, submissions, and progress |
| `server/src/services/` | SQL execution and business logic |
| `server/src/db/` | Database engine and session management |
| `server/src/integrations/` | External services such as AWS S3 |

## 8. Current Scope and Important Notes

SQLTown is an actively evolving application. Some parts are fully connected to backend services, while other areas use local data or mock data for prototyping and UI development.

Examples of areas that may currently use local or mock-backed data include:

- Some learning-path progress displays
- Some dashboard and city state
- Some leaderboard, quest, achievement, and user data
- Certain lesson navigation callbacks
- Some game progression persistence

The core direction remains consistent: connect learning content, executable SQL, user progress, interview evaluation, and city-building progression into one learning experience.

## 9. Why the City-Building Model Matters

The city is more than a visual theme. It provides a mental model for database work:

- A database is the city
- Tables are buildings or parts of the city
- Rows represent people, objects, or records
- SQL commands change the city
- Queries reveal information about the city
- Joins connect information across buildings
- Aggregations provide measurements about the city
- Progress rewards show the result of continued practice

This model gives learners a reason to remember the relationship between database actions and their outcomes.

## 10. Expected Benefits

SQLTown is intended to provide the following benefits:

- Faster transition from theory to practical SQL
- Less setup work for new learners
- Immediate feedback during practice
- Better understanding of table relationships and query results
- More consistent interview preparation
- A motivating learning progression
- A single place for lessons, documentation, practice, and assessment
- A foundation that can be extended with more dialects, levels, databases, and community content

## 11. Summary

SQLTown solves the gap between learning SQL concepts and confidently using SQL to solve problems. It brings together documentation, executable queries, realistic practice, interview evaluation, authentication, progress tracking, and game-based motivation.

The application is helpful for anyone who wants to learn SQL by doing rather than only reading. It is especially valuable for students, beginners, developers, analysts, interview candidates, instructors, and users who prefer visual or game-based learning.

