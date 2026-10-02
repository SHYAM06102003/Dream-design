export type NavItem = {
  label: string;
  /** Section id on the home page, without the "#". */
  id: string;
  href: string;
};

/** The site is one page. Each item scrolls to a section and highlights while that section is on screen. */
export const navigation: NavItem[] = [
  { label: "Home", id: "home", href: "/#home" },
  { label: "Services", id: "services", href: "/#services" },
  { label: "Process", id: "process", href: "/#process" },
  { label: "Projects", id: "projects", href: "/#projects" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Contact", id: "contact", href: "/#contact" },
];

export const sectionIds = navigation.map((item) => item.id);

export const legalNavigation = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
