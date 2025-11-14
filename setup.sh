#!/bin/bash

# 360 Magicians Platform - Automated Setup Script
# This script sets up the complete development environment

set -e

echo "=========================================="
echo "360 Magicians Platform Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${NC}ℹ $1${NC}"
}

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_warning "Node.js version $NODE_VERSION detected. Version 20+ recommended."
else
    print_success "Node.js version $(node -v) detected"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi
print_success "npm $(npm -v) detected"

# Install dependencies
echo ""
echo "Installing dependencies..."
if npm install --legacy-peer-deps; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
echo ""
echo "Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    print_success ".env file created from .env.example"
    print_warning "Please edit .env file with your actual credentials"
    echo ""
    print_info "Required credentials:"
    print_info "  - Supabase URL and API keys"
    print_info "  - Cloudflare Account ID and API token"
    print_info "  - R2 Access keys"
    print_info "  - Anthropic API key"
    echo ""
else
    print_info ".env file already exists"
fi

# Check if database URL is configured
echo ""
echo "Checking database configuration..."
if grep -q "your-project.supabase.co" .env 2>/dev/null; then
    print_warning "Database not configured yet"
    print_info "Please update DATABASE_URL in .env file"
    echo ""
    read -p "Would you like to skip database setup for now? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Please configure your database and run: npm run db:push"
        exit 0
    fi
else
    print_success "Database URL configured"
    
    # Attempt database migration
    read -p "Run database migrations now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Running database migrations..."
        if npm run db:push; then
            print_success "Database schema applied successfully"
        else
            print_error "Failed to apply database schema"
            print_info "Please check your database connection and try: npm run db:push"
        fi
    fi
fi

# Build check
echo ""
echo "Testing build process..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    print_info "Please check the errors above and fix any issues"
    exit 1
fi

# Create necessary directories
echo ""
echo "Creating project directories..."
mkdir -p tmp
mkdir -p uploads
print_success "Project directories created"

# Git setup
echo ""
if [ -d .git ]; then
    print_info "Git repository already initialized"
else
    read -p "Initialize git repository? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git init
        print_success "Git repository initialized"
    fi
fi

# Print completion message
echo ""
echo "=========================================="
echo "Setup Complete! 🎉"
echo "=========================================="
echo ""
print_success "360 Magicians Platform is ready!"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure environment variables:"
echo "   nano .env"
echo ""
echo "2. Start development server:"
echo "   npm run dev"
echo ""
echo "3. Visit http://localhost:5000"
echo ""
echo "4. Read DEPLOYMENT.md for full deployment guide"
echo ""
echo "=========================================="
echo "Features Available:"
echo "=========================================="
echo "✓ Business Magician - Business formation & funding"
echo "✓ Developer Magician - Code scaffolding & tech stack"
echo "✓ Creative Magician - Branding & ASL videos"
echo "✓ Job Magician - Career development & job matching"
echo "✓ VR Counselor Matching - AI-powered counselor pairing"
echo "✓ ASL Video Integration - R2 storage & processing"
echo ""
echo "=========================================="
echo "Need Help?"
echo "=========================================="
echo "📖 Documentation: DEPLOYMENT.md"
echo "🐛 Issues: https://github.com/MBTQ-dev/Magician_Platform/issues"
echo "💬 Support: support@360magicians.com"
echo ""
print_success "Happy coding! 🚀"
