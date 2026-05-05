# 🎙️ Speaker App — Backend

[![Pipeline Status](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/badges/main/pipeline.svg)](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/-/pipelines)
[![Coverage](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/badges/main/coverage.svg)](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/-/jobs)

## Опис проекту

RESTful API для застосунку Speaker App — платформи для вивчення мов через аудіо-контент. Надає ендпоінти для автентифікації користувачів, управління темами, розділами та медіа-контентом.

## Технологічний стек

| Компонент | Технологія |
|-----------|------------|
| **Runtime** | Node.js 20 |
| **Мова** | TypeScript 5 |
| **Фреймворк** | Express 5 |
| **База даних** | MongoDB (Mongoose 8) |
| **Автентифікація** | JWT (jsonwebtoken) |
| **Email** | Nodemailer |
| **Тестування** | Jest + Supertest + MongoMemoryServer |
| **CI/CD** | GitLab CI/CD (git.ztu.edu.ua) |
| **Контейнеризація** | Docker (multi-stage build) |

## Швидкий старт

### Вимоги
- Node.js 20+
- MongoDB (локально або Atlas)

### Встановлення

```bash
# Клонування репозиторію
git clone https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app.git
cd speaker-app/speaker-app-backend

# Встановлення залежностей
npm install

# Створення файлу змінних середовища
cp .env.example .env.development.local
# Заповніть змінні у .env.development.local
```

### Змінні середовища

Створіть файл `.env.development.local` у папці `speaker-app-backend/`:

```env
NODE_ENV=development
PORT=3000
BASE_URL=/api/v1
MONGODB_URI=mongodb://localhost:27017/speaker-app
JWT_SECRET=your-super-secret-jwt-key
EMAIL_ADDRESS_SENDER=your@email.com
EMAIL_PASSWORD=your-email-password
```

### Запуск

```bash
# Режим розробки (з hot-reload)
npm run dev

# Production збірка
npm run build
npm start
```

## Тестування

```bash
# Запуск всіх тестів
npm test

# Запуск з coverage звітом
npm run test:coverage

# Coverage звіт відкриється у: coverage/index.html
```

### Структура тестів

```
src/__tests__/
├── unit/
│   └── http-error.test.ts      ← 9 тестів для HttpError класу
└── integration/
    └── auth.test.ts            ← 9 тестів для auth API endpoints
```

Тести не потребують зовнішнього MongoDB — використовується `mongodb-memory-server` (in-memory БД).

## API Endpoints

### Health Check
```
GET /health
```
Повертає статус застосунку. Використовується CI/CD pipeline для перевірки після деплою.

### Автентифікація
```
POST /api/v1/auth/sign-up    ← Реєстрація нового користувача
POST /api/v1/auth/sign-in    ← Вхід у систему
```

## Docker

```bash
# Збірка образу (multi-stage, ~180MB)
docker build -t speaker-app-backend .

# Запуск контейнера
docker run -p 3000:3000 \
  -e MONGODB_URI=your-mongodb-uri \
  -e JWT_SECRET=your-secret \
  speaker-app-backend
```

## Структура проекту

```
speaker-app-backend/
├── .gitlab-ci.yml              ← CI/CD pipeline (4 stages)
├── Dockerfile                  ← Multi-stage Docker build
├── .dockerignore
├── README.md
└── speaker-app-backend/
    ├── package.json
    ├── tsconfig.json
    ├── jest.config.js           ← Конфігурація тестів
    └── src/
        ├── app.ts               ← Точка входу, Express app
        ├── config/              ← Конфігурація (env, nodemailer)
        ├── controllers/         ← Логіка обробки запитів
        ├── database/            ← MongoDB підключення
        ├── middlewares/         ← Express middleware (error handler)
        ├── models/              ← Mongoose схеми
        ├── routes/              ← Маршрути API
        ├── utils/               ← Утиліти (email, error types)
        └── __tests__/           ← Тести (unit + integration)
```

## CI/CD Pipeline

Pipeline складається з **4 послідовних етапів**:

```
┌─────────┐    ┌──────┐    ┌────────┐    ┌────────┐
│  BUILD  │───▶│ TEST │───▶│ DOCKER │───▶│ DEPLOY │
└─────────┘    └──────┘    └────────┘    └────────┘
  npm ci         Jest        docker        staging
  tsc build    coverage      build         (main only)
  type check
```

| Етап | Що робить | Коли запускається |
|------|-----------|-------------------|
| **build** | `npm ci` + `tsc` компіляція | Кожен push |
| **test** | Jest (18 тестів) + coverage | Кожен push + MR |
| **node_lint** | TypeScript type-check | Кожен push |
| **docker** | `docker build` (multi-stage) | main + develop |
| **deploy** | Розгортання на staging | Тільки main |

### Конфігурація: `.gitlab-ci.yml`

Файл знаходиться у корені репозиторію. Runner тег: `student`.

## Автор

**Сокульський Олег** — ІПЗ-22-3, ЖДУ ім. Івана Франка  
Дисципліна: Системне та мережне програмування  
Репозиторій: [git.ztu.edu.ua](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app)
