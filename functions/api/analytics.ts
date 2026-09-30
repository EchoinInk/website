import { handleAnalyticsRequest, type AnalyticsEnv } from "../../src/lib/analyticsServer.ts";

export type AnalyticsPagesContext = {
  request: Request;
  env: AnalyticsEnv;
};

function forwardAnalyticsRequest(context: AnalyticsPagesContext) {
  return handleAnalyticsRequest(context.request, { env: context.env });
}

export const onRequestPost = forwardAnalyticsRequest;
export const onRequest = forwardAnalyticsRequest;
