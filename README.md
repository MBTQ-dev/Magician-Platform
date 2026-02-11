# 🌈 MBTQ.dev | AI-Powered Compliance and Workforce System 

**A modular, production-ready reusable compliance and workflow system originally built to support deaf entrepreneurs, job seekers, developers, and creatives.**

**Generative AI Platform for Building with Supabase & Modern Frameworks**

**VR Agency • Deaf Community • LGBTQ+ Agency Compliant**

![MBTQ.dev Platform](https://mbtq.dev)

[![Open Source](https://img.shields.io/badge/Open%20Source-💜-purple)](https://github.com/MBTQ-dev)
[![Deaf Friendly](https://img.shields.io/badge/🦻%20Deaf-Friendly-yellow)](./ACCESSIBILITY_STATEMENT.md)
[![AI Powered](https://img.shields.io/badge/AI-Powered-green)](./docs/index.html)
[![LGBTQ+ Friendly](https://img.shields.io/badge/🏳️‍🌈%20LGBTQ%2B-Friendly-rainbow)](https://mbtq.dev)
[![VR Compliant](https://img.shields.io/badge/VR-Compliant-orange)](./COMPLIANCE_GUIDE.md)
[![ASL Supported](https://img.shields.io/badge/🤟%20ASL-Supported-blue)](./ACCESSIBILITY_STATEMENT.md)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA-success)](./ACCESSIBILITY_STATEMENT.md)

## 🚀 Built by Community, Powered by AI

---

## 🌟 Overview

The MBTQ.dev platform is a **reusable compliance and workflow system** originally built to support deaf entrepreneurs, job seekers, developers, and creatives. It provides battle-tested, modular components that any organization can integrate to handle:

- **Vocational Rehabilitation (VR) Compliance** - Complete 34 CFR Part 361 tracking and reporting
- **Workforce Development** - WIOA-aligned program management and outcome tracking
- **Accessibility Standards** - WCAG 2.1 Level AA compliance tooling and auditing
- **LGBTQ+ Agency Compliance** - Inclusive service tracking for LGBTQ+ organizations
- **Security Validation** - Authentication, authorization, and audit logging
- **Workflow Automation** - GitHub Apps, bots, and AI agents for task automation
- **Generative AI Integration** - GPT-4, Claude, Gemini integration examples
- **Database Schema** - Production-ready schemas with Drizzle ORM and Zod validation

---

## 📢 Platform Focus

**Core Focus:** 
- 🤖 **Generative AI Development Platform** - Build full-stack applications with modern AI tools
- 📋 **VR Agency Compliance** - 34 CFR Part 361 tracking and reporting built-in
- 🦻 **Deaf Community First** - ASL-friendly, accessibility-first design
- 🏳️‍🌈 **LGBTQ+ Agency Friendly** - Inclusive compliance and service tracking

---

## ✨ What MBTQ.dev Offers Today

| Feature | Description |
|---------|-------------|
| 🤖 **Generative AI Integration** | Learn how to integrate AI models (GPT-4, Claude, Gemini) into your full-stack applications with best practices and examples. |
| 🔌 **Supabase Backend** | Complete guides for connecting your frontend to Supabase - authentication, real-time database, storage, and edge functions. |
| ⚡ **Modern Frameworks** | Examples and starter kits using Next.js, React, and other modern frameworks for rapid development. |
| 🦻 **Deaf-First Accessibility** | WCAG-compliant components, screen reader optimization, and ASL-friendly design patterns built into every template. |
| 📋 **VR Compliance** | Complete 34 CFR Part 361 tracking, enrollment management, and outcome reporting for VR agencies. |
| 🏳️‍🌈 **LGBTQ+ Agency Support** | Inclusive service tracking, compliance features, and community-friendly design patterns. |
| 📚 **API Discovery** | Learn how to find, integrate, and work with third-party APIs to enhance your applications. |
| 🎨 **Full-Stack Templates** | Production-ready templates with authentication, database, and API integrations already configured. |

---

## 🎯 Specialized Platforms → Magician Ecosystem

Looking for specialized features? These are available on dedicated platforms powered by **360 Magicians AI agents**:

| Platform | Focus | Features |
|----------|-------|----------|
| 💼 **[BUSINESS MAGICIAN](https://business.360magicians.com)** | Entrepreneurship | ✓ Idea Validation & Market Research<br>✓ Business Plan Generation<br>✓ Growth Strategy Planning<br>✓ Managed Services for Entrepreneurs |
| 🎨 **CREATIVE MAGICIAN** | Creative Features | ✓ ASL Content Creation<br>✓ Portfolio Building<br>✓ Brand Development |
| 🎯 **JOB MAGICIAN** | Career/Employment | ✓ Job Matching & Search<br>✓ Resume Building<br>✓ Interview Preparation |
| 💻 **DEVELOPER MAGICIAN** | SaaS/Development | ✓ Project Scaffolding<br>✓ Code Review<br>✓ Deployment Guidance |

---

## 🤟 Why Use MBTQ.dev?

✅ **Modular Architecture** - Use individual components or the full system  
✅ **Production Ready** - Battle-tested with real VR and workforce programs  
✅ **Compliance Built-In** - Federal regulations baked into the schema and validation  
✅ **Deaf-First Design** - ASL-friendly with WCAG 2.1 AA compliance  
✅ **LGBTQ+ Friendly** - Inclusive design for LGBTQ+ agencies and services  
✅ **AI-First** - Generative AI integrated throughout  
✅ **Type-Safe** - Full TypeScript with Zod runtime validation  
✅ **Well Documented** - Comprehensive guides for integration and deployment  

### Use Cases

- **VR Agencies**: Track enrollments, services, milestones, and outcomes with 34 CFR Part 361 compliance
- **LGBTQ+ Agencies**: Manage inclusive services with compliant tracking and reporting
- **Deaf Community Services**: Build accessible applications with ASL-friendly design
- **Workforce Programs**: Manage WIOA compliance and performance metrics
- **Developers**: Build full-stack applications with modern AI-powered tools
- **Startups**: Get production-ready templates and scaffolding
- **Government Contractors**: Meet accessibility and compliance requirements
- **SaaS Platforms**: Integrate AI, Supabase, and compliance features into your product
- **Educational Institutions**: Track student services and outcomes
- **Healthcare Systems**: Manage rehabilitation and employment services

## 🚀 Quick Start with Supabase

```bash
# 1. Install Supabase Client
npm install @supabase/supabase-js

# 2. Initialize in your app
```

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

// 3. Start building!

// Authentication
await supabase.auth.signUp({ email, password })

// Database queries
const { data } = await supabase.from('users').select('*')

// Real-time subscriptions
supabase.channel('public:posts')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, 
    payload => console.log(payload)
  )
  .subscribe()
```

---

## 🤖 GitHub Apps, Bots & Agents

MBTQ.dev provides streamlined repository controls through:

### Automated Workflow Controls

| Component | Purpose |
|-----------|---------|
| 🔧 **GitHub Apps** | Automated code review, deployment triggers, and compliance checks |
| 🤖 **Bots** | Issue triage, PR labeling, and automated documentation updates |
| 🎯 **AI Agents** | Intelligent code generation, accessibility auditing, and testing |

### GitHub Actions Workflows

```yaml
# .github/workflows/mbtq-ci.yml
name: MBTQ.dev CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: MBTQ-dev/mbtq-action@v1
        with:
          check-type: 'accessibility'
          ai-review: true
```

---

## 🔌 Integration Options

MBTQ.dev can be integrated into your project in multiple ways:

### 1. **Supabase Backend Integration**
Connect your frontend to Supabase with our pre-built configurations:
```typescript
// Example: Full-stack integration
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

// Authentication, database, storage - all ready to go
const { data: user } = await supabase.auth.getUser()
```

### 2. **AI Integration Templates**
Use our templates for GPT-4, Claude, and Gemini integration:
```typescript
import { OpenAI } from 'openai'
import Anthropic from '@anthropic-ai/sdk'

// Pre-configured AI clients with best practices
const openai = new OpenAI()
const anthropic = new Anthropic()
```

### 3. **Workflow Modules**
Use our GitHub Actions workflows for automated development:
```yaml
# In your .github/workflows/
- uses: MBTQ-dev/mbtq-action@v1
  with:
    check-type: 'full-stack-review'
    accessibility-audit: true
```

### 4. **Full Platform Deployment**
Deploy the entire platform and integrate via webhooks:
```typescript
// Subscribe to platform events
POST /api/webhooks/register
{ "url": "your-app.com/webhook", "events": ["build.completed", "review.ready"] }
```

See the **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** for complete integration instructions.

## 🤖 360 Magicians - AI Agent Services

### Core Development Agents

| Agent | Focus | Capabilities |
|-------|-------|--------------|
| 🚪 **Gatekeeper Magician** | Security | Identity verification, access control, DeafAuth integration, security monitoring |
| ⭐ **Reputation Tracker Magician** | Trust | Fibonrose reputation scoring, badge issuance, contribution tracking, community trust |
| 🔄 **Workflow Automator Magician** | Automation | Task execution, workflow management, system health, integration coordination |
| 💬 **Community Concierge Magician** | Support | FAQ with ASL, resource discovery, mentor matching, opportunity surfacing |

### Specialized Platform Agents

| Agent | Platform | Capabilities |
|-------|----------|--------------|
| 💼 **Business Magician** | [BUSINESS MAGICIAN](https://business.360magicians.com) | Business idea generation, plan creation, formation guidance, SBA resources, VR self-employment pathway |
| 💻 **Developer Magician** | MBTQ.dev | Project scaffolding, code review, accessibility auditing, deployment guidance |
| 🎯 **Job Magician** | JOB MAGICIAN | Job matching, resume building, interview prep, accommodation guidance, VR job placement |
| 🎨 **Creative Magician** | CREATIVE MAGICIAN | ASL content creation, video production, brand development, portfolio building |

---

## 🎯 Deno + Supabase Integration

The platform supports **dual runtime environments**:
- **Node.js Backend**: Express server for production workloads
- **Deno Application**: Modern, secure runtime with Supabase integration

### Modular Components

| Component | Purpose |
|-----------|---------|
| 🔐 **DeafAuth** | Supabase-powered authentication with OAuth support |
| ⚡ **PinkSync** | Real-time communication and accessibility optimization |
| ⭐ **FibonRose** | Fibonacci-based reputation and trust scoring |
| ✅ **PinkFlow** | Automated testing and workflow validation |

👉 **[Read the complete Deno & Supabase Integration Guide](./DENO_SUPABASE_GUIDE.md)**

---

## 🚀 Key Features

### Vocational Rehabilitation (VR) Compliance
- ✅ **VR enrollment and tracking** - Full case management
- ✅ **IPE (Individualized Plan for Employment)** support
- ✅ **Service authorization and documentation**
- ✅ **Milestone tracking and monitoring**
- ✅ **90-day employment outcome tracking**
- ✅ **Self-employment pathway guidance**
- ✅ **Compliance with 34 CFR Part 361**

### LGBTQ+ Agency Compliance
- ✅ **Inclusive service tracking** - LGBTQ+ friendly intake and case management
- ✅ **Community resource integration** - LGBTQ+ organization partnerships
- ✅ **Safe space compliance** - Privacy-first design patterns
- ✅ **Pronoun and identity support** - Respectful data handling
- ✅ **Anti-discrimination tracking** - Compliance monitoring

### Workforce Solutions
- ✅ **WIOA program integration**
- ✅ **Employment outcome tracking**
- ✅ **Performance metrics and reporting**
- ✅ **Compliance checks and auditing**
- ✅ **Retention milestone monitoring**

### Generative AI Integration
- ✅ **GPT-4, Claude, Gemini** - Pre-configured AI clients
- ✅ **Best practices** - Prompt engineering and response handling
- ✅ **Cost optimization** - Efficient token usage patterns
- ✅ **Error handling** - Robust fallback mechanisms

### Modern Framework Support
- ✅ **Next.js templates** - Server-side rendering ready
- ✅ **React components** - Accessible UI components
- ✅ **TypeScript first** - Full type safety
- ✅ **Tailwind CSS** - Utility-first styling

### Accessibility Features
- ✅ **ASL video content throughout**
- ✅ **WCAG 2.1 Level AA compliance**
- ✅ **Full keyboard navigation**
- ✅ **Screen reader optimization**
- ✅ **Visual notification system**
- ✅ **Deaf-first design principles**
- ✅ **Queer-friendly design patterns**

### Technical Excellence
- ✅ **Comprehensive Zod validation** - Type-safe operations
- ✅ **Semantic database schema** - Drizzle ORM
- ✅ **Inter-Agent coordination** - Magician communication
- ✅ **Audit trail logging** - Full compliance tracking
- ✅ **DeafAuth + JWT** - Secure authentication
- ✅ **Rate limiting and security**

## 🔧 Technologies

- **Frontend**: React + TypeScript, Shadcn/UI components
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas throughout
- **Authentication**: DeafAuth + JWT tokens
- **Storage**: Google Cloud Storage
- **Backend-as-a-Service**: Supabase
- **Deployment**: Vercel
- **AI/ML**: OpenAI GPT-4, Anthropic Claude, Google Gemini
- **Real-time**: Socket.io, HTMX
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