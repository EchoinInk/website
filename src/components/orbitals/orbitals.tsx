
export type OrbitalVariant =
  | "axiomRing"
  | "vectorLattice"
  | "signalBridge"
  | "prismMirror"
  | "innerTide"
  | "quietAxis"
  | "chorusCore"
  | "memoryComet"
  | "synthesisStar"
  | "haloGate"
  | "focusDial"
  | "threadBeacon"
  | "lunarVault"
  | "signalBloom"
  | "echoSpiral"
  | "thresholdEye"
  | "starThread"
  | "violetCompass"
  | "mirrorOrbit"
  | "pulseCrown"
  | "softCircuit"
  | "inkConstellation"
  | "auraLens"
  | "celestialWeave"
  | "signalNest"
  | "prismAnchor"
  | "quietFlare"
  | "memoryGate"
  | "echoCrescent"
  | "luminousSpine";;

type OrbitalProps = { size?: number };

const ELECTRIC_BLUE = "rgb(11 32 246)";
const HALO_BLUE = "rgb(73 133 253)";
const VIOLET = "rgb(113 7 234)";
const ECHO_MAGENTA = "rgb(221 18 203)";
const SOFT_NEON = "rgb(230 105 242)";
const MOONLIT = "rgb(227 216 253)";
const ICE_WHITE = "rgb(247 245 250)";

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 96 96",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
});

function Orbital_AxiomRing({ size = 96 }: OrbitalProps) {
  const path = "M48 15C66.2 15 81 29.8 81 48S66.2 81 48 81";
  return (
    <svg {...svgProps(size)}>
      <path d={path} stroke={ELECTRIC_BLUE} strokeWidth="4.8" opacity="0.4" />
      <path
        d={path}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M48 81C29.8 81 15 66.2 15 48S29.8 15 48 15"
        stroke={HALO_BLUE}
        strokeWidth="1"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
      <path
        d="M48 30L63.6 57H32.4L48 30Z"
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="4.5" stroke={HALO_BLUE} strokeWidth="1.1" />
      <circle cx="48" cy="15" r="2.8" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="32.4" cy="57" r="2.2" fill={ELECTRIC_BLUE} />
      <circle cx="63.6" cy="57" r="2.2" fill={ELECTRIC_BLUE} />
    </svg>
  );
}

function Orbital_VectorLattice({ size = 96 }: OrbitalProps) {
  const lattice = "M23 67L36 27L72 38L61 75L23 67ZM36 27L61 75M72 38L23 67";
  return (
    <svg {...svgProps(size)}>
      <path d={lattice} stroke={ELECTRIC_BLUE} strokeWidth="4.5" opacity="0.38" />
      <path
        d={lattice}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M36 27L48 12M72 38L84 32M61 75L67 86"
        stroke={HALO_BLUE}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="36" cy="27" r="3" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="72" cy="38" r="3" fill={ELECTRIC_BLUE} />
      <circle cx="61" cy="75" r="3" fill={HALO_BLUE} />
      <circle cx="23" cy="67" r="3" fill={ICE_WHITE} stroke={ELECTRIC_BLUE} />
      <circle cx="49" cy="51" r="4" stroke={HALO_BLUE} strokeWidth="1.1" />
    </svg>
  );
}

function Orbital_SignalBridge({ size = 96 }: OrbitalProps) {
  const bridge = "M14 61C24 61 27 36 39 36H57C69 36 72 61 82 61";
  return (
    <svg {...svgProps(size)}>
      <path d={bridge} stroke={ELECTRIC_BLUE} strokeWidth="5" opacity="0.42" />
      <path
        d={bridge}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 68C27 68 30 45 40 45H56C66 45 69 68 82 68"
        stroke={HALO_BLUE}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M39 36L48 24L57 36M48 24V14"
        stroke={HALO_BLUE}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="61" r="4" fill={ICE_WHITE} stroke={ELECTRIC_BLUE} />
      <circle cx="82" cy="61" r="4" fill={ICE_WHITE} stroke={ELECTRIC_BLUE} />
      <circle cx="48" cy="24" r="3" fill={HALO_BLUE} />
      <circle cx="48" cy="14" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_PrismMirror({ size = 96 }: OrbitalProps) {
  const prism = "M48 14L77 69L48 82L19 69L48 14Z";
  return (
    <svg {...svgProps(size)}>
      <path d={prism} stroke={VIOLET} strokeWidth="4.8" opacity="0.4" />
      <path
        d={prism}
        stroke={VIOLET}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M48 14V82M19 69L48 48L77 69"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M27 54L48 48L69 54"
        stroke={VIOLET}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="4.5" fill={ICE_WHITE} stroke={SOFT_NEON} />
      <circle cx="19" cy="69" r="2.5" fill={VIOLET} />
      <circle cx="77" cy="69" r="2.5" fill={SOFT_NEON} />
    </svg>
  );
}

function Orbital_InnerTide({ size = 96 }: OrbitalProps) {
  const wave = "M14 47C24 30 35 30 45 47S66 64 82 43";
  return (
    <svg {...svgProps(size)}>
      <path d={wave} stroke={VIOLET} strokeWidth="5" opacity="0.4" />
      <path d={wave} stroke={VIOLET} strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M20 58C29 45 37 45 45 58S61 71 75 55"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M24 35C32 24 42 24 50 35S66 46 74 34"
        stroke={SOFT_NEON}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="48" cy="48" r="7" stroke={VIOLET} strokeWidth="1.5" />
      <circle cx="48" cy="48" r="2.8" fill={ICE_WHITE} />
      <circle cx="82" cy="43" r="2.5" fill={SOFT_NEON} />
    </svg>
  );
}

function Orbital_QuietAxis({ size = 96 }: OrbitalProps) {
  const axis = "M48 13V37M48 59V83";
  return (
    <svg {...svgProps(size)}>
      <path d={axis} stroke={VIOLET} strokeWidth="4.8" opacity="0.42" />
      <path d={axis} stroke={VIOLET} strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M20 38C29 31 38 33 43 41M76 58C67 65 58 63 53 55"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M20 38L29 47L38 38L29 29L20 38ZM76 58L67 49L58 58L67 67L76 58Z"
        stroke={VIOLET}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="5.5" stroke={SOFT_NEON} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_ChorusCore({ size = 96 }: OrbitalProps) {
  const voices =
    "M48 15C38 24 38 34 44 41M81 48C72 38 62 38 55 44M48 81C58 72 58 62 52 55M15 48C24 58 34 58 41 52";
  return (
    <svg {...svgProps(size)}>
      <path
        d={voices}
        stroke={ECHO_MAGENTA}
        strokeWidth="5"
        opacity="0.42"
        strokeLinecap="round"
      />
      <path
        d={voices}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M48 15L55 26L48 32L41 26L48 15ZM81 48L70 55L64 48L70 41L81 48ZM48 81L41 70L48 64L55 70L48 81ZM15 48L26 41L32 48L26 55L15 48Z"
        stroke={SOFT_NEON}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="9" stroke={ECHO_MAGENTA} strokeWidth="1.6" />
      <circle cx="48" cy="48" r="3" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_MemoryComet({ size = 96 }: OrbitalProps) {
  const comet = "M18 72C34 69 42 59 52 43C59 32 68 25 80 22";
  return (
    <svg {...svgProps(size)}>
      <path
        d={comet}
        stroke={ECHO_MAGENTA}
        strokeWidth="5.2"
        opacity="0.42"
        strokeLinecap="round"
      />
      <path
        d={comet}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 62C32 62 39 52 47 39M25 80C41 75 50 65 57 53"
        stroke={SOFT_NEON}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="72" cy="28" r="10" stroke={ECHO_MAGENTA} strokeWidth="1.6" />
      <circle cx="72" cy="28" r="5" stroke={SOFT_NEON} strokeWidth="1" />
      <circle cx="72" cy="28" r="2.5" fill={ICE_WHITE} />
      <circle cx="18" cy="72" r="2.5" fill={SOFT_NEON} />
    </svg>
  );
}

function Orbital_SynthesisStar({ size = 96 }: OrbitalProps) {
  const star =
    "M48 13L55 39L83 48L55 57L48 83L41 57L13 48L41 39L48 13Z";
  return (
    <svg {...svgProps(size)}>
      <path d={star} stroke={ECHO_MAGENTA} strokeWidth="5" opacity="0.4" />
      <path
        d={star}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M27 27L42 42M69 27L54 42M69 69L54 54M27 69L42 54"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M48 38L58 48L48 58L38 48L48 38Z"
        stroke={ECHO_MAGENTA}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="3" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_HaloGate({ size = 96 }: OrbitalProps) {
  const gate = "M24 79V43C24 25 34 15 48 15C62 15 72 25 72 43V79";
  return (
    <svg {...svgProps(size)}>
      <path d={gate} stroke={HALO_BLUE} strokeWidth="5" opacity="0.42" />
      <path
        d={gate}
        stroke={HALO_BLUE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M34 79V44C34 35 39 29 48 29C57 29 62 35 62 44V79"
        stroke={MOONLIT}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M18 79H78"
        stroke={HALO_BLUE}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="5" stroke={MOONLIT} strokeWidth="1" />
      <path
        d="M48 53V66"
        stroke={HALO_BLUE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_FocusDial({ size = 96 }: OrbitalProps) {
  const dial = "M72 70A34 34 0 1 1 78 36";
  return (
    <svg {...svgProps(size)}>
      <path
        d={dial}
        stroke={HALO_BLUE}
        strokeWidth="5"
        opacity="0.42"
        strokeLinecap="round"
      />
      <path
        d={dial}
        stroke={HALO_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M48 22V30M22 48H30M48 66V74"
        stroke={MOONLIT}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M48 48L74 32"
        stroke={HALO_BLUE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="9" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="3" fill={ICE_WHITE} />
      <circle cx="78" cy="36" r="4" fill={HALO_BLUE} stroke={MOONLIT} />
    </svg>
  );
}

function Orbital_ThreadBeacon({ size = 96 }: OrbitalProps) {
  const beacon = "M48 14V82M48 31L70 43M48 55L25 68";
  return (
    <svg {...svgProps(size)}>
      <path
        d={beacon}
        stroke={HALO_BLUE}
        strokeWidth="5"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={beacon}
        stroke={HALO_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 22L48 14L56 22M62 43L70 43L66 36M33 68L25 68L29 75"
        stroke={MOONLIT}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="31" r="4" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="48" cy="55" r="4" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="70" cy="43" r="3" fill={MOONLIT} />
      <circle cx="25" cy="68" r="3" fill={MOONLIT} />
      <circle cx="48" cy="82" r="2.5" fill={HALO_BLUE} />
    </svg>
  );
}
function Orbital_LunarVault({ size = 96 }: OrbitalProps) {
  const vault = "M20 76C22 42 32 20 48 20C64 20 74 42 76 76";
  return (
    <svg {...svgProps(size)}>
      <path d={vault} stroke={HALO_BLUE} strokeWidth="5" opacity="0.4" />
      <path
        d={vault}
        stroke={HALO_BLUE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M31 76C33 50 39 34 48 34C57 34 63 50 65 76"
        stroke={MOONLIT}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M28 76H68M38 57H58"
        stroke={HALO_BLUE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="48" cy="44" r="5" stroke={MOONLIT} strokeWidth="1" />
      <circle cx="48" cy="44" r="2.2" fill={ICE_WHITE} />
      <circle cx="20" cy="76" r="2.6" fill={HALO_BLUE} />
      <circle cx="76" cy="76" r="2.6" fill={HALO_BLUE} />
    </svg>
  );
}

function Orbital_SignalBloom({ size = 96 }: OrbitalProps) {
  const bloom =
    "M48 48C40 34 42 22 48 14C54 22 56 34 48 48ZM48 48C62 40 74 42 82 48C74 54 62 56 48 48ZM48 48C56 62 54 74 48 82C42 74 40 62 48 48ZM48 48C34 56 22 54 14 48C22 42 34 40 48 48Z";
  return (
    <svg {...svgProps(size)}>
      <path
        d={bloom}
        stroke={ECHO_MAGENTA}
        strokeWidth="5"
        opacity="0.38"
        strokeLinejoin="round"
      />
      <path
        d={bloom}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M48 25V71M25 48H71"
        stroke={SOFT_NEON}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="8" stroke={SOFT_NEON} strokeWidth="1.2" />
      <circle cx="48" cy="48" r="3" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_EchoSpiral({ size = 96 }: OrbitalProps) {
  const spiral = "M70 49C70 61 60 70 48 70C35 70 25 60 25 48C25 34 36 24 50 25C62 26 70 35 70 46C70 56 62 63 52 63C42 63 34 56 34 47C34 39 40 33 48 33";
  return (
    <svg {...svgProps(size)}>
      <path
        d={spiral}
        stroke={VIOLET}
        strokeWidth="5"
        opacity="0.38"
        strokeLinecap="round"
      />
      <path
        d={spiral}
        stroke={VIOLET}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20 48H12M76 48H84M48 20V12M48 76V84"
        stroke={SOFT_NEON}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="4.5" stroke={SOFT_NEON} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
      <circle cx="70" cy="49" r="2.6" fill={SOFT_NEON} />
    </svg>
  );
}

function Orbital_ThresholdEye({ size = 96 }: OrbitalProps) {
  const eye = "M14 48C24 31 36 24 48 24C60 24 72 31 82 48C72 65 60 72 48 72C36 72 24 65 14 48Z";
  return (
    <svg {...svgProps(size)}>
      <path d={eye} stroke={HALO_BLUE} strokeWidth="5" opacity="0.4" />
      <path
        d={eye}
        stroke={HALO_BLUE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M30 48C36 39 41 36 48 36C55 36 60 39 66 48C60 57 55 60 48 60C41 60 36 57 30 48Z"
        stroke={MOONLIT}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="6" stroke={HALO_BLUE} strokeWidth="1.4" />
      <circle cx="48" cy="48" r="2.6" fill={ICE_WHITE} />
      <path
        d="M48 24V14M48 72V82"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Orbital_StarThread({ size = 96 }: OrbitalProps) {
  const thread = "M18 70C31 54 38 61 48 45C58 29 67 38 78 22";
  return (
    <svg {...svgProps(size)}>
      <path
        d={thread}
        stroke={ELECTRIC_BLUE}
        strokeWidth="5"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d={thread}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M31 54L38 61L48 45L58 29L67 38"
        stroke={HALO_BLUE}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M78 14L80.5 20L87 22L80.5 24L78 30L75.5 24L69 22L75.5 20L78 14Z"
        stroke={MOONLIT}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="70" r="3" fill={ICE_WHITE} stroke={ELECTRIC_BLUE} />
      <circle cx="48" cy="45" r="3.5" fill={HALO_BLUE} />
      <circle cx="78" cy="22" r="2.4" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_VioletCompass({ size = 96 }: OrbitalProps) {
  const compass = "M48 13L56 40L83 48L56 56L48 83L40 56L13 48L40 40L48 13Z";
  return (
    <svg {...svgProps(size)}>
      <path d={compass} stroke={VIOLET} strokeWidth="5" opacity="0.38" />
      <path
        d={compass}
        stroke={VIOLET}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="23" stroke={SOFT_NEON} strokeWidth="1" />
      <path
        d="M48 28V68M28 48H68"
        stroke={SOFT_NEON}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="5" stroke={ICE_WHITE} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_MirrorOrbit({ size = 96 }: OrbitalProps) {
  const orbitA = "M17 50C28 24 68 24 79 50";
  const orbitB = "M17 46C28 72 68 72 79 46";
  return (
    <svg {...svgProps(size)}>
      <path d={orbitA} stroke={HALO_BLUE} strokeWidth="5" opacity="0.36" />
      <path d={orbitB} stroke={VIOLET} strokeWidth="5" opacity="0.36" />
      <path
        d={orbitA}
        stroke={HALO_BLUE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d={orbitB}
        stroke={VIOLET}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M48 18V78"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="7" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2.6" fill={ICE_WHITE} />
      <circle cx="17" cy="50" r="2.6" fill={HALO_BLUE} />
      <circle cx="79" cy="46" r="2.6" fill={SOFT_NEON} />
    </svg>
  );
}

function Orbital_PulseCrown({ size = 96 }: OrbitalProps) {
  const crown = "M18 63L30 36L42 56L48 24L54 56L66 36L78 63";
  return (
    <svg {...svgProps(size)}>
      <path
        d={crown}
        stroke={ECHO_MAGENTA}
        strokeWidth="5"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={crown}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 72H74"
        stroke={SOFT_NEON}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="30" cy="36" r="3" fill={SOFT_NEON} />
      <circle cx="48" cy="24" r="4" fill={ICE_WHITE} stroke={ECHO_MAGENTA} />
      <circle cx="66" cy="36" r="3" fill={SOFT_NEON} />
      <circle cx="48" cy="63" r="5" stroke={SOFT_NEON} strokeWidth="1.1" />
      <circle cx="48" cy="63" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_SoftCircuit({ size = 96 }: OrbitalProps) {
  const circuit = "M22 28H42V48H62V68H78";
  return (
    <svg {...svgProps(size)}>
      <path
        d={circuit}
        stroke={ELECTRIC_BLUE}
        strokeWidth="5"
        opacity="0.38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={circuit}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 28L54 16M62 48L76 36M42 48L24 66"
        stroke={HALO_BLUE}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="22" cy="28" r="3.5" fill={ICE_WHITE} stroke={ELECTRIC_BLUE} />
      <circle cx="42" cy="48" r="4" stroke={HALO_BLUE} strokeWidth="1.1" />
      <circle cx="62" cy="48" r="3.5" fill={HALO_BLUE} />
      <circle cx="78" cy="68" r="3.5" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="54" cy="16" r="2.5" fill={MOONLIT} />
    </svg>
  );
}

function Orbital_InkConstellation({ size = 96 }: OrbitalProps) {
  const constellation = "M18 64L34 35L51 50L66 26L80 61L51 50L18 64Z";
  return (
    <svg {...svgProps(size)}>
      <path
        d={constellation}
        stroke={HALO_BLUE}
        strokeWidth="4.6"
        opacity="0.34"
        strokeLinejoin="round"
      />
      <path
        d={constellation}
        stroke={HALO_BLUE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M34 35L43 17M66 26L75 14M80 61L84 78"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="18" cy="64" r="3" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="34" cy="35" r="3" fill={HALO_BLUE} />
      <circle cx="51" cy="50" r="4" fill={ICE_WHITE} stroke={VIOLET} />
      <circle cx="66" cy="26" r="3" fill={SOFT_NEON} />
      <circle cx="80" cy="61" r="3" fill={MOONLIT} />
      <circle cx="43" cy="17" r="2" fill={ICE_WHITE} />
    </svg>
  );
}
function Orbital_AuraLens({ size = 96 }: OrbitalProps) {
  const lens = "M18 48C28 30 38 24 48 24C58 24 68 30 78 48C68 66 58 72 48 72C38 72 28 66 18 48Z";
  return (
    <svg {...svgProps(size)}>
      <path d={lens} stroke={VIOLET} strokeWidth="5" opacity="0.38" />
      <path
        d={lens}
        stroke={VIOLET}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M30 48C37 38 42 35 48 35C54 35 59 38 66 48C59 58 54 61 48 61C42 61 37 58 30 48Z"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="7" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2.8" fill={ICE_WHITE} />
      <circle cx="18" cy="48" r="2.5" fill={SOFT_NEON} />
      <circle cx="78" cy="48" r="2.5" fill={SOFT_NEON} />
    </svg>
  );
}

function Orbital_CelestialWeave({ size = 96 }: OrbitalProps) {
  const weave = "M18 65C32 35 64 35 78 65M18 31C32 61 64 61 78 31";
  return (
    <svg {...svgProps(size)}>
      <path
        d={weave}
        stroke={HALO_BLUE}
        strokeWidth="5"
        opacity="0.36"
        strokeLinecap="round"
      />
      <path
        d={weave}
        stroke={HALO_BLUE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M28 48H68M48 18V78"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="65" r="2.8" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="78" cy="65" r="2.8" fill={HALO_BLUE} />
      <circle cx="18" cy="31" r="2.8" fill={HALO_BLUE} />
      <circle cx="78" cy="31" r="2.8" fill={ICE_WHITE} stroke={HALO_BLUE} />
      <circle cx="48" cy="48" r="5" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_SignalNest({ size = 96 }: OrbitalProps) {
  const nestA = "M24 52C28 32 42 22 58 26C72 30 80 43 76 61";
  const nestB = "M30 59C33 44 44 36 56 39C67 42 72 51 69 64";
  return (
    <svg {...svgProps(size)}>
      <path
        d={nestA}
        stroke={ELECTRIC_BLUE}
        strokeWidth="5"
        opacity="0.38"
        strokeLinecap="round"
      />
      <path
        d={nestA}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d={nestB}
        stroke={HALO_BLUE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M37 66C45 73 58 72 66 65"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="52" r="7" stroke={HALO_BLUE} strokeWidth="1.1" />
      <circle cx="48" cy="52" r="2.5" fill={ICE_WHITE} />
      <circle cx="24" cy="52" r="2.8" fill={ICE_WHITE} stroke={ELECTRIC_BLUE} />
      <circle cx="76" cy="61" r="2.8" fill={HALO_BLUE} />
    </svg>
  );
}

function Orbital_PrismAnchor({ size = 96 }: OrbitalProps) {
  const anchor = "M48 14L68 43L48 58L28 43L48 14ZM48 58V82";
  return (
    <svg {...svgProps(size)}>
      <path
        d={anchor}
        stroke={VIOLET}
        strokeWidth="5"
        opacity="0.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={anchor}
        stroke={VIOLET}
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M28 43H68M38 73C42 80 54 80 58 73"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="43" r="5" stroke={SOFT_NEON} strokeWidth="1.1" />
      <circle cx="48" cy="43" r="2.2" fill={ICE_WHITE} />
      <circle cx="48" cy="82" r="2.8" fill={VIOLET} />
    </svg>
  );
}

function Orbital_QuietFlare({ size = 96 }: OrbitalProps) {
  const flare = "M48 16C52 34 62 44 80 48C62 52 52 62 48 80C44 62 34 52 16 48C34 44 44 34 48 16Z";
  return (
    <svg {...svgProps(size)}>
      <path d={flare} stroke={ECHO_MAGENTA} strokeWidth="5" opacity="0.36" />
      <path
        d={flare}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="48" r="18" stroke={SOFT_NEON} strokeWidth="1" />
      <path
        d="M48 30V66M30 48H66"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="4.5" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_MemoryGate({ size = 96 }: OrbitalProps) {
  const gate = "M26 78V42C26 25 36 16 48 16C60 16 70 25 70 42V78";
  return (
    <svg {...svgProps(size)}>
      <path d={gate} stroke={ECHO_MAGENTA} strokeWidth="5" opacity="0.38" />
      <path
        d={gate}
        stroke={ECHO_MAGENTA}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M37 78V44C37 36 41 31 48 31C55 31 59 36 59 44V78"
        stroke={SOFT_NEON}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M20 78H76M48 16V8"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="49" r="6" stroke={SOFT_NEON} strokeWidth="1.1" />
      <circle cx="48" cy="49" r="2.3" fill={ICE_WHITE} />
      <circle cx="48" cy="8" r="2.4" fill={ICE_WHITE} />
    </svg>
  );
}

function Orbital_EchoCrescent({ size = 96 }: OrbitalProps) {
  const crescent = "M62 18C46 22 34 35 34 50C34 65 46 77 62 80C52 67 52 31 62 18Z";
  return (
    <svg {...svgProps(size)}>
      <path d={crescent} stroke={HALO_BLUE} strokeWidth="5" opacity="0.4" />
      <path
        d={crescent}
        stroke={HALO_BLUE}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M26 33C17 42 17 58 26 67M72 33C81 42 81 58 72 67"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="50" r="6" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="50" r="2.4" fill={ICE_WHITE} />
      <circle cx="62" cy="18" r="2.6" fill={HALO_BLUE} />
      <circle cx="62" cy="80" r="2.6" fill={HALO_BLUE} />
    </svg>
  );
}

function Orbital_LuminousSpine({ size = 96 }: OrbitalProps) {
  const spine = "M48 12V84";
  return (
    <svg {...svgProps(size)}>
      <path
        d={spine}
        stroke={ELECTRIC_BLUE}
        strokeWidth="5"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d={spine}
        stroke={ELECTRIC_BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M48 24L63 34L48 44L33 34L48 24ZM48 52L63 62L48 72L33 62L48 52Z"
        stroke={HALO_BLUE}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M33 34H24M63 34H72M33 62H24M63 62H72"
        stroke={MOONLIT}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="48" cy="12" r="2.5" fill={ICE_WHITE} />
      <circle cx="48" cy="48" r="4.5" stroke={MOONLIT} strokeWidth="1.1" />
      <circle cx="48" cy="48" r="2" fill={ICE_WHITE} />
      <circle cx="48" cy="84" r="2.5" fill={HALO_BLUE} />
    </svg>
  );
}
export const orbitals: Record<
  OrbitalVariant,
  (size: number) => JSX.Element
> = {
  axiomRing: (size) => <Orbital_AxiomRing size={size} />,
  vectorLattice: (size) => <Orbital_VectorLattice size={size} />,
  signalBridge: (size) => <Orbital_SignalBridge size={size} />,
  prismMirror: (size) => <Orbital_PrismMirror size={size} />,
  innerTide: (size) => <Orbital_InnerTide size={size} />,
  quietAxis: (size) => <Orbital_QuietAxis size={size} />,
  chorusCore: (size) => <Orbital_ChorusCore size={size} />,
  memoryComet: (size) => <Orbital_MemoryComet size={size} />,
  synthesisStar: (size) => <Orbital_SynthesisStar size={size} />,
  haloGate: (size) => <Orbital_HaloGate size={size} />,
  focusDial: (size) => <Orbital_FocusDial size={size} />,
  threadBeacon: (size) => <Orbital_ThreadBeacon size={size} />,
    lunarVault: (size) => <Orbital_LunarVault size={size} />,
    signalBloom: (size) => <Orbital_SignalBloom size={size} />,
    echoSpiral: (size) => <Orbital_EchoSpiral size={size} />,
    thresholdEye: (size) => <Orbital_ThresholdEye size={size} />,
    starThread: (size) => <Orbital_StarThread size={size} />,
    violetCompass: (size) => <Orbital_VioletCompass size={size} />,
    mirrorOrbit: (size) => <Orbital_MirrorOrbit size={size} />,
    pulseCrown: (size) => <Orbital_PulseCrown size={size} />,
    softCircuit: (size) => <Orbital_SoftCircuit size={size} />,
    inkConstellation: (size) => <Orbital_InkConstellation size={size} />,
    auraLens: (size) => <Orbital_AuraLens size={size} />,
    celestialWeave: (size) => <Orbital_CelestialWeave size={size} />,
    signalNest: (size) => <Orbital_SignalNest size={size} />,
    prismAnchor: (size) => <Orbital_PrismAnchor size={size} />,
    quietFlare: (size) => <Orbital_QuietFlare size={size} />,
    memoryGate: (size) => <Orbital_MemoryGate size={size} />,
    echoCrescent: (size) => <Orbital_EchoCrescent size={size} />,
    luminousSpine: (size) => <Orbital_LuminousSpine size={size} />,
};
