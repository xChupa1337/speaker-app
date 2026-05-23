# 🎙️ Speaker App

[![Pipeline Status](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/badges/main/pipeline.svg)](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/-/pipelines)
[![Coverage](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/badges/main/coverage.svg)](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app/-/jobs)

## Опис проекту

**Speaker App** — це платформа для вивчення мов через аудіо-контент. Проект складається з RESTful API бекенду та мобільного клієнта. Система дозволяє автентифікувати користувачів, управляти темами, розділами та безпосередньо медіа-контентом.

---

## 🛠 Технологічний стек

### Backend

| Компонент           | Технологія                           |
| ------------------- | ------------------------------------ |
| **Runtime**         | Node.js 20                           |
| **Мова**            | TypeScript 5                         |
| **Фреймворк**       | Express 5                            |
| **База даних**      | MongoDB (Mongoose 8)                 |
| **Автентифікація**  | JWT (jsonwebtoken)                   |
| **Email**           | Nodemailer                           |
| **Тестування**      | Jest + Supertest + MongoMemoryServer |
| **CI/CD**           | GitLab CI/CD (git.ztu.edu.ua)        |
| **Контейнеризація** | Docker (multi-stage build)           |

### Frontend (Мобільний застосунок)

| Компонент     | Технологія                       |
| ------------- | -------------------------------- |
| **Фреймворк** | React Native / Expo              |
| **Роутинг**   | Expo Router (File-based routing) |

---

## 🚀 Швидкий старт

### Вимоги

- Node.js 20+
- MongoDB (локально або Atlas)
- Застосунок **Expo Go** на вашому смартфоні (або Android Emulator / iOS Simulator)

### 1. Налаштування Backend

```bash
# Клонування репозиторію
git clone [https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app.git](https://git.ztu.edu.ua/ipz/2022-2026/ipz-22-3/sokulskyy-oleh/snp-labs-soi/speaker-app.git)
cd speaker-app/speaker-app-backend

# Встановлення залежностей
npm install

# Створення файлу змінних середовища
cp .env.example .env.development.local
```
