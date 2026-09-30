import {
  ANALYTICS_DEBUG_EVENT,
  consumeFunnelAttribution,
  eventForPath,
  rememberFunnelAttribution,
  trackFunnelEvent
} from "@/lib/analytics";

describe("funnel analytics", () => {
  it("maps only the approved funnel routes to view events", () => {
    expect(eventForPath("/")).toEqual({ event: "home_view", path: "/" });
    expect(eventForPath("/works/")).toEqual({ event: "work_view", path: "/works" });
    expect(eventForPath("/works/lumo?ref=home")).toEqual({
      event: "project_view",
      path: "/works/lumo",
      project: "lumo"
    });
    expect(eventForPath("/services")).toBeUndefined();
  });

  it("keeps transition attribution ephemeral and consumes it once", () => {
    rememberFunnelAttribution({
      journey: "project_to_enquiry",
      sourcePath: "/works/codexia",
      sourceProject: "codexia"
    });

    expect(consumeFunnelAttribution()).toEqual({
      journey: "project_to_enquiry",
      sourcePath: "/works/codexia",
      sourceProject: "codexia"
    });
    expect(consumeFunnelAttribution()).toBeUndefined();
  });

  it("exposes the development event without including query strings", () => {
    const listener = vi.fn();
    window.addEventListener(ANALYTICS_DEBUG_EVENT, listener);

    trackFunnelEvent({ event: "home_view", path: "/?campaign=private" });

    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({
      event: "home_view",
      path: "/"
    });
    window.removeEventListener(ANALYTICS_DEBUG_EVENT, listener);
  });
});
