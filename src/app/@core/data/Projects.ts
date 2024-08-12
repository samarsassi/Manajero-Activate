import { DeployPhase } from "./Deploy";
import { DiscoverPhase } from "./DiscoverPhase";
import { ExplorePhase } from "./ExplorePhase.Model";
import { ProjectPreparation } from "./project-preparation.model";
import { Realize } from "./Realize";

export interface Projects {
    id?: string;
    title: string;
    status: string;
    statementWork: string;
    dateSubmitted?: string; // or Date type if preferred
    projectManager: string;
    archived: boolean;
    problematic?: {
      id?: string;
      name?: string;
      description?: string;
    };

    discoverPhase: DiscoverPhase;
    preparationPhase: ProjectPreparation;
    explorePhase: ExplorePhase;
    realizePhase: Realize;
    deployPhase: DeployPhase;
  }
  