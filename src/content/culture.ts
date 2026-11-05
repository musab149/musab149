/**
 * culture.ts — real photos from Ahmed's Drive folder (originals in assets/source/).
 *
 * Captions describe only what is visible in the photo or given by its file name.
 * No dates, places or names are added unless they are visible in the image.
 * To swap a photo: drop the optimised JPG into /public/images and update src,
 * width and height here (see README → "Swap photos").
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const photos = {
  portrait: {
    src: "/images/ahmed-musab-portrait.jpg",
    width: 1028,
    height: 1284,
    alt: "Ahmed Musab in a light grey suit, smiling and gesturing as he speaks from a sofa at a Pixelpk company event",
    caption: "Ahmed Musab",
  },
  headshot: {
    src: "/images/ahmed-musab-headshot.jpg",
    width: 957,
    height: 957,
    alt: "Ahmed Musab at his desk with a laptop, in front of the Pixelpk Technologies sign",
    caption: "At the Pixelpk office",
  },
  avatar: {
    src: "/images/ahmed-musab-avatar.jpg",
    width: 320,
    height: 320,
    alt: "Ahmed Musab",
    caption: "Ahmed Musab",
  },
  kashmirCover: {
    src: "/images/culture-kashmir-trip-cover.jpg",
    width: 1800,
    height: 1252,
    alt: "The Pixelpk team in matching navy polo shirts lined up on a mountain road beside a red jeep, with forested hills behind",
    caption: "Team trip to Kashmir",
  },
  kashmirHillside: {
    src: "/images/culture-kashmir-trip-hillside.jpg",
    width: 1800,
    height: 1146,
    alt: "The team posing playfully on a green hillside in a wide mountain valley",
    caption: "Team trip to Kashmir",
  },
  fairyMeadows: {
    src: "/images/pixelpk-team-fairy-meadows.jpg",
    width: 1600,
    height: 1117,
    alt: "The team in navy polo shirts seated in rows beneath a snow-capped peak, under the title 'Trip to Fairy Meadows'",
    caption: "Team trip to Fairy Meadows",
  },
  annualLunchGroup: {
    src: "/images/culture-annual-lunch-group.jpg",
    width: 1800,
    height: 1092,
    alt: "The Pixelpk team gathered for a group photo in front of the company backdrop at its annual lunch",
    caption: "Annual team lunch",
  },
  annualLunchStage: {
    src: "/images/culture-annual-lunch-stage.jpg",
    width: 1284,
    height: 969,
    alt: "Ahmed Musab speaking into a microphone on stage beside a colleague in a red blazer, in front of a Pixelpk annual lunch backdrop",
    caption: "On stage at the annual lunch",
  },
  annualLunchRecognition: {
    src: "/images/culture-annual-lunch-recognition.jpg",
    width: 2000,
    height: 1531,
    alt: "Ahmed Musab and a colleague presenting a plaque to a team member on stage at the annual lunch",
    caption: "Team recognition at the annual lunch",
  },
  teamLunch: {
    src: "/images/culture-team-lunch.jpg",
    width: 1600,
    height: 668,
    alt: "The team seated together around a long table at a team lunch",
    caption: "Team lunch",
  },
  games: {
    src: "/images/culture-games.jpg",
    width: 2000,
    height: 1500,
    alt: "A large group of the team posing in the office with trophies on a small table in front of them",
    caption: "Games & sports",
  },
  hike: {
    src: "/images/culture-team-hike.jpg",
    width: 1800,
    height: 1350,
    alt: "Team members in navy polo shirts resting on rocks along a forest trail, some holding hiking poles",
    caption: "On the trail with the team",
  },
  tripFlags: {
    src: "/images/culture-team-trip-flags.jpg",
    width: 1800,
    height: 1013,
    alt: "The team in matching maroon polo shirts on a terrace in a green mountain valley, with flags behind them",
    caption: "Team trip",
  },
  tripValley: {
    src: "/images/culture-team-trip-valley.jpg",
    width: 2000,
    height: 1125,
    alt: "The team in casual clothes posing in a pine-covered valley with low clouds and flags behind them",
    caption: "Team trip",
  },
  mountainBreak: {
    src: "/images/culture-mountain-break.jpg",
    width: 1800,
    height: 1350,
    alt: "Ahmed Musab and a colleague seated on garden chairs in front of a snow-covered mountain",
    caption: "A pause in the mountains",
  },
  teamColours: {
    src: "/images/pixelpk-team-colours.jpg",
    width: 1500,
    height: 2000,
    alt: "Ahmed Musab and a colleague in maroon Pixelpk polo shirts standing together outdoors among trees",
    caption: "In Pixelpk colours",
  },
  mountains: {
    src: "/images/pixelpk-mountains.jpg",
    width: 1500,
    height: 2000,
    alt: "A team member seen from behind in a navy Pixelpk Technologies shirt, looking out at mountains",
    caption: "Pixelpk, out in the mountains",
  },
  eventLawBot: {
    src: "/images/event-pakistan-law-bot.jpg",
    width: 1593,
    height: 1800,
    alt: "Ahmed Musab standing with four colleagues in suits in front of a Pakistan Law Bot banner at a hotel event",
    caption: "At a Pakistan Law Bot event",
  },
  eventGuest: {
    src: "/images/event-welcoming-guest.jpg",
    width: 1597,
    height: 1800,
    alt: "Ahmed Musab handing a bouquet of flowers to a guest at a formal event",
    caption: "Welcoming a guest at an event",
  },
} satisfies Record<string, Photo>;

/** Homepage "Team & culture" drag gallery, in order. */
export const cultureGallery: Photo[] = [
  photos.kashmirCover,
  photos.annualLunchGroup,
  photos.games,
  photos.fairyMeadows,
  photos.annualLunchRecognition,
  photos.teamColours,
  photos.kashmirHillside,
  photos.teamLunch,
  photos.hike,
  photos.tripFlags,
  photos.mountains,
  photos.tripValley,
];

/** About page "Beyond the desk" strip. */
export const beyondTheDesk: Photo[] = [
  photos.annualLunchStage,
  photos.eventLawBot,
  photos.eventGuest,
  photos.mountainBreak,
];
