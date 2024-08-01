export interface Projects {
    id?: string;
    title: string;
    statementWork: string;
    dateSubmitted?: string; // or Date type if preferred
    projectManager: string;
    archived: boolean;
    problematic?: {
      id?: string;
      name?: string;
      description?: string;
    };
  }
  