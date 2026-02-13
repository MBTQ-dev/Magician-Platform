/**
 * Magician Platform - Standardized Zod Validation Schemas
 * 
 * Comprehensive validation schemas for all Magician operations,
 * ensuring type safety and compliance with platform standards.
 */

import { z } from 'zod';

// ============================================================================
// Core Magician Context Schemas
// ============================================================================

export const MagicianContextSchema = z.object({
  userId: z.number().optional(),
  userProfile: z.any().optional(),
  deafAuthToken: z.string().optional(),
  fibonroseScore: z.number().optional(),
  permissions: z.array(z.string()).optional(),
  isDeaf: z.boolean().optional(),
  preferASL: z.boolean().optional(),
  vrCounselorId: z.number().optional(),
  workforceCertified: z.boolean().optional(),
});

export const MagicianActionSchema = z.object({
  type: z.string(),
  timestamp: z.date(),
  magicianId: z.string(),
  userId: z.number().optional(),
  action: z.string(),
  details: z.any(),
  success: z.boolean(),
  error: z.string().optional(),
  complianceFlags: z.array(z.string()).optional(),
});

export const MagicianCoordinationRequestSchema = z.object({
  fromMagician: z.string(),
  toMagician: z.string(),
  requestType: z.string(),
  payload: z.any(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
});

// ============================================================================
// User and Authentication Schemas
// ============================================================================

export const UserRegistrationSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
  email: z.string().email(),
  isDeaf: z.boolean().optional().default(false),
  preferASL: z.boolean().optional().default(false),
  userType: z.enum(['job_seeker', 'entrepreneur', 'employer']).optional(),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const DeafAuthTokenSchema = z.object({
  token: z.string(),
  userId: z.number(),
  expiresAt: z.date(),
  permissions: z.array(z.string()),
});

// ============================================================================
// Fibonrose Reputation Schemas
// ============================================================================

export const ContributionTypeSchema = z.enum([
  'complete_gig',
  'gig_5star_review',
  'dao_vote',
  'help_community_member',
  'mentor_session',
  'create_asl_content',
  'complete_training',
  'refer_user',
  'contribute_code',
  'write_documentation',
  'report_bug',
  'submit_feedback',
  'participate_event',
  'verify_identity',
  'complete_profile',
  'harassment_violation',
  'spam_violation',
  'fraud_attempt',
  'policy_violation',
  'share_resource',
]);

export const RecordContributionSchema = z.object({
  userId: z.number(),
  contributionType: ContributionTypeSchema,
  source: z.string(),
  details: z.any().optional(),
});

export const FibonroseScoreSchema = z.object({
  userId: z.number(),
  totalScore: z.number(),
  level: z.number(),
  progress: z.number(),
  badges: z.array(z.string()),
});

export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.string().optional(),
  requiredScore: z.number().optional(),
  requiredActions: z.any().optional(),
});

// ============================================================================
// Workflow and Automation Schemas
// ============================================================================

export const WorkflowTriggerSchema = z.object({
  type: z.enum(['schedule', 'event', 'manual', 'condition']),
  config: z.any(),
});

export const WorkflowActionSchema = z.object({
  type: z.string(),
  config: z.any(),
  retryPolicy: z.object({
    maxAttempts: z.number().optional(),
    backoffMs: z.number().optional(),
  }).optional(),
});

export const WorkflowRecipeSchema = z.object({
  recipeId: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  trigger: WorkflowTriggerSchema,
  actions: z.array(WorkflowActionSchema),
  enabled: z.boolean().optional().default(true),
  createdBy: z.number().optional(),
});

// ============================================================================
// Vocational Rehabilitation Compliance Schemas
// ============================================================================

export const VRComplianceRecordSchema = z.object({
  userId: z.number(),
  vrCounselorId: z.number(),
  programType: z.enum(['self_employment', 'job_placement', 'training', 'supported_employment']),
  serviceDate: z.date(),
  serviceType: z.string(),
  outcome: z.string().optional(),
  notes: z.string().optional(),
  complianceStatus: z.enum(['compliant', 'pending_review', 'non_compliant']),
  regulationsCited: z.array(z.string()).optional(),
});

export const WorkforceSolutionsRecordSchema = z.object({
  userId: z.number(),
  programId: z.string(),
  programName: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(['active', 'completed', 'withdrawn', 'on_hold']),
  milestones: z.array(z.object({
    name: z.string(),
    completedAt: z.date().optional(),
    status: z.enum(['pending', 'completed', 'overdue']),
  })).optional(),
  complianceChecks: z.array(z.object({
    checkType: z.string(),
    checkDate: z.date(),
    passed: z.boolean(),
    notes: z.string().optional(),
  })).optional(),
});

// ============================================================================
// Business Magician Schemas
// ============================================================================

export const BusinessIdeaSchema = z.object({
  userId: z.number(),
  ideaTitle: z.string(),
  description: z.string(),
  targetMarket: z.string().optional(),
  deafCommunityFocus: z.boolean().optional(),
  aslServicesIncluded: z.boolean().optional(),
  estimatedStartupCost: z.number().optional(),
  vrSupported: z.boolean().optional(),
});

export const BusinessFormationRequestSchema = z.object({
  userId: z.number(),
  businessName: z.string(),
  businessType: z.enum(['LLC', 'Corporation', 'Sole Proprietorship', 'Partnership', 'Nonprofit']),
  state: z.string(),
  deafOwned: z.boolean().optional(),
  vrParticipant: z.boolean().optional(),
});

export const SBAResourceRequestSchema = z.object({
  userId: z.number(),
  resourceType: z.enum(['loan', 'grant', 'counseling', 'training', 'mentorship']),
  businessStage: z.enum(['ideation', 'startup', 'growth', 'established']),
  preferASL: z.boolean().optional(),
});

// ============================================================================
// Developer Magician Schemas
// ============================================================================

export const ProjectGenerationRequestSchema = z.object({
  userId: z.number(),
  projectType: z.string(),
  framework: z.string().optional(),
  features: z.array(z.string()).optional(),
  deafAccessible: z.boolean().optional().default(true),
  aslSupport: z.boolean().optional().default(false),
});

export const CodeReviewRequestSchema = z.object({
  userId: z.number(),
  repositoryUrl: z.string().optional(),
  codeSnippet: z.string().optional(),
  language: z.string(),
  reviewType: z.enum(['security', 'accessibility', 'performance', 'best_practices', 'full']),
});

export const TechnicalResourceRequestSchema = z.object({
  userId: z.number(),
  topic: z.string(),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredFormat: z.enum(['video', 'text', 'asl', 'interactive']).optional(),
});

// ============================================================================
// Job Magician Schemas
// ============================================================================

export const JobSeekerProfileSchema = z.object({
  userId: z.number(),
  skills: z.array(z.string()),
  experience: z.string().optional(),
  education: z.string().optional(),
  isDeaf: z.boolean(),
  needsASL: z.boolean().optional(),
  needsAccommodations: z.boolean().optional(),
  accommodationDetails: z.string().optional(),
  vrParticipant: z.boolean().optional(),
  vrCounselorContact: z.string().optional(),
});

export const JobMatchRequestSchema = z.object({
  userId: z.number(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  deafFriendly: z.boolean().optional(),
  minSalary: z.number().optional(),
});

export const JobApplicationSchema = z.object({
  userId: z.number(),
  jobId: z.string(),
  resumeUrl: z.string().optional(),
  coverLetter: z.string().optional(),
  needsAccommodations: z.boolean().optional(),
  accommodationRequest: z.string().optional(),
});

// ============================================================================
// Creative Magician Schemas
// ============================================================================

export const CreativeProjectRequestSchema = z.object({
  userId: z.number(),
  projectType: z.enum(['video', 'graphic_design', 'animation', 'asl_content', 'website', 'marketing']),
  description: z.string(),
  budget: z.number().optional(),
  deadline: z.date().optional(),
  aslRequired: z.boolean().optional(),
});

export const ASLContentRequestSchema = z.object({
  userId: z.number(),
  contentType: z.enum(['tutorial', 'announcement', 'story', 'educational', 'marketing']),
  scriptText: z.string().optional(),
  duration: z.number().optional(),
  interpreterNeeded: z.boolean().optional(),
});

export const PortfolioItemSchema = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  mediaUrl: z.string(),
  mediaType: z.enum(['image', 'video', 'document', 'link']),
  tags: z.array(z.string()).optional(),
  aslIncluded: z.boolean().optional(),
});

// ============================================================================
// API Request/Response Schemas
// ============================================================================

export const MagicianExecuteRequestSchema = z.object({
  action: z.string(),
  params: z.any(),
  context: MagicianContextSchema.optional(),
});

export const MagicianExecuteResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  actionId: z.string().optional(),
  complianceStatus: z.enum(['compliant', 'pending', 'review_needed']).optional(),
});

export const StandardAPIResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.date().optional(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type MagicianContext = z.infer<typeof MagicianContextSchema>;
export type MagicianAction = z.infer<typeof MagicianActionSchema>;
export type MagicianCoordinationRequest = z.infer<typeof MagicianCoordinationRequestSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type ContributionType = z.infer<typeof ContributionTypeSchema>;
export type RecordContribution = z.infer<typeof RecordContributionSchema>;
export type FibonroseScore = z.infer<typeof FibonroseScoreSchema>;
export type WorkflowRecipe = z.infer<typeof WorkflowRecipeSchema>;
export type VRComplianceRecord = z.infer<typeof VRComplianceRecordSchema>;
export type WorkforceSolutionsRecord = z.infer<typeof WorkforceSolutionsRecordSchema>;
export type BusinessIdea = z.infer<typeof BusinessIdeaSchema>;
export type BusinessFormationRequest = z.infer<typeof BusinessFormationRequestSchema>;
export type ProjectGenerationRequest = z.infer<typeof ProjectGenerationRequestSchema>;
export type JobSeekerProfile = z.infer<typeof JobSeekerProfileSchema>;
export type JobMatchRequest = z.infer<typeof JobMatchRequestSchema>;
export type CreativeProjectRequest = z.infer<typeof CreativeProjectRequestSchema>;
export type ASLContentRequest = z.infer<typeof ASLContentRequestSchema>;
export type MagicianExecuteRequest = z.infer<typeof MagicianExecuteRequestSchema>;
export type MagicianExecuteResponse = z.infer<typeof MagicianExecuteResponseSchema>;
