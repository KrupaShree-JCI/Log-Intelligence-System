export interface KpiModel {
  totalOrders: number;
  failureRate: number;
  errorRate: number;
  avgResponseTime: number;
  riskScore: number;
  riskLevel: string;
}