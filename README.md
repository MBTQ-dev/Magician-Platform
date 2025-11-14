# 360 Magicians Platform

A comprehensive business platform for deaf entrepreneurs, providing tools for business development, code scaffolding, creative branding, and career development - all optimized for the deaf community.

![360 Magicians Platform](https://business.360magicians.com)

## 🎯 The 4 Magicians

### 🏢 Business Magician
- AI-powered business idea generation
- Business formation & legal setup
- Funding source discovery (grants, loans, crowdfunding)
- Business planning & cost estimation
- VR counselor integration

### 💻 Developer Magician
- Code scaffolding with popular frameworks
- Tech stack recommendations
- CI/CD configuration generation
- Deployment automation
- Deaf-accessible coding resources

### 🎨 Creative Magician
- AI-powered brand identity design
- ASL video production services
- Marketing content calendar
- Deaf accessibility UI/UX guidelines
- Social media strategy

### 💼 Job Magician
- Resume & video resume builder
- AI-powered job matching
- Interview preparation (deaf-specific)
- Career development resources
- Application tracking

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/MBTQ-dev/Magician_Platform.git
cd Magician_Platform
chmod +x setup.sh
./setup.sh

# Configure environment
cp .env.example .env
nano .env  # Add your credentials

# Run development server
npm run dev
```

Visit http://localhost:5000

## 📚 Complete Documentation

For full deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Key sections:
- Environment setup (Supabase, Cloudflare, R2)
- Database schema (30+ tables)
- CI/CD pipeline configuration
- Cost breakdown ($5-50/month)
- Troubleshooting guide

## 🔧 Technologies

- **Frontend**: React + TypeScript + Tailwind CSS + Shadcn/UI
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Drizzle ORM (Supabase)
- **Storage**: Cloudflare R2 (ASL videos & assets)
- **Deployment**: Cloudflare Pages + Workers
- **AI**: Anthropic Claude API
- **Real-time**: Socket.io for live updates

## 📋 Requirements

- Node.js 20+
- PostgreSQL database (or Supabase account)
- Cloudflare account (for R2 and Pages)
- Anthropic API key (for AI features)

## 🗄️ Database Schema

The platform includes **30+ optimized tables**:

**Core**: Users, progress tracking, activity logs  
**Business**: Businesses, funding sources, formations, documents  
**Developer**: Project templates, user projects  
**Creative**: Brand assets, ASL videos, video requests  
**Job**: Profiles, listings, applications, match scores  
**VR**: Counselor profiles, matching, sessions  
**Files**: R2 file management

See [DEPLOYMENT.md](./DEPLOYMENT.md#database-schema) for complete schema.

## 🔄 Development Workflow

```bash
# Development
npm run dev              # Start dev server (port 5000)
npm run typecheck        # TypeScript checks
npm run build           # Production build

# Database
npm run db:push         # Apply schema changes
npm run db:studio       # Visual database editor

# Deployment
git push origin develop  # Deploy to staging (mbtq.dev)
git push origin main     # Deploy to production (360magicians.com)
```

## 🌟 Key Features

- ✅ **Deaf-First Design** - ASL video integration throughout
- ✅ **VR Counselor Matching** - AI-powered matching algorithm
- ✅ **Complete Workflow** - From idea to launched business
- ✅ **4 AI Agents** - Specialized help for every stage
- ✅ **Cloudflare Stack** - Fast, reliable, cost-effective
- ✅ **CI/CD Pipeline** - Automated testing and deployment
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Video-First** - Optimized for visual communication

## 📊 Cost Breakdown

**Monthly: $5-50** (vs $100-200+ traditional stack)

- Cloudflare Pages: **FREE**
- Cloudflare R2 (10GB): **FREE**
- Supabase: **$0-25/month**
- Anthropic API: **$5-20/month**

## 🚢 Deployment

### Automatic (Recommended)

Configured GitHub Actions automatically deploy:
- `develop` → mbtq.dev (staging)
- `main` → 360magicians.com (production)

### Manual

```bash
npm run build
# Deploy dist/public to Cloudflare Pages
# Deploy dist/index.js to Workers or VPS
```

See [DEPLOYMENT.md](./DEPLOYMENT.md#deployment) for details.

## 🆘 Troubleshooting

### Build Issues
```bash
npm install --legacy-peer-deps  # Fix peer dependency issues
npm run typecheck              # Check TypeScript errors
```

### Database Issues
```bash
npm run db:push                # Sync schema
```

See [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting) for more help.

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
# Setup for development
git clone https://github.com/YOUR_USERNAME/Magician_Platform.git
cd Magician_Platform
./setup.sh

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes, test, and submit PR
```

## 📄 License

[MIT License](./LICENSE)

## 👥 Team

- **360 Magician Team** - [MBTQ-dev](https://github.com/MBTQ-dev)
- Built with ❤️ for the Deaf Community

## 🔗 Links

- **Production**: https://360magicians.com
- **Staging**: https://mbtq.dev
- **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/MBTQ-dev/Magician_Platform/issues)

---

**Need help?** Open an issue or contact support@360magicians.com