/**
 * Sample surveyed site plan, drawn as inline SVG so it stays crisp at any size
 * and inherits the page's ink colour. Swap for a real survey drawing by
 * replacing the `sitePlan` visual in data/images.ts with a photograph.
 */
export function SitePlan({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label="Sample surveyed site plan showing plot boundaries, setback line, proposed building footprint and a north arrow"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <g strokeOpacity={0.12} strokeWidth={0.6}>
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={40 + i * 48} y1={20} x2={40 + i * 48} y2={580} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1={20} y1={40 + i * 48} x2={780} y2={40 + i * 48} />
        ))}
      </g>

      {/* Road */}
      <g>
        <line x1={40} y1={528} x2={760} y2={528} strokeWidth={1.6} />
        <g strokeOpacity={0.4} strokeWidth={0.8}>
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={80 + i * 56} y1={540} x2={104 + i * 56} y2={560} />
          ))}
        </g>
        <text x={48} y={574} fontSize={11} letterSpacing={2.4} fill="currentColor" stroke="none">
          ROAD
        </text>
      </g>

      {/* Plot boundary */}
      <rect x={90} y={88} width={620} height={440} strokeWidth={2} />

      {/* Corner ticks */}
      <g strokeWidth={1.6}>
        <path d="M90 118h30M90 88v30M710 88v30M680 88h30M90 498v30M90 528h30M710 528h-30M710 498v30" />
      </g>

      {/* Setback / buildable envelope */}
      <rect
        x={148}
        y={146}
        width={504}
        height={324}
        strokeDasharray="7 6"
        strokeOpacity={0.5}
      />

      {/* Proposed footprint */}
      <g>
        <rect x={232} y={224} width={336} height={160} fill="currentColor" fillOpacity={0.05} strokeWidth={1.4} />
        <line x1={400} y1={224} x2={400} y2={384} strokeOpacity={0.55} />
        <line x1={232} y1={304} x2={568} y2={304} strokeOpacity={0.35} strokeDasharray="4 5" />
        <text
          x={244}
          y={246}
          fontSize={12}
          letterSpacing={2.2}
          fill="currentColor"
          stroke="none"
          strokeOpacity={1}
        >
          PROPOSED FOOTPRINT
        </text>
      </g>

      {/* Setback dimensions */}
      <g strokeOpacity={0.45} strokeWidth={0.9}>
        <line x1={90} y1={88} x2={148} y2={88} />
        <line x1={90} y1={80} x2={90} y2={96} />
        <line x1={148} y1={80} x2={148} y2={96} />
        <line x1={710} y1={528} x2={648} y2={528} />
        <line x1={710} y1={520} x2={710} y2={536} />
        <line x1={648} y1={520} x2={648} y2={536} />
      </g>
      <text
        x={116}
        y={72}
        fontSize={10}
        letterSpacing={1.4}
        fill="currentColor"
        stroke="none"
      >
        3.0
      </text>
      <text
        x={660}
        y={552}
        fontSize={10}
        letterSpacing={1.4}
        fill="currentColor"
        stroke="none"
      >
        4.5
      </text>

      {/* Overall dimensions */}
      <g>
        <line x1={90} y1={36} x2={710} y2={36} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={90} y1={28} x2={90} y2={44} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={710} y1={28} x2={710} y2={44} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={430} y1={36} x2={430} y2={24} strokeWidth={0.6} strokeOpacity={0.35} />
        <text
          x={400}
          y={22}
          fontSize={12}
          letterSpacing={2}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
        >
          36.00 m
        </text>

        <line x1={52} y1={88} x2={52} y2={528} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={44} y1={88} x2={60} y2={88} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={44} y1={528} x2={60} y2={528} strokeWidth={0.9} strokeOpacity={0.5} />
        <text
          x={30}
          y={320}
          fontSize={12}
          letterSpacing={2}
          fill="currentColor"
          stroke="none"
          transform="rotate(-90 30 320)"
          textAnchor="middle"
        >
          24.00 m
        </text>
      </g>

      {/* Grid references */}
      <g fontSize={10} letterSpacing={1.2} fill="currentColor" stroke="none" strokeOpacity={1}>
        <circle cx={90} cy={22} r={11} strokeOpacity={0.5} />
        <text x={90} y={26} textAnchor="middle">
          A
        </text>
        <circle cx={710} cy={22} r={11} strokeOpacity={0.5} />
        <text x={710} y={26} textAnchor="middle">
          B
        </text>
        <circle cx={22} cy={88} r={11} strokeOpacity={0.5} />
        <text x={22} y={92} textAnchor="middle">
          1
        </text>
        <circle cx={22} cy={528} r={11} strokeOpacity={0.5} />
        <text x={22} y={532} textAnchor="middle">
          2
        </text>
      </g>

      {/* North arrow */}
      <g transform="translate(742 128)">
        <circle r={26} strokeOpacity={0.45} />
        <path d="M0 -18 L7 8 L0 2 L-7 8 Z" fill="currentColor" fillOpacity={0.8} stroke="none" />
        <text
          y={-30}
          fontSize={11}
          letterSpacing={1.6}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
        >
          N
        </text>
      </g>

      <text
        x={90}
        y={596}
        fontSize={10}
        letterSpacing={2.6}
        fill="currentColor"
        stroke="none"
        strokeOpacity={0.6}
      >
        SAMPLE SITE PLAN · NOT A SURVEY
      </text>
    </svg>
  );
}
