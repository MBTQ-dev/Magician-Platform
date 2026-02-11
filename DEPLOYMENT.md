# 360 Magicians Platform - Complete Deployment Guide

A comprehensive platform for deaf entrepreneurs featuring **4 AI-powered Magicians**:
- 🏢 **Business Magician** - Business formation & funding
- 💻 **Developer Magician** - Code scaffolding & tech stack
- 🎨 **Creative Magician** - Branding & ASL video production
- 💼 **Job Magician** - Career development & job matching

## 🌟 Key Features

### For All Magicians
- ✅ **Deaf-First Design** - ASL video integration throughout
- ✅ **VR Counselor Matching** - AI-powered matching algorithm
- ✅ **Cloudflare Stack** - Pages, R2, Workers for optimal performance
- ✅ **Complete Database** - 30+ tables optimized for all features
- ✅ **CI/CD Pipeline** - Automated testing and deployment

### Business Magician
- AI-powered business idea generation
- Business formation checklist and cost estimation
- Funding source discovery (grants, loans, crowdfunding)
- Business plan generation
- VR counselor integration for business guidance

### Developer Magician
- Project template library (React, Node.js, Mobile, etc.)
- Tech stack recommendations
- Automated code scaffolding
- CI/CD configuration generation
- Deployment options (Cloudflare, Vercel, Netlify)
- Deaf-accessible coding resources

### Creative Magician
- AI-powered brand identity generation
- Logo concept development
- ASL video production requests
- Marketing content calendar
- Deaf accessibility UI/UX guidelines
- Social media content ideas

### Job Magician
- Resume builder (text and video)
- AI-powered job matching algorithm
- Video resume script generator
- Interview preparation tips (deaf-specific)
- Career development resources
- Job application tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database (or Supabase account)
- Cloudflare account (for R2 and Pages)
- Anthropic API key (for AI features)

### Installation

```bash
# Clone repository
git clone https://github.com/MBTQ-dev/Magician_Platform.git
cd Magician_Platform

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Visit http://localhost:5000 to see the application.

## 📋 Environment Setup

### Required Services

#### 1. Supabase (Database)
```bash
# Sign up at https://supabase.com
# Create a new project
# Copy credentials to .env:
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
DATABASE_URL="postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres"
```

Run the schema in Supabase SQL Editor:
```sql
-- The schema is automatically applied via npm run db:push
-- Or manually apply from shared/schema.ts
```

#### 2. Cloudflare (R2 Storage & Pages)
```bash
# Sign up at https://dash.cloudflare.com

# Create R2 Buckets:
# - magicians-assets (for brand assets, documents)
# - magicians-asl-videos (for ASL video content)

# Generate R2 API credentials:
# Go to R2 → Manage R2 API Tokens → Create API Token

# Add to .env:
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_API_TOKEN="your-api-token"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
```

#### 3. Anthropic (AI Features)
```bash
# Sign up at https://console.anthropic.com
# Generate API key
# Add to .env:
ANTHROPIC_API_KEY="sk-ant-..."
```

### Optional Services

- **Stripe** - For payment processing
- **Notion** - For business planning integration
- **Google Cloud** - For additional storage (legacy)

## 🏗️ Project Structure

```
Magician_Platform/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utilities
├── server/                   # Express backend
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   │   ├── businessMagician.ts
│   │   ├── developerMagician.ts
│   │   ├── creativeMagician.ts
│   │   ├── jobMagician.ts
│   │   ├── aslVideoService.ts
│   │   └── vrCounselorMatching.ts
│   └── index.ts             # Server entry
├── shared/                   # Shared code
│   └── schema.ts            # Database schema (30+ tables)
├── .github/workflows/       # CI/CD pipelines
│   └── cloudflare-deploy.yml
└── package.json
```

## 🗄️ Database Schema

The platform includes **30+ tables** organized by magician:

### Core Tables
- `users` - User accounts with deaf preferences
- `user_progress` - Track user journey through tasks
- `magician_activity_log` - Analytics for magician usage

### Business Magician Tables
- `businesses` - Business registrations
- `funding_sources` - Available funding opportunities
- `funding_applications` - User funding applications
- `business_formations` - Formation tracking
- `formation_documents` - Legal documents

### Developer Magician Tables
- `project_templates` - Code scaffolding templates
- `user_projects` - Generated projects

### Creative Magician Tables
- `brand_assets` - Logos, colors, typography
- `asl_video_requests` - Video production queue
- `asl_videos` - Published ASL content
- `asl_dictionary_terms` - ASL business terminology

### Job Magician Tables
- `user_profiles` - Professional profiles/resumes
- `job_listings` - Available positions
- `job_applications` - Application tracking
- `job_match_scores` - AI matching results

### VR Counselor Tables
- `vr_counselors` - Counselor directory
- `vr_counselor_profiles` - Extended profiles
- `counselor_match_scores` - Matching algorithm results
- `counselor_sessions` - Session scheduling

### File Management
- `r2_files` - Cloudflare R2 file tracking

## 🚢 Deployment

### GitHub Secrets Configuration

Add these secrets to your repository:
**Settings → Secrets and variables → Actions → New repository secret**

```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
DATABASE_URL
STAGING_DATABASE_URL
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
ANTHROPIC_API_KEY
```

### Automatic Deployment

The platform automatically deploys on push:

- **`develop` branch** → Deploys to `mbtq.dev` (staging)
- **`main` branch** → Deploys to `360magicians.com` (production)

```bash
# Deploy to staging
git checkout develop
git add .
git commit -m "feat: your feature"
git push origin develop

# Deploy to production
git checkout main
git merge develop
git push origin main
```

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains:
# - dist/public/ - Frontend assets (deploy to Cloudflare Pages)
# - dist/index.js - Backend server (deploy to Cloudflare Workers or VPS)
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server (port 5000)
npm run typecheck        # Run TypeScript checks
npm run lint            # Run linting
npm run build           # Build for production

# Database
npm run db:push         # Push schema to database
npm run db:generate     # Generate migration files
npm run db:studio       # Open Drizzle Studio
npm run db:migrate      # Run migrations

# Testing
npm test               # Run tests
```

## 📊 Cost Breakdown

**Monthly Estimated Costs:**

| Service | Free Tier | Paid Tier | Our Usage |
|---------|-----------|-----------|-----------|
| Cloudflare Pages | FREE | $0.10/req (after 100k) | **$0** |
| Cloudflare R2 | 10GB FREE | $0.015/GB | **$0-5** |
| Supabase | 500MB FREE | $25/month Pro | **$0-25** |
| Anthropic API | Pay-as-you-go | $0.25/1M tokens | **$5-20** |
| **Total** | | | **$5-50/month** |

Compare to traditional stack (Vercel + AWS): **$100-200+/month**

## 🎯 Feature Roadmap

### Phase 1 ✅ (Completed)
- [x] Complete database schema (30+ tables)
- [x] All 4 magician services implemented
- [x] ASL video service with R2 integration
- [x] VR counselor matching algorithm
- [x] Cloudflare deployment pipeline
- [x] Environment configuration

### Phase 2 (Next)
- [ ] API routes for all magician endpoints
- [ ] Frontend components for each magician
- [ ] Real-time video chat integration
- [ ] Payment processing for services
- [ ] Admin dashboard

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] AI chatbot integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] White-label platform

## 🆘 Troubleshooting

### Build Errors

```bash
# If you get peer dependency errors:
npm install --legacy-peer-deps

# If TypeScript errors persist:
npm run typecheck

# Clear and rebuild:
rm -rf node_modules dist
npm install --legacy-peer-deps
npm run build
```

### Database Issues

```bash
# Reset database:
npm run db:push

# Check connection:
node -e "require('pg').Client({connectionString: process.env.DATABASE_URL}).connect().then(() => console.log('Connected!')).catch(console.error)"
```

### Deployment Failures

1. **Check GitHub Actions logs** - Look for specific error messages
2. **Verify all secrets are set** - Missing env vars are common
3. **Check Cloudflare Pages logs** - View in Cloudflare Dashboard
4. **Database migrations** - Ensure migrations run before deployment

### R2 Upload Issues

```bash
# Test R2 credentials:
node -e "const {S3Client} = require('@aws-sdk/client-s3'); new S3Client({region:'auto',endpoint:'https://'+process.env.CLOUDFLARE_ACCOUNT_ID+'.r2.cloudflarestorage.com',credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY}}).send(new (require('@aws-sdk/client-s3').ListBucketsCommand)({})).then(r=>console.log('Success:',r.Buckets)).catch(console.error)"
```

## 📚 Documentation

- [API Documentation](./API.md) - API endpoints reference
- [Database Schema](./DATABASE.md) - Complete schema documentation
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Architecture](./ARCHITECTURE.md) - System design overview

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Setup for Contributors

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/Magician_Platform.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm run dev
npm run test

# Commit with conventional commits
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

## 👥 Team

- **360 Magician Team** - [GitHub](https://github.com/MBTQ-dev)
- **Contributors** - [Contributors List](https://github.com/MBTQ-dev/Magician_Platform/graphs/contributors)

## 🔗 Links

- **Production**: https://360magicians.com
- **Staging**: https://mbtq.dev
- **Documentation**: https://docs.360magicians.com
- **Status**: https://status.360magicians.com

---

**Built with ❤️ for the Deaf Community**

Need help? Open an issue or contact us at support@360magicians.com
