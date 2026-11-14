export interface AuthorMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  email?: string;
  code?: string;
}

export interface AnteproyectoMetadata {
  title: string;
  institution: string;
  program: string;
  faculty: string;
  director: string;
  date: string;
  city: string;
  pdfPath: string;
  pdfFileName: string;
  driveAuditLink: string;
  generalObjective: string;
  specificObjectives: string[];
  authors: AuthorMember[];
}

export interface QuinquennialProjection {
  year: number;
  bauMWh: number;
  optMWh: number;
  savingsMWh: number;
  savingsPct: number;
  pueInertial: number;
  pueOptimized: number;
  opexAccumulatedUSD: number;
  co2AvoidedTons: number;
}

export interface OperationalVariable {
  code: string;
  name: string;
  type: 'Independiente' | 'Exógena' | 'Dependiente' | 'Eficiencia';
  unit: string;
  operationalDefinition: string;
  hardwareSource: string;
  minTypical: number;
  maxTypical: number;
  meanTypical: number;
  correlationWithPower: number;
}

export interface EvaluationEquation {
  id: string;
  name: string;
  formulaLatex: string;
  definition: string;
  mathExplanation: string;
  obtainedValueLSTM: number;
  obtainedValueGRU: number;
  unit: string;
  benchmarkGoal: string;
}

export interface ActivityScheduleItem {
  phase: string;
  activityCode: string;
  taskDescription: string;
  weeks: string;
  deliverable: string;
  status: 'Completado' | 'En Progreso' | 'Planificado';
}

export interface ProblemTreeNode {
  rootCauses: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    impact: string;
  }[];
  centralProblem: {
    title: string;
    description: string;
    geographicScope: string;
    temporalHorizon: string;
  };
  directEffects: {
    id: string;
    title: string;
    type: 'Técnico' | 'Económico' | 'Ambiental';
    metric: string;
    description: string;
  }[];
  analyticalBreakdown: string;
}

export interface SolutionAlternativeItem {
  id: string;
  title: string;
  type: 'Infraestructura Física (Hardware)' | 'Solución Software Basada en IA Predictiva';
  selected: boolean;
  description: string;
  capex: string;
  opex: string;
  roi: string;
  techDetails: string[];
  justification: string;
}

export interface AntecedenteReference {
  id: string;
  territorialLevel: 'Local (Bogotá)' | 'Nacional (Colombia)' | 'Internacional';
  number: number;
  citation: string;
  year: number;
  entityOrAuthors: string;
  coreContribution: string;
  apaFullCitation: string;
  link?: string;
}

export interface TelemetrySample {
  timestamp: string;
  hourOfYear: number;
  dayOfYear: number;
  hourOfDay: number;
  dcId: string;
  cpuPct: number;
  ramGb: number;
  networkGbps: number;
  ambientTempC: number;
  powerKwh: number;
  pueRatio: number;
}
