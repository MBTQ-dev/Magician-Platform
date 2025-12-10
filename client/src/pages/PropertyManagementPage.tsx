import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Bell, 
  DollarSign, 
  Wrench, 
  Smartphone, 
  Home, 
  BarChart3, 
  Lock, 
  Globe 
} from 'lucide-react';

/**
 * Deaf-First Smart Property Management Platform
 * 
 * Complete platform for accessible housing & property operations
 * Powered by MBTQ Universe + ASL AI Infrastructure
 */
export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            🏠 Deaf-First Smart Property Management
          </h1>
          <p className="text-xl text-slate-300 mb-3">
            Complete Platform for Accessible Housing & Property Operations
          </p>
          <p className="text-lg text-purple-400 font-medium">
            Powered by MBTQ Universe + ASL AI Infrastructure
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* ASL Video Communication */}
          <FeatureCard
            icon={<Video className="h-12 w-12" />}
            title="ASL Video Communication"
            description="All tenant-landlord communication via sign language with AI-powered translation"
            points={[
              "Real-time ASL video calls with asl-ai-app interface",
              "Automated maintenance request translation",
              "24/7 ASL emergency hotline with AI routing",
              "Video lease signing and documentation",
              "VRS provider integration for hearing landlords"
            ]}
            badge="ASL-First Design"
          />

          {/* Visual Alert System */}
          <FeatureCard
            icon={<Bell className="h-12 w-12" />}
            title="Visual Alert System"
            description="Smart home integration with visual notifications for all property alerts"
            points={[
              "Doorbell with video + flashing lights",
              "Fire/smoke alarms with strobe integration",
              "Package delivery visual notifications",
              "Maintenance visit scheduling alerts",
              "Emergency evacuation visual guidance"
            ]}
            badge="IoT Enabled"
          />

          {/* Automated Rent & Payments */}
          <FeatureCard
            icon={<DollarSign className="h-12 w-12" />}
            title="Automated Rent & Payments"
            description="Seamless payment processing with visual confirmations and ASL support"
            points={[
              "Auto-pay with visual payment confirmations",
              "ASL video explanations of charges",
              "Payment plan negotiation via video chat",
              "Utility payment tracking and splitting",
              "Transparent fee breakdown in ASL"
            ]}
            badge="FibonRose Compliant"
          />

          {/* Smart Maintenance System */}
          <FeatureCard
            icon={<Wrench className="h-12 w-12" />}
            title="Smart Maintenance System"
            description="AI-powered maintenance requests with visual documentation"
            points={[
              "Submit requests via ASL video or photos",
              "360Magicians AI categorizes and routes issues",
              "Real-time status updates with visual timeline",
              "Contractor coordination with ASL support",
              "Quality verification through video review"
            ]}
            badge="AI-Powered"
          />

          {/* Mobile-First Platform */}
          <FeatureCard
            icon={<Smartphone className="h-12 w-12" />}
            title="Mobile-First Platform"
            description="Complete property management in your pocket with accessibility built-in"
            points={[
              "Native iOS/Android apps with asl-ai-app core",
              "Offline mode for areas with poor connectivity",
              "Push notifications with visual indicators",
              "Document scanning and ASL annotation",
              "Community board with video posts"
            ]}
            badge="Mobile Native"
          />

          {/* Community Features */}
          <FeatureCard
            icon={<Home className="h-12 w-12" />}
            title="Community Features"
            description="Build Deaf-friendly communities with social and safety features"
            points={[
              "Deaf neighbor directory (opt-in)",
              "Community events in ASL",
              "Shared amenity booking with visual calendar",
              "Safety buddy system for emergencies",
              "Local Deaf business recommendations"
            ]}
            badge="Community-Driven"
          />

          {/* Landlord Dashboard */}
          <FeatureCard
            icon={<BarChart3 className="h-12 w-12" />}
            title="Landlord Dashboard"
            description="Property owners get AI-powered analytics and automation"
            points={[
              "Portfolio overview with visual KPIs",
              "Automated lease renewals with ASL notifications",
              "Maintenance cost tracking and predictions",
              "Tenant satisfaction scores",
              "ADA compliance monitoring and reporting"
            ]}
            badge="PinkSync Automated"
          />

          {/* Security & Privacy */}
          <FeatureCard
            icon={<Lock className="h-12 w-12" />}
            title="Security & Privacy"
            description="DeafAUTH-powered security with complete data protection"
            points={[
              "Verified Deaf community member authentication",
              "End-to-end encrypted video communication",
              "GDPR/CCPA compliant data handling",
              "Blockchain lease agreements via FibonRose",
              "Privacy-first identity verification"
            ]}
            badge="DeafAUTH Secured"
          />

          {/* Regional Sign Language */}
          <FeatureCard
            icon={<Globe className="h-12 w-12" />}
            title="Regional Sign Language"
            description="Support for ASL, BSL, Auslan, and other sign languages globally"
            points={[
              "Multi-language sign language recognition",
              "Regional dialect adaptation via ML",
              "Cultural context awareness in translations",
              "Local Deaf community standards integration",
              "International property management support"
            ]}
            badge="Global Ready"
          />
        </div>

        {/* Technology Stack Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            🚀 Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TechItem 
              name="asl-ai-app" 
              role="Frontend UI with video chat, visual alerts, and mobile apps" 
            />
            <TechItem 
              name="asl-ai-engine" 
              role="ML engine for ASL recognition, request categorization, and predictions" 
            />
            <TechItem 
              name="asl-gateway-fastapi" 
              role="API gateway handling all property operations and integrations" 
            />
            <TechItem 
              name="pinksync/full-stack" 
              role="Automation engine for maintenance, payments, and compliance" 
            />
            <TechItem 
              name="DeafAUTH" 
              role="Identity verification for tenants, landlords, and service providers" 
            />
            <TechItem 
              name="PinkSync" 
              role="Workflow automation for lease management and operations" 
            />
            <TechItem 
              name="FibonRose" 
              role="Legal compliance, fair housing monitoring, and trust scoring" 
            />
            <TechItem 
              name="360Magicians" 
              role="AI agents for customer support, maintenance routing, and analytics" 
            />
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            📋 Tenant Onboarding Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <WorkflowStep 
              number={1} 
              title="Property Search" 
              description="Browse Deaf-accessible properties with ASL video tours" 
            />
            <WorkflowStep 
              number={2} 
              title="DeafAUTH Verify" 
              description="Secure identity verification and community validation" 
            />
            <WorkflowStep 
              number={3} 
              title="Video Application" 
              description="Submit rental application via ASL video interview" 
            />
            <WorkflowStep 
              number={4} 
              title="Smart Screening" 
              description="AI-powered fair screening with FibonRose compliance" 
            />
            <WorkflowStep 
              number={5} 
              title="ASL Lease Review" 
              description="Lease terms explained in sign language with Q&A" 
            />
            <WorkflowStep 
              number={6} 
              title="Digital Signing" 
              description="Video signature with blockchain verification" 
            />
            <WorkflowStep 
              number={7} 
              title="Move-In Setup" 
              description="Automated key exchange, utility setup, IoT device pairing" 
            />
            <WorkflowStep 
              number={8} 
              title="Community Welcome" 
              description="Introduction to Deaf neighbors and local resources" 
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border-2 border-purple-400/40">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build the Future of Accessible Housing?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-6 text-lg"
            >
              Launch Platform on mbtq.dev
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-300 hover:bg-purple-500/20 font-bold px-8 py-6 text-lg"
            >
              View Technical Architecture
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
  badge: string;
}

function FeatureCard({ icon, title, description, points, badge }: FeatureCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/40 hover:border-purple-500/50 transition-all duration-300">
      <div className="text-purple-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-purple-400 mb-3">
        {title}
      </h3>
      <p className="text-slate-300 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      <ul className="space-y-2 mb-4">
        {points.map((point, index) => (
          <li key={index} className="text-slate-200 text-sm flex items-start">
            <span className="text-purple-400 font-bold mr-2 text-lg">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
        {badge}
      </span>
    </div>
  );
}

// Tech Item Component
interface TechItemProps {
  name: string;
  role: string;
}

function TechItem({ name, role }: TechItemProps) {
  return (
    <div className="bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-400/30 rounded-xl p-5 text-center">
      <h4 className="text-lg font-semibold text-purple-400 mb-2">
        {name}
      </h4>
      <p className="text-slate-300 text-sm">
        {role}
      </p>
    </div>
  );
}

// Workflow Step Component
interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
}

function WorkflowStep({ number, title, description }: WorkflowStepProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-center">
      <div className="text-4xl font-black mb-3 opacity-70">
        {number}
      </div>
      <h4 className="text-base font-semibold mb-2">
        {title}
      </h4>
      <p className="text-sm opacity-90">
        {description}
      </p>
    </div>
  );
}
