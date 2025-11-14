/**
 * VR Counselor Matching Algorithm
 * Matches users with VR counselors based on:
 * - Specializations
 * - ASL fluency
 * - Availability
 * - Current client load
 * - Geographic location
 * - User needs and goals
 */

export interface UserNeeds {
  userId: number;
  primaryGoal: "business" | "technology" | "creative" | "job_placement";
  secondaryGoals?: string[];
  preferredLanguages: string[];
  requireASL: boolean;
  availability?: {
    dayOfWeek: string[];
    timeSlots: string[];
  };
  location?: string;
  urgency: "low" | "medium" | "high";
}

export interface CounselorProfile {
  counselorId: number;
  name: string;
  email: string;
  organization: string;
  specializations: string[];
  languages: string[];
  aslFluency: "beginner" | "intermediate" | "fluent" | "native";
  availability: Record<string, any>;
  maxClients: number;
  currentClients: number;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  location?: string;
  isActive: boolean;
}

export interface MatchScore {
  counselorId: number;
  overallScore: number;
  specializationMatch: number;
  availabilityMatch: number;
  languageMatch: number;
  locationMatch: number;
  capacityScore: number;
  matchDetails: {
    matchingSpecializations: string[];
    matchingLanguages: string[];
    availableSlots: string[];
    distanceMiles?: number;
    strengths: string[];
    considerations: string[];
  };
}

/**
 * Calculate match score between user and counselor
 */
export function calculateMatchScore(
  userNeeds: UserNeeds,
  counselor: CounselorProfile
): MatchScore {
  // Check if counselor is active and has capacity
  if (!counselor.isActive || counselor.currentClients >= counselor.maxClients) {
    return {
      counselorId: counselor.counselorId,
      overallScore: 0,
      specializationMatch: 0,
      availabilityMatch: 0,
      languageMatch: 0,
      locationMatch: 0,
      capacityScore: 0,
      matchDetails: {
        matchingSpecializations: [],
        matchingLanguages: [],
        availableSlots: [],
        strengths: [],
        considerations: ["Counselor at full capacity or inactive"],
      },
    };
  }

  // 1. Specialization Match (35% weight)
  const specializationMatch = calculateSpecializationMatch(userNeeds, counselor);

  // 2. Language/ASL Match (30% weight)
  const languageMatch = calculateLanguageMatch(userNeeds, counselor);

  // 3. Availability Match (20% weight)
  const availabilityMatch = calculateAvailabilityMatch(userNeeds, counselor);

  // 4. Location Match (10% weight)
  const locationMatch = calculateLocationMatch(userNeeds, counselor);

  // 5. Capacity Score (5% weight) - prefer counselors with more availability
  const capacityScore = ((counselor.maxClients - counselor.currentClients) / counselor.maxClients) * 100;

  // Calculate weighted overall score
  const overallScore = Math.round(
    specializationMatch * 0.35 +
    languageMatch * 0.30 +
    availabilityMatch * 0.20 +
    locationMatch * 0.10 +
    capacityScore * 0.05
  );

  // Bonus for high-rated counselors
  const ratingBonus = counselor.rating >= 4.5 ? 5 : 0;
  const experienceBonus = counselor.yearsExperience >= 5 ? 3 : 0;
  const finalScore = Math.min(100, overallScore + ratingBonus + experienceBonus);

  // Build match details
  const matchDetails = buildMatchDetails(userNeeds, counselor, {
    specializationMatch,
    languageMatch,
    availabilityMatch,
    locationMatch,
  });

  return {
    counselorId: counselor.counselorId,
    overallScore: finalScore,
    specializationMatch,
    availabilityMatch,
    languageMatch,
    locationMatch,
    capacityScore,
    matchDetails,
  };
}

/**
 * Calculate specialization match score
 */
function calculateSpecializationMatch(
  userNeeds: UserNeeds,
  counselor: CounselorProfile
): number {
  let score = 0;
  const allUserGoals = [userNeeds.primaryGoal, ...(userNeeds.secondaryGoals || [])];

  // Check if primary goal matches
  if (counselor.specializations.includes(userNeeds.primaryGoal)) {
    score += 70; // Strong weight for primary goal
  }

  // Check secondary goals
  const secondaryMatches = (userNeeds.secondaryGoals || []).filter((goal) =>
    counselor.specializations.includes(goal)
  ).length;

  score += secondaryMatches * 10; // 10 points per secondary match

  return Math.min(100, score);
}

/**
 * Calculate language and ASL match score
 */
function calculateLanguageMatch(
  userNeeds: UserNeeds,
  counselor: CounselorProfile
): number {
  let score = 0;

  // ASL requirement is critical
  if (userNeeds.requireASL) {
    if (counselor.languages.includes("ASL")) {
      // Score based on ASL fluency level
      const fluencyScores = {
        native: 100,
        fluent: 85,
        intermediate: 60,
        beginner: 30,
      };
      score = fluencyScores[counselor.aslFluency] || 0;
    } else {
      // No ASL = poor match if required
      return 10;
    }
  } else {
    // Check other language matches
    const matchingLanguages = userNeeds.preferredLanguages.filter((lang) =>
      counselor.languages.includes(lang)
    );
    score = (matchingLanguages.length / userNeeds.preferredLanguages.length) * 100;
  }

  return Math.min(100, score);
}

/**
 * Calculate availability match score
 */
function calculateAvailabilityMatch(
  userNeeds: UserNeeds,
  counselor: CounselorProfile
): number {
  // If no specific availability requirements, return neutral score
  if (!userNeeds.availability || !userNeeds.availability.dayOfWeek.length) {
    return 50;
  }

  // Check if counselor has availability on requested days
  const counselorAvailability = counselor.availability as Record<string, any>;
  let matchingDays = 0;

  for (const day of userNeeds.availability.dayOfWeek) {
    if (counselorAvailability[day] && counselorAvailability[day].length > 0) {
      matchingDays++;
    }
  }

  const score = (matchingDays / userNeeds.availability.dayOfWeek.length) * 100;

  // Urgency multiplier
  if (userNeeds.urgency === "high" && matchingDays > 0) {
    return Math.min(100, score * 1.2);
  }

  return Math.round(score);
}

/**
 * Calculate location match score
 */
function calculateLocationMatch(
  userNeeds: UserNeeds,
  counselor: CounselorProfile
): number {
  // If no location specified, return neutral score
  if (!userNeeds.location || !counselor.location) {
    return 50;
  }

  // Simple state/region matching (can be enhanced with geocoding)
  if (userNeeds.location.toLowerCase() === counselor.location.toLowerCase()) {
    return 100;
  }

  // Same region gets partial score
  // This is simplified - in production, use proper geocoding
  return 40;
}

/**
 * Build detailed match information
 */
function buildMatchDetails(
  userNeeds: UserNeeds,
  counselor: CounselorProfile,
  scores: {
    specializationMatch: number;
    languageMatch: number;
    availabilityMatch: number;
    locationMatch: number;
  }
): MatchScore["matchDetails"] {
  const matchingSpecializations = [
    userNeeds.primaryGoal,
    ...(userNeeds.secondaryGoals || []),
  ].filter((goal) => counselor.specializations.includes(goal));

  const matchingLanguages = userNeeds.preferredLanguages.filter((lang) =>
    counselor.languages.includes(lang)
  );

  const strengths: string[] = [];
  const considerations: string[] = [];

  // Identify strengths
  if (scores.specializationMatch >= 70) {
    strengths.push(`Strong match for ${userNeeds.primaryGoal} specialization`);
  }
  if (scores.languageMatch >= 85) {
    strengths.push("Excellent language/ASL compatibility");
  }
  if (counselor.rating >= 4.5) {
    strengths.push(`Highly rated (${counselor.rating}/5 from ${counselor.reviewCount} reviews)`);
  }
  if (counselor.yearsExperience >= 5) {
    strengths.push(`${counselor.yearsExperience} years of experience`);
  }

  // Identify considerations
  const availabilityPercent = (counselor.maxClients - counselor.currentClients) / counselor.maxClients;
  if (availabilityPercent < 0.3) {
    considerations.push("Limited availability - high client load");
  }
  if (scores.availabilityMatch < 50) {
    considerations.push("Limited schedule compatibility");
  }
  if (userNeeds.requireASL && counselor.aslFluency === "intermediate") {
    considerations.push("Intermediate ASL fluency");
  }

  return {
    matchingSpecializations,
    matchingLanguages,
    availableSlots: [], // Would populate from actual availability data
    strengths,
    considerations,
  };
}

/**
 * Find top matching counselors for a user
 */
export function findTopMatches(
  userNeeds: UserNeeds,
  counselors: CounselorProfile[],
  limit: number = 5
): MatchScore[] {
  const scores = counselors
    .map((counselor) => calculateMatchScore(userNeeds, counselor))
    .filter((score) => score.overallScore > 30) // Filter out poor matches
    .sort((a, b) => b.overallScore - a.overallScore); // Sort by score descending

  return scores.slice(0, limit);
}

/**
 * Generate match explanation for UI
 */
export function generateMatchExplanation(match: MatchScore): string {
  if (match.overallScore >= 85) {
    return "Excellent match! This counselor aligns very well with your needs and goals.";
  } else if (match.overallScore >= 70) {
    return "Great match! This counselor is well-suited to help you achieve your goals.";
  } else if (match.overallScore >= 50) {
    return "Good match. This counselor can support your needs with some considerations.";
  } else if (match.overallScore >= 30) {
    return "Possible match. Review the details to see if this counselor fits your needs.";
  } else {
    return "Limited match. Consider exploring other counselors.";
  }
}

export default {
  calculateMatchScore,
  findTopMatches,
  generateMatchExplanation,
};
