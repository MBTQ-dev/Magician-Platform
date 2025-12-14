# Magician Platform: Advanced TypeScript Framework for VR4deaf Organizations

Magician Platform is an advanced TypeScript-based framework designed to streamline development workflows for innovative technology solutions. Leveraging cutting-edge integration tools, it enables seamless deployment and management of scalable systems tailored for developers and organizations, specifically designed to solve complex infrastructure and collaboration challenges for the Magicians system serving VR4deaf organizations' deaf customers.

![Magician Platform](https://business.360magicians.com)

## 🎯 Mission

This platform aims to provide comprehensive solutions for deaf entrepreneurs and VR4deaf organizations, offering:
- Streamlined business formation workflows
- Accessible interfaces with ASL support
- Integration with Vocational Rehabilitation (VR) services
- Scalable infrastructure for multiple projects

## 🚀 Features

### Core Magician Services
- **Business Magician**: Complete business formation and lifecycle support
- **Developer Magician**: Code scaffolding, tech recommendations, and development tools
- **Creative Magician**: Branding, ASL video production, and marketing solutions
- **Job Magician**: Resume building, job matching, and career development

### Accessibility & Integration
- **ASL Video Guidance**: Accessible content in American Sign Language
- **VR Counselor Integration**: Connect with Vocational Rehabilitation specialists
- **Real-time Translation Services**: Communication accessibility tools
- **Deaf-first Design**: All interfaces optimized for deaf users

### Business Tools
- **Document Management**: Storage and organization for business documents
- **Self-Employment Service Modules**: Comprehensive pricing tools
- **SBA Resource Library**: Access to Small Business Administration resources
- **AI-Powered Business Analytics**: Intelligent business planning and analysis

## 🔧 Technologies

- **Frontend**: React + TypeScript with Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Dynamic Interactions**: HTMX for seamless UX
- **Cloud Storage**: Google Cloud Storage & Cloudflare R2 integration
- **Messaging**: Telegram bot and Slack integration
- **AI Services**: OpenAI & Anthropic integration
- **Deployment**: Vercel, Cloud Run, and Cloudflare Pages

## 📋 Requirements

- Node.js 20+
- PostgreSQL database (or use Docker)
- Google Cloud Storage account (for document storage)
- OpenAI API key (for AI features)

## 🏁 Getting Started

### Quick Start

1. Clone the repository
2. Run setup script:
   ```bash
   node scripts/setup.js
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup

We provide a Docker Compose configuration for easy local development:

```bash
docker-compose up -d
```

Visit http://localhost:8080 to see the application.

## 🗄️ Environment Variables

Create a `.env` file in the project root with the following variables:

```
# Database connection
DATABASE_URL=postgres://username:password@localhost:5432/business_magician

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_BUCKET_NAME=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=path-to-credentials.json

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Application settings
NODE_ENV=development
PORT=5000
```

## 📂 Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API clients
│   │   ├── pages/           # Page components
├── server/                  # Backend Express application
│   ├── routes/              # API routes (modular route handlers)
│   ├── services/            # Business logic and external integrations
│   │   ├── notionService.ts         # Notion API integration
│   │   ├── northwestAgentService.ts # Business formation services
│   │   ├── magicians/               # 360 Magicians AI agents
│   ├── middleware/          # Express middleware
│   ├── index.ts             # Main server entry point (lazy-loaded routes)
│   ├── routes.ts            # Central route registration
├── shared/                  # Shared code between client and server
│   ├── schema.ts            # Database schema definitions (Drizzle ORM)
├── scripts/                 # Utility scripts
├── archived_legacy_files/   # Archived legacy standalone files (not in repo)
```

## 🏗️ Architecture

### Current API Architecture

The platform uses a **unified Express.js API server** with modular routes:

- **Main Server**: `server/index.ts` - Express server with lazy-loaded routes for memory efficiency
- **Route Registration**: `server/routes.ts` - Central registration of all API routes
- **Modular Routes**: `server/routes/*.ts` - Individual route handlers for:
  - Business formation (`businessFormationRoutes.ts`)
  - Ecosystem services (`ecosystemRoutes.ts`)
  - AI/ML operations (`ai.ts`, `anthropic.ts`, `openai-test.ts`)
  - 360 Magicians (`magiciansRoutes.ts`)
  - Storage and file management (`storage.ts`)
  - And more...

### Services Layer

Business logic is organized in `server/services/`:
- **notionService.ts**: Notion API integration for knowledge management
- **northwestAgentService.ts**: Business entity formation through Northwest Registered Agent
- **deafAuthService.ts**: Authentication for deaf-first platform
- **fibonroseService.ts**: Reputation scoring system
- **magicians/**: 360 Magicians AI agents (GatekeeperMagician, ReputationTrackerMagician, etc.)

### Legacy Files Note

Legacy standalone API files have been archived to `archived_legacy_files/` (excluded from git). See `ARCHIVED_FILES.md` for details on migrated functionality.

## 🔄 Database Management

We use Drizzle ORM for database operations. Some useful commands:

```bash
# Push schema changes to database
npm run db:push

# Generate migration files
npm run db:generate

# Open Drizzle Studio (database UI)
npm run db:studio
```

## 📦 Deployment

The application is configured for deployment on Vercel:

```bash
node scripts/vercel-deploy.js
```

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## 📄 License

[MIT License](LICENSE)

## 👥 Team

- 360 Magician Team
- VR4deaf Organization Partners

## 🔗 Related Documentation

- [Platform Integration Summary](PLATFORM-INTEGRATION-SUMMARY.md)
- [Implementation Plan](implementation-plan.md)
- [API Definition](api-definition.md)
- [GCP/Vercel Deployment Guide](gcp-vercel-deployment.md)
- [Repository Template](GITHUB-REPOSITORY-TEMPLATE.md)