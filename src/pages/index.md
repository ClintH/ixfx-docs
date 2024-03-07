---
title: ixfx
description: Docs intro
layout: ../layouts/MainLayout.astro
---

ixfx is a collection of functions for programming _interactivity_.

It helps you to focus more on the design work rather than the plumbing work.

## Get started

Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the <code style="color: var(--yellow)">// repl-pad</code> link in code samples which opens an instant editor.

Once you've done that and are ready to tinker, choose your starting point:

Start with demos and examples:
- [Try demos online](https://clinth.github.io/ixfx-demos/) 
- [View the code for demo sketches on Github](https://github.com/clinth/ixfx-demos/)
- [Edit demos on Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm) or [Glitch](https://glitch.com/edit/#!/ixfx-demos)

Start with a starter sketch:
- [Edit with a sketch on Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-starter) or [Glitch](https://glitch.com/edit/#!/ixfx-starter-url)
- [View code for the starter on Github](https://github.com/ClintH/ixfx-starter)
- [Read more on importing ixfx into your own sketch](./importing/)

## Why ixfx?

There are many 'front-end' frameworks, but these are typically meant for regular
GUIs or document-based apps. They usually have idiosyncratic ways of structuring
code, custom syntax, and elaborate build processes.

There are also several 'creative coding' sandboxes. These are better suited than
front-end frameworks for experimentation in interactivity, but again tend to be
their own little ecosystem removed from the web platform. They favour
canvas-based visuals, and seem largely ignorant of the wider web platform or
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
- Plain, immutable data over complicated objects
- Favour functional approaches over OOP, and try to stick to web programming conventions

## This documentation

Throughout this documentation there are lots of interactive controls to try
functions out.

You may also notice gold <code style="color: var(--yellow)">// repl-pad</code>
text at the top of code snippets. Tap this to open a live-editable copy of the
code.

Embedded demos are also scattered around. In their toolbars, you can open the
demo source on Github or view in a separate tab.

- [Source code on Github](https://github.com/ClintH/ixfx)
- [Browse API documentation](https://clinth.github.io/ixfx/)
