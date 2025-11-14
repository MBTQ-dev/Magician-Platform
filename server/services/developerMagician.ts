/**
 * Developer Magician Service
 * Handles code scaffolding, project generation, and tech stack selection
 */

import type { ProjectTemplate, UserProject, InsertUserProject } from "../../shared/schema";

export interface ProjectScaffoldRequest {
  userId: number;
  projectName: string;
  category: "web" | "mobile" | "api" | "fullstack";
  techStack: string[];
  features?: string[];
  deafAccessible?: boolean;
}

export interface TechStackRecommendation {
  name: string;
  technologies: string[];
  description: string;
  pros: string[];
  cons: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  deafAccessible: boolean;
  hasASLResources: boolean;
}

/**
 * Get available project templates
 */
export function getProjectTemplates(): ProjectTemplate[] {
  // Mock implementation - in production, query database
  return [
    {
      id: 1,
      name: "React + Node.js Full Stack",
      description: "Modern web application with React frontend and Node.js backend",
      category: "fullstack",
      techStack: ["React", "Node.js", "Express", "PostgreSQL", "TypeScript"],
      scaffoldCommand: "npx create-react-app frontend && mkdir backend && cd backend && npm init -y",
      features: ["Authentication", "Database integration", "RESTful API", "Responsive design"],
      deafAccessible: true,
      hasASLDocs: true,
      difficulty: "intermediate",
      estimatedTime: 40,
      githubUrl: "https://github.com/example/react-node-template",
      demoUrl: "https://demo.example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "E-commerce Store with Shopify",
      description: "Complete e-commerce solution with Shopify and custom features",
      category: "web",
      techStack: ["Shopify", "Liquid", "JavaScript", "CSS"],
      scaffoldCommand: "shopify theme init",
      features: ["Product catalog", "Shopping cart", "Payment processing", "Video chat support"],
      deafAccessible: true,
      hasASLDocs: true,
      difficulty: "beginner",
      estimatedTime: 20,
      githubUrl: "https://github.com/example/shopify-template",
      demoUrl: "https://demo-store.example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Mobile App with React Native",
      description: "Cross-platform mobile app for iOS and Android",
      category: "mobile",
      techStack: ["React Native", "Expo", "Firebase", "TypeScript"],
      scaffoldCommand: "npx create-expo-app",
      features: ["Push notifications", "Camera access", "Offline support", "ASL video integration"],
      deafAccessible: true,
      hasASLDocs: true,
      difficulty: "intermediate",
      estimatedTime: 60,
      githubUrl: "https://github.com/example/react-native-template",
      demoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "REST API with Node.js",
      description: "Scalable REST API with authentication and database",
      category: "api",
      techStack: ["Node.js", "Express", "PostgreSQL", "JWT", "TypeScript"],
      scaffoldCommand: "npx express-generator-typescript",
      features: ["JWT authentication", "Database ORM", "API documentation", "Rate limiting"],
      deafAccessible: true,
      hasASLDocs: false,
      difficulty: "intermediate",
      estimatedTime: 30,
      githubUrl: "https://github.com/example/api-template",
      demoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as ProjectTemplate[];
}

/**
 * Recommend tech stack based on project requirements
 */
export function recommendTechStack(requirements: {
  projectType: string;
  features: string[];
  experience: "beginner" | "intermediate" | "advanced";
  budget: "low" | "medium" | "high";
  deafAccessible: boolean;
}): TechStackRecommendation[] {
  const recommendations: TechStackRecommendation[] = [];

  // Web Application Recommendations
  if (requirements.projectType.toLowerCase().includes("web")) {
    recommendations.push({
      name: "Modern JavaScript Stack",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
      description: "Popular, well-supported stack with great community and resources",
      pros: [
        "Large community and resources",
        "Many deaf-accessible tutorials",
        "Free and open source",
        "Great for deaf developers (visual coding)",
      ],
      cons: [
        "Learning curve for beginners",
        "Many choices can be overwhelming",
      ],
      difficulty: requirements.experience === "beginner" ? "intermediate" : requirements.experience,
      estimatedTime: 40,
      deafAccessible: true,
      hasASLResources: true,
    });

    if (requirements.experience === "beginner") {
      recommendations.push({
        name: "No-Code/Low-Code Solution",
        technologies: ["Webflow", "Bubble", "Airtable"],
        description: "Visual development with minimal coding",
        pros: [
          "No programming knowledge required",
          "Very deaf-friendly (visual interface)",
          "Quick to launch",
          "Affordable",
        ],
        cons: [
          "Limited customization",
          "May need to migrate later for complex features",
        ],
        difficulty: "beginner",
        estimatedTime: 10,
        deafAccessible: true,
        hasASLResources: false,
      });
    }
  }

  // E-commerce Recommendations
  if (requirements.features.some(f => f.toLowerCase().includes("commerce") || f.toLowerCase().includes("store"))) {
    recommendations.push({
      name: "Shopify Platform",
      technologies: ["Shopify", "Liquid", "JavaScript"],
      description: "Complete e-commerce solution with everything built-in",
      pros: [
        "All-in-one solution",
        "No hosting needed",
        "Video chat integration available",
        "Great for deaf entrepreneurs",
      ],
      cons: [
        "Monthly fees",
        "Less customization than custom build",
      ],
      difficulty: "beginner",
      estimatedTime: 15,
      deafAccessible: true,
      hasASLResources: true,
    });
  }

  // Mobile App Recommendations
  if (requirements.projectType.toLowerCase().includes("mobile")) {
    recommendations.push({
      name: "React Native + Expo",
      technologies: ["React Native", "Expo", "Firebase"],
      description: "Build iOS and Android apps with one codebase",
      pros: [
        "Write once, deploy everywhere",
        "Large community support",
        "Good ASL video integration options",
        "Free to start",
      ],
      cons: [
        "May need native code for some features",
        "Performance can be an issue for complex apps",
      ],
      difficulty: "intermediate",
      estimatedTime: 50,
      deafAccessible: true,
      hasASLResources: false,
    });
  }

  return recommendations.sort((a, b) => {
    // Prioritize deaf-accessible and beginner-friendly options
    if (requirements.deafAccessible && a.deafAccessible !== b.deafAccessible) {
      return a.deafAccessible ? -1 : 1;
    }
    if (requirements.experience === "beginner" && a.difficulty !== b.difficulty) {
      return a.difficulty === "beginner" ? -1 : 1;
    }
    return 0;
  });
}

/**
 * Generate project scaffold
 */
export async function scaffoldProject(request: ProjectScaffoldRequest): Promise<{
  success: boolean;
  project?: Partial<UserProject>;
  setupInstructions?: string[];
  nextSteps?: string[];
  error?: string;
}> {
  try {
    // Find matching template
    const templates = getProjectTemplates();
    const template = templates.find(t => 
      t.category === request.category && 
      request.techStack.every(tech => t.techStack.includes(tech))
    );

    if (!template) {
      return {
        success: false,
        error: "No matching template found for the specified requirements",
      };
    }

    // Create project record
    const project: Partial<UserProject> = {
      userId: request.userId,
      templateId: template.id,
      name: request.projectName,
      description: `${template.name} project`,
      status: "active",
      techStack: request.techStack,
      configData: {
        features: request.features || [],
        deafAccessible: request.deafAccessible ?? true,
        scaffoldedAt: new Date().toISOString(),
      },
    };

    // Generate setup instructions
    const setupInstructions = [
      `Run: ${template.scaffoldCommand}`,
      "Install dependencies: npm install",
      "Set up environment variables (copy .env.example to .env)",
      "Run development server: npm run dev",
      "Open http://localhost:3000 in your browser",
    ];

    // Generate next steps
    const nextSteps = [
      "Customize the design and branding",
      "Add your business logic",
      "Set up database and authentication",
      "Deploy to production (Vercel, Netlify, or Cloudflare Pages)",
      "Add ASL video support for deaf users",
    ];

    return {
      success: true,
      project,
      setupInstructions,
      nextSteps,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Generate CI/CD configuration
 */
export function generateCICDConfig(techStack: string[]): {
  githubActions?: string;
  vercelConfig?: string;
  cloudflareConfig?: string;
} {
  const hasNode = techStack.some(tech => tech.toLowerCase().includes("node") || tech.toLowerCase().includes("react"));
  
  let githubActions = "";
  if (hasNode) {
    githubActions = `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      # Add deployment step here
`;
  }

  return {
    githubActions,
    vercelConfig: JSON.stringify({
      buildCommand: "npm run build",
      outputDirectory: "dist",
      installCommand: "npm install",
    }, null, 2),
    cloudflareConfig: JSON.stringify({
      build: {
        command: "npm run build",
        destination: "dist",
      },
    }, null, 2),
  };
}

/**
 * Get deployment options
 */
export function getDeploymentOptions(techStack: string[]): Array<{
  name: string;
  description: string;
  pricing: string;
  difficulty: string;
  deafFriendly: boolean;
  setupSteps: string[];
}> {
  return [
    {
      name: "Cloudflare Pages",
      description: "Fast, free hosting with global CDN",
      pricing: "Free (with generous limits)",
      difficulty: "Easy",
      deafFriendly: true,
      setupSteps: [
        "Connect GitHub repository",
        "Configure build settings",
        "Deploy automatically on push",
      ],
    },
    {
      name: "Vercel",
      description: "Premium hosting optimized for Next.js and React",
      pricing: "Free tier available, $20+/month for Pro",
      difficulty: "Easy",
      deafFriendly: true,
      setupSteps: [
        "Import GitHub project",
        "Configure environment variables",
        "Deploy with one click",
      ],
    },
    {
      name: "Netlify",
      description: "Popular hosting with great developer experience",
      pricing: "Free tier available, $19+/month for Pro",
      difficulty: "Easy",
      deafFriendly: true,
      setupSteps: [
        "Connect repository",
        "Set build command and publish directory",
        "Deploy and get custom domain",
      ],
    },
  ];
}

export default {
  getProjectTemplates,
  recommendTechStack,
  scaffoldProject,
  generateCICDConfig,
  getDeploymentOptions,
};
