export const siteConfig = {
  name: "Vignesh N",
  tagline: "Photo",
  role: "Photographer",

  bio: "Photographer from Chennai. I shoot portraits, couples, weddings, and whatever catches my eye.",

  avatar: "/avatar.jpg",
  initials: "VN",
  
  about: {
    intro:
      "I picked up a camera three years ago and never really put it down. No formal training — just a lot of bad photos at the start and slowly figuring out what works.",
    body:
      "Most of my serious work has been wildlife. Forests, birds, animals — that's where I've spent the most time and learned the most. Portraits and couples are something I do on the side, still finding my footing there.",
    approach:
      "On a shoot I try to stay quiet and let things happen. The best frames usually come when people forget there's a camera around. I'm still learning that.",
  },

  camera: {
    intro:
      "I shoot on a Nikon Z5. Nothing exotic — just a camera I know well enough to not think about.",
    body:
      "The 24-200mm is almost always on it. It's not the sharpest lens out there but it lets me move without swapping glass, which matters more to me in the middle of a shoot.",
  },

 stats: [
    { label: "Years Shooting", value: "3+" },
    { label: "Wildlife Shoots", value: "100+" },
    { label: "Cities", value: "10+" },
    { label: "Sessions Done", value: "150+" },
  ],

  metadata: {
    title: {
      template: "%s | Vignesh N Photography",
      default: "Vignesh N Photography",
    },
    description:
      "Portrait, Couples, Cinematic & Wedding Photography by Vignesh N",
  },
  socialLinks: [
    { title: "Instagram" as const, href: "https://instagram.com/shots_by_vn" },
    {
      title: "Contact me" as const,
      href: "mailto:n.vigneshnatarajan@yahoo.com",
      primary: true,
    },
  ],
  gear: [
    { brand: "NIKON", model: "Z5" },
    { brand: "NIKON", model: "24-200mm" },
  ],
  footer: {
    poweredBy: { name: "Vignesh N", href: "#" },
  },
} as const;


export const photoCategories = [
  {
    id: "portrait",
    label: "Portrait",
    description: "Solo portraits, Chennai & beyond",
    city: "Chennai",
  },
  {
    id: "couples",
    label: "Couples",
    description: "Couple sessions & pre-wedding",
    city: "Chennai",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    description: "Cinematic shoots & editorial",
    city: "Chennai",
  },
  {
    id: "wedding",
    label: "Wedding",
    description: "Full wedding coverage",
    city: "Chennai",
  },
] as const;

export type CategoryId = (typeof photoCategories)[number]["id"];