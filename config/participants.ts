/**
 * Participants Configuration  -  AWS Community GameDay Europe
 *
 * Contains all organizers, AWS supporters, and participating user groups.
 * Update face image paths if you move the assets folder.
 * Update names/roles/groups to match your own event.
 *
 * Face images live in: public/assets/faces/
 * Note: asset paths here are relative to public/, so use "assets/faces/..."
 */

// ── User Group Interface ──
export interface UserGroup {
  flag: string;
  name: string;
  city: string;
  logo?: string; // Logo URL — add directly here, no need for a separate logos.ts
}

// ── All 57 Participating User Groups ──
// AWS Community GameDay Europe 2026
//
// `as const satisfies UserGroup[]` preserves the literal string types of every
// `name` field so that TypeScript can derive the UserGroupName union below.
export const USER_GROUPS = [
  { flag: "🇪🇸", name: "AWS Barcelona User Group",         city: "Barcelona, Spain" },
  { flag: "🇬🇧", name: "AWS Leeds User Group",             city: "Leeds, United Kingdom" },
  { flag: "🇫🇮", name: "AWS Meetup JKL",                  city: "Jyväskylä, Finland" },
  { flag: "🇨🇭", name: "AWS Swiss UG  -  Lausanne",          city: "Lausanne, Switzerland" },
  { flag: "🇨🇭", name: "AWS Swiss UG  -  Zürich",            city: "Zürich, Switzerland" },
  { flag: "🇨🇭", name: "AWS Swiss UG  -  Geneva",            city: "Geneva, Switzerland" },
  { flag: "🇷🇴", name: "AWS Transylvania Cloud",           city: "Cluj-Napoca, Romania" },
  { flag: "🇵🇱", name: "AWS User Group 3City",             city: "Gdansk, Poland" },
  { flag: "🇪🇸", name: "AWS UG Asturias",                  city: "Oviedo, Spain" },
  { flag: "🇬🇷", name: "AWS User Group Athens",            city: "Athens, Greece" },
  { flag: "🇧🇪", name: "AWS User Group Belgium",           city: "Brussels, Belgium" },
  { flag: "🇩🇪", name: "AWS User Group Bonn",              city: "Bonn, Germany" },
  { flag: "🇭🇺", name: "AWS User Group Budapest",          city: "Budapest, Hungary" },
  { flag: "🇩🇪", name: "AWS User Group Cologne",           city: "Köln, Germany" },
  { flag: "🇮🇹", name: "AWS User Group Cuneo",             city: "Cuneo, Italy" },
  { flag: "🇩🇪", name: "AWS User Group Dortmund",          city: "Dortmund, Germany" },
  { flag: "🇫🇮", name: "AWS User Group Finland",           city: "Helsinki, Finland" },
  { flag: "🇫🇷", name: "AWS UG France  -  Paris",            city: "Paris, France" },
  { flag: "🇪🇸", name: "AWS UG Galicia",                   city: "Santiago de Compostela, Spain" },
  { flag: "🇮🇹", name: "AWS User Group Genova",            city: "Genova, Italy" },
  { flag: "🇩🇪", name: "AWS User Group Hannover",          city: "Hannover, Germany" },
  { flag: "🇳🇴", name: "AWS UG Innlandet",                 city: "Hamar, Norway" },
  { flag: "🇹🇷", name: "AWS User Group Istanbul",          city: "Istanbul, Turkey" },
  { flag: "🇺🇦", name: "AWS UG Ivano-Frankivsk",           city: "Ivano-Frankivsk, Ukraine" },
  { flag: "🇫🇮", name: "AWS User Group Kuopio",            city: "Kuopio, Finland" },
  { flag: "🇸🇮", name: "AWS UG Ljubljana",                 city: "Ljubljana, Slovenia" },
  { flag: "🇲🇰", name: "AWS UG Macedonia",                 city: "Skopje, Macedonia" },
  { flag: "🇪🇸", name: "AWS User Group Malaga",            city: "Malaga, Spain" },
  { flag: "🇲🇩", name: "AWS UG Moldova",                   city: "Chisinau, Moldova" },
  { flag: "🇲🇪", name: "AWS UG Montenegro",                city: "Podgorica, Montenegro" },
  { flag: "🇩🇪", name: "AWS User Group Munich",            city: "München, Germany" },
  { flag: "🇩🇪", name: "AWS UG Münsterland",               city: "Münster, Germany" },
  { flag: "🇮🇹", name: "AWS User Group Napoli",            city: "Naples, Italy" },
  { flag: "🇩🇪", name: "AWS UG Nürnberg",                  city: "Nürnberg, Germany" },
  { flag: "🇳🇴", name: "AWS UG Oslo",                      city: "Oslo, Norway" },
  { flag: "🇮🇹", name: "AWS User Group Pavia",             city: "Pavia, Italy" },
  { flag: "🇮🇹", name: "AWS User Group Roma",              city: "Roma, Italy" },
  { flag: "🇮🇹", name: "AWS User Group Salerno",           city: "Salerno, Italy" },
  { flag: "🇧🇦", name: "AWS UG Sarajevo",                  city: "Sarajevo, Bosnia & Herzegovina" },
  { flag: "🇸🇪", name: "AWS UG Skåne",                     city: "Malmö, Sweden" },
  { flag: "🇫🇮", name: "AWS UG Tampere",                   city: "Tampere, Finland" },
  { flag: "🇨🇭", name: "AWS UG Ticino",                    city: "Lugano, Switzerland" },
  { flag: "🇷🇴", name: "AWS UG Timisoara",                 city: "Timisoara, Romania" },
  { flag: "🇮🇹", name: "AWS UG Venezia",                   city: "Venice, Italy" },
  { flag: "🇦🇹", name: "AWS User Group Vienna",            city: "Vienna, Austria" },
  { flag: "🇵🇱", name: "AWS UG Warsaw",                    city: "Warsaw, Poland" },
  { flag: "🇬🇧", name: "AWS UG West Midlands",             city: "Birmingham, United Kingdom" },
  { flag: "🇮🇹", name: "AWS Well-Architected UG Italy",    city: "Milano, Italy" },
  { flag: "🇩🇪", name: "AWS Women's UG Munich",            city: "Munich, Germany" },
  { flag: "🇩🇪", name: "Berlin AWS User Group",            city: "Berlin, Germany" },
  { flag: "🇷🇴", name: "Bucharest AWS User Group",         city: "Bucharest, Romania" },
  { flag: "🇩🇪", name: "Dresden AWS User Group",           city: "Dresden, Germany" },
  { flag: "🇩🇪", name: "Frankfurt AWS User Group",         city: "Frankfurt, Germany" },
  { flag: "🇫🇷", name: "Grenoble AWS User Group",          city: "Grenoble, France" },
  { flag: "🇩🇪", name: "Leipzig AWS User Group",           city: "Leipzig, Germany" },
  { flag: "🇫🇷", name: "Lille AWS User Group",             city: "Lille, France" },
  { flag: "🇫🇷", name: "Poitiers AWS User Group",          city: "Poitiers, France" },
] as const satisfies UserGroup[];

// Derived from USER_GROUPS — every valid user group name as a TypeScript union.
// Used as the type for CommunityMembership.userGroup so that an invalid name is a compile error.
export type UserGroupName = typeof USER_GROUPS[number]["name"];

export const COUNTRIES = Array.from(new Set(USER_GROUPS.map((g) => g.flag)));

// ── Community Program Types ──
export type CommunityProgram =
  | "ug-leader"
  | "aws-hero"
  | "aws-community-builder"
  | "cloud-club-captain"
  | "aws-ambassador";

export const COMMUNITY_PROGRAM_LABELS: Record<CommunityProgram, string> = {
  "ug-leader":              "AWS User Group Leader",
  "aws-hero":               "AWS Hero",
  "aws-community-builder":  "AWS Community Builder",
  "cloud-club-captain":     "Cloud Club Captain",
  "aws-ambassador":         "AWS Ambassador",
};

export interface CommunityMembership {
  program: CommunityProgram;
  userGroup?: UserGroupName; // The UG this person leads or represents — must match a UserGroup.name exactly
}

// ── Organizer Interface ──
export interface Organizer {
  name: string;
  fullName?: string;         // Only when display name differs from lookup name (e.g., host intro card)
  streamRole?: "host" | "co-organizer" | "support-presenter" | "gamemaster";
  programs?: CommunityMembership[]; // Community program memberships — set for community organizers
  jobTitle?: string;         // Job title shown on cards — set for AWS employees instead of programs
  location?: string;         // "City, Country" — set for community organizers, not needed for AWS employees
  flag: string;
  face: string;
  type: "community" | "aws";
  title?: string;            // Shown on intro cards (e.g., "AWS Community Hero")
  subtitle?: string;         // Secondary line on intro card
  bio?: string[];            // Bullet points for the preshow bio slide
}

// Returns the display role string for an organizer.
// For community: joins all program labels (e.g., "AWS User Group Leader & AWS Hero").
// For AWS employees: returns the job title.
export function getOrganizerRole(p: Organizer): string {
  if (p.jobTitle) return p.jobTitle;
  if (p.programs?.length) {
    return p.programs.map((m) => COMMUNITY_PROGRAM_LABELS[m.program]).join(" & ");
  }
  return "";
}

// Returns the UserGroupName this organizer represents (from their ug-leader membership).
// Used for UG logo lookup against USER_GROUPS.
export function getOrganizerUserGroup(p: Organizer): UserGroupName | undefined {
  return p.programs?.find((m) => m.program === "ug-leader")?.userGroup;
}

// ── Community Organizers ──
export const ORGANIZERS: Organizer[] = [
  {
    name: "Jerome", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Belgium" }],
    location: "Brussels, Belgium", flag: "🇧🇪", face: "assets/faces/jerome.jpg", type: "community",
    bio: ["AWS User Group Leader and co-founder of this initiative. Jerome co-architected the event structure, competition framework, and built the network of 53 User Groups across 23 countries."],
  },
  {
    name: "Anda", streamRole: "co-organizer",
    programs: [
      { program: "ug-leader", userGroup: "AWS Swiss UG  -  Geneva" },
      { program: "aws-community-builder" },
    ],
    location: "Geneva, Switzerland", flag: "🇨🇭", face: "assets/faces/anda.jpg", type: "community",
    bio: ["AWS User Group Leader and initiator of this GameDay. Anda had the original vision for a pan-European AWS community event and brought together volunteer organizers from 53 User Groups across the continent."],
  },
  {
    name: "Marcel", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "AWS UG Münsterland" }],
    location: "Münster, Germany", flag: "🇩🇪", face: "assets/faces/marcel.jpg", type: "community",
  },
  {
    name: "Linda", fullName: "Linda Mohamed", streamRole: "host",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group Vienna" },
      { program: "aws-hero" },
    ],
    location: "Vienna, Austria", flag: "🇦🇹", face: "assets/faces/linda.jpg", type: "community",
    title: "AWS Community Hero",
    subtitle: "AWS User Group Vienna · Förderverein AWS Community DACH",
    bio: [
      "Your host for today's GameDay Europe stream - broadcasting live across 53 cities",
      "Leader of AWS User Group Vienna & AWS Women's User Group Vienna",
      "Chairwoman of Förderverein AWS Community DACH e.V.",
      "Vice Chair of the largest open source foundation in Austria",
    ],
  },
  {
    name: "Manuel", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "Frankfurt AWS User Group" }],
    location: "Frankfurt, Germany", flag: "🇩🇪", face: "assets/faces/manuel.jpg", type: "community",
  },
  {
    name: "Andreas", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Bonn" }],
    location: "Bonn, Germany", flag: "🇩🇪", face: "assets/faces/andreas.jpg", type: "community",
  },
  {
    name: "Lucian", streamRole: undefined,
    programs: [{ program: "ug-leader", userGroup: "AWS UG Timisoara" }],
    location: "Timisoara, Romania", flag: "🇷🇴", face: "assets/faces/lucian.jpg", type: "community",
  },
  {
    name: "Mihaly", streamRole: "support-presenter",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Budapest" }],
    location: "Budapest, Hungary", flag: "🇭🇺", face: "assets/faces/mihaly.jpg", type: "community",
  },
];

// ── AWS Supporters (Gamemasters & Community Team) ──
export const AWS_SUPPORTERS: Organizer[] = [
  { name: "Arnaud", streamRole: "gamemaster", jobTitle: "Sr. Developer Advocate, AWS",        flag: "🇫🇷", face: "assets/faces/arnaud.jpg", type: "aws",
    bio: ["Sr. Developer Advocate at AWS. Arnaud will deliver the official GameDay instructions and guide all teams through the competition format, rules, and scoring system."] },
  { name: "Loïc",   streamRole: "gamemaster", jobTitle: "Sr. Technical Account Manager, AWS", flag: "🇫🇷", face: "assets/faces/loic.jpg",   type: "aws",
    bio: ["Sr. Technical Account Manager at AWS. Loïc co-delivers the GameDay instructions and is available as a gamemaster throughout the competition to help with any technical questions."] },
  { name: "Uliana", jobTitle: "Community Manager, AWS",             flag: "🌍", face: "assets/faces/uliana.jpg", type: "aws" },
  { name: "Natalia", jobTitle: "DevEx Community Manager, AWS",      flag: "🌍", face: "assets/faces/natalia.jpg", type: "aws" },
];
