import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Line drawings for the services that have no photograph yet, drawn in the
 * style of a survey sheet. Each one is keyed by the service `id` in
 * `src/data/offerings.ts`. Figures on the drawings are illustrative only.
 */

const P = "var(--color-primary)";
const M = "var(--color-secondary)";
const A = "var(--color-accent)";
const S = "var(--color-accent-soft)";
const BG = "var(--color-surface)";

type Ids = { hatch: string; clip: string };

/** Small drawing label with a halo, so it stays readable over linework. */
function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 10,
  bold = false,
  fill = M,
  rotate,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  bold?: boolean;
  fill?: string;
  rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={bold ? 600 : 500}
      fill={fill}
      stroke={BG}
      strokeWidth={3}
      strokeLinejoin="round"
      style={{ paintOrder: "stroke" }}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

function Stone({ x, y }: { x: number; y: number }) {
  return <rect x={x - 4} y={y - 4} width={8} height={8} fill={P} />;
}

const drawings: Record<string, (ids: Ids) => ReactNode> = {
  "revenue-survey": () => (
    <>
      <polygon
        points="70,62 250,40 332,112 300,200 108,210"
        fill={S}
        fillOpacity={0.55}
        stroke={P}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line x1={163} y1={51} x2={204} y2={205} stroke={A} strokeWidth={2} strokeDasharray="7 5" />
      <circle cx={163} cy={51} r={4} fill={A} />
      <circle cx={204} cy={205} r={4} fill={A} />
      {[
        [70, 62],
        [250, 40],
        [332, 112],
        [300, 200],
        [108, 210],
      ].map(([x, y]) => (
        <Stone key={`${x}-${y}`} x={x} y={y} />
      ))}
      <Label x={122} y={138} size={13} bold fill={P}>
        Share A
      </Label>
      <Label x={258} y={132} size={13} bold fill={P}>
        Share B
      </Label>
      <Label x={158} y={38} rotate={-7}>
        56.4 m
      </Label>
      <Label x={306} y={68} anchor="start">
        34.8 m
      </Label>
      <Label x={328} y={162} anchor="start">
        28.6 m
      </Label>
      <Label x={204} y={228}>
        58.8 m
      </Label>
      <Label x={76} y={140} anchor="end">
        45.1 m
      </Label>
      <line x1={366} y1={74} x2={366} y2={40} stroke={P} strokeWidth={1.5} />
      <polygon points="366,30 360,44 372,44" fill={P} />
      <Label x={366} y={90} bold fill={P}>
        N
      </Label>
    </>
  ),

  "layout-marking": () => (
    <>
      <rect x={40} y={28} width={320} height={194} fill={S} fillOpacity={0.35} />
      <rect x={232} y={140} width={128} height={82} fill={A} fillOpacity={0.14} />
      <rect x={40} y={110} width={320} height={30} fill={BG} />
      <line x1={40} y1={125} x2={360} y2={125} stroke={A} strokeWidth={1} strokeDasharray="10 8" />
      <g stroke={P} strokeWidth={1.2}>
        <line x1={40} y1={110} x2={360} y2={110} />
        <line x1={40} y1={140} x2={360} y2={140} />
        {[104, 168, 232, 296].map((x) => (
          <line key={`t${x}`} x1={x} y1={28} x2={x} y2={110} />
        ))}
        {[104, 168, 232].map((x) => (
          <line key={`b${x}`} x1={x} y1={140} x2={x} y2={222} />
        ))}
      </g>
      <rect x={40} y={28} width={320} height={194} fill="none" stroke={P} strokeWidth={2} />
      {[72, 136, 200, 264, 328].map((x, i) => (
        <Label key={x} x={x} y={74} size={13} bold fill={P}>
          {i + 1}
        </Label>
      ))}
      {[72, 136, 200].map((x, i) => (
        <Label key={x} x={x} y={186} size={13} bold fill={P}>
          {i + 6}
        </Label>
      ))}
      <g fill="none" stroke={A} strokeWidth={1.5}>
        <circle cx={262} cy={170} r={9} />
        <circle cx={300} cy={184} r={11} />
        <circle cx={336} cy={166} r={8} />
      </g>
      <Label x={296} y={214}>
        Open space
      </Label>
      <Label x={200} y={121} size={9}>
        Road
      </Label>
      {[104, 168, 232, 296].map((x) => (
        <circle key={`pt${x}`} cx={x} cy={110} r={3.2} fill={A} />
      ))}
      {[104, 168, 232].map((x) => (
        <circle key={`pb${x}`} cx={x} cy={140} r={3.2} fill={A} />
      ))}
    </>
  ),

  "contour-survey": () => (
    <>
      <g fill="none" stroke={P} strokeWidth={1.5}>
        <path d="M60,130 C60,60 150,30 230,45 C320,60 360,110 340,165 C320,220 200,235 130,215 C80,200 60,170 60,130Z" />
        <path d="M100,130 C100,85 160,65 225,75 C290,85 315,120 300,158 C285,195 205,205 150,192 C115,182 100,160 100,130Z" />
        <path d="M140,130 C140,105 175,95 220,102 C262,108 275,128 265,150 C255,172 205,178 172,168 C150,160 140,148 140,130Z" />
      </g>
      <path
        d="M178,132 C180,120 200,118 222,123 C240,128 242,140 234,148 C222,157 198,156 186,150 C179,145 177,140 178,132Z"
        fill={S}
        stroke={P}
        strokeWidth={1.5}
      />
      <Label x={60} y={134}>
        100
      </Label>
      <Label x={100} y={134}>
        101
      </Label>
      <Label x={140} y={134}>
        102
      </Label>
      <Label x={208} y={142} size={12} bold fill={P}>
        103
      </Label>
      <g stroke={M} strokeWidth={1.2}>
        {[
          [300, 52],
          [84, 62],
          [352, 206],
          [70, 214],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 5},${y} h10 M${x},${y - 5} v10`} />
        ))}
      </g>
      <line x1={240} y1={152} x2={312} y2={196} stroke={A} strokeWidth={2} />
      <polygon points="320,201 305.6,198.6 311,189.8" fill={A} />
      <Label x={316} y={220} fill={A}>
        Water flows
      </Label>
    </>
  ),

  "building-marking": () => (
    <>
      <rect x={50} y={30} width={300} height={190} fill="none" stroke={M} strokeWidth={1.5} strokeDasharray="6 4" />
      <rect x={120} y={75} width={170} height={105} fill={S} fillOpacity={0.55} stroke={P} strokeWidth={2} />
      <g stroke={M} strokeWidth={1} strokeDasharray="3 3">
        <line x1={120} y1={75} x2={290} y2={180} />
        <line x1={290} y1={75} x2={120} y2={180} />
      </g>
      <g stroke={A} strokeWidth={1} strokeDasharray="10 3 2 3">
        {[120, 205, 290].map((x) => (
          <line key={`v${x}`} x1={x} y1={52} x2={x} y2={200} />
        ))}
        {[75, 127.5, 180].map((y) => (
          <line key={`h${y}`} x1={96} y1={y} x2={314} y2={y} />
        ))}
      </g>
      {[120, 205, 290].map((x, i) => (
        <g key={`bt${x}`}>
          <circle cx={x} cy={46} r={8} fill={BG} stroke={A} strokeWidth={1.2} />
          <text x={x} y={49.5} textAnchor="middle" fontSize={9} fontWeight={600} fill={A}>
            {"ABC"[i]}
          </text>
        </g>
      ))}
      {[75, 127.5, 180].map((y, i) => (
        <g key={`bl${y}`}>
          <circle cx={90} cy={y} r={8} fill={BG} stroke={A} strokeWidth={1.2} />
          <text x={90} y={y + 3.5} textAnchor="middle" fontSize={9} fontWeight={600} fill={A}>
            {i + 1}
          </text>
        </g>
      ))}
      {[75, 127.5, 180].flatMap((y) =>
        [120, 205, 290].map((x) => (
          <rect key={`${x}-${y}`} x={x - 4.5} y={y - 4.5} width={9} height={9} fill={P} />
        )),
      )}
      <g stroke={P} strokeWidth={1}>
        <line x1={290} y1={150} x2={350} y2={150} />
        <line x1={350} y1={145} x2={350} y2={155} />
      </g>
      <Label x={322} y={144} size={9}>
        Setback
      </Label>
      <Label x={52} y={24} anchor="start" size={9}>
        Plot boundary
      </Label>
      <Label x={205} y={214} size={9}>
        Column centres
      </Label>
    </>
  ),

  "quantity-survey": ({ hatch }) => (
    <>
      <g stroke={M} strokeWidth={0.6} opacity={0.5}>
        {[98, 166, 234, 302].map((x) => (
          <line key={x} x1={x} y1={56} x2={x} y2={205} />
        ))}
      </g>
      <path d="M30,95 C100,60 150,80 200,125 L30,125 Z" fill={S} />
      <path d="M200,125 C250,170 310,175 370,150 L370,125 Z" fill={`url(#${hatch})`} />
      <line x1={30} y1={125} x2={370} y2={125} stroke={A} strokeWidth={2} strokeDasharray="8 5" />
      <path
        d="M30,95 C100,60 150,80 200,125 C250,170 310,175 370,150"
        fill="none"
        stroke={P}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Label x={96} y={110} size={13} bold fill={P}>
        Cut
      </Label>
      <Label x={296} y={150} size={13} bold fill={P}>
        Fill
      </Label>
      <Label x={36} y={56} anchor="start">
        Existing ground
      </Label>
      <Label x={366} y={116} anchor="end" fill={A}>
        Planned level
      </Label>
      <line x1={30} y1={205} x2={370} y2={205} stroke={P} strokeWidth={1.2} />
      {[30, 98, 166, 234, 302, 370].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={201} x2={x} y2={209} stroke={P} strokeWidth={1.2} />
          <Label x={x} y={225} size={9}>
            {i * 10} m
          </Label>
        </g>
      ))}
    </>
  ),

  estimation: () => (
    <>
      <rect x={40} y={28} width={170} height={194} rx={6} fill={BG} stroke={P} strokeWidth={1.5} />
      <rect x={54} y={44} width={80} height={7} rx={3.5} fill={P} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 70 + i * 20;
        return (
          <g key={i} fill={M} fillOpacity={0.45}>
            <rect x={54} y={y} width={[70, 58, 66, 50, 72, 60][i]} height={5} rx={2.5} />
            <rect x={140} y={y} width={22} height={5} rx={2.5} />
            <rect x={172} y={y} width={24} height={5} rx={2.5} />
          </g>
        );
      })}
      <line x1={54} y1={191} x2={196} y2={191} stroke={P} strokeWidth={1.2} />
      <rect x={54} y={201} width={40} height={7} rx={3.5} fill={P} />
      <rect x={160} y={201} width={36} height={7} rx={3.5} fill={A} />
      {(
        [
          ["Cement", 0.55],
          ["Steel", 0.8],
          ["Bricks", 0.45],
          ["Sand", 0.3],
          ["Labour", 0.7],
        ] as const
      ).map(([name, share], i) => {
        const y = 50 + i * 36;
        return (
          <g key={name}>
            <text x={236} y={y} fontSize={11} fontWeight={600} fill={P}>
              {name}
            </text>
            <rect x={236} y={y + 7} width={126} height={8} rx={4} fill={S} />
            <rect x={236} y={y + 7} width={126 * share} height={8} rx={4} fill={A} />
          </g>
        );
      })}
    </>
  ),

  "dtcp-approvals": () => (
    <>
      <rect x={70} y={22} width={200} height={140} rx={4} fill={BG} stroke={P} strokeWidth={1.5} />
      <rect x={86} y={36} width={168} height={96} fill={S} fillOpacity={0.45} />
      <rect x={212} y={90} width={42} height={42} fill={A} fillOpacity={0.18} />
      <rect x={86} y={76} width={168} height={14} fill={BG} />
      <g stroke={P} strokeWidth={1}>
        <line x1={86} y1={76} x2={254} y2={76} />
        <line x1={86} y1={90} x2={254} y2={90} />
        {[128, 170, 212].map((x) => (
          <line key={`t${x}`} x1={x} y1={36} x2={x} y2={76} />
        ))}
        {[128, 170, 212].map((x) => (
          <line key={`b${x}`} x1={x} y1={90} x2={x} y2={132} />
        ))}
        <rect x={86} y={36} width={168} height={96} fill="none" />
        <line x1={70} y1={142} x2={270} y2={142} />
      </g>
      <rect x={86} y={149} width={60} height={5} rx={2.5} fill={M} fillOpacity={0.5} />
      <rect x={200} y={149} width={54} height={5} rx={2.5} fill={M} fillOpacity={0.5} />
      <circle cx={300} cy={92} r={34} fill={BG} stroke={A} strokeWidth={2.5} />
      <circle cx={300} cy={92} r={27} fill="none" stroke={A} strokeWidth={1} strokeDasharray="2 3" />
      <path d="M285,93 l11,11 l21,-23" fill="none" stroke={A} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={70} y1={204} x2={330} y2={204} stroke={M} strokeWidth={1.5} />
      {["Survey", "Drawing", "File", "Approval"].map((step, i) => {
        const x = 70 + i * 86.67;
        const last = i === 3;
        return (
          <g key={step}>
            <circle cx={x} cy={204} r={last ? 9 : 7} fill={last ? A : P} stroke={BG} strokeWidth={2} />
            <Label x={x} y={231} bold={last} fill={last ? A : M}>
              {step}
            </Label>
          </g>
        );
      })}
    </>
  ),

  "building-plan-approval": () => (
    <>
      <rect x={40} y={26} width={320} height={198} rx={8} fill={BG} stroke={P} strokeWidth={1.5} />
      <line x1={40} y1={50} x2={360} y2={50} stroke={P} strokeWidth={1.2} />
      {[56, 68, 80].map((x) => (
        <circle key={x} cx={x} cy={38} r={3} fill={M} />
      ))}
      <rect x={104} y={32} width={200} height={12} rx={6} fill={S} />
      <rect x={62} y={66} width={116} height={92} fill={S} fillOpacity={0.45} stroke={P} strokeWidth={1.8} />
      <g stroke={P} strokeWidth={1.4} fill="none">
        <line x1={124} y1={66} x2={124} y2={118} />
        <line x1={62} y1={118} x2={108} y2={118} />
        <line x1={124} y1={118} x2={178} y2={118} />
        <path d="M108,134 A16,16 0 0 0 124,118" stroke={M} strokeWidth={1} />
      </g>
      <line x1={120} y1={206} x2={120} y2={180} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
      <polygon points="120,170 112,182 128,182" fill={A} />
      <path d="M98,202 v10 h44 v-10" fill="none" stroke={A} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {["Documents", "Drawing", "Fees", "Approval"].map((step, i) => {
        const y = 78 + i * 36;
        const last = i === 3;
        return (
          <g key={step}>
            {last ? null : <line x1={214} y1={y + 10} x2={214} y2={y + 26} stroke={M} strokeWidth={1} />}
            <circle
              cx={214}
              cy={y}
              r={10}
              fill={last ? BG : P}
              stroke={last ? A : P}
              strokeWidth={1.5}
              strokeDasharray={last ? "3 3" : undefined}
            />
            {last ? null : (
              <path
                d={`M${209},${y} l3.5,3.5 l6.5,-7.5`}
                fill="none"
                stroke={BG}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <text x={234} y={y + 4} fontSize={12} fontWeight={600} fill={last ? A : P}>
              {step}
            </text>
          </g>
        );
      })}
    </>
  ),

  "fmb-work": () => (
    <>
      <g stroke={M} strokeWidth={1}>
        <line x1={90} y1={60} x2={50} y2={34} />
        <line x1={260} y1={45} x2={284} y2={14} />
        <line x1={310} y1={130} x2={368} y2={124} />
        <line x1={250} y1={205} x2={270} y2={240} />
        <line x1={100} y1={190} x2={54} y2={222} />
      </g>
      <polygon
        points="90,60 260,45 310,130 250,205 100,190"
        fill={S}
        fillOpacity={0.5}
        stroke={P}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line x1={175} y1={52.5} x2={175} y2={197.5} stroke={P} strokeWidth={1.2} />
      <g stroke={A} strokeWidth={1.2}>
        <line x1={90} y1={60} x2={250} y2={205} strokeDasharray="6 4" strokeWidth={1.5} />
        <line x1={260} y1={45} x2={175.9} y2={137.8} />
        <line x1={100} y1={190} x2={160.2} y2={123.6} />
        <line x1={310} y1={130} x2={245.6} y2={201} />
      </g>
      {[
        [90, 60],
        [260, 45],
        [310, 130],
        [250, 205],
        [100, 190],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} fill={P} />
      ))}
      <Label x={128} y={104} size={13} bold fill={P}>
        2A
      </Label>
      <Label x={238} y={104} size={13} bold fill={P}>
        2B
      </Label>
      <Label x={172} y={30} size={11}>
        123
      </Label>
      <Label x={340} y={72} size={11}>
        125
      </Label>
      <Label x={326} y={188} size={11}>
        126
      </Label>
      <Label x={166} y={232} size={11}>
        127
      </Label>
      <Label x={48} y={132} size={11}>
        122
      </Label>
      <Label x={176} y={46} size={9} rotate={-5}>
        42.0
      </Label>
      <Label x={296} y={86} size={9} anchor="start">
        24.6
      </Label>
      <Label x={86} y={128} size={9} anchor="end">
        32.2
      </Label>
    </>
  ),

  "building-design": ({ hatch }) => (
    <>
      <rect x={30} y={40} width={190} height={170} fill={BG} stroke={P} strokeWidth={4} />
      <g stroke={P} strokeWidth={2.5}>
        <line x1={130} y1={40} x2={130} y2={104} />
        <line x1={30} y1={130} x2={92} y2={130} />
        <line x1={114} y1={130} x2={220} y2={130} />
        <line x1={150} y1={130} x2={150} y2={176} />
      </g>
      <g fill="none" stroke={M} strokeWidth={1}>
        <path d="M92,130 v22 A22,22 0 0 0 114,130" />
        <path d="M130,104 h-26 A26,26 0 0 0 130,130" />
      </g>
      <line x1={64} y1={210} x2={96} y2={210} stroke={BG} strokeWidth={6} />
      <g stroke={A} strokeWidth={4}>
        <line x1={58} y1={40} x2={100} y2={40} />
        <line x1={220} y1={62} x2={220} y2={102} />
        <line x1={30} y1={156} x2={30} y2={190} />
      </g>
      <Label x={80} y={88}>
        Bedroom
      </Label>
      <Label x={176} y={88}>
        Kitchen
      </Label>
      <Label x={90} y={180}>
        Living
      </Label>
      <Label x={186} y={180}>
        Bath
      </Label>
      <line x1={248} y1={150} x2={384} y2={150} stroke={M} strokeWidth={1} strokeDasharray="5 4" />
      <rect x={258} y={205} width={114} height={8} fill={`url(#${hatch})`} stroke={P} strokeWidth={1} />
      <polygon points="265,205 365,205 365,190 335,175 295,175 265,190" fill={S} stroke={P} strokeWidth={2} strokeLinejoin="round" />
      <rect x={300} y={58} width={30} height={117} fill={S} stroke={P} strokeWidth={2} />
      <g fill="none" stroke={A} strokeWidth={1.6} strokeLinecap="round">
        <path d="M307,64 V198 H276" />
        <path d="M323,64 V198 H354" />
        {[80, 100, 120, 140, 160].map((y) => (
          <line key={y} x1={304} y1={y} x2={326} y2={y} strokeWidth={1} />
        ))}
      </g>
      <Label x={338} y={104} anchor="start">
        Column
      </Label>
      <Label x={315} y={232}>
        Footing
      </Label>
      <Label x={250} y={145} anchor="start" size={9}>
        Ground
      </Label>
    </>
  ),

  "layout-designing": ({ clip }) => (
    <>
      <clipPath id={clip}>
        <polygon points="50,40 330,25 365,150 280,175 60,170" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect x={0} y={0} width={400} height={200} fill={S} fillOpacity={0.4} />
        <rect x={305} y={112} width={80} height={80} fill={A} fillOpacity={0.18} />
        <rect x={0} y={92} width={400} height={20} fill={BG} />
        <rect x={195} y={112} width={18} height={80} fill={BG} />
        <g stroke={P} strokeWidth={1.1}>
          <line x1={0} y1={92} x2={400} y2={92} />
          <line x1={0} y1={112} x2={195} y2={112} />
          <line x1={213} y1={112} x2={400} y2={112} />
          <line x1={195} y1={112} x2={195} y2={190} />
          <line x1={213} y1={112} x2={213} y2={190} />
          {[106, 162, 218, 274].map((x) => (
            <line key={`t${x}`} x1={x} y1={10} x2={x} y2={92} />
          ))}
          {[106, 150, 258, 305].map((x) => (
            <line key={`b${x}`} x1={x} y1={112} x2={x} y2={190} />
          ))}
        </g>
      </g>
      <polygon points="50,40 330,25 365,150 280,175 60,170" fill="none" stroke={P} strokeWidth={2} strokeLinejoin="round" />
      <g fill="none" stroke={A} strokeWidth={1.4}>
        <circle cx={326} cy={136} r={7} />
        <circle cx={344} cy={128} r={5} />
      </g>
      <rect x={50} y={198} width={196} height={12} fill={P} />
      <rect x={246} y={198} width={76} height={12} fill={M} />
      <rect x={322} y={198} width={43} height={12} fill={A} />
      <Label x={50} y={232} anchor="start" bold fill={P}>
        Plots
      </Label>
      <Label x={246} y={232} anchor="start">
        Roads
      </Label>
      <Label x={365} y={232} anchor="end" fill={A}>
        Open space
      </Label>
    </>
  ),

  "3d-interior": () => (
    <>
      <polygon points="130,165 270,165 370,230 30,230" fill={S} fillOpacity={0.3} />
      <rect x={130} y={65} width={140} height={100} fill={S} fillOpacity={0.35} stroke={P} strokeWidth={1.5} />
      <g stroke={P} strokeWidth={1.5}>
        <line x1={30} y1={20} x2={130} y2={65} />
        <line x1={370} y1={20} x2={270} y2={65} />
        <line x1={30} y1={230} x2={130} y2={165} />
        <line x1={370} y1={230} x2={270} y2={165} />
      </g>
      <rect x={170} y={85} width={60} height={46} fill={BG} stroke={P} strokeWidth={1.5} />
      <g stroke={P} strokeWidth={1}>
        <line x1={200} y1={85} x2={200} y2={131} />
        <line x1={170} y1={108} x2={230} y2={108} />
      </g>
      <polygon points="55,67.8 110,80.4 110,178 55,213.8" fill={S} stroke={P} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={82.5} y1={74.1} x2={82.5} y2={195.9} stroke={P} strokeWidth={1} />
      <g stroke={A} strokeWidth={2} strokeLinecap="round">
        <line x1={77} y1={130} x2={77} y2={144} />
        <line x1={88} y1={129} x2={88} y2={142} />
      </g>
      <ellipse cx={200} cy={213} rx={74} ry={10} fill={A} fillOpacity={0.12} stroke={A} strokeWidth={1} strokeDasharray="4 3" />
      <rect x={225} y={150} width={110} height={30} rx={5} fill={BG} stroke={P} strokeWidth={1.5} />
      <rect x={225} y={174} width={110} height={28} rx={5} fill={BG} stroke={P} strokeWidth={1.5} />
      <rect x={215} y={164} width={14} height={38} rx={5} fill={BG} stroke={P} strokeWidth={1.5} />
      <rect x={331} y={164} width={14} height={38} rx={5} fill={BG} stroke={P} strokeWidth={1.5} />
      <rect x={244} y={158} width={24} height={17} rx={3} fill={S} stroke={A} strokeWidth={1.2} />
      <rect x={292} y={158} width={24} height={17} rx={3} fill={S} stroke={A} strokeWidth={1.2} />
      <line x1={200} y1={40} x2={200} y2={58} stroke={P} strokeWidth={1.2} />
      <path d="M187,74 Q200,50 213,74 Z" fill={A} />
    </>
  ),
};

type ServiceIllustrationProps = {
  /** Service id from `src/data/offerings.ts`. */
  id: string;
  alt: string;
  className?: string;
};

export function ServiceIllustration({ id, alt, className }: ServiceIllustrationProps) {
  const uid = useId();
  const draw = drawings[id];
  if (!draw) return null;
  const ids: Ids = { hatch: `${uid}-hatch`, clip: `${uid}-clip` };

  return (
    <div
      className={cn("relative overflow-hidden rounded-md border border-line bg-accent-soft/25", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <svg viewBox="0 0 400 250" role="img" aria-label={alt} className="absolute inset-0 size-full p-3 sm:p-5">
        <defs>
          <pattern id={ids.hatch} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={6} stroke={A} strokeWidth={1.6} />
          </pattern>
        </defs>
        {draw(ids)}
      </svg>
    </div>
  );
}
