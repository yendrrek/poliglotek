# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Poliglotek is a fullstack web application that enables Polish users to search and translate foreign-language content. Users enter queries in Polish, which are translated to target languages, search results are retrieved from foreign websites, and pages are translated back to Polish.

**Tech Stack:**
- Backend: Micronaut 4.10.1 with Java 25, Netty server
- Frontend: Angular 20 with Angular Material (Azure Blue theme)
- Database: Google Cloud Firestore
- APIs: Google Translate API, Google Search JSON API
- Build: Gradle (backend), npm/Angular CLI (frontend)
- Container: Podman with Google Cloud Run deployment

## Build Commands

### Full Application Build
```bash
./gradlew build
```
This automatically builds both frontend and backend, copies frontend assets to resources, and creates a fat JAR.

### Backend Only
```bash
./gradlew run                    # Run backend server (port 8080)
./gradlew clean build           # Clean build
./gradlew shadowJar             # Create fat JAR only
```

### Frontend Only  
```bash
cd src/frontend
npm run start                   # Dev server (port 4200)
npm run build-dev              # Development build
npm run build-prod             # Production build
npm test                       # Run tests
```

### Container Operations
```bash
# Build container image (requires environment variables set)
scripts/podman-build -i dev     # Development image
scripts/podman-build -i prod    # Production image

# Run container locally (dev images only)
scripts/podman-build -c <image_id>

# Tag and push to Google Cloud Registry
scripts/podman-build -t <image_id>
scripts/podman-build -p <image_id>
```

## Architecture

The application follows **Domain-Driven Design (DDD)** with hexagonal architecture:

### Backend Structure (`src/main/java/com/poliglotek/`)
- **Domain Layer** (`domain/`): Pure business logic, no external dependencies
  - Models: `Translation`, `TranslatedPage`, `User`  
  - Services: `TranslationDomainService`, `AuthDomainService`
  - Value Objects: `Email`, `AuthToken`

- **Application Layer** (`application/`): Use cases and port interfaces
  - Services: `TranslationApplicationService`, `AuthApplicationService`
  - Ports: `TranslateClientPortOut`, `GoogleSearchPortOut`, `UserValidatorPortOut`

- **Infrastructure Layer** (`infrastructure/`): External integrations
  - Adapters: `GoogleTranslateClient`, `GoogleSearchClient`, `ScrapeService`
  - Auth: `GoogleUserValidator`, `CustomTokenGenerator`

- **Interface Layer** (`interfaces/`): REST controllers and DTOs
  - Controllers: `TranslationController`, `AuthController`
  - Exception Handlers: Global error handling

### Frontend Structure (`src/frontend/src/app/`)
- **Presentation Layer** (`presentation/`): Components and UI logic
- **Application Layer** (`application/`): Facades and use case orchestration  
- **Infrastructure Layer** (`infrastructure/`): HTTP clients and external services
- **Domain Layer** (`domain/`): Business models and domain services

## Key Configuration

### Environment Variables (required for deployment)
- `MICRONAUT_ENVIRONMENTS`: Controls build environment (dev/prod)
- Google Cloud credentials and API keys
- Database connection settings

### Application Configuration (`src/main/resources/application.yml`)
- JWT security with Google OAuth2
- CORS settings for localhost and production
- Static resource serving for Angular app
- Google Cloud services integration

### Build Integration
- Gradle automatically builds Angular frontend during backend build
- Frontend assets copied to `src/main/resources/public`
- Environment-specific builds (dev includes source maps, prod optimized)
- Git hooks installed automatically during compilation

## Testing

Tests are currently disabled in Gradle build (`build.gradle:154`). When enabling:
```bash
./gradlew test          # Backend tests (Spock/Groovy)
cd src/frontend && npm test  # Frontend tests (Karma/Jasmine)
```

## Development Notes

- Main application class: `com.poliglotek.Application` (Note: build.gradle references old path)
- Uses Micronaut AOT compilation for performance
- Version managed in `build.gradle` and `versions.properties`
- Branch: `refactor` (current), main branch: `master`
- Container deployment uses Google Cloud Run with custom Podman scripts