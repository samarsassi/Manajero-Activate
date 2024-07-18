export interface DiscoverPhase {
    id?: string;
    companyName: string;
    industry: string;
    currentChallenges: string;
    requiredCapabilities: string[];
    roadmap: string;
    expectedValue: string;
    phaseStartDate: string;  // Use string for date
    phaseEndDate: string;    // Use string for date
    phaseStatus: string;
}
