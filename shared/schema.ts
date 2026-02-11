import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  isDeaf: boolean("is_deaf").default(false),
  preferASL: boolean("prefer_asl").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  isDeaf: true,
  preferASL: true,
});

// Business Lifecycle Phase
export const lifecyclePhases = pgTable("lifecycle_phases", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const insertLifecyclePhaseSchema = createInsertSchema(lifecyclePhases).pick({
  name: true,
  slug: true,
  description: true,
  order: true,
});

// Tasks in each phase
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  phaseId: integer("phase_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  hasASLVideo: boolean("has_asl_video").default(false),
  aslVideoUrl: text("asl_video_url"),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  phaseId: true,
  name: true,
  description: true,
  order: true,
  hasASLVideo: true,
  aslVideoUrl: true,
});

// Subtasks
export const subtasks = pgTable("subtasks", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").notNull(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
});

export const insertSubtaskSchema = createInsertSchema(subtasks).pick({
  taskId: true,
  name: true,
  order: true,
});

// Business Tools
export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  phaseId: integer("phase_id").notNull(),
  toolType: text("tool_type").notNull(), // AI, API, etc.
  actionText: text("action_text").notNull(),
  actionUrl: text("action_url").notNull(),
});

export const insertToolSchema = createInsertSchema(tools).pick({
  name: true,
  description: true,
  phaseId: true,
  toolType: true,
  actionText: true,
  actionUrl: true,
});

// ASL Videos
export const aslVideos = pgTable("asl_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  phaseId: integer("phase_id"),
  taskId: integer("task_id"),
  thumbnail: text("thumbnail"),
});

export const insertASLVideoSchema = createInsertSchema(aslVideos).pick({
  title: true,
  description: true,
  videoUrl: true,
  phaseId: true,
  taskId: true,
  thumbnail: true,
});

// User Progress
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subtaskId: integer("subtask_id").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  subtaskId: true,
  completed: true,
  completedAt: true,
});

// Business Records
export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  businessType: text("business_type"),
  formationState: text("formation_state"),
  formationStatus: text("formation_status"),
  createdAt: timestamp("created_at").defaultNow(),
  apiData: json("api_data"),
});

export const insertBusinessSchema = createInsertSchema(businesses).pick({
  userId: true,
  name: true,
  description: true,
  businessType: true,
  formationState: true,
  formationStatus: true,
  apiData: true,
});

// VR Counselor Integration
export const vrCounselors = pgTable("vr_counselors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  organization: text("organization").notNull(),
});

export const insertVRCounselorSchema = createInsertSchema(vrCounselors).pick({
  name: true,
  email: true,
  phone: true,
  organization: true,
});

// User-Counselor Relationship
export const userCounselors = pgTable("user_counselors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  counselorId: integer("counselor_id").notNull(),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  status: text("status").default("active"),
});

export const insertUserCounselorSchema = createInsertSchema(userCounselors).pick({
  userId: true,
  counselorId: true,
  endDate: true,
  status: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type LifecyclePhase = typeof lifecyclePhases.$inferSelect;
export type InsertLifecyclePhase = z.infer<typeof insertLifecyclePhaseSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Subtask = typeof subtasks.$inferSelect;
export type InsertSubtask = z.infer<typeof insertSubtaskSchema>;

export type Tool = typeof tools.$inferSelect;
export type InsertTool = z.infer<typeof insertToolSchema>;

export type ASLVideo = typeof aslVideos.$inferSelect;
export type InsertASLVideo = z.infer<typeof insertASLVideoSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;

export type VRCounselor = typeof vrCounselors.$inferSelect;
export type InsertVRCounselor = z.infer<typeof insertVRCounselorSchema>;

export type UserCounselor = typeof userCounselors.$inferSelect;
export type InsertUserCounselor = z.infer<typeof insertUserCounselorSchema>;

// Resource Library
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  source: text("source").notNull(),
  url: text("url"),
  fileUrl: text("file_url"),
  thumbnailUrl: text("thumbnail_url"),
  tags: text("tags").array(),
  sbaRelated: boolean("sba_related").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  category: true,
  subcategory: true,
  source: true,
  url: true,
  fileUrl: true,
  thumbnailUrl: true,
  tags: true,
  sbaRelated: true,
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

// Business Formation tables

// Formation Providers
export const formationProviders = pgTable("formation_providers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  apiEndpoint: text("api_endpoint"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFormationProviderSchema = createInsertSchema(formationProviders).pick({
  name: true,
  displayName: true,
  description: true,
  logoUrl: true,
  website: true,
  apiEndpoint: true,
  isActive: true,
});

export type FormationProvider = typeof formationProviders.$inferSelect;
export type InsertFormationProvider = z.infer<typeof insertFormationProviderSchema>;

// Business Formation Records
export const businessFormations = pgTable("business_formations", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull(),
  userId: integer("user_id").notNull(),
  providerId: integer("provider_id").notNull(),
  providerOrderId: varchar("provider_order_id", { length: 100 }).notNull(),
  businessName: varchar("business_name", { length: 200 }).notNull(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(), // pending, processing, completed, failed
  submittedDate: timestamp("submitted_date").defaultNow(),
  estimatedCompletionDate: date("estimated_completion_date"),
  completedDate: timestamp("completed_date"),
  trackingUrl: text("tracking_url"),
  formationData: json("formation_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBusinessFormationSchema = createInsertSchema(businessFormations).pick({
  businessId: true,
  userId: true,
  providerId: true,
  providerOrderId: true,
  businessName: true,
  entityType: true,
  state: true,
  status: true,
  estimatedCompletionDate: true,
  trackingUrl: true,
  formationData: true,
});

export type BusinessFormation = typeof businessFormations.$inferSelect;
export type InsertBusinessFormation = z.infer<typeof insertBusinessFormationSchema>;

// Business Formation Documents
export const formationDocuments = pgTable("formation_documents", {
  id: serial("id").primaryKey(),
  formationId: integer("formation_id").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  documentUrl: text("document_url").notNull(),
  documentType: varchar("document_type", { length: 50 }), // articles, operating agreement, EIN, etc.
  dateIssued: date("date_issued"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFormationDocumentSchema = createInsertSchema(formationDocuments).pick({
  formationId: true,
  name: true,
  documentUrl: true,
  documentType: true,
  dateIssued: true,
});

export type FormationDocument = typeof formationDocuments.$inferSelect;
export type InsertFormationDocument = z.infer<typeof insertFormationDocumentSchema>;

// Formation Provider API Keys
export const providerApiKeys = pgTable("provider_api_keys", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  keyName: varchar("key_name", { length: 100 }).notNull(),
  keyValue: text("key_value").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProviderApiKeySchema = createInsertSchema(providerApiKeys).pick({
  providerId: true,
  keyName: true,
  keyValue: true,
  isActive: true,
});

export type ProviderApiKey = typeof providerApiKeys.$inferSelect;
export type InsertProviderApiKey = z.infer<typeof insertProviderApiKeySchema>;

// ASL Business Dictionary
export const aslDictionaryTerms = pgTable("asl_dictionary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull().unique(),
  definition: text("definition").notNull(),
  category: text("category").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  signHints: text("sign_hints"),
  importance: text("importance").default("medium"), // beginner, intermediate, advanced
  tags: text("tags").array(),
  relatedTerms: text("related_terms").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAslDictionaryTermSchema = createInsertSchema(aslDictionaryTerms).pick({
  term: true,
  definition: true,
  category: true,
  videoUrl: true,
  thumbnailUrl: true,
  signHints: true,
  importance: true,
  tags: true,
  relatedTerms: true,
});

export type AslDictionaryTerm = typeof aslDictionaryTerms.$inferSelect;
export type InsertAslDictionaryTerm = z.infer<typeof insertAslDictionaryTermSchema>;

// Fibonrose Reputation System
export const fibonroseScores = pgTable("fibonrose_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  totalScore: integer("total_score").notNull().default(0),
  level: integer("level").notNull().default(1),
// ============================================================================
// 360 MAGICIANS PLATFORM - COMPLETE DATABASE SCHEMA
// ============================================================================

// ----------------------------------------------------------------------------
// BUSINESS MAGICIAN - Business Formation & Funding
// ----------------------------------------------------------------------------

// Funding Sources
export const fundingSources = pgTable("funding_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // grant, loan, investment, crowdfunding
  description: text("description").notNull(),
  amount: integer("amount"), // in dollars
  minAmount: integer("min_amount"),
  maxAmount: integer("max_amount"),
  eligibilityCriteria: text("eligibility_criteria").array(),
  applicationUrl: text("application_url"),
  deadline: date("deadline"),
  isRecurring: boolean("is_recurring").default(false),
  deafFriendly: boolean("deaf_friendly").default(false),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFibonroseScoreSchema = createInsertSchema(fibonroseScores).pick({
  userId: true,
  totalScore: true,
  level: true,
});

export const fibonroseActivities = pgTable("fibonrose_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  pointsChange: integer("points_change").notNull(),
  newTotal: integer("new_total").notNull(),
  source: text("source").notNull(),
  details: json("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertFibonroseActivitySchema = createInsertSchema(fibonroseActivities).pick({
  userId: true,
  action: true,
  pointsChange: true,
  newTotal: true,
  source: true,
  details: true,
});

export const fibonroseBadges = pgTable("fibonrose_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeId: text("badge_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const insertFibonroseBadgeSchema = createInsertSchema(fibonroseBadges).pick({
  userId: true,
  badgeId: true,
});

// Magician Actions Log
export const magicianActions = pgTable("magician_actions", {
  id: serial("id").primaryKey(),
  magicianId: text("magician_id").notNull(),
  userId: integer("user_id"),
  actionType: text("action_type").notNull(),
  action: text("action").notNull(),
  details: json("details"),
  success: boolean("success").notNull(),
  error: text("error"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertMagicianActionSchema = createInsertSchema(magicianActions).pick({
  magicianId: true,
  userId: true,
  actionType: true,
  action: true,
  details: true,
  success: true,
  error: true,
});

// Workflow Recipes
export const workflowRecipes = pgTable("workflow_recipes", {
  id: serial("id").primaryKey(),
  recipeId: text("recipe_id").notNull().unique(),
  name: text("name").notNull(),
  triggerType: text("trigger_type").notNull(),
  triggerConfig: json("trigger_config").notNull(),
  actions: json("actions").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  createdBy: integer("created_by"),
export const insertFundingSourceSchema = createInsertSchema(fundingSources).pick({
  name: true,
  type: true,
  description: true,
  amount: true,
  minAmount: true,
  maxAmount: true,
  eligibilityCriteria: true,
  applicationUrl: true,
  deadline: true,
  isRecurring: true,
  deafFriendly: true,
  tags: true,
});

export type FundingSource = typeof fundingSources.$inferSelect;
export type InsertFundingSource = z.infer<typeof insertFundingSourceSchema>;

// User Funding Applications
export const fundingApplications = pgTable("funding_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  businessId: integer("business_id").notNull(),
  fundingSourceId: integer("funding_source_id").notNull(),
  status: text("status").notNull().default("draft"), // draft, submitted, under_review, approved, rejected
  amountRequested: integer("amount_requested"),
  applicationData: json("application_data"),
  submittedAt: timestamp("submitted_at"),
  decidedAt: timestamp("decided_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFundingApplicationSchema = createInsertSchema(fundingApplications).pick({
  userId: true,
  businessId: true,
  fundingSourceId: true,
  status: true,
  amountRequested: true,
  applicationData: true,
  notes: true,
});

export type FundingApplication = typeof fundingApplications.$inferSelect;
export type InsertFundingApplication = z.infer<typeof insertFundingApplicationSchema>;

// ----------------------------------------------------------------------------
// DEVELOPER MAGICIAN - Code Scaffolding & Tech Stack
// ----------------------------------------------------------------------------

// Project Templates
export const projectTemplates = pgTable("project_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // web, mobile, api, fullstack
  techStack: text("tech_stack").array().notNull(), // ['React', 'Node.js', 'PostgreSQL']
  scaffoldCommand: text("scaffold_command").notNull(),
  features: text("features").array(),
  deafAccessible: boolean("deaf_accessible").default(true),
  hasASLDocs: boolean("has_asl_docs").default(false),
  difficulty: text("difficulty").default("beginner"), // beginner, intermediate, advanced
  estimatedTime: integer("estimated_time"), // in hours
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectTemplateSchema = createInsertSchema(projectTemplates).pick({
  name: true,
  description: true,
  category: true,
  techStack: true,
  scaffoldCommand: true,
  features: true,
  deafAccessible: true,
  hasASLDocs: true,
  difficulty: true,
  estimatedTime: true,
  githubUrl: true,
  demoUrl: true,
});

export type ProjectTemplate = typeof projectTemplates.$inferSelect;
export type InsertProjectTemplate = z.infer<typeof insertProjectTemplateSchema>;

// User Projects (generated by Developer Magician)
export const userProjects = pgTable("user_projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  businessId: integer("business_id"),
  templateId: integer("template_id"),
  name: text("name").notNull(),
  description: text("description"),
  repositoryUrl: text("repository_url"),
  deploymentUrl: text("deployment_url"),
  status: text("status").default("active"), // active, archived, deployed
  techStack: text("tech_stack").array(),
  configData: json("config_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserProjectSchema = createInsertSchema(userProjects).pick({
  userId: true,
  businessId: true,
  templateId: true,
  name: true,
  description: true,
  repositoryUrl: true,
  deploymentUrl: true,
  status: true,
  techStack: true,
  configData: true,
});

export type UserProject = typeof userProjects.$inferSelect;
export type InsertUserProject = z.infer<typeof insertUserProjectSchema>;

// ----------------------------------------------------------------------------
// CREATIVE MAGICIAN - Branding & Design
// ----------------------------------------------------------------------------

// Brand Assets
export const brandAssets = pgTable("brand_assets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  businessId: integer("business_id").notNull(),
  assetType: text("asset_type").notNull(), // logo, color_palette, typography, imagery
  name: text("name").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  metadata: json("metadata"), // colors, fonts, dimensions, etc.
  aiGenerated: boolean("ai_generated").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertWorkflowRecipeSchema = createInsertSchema(workflowRecipes).pick({
  recipeId: true,
  name: true,
  triggerType: true,
  triggerConfig: true,
  actions: true,
  enabled: true,
  createdBy: true,
});

export type FibonroseScore = typeof fibonroseScores.$inferSelect;
export type InsertFibonroseScore = z.infer<typeof insertFibonroseScoreSchema>;
export type FibonroseActivity = typeof fibonroseActivities.$inferSelect;
export type InsertFibonroseActivity = z.infer<typeof insertFibonroseActivitySchema>;
export type FibonroseBadge = typeof fibonroseBadges.$inferSelect;
export type InsertFibonroseBadge = z.infer<typeof insertFibonroseBadgeSchema>;
export type MagicianAction = typeof magicianActions.$inferSelect;
export type InsertMagicianAction = z.infer<typeof insertMagicianActionSchema>;
export type WorkflowRecipe = typeof workflowRecipes.$inferSelect;
export type InsertWorkflowRecipe = z.infer<typeof insertWorkflowRecipeSchema>;

// ============================================================================
// Vocational Rehabilitation Compliance Tables
// ============================================================================

// VR Program Enrollment
export const vrEnrollment = pgTable("vr_enrollment", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  vrAgency: text("vr_agency").notNull(),
  vrCounselorId: integer("vr_counselor_id"),
  vrCounselorName: text("vr_counselor_name"),
  vrCounselorContact: text("vr_counselor_contact"),
  enrollmentDate: date("enrollment_date").notNull(),
  programType: text("program_type").notNull(), // self_employment, job_placement, training, supported_employment
  ipeApproved: boolean("ipe_approved").default(false),
  ipeApprovalDate: date("ipe_approval_date"),
  currentPhase: text("current_phase"), // assessment, planning, training, placement, stabilization
  caseStatus: text("case_status").notNull().default("active"), // active, completed, withdrawn, on_hold
  closureDate: date("closure_date"),
  successfulOutcome: boolean("successful_outcome"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVREnrollmentSchema = createInsertSchema(vrEnrollment).pick({
  userId: true,
  vrAgency: true,
  vrCounselorId: true,
  vrCounselorName: true,
  vrCounselorContact: true,
  enrollmentDate: true,
  programType: true,
  ipeApproved: true,
  ipeApprovalDate: true,
  currentPhase: true,
  caseStatus: true,
});

// VR Service Records
export const vrServiceRecords = pgTable("vr_service_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  serviceDate: date("service_date").notNull(),
  serviceType: text("service_type").notNull(), // assessment, counseling, training, job_coaching, equipment, accommodation
  serviceCost: integer("service_cost").default(0),
  serviceProvider: text("service_provider"),
  serviceDescription: text("service_description").notNull(),
  outcome: text("outcome"),
  notes: text("notes"),
  complianceStatus: text("compliance_status").notNull().default("compliant"), // compliant, pending_review, non_compliant
  regulationsCited: json("regulations_cited"), // Array of regulation references
  vrCounselorApproved: boolean("vr_counselor_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVRServiceRecordSchema = createInsertSchema(vrServiceRecords).pick({
  userId: true,
  serviceDate: true,
  serviceType: true,
  serviceCost: true,
  serviceProvider: true,
  serviceDescription: true,
  outcome: true,
  notes: true,
  complianceStatus: true,
  regulationsCited: true,
  vrCounselorApproved: true,
});

// VR Milestones and Progress Tracking
export const vrMilestones = pgTable("vr_milestones", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  milestoneName: text("milestone_name").notNull(),
  milestoneType: text("milestone_type").notNull(), // ipe_approval, training_completion, job_placement, stabilization
  targetDate: date("target_date"),
  completedDate: date("completed_date"),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, overdue
  description: text("description"),
  verification: text("verification"),
export const insertBrandAssetSchema = createInsertSchema(brandAssets).pick({
  userId: true,
  businessId: true,
  assetType: true,
  name: true,
  description: true,
  fileUrl: true,
  thumbnailUrl: true,
  metadata: true,
  aiGenerated: true,
});

export type BrandAsset = typeof brandAssets.$inferSelect;
export type InsertBrandAsset = z.infer<typeof insertBrandAssetSchema>;

// ASL Video Production Requests
export const aslVideoRequests = pgTable("asl_video_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  businessId: integer("business_id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  scriptContent: text("script_content"),
  targetAudience: text("target_audience"),
  videoType: text("video_type").notNull(), // marketing, tutorial, announcement, product_demo
  duration: integer("duration"), // in seconds
  status: text("status").default("requested"), // requested, in_production, review, completed
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  r2Key: text("r2_key"), // Cloudflare R2 storage key
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertAslVideoRequestSchema = createInsertSchema(aslVideoRequests).pick({
  userId: true,
  businessId: true,
  title: true,
  description: true,
  scriptContent: true,
  targetAudience: true,
  videoType: true,
  duration: true,
  status: true,
});

export type AslVideoRequest = typeof aslVideoRequests.$inferSelect;
export type InsertAslVideoRequest = z.infer<typeof insertAslVideoRequestSchema>;

// ----------------------------------------------------------------------------
// JOB MAGICIAN - Career Development & Job Matching
// ----------------------------------------------------------------------------

// User Profiles / Resumes
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  fullName: text("full_name"),
  headline: text("headline"),
  summary: text("summary"),
  skills: text("skills").array(),
  certifications: text("certifications").array(),
  education: json("education"), // [{degree, school, year}]
  experience: json("experience"), // [{title, company, duration, description}]
  resumeUrl: text("resume_url"),
  videoResumeUrl: text("video_resume_url"),
  portfolioUrl: text("portfolio_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  preferredJobTypes: text("preferred_job_types").array(),
  preferredLocations: text("preferred_locations").array(),
  salaryExpectation: integer("salary_expectation"),
  availableForWork: boolean("available_for_work").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  fullName: true,
  headline: true,
  summary: true,
  skills: true,
  certifications: true,
  education: true,
  experience: true,
  resumeUrl: true,
  videoResumeUrl: true,
  portfolioUrl: true,
  linkedinUrl: true,
  githubUrl: true,
  preferredJobTypes: true,
  preferredLocations: true,
  salaryExpectation: true,
  availableForWork: true,
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

// Job Listings
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").array(),
  responsibilities: text("responsibilities").array(),
  location: text("location"),
  jobType: text("job_type"), // full-time, part-time, contract, remote
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  deafFriendly: boolean("deaf_friendly").default(false),
  hasASLSupport: boolean("has_asl_support").default(false),
  applicationUrl: text("application_url"),
  contactEmail: text("contact_email"),
  isActive: boolean("is_active").default(true),
  postedDate: timestamp("posted_date").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertVRMilestoneSchema = createInsertSchema(vrMilestones).pick({
  userId: true,
  milestoneName: true,
  milestoneType: true,
  targetDate: true,
  completedDate: true,
  status: true,
  description: true,
  verification: true,
});

// ============================================================================
// Workforce Solutions and Compliance Tables
// ============================================================================

// Workforce Development Programs
export const workforceProgramEnrollment = pgTable("workforce_program_enrollment", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  programId: text("program_id").notNull(),
  programName: text("program_name").notNull(),
  programProvider: text("program_provider"),
  fundingSource: text("funding_source"), // WIOA, TAA, state, federal, private
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  expectedCompletionDate: date("expected_completion_date"),
  status: text("status").notNull().default("active"), // active, completed, withdrawn, on_hold
  programType: text("program_type").notNull(), // job_training, apprenticeship, certification, education
  industry: text("industry"),
  occupation: text("occupation"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertWorkforceProgramEnrollmentSchema = createInsertSchema(workforceProgramEnrollment).pick({
  userId: true,
  programId: true,
  programName: true,
  programProvider: true,
  fundingSource: true,
  startDate: true,
  endDate: true,
  expectedCompletionDate: true,
  status: true,
  programType: true,
  industry: true,
  occupation: true,
});

// Workforce Compliance Checks
export const workforceComplianceChecks = pgTable("workforce_compliance_checks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  programId: text("program_id").notNull(),
  checkType: text("check_type").notNull(), // attendance, performance, eligibility, progress
  checkDate: date("check_date").notNull(),
  passed: boolean("passed").notNull(),
  findings: text("findings"),
  correctiveActions: text("corrective_actions"),
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: date("follow_up_date"),
  regulationReference: text("regulation_reference"),
  auditorName: text("auditor_name"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWorkforceComplianceCheckSchema = createInsertSchema(workforceComplianceChecks).pick({
  userId: true,
  programId: true,
  checkType: true,
  checkDate: true,
  passed: true,
  findings: true,
  correctiveActions: true,
  followUpRequired: true,
  followUpDate: true,
  regulationReference: true,
  auditorName: true,
  notes: true,
});

// Employment Outcomes Tracking
export const employmentOutcomes = pgTable("employment_outcomes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  programId: text("program_id"),
  vrEnrollmentId: integer("vr_enrollment_id"),
  employerName: text("employer_name").notNull(),
  jobTitle: text("job_title").notNull(),
  industry: text("industry"),
  occupation: text("occupation"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  employmentType: text("employment_type").notNull(), // full_time, part_time, temporary, self_employment
  wage: integer("wage"),
  wageType: text("wage_type"), // hourly, salary, commission
  deafFriendlyWorkplace: boolean("deaf_friendly_workplace"),
  accommodationsProvided: boolean("accommodations_provided").default(false),
  accommodationDetails: text("accommodation_details"),
  retentionDays: integer("retention_days"), // Days employed for compliance
  successful90Day: boolean("successful_90_day"), // VR success metric
  successful180Day: boolean("successful_180_day"), // Workforce success metric
  outcomeStatus: text("outcome_status").notNull().default("active"), // active, retained, separated, layoff
  separationReason: text("separation_reason"),
export const insertJobListingSchema = createInsertSchema(jobListings).pick({
  title: true,
  company: true,
  description: true,
  requirements: true,
  responsibilities: true,
  location: true,
  jobType: true,
  salaryMin: true,
  salaryMax: true,
  deafFriendly: true,
  hasASLSupport: true,
  applicationUrl: true,
  contactEmail: true,
  isActive: true,
  expiryDate: true,
});

export type JobListing = typeof jobListings.$inferSelect;
export type InsertJobListing = z.infer<typeof insertJobListingSchema>;

// Job Applications
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  jobListingId: integer("job_listing_id").notNull(),
  status: text("status").default("applied"), // applied, reviewing, interview, offer, rejected, accepted
  coverLetter: text("cover_letter"),
  customResumeUrl: text("custom_resume_url"),
  videoIntroUrl: text("video_intro_url"),
  appliedAt: timestamp("applied_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  notes: text("notes"),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).pick({
  userId: true,
  jobListingId: true,
  status: true,
  coverLetter: true,
  customResumeUrl: true,
  videoIntroUrl: true,
  notes: true,
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;

// Job Matching Scores (algorithm results)
export const jobMatchScores = pgTable("job_match_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  jobListingId: integer("job_listing_id").notNull(),
  overallScore: integer("overall_score").notNull(), // 0-100
  skillsMatch: integer("skills_match"), // 0-100
  experienceMatch: integer("experience_match"), // 0-100
  locationMatch: integer("location_match"), // 0-100
  salaryMatch: integer("salary_match"), // 0-100
  deafAccessibilityBonus: integer("deaf_accessibility_bonus"), // bonus points
  matchDetails: json("match_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJobMatchScoreSchema = createInsertSchema(jobMatchScores).pick({
  userId: true,
  jobListingId: true,
  overallScore: true,
  skillsMatch: true,
  experienceMatch: true,
  locationMatch: true,
  salaryMatch: true,
  deafAccessibilityBonus: true,
  matchDetails: true,
});

export type JobMatchScore = typeof jobMatchScores.$inferSelect;
export type InsertJobMatchScore = z.infer<typeof insertJobMatchScoreSchema>;

// ----------------------------------------------------------------------------
// VR COUNSELOR MATCHING SYSTEM
// ----------------------------------------------------------------------------

// VR Counselor Extended Profile
export const vrCounselorProfiles = pgTable("vr_counselor_profiles", {
  id: serial("id").primaryKey(),
  counselorId: integer("counselor_id").notNull().unique(),
  specializations: text("specializations").array(), // business, technology, creative, job_placement
  languages: text("languages").array(), // ASL, English, Spanish
  aslFluency: text("asl_fluency").default("fluent"), // beginner, intermediate, fluent, native
  availability: json("availability"), // weekly schedule
  maxClients: integer("max_clients").default(10),
  currentClients: integer("current_clients").default(0),
  rating: integer("rating").default(5), // 1-5
  reviewCount: integer("review_count").default(0),
  yearsExperience: integer("years_experience"),
  certifications: text("certifications").array(),
  bio: text("bio"),
  videoIntroUrl: text("video_intro_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmploymentOutcomeSchema = createInsertSchema(employmentOutcomes).pick({
  userId: true,
  programId: true,
  vrEnrollmentId: true,
  employerName: true,
  jobTitle: true,
  industry: true,
  occupation: true,
  startDate: true,
  endDate: true,
  employmentType: true,
  wage: true,
  wageType: true,
  deafFriendlyWorkplace: true,
  accommodationsProvided: true,
  accommodationDetails: true,
  retentionDays: true,
  successful90Day: true,
  successful180Day: true,
  outcomeStatus: true,
  separationReason: true,
});

// Compliance Audit Trail
export const complianceAuditTrail = pgTable("compliance_audit_trail", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(), // vr_service, workforce_program, employment_outcome, magician_action
  entityId: integer("entity_id").notNull(),
  userId: integer("user_id"),
  auditType: text("audit_type").notNull(), // creation, modification, deletion, review, approval
  performedBy: text("performed_by").notNull(),
  performedAt: timestamp("performed_at").defaultNow(),
  changes: json("changes"),
  complianceImpact: text("compliance_impact"),
  regulationsAffected: json("regulations_affected"),
  notes: text("notes"),
});

export const insertComplianceAuditTrailSchema = createInsertSchema(complianceAuditTrail).pick({
  entityType: true,
  entityId: true,
  userId: true,
  auditType: true,
  performedBy: true,
  changes: true,
  complianceImpact: true,
  regulationsAffected: true,
  notes: true,
});

// ============================================================================
// Type Exports for VR and Workforce Compliance
// ============================================================================

export type VREnrollment = typeof vrEnrollment.$inferSelect;
export type InsertVREnrollment = z.infer<typeof insertVREnrollmentSchema>;
export type VRServiceRecord = typeof vrServiceRecords.$inferSelect;
export type InsertVRServiceRecord = z.infer<typeof insertVRServiceRecordSchema>;
export type VRMilestone = typeof vrMilestones.$inferSelect;
export type InsertVRMilestone = z.infer<typeof insertVRMilestoneSchema>;
export type WorkforceProgramEnrollment = typeof workforceProgramEnrollment.$inferSelect;
export type InsertWorkforceProgramEnrollment = z.infer<typeof insertWorkforceProgramEnrollmentSchema>;
export type WorkforceComplianceCheck = typeof workforceComplianceChecks.$inferSelect;
export type InsertWorkforceComplianceCheck = z.infer<typeof insertWorkforceComplianceCheckSchema>;
export type EmploymentOutcome = typeof employmentOutcomes.$inferSelect;
export type InsertEmploymentOutcome = z.infer<typeof insertEmploymentOutcomeSchema>;
export type ComplianceAuditTrail = typeof complianceAuditTrail.$inferSelect;
export type InsertComplianceAuditTrail = z.infer<typeof insertComplianceAuditTrailSchema>;

// ============================================================================
// Community Opportunities
// ============================================================================

// Opportunities table for personalized opportunity matching
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // gig, collaboration, grant, training, event, mentorship
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category"), // business, accessibility, technology, community, education
  tags: text("tags").array(),
  requiredFibonrose: integer("required_fibonrose").notNull().default(0),
  targetAudience: text("target_audience").array(), // deaf, hard_of_hearing, asl_user, business_owner, entrepreneur
  budget: text("budget"),
  deadline: date("deadline"),
  location: text("location"), // remote, in_person, hybrid, specific location
  externalUrl: text("external_url"),
  contactEmail: text("contact_email"),
  contactName: text("contact_name"),
  isActive: boolean("is_active").default(true),
  priority: integer("priority").default(0), // Higher priority = shown first
  postedBy: integer("posted_by"), // user id who posted
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const insertOpportunitySchema = createInsertSchema(opportunities).pick({
  type: true,
  title: true,
  description: true,
  category: true,
  tags: true,
  requiredFibonrose: true,
  targetAudience: true,
  budget: true,
  deadline: true,
  location: true,
  externalUrl: true,
  contactEmail: true,
  contactName: true,
  isActive: true,
  priority: true,
  postedBy: true,
  expiresAt: true,
});

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;

// User interests for personalized opportunity matching
export const userInterests = pgTable("user_interests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  category: text("category").notNull(), // business, accessibility, technology, community, education
  subcategories: text("subcategories").array(),
  skillLevel: text("skill_level"), // beginner, intermediate, advanced, expert
  lookingFor: text("looking_for").array(), // gigs, grants, collaborations, training, events, mentorship
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserInterestSchema = createInsertSchema(userInterests).pick({
  userId: true,
  category: true,
  subcategories: true,
  skillLevel: true,
  lookingFor: true,
});

export type UserInterest = typeof userInterests.$inferSelect;
export type InsertUserInterest = z.infer<typeof insertUserInterestSchema>;
export const insertVrCounselorProfileSchema = createInsertSchema(vrCounselorProfiles).pick({
  counselorId: true,
  specializations: true,
  languages: true,
  aslFluency: true,
  availability: true,
  maxClients: true,
  currentClients: true,
  yearsExperience: true,
  certifications: true,
  bio: true,
  videoIntroUrl: true,
  isActive: true,
});

export type VrCounselorProfile = typeof vrCounselorProfiles.$inferSelect;
export type InsertVrCounselorProfile = z.infer<typeof insertVrCounselorProfileSchema>;

// Counselor Match Scores
export const counselorMatchScores = pgTable("counselor_match_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  counselorId: integer("counselor_id").notNull(),
  overallScore: integer("overall_score").notNull(), // 0-100
  specializationMatch: integer("specialization_match"),
  availabilityMatch: integer("availability_match"),
  languageMatch: integer("language_match"),
  locationMatch: integer("location_match"),
  matchDetails: json("match_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCounselorMatchScoreSchema = createInsertSchema(counselorMatchScores).pick({
  userId: true,
  counselorId: true,
  overallScore: true,
  specializationMatch: true,
  availabilityMatch: true,
  languageMatch: true,
  locationMatch: true,
  matchDetails: true,
});

export type CounselorMatchScore = typeof counselorMatchScores.$inferSelect;
export type InsertCounselorMatchScore = z.infer<typeof insertCounselorMatchScoreSchema>;

// Counselor Sessions
export const counselorSessions = pgTable("counselor_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  counselorId: integer("counselor_id").notNull(),
  sessionType: text("session_type").notNull(), // initial, followup, business_review, job_coaching
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").default(60), // in minutes
  status: text("status").default("scheduled"), // scheduled, completed, cancelled, no_show
  meetingLink: text("meeting_link"),
  notes: text("notes"),
  actionItems: text("action_items").array(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCounselorSessionSchema = createInsertSchema(counselorSessions).pick({
  userId: true,
  counselorId: true,
  sessionType: true,
  scheduledAt: true,
  duration: true,
  status: true,
  meetingLink: true,
  notes: true,
  actionItems: true,
});

export type CounselorSession = typeof counselorSessions.$inferSelect;
export type InsertCounselorSession = z.infer<typeof insertCounselorSessionSchema>;

// ----------------------------------------------------------------------------
// R2 STORAGE & FILE MANAGEMENT
// ----------------------------------------------------------------------------

// R2 Uploaded Files
export const r2Files = pgTable("r2_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // video, image, document, audio
  fileSize: integer("file_size"), // in bytes
  mimeType: text("mime_type"),
  r2Key: text("r2_key").notNull().unique(), // unique key in R2 bucket
  r2Bucket: text("r2_bucket").notNull(), // magicians-assets or magicians-asl-videos
  publicUrl: text("public_url"),
  purpose: text("purpose"), // profile_video, asl_video, brand_asset, resume
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertR2FileSchema = createInsertSchema(r2Files).pick({
  userId: true,
  fileName: true,
  fileType: true,
  fileSize: true,
  mimeType: true,
  r2Key: true,
  r2Bucket: true,
  publicUrl: true,
  purpose: true,
  metadata: true,
});

export type R2File = typeof r2Files.$inferSelect;
export type InsertR2File = z.infer<typeof insertR2FileSchema>;

// ----------------------------------------------------------------------------
// MAGICIAN ACTIVITY LOG
// ----------------------------------------------------------------------------

// Track which magician is used for analytics
export const magicianActivityLog = pgTable("magician_activity_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  magicianType: text("magician_type").notNull(), // business, developer, creative, job
  action: text("action").notNull(), // created_business, scaffolded_project, requested_video, applied_job
  resourceId: integer("resource_id"), // ID of the created resource
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMagicianActivityLogSchema = createInsertSchema(magicianActivityLog).pick({
  userId: true,
  magicianType: true,
  action: true,
  resourceId: true,
  metadata: true,
});

export type MagicianActivityLog = typeof magicianActivityLog.$inferSelect;
export type InsertMagicianActivityLog = z.infer<typeof insertMagicianActivityLogSchema>;
