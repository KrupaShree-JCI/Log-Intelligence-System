export interface InsightData {
  summary: string;
  rootCause: string;
  systemPhase: string;
  reasons: string[];
  suggestions: string[];
 
  derivedMetrics: {
    errorDistributionByService: Record<string, number>;
    dominantService: string;
    errorType: string;
    trend: string;
    systemService: string;
    impactScore:number;
  };
 
  risk: {
    riskLevel: string;
    riskScore: number;
  };
}
 