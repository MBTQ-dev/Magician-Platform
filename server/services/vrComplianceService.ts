/**
 * VR Compliance Service
 * 
 * Manages vocational rehabilitation program compliance, tracking, and reporting
 * Ensures adherence to VR regulations (34 CFR Part 361) and state VR policies
 */

import { z } from 'zod';
import {
  VRComplianceRecordSchema,
  WorkforceSolutionsRecordSchema,
} from '../../shared/magicianSchemas';

export interface VRComplianceReport {
  userId: number;
  enrollmentStatus: string;
  currentPhase: string;
  servicesProvided: any[];
  milestones: any[];
  compliance: {
    overall: 'compliant' | 'pending_review' | 'non_compliant';
    issues: string[];
    recommendations: string[];
  };
  outcomes: any;
}

export class VRComplianceService {
  /**
   * Validate VR program eligibility
   */
  async validateEligibility(userId: number, criteria: any): Promise<any> {
    const eligibilityChecks = {
      disability: {
        documented: criteria.hasDocumentation || false,
        requirement: 'Must have documented disability',
        status: criteria.hasDocumentation ? 'met' : 'not_met',
      },
      employmentBarrier: {
        exists: criteria.hasEmploymentBarrier || false,
        requirement: 'Disability must create barrier to employment',
        status: criteria.hasEmploymentBarrier ? 'met' : 'not_met',
      },
      vrServicesNeeded: {
        needed: criteria.needsVRServices || false,
        requirement: 'Must require VR services to obtain/maintain employment',
        status: criteria.needsVRServices ? 'met' : 'not_met',
      },
      abilityToBenefit: {
        canBenefit: criteria.canBenefitFromServices || false,
        requirement: 'Must be able to benefit from VR services',
        status: criteria.canBenefitFromServices ? 'met' : 'not_met',
      },
    };

    const allMet = Object.values(eligibilityChecks).every(check => check.status === 'met');

    return {
      eligible: allMet,
      checks: eligibilityChecks,
      nextSteps: allMet 
        ? ['Contact state VR agency', 'Complete intake assessment', 'Develop IPE']
        : ['Gather necessary documentation', 'Consult with VR counselor'],
      regulations: ['34 CFR 361.42 - Eligibility Requirements'],
    };
  }

  /**
   * Track VR service delivery
   */
  async trackService(serviceRecord: any): Promise<any> {
    const validated = VRComplianceRecordSchema.parse(serviceRecord);
    
    // Validate service against VR regulations
    const compliance = this.validateServiceCompliance(validated);
    
    return {
      serviceRecorded: true,
      serviceId: `vr_service_${Date.now()}`,
      compliance,
      documentation: {
        required: [
          'Service authorization from VR counselor',
          'Service delivery confirmation',
          'Receipt or invoice',
          'Outcome documentation',
        ],
        provided: validated.notes ? true : false,
      },
      nextSteps: compliance.status === 'compliant' 
        ? ['Update IPE progress', 'Report to VR counselor']
        : ['Address compliance issues', 'Provide additional documentation'],
    };
  }

  /**
   * Monitor milestone progress
   */
  async trackMilestone(milestone: any): Promise<any> {
    const milestoneTracking = {
      milestone: milestone.name,
      targetDate: milestone.targetDate,
      status: milestone.status || 'pending',
      daysRemaining: milestone.targetDate 
        ? this.calculateDaysRemaining(new Date(milestone.targetDate))
        : null,
      riskLevel: this.assessMilestoneRisk(milestone),
      recommendations: this.getMilestoneRecommendations(milestone),
    };

    return {
      tracking: milestoneTracking,
      compliance: {
        onTrack: milestoneTracking.riskLevel === 'low',
        alerts: milestoneTracking.riskLevel !== 'low' 
          ? ['Milestone at risk', 'Discuss with VR counselor']
          : [],
      },
      regulations: ['34 CFR 361.45 - IPE Requirements', '34 CFR 361.53 - Service Delivery'],
    };
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(userId: number, enrollmentData: any): Promise<VRComplianceReport> {
    const report: VRComplianceReport = {
      userId,
      enrollmentStatus: enrollmentData.caseStatus || 'unknown',
      currentPhase: enrollmentData.currentPhase || 'assessment',
      servicesProvided: enrollmentData.services || [],
      milestones: enrollmentData.milestones || [],
      compliance: {
        overall: this.assessOverallCompliance(enrollmentData),
        issues: this.identifyComplianceIssues(enrollmentData),
        recommendations: this.generateRecommendations(enrollmentData),
      },
      outcomes: enrollmentData.outcomes || null,
    };

    return report;
  }

  /**
   * Validate self-employment plan compliance
   */
  async validateSelfEmploymentPlan(plan: any): Promise<any> {
    const validationChecks = {
      businessPlan: {
        required: true,
        provided: plan.hasBusinessPlan || false,
        status: plan.hasBusinessPlan ? 'met' : 'not_met',
      },
      marketResearch: {
        required: true,
        provided: plan.hasMarketResearch || false,
        status: plan.hasMarketResearch ? 'met' : 'not_met',
      },
      financialProjections: {
        required: true,
        provided: plan.hasFinancialProjections || false,
        status: plan.hasFinancialProjections ? 'met' : 'not_met',
      },
      counselorApproval: {
        required: true,
        provided: plan.counselorApproved || false,
        status: plan.counselorApproved ? 'met' : 'not_met',
      },
      viability: {
        assessed: plan.viabilityAssessed || false,
        status: plan.viabilityAssessed ? 'met' : 'pending',
      },
    };

    const allMet = Object.values(validationChecks)
      .filter(check => check.required)
      .every(check => check.status === 'met');

    return {
      approved: allMet,
      checks: validationChecks,
      regulations: [
        '34 CFR 361.48 - Self-Employment Services',
        '34 CFR 361.5(c)(54) - Supported Employment Services',
      ],
      nextSteps: allMet
        ? ['Proceed with business formation', 'Purchase equipment/inventory', 'Launch business']
        : ['Complete missing requirements', 'Schedule counselor review'],
    };
  }

  /**
   * Track employment outcome for VR success metrics
   */
  async trackEmploymentOutcome(outcome: any): Promise<any> {
    const tracking = {
      startDate: outcome.startDate,
      currentDays: this.calculateEmploymentDays(outcome.startDate),
      milestones: {
        day90: {
          required: true,
          achieved: this.calculateEmploymentDays(outcome.startDate) >= 90,
          date: this.addDays(new Date(outcome.startDate), 90),
          status: this.calculateEmploymentDays(outcome.startDate) >= 90 ? 'achieved' : 'pending',
        },
        day180: {
          required: false,
          achieved: this.calculateEmploymentDays(outcome.startDate) >= 180,
          date: this.addDays(new Date(outcome.startDate), 180),
          status: this.calculateEmploymentDays(outcome.startDate) >= 180 ? 'achieved' : 'pending',
        },
      },
      vrSuccess: this.calculateEmploymentDays(outcome.startDate) >= 90,
      accommodations: {
        provided: outcome.accommodationsProvided || false,
        effective: outcome.accommodationsEffective || null,
        ongoing: outcome.accommodationsOngoing || false,
      },
    };

    return {
      tracking,
      compliance: {
        successMetricsMet: tracking.vrSuccess,
        regulations: [
          '34 CFR 361.5(c)(15) - Employment Outcome',
          'RSA Standards & Indicators - Employment Rate',
        ],
      },
      recommendations: tracking.vrSuccess
        ? ['Prepare for case closure', 'Document successful outcome']
        : ['Continue monitoring', 'Provide ongoing support'],
    };
  }

  /**
   * Audit VR case for compliance
   */
  async auditCase(userId: number, caseData: any): Promise<any> {
    const auditChecks = {
      documentation: {
        ipe: caseData.hasIPE || false,
        assessments: caseData.hasAssessments || false,
        serviceAuth: caseData.hasServiceAuthorizations || false,
        progress: caseData.hasProgressNotes || false,
      },
      timeliness: {
        ipeWithin90Days: this.checkIPETimeliness(caseData),
        regularReviews: caseData.hasRegularReviews || false,
        timelyServices: caseData.servicesTimely || false,
      },
      outcomes: {
        defined: caseData.hasDefinedOutcomes || false,
        measured: caseData.outcomesMeasured || false,
        achieved: caseData.outcomesAchieved || false,
      },
      compliance: {
        eligibilityDetermined: caseData.eligibilityDetermined || false,
        informedChoice: caseData.informedChoiceDocumented || false,
        comparableServices: caseData.comparableServicesConsidered || false,
      },
    };

    const issues = this.identifyAuditIssues(auditChecks);
    const score = this.calculateComplianceScore(auditChecks);

    return {
      auditDate: new Date().toISOString(),
      userId,
      checks: auditChecks,
      issues,
      score,
      rating: score >= 90 ? 'excellent' : score >= 75 ? 'good' : score >= 60 ? 'fair' : 'poor',
      recommendations: this.generateAuditRecommendations(issues),
      regulations: [
        '34 CFR Part 361 - VR Services',
        'RSA Monitoring and Technical Assistance Guide',
      ],
    };
  }

  /**
   * Generate VR reporting data
   */
  async generateVRReport(period: { start: Date; end: Date }): Promise<any> {
    return {
      period: {
        start: period.start,
        end: period.end,
      },
      metrics: {
        totalEnrollments: 0, // Would query database
        activeCases: 0,
        completedCases: 0,
        employmentOutcomes: 0,
        selfEmploymentOutcomes: 0,
        successRate: 0,
      },
      compliance: {
        averageIPETime: 0, // Days to complete IPE
        serviceDeliveryRate: 0,
        documentationCompliance: 0,
        outcomeMeasurementRate: 0,
      },
      deafParticipants: {
        total: 0,
        employmentRate: 0,
        averageWage: 0,
        accommodationRate: 0,
      },
      regulations: [
        '34 CFR 361.1 - State Plan Requirements',
        'RSA-911 Case Service Report',
      ],
    };
  }

  // Helper methods
  private validateServiceCompliance(service: any): any {
    const issues = [];
    
    if (!service.vrCounselorId) {
      issues.push('Service must be authorized by VR counselor');
    }
    
    if (service.complianceStatus === 'non_compliant') {
      issues.push('Service does not meet VR regulations');
    }

    return {
      status: issues.length === 0 ? 'compliant' : 'non_compliant',
      issues,
    };
  }

  private calculateDaysRemaining(targetDate: Date): number {
    const today = new Date();
    const diff = targetDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  private assessMilestoneRisk(milestone: any): 'low' | 'medium' | 'high' {
    if (!milestone.targetDate) return 'low';
    
    const daysRemaining = this.calculateDaysRemaining(new Date(milestone.targetDate));
    
    if (milestone.status === 'completed') return 'low';
    if (daysRemaining < 0) return 'high';
    if (daysRemaining < 14) return 'medium';
    return 'low';
  }

  private getMilestoneRecommendations(milestone: any): string[] {
    const risk = this.assessMilestoneRisk(milestone);
    
    if (risk === 'high') {
      return [
        'Milestone overdue - immediate action required',
        'Contact VR counselor to discuss',
        'Revise timeline if needed',
      ];
    }
    
    if (risk === 'medium') {
      return [
        'Milestone approaching - prioritize completion',
        'Update VR counselor on progress',
      ];
    }
    
    return ['Continue progress toward milestone'];
  }

  private assessOverallCompliance(data: any): 'compliant' | 'pending_review' | 'non_compliant' {
    const issues = this.identifyComplianceIssues(data);
    
    if (issues.length === 0) return 'compliant';
    if (issues.length <= 2) return 'pending_review';
    return 'non_compliant';
  }

  private identifyComplianceIssues(data: any): string[] {
    const issues = [];
    
    if (!data.ipeApproved) {
      issues.push('IPE not approved');
    }
    
    if (!data.services || data.services.length === 0) {
      issues.push('No services provided');
    }
    
    if (!data.milestones || data.milestones.length === 0) {
      issues.push('No milestones defined');
    }
    
    return issues;
  }

  private generateRecommendations(data: any): string[] {
    const recommendations = [];
    
    if (!data.ipeApproved) {
      recommendations.push('Complete and approve IPE');
    }
    
    if (!data.services || data.services.length === 0) {
      recommendations.push('Begin service delivery per IPE');
    }
    
    recommendations.push('Maintain regular documentation');
    recommendations.push('Schedule regular VR counselor check-ins');
    
    return recommendations;
  }

  private calculateEmploymentDays(startDate: Date | string): number {
    const start = new Date(startDate);
    const today = new Date();
    const diff = today.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private checkIPETimeliness(caseData: any): boolean {
    if (!caseData.enrollmentDate || !caseData.ipeApprovalDate) return false;
    
    const enrollment = new Date(caseData.enrollmentDate);
    const ipeApproval = new Date(caseData.ipeApprovalDate);
    const daysDiff = this.calculateEmploymentDays(enrollment);
    
    return daysDiff <= 90;
  }

  private identifyAuditIssues(checks: any): string[] {
    const issues = [];
    
    if (!checks.documentation.ipe) issues.push('Missing IPE documentation');
    if (!checks.timeliness.ipeWithin90Days) issues.push('IPE not completed within 90 days');
    if (!checks.compliance.eligibilityDetermined) issues.push('Eligibility not properly determined');
    
    return issues;
  }

  private calculateComplianceScore(checks: any): number {
    let total = 0;
    let met = 0;
    
    // Count all boolean checks
    const countChecks = (obj: any) => {
      Object.values(obj).forEach(value => {
        if (typeof value === 'boolean') {
          total++;
          if (value) met++;
        } else if (typeof value === 'object') {
          countChecks(value);
        }
      });
    };
    
    countChecks(checks);
    
    return total > 0 ? Math.round((met / total) * 100) : 0;
  }

  private generateAuditRecommendations(issues: string[]): string[] {
    if (issues.length === 0) {
      return ['Continue excellent compliance practices'];
    }
    
    return issues.map(issue => `Address: ${issue}`);
  }
}

// Export singleton instance
export const vrComplianceService = new VRComplianceService();
export default vrComplianceService;
