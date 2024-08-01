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

export const SIDEBAR =
  [
    { text: ``, header: true },
    { text: `Getting Started`, header: true },
    { text: `Introduction`, link: `./` },
    { text: `Importing`, link: `./importing/` },

    { text: `Flow and Logic`, header: true },
    { text: `State machine`, link: `flow/stateMachine/` },
    { text: `State machine driver`, link: `flow/stateMachineDriver/` },

    { text: `Loops and intervals`, link: `flow/loops/` },
    { text: `Delay`, link: `flow/delay/` },
    { text: `Retrying`, link: `flow/retrying/` },
    { text: `Flow`, link: `flow/flow/` },
    { text: `Monitoring`, link: `flow/monitoring/` },
    { text: `Tasks`, link: `flow/tasks/` },

    { text: `Modulation`, header: true },
    { text: `Easing`, link: `modulation/easing/` },
    { text: `Envelope`, link: `modulation/envelope/` },
    { text: `Forces`, link: `modulation/forces/` },
    { text: `Jitter`, link: `modulation/jitter/` },
    { text: `Interpolate`, link: `modulation/interpolate/` },
    { text: `Oscillator`, link: `modulation/oscillator/` },
    { text: `Spring`, link: `modulation/spring/` },


    { text: `Generation`, header: true },
    { text: `Random`, link: `gen/random/` },
    { text: `Generators`, link: `gen/generator/` },

    { text: `Data`, header: true },
    { text: `Clean up`, link: `data/cleanup/` },
    { text: `Normalising`, link: `data/normalising/` },
    { text: `Arrays`, link: `data/arrays/` },
    { text: `Collections`, link: `data/collections/` },
    { text: `Averaging`, link: `data/averaging/` },
    { text: `Frequency`, link: `data/frequency/` },
    { text: `Trackers`, link: `data/trackers/` },
    { text: `Pool`, link: `data/pool/` },

    { text: `Types`, header: true },
    { text: `Geometry`, link: `types/geometry/` },
    { text: `Colour`, link: `types/colour/` },

    { text: `IO`, header: true },
    { text: `Espruino`, link: `io/espruino/` }
  ];