---
title: Envelope
layout: ../../layouts/MainLayout.astro
setup: |
  import EnvelopePlay from './EnvelopePlay.astro';
  import { DemoElement } from '../../components/DemoElement.ts';
  import { FrameElement } from '../../components/FrameElement.ts';
---

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/interfaces/Modulation.Adsr.html">adsr function</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/modulation/">Demos</a></li>
<li><a href="https://fn-vis.pages.dev/1/#H4sIAEYo9mQAA12SzU6FMBCFX2XSFSQIV5cYTYy6MMb4AHIXzWXAapk2ncFoCO9uC/fHKwuSmTnnzNemb5MaXIuqVt46UXMxKdLDsS6UISNGW1VPc5GkrOroaZElai7UvC2WIrW3UWEG74LABI/0hdZ5ZJihC26ARr2LeK6raiT/2Zc7N1Tmu/uuWsNSxeTRajGOyg9uVEMN7RyxAO5zXn0aMtzA1BBAWZbHDWWLnR6t3LUcooyzvEgSLaJ3nw9jWGJruNxsNsugxZ3+OfWv9m0eWbShM0ND83ViqSq4D6gFEw9oakGC6XsMYOQPaaQ7UemIk/3Dz2NabJV7d5bqJf0Z0QPrwVtD/XphByuMJMZC6wgbYpQnEgxf2mZZDje363WsBGl/So/DEWMygOkgIZSGH6I9X8WwiE4IEPcfsMHwsqmAgHvFaonlGAg6bXmNntPPO5YXZNY9LnuWzelQc77a0qfiozp7ZNtfP20aDnYCAAA=">fn-vis</a>: envelope example</li>
<li><a href="https://github.com/ClintH/ixfx-demos/tree/main/modulation/env-starter">Starter skeleton</a> (<a href="https://clinth.github.io/ixfx-demos/modulation/env-starter/">view online</a>)
</ul>
</div>

The notion of an _envelope_ is borrowed from [sound synthesis](https://en.wikipedia.org/wiki/Envelope_(music)). They are useful for modulating a value after an initial trigger, with simple means for describing the shape of the modulation.

Envelopes have some similarity with [easing functions](../easing/), as they describe a shape over time.

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

Docs: [Adsr](https://clinth.github.io/ixfx/interfaces/Modulation.Adsr.html), [AdsrOpts](https://clinth.github.io/ixfx/types/Modulation.AdsrOpts.html), [AdsrTimingOpts](https://clinth.github.io/ixfx/types/Modulation.AdsrTimingOpts.html)


Initialise an envelope with a few timing settings:

```js
import { Envelopes } from "https://unpkg.com/ixfx/dist/modulation.js"

// It's a good idea to use the defaultAdsrOpts(),
// and then override what you want.
const opts = {
  ...Envelopes.defaultAdsrOpts(),
  attackDuration: 1000,
  decayDuration: 200,
  sustainDuration: 100
};
const env = Envelopes.adsr(opts);
```

_Triggering_ an envelope kicks it off, letting it run through its stages:

```js
env.trigger();
```

To have an envelope to run through attack, decay and then hold at the sustain stage, pass 'true':

```js
// Trigger and hold at sustain
env.trigger(true);
```

And at some point call `release` to continue on to the release stage:

```js
// Release a held envelope
env.release();
```

After triggering, you need to request the value of the envelope:

```js
// Value of envelope
const scaled = env.value;
```

But this is just the value at the time you request it. Since envelopes are tied to time, you'll want to sample the value over time.

It's also possible to get additional data about the envelope with `compute`:

```js
// Get current stage (as a string), scaled value, and raw value (0 -> 1 progress within a stage)
const r = env.compute();  // returns [stage, scaled, raw]
```

You can [see an envelope in action on fn-vis](https://fn-vis.pages.dev/1/#H4sIAEYo9mQAA12SzU6FMBCFX2XSFSQIV5cYTYy6MMb4AHIXzWXAapk2ncFoCO9uC/fHKwuSmTnnzNemb5MaXIuqVt46UXMxKdLDsS6UISNGW1VPc5GkrOroaZElai7UvC2WIrW3UWEG74LABI/0hdZ5ZJihC26ARr2LeK6raiT/2Zc7N1Tmu/uuWsNSxeTRajGOyg9uVEMN7RyxAO5zXn0aMtzA1BBAWZbHDWWLnR6t3LUcooyzvEgSLaJ3nw9jWGJruNxsNsugxZ3+OfWv9m0eWbShM0ND83ViqSq4D6gFEw9oakGC6XsMYOQPaaQ7UemIk/3Dz2NabJV7d5bqJf0Z0QPrwVtD/XphByuMJMZC6wgbYpQnEgxf2mZZDje363WsBGl/So/DEWMygOkgIZSGH6I9X8WwiE4IEPcfsMHwsqmAgHvFaonlGAg6bXmNntPPO5YXZNY9LnuWzelQc77a0qfiozp7ZNtfP20aDnYCAAA=).

Other functions:
```js
// Reset envelope
env.reset();

// True if envelope is finished
env.isDone;
```

Envelopes have events:

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

### Envelope options

Envelope options are documented [here](https://clinth.github.io/ixfx/types/Modulation.AdsrOpts.html) and the [timing options here](https://clinth.github.io/ixfx/types/Modulation.AdsrTimingOpts.html).

There are three 'bend' options for setting a stage curve, `attackBend, decayBend` and `releaseBend`. Bend values run from -1 to 1. A value of `0` means there is no bend (ie. straight line), `-1` pulls curve down, and `1` pushes it outward. 

eg: 
```js
const opts = {
  ...defaultAdsrOpts(),
  attackBend: -1,
  decayBend: 0.5,
  releaseBend: 0
}
```

Levels can be set via `initialLevel`, `peakLevel`, `releaseLevel` and `sustainLevel`. These are presumed to be 0 to 1, inclusive. Typically the initial level is `0`, the peak `1` and release `0` (these are the defaults).

eg:
```js
const opts = {
  ...defaultAdsrOpts(),
  initialLevel: 0,
  peakLevel: 1,
  releaseLevel: 0
}
```

`retrigger` means a retriggered envelope continues its value from what it is at the point of retrigger. By default, as retrigger is _false_, envelope always start `0` (or whatever `initialLevel` is set to).

```js
const opts = {
  ...defaultAdrsOpts(),
  retrigger: true
}
```

## Envelopes in action

Here is a pattern to request the envelope value over time. After setting up the envelope, we use a loop to read the value at a given period.

```js
import { Envelopes } from "https://unpkg.com/ixfx/dist/modulation.js"
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"

// Initialise
const settings = Object.freeze({
  env: Envelopes.adsr({
    ...Envelopes.defaultAdsrOpts()
  },
  sampleRateMs: 100
});

let state = {
  envSampler
};

// Run a loop, reading from envelope until done
state.envSampler = continuously(() => {
  const { env } = settings;
  // If envelope is done, stop looping
  if (env.isDone) return false; 

  // Read value from envelope, do something with it...
  const v = env.value;
}, settings.sampleRateMs);

// Trigger envelope and start reading
settings.env.trigger();
state.envSampler.start();
```

Or perhaps you want to start an envelope when an event happens, such as a button clicked. We can introduce a `retrigger()` function that cancels the sampler, triggers the envelope and starts the sampler again

```js
const retrigger = () => {
  const { env } = settings;
  const { envSampler } = state;

  envSampler.cancel();
  env.trigger();
  envSampler.start();
};

document.getElementById(`someButton`).addEventListener(`click`, retrigger);
```


In the demo below, `pointerdown` or `keydown` events triggers and holds the envelope. On the left side you see a typical binary on/off response, on the right you see a gradual effect of the envelope.

Releasing the pointer or key calls the envelope's `release` function.

This envelope has `retrigger` disabled, so pressing again while it's decaying will continue the envelope at that level, rather than resetting to zero (default behaviour).

<frame-element title="Retrigger disabled" src="https://clinth.github.io/ixfx-play/modulation/envelopes/decay/" />