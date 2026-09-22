import { Helmet } from 'react-helmet-async';
import {
  OrbitalVisual,
  type OrbitalVariant,
} from '@/components/ui/OrbitalVisual';

const variants: OrbitalVariant[] = [
  "axiomRing",
  "vectorLattice",
  "signalBridge",
  "prismMirror",
  "innerTide",
  "quietAxis",
  "chorusCore",
  "memoryComet",
  "synthesisStar",
  "haloGate",
  "focusDial",
  "threadBeacon",
  "lunarVault",
  "signalBloom",
  "echoSpiral",
  "thresholdEye",
  "starThread",
  "violetCompass",
  "mirrorOrbit",
  "pulseCrown",
  "softCircuit",
  "inkConstellation",
  "auraLens",
  "celestialWeave",
  "signalNest",
  "prismAnchor",
  "quietFlare",
  "memoryGate",
  "echoCrescent",
  "luminousSpine",
];

export function OrbitalsPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--ei-color-bg)] px-6 py-20 md:px-10"
    >
      <Helmet>
        <title>Orbitals — Echo in Ink Internal</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="theme-color" content="#080718" />
      </Helmet>

      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[var(--ei-color-text-secondary)]">
          Internal visual sheet
        </p>

        <h1 className="mb-10 text-3xl font-semibold text-[var(--ei-color-text-primary)] md:text-5xl">
          Orbital Variants Sheet
        </h1>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {variants.map((variant) => (
            <div
              key={variant}
              className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-[rgb(var(--ei-midnight-rgb)/0.6)] p-5 shadow-[0_24px_80px_rgb(0_0_0/0.24)]"
            >
              <div className="brightness-125 contrast-125">
                <OrbitalVisual variant={variant} size={110} />
              </div>

              <span className="text-center text-xs text-[var(--ei-color-text-secondary)]">
                {variant}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
