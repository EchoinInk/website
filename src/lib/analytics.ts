export const funnelEventNames = [
  "home_view",
  "work_view",
  "project_view",
  "enquiry_start",
  "enquiry_submit"
] as const;

export type FunnelEventName = (typeof funnelEventNames)[number];
export type ProjectName = "lumo" | "keystone" | "codexia";

export type FunnelEvent = {
  event: FunnelEventName;
  path: string;
  project?: ProjectName;
  sourceProject?: ProjectName;
  sourcePath?: string;
  journey?: "project_to_enquiry" | "form_completion" | "project_continuation";
  direction?: "previous" | "next";
};

export const ANALYTICS_DEBUG_EVENT = "echo:analytics";

const ANALYTICS_ENDPOINT = "/api/analytics";
const ATTRIBUTION_KEY = "echo:funnel-attribution";

type FunnelAttribution = Pick<
  FunnelEvent,
  "sourcePath" | "sourceProject" | "journey" | "direction"
>;

function isBrowser() {
  return typeof window !== "undefined";
}

export function normaliseAnalyticsPath(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function projectFromPath(pathname: string): ProjectName | undefined {
  const match = normaliseAnalyticsPath(pathname).match(/^\/works\/(lumo|keystone|codexia)$/);
  return match?.[1] as ProjectName | undefined;
}

export function eventForPath(pathname: string): FunnelEvent | undefined {
  const path = normaliseAnalyticsPath(pathname);

  if (path === "/") return { event: "home_view", path };
  if (path === "/works") return { event: "work_view", path };

  const project = projectFromPath(path);
  return project ? { event: "project_view", path, project } : undefined;
}

export function rememberFunnelAttribution(attribution: FunnelAttribution) {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Analytics must never interrupt navigation when storage is unavailable.
  }
}

export function consumeFunnelAttribution(): FunnelAttribution | undefined {
  if (!isBrowser()) return undefined;

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (!stored) return undefined;
    window.sessionStorage.removeItem(ATTRIBUTION_KEY);
    return JSON.parse(stored) as FunnelAttribution;
  } catch {
    return undefined;
  }
}

export function trackFunnelEvent(event: FunnelEvent) {
  if (!isBrowser()) return;

  const payload = JSON.stringify({
    ...event,
    path: normaliseAnalyticsPath(event.path),
    sourcePath: event.sourcePath ? normaliseAnalyticsPath(event.sourcePath) : undefined
  });

  window.dispatchEvent(
    new CustomEvent<FunnelEvent>(ANALYTICS_DEBUG_EVENT, {
      detail: JSON.parse(payload) as FunnelEvent
    })
  );

  if (import.meta.env.DEV) {
    console.info("[analytics]", JSON.parse(payload));
    return;
  }

  if (typeof navigator.sendBeacon === "function") {
    const queued = navigator.sendBeacon(
      ANALYTICS_ENDPOINT,
      new Blob([payload], { type: "application/json" })
    );
    if (queued) return;
  }

  void fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
    credentials: "same-origin"
  }).catch(() => {
    // Measurement failure must not affect the visitor's journey.
  });
}
