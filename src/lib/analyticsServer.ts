import { funnelEventNames, type FunnelEvent, type FunnelEventName } from "./analytics.ts";

type AnalyticsDataPoint = {
  indexes: string[];
  blobs: string[];
  doubles: number[];
};

type AnalyticsEngineDataset = {
  writeDataPoint(dataPoint: AnalyticsDataPoint): void;
};

export type AnalyticsEnv = {
  ANALYTICS?: AnalyticsEngineDataset;
};

type AnalyticsHandlerOptions = {
  env?: AnalyticsEnv;
};

const allowedProjects = new Set(["lumo", "keystone", "codexia"]);
const allowedJourneys = new Set(["project_to_enquiry", "form_completion", "project_continuation"]);
const allowedDirections = new Set(["previous", "next"]);
const allowedPaths = new Set([
  "/",
  "/works",
  "/works/lumo",
  "/works/keystone",
  "/works/codexia",
  "/contact"
]);

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function optionalAllowedString(value: unknown, allowed: Set<string>) {
  return value === undefined || value === null || value === ""
    ? ""
    : typeof value === "string" && allowed.has(value)
      ? value
      : undefined;
}

export function validateAnalyticsEvent(payload: unknown): FunnelEvent | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const candidate = payload as Record<string, unknown>;

  if (
    typeof candidate.event !== "string" ||
    !funnelEventNames.includes(candidate.event as FunnelEventName) ||
    typeof candidate.path !== "string" ||
    !allowedPaths.has(candidate.path)
  ) {
    return undefined;
  }

  const project = optionalAllowedString(candidate.project, allowedProjects);
  const sourceProject = optionalAllowedString(candidate.sourceProject, allowedProjects);
  const sourcePath = optionalAllowedString(candidate.sourcePath, allowedPaths);
  const journey = optionalAllowedString(candidate.journey, allowedJourneys);
  const direction = optionalAllowedString(candidate.direction, allowedDirections);
  if ([project, sourceProject, sourcePath, journey, direction].includes(undefined))
    return undefined;

  return {
    event: candidate.event as FunnelEventName,
    path: candidate.path,
    ...(project ? { project: project as FunnelEvent["project"] } : {}),
    ...(sourceProject ? { sourceProject: sourceProject as FunnelEvent["sourceProject"] } : {}),
    ...(sourcePath ? { sourcePath } : {}),
    ...(journey ? { journey: journey as FunnelEvent["journey"] } : {}),
    ...(direction ? { direction: direction as FunnelEvent["direction"] } : {})
  };
}

export async function handleAnalyticsRequest(
  request: Request,
  options: AnalyticsHandlerOptions = {}
) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== requestUrl.host) {
    return jsonResponse({ ok: false, message: "Origin not allowed." }, 403);
  }

  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return jsonResponse({ ok: false, message: "Unsupported content type." }, 415);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "Invalid event." }, 400);
  }

  const event = validateAnalyticsEvent(payload);
  if (!event) return jsonResponse({ ok: false, message: "Invalid event." }, 400);

  if (!options.env?.ANALYTICS) {
    return jsonResponse({ ok: false, message: "Analytics unavailable." }, 503);
  }

  options.env.ANALYTICS.writeDataPoint({
    indexes: [requestUrl.hostname],
    blobs: [
      event.event,
      event.path,
      event.project ?? "",
      event.sourceProject ?? "",
      event.sourcePath ?? "",
      event.journey ?? "",
      event.direction ?? ""
    ],
    doubles: [1]
  });

  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" }
  });
}
