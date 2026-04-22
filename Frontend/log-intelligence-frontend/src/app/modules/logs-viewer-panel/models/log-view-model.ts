export interface LogView {
  id: string;
  timestamp: string;
  level: string;
  service: string;
  event: string;
 
  orderId?: string;
  userId?: string;
  amount?: number;
  status?: string;
  responseTime?: number;
  errorMessage?: string;
}
 