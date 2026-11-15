# QuestBoard 🚀

**Turn your goals into adventures.**

QuestBoard is a full-stack gamified productivity application that transforms everyday tasks into quests. Users can create goals, track progress, complete challenges and earn experience points (XP).

Built with Java, Spring Boot, React and TypeScript.

## ✨ Features

- **Quest Management (CRUD):** Create, view, edit and delete quests.
- **Quest Categories:** Organise quests into Health, Learning, Work, Personal and Creative.
- **Difficulty Levels:** Choose Easy, Medium or Hard quests.
- **XP Rewards:** Earn experience points by completing quests.
- **Level Progression:** Track XP and progress towards the next level.
- **Search:** Find quests by title or description.
- **Filtering:** Filter quests by category, difficulty and completion status.
- **Responsive Dashboard:** A colourful, user-friendly interface for managing quests.
- **Persistent Storage:** Save quests using an H2 file-based database.

## 🛠 Tech Stack

**Backend**
- Java 21
- Spring Boot 3.5
- Spring Data JPA
- H2 Database
- Maven

**Frontend**
- React
- TypeScript
- Vite
- CSS

**Development Tools**
- IntelliJ IDEA
- Git and GitHub
- Postman

## 📋 Prerequisites

- Java 21 or later
- Maven 3.9+ (or IDE Maven integration)
- Node.js 20+
- npm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sruthi-Ramachandran/questboard
cd questboard
```

### 2. Start the Backend

Open a terminal:

```bash
cd backend
mvn spring-boot:run
```

The backend runs at:

http://localhost:8080

### 3. Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the application:

http://localhost:5173

## 🗄 Database Configuration

QuestBoard currently uses an H2 file-based database for local development.

- Database: H2
- JDBC URL: `jdbc:h2:file:./data/questboard`
- Username: `sa`
- Password: Empty

The database stores quest information between application restarts.

H2 Console:

http://localhost:8080/h2-console

Use the JDBC URL and credentials above to connect.

## 🔌 REST API Endpoints

Base URL: `http://localhost:8080/api/quests`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/quests` | Retrieve all quests |
| POST | `/api/quests` | Create a quest |
| PUT | `/api/quests/{id}` | Update a quest |
| DELETE | `/api/quests/{id}` | Delete a quest |
| PATCH | `/api/quests/{id}/complete` | Complete a quest |
| GET | `/api/quests/xp` | Retrieve total earned XP |

### Example: Create a Quest

**POST** `/api/quests`

Request body:

```json
{
  "title": "Read 10 pages",
  "description": "Read a chapter of a book",
  "category": "LEARNING",
  "difficulty": "EASY"
}
```

Example categories:
- HEALTH
- LEARNING
- WORK
- PERSONAL
- CREATIVE

Example difficulty levels:
- EASY
- MEDIUM
- HARD

XP rewards:
- EASY: 10 XP
- MEDIUM: 25 XP
- HARD: 50 XP

## 🧪 API Testing

The REST API can be tested using Postman.

The Postman collection is available in the `postman/` directory.

## 🎨 Design Direction

QuestBoard uses a colourful, friendly and playful dashboard to make everyday productivity feel rewarding.

The goal is to combine practical task management with gamification, progress tracking and a motivating user experience.

---

**Built as a hands-on full-stack development portfolio project.**