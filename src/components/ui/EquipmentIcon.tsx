import type { EquipmentIconName } from "@/data/equipment";

/**
 * Line icons for the survey kit, drawn on the same 24-unit grid as the rest of
 * the interface icons. Stroke only, 1.4 weight, no fills — the icon sits beside
 * a text label and never carries meaning on its own.
 */
const paths: Record<EquipmentIconName, React.ReactNode> = {
  /* Tripod-mounted instrument with a scope on top. */
  totalStation: (
    <>
      <rect x="7" y="4" width="10" height="6" rx="1" />
      <path d="M12 10v3" />
      <path d="M12 13 4.5 21M12 13l7.5 8M12 13v8" />
      <path d="M4.5 21h3" />
    </>
  ),
  /* Satellite receiver: antenna over a receiver body. */
  gnss: (
    <>
      <path d="M12 3.5 18 8m-6-4.5L6 8" />
      <path d="M4.5 5.5 8 8m11.5-2.5L16 8" />
      <rect x="8" y="8" width="8" height="5" rx="1" />
      <path d="M10 13v3h4v-3" />
      <path d="M6 21h12" />
      <path d="M12 16v5" />
    </>
  ),
  /* Automatic level: horizontal telescope on a stand. */
  level: (
    <>
      <path d="M4 9h16" />
      <rect x="8" y="5" width="8" height="4" rx="1" />
      <path d="M12 9v4" />
      <path d="M12 13 5 21M12 13l7 8" />
    </>
  ),
  /* Rotating laser: beam over a head unit. */
  laser: (
    <>
      <path d="M3 6h18" />
      <path d="M12 6v2" />
      <rect x="8" y="8" width="8" height="4" rx="1" />
      <path d="M10 12v2h4v-2" />
      <path d="M12 14v7" />
      <path d="M8 21h8" />
    </>
  ),
  /* Prism target on a pole. */
  prism: (
    <>
      <path d="m12 3 5 4.5-5 4.5-5-4.5L12 3Z" />
      <path d="M12 12v9" />
      <path d="M9 21h6" />
    </>
  ),
  /* Levelling staff with graduations. */
  staff: (
    <>
      <rect x="7" y="3" width="6" height="18" rx="1" />
      <path d="M7 7h6M7 11h6M7 15h6M10 3v18" />
    </>
  ),
  /* Drone with rotors. */
  drone: (
    <>
      <rect x="9" y="9" width="6" height="5" rx="1" />
      <path d="M9 11 5 7m10 4 4-4M9 13l-4 4m10-4 4 4" />
      <path d="M3 7h3m12 0h3M3 17h3m12 0h3" />
    </>
  ),
  /* Tablet with a plotted line — the field to CAD step. */
  controller: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M5 8h14" />
      <path d="m8 15 2.5-3 2 2 2.5-4" />
    </>
  ),
};

export function EquipmentIcon({ name, className }: { name: EquipmentIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
