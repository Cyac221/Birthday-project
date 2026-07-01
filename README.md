# 🎂 Birthday Project

An interactive birthday experience built as a full-stack web application — combining a public invitation page, a private admin dashboard, and a persistence layer for user-generated content.

**🔗 Live demo:** [birthday-project-ashy-three.vercel.app](https://birthday-project-ashy-three.vercel.app)

---

## Overview

This project explores building a small but complete full-stack product: a public-facing animated interface, an authenticated admin area, and a media-handling pipeline, all backed by a relational database.

## Features

- **Animated public page** — invitation UI built with custom transitions and micro-interactions.
- **User-generated content module** — a lightweight interaction layer where visitors can contribute text and images, persisted to the database.
- **Media pipeline** — image uploads processed and optimized through a third-party CDN.
- **Admin dashboard** — protected view for managing event content and submissions.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| ORM | [Prisma 5](https://www.prisma.io) |
| Database | [Supabase](https://supabase.com) (PostgreSQL) |
| Media storage | [Cloudinary](https://cloudinary.com) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Deployment | [Vercel](https://vercel.com) |

## Architecture Notes

- **App Router** structure separates public routes from the admin namespace.
- **Prisma** manages schema migrations and typed database access against Supabase's Postgres instance.
- **Cloudinary** handles image upload, transformation, and delivery, decoupling media storage from the application server.
- Environment-based configuration separates public and admin-only credentials.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

### Environment Variables

This project requires a Supabase connection string (for Prisma) and Cloudinary API credentials. Create a `.env` file based on the variables referenced in `prisma.config.ts` and the Cloudinary SDK setup.

## Project Structure

```
app/        → routes (public + admin)
lib/        → shared utilities and service clients
prisma/     → schema and migrations
public/     → static assets
```

---

Built as a full-stack exercise combining a modern React framework, a typed ORM, and a managed database/CDN stack.
