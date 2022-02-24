---
title: ixfx
description: Docs intro
layout: ../layouts/MainLayout.astro
---

ixfx is a tookit for programming interactivity.

First steps:
* [Download and tinker with the provided demos](https://github.com/clinth/ixfx-demos/), or
* [import ixfx into your own sketch](./importing), or
* Use a starter kit: [Glitch](https://glitch.com/edit/#!/ixfx-starter-url?path=script.js%3A15%3A0), Codepen, StackBlitz


## Why ixfx?

There are many 'front-end' frameworks, but these are typically meant for regular GUIs or document-based apps. They usually have idiosyncratic ways of structuring code, custom syntax, and elaborate build processes. Great though if you're doing that kind of thing often.

There are also several 'creative coding' sandboxes. These are better suited than front-end frameworks for experimentation in interactivity, but again tend to be their own little ecosystem removed from the web platform. They favour Canvas-based visuals, and seem largely ignorant of the wider web platform or modern coding practices.

In both cases one spends a lot of time learning the particular framework and its way of doing things rather than the web platform itself. Learning Javascript as a language also gets lost in this. Having to ask "how do I do _x_ in React?" or "how do I do _x_ in P5.js?" is a sign the framework has eaten you.

Some design principles of ixfx are:
* No build process required
* No sandbox lock-in: follow web platform conventions so that patterns learned can be applied elsewhere
* Good type definitions and documentation for improved editor experience (in VS Code at least)
* Plain, immutable data over rich objects
* Favour functional approaches over OOP

## Features

ixfx offers:
* Flow: state machine, time-based delay/intervals, debounce, throttling
* Modulation: ADSR envelope, oscillators, easing functions
* Data: generators, frequency-tracking, stack and queue collections, colour functions
* Geometry: primitives for Cartesian & polar coordinates, points, lines, arcs, circles and grid layouts.
  
See the sidebar to the left (or the drop-down menu if you're on mobile) and start exploring.

* [Source code on Github](https://github.com/ClintH/ixfx)
* [Try demos online](https://clinth.github.io/ixfx-demos/) ([source on GitHub](https://github.com/clinth/ixfx-demos/))
* [Browse API documentation](https://clinth.github.io/ixfx/)