"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ── types ─────────────────────────────────────────────── */

export type LogoPhase =
  | "drawing"   // initial flyIn sequence
  | "idle"      // drawing done, waiting
  | "loop";     // ticker appears

interface LogoHAProps {
  size?: number;
  className?: string;
  phase?: LogoPhase;
  hideText?: boolean;          // fade out text + bottom nodes (e.g. when sliding)
  desktopSlide?: boolean;      // true = lg+ (nodes flung left), false = mobile (nodes fall down)
  mobileShiftUp?: boolean;     // mobile: logo mark (1-10) lifts up, text/balls stay
  onPhaseComplete?: (phase: LogoPhase) => void;
}

/* ── animation helpers ─────────────────────────────────── */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const flyIn = (delay: number, x: number, y: number): Variants => ({
  hidden: { x, y, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.7, ease: EASE_OUT },
  },
});

/* ── (physics helpers removed — simplified animation) ──── */

/* ── component ─────────────────────────────────────────── */

export default function LogoHA({
  size,
  className = "",
  phase = "drawing",
  hideText = false,
  desktopSlide = false,
  mobileShiftUp = false,
  onPhaseComplete,
}: LogoHAProps) {
  const prefersReducedMotion = useReducedMotion();

  const sizeProps = size
    ? { width: size, height: size }
    : { width: "100%", height: "100%" };

  if (prefersReducedMotion) {
    return (
      <svg
        {...sizeProps}
        viewBox="0 140 1000 860"
        className={className}
        role="img"
        aria-label="Hiram Acevedo monogram"
        style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }}
      >
        <StaticLogoClean />
      </svg>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.svg
        {...sizeProps}
        viewBox="0 140 1000 860"
        className={className}
        initial="hidden"
        animate="visible"
        role="img"
        aria-label="Hiram Acevedo monogram"
        style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, overflow: "visible" }}
      >
        {/* ── LOGO MARK (1-10) ── lifts up independently on mobile ── */}
        <motion.g
          animate={{ y: mobileShiftUp ? -350 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* 1 ─ Frame (outer border rectangle) */}
          <motion.g variants={flyIn(0.0, 0, -150)}>
            <g transform="matrix(1.719678,0,0,2.212168,-111.887241,-201.882752)">
              <rect x="219" y="168" width="274" height="274" fill="var(--logo-frame-fill)" />
              <path
                d="M493,168L493,442L219,442L219,168L493,168ZM491.546,169.13L220.454,169.13L220.454,440.87L491.546,440.87L491.546,169.13Z"
                fill="var(--logo-frame-border)"
              />
            </g>
          </motion.g>

          {/* 2 ─ Accent triangle */}
          <motion.g variants={flyIn(0.08, 0, 350)}>
            <g transform="matrix(-1.704792,-0.540121,0.304807,-0.62556,1025.679261,1211.351569)">
              <path d="M490,574L404,369L319,642L490,574Z" fill="var(--logo-accent-swap)" />
            </g>
          </motion.g>

          {/* 3 ─ H left vertical */}
          <motion.g variants={flyIn(0.15, -400, 0)}>
            <g transform="matrix(1.283057,0,0,1.983604,-129.7073,-521.300152)">
              <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
            </g>
          </motion.g>

          {/* 4 ─ H right / A upper vertical */}
          <motion.g variants={flyIn(0.25, -150, -350)}>
            <g transform="matrix(1.205551,0,0,1.461173,25.157384,-401.819575)">
              <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
            </g>
          </motion.g>

          {/* 5 ─ A diagonal stroke (with clip-path cutout) */}
          <motion.g variants={flyIn(0.35, 350, 200)}>
            <g transform="matrix(0.975225,-0.569534,0.345962,0.592399,-18.046918,478.461077)">
              <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
              <clipPath id="logoha-clip1">
                <rect x="335" y="364" width="50" height="271" />
              </clipPath>
              <g clipPath="url(#logoha-clip1)">
                <g transform="matrix(0.235847,-0.815171,0.202185,0.223378,301.657441,904.516094)">
                  <path d="M490,574L404,369L319,642L490,574Z" fill="var(--logo-frame-fill)" />
                </g>
              </g>
            </g>
          </motion.g>

          {/* 6 ─ Horizontal bar (right side of A) */}
          <motion.g variants={flyIn(0.40, 450, 0)}>
            <g transform="matrix(1.029514,0,0,0.889765,306.885103,24.355545)">
              <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
            </g>
          </motion.g>

          {/* 7 ─ CONNECTOR HORIZONTAL BAR */}
          <motion.g variants={flyIn(0.45, -350, 80)}>
            <g transform="matrix(0,-1.141206,1.177967,0,-121.491575,912.342963)">
              <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
            </g>
          </motion.g>

          {/* 8 ─ Quarter circle arc */}
          <motion.g variants={flyIn(0.55, 350, -250)}>
            <g transform="matrix(-1.4391,-1.4391,1.4391,-1.4391,494.478267,1889.140205)">
              <path
                d="M426.645,571.355L444.322,553.678C449.011,558.366 455.37,561 462,561C475.798,561 487,549.798 487,536C487,529.37 484.366,523.011 479.678,518.322L497.355,500.645C506.732,510.021 512,522.739 512,536C512,563.596 489.596,586 462,586C448.739,586 436.021,580.732 426.645,571.355Z"
                fill="var(--ink)"
              />
            </g>
          </motion.g>

          {/* 9 ─ Node large (lower-left area) */}
          <motion.g variants={flyIn(0.65, -250, 350)}>
            <g transform="matrix(-1.564239,1.564239,-1.564239,-1.564239,383.094594,741.411909)">
              <circle cx="0" cy="0" r="4.95" fill="var(--logo-accent-swap)" />
              <path
                d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-3.82C-2.108,-3.82 -3.82,-2.108 -3.82,0C-3.82,2.108 -2.108,3.82 0,3.82C2.108,3.82 3.82,2.108 3.82,0C3.82,-2.108 2.108,-3.82 0,-3.82Z"
                fill="var(--ink)"
              />
            </g>
          </motion.g>

          {/* 10 ─ Node large (upper-right area) */}
          <motion.g variants={flyIn(0.70, 350, -250)}>
            <g transform="matrix(-1.564239,1.564239,-1.564239,-1.564239,597.883766,444.303585)">
              <circle cx="0" cy="0" r="4.95" fill="var(--logo-accent-swap)" />
              <path
                d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-3.82C-2.108,-3.82 -3.82,-2.108 -3.82,0C-3.82,2.108 -2.108,3.82 0,3.82C2.108,3.82 3.82,2.108 3.82,0C3.82,-2.108 2.108,-3.82 0,-3.82Z"
                fill="var(--ink)"
              />
            </g>
          </motion.g>

        </motion.g>{/* end LOGO MARK wrapper (1-10) */}

        {/* 11 ─ TEXT "Hiram Acevedo" — stays in place while rect lifts
             Desktop: fast opacity hide for clean swap to floating H1
             Mobile: text stays put, then blurs out when mobileDetach fires */}
        <motion.g
          animate={hideText
            ? desktopSlide
              ? { opacity: 0 }
              : { opacity: 0, filter: "blur(10px)" }
            : { opacity: 1, filter: "blur(0px)" }
          }
          transition={desktopSlide
            ? { duration: 0.12 }
            : { duration: 0.25, ease: "easeIn" }
          }
        >
          <motion.g variants={flyIn(0.85, 0, 250)}>
            <g transform="matrix(3.359542,0,0,3.359542,-1138,-1455)">
              <g transform="matrix(1,0,0,0.98,0,14.004665)">
                <text
                  x="375.256"
                  y="700.233"
                  fontFamily="var(--font-logo)"
                  fontSize="35.286"
                  fill="var(--ink)"
                >
                  H
                  <tspan
                    x="401.862 412.201 425.609 441.1 467.388 475.433 498.157 514.071 530.726 545.758 562.413 580.691"
                    y="700.233 700.233 700.233 700.233 700.233 700.233 700.233 700.233 700.233 700.233 700.233 700.233"
                  >
                    iram Acevedo
                  </tspan>
                </text>
              </g>
            </g>
          </motion.g>
        </motion.g>

        {/* 12–15 ─ SMALL NODES — fall with gravity when text detaches */}

        {/* 12 ─ Small node (bottom-left corner) */}
        <motion.g
          variants={flyIn(0.90, -350, 250)}
          animate={hideText
            ? desktopSlide
              ? { x: -280, y: 40, opacity: 0 }
              : { y: 1200, x: -60, opacity: 0 }
            : undefined}
          transition={hideText
            ? desktopSlide
              ? { duration: 0.7, ease: [0.55, 0, 1, 0.45] }
              : { duration: 0.45, ease: [0.4, 0, 1, 0.5] }
            : undefined}
        >
          <g transform="matrix(-0.766376,0.766376,-0.766376,-0.766376,231.287558,820.666351)">
            <circle cx="0" cy="0" r="4.95" fill="var(--accent)" />
            <path
              d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-4.373C-2.414,-4.373 -4.373,-2.414 -4.373,0C-4.373,2.414 -2.414,4.373 0,4.373C2.414,4.373 4.373,2.414 4.373,0C4.373,-2.414 2.414,-4.373 0,-4.373Z"
              fill="var(--ink)"
            />
          </g>
        </motion.g>

        {/* 13 ─ Small node (bottom-left) */}
        <motion.g
          variants={flyIn(0.93, -300, 250)}
          animate={hideText
            ? desktopSlide
              ? { x: -320, y: 60, opacity: 0 }
              : { y: 1400, x: 40, opacity: 0 }
            : undefined}
          transition={hideText
            ? desktopSlide
              ? { duration: 0.75, ease: [0.55, 0, 1, 0.45], delay: 0.04 }
              : { duration: 0.5, ease: [0.4, 0, 1, 0.5], delay: 0.06 }
            : undefined}
        >
          <g transform="matrix(-0.99483,0.99483,-0.99483,-0.99483,286.739786,852.065031)">
            <circle cx="0" cy="0" r="4.95" fill="var(--accent)" />
            <path
              d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-4.506C-2.487,-4.505 -4.506,-2.487 -4.506,0C-4.506,2.487 -2.487,4.506 0,4.506C2.487,4.506 4.506,2.487 4.506,0C4.506,-2.487 2.487,-4.505 0,-4.506Z"
              fill="var(--ink)"
            />
          </g>
        </motion.g>

        {/* 14 ─ Small node (bottom-center-left) */}
        <motion.g
          variants={flyIn(0.96, -250, 250)}
          animate={hideText
            ? desktopSlide
              ? { x: -250, y: 50, opacity: 0 }
              : { y: 1100, x: -30, opacity: 0 }
            : undefined}
          transition={hideText
            ? desktopSlide
              ? { duration: 0.7, ease: [0.55, 0, 1, 0.45], delay: 0.08 }
              : { duration: 0.4, ease: [0.4, 0, 1, 0.5], delay: 0.1 }
            : undefined}
        >
          <g transform="matrix(-0.99483,0.99483,-0.99483,-0.99483,306.379506,856.631701)">
            <circle cx="0" cy="0" r="4.95" fill="var(--accent)" />
            <path
              d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-4.506C-2.487,-4.505 -4.506,-2.487 -4.506,0C-4.506,2.487 -2.487,4.506 0,4.506C2.487,4.506 4.506,2.487 4.506,0C4.506,-2.487 2.487,-4.505 0,-4.506Z"
              fill="var(--ink)"
            />
          </g>
        </motion.g>

        {/* 15 ─ Small node (bottom-right) */}
        <motion.g
          variants={flyIn(0.99, 250, 250)}
          animate={hideText
            ? desktopSlide
              ? { x: -350, y: 30, opacity: 0 }
              : { y: 1300, x: 70, opacity: 0 }
            : undefined}
          transition={hideText
            ? desktopSlide
              ? { duration: 0.8, ease: [0.55, 0, 1, 0.45], delay: 0.02 }
              : { duration: 0.5, ease: [0.4, 0, 1, 0.5], delay: 0.03 }
            : undefined}
        >
          <g transform="matrix(-0.99483,0.99483,-0.99483,-0.99483,581.808977,857.068069)">
            <circle cx="0" cy="0" r="4.95" fill="var(--accent)" />
            <path
              d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-4.506C-2.487,-4.505 -4.506,-2.487 -4.506,0C-4.506,2.487 -2.487,4.506 0,4.506C2.487,4.506 4.506,2.487 4.506,0C4.506,-2.487 2.487,-4.505 0,-4.506Z"
              fill="var(--ink)"
            />
          </g>
        </motion.g>
      </motion.svg>

    </div>
  );
}

/* ── static fallback (reduced motion) — clean, no text ── */

function StaticLogoClean() {
  return (
    <>
      {/* Frame */}
      <g transform="matrix(1.719678,0,0,2.212168,-111.887241,-201.882752)">
        <rect x="219" y="168" width="274" height="274" fill="var(--logo-frame-fill)" />
        <path
          d="M493,168L493,442L219,442L219,168L493,168ZM491.546,169.13L220.454,169.13L220.454,440.87L491.546,440.87L491.546,169.13Z"
          fill="var(--logo-frame-border)"
        />
      </g>

      {/* Accent triangle */}
      <g transform="matrix(-1.704792,-0.540121,0.304807,-0.62556,1025.679261,1211.351569)">
        <path d="M490,574L404,369L319,642L490,574Z" fill="var(--logo-accent-swap)" />
      </g>

      {/* H left vertical */}
      <g transform="matrix(1.283057,0,0,1.983604,-129.7073,-521.300152)">
        <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
      </g>

      {/* H right / A upper vertical */}
      <g transform="matrix(1.205551,0,0,1.461173,25.157384,-401.819575)">
        <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
      </g>

      {/* A diagonal with clip */}
      <g transform="matrix(0.975225,-0.569534,0.345962,0.592399,-18.046918,478.461077)">
        <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
        <clipPath id="logoha-clip1-static">
          <rect x="335" y="364" width="50" height="271" />
        </clipPath>
        <g clipPath="url(#logoha-clip1-static)">
          <g transform="matrix(0.235847,-0.815171,0.202185,0.223378,301.657441,904.516094)">
            <path d="M490,574L404,369L319,642L490,574Z" fill="var(--logo-frame-fill)" />
          </g>
        </g>
      </g>

      {/* Bar right */}
      <g transform="matrix(1.029514,0,0,0.889765,306.885103,24.355545)">
        <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
      </g>

      {/* Connector horizontal */}
      <g transform="matrix(0,-1.141206,1.177967,0,-121.491575,912.342963)">
        <rect x="335" y="364" width="50" height="271" fill="var(--ink)" />
      </g>

      {/* Quarter circle arc */}
      <g transform="matrix(-1.4391,-1.4391,1.4391,-1.4391,494.478267,1889.140205)">
        <path
          d="M426.645,571.355L444.322,553.678C449.011,558.366 455.37,561 462,561C475.798,561 487,549.798 487,536C487,529.37 484.366,523.011 479.678,518.322L497.355,500.645C506.732,510.021 512,522.739 512,536C512,563.596 489.596,586 462,586C448.739,586 436.021,580.732 426.645,571.355Z"
          fill="var(--ink)"
        />
      </g>

      {/* Node large 1 */}
      <g transform="matrix(-1.564239,1.564239,-1.564239,-1.564239,383.094594,741.411909)">
        <circle cx="0" cy="0" r="4.95" fill="var(--logo-accent-swap)" />
        <path
          d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-3.82C-2.108,-3.82 -3.82,-2.108 -3.82,0C-3.82,2.108 -2.108,3.82 0,3.82C2.108,3.82 3.82,2.108 3.82,0C3.82,-2.108 2.108,-3.82 0,-3.82Z"
          fill="var(--ink)"
        />
      </g>

      {/* Node large 2 */}
      <g transform="matrix(-1.564239,1.564239,-1.564239,-1.564239,597.883766,444.303585)">
        <circle cx="0" cy="0" r="4.95" fill="var(--logo-accent-swap)" />
        <path
          d="M0,-4.95C2.732,-4.95 4.95,-2.732 4.95,0C4.95,2.732 2.732,4.95 0,4.95C-2.732,4.95 -4.95,2.732 -4.95,0C-4.95,-2.732 -2.732,-4.95 0,-4.95ZM0,-3.82C-2.108,-3.82 -3.82,-2.108 -3.82,0C-3.82,2.108 -2.108,3.82 0,3.82C2.108,3.82 3.82,2.108 3.82,0C3.82,-2.108 2.108,-3.82 0,-3.82Z"
          fill="var(--ink)"
        />
      </g>
    </>
  );
}
