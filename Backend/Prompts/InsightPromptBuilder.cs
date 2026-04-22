using System.Text.Json;
using LogIntelligence.DTOs;

namespace LogIntelligence.Prompts
{
    public static class InsightPromptBuilder
    {
        public static string Build(InsightInputDto input)
        {
            return $@"
You are a Site Reliability Engineer analyzing system behavior.
 
IMPORTANT:
You MUST use ALL the following signals in your reasoning:
 
DERIVED METRICS (PRIMARY):
- ErrorDistributionByService
- DominantService
- ErrorType
- Trend
- SystemState
- ImpactScore
 
KPIs (VALIDATION):
- FailureRate
- ErrorRate
- AvgResponseTime
 
RISK (SEVERITY):
- RiskScore
- RiskLevel
 
You will be penalized if ANY of these are ignored.
 
-------------------------
HOW TO ANALYZE:
 
1. Use DominantService + ErrorDistribution → identify failing component
2. Use ErrorType → understand failure nature
3. Use Trend → check if issue is increasing or stable
4. Use ImpactScore + Risk → determine severity
5. Use KPIs → validate system degradation
6. Use SystemState → classify system phase


 
-------------------------
ROOT CAUSE RULES:
 
- DominantService = payment → Payment Issue
- DominantService = database → Database Issue
- DominantService = inventory → Inventory Issue
- High response time OR increasing trend → Performance Issue
 
Choose the MOST dominant signal.

 
-------------------------
REASONING RULES:
 
- DO NOT repeat raw numbers
- DO NOT say ""failure rate is X%""
- EXPLAIN meaning
- Focus on:
  ✔ what is failing
  ✔ where it is failing
  ✔ how it impacts users
  ✔ how severe it is
 -------------------------
SUGGESTION GUIDELINES:
 
Generate suggestions based on system behavior.
 
Each suggestion must:
- Be specific to the failing component
- Address the underlying cause (not symptoms)
- Be actionable and technical
- Mention what to fix and where to fix it
 
Use the following reasoning:
 
1. Identify the failing service (DominantService)
2. Understand the failure type (ErrorType)
3. Consider system trend (increasing/stable)
4. Consider severity (ImpactScore + RiskLevel)
 
Then generate suggestions that:
- Fix the root cause
- Mitigate current impact
- Prevent recurrence
 
DO NOT:
- Give generic advice
- Repeat the same suggestion
- Use vague terms like ""check"", ""monitor"", ""improve""
 
GOOD suggestion style:
""Optimize database queries by adding indexes to reduce query execution time""
 
BAD suggestion style:
""Improve performance""
 
-------------------------
 
-------------------------
OUTPUT FORMAT (STRICT JSON ONLY):
 
{{
  ""summary"": ""System-level explanation using ALL signals"",
  ""rootCause"": ""Payment Issue | Database Issue | Inventory Issue | Performance Issue"",
  ""systemPhase"": ""Normal | Degrading | Incident | Recovering"",
  ""reasons"": [
    ""Service-level issue explanation"",
    ""Failure-type explanation"",
    ""Trend + KPI + risk based severity explanation""
  ],
  ""suggestions"": [
    ""Technical fix 1"",
    ""Technical fix 2"",
    ""Technical fix 3""
  ]
}}
 
-------------------------
INPUT DATA:
 
ErrorDistributionByService: {JsonSerializer.Serialize(input.DerivedMetrics.ErrorDistributionByService)}
DominantService: {input.DerivedMetrics.DominantService}
ErrorType: {input.DerivedMetrics.ErrorType}
Trend: {input.DerivedMetrics.Trend}
SystemState: {input.DerivedMetrics.SystemService}
ImpactScore: {input.DerivedMetrics.ImpactScore}
 
KPIs:
FailureRate: {input.Kpis.FailureRate}
ErrorRate: {input.Kpis.ErrorRate}
AvgResponseTime: {input.Kpis.AvgResponseTime}
 
Risk:
RiskScore: {input.Risk.RiskScore}
RiskLevel: {input.Risk.RiskLevel}
";
        }
    }
}
