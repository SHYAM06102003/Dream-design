/**
 * ============================================================================
 * SURVEY EQUIPMENT
 * ----------------------------------------------------------------------------
 * The kit used on a land survey, what each instrument actually does, and what
 * the client receives at the end. Written to be read by a client, not a
 * surveyor: no model numbers, no invented brand partnerships, no accuracy
 * promises we cannot back up.
 *
 * The accuracy figures are typical published instrument capability, phrased as
 * such. Replace them with the specification of the kit actually used.
 * ============================================================================
 */

export type EquipmentIconName =
  | "totalStation"
  | "gnss"
  | "level"
  | "laser"
  | "prism"
  | "staff"
  | "drone"
  | "controller";

export type Equipment = {
  id: string;
  /** Instrument name as a surveyor would say it. */
  name: string;
  /** One line: what it measures. */
  role: string;
  /** Two or three sentences a client can act on. */
  detail: string;
  /** Typical published capability, not a guarantee. */
  spec: string;
  icon: EquipmentIconName;
  /** Key in `images.ts` — the photograph shown on wide screens. */
  image: "surveyTotalStation" | "surveyLevels" | "surveyLevelKit" | "surveyGnss";
  imageAlt: string;
  /**
   * Focal point for the 4:3 frame, for equipment whose source photograph is
   * portrait. Defaults to the centre of the image.
   */
  imagePosition?: string;
};

export const equipment: Equipment[] = [
  {
    id: "total-station",
    name: "Total station",
    role: "Angles and distances, measured together",
    detail:
      "The main instrument on site. Set on a tripod over a known point, it measures the angle to a target and the distance to it at the same time, so every corner of the plot ends up as a coordinate rather than a guess. This is what turns a walk around the boundary into a drawn survey.",
    spec: "Typical accuracy 1–2 mm on a distance, 1 arc-second on an angle",
    icon: "totalStation",
    image: "surveyTotalStation",
    imageAlt:
      "Total station on a tripod set up in open ground, pointed at a surveying target",
  },
  {
    id: "gnss-rover",
    name: "GNSS rover receiver",
    role: "Coordinates for control points and corners",
    detail:
      "A satellite receiver held on a pole or mounted on the tripod. It fixes a position in three dimensions, which is how boundary corners and control points get their coordinates. Paired with a base station it works to centimetre precision, so it can be used to set out the building itself later.",
    spec: "Typical real-time accuracy 10–20 mm with a base station",
    icon: "gnss",
    image: "surveyGnss",
    imagePosition: "center 32%",
    imageAlt:
      "Satellite surveying receiver and measuring rod set up as a field kit on a tripod",
  },
  {
    id: "automatic-level",
    name: "Automatic level",
    role: "Levels and falls across the site",
    detail:
      "A telescopic level with a built-in bubble that reads its own angle. Surveyors take a line of sights between benchmarks to work out how high the ground is at every point, and how much it falls — the information that decides where a slab, a ramp or a drain goes.",
    spec: "Typical accuracy 1.5 mm per kilometre of double run",
    icon: "level",
    image: "surveyLevelKit",
    imageAlt:
      "Automatic surveyor's level on a tripod, the telescope mounted for levelling work",
  },
  {
    id: "laser-level",
    name: "Rotating laser level",
    role: "Setting out walls, foundations and floor levels",
    detail:
      "A self-levelling laser that throws a horizontal plane across the site. It marks a true working level on every wall peg and foundation setting-out point, so the structure is built to the level on the drawing rather than to whatever the ground happened to do.",
    spec: "Typical working range 100–300 m with a detector",
    icon: "laser",
    image: "surveyLevels",
    imageAlt:
      "Survey crew taking readings across an open site with a levelling instrument",
  },
  {
    id: "prism-pole",
    name: "Prism and pole",
    role: "The target the instruments actually measure to",
    detail:
      "An optical prism on a pole. The total station sends a laser to the prism and reads the light that comes back, which is how a distance is measured without a tape. The pole also lifts the target to the height the instrument is sighting, so the answer is a true horizontal distance.",
    spec: "Constant prism, usable with or without a pole",
    icon: "prism",
    image: "surveyTotalStation",
    imageAlt: "Surveying target and prism pole standing next to tripod-mounted instruments",
  },
  {
    id: "staff-tape",
    name: "Staff and steel tape",
    role: "Boundaries, detail and the awkward close work",
    detail:
      "Instruments are accurate, but they need somewhere to stand and something to see. A levelling staff, a ranging rod and a steel tape handle boundaries, corners, drainage covers, existing walls and anything else too close or too awkward for a tripod.",
    spec: "30 m fibreglass staff, 50 m steel tape",
    icon: "staff",
    image: "surveyLevels",
    imageAlt: "Measuring staff and tape used for close measurement work on a plot",
  },
  {
    id: "drone",
    name: "Survey drone",
    role: "A measured picture of the whole plot",
    detail:
      "A photogrammetry flight over the site produces an orthophoto, a contour model and a surface model — effectively a scaled map of the plot with the ground modelled. It is the fastest way to understand a large or irregular site, and it measures volumes when the design changes later.",
    spec: "Typical ground sample distance 2–3 cm per pixel",
    icon: "drone",
    image: "surveyGnss",
    imageAlt: "Drone surveying kit used to capture aerial imagery of a site",
  },
  {
    id: "field-controller",
    name: "Field controller and CAD",
    role: "The point where measurements become a drawing",
    detail:
      "Every point recorded in the field lands on a rugged tablet, checked for closure and then drawn in CAD. The output is the deliverable: a scaled site plan with boundaries, levels, contours, setbacks and the building footprint drawn on it, in a file the architect and the builder can both open.",
    spec: "Delivered as PDF and DWG, with the raw point list",
    icon: "controller",
    image: "surveyLevelKit",
    imageAlt: "Survey field equipment recording measurements for conversion into a drawing",
  },
];

/** What a client actually walks away with after the survey stage. */
export const surveyDeliverables = [
  "Scaled site plan with every boundary corner and its coordinates",
  "Spot levels across the plot, with contours where the ground changes",
  "Buildable area, and how much has to stay clear at the boundaries",
  "Setback and boundary offsets checked against the local rules",
  "Existing services, walls and access noted on the plan",
  "The survey blueprint in PDF and DWG, plus the raw point list",
];

export const surveyIntro = {
  eyebrow: "Survey equipment",
  title: "The kit that measures\nyour land.",
  description:
    "A survey is only as good as the instrument behind it and the drawing that comes out. This is the equipment we take onto a plot, what each instrument is for, and how the readings turn into a plan you can build from.",
};
