/**
 * 360 Magicians Index
 * 
 * Central export point for all Magician services
 */

export { BaseMagician, MagicianContext, MagicianAction, MagicianCoordinationRequest } from './BaseMagician';
export { GatekeeperMagician } from './GatekeeperMagician';
export { ReputationTrackerMagician } from './ReputationTrackerMagician';
export { WorkflowAutomatorMagician } from './WorkflowAutomatorMagician';
export { CommunityConciergeMagician } from './CommunityConciergeMagician';
export { BusinessMagicianService } from './BusinessMagician';
export { DeveloperMagicianService } from './DeveloperMagician';
export { JobMagicianService } from './JobMagician';
export { CreativeMagicianService } from './CreativeMagician';

import GatekeeperMagician from './GatekeeperMagician';
import ReputationTrackerMagician from './ReputationTrackerMagician';
import WorkflowAutomatorMagician from './WorkflowAutomatorMagician';
import CommunityConciergeMagician from './CommunityConciergeMagician';
import BusinessMagician from './BusinessMagician';
import DeveloperMagician from './DeveloperMagician';
import JobMagician from './JobMagician';
import CreativeMagician from './CreativeMagician';

/**
 * Magician Registry
 * 
 * Central registry of all active Magicians
 * Aligned with MBTQ platform requirements and vocational rehabilitation standards
 */
export const MagicianRegistry = {
  // Core platform magicians
  gatekeeper: GatekeeperMagician,
  reputation_tracker: ReputationTrackerMagician,
  workflow_automator: WorkflowAutomatorMagician,
  community_concierge: CommunityConciergeMagician,
  
  // Specialized vocational magicians
  business_magician: BusinessMagician,
  developer_magician: DeveloperMagician,
  job_magician: JobMagician,
  creative_magician: CreativeMagician,
  
  // Future Magicians to be added:
  // content_curator: ContentCuratorMagician,
  // safety_monitor: SafetyMonitorMagician,
  // opportunity_scout: OpportunityScoutMagician,
  // analytics_oracle: AnalyticsOracleMagician,
  // governance_facilitator: GovernanceFacilitatorMagician,
};

/**
 * Get a Magician by ID
 */
export function getMagician(magicianId: string) {
  return MagicianRegistry[magicianId as keyof typeof MagicianRegistry];
}

/**
 * Get all active Magicians
 */
export function getAllMagicians() {
  return Object.values(MagicianRegistry);
}

/**
 * Get Magician info for all active Magicians
 */
export function getMagiciansInfo() {
  return getAllMagicians().map(magician => magician.getInfo());
}

/**
 * Get Magicians by category
 */
export function getMagiciansByCategory() {
  return {
    core: [
      GatekeeperMagician,
      ReputationTrackerMagician,
      WorkflowAutomatorMagician,
      CommunityConciergeMagician,
    ],
    vocational: [
      BusinessMagician,
      DeveloperMagician,
      JobMagician,
      CreativeMagician,
    ],
  };
}

export default MagicianRegistry;
