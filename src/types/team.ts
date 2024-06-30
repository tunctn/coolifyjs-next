import type { Project } from "./project";

export type Team = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type TeamWithRelations = Team & {
  projects: Project[];
};
