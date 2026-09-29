export type Locale = "en" | "ar";

export type Service = {
  icon: "code" | "clipboard" | "bug" | "workflow" | "search" | "figma";
  title: string;
  copy: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  visual: "dashboard" | "chat" | "devices" | "web" | "analytics" | "quality";
  /** Real screens when they exist; `visual` is the drawn fallback otherwise. */
  image?: string;
  blurb: string;
  detail: string;
  stack: string[];
  metric: string;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current: boolean;
  points: string[];
};

/**
 * Both language bundles are typed against this, so a string that exists in one
 * and not the other is a compile error rather than a blank on the page.
 *
 * Only the *words* live here. Anything language-neutral — a project's id, its
 * artwork, a skill's percentage, a stat's number — is repeated identically in
 * both bundles and could be hoisted out; it is kept inline so a translator
 * edits one file top to bottom instead of stitching two together.
 */
export type Dict = {
  locale: Locale;
  dir: "ltr" | "rtl";

  profile: {
    name: string;
    firstName: string;
    headline: string;
    roles: string[];
    location: string;
    phone: string;
    phoneHref: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
    linkedin: string;
    intro: string;
    availability: string;
  };

  stats: { value: number; suffix: string; label: string; decimals: number }[];
  services: Service[];
  projects: Project[];
  experience: Role[];
  education: { school: string; title: string; period: string; location: string; note: string }[];
  award: { place: string; title: string; org: string; year: string; copy: string };
  skillGroups: { label: string; items: string[] }[];
  toolbelt: string[];
  certifications: string[];
  nav: { id: string; label: string }[];

  ui: {
    greeting: string;
    rolePrefix: string;
    findMeOn: string;
    bestSkillOn: string;
    scroll: string;
    scrollAria: string;
    hireMe: string;
    backToTop: string;
    openMenu: string;
    closeMenu: string;
    closeProject: string;
    emailLabel: string;
    basedIn: string;
    phoneLabel: string;
    linkedinLabel: string;
    switchToArabic: string;
    switchToEnglish: string;

    sections: {
      services: { eyebrow: string; title: string; highlight: string };
      work: { eyebrow: string; title: string; highlight: string };
      resume: { eyebrow: string; title: string; highlight: string };
      skills: { eyebrow: string; title: string; highlight: string };
      contact: { eyebrow: string; title: string; highlight: string };
    };

    resumeTabs: { experience: string; education: string; certifications: string };

    contact: {
      availableTitle: string;
      availableCopy: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sent: string;
      sentNote: string;
      fallbackSubject: string;
      errName: string;
      errEmail: string;
      errMessage: string;
    };

    footer: { blurb: string; rights: string };
    whatsapp: { label: string; hint: string };
  };
};
