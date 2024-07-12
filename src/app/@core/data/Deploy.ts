export interface DeployPhase {
    id?: string;  // Optional field for unique identifier
    deploymentPlan: string;
    goLiveDate: string;  // Use string for date in ISO format
    systemConfiguration: string;
    dataMigrationStrategy: string;
    userTrainingPlan: string;
    cutoverPlan: string;
    supportPlan: string;
    postGoLiveMonitoringPlan: string;
    changeManagementActivities: string;
    deploymentTeamMembers: string;
    lessonsLearned: string;
    approvalStatus: string;
    approvalDate?: string;  // Optional field for approval date in ISO format
  }
  