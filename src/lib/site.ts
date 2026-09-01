export const BOOK_A_CALL = "https://cal.com/team/telvox/intro";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Onboarding", href: "#onboarding" },
  { label: "FAQs", href: "#faq" },
];

export const INTEGRATION_LOGOS = [
  "intercom",
  "hubspot",
  "zendesk",
  "zoho",
  "googlecalendar",
  "webex",
  "calendly",
  "whatsapp",
].map((n) => `/logos/integrations/${n}.png`);

/** Entrance easing used across the site (Framer's default expo-out curve). */
export const EASE = [0.16, 1, 0.3, 1] as const;
