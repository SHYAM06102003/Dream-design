/**
 * Sample 2D floor plan, drawn as inline SVG.
 * Replace with a real drawing (or a photograph of one) via data/projects.ts.
 */
export function FloorPlan({ className }: { className?: string }) {
  const label = {
    fontSize: 12,
    letterSpacing: 2.2,
    fill: "currentColor",
    stroke: "none",
  } as const;

  const small = {
    fontSize: 9.5,
    letterSpacing: 1.6,
    fill: "currentColor",
    stroke: "none",
    strokeOpacity: 0.55,
  } as const;

  return (
    <svg
      viewBox="0 0 900 640"
      role="img"
      aria-label="Sample house floor plan showing a living and dining area, kitchen, store, central hall, two bedrooms and a bathroom, with overall dimensions and a north arrow"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <g strokeOpacity={0.1} strokeWidth={0.6}>
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 48} y1={20} x2={20 + i * 48} y2={620} />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`h${i}`} x1={20} y1={40 + i * 48} x2={880} y2={40 + i * 48} />
        ))}
      </g>

      {/* Overall dimensions */}
      <g>
        <line x1={120} y1={70} x2={780} y2={70} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={120} y1={60} x2={120} y2={80} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={780} y1={60} x2={780} y2={80} strokeWidth={0.9} strokeOpacity={0.5} />
        <text x={450} y={52} fontSize={12} letterSpacing={2} textAnchor="middle" fill="currentColor" stroke="none">
          18.00 m
        </text>

        <line x1={84} y1={110} x2={84} y2={540} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={74} y1={110} x2={94} y2={110} strokeWidth={0.9} strokeOpacity={0.5} />
        <line x1={74} y1={540} x2={94} y2={540} strokeWidth={0.9} strokeOpacity={0.5} />
        <text
          x={56}
          y={325}
          fontSize={12}
          letterSpacing={2}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          transform="rotate(-90 56 325)"
        >
          12.00 m
        </text>
      </g>

      {/* Outer walls (double line reads as wall thickness) */}
      <rect x={120} y={110} width={660} height={430} fill="currentColor" fillOpacity={0.03} strokeWidth={2.4} />
      <rect x={132} y={122} width={636} height={406} strokeWidth={0.9} strokeOpacity={0.55} />

      {/* Internal partitions */}
      <g strokeWidth={1.8}>
        <line x1={470} y1={122} x2={470} y2={330} />
        <line x1={470} y1={262} x2={768} y2={262} />
        <line x1={132} y1={330} x2={768} y2={330} />
        <line x1={132} y1={382} x2={768} y2={382} strokeDasharray="0 0" />
        <line x1={350} y1={382} x2={350} y2={528} />
        <line x1={560} y1={382} x2={560} y2={528} />
      </g>

      {/* Hall divider ticks (door openings) */}
      <g strokeWidth={0.8} strokeOpacity={0.9}>
        <line x1={196} y1={330} x2={196} y2={382} />
        <line x1={196} y1={382} x2={252} y2={382} strokeOpacity={0.3} />
        <line x1={430} y1={330} x2={430} y2={382} />
        <line x1={430} y1={382} x2={486} y2={382} strokeOpacity={0.3} />
        <line x1={634} y1={330} x2={634} y2={382} />
        <line x1={634} y1={382} x2={690} y2={382} strokeOpacity={0.3} />
      </g>

      {/* Windows on the outer walls */}
      <g strokeWidth={1.1}>
        <line x1={180} y1={110} x2={420} y2={110} strokeWidth={3.2} strokeOpacity={0.35} />
        <line x1={500} y1={110} x2={740} y2={110} strokeWidth={3.2} strokeOpacity={0.35} />
        <line x1={180} y1={540} x2={320} y2={540} strokeWidth={3.2} strokeOpacity={0.35} />
        <line x1={380} y1={540} x2={530} y2={540} strokeWidth={3.2} strokeOpacity={0.35} />
        <line x1={120} y1={170} x2={120} y2={290} strokeWidth={3.2} strokeOpacity={0.35} />
        <line x1={780} y1={420} x2={780} y2={500} strokeWidth={3.2} strokeOpacity={0.35} />
      </g>

      {/* Room labels */}
      <text x={152} y={196} {...label}>
        LIVING / DINING
      </text>
      <text x={152} y={214} {...small}>
        6.10 × 4.20 m
      </text>

      <text x={492} y={190} {...label}>
        KITCHEN
      </text>
      <text x={492} y={208} {...small}>
        3.40 × 2.60 m
      </text>

      <text x={492} y={310} {...label}>
        STORE
      </text>

      <text x={430} y={362} {...small} textAnchor="middle">
        HALL
      </text>

      <text x={152} y={432} {...label}>
        BEDROOM 01
      </text>
      <text x={152} y={450} {...small}>
        4.10 × 3.20 m
      </text>

      <text x={382} y={432} {...label}>
        BEDROOM 02
      </text>
      <text x={382} y={450} {...small}>
        3.90 × 3.20 m
      </text>

      <text x={592} y={432} {...label}>
        BATH
      </text>
      <text x={592} y={450} {...small}>
        3.10 × 3.20 m
      </text>

      {/* Verandah note */}
      <g>
        <line x1={132} y1={556} x2={768} y2={556} strokeWidth={0.9} strokeDasharray="6 5" strokeOpacity={0.45} />
        <text x={450} y={576} fontSize={10} letterSpacing={2.4} textAnchor="middle" fill="currentColor" stroke="none" strokeOpacity={0.6}>
          COVERED VERANDAH · 1.80 m
        </text>
      </g>

      {/* North arrow */}
      <g transform="translate(846 148)">
        <circle r={26} strokeOpacity={0.45} />
        <path d="M0 -18 L7 8 L0 2 L-7 8 Z" fill="currentColor" fillOpacity={0.8} stroke="none" />
        <text y={-30} fontSize={11} letterSpacing={1.6} textAnchor="middle" fill="currentColor" stroke="none">
          N
        </text>
      </g>

      {/* Scale bar */}
      <g transform="translate(700 596)">
        <line x1={0} y1={0} x2={120} y2={0} strokeWidth={1.2} />
        <line x1={0} y1={-5} x2={0} y2={5} strokeWidth={1.2} />
        <line x1={60} y1={-4} x2={60} y2={4} strokeWidth={1} strokeOpacity={0.6} />
        <line x1={120} y1={-5} x2={120} y2={5} strokeWidth={1.2} />
        <text x={60} y={20} fontSize={9.5} letterSpacing={1.4} textAnchor="middle" fill="currentColor" stroke="none" strokeOpacity={0.6}>
          0 — 5 m
        </text>
      </g>

      <text x={120} y={624} fontSize={10} letterSpacing={2.6} fill="currentColor" stroke="none" strokeOpacity={0.6}>
        SAMPLE FLOOR PLAN · GROUND FLOOR · NOT FOR CONSTRUCTION
      </text>
    </svg>
  );
}
