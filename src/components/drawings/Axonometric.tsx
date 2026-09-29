/**
 * Sample axonometric massing study — the kind of drawing used to test volume,
 * shade and sightlines before a 3D model exists.
 */

type Vec3 = [number, number, number];

const SCALE = 24;
const ORIGIN_X = 400;
const ORIGIN_Y = 210;

function project([x, y, z]: Vec3) {
  return `${(ORIGIN_X + (x - y) * 0.866 * SCALE).toFixed(1)},${(
    ORIGIN_Y +
    (x + y) * 0.5 * SCALE -
    z * SCALE
  ).toFixed(1)}`;
}

function faces(origin: Vec3, size: Vec3) {
  const [x, y, z] = origin;
  const [w, d, h] = size;
  return {
    top: `M ${project([x, y, z + h])} L ${project([x + w, y, z + h])} L ${project([x + w, y + d, z + h])} L ${project([x, y + d, z + h])} Z`,
    left: `M ${project([x, y, z])} L ${project([x, y + d, z])} L ${project([x, y + d, z + h])} L ${project([x, y, z + h])} Z`,
    front: `M ${project([x, y + d, z])} L ${project([x + w, y + d, z])} L ${project([x + w, y + d, z + h])} L ${project([x, y + d, z + h])} Z`,
  };
}

function Volume({
  origin,
  size,
  opacity = 1,
}: {
  origin: Vec3;
  size: Vec3;
  opacity?: number;
}) {
  const f = faces(origin, size);
  return (
    <g opacity={opacity}>
      <path d={f.top} fill="currentColor" fillOpacity={0.04} />
      <path d={f.left} fill="currentColor" fillOpacity={0.12} />
      <path d={f.front} fill="currentColor" fillOpacity={0.07} />
    </g>
  );
}

export function Axonometric({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 560"
      role="img"
      aria-label="Sample axonometric massing study of a single storey house with a tall bedroom volume and a shaded terrace"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinejoin="round"
    >
      <g strokeOpacity={0.1} strokeWidth={0.6}>
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 48} y1={20} x2={20 + i * 48} y2={540} />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1={20} y1={40 + i * 48} x2={780} y2={40 + i * 48} />
        ))}
      </g>

      {/* Ground plane */}
      <path
        d={`M ${project([0, 0, 0])} L ${project([10, 0, 0])} L ${project([10, 8, 0])} L ${project([0, 8, 0])} Z`}
        fill="currentColor"
        fillOpacity={0.015}
        strokeDasharray="6 6"
        strokeOpacity={0.45}
      />

      {/* Plinth */}
      <Volume origin={[0.4, 0.4, 0]} size={[9.2, 7.2, 0.18]} opacity={0.8} />

      {/* Living wing */}
      <Volume origin={[0.4, 0.4, 0.18]} size={[5.4, 7.2, 1.15]} />
      {/* Bedroom volume */}
      <Volume origin={[5.8, 0.4, 0.18]} size={[3.8, 3.6, 2.15]} />
      {/* Service volume */}
      <Volume origin={[5.8, 4.0, 0.18]} size={[3.8, 3.6, 1.35]} />
      {/* Terrace canopy */}
      <Volume origin={[0.9, 4.4, 1.62]} size={[4.4, 2.6, 0.1]} opacity={0.75} />

      {/* Glazing indication on the living wing */}
      <g strokeOpacity={0.5} strokeWidth={0.9}>
        <path
          d={`M ${project([1.2, 7.62, 0.5])} L ${project([5.0, 7.62, 0.5])}`}
        />
        <path
          d={`M ${project([1.2, 7.62, 1.0])} L ${project([5.0, 7.62, 1.0])}`}
        />
        <path
          d={`M ${project([0.42, 1.2, 0.5])} L ${project([0.42, 6.4, 0.5])}`}
        />
        <path
          d={`M ${project([0.42, 1.2, 1.0])} L ${project([0.42, 6.4, 1.0])}`}
        />
      </g>

      {/* Height datum */}
      <g strokeOpacity={0.4} strokeWidth={0.8}>
        <line x1={690} y1={200} x2={690} y2={252} />
        <line x1={684} y1={200} x2={696} y2={200} />
        <line x1={684} y1={252} x2={696} y2={252} />
        <text x={704} y={230} fontSize={10} letterSpacing={1.4} fill="currentColor" stroke="none">
          +3.20
        </text>
      </g>

      <text
        x={40}
        y={528}
        fontSize={10}
        letterSpacing={2.6}
        fill="currentColor"
        stroke="none"
        strokeOpacity={0.6}
      >
        SAMPLE AXONOMETRIC · MASSING STUDY
      </text>
    </svg>
  );
}
