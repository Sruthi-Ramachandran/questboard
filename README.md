# QuestBoard 🚀
Turn your goals into adventures.

A full-stack gamified productivity app built with Java, Spring Boot, React and TypeScript.

## Tech stack
- Java 21, Spring Boot 3.5, Spring Data JPA
- H2 for local development (PostgreSQL planned)
- React, TypeScript, Vite
- GitHub Actions (CI foundation)

## Prerequisites
- Java 21+
- Maven 3.9+ (or use your IDE's Maven integration)
- Node.js 20+

## Run the backend
```bash
cd backend
mvn spring-boot:run
```
API: http://localhost:8080/api/quests

H2 console: http://localhost:8080/h2-console
JDBC URL: `jdbc:h2:mem:questboard`, username: `sa`, password: empty.

## Run the frontend
In another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173.

## First API endpoints
- `GET /api/quests` — list quests
- `POST /api/quests` — create a quest

Example:
```json
{
  "title": "Read 10 pages",
  "description": "Read a chapter of a book",
  "category": "LEARNING",
  "difficulty": "EASY"
}
```

## Roadmap
- [x] Project foundation
- [x] First quest API and dashboard
- [ ] Complete quest and award XP
- [ ] User accounts and authentication
- [ ] Daily challenges and achievement badges
- [ ] PostgreSQL
- [ ] Tests, Docker and deployment

## Design direction
Colourful, friendly, playful dashboard with clear progress indicators.
