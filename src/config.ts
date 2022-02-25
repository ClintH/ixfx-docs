export const SITE = {
  title: `ixfx docs`,
  description: `ixfx documentation`,
  defaultLanguage: `en_US`,
};

export const OPEN_GRAPH = {
  image: {
    src: `https://github.com/clinth/ixfx/blob/main/assets/social/banner.jpg?raw=true`,
    alt: `ixfx`,
  }
};

// export const KNOWN_LANGUAGES = {
//   English: `en`,
// };

// Uncomment this to add an "Edit this page" button to every page of documentation.
// export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/blob/main/docs/`;

// Uncomment this to add an "Join our Community" button to every page of documentation.
// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// Uncomment this to enable site search.
// See "Algolia" section of the README for more information.
// export const ALGOLIA = {
//   indexName: 'XXXXXXXXXX',
//   apiKey: 'XXXXXXXXXX',
// }

export const SIDEBAR =
  [
    {text: ``, header: true},
    {text: `Getting Started`, header: true},
    {text: `Introduction`, link: `./`},
    {text: `Importing`, link: `./importing`},

    {text: `Flow & Logic`, header: true},
    {text: `State Machine`, link: `flow/stateMachine`},
    {text: `Timed Intervals`, link: `flow/loops`},
    {text: `Delay`, link: `flow/delay`},

    {text: `Modulation`, header: true},
    {text: `Envelope`, link: `modulation/envelope`},
    {text: `Oscillator`, link: `modulation/oscillator`},
    {text: `Easing`, link: `modulation/easing`},

    {text: `Temporal processing`, header: true},
    {text: `Normalising`, link: `temporal/normalising`},
    {text: `Frequency`, link: `temporal/frequency`},

    {text: `Data`, header: true},
    {text: `Generators`, link: `data/generator`},
    {text: `Collections`, link: `data/collections/`},

    {text: `Types`, header: true},
    {text: `Geometry`, link: `types/geometry/`},
    {text: `Colour`, link: `types/colour/`},

    // {text: `Units`, link: `geometry/units`},
    // {text: `Point`, link: `geometry/point`},
    // {text: `Line`, link: `geometry/line`},
    // {text: `Arc`, link: `geometry/arc`},
    // {text: `Circle`, link: `geometry/circle`},
    // {text: `Grid`, link: `geometry/grid`},

    // { text: `Rectangle`, link: `geometry/rectangle` },
    // { text: `Curve`, link: `geometry/curve` },
    // { text: `Paths`, link: `geometry/compound` },
    // { text: `Visualisation`, header: true },
    // { text: `Drawing`, link: `visualisation/drawing` },
    // { text: `Plot`, link: `visualisation/drawing` },
  ];