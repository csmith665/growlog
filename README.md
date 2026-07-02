# Growlog

Plant management and garden tracking platform. Plan gardens, track plant growth, manage care schedules, and access a verified plant database with accurate growing information.

## Features

- **Plant Database** — Browse vegetables, herbs, flowers, fruits, shrubs, and more with accurate growing information (light requirements, water needs, hardiness zones, soil types, companion plants)
- **Garden Planner** — Design garden beds (raised, in-ground, container, vertical) and plan plant layouts
- **Plant Tracking** — Log growth stages (planted, germinated, transplanted, flowering, fruiting, harvested), health status, and care activities over time
- **Care Reminders** — Track watering, fertilizing, pruning, weeding, and pest control schedules
- **Companion Planting** — Learn which plants grow well together and which to avoid
- **Growing Guides** — Step-by-step guides for every skill level

## Tech Stack

- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Validation**: Zod
- **Containerization**: Docker

## Quick Start

```bash
# Start the app and database
docker compose up -d

# The app will be available at http://localhost:3002
```

## Development

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/growlog"
NODE_ENV="development"
```

## Security

- Security headers middleware (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy)
- Environment variable validation with Zod
- Prisma ORM prevents SQL injection
- Non-root Docker user

## Project Structure

```
growlog/
├── prisma/
│   ├── schema.prisma    # Database schema (garden plants, beds, tracking, care logs)
│   └── seed.ts          # Seed data (verified plant information)
├── src/
│   ├── app/
│   │   ├── database/    # Plant database
│   │   ├── garden/      # Garden bed planner
│   │   ├── tracking/    # Plant tracking and care
│   │   └── guides/      # Growing guides
│   ├── components/
│   ├── lib/
│   └── middleware.ts
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Data Accuracy

All plant data in the seed file is verified against established horticultural references:
- USDA hardiness zones
- Standard light/water/soil requirements
- Scientifically backed companion planting relationships
- Accurate days to harvest and mature dimensions

## License

MIT
