/**
 * Job Magician Service
 * Handles resume building, job matching, career development, and job applications
 */

import type {
  UserProfile,
  JobListing,
  JobApplication,
  JobMatchScore,
  InsertUserProfile,
  InsertJobApplication,
} from "../../shared/schema";

export interface ResumeGenerationRequest {
  userId: number;
  fullName: string;
  headline: string;
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    graduationYear: number;
    honors?: string;
  }>;
  certifications?: string[];
}

export interface JobSearchCriteria {
  keywords?: string[];
  location?: string;
  jobType?: string[];
  salaryMin?: number;
  deafFriendly?: boolean;
  hasASLSupport?: boolean;
  remote?: boolean;
}

/**
 * Generate professional resume
 */
export async function generateResume(
  request: ResumeGenerationRequest
): Promise<{
  success: boolean;
  resumeUrl?: string;
  resumeHTML?: string;
  tips?: string[];
  error?: string;
}> {
  try {
    // Generate HTML resume
    const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${request.fullName} - Resume</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #2563EB; margin-bottom: 5px; }
    h2 { color: #1E40AF; border-bottom: 2px solid #2563EB; padding-bottom: 5px; margin-top: 30px; }
    .headline { color: #6B7280; font-size: 18px; margin-bottom: 20px; }
    .contact { margin-bottom: 20px; }
    .section { margin-bottom: 30px; }
    .job { margin-bottom: 20px; }
    .job-title { font-weight: bold; color: #1F2937; }
    .company { color: #4B5563; font-style: italic; }
    .dates { color: #6B7280; font-size: 14px; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill { background: #DBEAFE; padding: 5px 15px; border-radius: 15px; font-size: 14px; }
    ul { margin-top: 10px; }
    .deaf-friendly { background: #D1FAE5; color: #065F46; padding: 5px 10px; border-radius: 5px; display: inline-block; }
  </style>
</head>
<body>
  <h1>${request.fullName}</h1>
  <div class="headline">${request.headline}</div>
  <div class="deaf-friendly">✓ Deaf-Friendly Workplace Preferred</div>
  
  <div class="section">
    <h2>Professional Summary</h2>
    <p>${request.summary}</p>
  </div>
  
  <div class="section">
    <h2>Skills</h2>
    <div class="skills">
      ${request.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
    </div>
  </div>
  
  <div class="section">
    <h2>Professional Experience</h2>
    ${request.experience.map(exp => `
      <div class="job">
        <div class="job-title">${exp.title}</div>
        <div class="company">${exp.company} | ${exp.location}</div>
        <div class="dates">${exp.startDate} - ${exp.endDate || 'Present'}</div>
        <p>${exp.description}</p>
        ${exp.achievements.length > 0 ? `
          <ul>
            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('')}
  </div>
  
  <div class="section">
    <h2>Education</h2>
    ${request.education.map(edu => `
      <div class="job">
        <div class="job-title">${edu.degree}</div>
        <div class="company">${edu.school}</div>
        <div class="dates">Graduated: ${edu.graduationYear}</div>
        ${edu.honors ? `<p>${edu.honors}</p>` : ''}
      </div>
    `).join('')}
  </div>
  
  ${request.certifications && request.certifications.length > 0 ? `
    <div class="section">
      <h2>Certifications</h2>
      <ul>
        ${request.certifications.map(cert => `<li>${cert}</li>`).join('')}
      </ul>
    </div>
  ` : ''}
</body>
</html>
`;

    const tips = [
      "Consider creating an ASL video resume to showcase your communication skills",
      "Highlight any experience working in deaf-friendly environments",
      "Emphasize visual communication and collaboration skills",
      "Include any ASL interpretation or deaf advocacy work",
      "Mention familiarity with accessibility tools and technologies",
    ];

    return {
      success: true,
      resumeHTML,
      tips,
      // In production, would generate PDF and upload to R2
      resumeUrl: `/resumes/${request.userId}/resume.pdf`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Calculate job match score
 */
export function calculateJobMatchScore(
  userProfile: UserProfile,
  jobListing: JobListing
): JobMatchScore {
  let overallScore = 0;
  let skillsMatch = 0;
  let experienceMatch = 0;
  let locationMatch = 0;
  let salaryMatch = 0;
  let deafAccessibilityBonus = 0;

  // 1. Skills Match (40% weight)
  if (userProfile.skills && jobListing.requirements) {
    const userSkillsLower = userProfile.skills.map(s => s.toLowerCase());
    const requiredSkillsLower = jobListing.requirements.map(r => r.toLowerCase());
    
    const matchingSkills = userSkillsLower.filter(skill =>
      requiredSkillsLower.some(req => req.includes(skill) || skill.includes(req))
    );
    
    skillsMatch = Math.round((matchingSkills.length / requiredSkillsLower.length) * 100);
  }

  // 2. Experience Match (30% weight)
  // Simple heuristic: check if user has relevant experience
  if (userProfile.experience) {
    const experienceData = Array.isArray(userProfile.experience) 
      ? userProfile.experience 
      : [];
    
    // Calculate years of experience
    const yearsOfExperience = experienceData.length * 1.5; // Rough estimate
    
    // Match against job level (inferred from title)
    const jobTitle = jobListing.title.toLowerCase();
    if (jobTitle.includes("senior") || jobTitle.includes("lead")) {
      experienceMatch = yearsOfExperience >= 5 ? 90 : 50;
    } else if (jobTitle.includes("junior") || jobTitle.includes("entry")) {
      experienceMatch = yearsOfExperience >= 1 ? 100 : 80;
    } else {
      experienceMatch = yearsOfExperience >= 2 ? 85 : 60;
    }
  }

  // 3. Location Match (15% weight)
  if (userProfile.preferredLocations && userProfile.preferredLocations.length > 0) {
    const jobLocation = jobListing.location?.toLowerCase() || "";
    const isRemote = jobListing.jobType?.toLowerCase().includes("remote") || jobLocation.includes("remote");
    
    if (isRemote || userProfile.preferredLocations.some(loc => 
      jobLocation.includes(loc.toLowerCase())
    )) {
      locationMatch = 100;
    } else {
      locationMatch = 40;
    }
  } else {
    locationMatch = 50; // Neutral if no preference
  }

  // 4. Salary Match (10% weight)
  if (userProfile.salaryExpectation && jobListing.salaryMin && jobListing.salaryMax) {
    const expectedSalary = userProfile.salaryExpectation;
    const minSalary = jobListing.salaryMin;
    const maxSalary = jobListing.salaryMax;
    
    if (expectedSalary >= minSalary && expectedSalary <= maxSalary) {
      salaryMatch = 100;
    } else if (expectedSalary < minSalary) {
      salaryMatch = 70; // Under-qualified but might still work
    } else {
      salaryMatch = 40; // Over-qualified
    }
  } else {
    salaryMatch = 50; // Neutral if no salary data
  }

  // 5. Deaf Accessibility Bonus (5% bonus)
  if (jobListing.deafFriendly || jobListing.hasASLSupport) {
    deafAccessibilityBonus = 10;
  }

  // Calculate weighted overall score
  overallScore = Math.round(
    skillsMatch * 0.40 +
    experienceMatch * 0.30 +
    locationMatch * 0.15 +
    salaryMatch * 0.10 +
    deafAccessibilityBonus * 0.05
  );

  // Cap at 100
  overallScore = Math.min(100, overallScore + deafAccessibilityBonus);

  return {
    id: 0, // Will be set by database
    userId: userProfile.userId,
    jobListingId: jobListing.id,
    overallScore,
    skillsMatch,
    experienceMatch,
    locationMatch,
    salaryMatch,
    deafAccessibilityBonus,
    matchDetails: {
      strengths: generateMatchStrengths(skillsMatch, experienceMatch, locationMatch, salaryMatch, jobListing),
      concerns: generateMatchConcerns(skillsMatch, experienceMatch, locationMatch, salaryMatch),
      recommendation: overallScore >= 70 ? "Highly Recommended" : overallScore >= 50 ? "Good Match" : "Consider if interested",
    },
    createdAt: new Date(),
  };
}

function generateMatchStrengths(
  skillsMatch: number,
  experienceMatch: number,
  locationMatch: number,
  salaryMatch: number,
  jobListing: JobListing
): string[] {
  const strengths: string[] = [];
  
  if (skillsMatch >= 70) strengths.push("Strong skills alignment");
  if (experienceMatch >= 70) strengths.push("Relevant experience level");
  if (locationMatch >= 80) strengths.push("Great location match");
  if (salaryMatch >= 80) strengths.push("Salary expectations aligned");
  if (jobListing.deafFriendly) strengths.push("Deaf-friendly workplace");
  if (jobListing.hasASLSupport) strengths.push("ASL support available");
  
  return strengths;
}

function generateMatchConcerns(
  skillsMatch: number,
  experienceMatch: number,
  locationMatch: number,
  salaryMatch: number
): string[] {
  const concerns: string[] = [];
  
  if (skillsMatch < 50) concerns.push("May need additional skills development");
  if (experienceMatch < 50) concerns.push("Experience level may not align");
  if (locationMatch < 50) concerns.push("Location might require relocation");
  if (salaryMatch < 50) concerns.push("Salary expectations may need adjustment");
  
  return concerns;
}

/**
 * Find matching jobs for user
 */
export function findMatchingJobs(
  userProfile: UserProfile,
  allJobs: JobListing[],
  limit: number = 10
): JobMatchScore[] {
  const scores = allJobs
    .filter(job => job.isActive)
    .map(job => calculateJobMatchScore(userProfile, job))
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, limit);

  return scores;
}

/**
 * Generate video resume script
 */
export function generateVideoResumeScript(userProfile: UserProfile): {
  sections: Array<{
    title: string;
    duration: string;
    script: string;
    tips: string[];
  }>;
  totalDuration: string;
} {
  return {
    sections: [
      {
        title: "Introduction",
        duration: "15-20 seconds",
        script: `Hello! My name is ${userProfile.fullName}. ${userProfile.headline}. I'm excited to share my experience and skills with you today.`,
        tips: [
          "Smile and maintain eye contact with camera",
          "Use clear, natural ASL",
          "Show enthusiasm and confidence",
        ],
      },
      {
        title: "Professional Background",
        duration: "30-40 seconds",
        script: `I have experience in [your field], with expertise in ${userProfile.skills?.slice(0, 3).join(", ")}. I'm passionate about creating accessible and inclusive solutions.`,
        tips: [
          "Highlight 2-3 key achievements",
          "Show relevant work samples if possible",
          "Emphasize deaf community contributions",
        ],
      },
      {
        title: "Why I'm a Great Fit",
        duration: "20-30 seconds",
        script: "I'm looking for a deaf-friendly workplace where I can contribute my skills and grow professionally. I believe my experience and passion make me an excellent candidate.",
        tips: [
          "Connect your skills to company needs",
          "Show personality",
          "End with a call to action",
        ],
      },
      {
        title: "Closing",
        duration: "10-15 seconds",
        script: "Thank you for considering my application. I look forward to discussing how I can contribute to your team. Feel free to contact me!",
        tips: [
          "Include contact information on screen",
          "Smile and wave goodbye",
          "Keep it warm and professional",
        ],
      },
    ],
    totalDuration: "75-105 seconds (1-2 minutes)",
  };
}

/**
 * Get career development resources
 */
export function getCareerResources(field: string): Array<{
  title: string;
  type: string;
  description: string;
  url: string;
  deafAccessible: boolean;
  hasASL: boolean;
}> {
  return [
    {
      title: "Deaf Professional Network",
      type: "Community",
      description: "Connect with other deaf professionals in your field",
      url: "https://example.com/dpn",
      deafAccessible: true,
      hasASL: true,
    },
    {
      title: "ASL Career Training",
      type: "Course",
      description: "Professional development courses taught in ASL",
      url: "https://example.com/training",
      deafAccessible: true,
      hasASL: true,
    },
    {
      title: "Resume Workshop",
      type: "Workshop",
      description: "Learn to create compelling resumes and video resumes",
      url: "https://example.com/workshop",
      deafAccessible: true,
      hasASL: true,
    },
    {
      title: "Interview Preparation Guide",
      type: "Guide",
      description: "Tips for succeeding in job interviews with interpreters",
      url: "https://example.com/interview-guide",
      deafAccessible: true,
      hasASL: true,
    },
  ];
}

/**
 * Generate interview preparation tips
 */
export function getInterviewPreparationTips(): {
  general: string[];
  deafSpecific: string[];
  questions: string[];
  questionsToAsk: string[];
} {
  return {
    general: [
      "Research the company thoroughly",
      "Prepare examples of your work and achievements",
      "Practice answers to common interview questions",
      "Dress professionally and appropriately",
      "Arrive early to reduce stress",
      "Bring copies of your resume and portfolio",
    ],
    deafSpecific: [
      "Request an interpreter if needed (at least 2 weeks in advance)",
      "Ask about communication methods preferred (video, email, etc.)",
      "Clarify if real-time captions will be available",
      "Confirm lighting and seating for optimal ASL visibility",
      "Prepare a brief statement about your communication needs",
      "Bring your own notepad for written communication if needed",
    ],
    questions: [
      "Tell me about yourself",
      "What are your greatest strengths?",
      "Describe a challenging project and how you handled it",
      "Where do you see yourself in 5 years?",
      "Why do you want to work here?",
      "How do you handle workplace conflicts?",
    ],
    questionsToAsk: [
      "What does a typical day look like in this role?",
      "How does the team communicate daily? (email, video, chat?)",
      "What accessibility accommodations are available?",
      "Are there other deaf employees or ERGs?",
      "What opportunities for professional development exist?",
      "What's the company culture around diversity and inclusion?",
    ],
  };
}

export default {
  generateResume,
  calculateJobMatchScore,
  findMatchingJobs,
  generateVideoResumeScript,
  getCareerResources,
  getInterviewPreparationTips,
};
