import { handleAnalyticsRequest, validateAnalyticsEvent } from "@/lib/analyticsServer";

function analyticsRequest(payload: unknown, origin = "https://echoin.ink") {
  return new Request("https://echoin.ink/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(payload)
  });
}

describe("handleAnalyticsRequest", () => {
  it("writes an allowlisted anonymous funnel data point", async () => {
    const writeDataPoint = vi.fn();
    const response = await handleAnalyticsRequest(
      analyticsRequest({
        event: "project_view",
        path: "/works/lumo",
        project: "lumo",
        sourcePath: "/works/codexia",
        sourceProject: "codexia",
        journey: "project_continuation",
        direction: "next"
      }),
      { env: { ANALYTICS: { writeDataPoint } } }
    );

    expect(response.status).toBe(204);
    expect(writeDataPoint).toHaveBeenCalledWith({
      indexes: ["echoin.ink"],
      blobs: [
        "project_view",
        "/works/lumo",
        "lumo",
        "codexia",
        "/works/codexia",
        "project_continuation",
        "next"
      ],
      doubles: [1]
    });
  });

  it("rejects unrecognised events, paths, properties, and cross-origin posts", async () => {
    expect(validateAnalyticsEvent({ event: "field_change", path: "/contact" })).toBeUndefined();
    expect(
      validateAnalyticsEvent({ event: "home_view", path: "/?email=private@example.com" })
    ).toBeUndefined();
    expect(
      validateAnalyticsEvent({ event: "home_view", path: "/", project: "unknown" })
    ).toBeUndefined();

    const response = await handleAnalyticsRequest(
      analyticsRequest({ event: "home_view", path: "/" }, "https://example.com"),
      { env: { ANALYTICS: { writeDataPoint: vi.fn() } } }
    );
    expect(response.status).toBe(403);
  });

  it("reports a missing production binding instead of claiming to record the event", async () => {
    const response = await handleAnalyticsRequest(
      analyticsRequest({ event: "home_view", path: "/" })
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      ok: false,
      message: "Analytics unavailable."
    });
  });
});
