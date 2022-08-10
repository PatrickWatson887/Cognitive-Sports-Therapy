## Introduction

A monorepo containing:

- Next.js web app
- React Native app with Expo
- A [tRPC](https://trpc.io)-API which is inferred straight into the above.
- [Prisma](http://prisma.io/) as a typesafe ORM

## Requirements

You will need docker compose to run the postgres database.
It comes with the [Docker Desktop App](https://docs.docker.com/get-docker/)


## Available commands

| Command               | Description                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `yarn dev`            | Starts Postgres, Expo & Next.js                                                                |
| `yarn db-up`          | Starts Postgres on port `5466`                                                                 |
| `yarn db-migrate-dev` | Runs the latest Database migrations after updating the [Prisma schema](./prisma/schema.prisma) |
| `yarn db-nuke`        | Stops and deletes the the database                                                             |


## Folder structure


```graphql
.
├── apps
│   ├── expo    # Expo/RN application
│   └── nextjs  # Server-side rendered Next.js application
├── packages
│   ├── api           # tRPC API
│   ├── react         # Shared React-helpers
│   └── react-native  # RN components. **Could** be shared between Expo & Next.js if you're in to that sort of thing.
└── prisma      # Prisma setup
```

## Further reading

### Deployment

#### Vercel

- Create a Postgres Database
- Set env `DATABASE_URL` pointing towards that db
- Configure *"Root Directory"* as `apps/nextjs` and tick _Include source files outside of the Root Directory in the Build Step_.
