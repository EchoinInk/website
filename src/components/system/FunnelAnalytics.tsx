import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  consumeFunnelAttribution,
  eventForPath,
  projectFromPath,
  rememberFunnelAttribution,
  trackFunnelEvent
} from "@/lib/analytics";

export function FunnelAnalytics() {
  const location = useLocation();
  const lastTrackedLocation = useRef<string>();

  useEffect(() => {
    const locationIdentity = `${location.key}:${location.pathname}`;
    if (lastTrackedLocation.current === locationIdentity) return;
    lastTrackedLocation.current = locationIdentity;

    const event = eventForPath(location.pathname);
    if (!event) return;

    const attribution = event.event === "project_view" ? consumeFunnelAttribution() : undefined;
    trackFunnelEvent({ ...event, ...attribution });
  }, [location.key, location.pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const currentProject = projectFromPath(window.location.pathname);
      if (!currentProject) return;

      const destinationProject = projectFromPath(destination.pathname);
      if (destinationProject) {
        rememberFunnelAttribution({
          journey: "project_continuation",
          sourcePath: window.location.pathname,
          sourceProject: currentProject,
          direction:
            link.dataset.direction === "previous" || link.dataset.direction === "next"
              ? link.dataset.direction
              : undefined
        });
        return;
      }

      if (destination.pathname === "/contact") {
        rememberFunnelAttribution({
          journey: "project_to_enquiry",
          sourcePath: window.location.pathname,
          sourceProject: currentProject
        });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
