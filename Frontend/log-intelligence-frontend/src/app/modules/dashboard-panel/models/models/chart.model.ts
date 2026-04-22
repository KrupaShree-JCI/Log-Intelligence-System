export interface ErrorTrend {
    time:string;
    errorCount:number;
}
export interface SeverityData {
    level:string;
    count:number;
}


export interface TopError{
    errorMessage:string;
    count:number
}


export interface OrderTrend{
    time:string;
    orderCount:number;
    failureCount:number;
}
