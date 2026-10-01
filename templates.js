// Bingo templates: the song lists and colors for each kind of board.
// This is the file to edit when changing songs. bingo.html handles layout and shuffling.
//
// Each template:
//   id                (required) short unique name; used to remember the last template you picked
//   name              (required) label shown next to the buttons on screen (not printed)
//   title             (required) heading printed on every board
//   freespace         (required) text in the center square
//   items             (required) the songs; no duplicates. Standard boards need 24+, "13" boards need 15+.
//                     Around twice that is best so neighboring boards don't share songs.
//   headerColors      (optional) heading colors; each board picks one at random. Default black.
//   pattern           (optional) "13" blocks out cells in a "13" shape. Default is a full 5x5 board.
//   blockedCellColors (optional) colors for blocked cells in the "13" pattern; one per board at random.
//
// To add a template, copy one below, give it a new id/name, and add it to templateOrder at the bottom.

// Taylor Swift album colors
const taylorColors = [
  "#1DB4A4",  // Taylor Swift (debut) - teal
  "#C9A227",  // Fearless - gold
  "#8B5CF6",  // Speak Now - purple
  "#991B1B",  // Red
  "#7DD3FC",  // 1989 - sky blue
  "#1F2937",  // Reputation - dark
  "#F9A8D4",  // Lover - pink
  "#9CA3AF",  // folklore - gray
  "#B45309",  // evermore - amber/brown
  "#1E3A5F",  // Midnights - navy
  "#78716C",  // TTPD - stone
];

const taylorRegular = {
  id: "regular",
  name: "Regular",
  title: "Taylor Swift Music Bingo",
  freespace: "Blank Space",
  headerColors: taylorColors,
  items: [
    "Teardrops On My Guitar",
    "Should've Said No",
    "Fearless",
    "Breathe",
    "The Way I Loved You",
    "Forever & Always",
    "Back to December",
    "Mine",
    "Speak Now",
    "The Moment I Knew",
    "Begin Again",
    "Come Back...Be Here",
    "Style",
    "Clean",
    "Don't Blame Me",
    "This Is Why We Can't Have Nice Things",
    "Look What You Made Me Do",
    "Gorgeous",
    "I Forgot That You Existed",
    "London Boy",
    "Daylight",
    "Cornelia Street",
    "The 1",
    "August",
    "Invisible String",
    "My Tears Ricochet",
    "'Tis The Damn Season",
    "Evermore",
    "Maroon",
    "Karma",
    "Paris",
    "Question…?",
    "The Black Dog",
    "The Tortured Poets Department",
    "Guilty as Sin?",
    "But Daddy I Love Him",
    "imgonnagetyouback",
    "The Fate of Ophelia",
    "Elizabeth Taylor",
    "Father Figure",
    "Ruin The Friendship",
  ],
};

const taylor13 = {
  id: "13",
  name: "13 (vault & deep cuts)",
  title: "Taylor Swift Music Bingo",
  freespace: "Blank Space",
  headerColors: ["#1E3A5F"],
  blockedCellColors: [
    "#BDCFB7", "#E8C490", "#BEA7C4", "#6D3D46", "#C2E2F4",
    "#EAB4CC", "#CC9D83",
  ],
  pattern: "13",
  items: [
    "You All Over Me",
    "Mr. Perfectly Fine",
    "We Were Happy",
    "That's When",
    "Don't You",
    "Bye Bye Baby",
    "If This Was A Movie",
    "Crazier",
    "Electric Touch",
    "When Emma Falls in Love",
    "Castles Crumbling",
    "Foolish One",
    "Timeless",
    "Better Man",
    "Nothing New",
    "Babe",
    "Message In a Bottle",
    "I Bet You Think About Me",
    "Forever Winter",
    "Run",
    "The Very First Night",
    "All Too Well",
    "Is It Over Now?",
    '"Slut!"',
    "Say Don't Go",
    "Now That We Don't Talk",
    "Suburban Legends",
    "Safe & Sound",
    "Carolina",
    "Macavity",
    "Beautiful Ghosts",
    "Ronan",
    "Sweeter Than Fiction",
    "Christmas Tree Farm",
    "You're Losing Me",
    "All Of The Girls You Loved Before",
    "I Can See You",
  ],
};

// "Next Template" cycles through these in order. The first one is the default.
const templateOrder = [taylorRegular, taylor13];
