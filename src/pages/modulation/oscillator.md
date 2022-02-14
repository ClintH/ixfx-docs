---
title: Oscillators
setup: |
  import { Markdown } from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import Clock from  './Clock.tsx';
  import {OscElement} from './OscElement.ts';
---

[API Docs: Modulation.Oscillators module](https://clinth.github.io/ixfx/modules/Modulation.Oscillators.html)

<script type="module" src={Astro.resolve('./OscElement.ts')}></script>
<script type="module" src={Astro.resolve('../../loader.ts')}></script>

_Oscillators_ are generators that produce value according to a wave shape. Common shapes include _sine_, _sawtooth_ (or _ramp_), _square_ and _triangle_.

In the below example, each oscillator runs for one _cycle_ over two seconds. That means the _frequency_ is 0.5 - half a cycle every second.

<div id="waveIntro"></div>
<script type="module">
importEl(
  `waveIntro`, 
  `oscillator-element`, {
  mode: `shape`,
  cycles: 0.5,
  width: 200,
  sampleDurationMs: 1000,
  height: 150
});
</script>

Oscillators are normalised to generate values in the range of `0` to `1`. Inverse waves can be calculated by taking the value from one.

## Sampling

How often to sample the oscillator depends on how you're using the value, and the oscillator frequency. If the sample rate is proportionally much slower than the oscillator, you'll miss the shape of the wave - sort of like seeing someone dance under a strobe light.

<div id="waveSampling"></div>
<script type="module">
importEl(
  `waveSampling`, 
  `oscillator-element`, {
  mode: `editor`,
  cycles: 0.5,
  width: 300,
  sampleDurationMs: 60*1000,
  height: 250
});
</script>

## Usage

Initialisation

```js
import { frequencyTimerSource } from 'ixfx/lib/flow';
import { Oscillators } from 'ixfx/lib/modulation';

// Create a timer for 10Hz (10 cycles per second)
const freq = frequencyTimerSource(10);

// Create a sine oscillator using `freq` time source
const osc = Oscillators.sine(freq);

// Instead of .sine one could choose:
//  sineBipolar, saw, triangle, square
```

Oscillators are number [generators](../data/generator), which means we have to 'pull' values out of it. To _sample_ the current value of the oscillator:

```js
const v = osc.next().value;
```

To get the inverse, eg converting the upwards ramp of the saw to a downwards ramp:

```js
const v = 1 - osc.next().value;
```

Typically you want to sample the oscillator's value over time. This might be every time your sketch updates its state, in a drawing loop, or based on a timer.

Below, we update `state.oscValue` with the oscillator value every 500 milliseconds:
```js
let state = {
  oscValue: 0
}
setInterval(() => {
  state = {
    ...state,
    oscValue: osc.next().value;
  }
}, 500);

// Elsewhere, use state.oscValue ...
```


<!-- ## Frequency modulation

_Frequency modulation_ is a common technique in sound synthesis in which the frequency of a running oscillator is changed over time by some other modulator. In this case, a sine wave runs at a set frequency, with its frequency modulated by the wave you can control below.

<div id="waveFm"></div>
<script type="module">
importEl(
  `waveFm`, 
  `oscillator-element`, {
  mode: `fm`,
  cycles: 1,
  width: 300,
  sampleDurationMs: 60*1000,
  height: 250,
  sampleRateMs: 0
});
</script>

Example expressions:
* `source * mod`: Sine wave runs at its full speed when the modulator is at 1 -->

## Amplitude modulation

_Amplitude modulation_ modulates the output of one oscillator by some other modulator. As before, a sine wave runs, while you can control the shape and frequency of the modulator.

The given expression is how the modulator effects the signal.

<div id="waveAm"></div>
<script type="module">
importEl(
  `waveAm`, 
  `oscillator-element`, {
  mode: `am`,
  cycles: 0.5,
  width: 300,
  sampleDurationMs: 60*1000,
  height: 250
});
</script>


Example expressions:
* `source * mod`: Dampens output. ie. if modulator is at 50%, signal is reduced by 50%. Try a triangle wave with frequency of 1.
* `source * Math.sqrt(mod)`: Reduces the influence of modulator by squaring its value first. If you set a triangle wave and frequency around 41, note how modulation bites in more when sine is at its higher values
* `source * Math.pow(mod, 2)`: Increases influence of modulator by raising to the second power. As a result, it seems the sine is the modulator, not the modulator.

See the [modulation demos](https://clinth.github.io/ixfx-demos/modulation/) for an example of how to do frequency modulation.

## Starter

Below is a skeleton for a sketch that defines settings, state and an update/apply loop. The oscillator is sampled on every loop.

```js
// Define settings
const settings = {
  osc: Oscillators.sine(frequencyCycleSource(10))
}

// Initialise state
let state = {
  oscValue: 0
}

// Update state
const updateState = () => {
  state = {
    ...state,                  // Copy any other values in state
    oscValue: osc.next().value // Sample oscillator
  }
}

// Apply state
const applyState = () => {
  const { oscValue } = state;
  // Use oscValue somehow...
}

const loop = () => {
  updateState();
  applyState();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
```



