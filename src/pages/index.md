---
title: ixfx
description: Docs intro
layout: ../layouts/MainLayout.astro
---

ixfx is a tookit for programming interactivity. The major modules are:

<div class="wrappedBoxContainer mini">
  <div>
    <h1>Flow</h1>
    <h2>Controlling how & when code runs</h2>
    <ul class="list">
      <li><a href="./flow/stateMachine/">state machine</a></li>
      <li><a href="./flow/loops/">loops and intervals</a></li>
      <li><a href="./flow/delay/#timeout">timeouts</a></li>
      <li><a href="./flow/delay/#debounce">debounce</a></li>
      <li><a href="./flow/delay/#throttle">throttling</a></li>
    </ul>
  </div>
  <div>
    <h1>Modulation</h1>
    <h2>Influencing & shaping values</h2>

[ADSR envelope](./modulation/envelope/),
[oscillators](./modulation/oscillator/),
[easing functions](./modulation/easing/), [forces](./modulation/forces/).

</div>

<div>
  <h1>Generation</h1>
  <h2>Producing values</h2>

[randomisation & jitter](./gen/random/), [generators](./gen/generator/)

</div>
<div>
    <h1>Data</h1>
    <h2>Cleaning & organising data</h2>

[averaging](./data/averaging/),
[cleaning](./data/cleanup/),[normalising](./data/normalising/),
[frequency counting](./data/frequency/), [tracking](./data/trackers/)

[arrays](./data/arrays/), [stack](./data/collections/stack/) and
[queue](./data/collections/queue/) collections

</div>
<div>
    <h1>Types</h1>
    <h2>Geometry</h2>

[Cartesian & polar coordinates](./types/geometry/units/),
[points](./types/geometry/point/), [lines](./types/geometry/line/),
[arcs](./types/geometry/arc/), [circles](./types/geometry/circle/),
[rectangle](./types/geometry/rect/) and [grid layouts](./types/geometry/grid/).

<h2>Colour</h2>

[interpolating, scales and variations](./types/colour/)

</div>

<div>
  <h1>Input/Output</h1>
  <h2>Interfacing with the world</h2>

[Espruino Puck.js](./io/espruino-puck/), [Espruino Pico](./io/espruino-pico/)

</div>
</div>

## Get started

Choose your starting point:

- [Download and tinker with the provided demos](https://github.com/clinth/ixfx-demos/)
- [import ixfx into your own sketch](./importing)
- Use a starter kit:
  [Glitch](https://glitch.com/edit/#!/ixfx-starter-url?path=script.js%3A15%3A0),
  Codepen, StackBlitz
- Edit demos online:
  [Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos),
  [Glitch](https://glitch.com/edit/#!/ixfx-demos)

See the sidebar to the left (or the drop-down menu if you're on mobile) and
start exploring.

- [Source code on Github](https://github.com/ClintH/ixfx)
- [Try demos online](https://clinth.github.io/ixfx-demos/)
  ([source on GitHub](https://github.com/clinth/ixfx-demos/))
- [Browse API documentation](https://clinth.github.io/ixfx/)

## Why ixfx?

There are many 'front-end' frameworks, but these are typically meant for regular
GUIs or document-based apps. They usually have idiosyncratic ways of structuring
code, custom syntax, and elaborate build processes. Great though if you're doing
that kind of thing often.

There are also several 'creative coding' sandboxes. These are better suited than
front-end frameworks for experimentation in interactivity, but again tend to be
their own little ecosystem removed from the web platform. They favour
Canvas-based visuals, and seem largely ignorant of the wider web platform or
modern coding practices.

In both cases one spends a lot of time learning the particular framework and its
way of doing things rather than the web platform itself. Learning Javascript as
a language also gets lost in this. Having to ask "how do I do _x_ in React?" or
"how do I do _x_ in P5.js?" is a sign the framework has eaten you.

Some design principles of ixfx are:

- No build process required
- No sandbox lock-in: follow web platform conventions so that patterns learned
  can be applied elsewhere
- Good type definitions and documentation for improved editor experience (in VS
  Code at least)
- Plain, immutable data over rich objects
- Favour functional approaches over OOP

## This documentation

Throughout this documentation there are lots of interactive controls to try
functions out.

You may also notice gold <code style="color: var(--yellow)">// repl-pad</code>
text at the top of code snippets. Tap this to open a live-editable copy of the
code.

Embedded demos are also scattered around. In their toolbars, you can open the
demo source on Github or view in a separate tab.
