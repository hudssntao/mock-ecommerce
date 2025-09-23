# Mock E-commerce Application

A modern, full-stack e-commerce application built with Next.js, tRPC, and PostgreSQL. Features a complete product catalog with shopping cart functionality, infinite scroll, and comprehensive SEO optimizations.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: tRPC, MikroORM with PostgreSQL
- **State Management**: React Context with useReducer
- **UI Components**: HeroUI (NextUI), Tailwind CSS
- **Deployment**: Docker with Docker Compose
- **Development**: Biome (linting/formatting), pnpm

### System Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   tRPC Server    │    │   PostgreSQL    │
│                 │    │                  │    │                 │
│ • App Router    │◄──►│ • Product API    │◄──►│ • Products      │
│ • Client/Server │    │ • Cart API       │    │ • Cart Items    │
│ • React Context │    │ • MikroORM       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- **Docker & Docker Compose** (required)
- **Node.js 18+** and **pnpm** (for local development)

### 1. Environment Setup

Create `.env.local` for local development:
```bash
NODE_ENV=development

# Database Config
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ecommerce
DATABASE_USER=postgres
DATABASE_PASSWORD=password

MIKRO_ORM_CLI_USE_TS_NODE=true
MIKRO_ORM_CLI_TS_CONFIG_PATH=./tsconfig.orm.json
```

Create `.env.docker` for containerized deployment:
```bash
# Local Docker Config
POSTGRES_DB=ecommerce
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# Database Config
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=ecommerce
DATABASE_USER=postgres
DATABASE_PASSWORD=password

MIKRO_ORM_CLI_USE_TS_NODE=true
MIKRO_ORM_CLI_TS_CONFIG_PATH=./tsconfig.orm.json
```

### 2. One-Command Startup

```bash
pnpm startup
```

This command will:
1. Start PostgreSQL container
2. Install dependencies
3. Run database migrations
4. Seed the database with sample products
5. Start the development server

> 🔥 **Ports Required**: Ensure ports `3000` and `5432` are available.

### 3. Access the Application

- **Web App**: http://localhost:3000
- **Database**: `localhost:5432` (postgres/password)

### 4. Shutdown

```bash
pnpm docker:down
```

## 🧪 Key Implementation Details

1. NextJS SEO optimizations (sitemap, robots.txt, static & dynamic metadata, product pages use SSR)
2. Infinite scroll for all product feeds
3. Loading states for all data fetched client side
4. Script for seeding llm-generated data
5. Docker deployment workflow

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbo
pnpm build            # Build for production
pnpm start            # Start production server
pnpm preview          # Build and start production server

# Code Quality
pnpm typecheck        # TypeScript type checking
pnpm lint             # Lint code with Biome
pnpm format           # Format code with Biome
pnpm check            # Run both linting and formatting

# Database
pnpm db:up            # Start PostgreSQL container only
pnpm db:down          # Stop all containers
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:create-migration  # Create new migration

# Docker
pnpm docker:up        # Start all containers
pnpm docker:down      # Stop all containers
```