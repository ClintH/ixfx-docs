---
title: Envelope
setup: |
  import { Markdown } from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import EnvelopePlay from './EnvelopePlay.astro';
  import { DemoElement } from '../../components/DemoElement.ts';

---

[API Docs: Adsr](https://clinth.github.io/ixfx/interfaces/Modulation.Adsr.html)

The notion of an _envelope_ is borrowed from [sound synthesis](https://en.wikipedia.org/wiki/Envelope_(music)). They are useful for modulating a value after an initial trigger, with simple means for describing the shape of the modulation.

Envelopes have some similarity with _easing_ functions, as they describe a shape over time.

[Online modulation demos](https://clinth.github.io/ixfx-demos/modulation/)

## Anatomy of an envelope

The envelope consists of a series of stages, typically _attack, decay, sustain_ and _release_. 
* All stages have an associated _level_ or _amplitude_. Attack's level is also known as the _initial level_, and decay's level is also known as the _peak level_.
* All stages except _sustain_ have a _duration_, how long they run for in milliseconds.

When a trigger happens (eg. a synth key is pressed), the _attack_ stage runs for its specified duration, after which the _decay_ stage runs. The _sustain_ stage runs for as long as the trigger is held. At any point when the key is released, the _release_ stage runs.

As a stage progresses, it is essentially interpolating from its start to end point. Internally, each stage is modelled as running from 0 to 1, but this is scaled according to the levels you define. 

Envelopes can also loop through the attack, decay and release stages whilst being triggered. In this case, the sustain stage is skipped.

In ixfx, interpolation for each stage happens using a curve, allowing for more expressive progressions with the _bend_ parameter.

<envelope-editor id="envEditor" />

## Playground

The playground uses the settings from the envelope editor above. You can _trigger_ the envelope, which will then run through its stages. Use _Trigger & Hold_ if you want to have the envelope hold at the sustain stage. _Release_ allows a held envelope to continue on to the release stage. 

<EnvelopePlay />

## Usage

Docs: [Adsr](https://clinth.github.io/ixfx/interfaces/Modulation.Adsr.html), [AdsrOpts](https://clinth.github.io/ixfx/modules/Modulation.html#AdsrOpts), [AdsrTimingOpts](https://clinth.github.io/ixfx/modules/Modulation.html#AdsrTimingOpts)

```js
import { adsr, defaultAdsrOpts } from "https://unpkg.com/ixfx/modulation.js"

// Initialise envelope
const opts = {
  ...defaultAdsrOpts(),
  attackDuration: 1000,
  decayDuration: 200,
  sustainDuration: 100
};
const env = adsr(opts);
```

Trigger and release

```js
// Trigger envelope
env.trigger();

// Trigger and hold at sustain
env.trigger(true); 
env.release(); // Release a held envelope
```

Get value from envelope

```js
// Value of envelope
const scaled = env.value;

// Get current stage (as a string), scaled value, and raw value (0 -> 1 progress within a stage)
const r = env.compute();  // returns [stage, scaled, raw]
```

Other functions:
```js
// Reset envelope
env.reset();
// True if envelope is finished
env.isDone;
```

Envelopes also have events:

```js
// Envelope has changed stage
env.addEventListener(`change`, ev => {
  console.log(`Old: ${evt.oldState} new: ${ev.newState}`);
})

// Envelope has finished
env.addEventListener(`complete`, () => {
  console.log(`Done.`);
})

```

## Demos

In the demo below, `pointerdown` or `keydown` events triggers and holds the envelope. On the left side you see a typical binary on/off response, on the right you see a gradual effect of the envelope.

Releasing the pointer or key calls the envelope's `release` function.

This envelope has `retrigger` disabled, so pressing again while it's decaying will continue the envelope at that level, rather than resetting to zero (default behaviour).


<demo-element title="Retrigger disabled" src="/modulation/env-decay/" />