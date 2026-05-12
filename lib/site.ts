export const navItems = [
  { href: "/", label: "Home" },
  { href: "/logline", label: "Logline" },
  { href: "/sizzle", label: "Sizzle" },
  { href: "/phase-one", label: "Phase One" },
  { href: "/phase-two", label: "Phase Two" },
  { href: "/phase-three", label: "Phase Three" },
  { href: "/why-sabrina", label: "Why Sabrina" },
  { href: "/summary", label: "Summary" },
];

export const cityRounds = [
  {
    name: "Madrid",
    sound: "Electro flamenco energy",
    challenge: "Turn rhythm and swagger into a live vocal performance built for a giant opening night crowd.",
  },
  {
    name: "Paris",
    sound: "Fashion-pop reinvention",
    challenge: "Refine image, elegance, and cinematic staging without losing emotional impact.",
  },
  {
    name: "London",
    sound: "Alt-pop edge",
    challenge: "Deliver sharp songwriting and cool restraint under intense industry scrutiny.",
  },
  {
    name: "New York",
    sound: "Big hook showcase",
    challenge: "Own the stage with attitude, precision, and a chorus that hits like a headline moment.",
  },
  {
    name: "Tokyo",
    sound: "Future-pop precision",
    challenge: "Blend choreography, visual design, and digital polish into a flawless performance.",
  },
  {
    name: "Sydney",
    sound: "Sunlit anthem scale",
    challenge: "Close the tour with confidence, crowd command, and a finale-level live payoff.",
  },
];

export const topTenContestants = [
  { index: 1, name: "Contestant 01", src: "/con1.png" },
  { index: 2, name: "Contestant 02", src: "/con2.png" },
  { index: 3, name: "Contestant 03", src: "/con3.png" },
  { index: 4, name: "Contestant 04", src: "/con4.png" },
  { index: 5, name: "Contestant 05", src: "/con5.png" },
  { index: 6, name: "Contestant 06", src: "/con6.png" },
  { index: 7, name: "Contestant 07", src: "/con7.png" },
  { index: 8, name: "Contestant 08", src: "/con8.png" },
  { index: 9, name: "Contestant 09", src: "/con9.png" },
  { index: 10, name: "Contestant 10", src: "/con10.png" },
];

export const phaseTwoStorageKeys = {
  madridWinner: "phaseTwoMadridWinner",
  madridAtRiskArtist: "phaseTwoMadridAtRiskArtist",
  phaseThreeFinalists: "phaseThreeFinalists",
  phaseThreeWinners: "phaseThreeWinners",
  finalOpeningActWinner: "finalOpeningActWinner",
} as const;

export function readStoredItem<T>(storage: Storage, key: string): T | null {
  const value = storage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function readStoredItems<T>(
  storage: Storage,
  key: string,
  fallback: T[],
): T[] {
  return readStoredItem<T[]>(storage, key) ?? fallback;
}

export const phaseTwoEpisodes = [
  {
    episode: "Episode 2",
    name: "Madrid",
  },
  {
    episode: "Episode 3",
    name: "Paris",
  },
  {
    episode: "Episode 4",
    name: "London",
  },
  {
    episode: "Episode 5",
    name: "São Paulo",
  },
  {
    episode: "Episode 6",
    name: "Tokyo",
  },
  {
    episode: "Episode 7",
    name: "New York",
  },
];

export const finalists = [
  { name: "Finalist One", label: "FINALIST 01", src: "/images/finalist-1.svg", size: "lg" as const },
  { name: "Finalist Two", label: "FINALIST 02", src: "/images/finalist-2.svg", size: "sm" as const },
  { name: "Finalist Three", label: "FINALIST 03", src: "/images/finalist-3.svg", size: "md" as const },
  { name: "Finalist Four", label: "FINALIST 04", src: "/images/finalist-4.svg", size: "sm" as const },
  { name: "Finalist Five", label: "FINALIST 05", src: "/images/finalist-5.svg", size: "lg" as const },
];
