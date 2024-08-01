import { c as createMetadata, a as createAstro, b as createComponent, r as render, d as renderComponent } from './chunks/index.7bfc2e7e.mjs';
import { $ as $$module1, a as $$MainLayout } from './chunks/MainLayout.fae6d6b7.mjs';
import 'shorthash';
import 'serialize-javascript';
import 'preact/hooks';
import 'preact/jsx-runtime';
import 'lit';

const metadata = { "headers": [{ "depth": 2, "slug": "get-started", "text": "Get started" }, { "depth": 3, "slug": "1-start-with-demos-and-examples", "text": "1. Start with demos and examples" }, { "depth": 3, "slug": "2-start-with-a-starter-sketch", "text": "2. Start with a starter sketch" }, { "depth": 2, "slug": "why-ixfx", "text": "Why ixfx?" }, { "depth": 2, "slug": "this-documentation", "text": "This documentation" }], "source": `
ixfx is a collection of functions for programming _interactivity_.

It helps you to focus more on the design work rather than the plumbing work.

## Get started

Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the <code style="color: var(--yellow)">// repl-pad</code> link in code samples which opens an instant editor.

Once you've done that and are ready to tinker, choose your starting point:

### 1. Start with demos and examples

There is a large set of demo sketches utilising ixfx functions in the [ixfx-demos](https://clinth.github.io/ixfx-demos/) repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.

* [Try them out](https://github.com/clinth/ixfx-demos/)
* [Getting demos running on your local machine](https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md)

You can also use an online editing and hosting environment
- [Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm): A rich editing experience, hosting and integration with a local editor if you want
- [Glitch.com](https://glitch.com/edit/#!/ixfx-demos): A simple but cheery editor

### 2. Start with a starter sketch

Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.

We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.

Simple starter sketches
- [Glitch.com](https://glitch.com/edit/#!/ixfx-starter-url) editor
- [Gitpod.io](https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url) editor

Advanced starter sketches
- [Gitpod.io](https://gitpod.io/#https://github.com/ClintH/ixfx-starter) editor
- [Glitch.com](https://glitch.com/edit/#!/ixfx-starter-node) editor
  
Or read more on [importing ixfx into your own sketch](./importing/).

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
`, "html": `<p>ixfx is a collection of functions for programming <em>interactivity</em>.</p>
<p>It helps you to focus more on the design work rather than the plumbing work.</p>
<h2 id="get-started">Get started</h2>
Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the 
<code style="color: var(--yellow)">
// repl-pad
</code>
 link in code samples which opens an instant editor.
<p>Once you've done that and are ready to tinker, choose your starting point:</p>
<h3 id="1-start-with-demos-and-examples">1. Start with demos and examples</h3>
<p>There is a large set of demo sketches utilising ixfx functions in the <a href="https://clinth.github.io/ixfx-demos/">ixfx-demos</a> repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.</p>
<ul>
<li><a href="https://github.com/clinth/ixfx-demos/">Try them out</a></li>
<li><a href="https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md">Getting demos running on your local machine</a></li>
</ul>
<p>You can also use an online editing and hosting environment</p>
<ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm">Gitpod</a>: A rich editing experience, hosting and integration with a local editor if you want</li>
<li><a href="https://glitch.com/edit/#!/ixfx-demos">Glitch.com</a>: A simple but cheery editor</li>
</ul>
<h3 id="2-start-with-a-starter-sketch">2. Start with a starter sketch</h3>
<p>Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.</p>
<p>We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.</p>
<p>Simple starter sketches</p>
<ul>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-url">Glitch.com</a> editor</li>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url">Gitpod.io</a> editor</li>
</ul>
<p>Advanced starter sketches</p>
<ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter">Gitpod.io</a> editor</li>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-node">Glitch.com</a> editor</li>
</ul>
<p>Or read more on <a href="./importing/">importing ixfx into your own sketch</a>.</p>
<h2 id="why-ixfx">Why ixfx?</h2>
<p>There are many 'front-end' frameworks, but these are typically meant for regular
GUIs or document-based apps. They usually have idiosyncratic ways of structuring
code, custom syntax, and elaborate build processes.</p>
<p>There are also several 'creative coding' sandboxes. These are better suited than
front-end frameworks for experimentation in interactivity, but again tend to be
their own little ecosystem removed from the web platform. They favour
canvas-based visuals, and seem largely ignorant of the wider web platform or
modern coding practices.</p>
<p>In both cases one spends a lot of time learning the particular framework and its
way of doing things rather than the web platform itself. Learning Javascript as
a language also gets lost in this. Having to ask "how do I do <em>x</em> in React?" or
"how do I do <em>x</em> in P5.js?" is a sign the framework has eaten you.</p>
<p>Some design principles of ixfx are:</p>
<ul>
<li>No build process required</li>
<li>No sandbox lock-in: follow web platform conventions so that patterns learned
can be applied elsewhere</li>
<li>Good type definitions and documentation for improved editor experience (in VS
Code at least)</li>
<li>Plain, immutable data over complicated objects</li>
<li>Favour functional approaches over OOP, and try to stick to web programming conventions</li>
</ul>
<h2 id="this-documentation">This documentation</h2>
<p>Throughout this documentation there are lots of interactive controls to try
functions out.</p>
You may also notice gold 
<code style="color: var(--yellow)">
// repl-pad
</code>

text at the top of code snippets. Tap this to open a live-editable copy of the
code.
<p>Embedded demos are also scattered around. In their toolbars, you can open the
demo source on Github or view in a separate tab.</p>
<ul>
<li><a href="https://github.com/ClintH/ixfx">Source code on Github</a></li>
<li><a href="https://clinth.github.io/ixfx/">Browse API documentation</a></li>
</ul>` };
const frontmatter = { "title": "ixfx", "description": "Docs intro", "astro": { "headers": [{ "depth": 2, "slug": "get-started", "text": "Get started" }, { "depth": 3, "slug": "1-start-with-demos-and-examples", "text": "1. Start with demos and examples" }, { "depth": 3, "slug": "2-start-with-a-starter-sketch", "text": "2. Start with a starter sketch" }, { "depth": 2, "slug": "why-ixfx", "text": "Why ixfx?" }, { "depth": 2, "slug": "this-documentation", "text": "This documentation" }], "source": `
ixfx is a collection of functions for programming _interactivity_.

It helps you to focus more on the design work rather than the plumbing work.

## Get started

Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the <code style="color: var(--yellow)">// repl-pad</code> link in code samples which opens an instant editor.

Once you've done that and are ready to tinker, choose your starting point:

### 1. Start with demos and examples

There is a large set of demo sketches utilising ixfx functions in the [ixfx-demos](https://clinth.github.io/ixfx-demos/) repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.

* [Try them out](https://github.com/clinth/ixfx-demos/)
* [Getting demos running on your local machine](https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md)

You can also use an online editing and hosting environment
- [Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm): A rich editing experience, hosting and integration with a local editor if you want
- [Glitch.com](https://glitch.com/edit/#!/ixfx-demos): A simple but cheery editor

### 2. Start with a starter sketch

Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.

We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.

Simple starter sketches
- [Glitch.com](https://glitch.com/edit/#!/ixfx-starter-url) editor
- [Gitpod.io](https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url) editor

Advanced starter sketches
- [Gitpod.io](https://gitpod.io/#https://github.com/ClintH/ixfx-starter) editor
- [Glitch.com](https://glitch.com/edit/#!/ixfx-starter-node) editor
  
Or read more on [importing ixfx into your own sketch](./importing/).

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
`, "html": `<p>ixfx is a collection of functions for programming <em>interactivity</em>.</p>
<p>It helps you to focus more on the design work rather than the plumbing work.</p>
<h2 id="get-started">Get started</h2>
Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the 
<code style="color: var(--yellow)">
// repl-pad
</code>
 link in code samples which opens an instant editor.
<p>Once you've done that and are ready to tinker, choose your starting point:</p>
<h3 id="1-start-with-demos-and-examples">1. Start with demos and examples</h3>
<p>There is a large set of demo sketches utilising ixfx functions in the <a href="https://clinth.github.io/ixfx-demos/">ixfx-demos</a> repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.</p>
<ul>
<li><a href="https://github.com/clinth/ixfx-demos/">Try them out</a></li>
<li><a href="https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md">Getting demos running on your local machine</a></li>
</ul>
<p>You can also use an online editing and hosting environment</p>
<ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm">Gitpod</a>: A rich editing experience, hosting and integration with a local editor if you want</li>
<li><a href="https://glitch.com/edit/#!/ixfx-demos">Glitch.com</a>: A simple but cheery editor</li>
</ul>
<h3 id="2-start-with-a-starter-sketch">2. Start with a starter sketch</h3>
<p>Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.</p>
<p>We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.</p>
<p>Simple starter sketches</p>
<ul>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-url">Glitch.com</a> editor</li>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url">Gitpod.io</a> editor</li>
</ul>
<p>Advanced starter sketches</p>
<ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter">Gitpod.io</a> editor</li>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-node">Glitch.com</a> editor</li>
</ul>
<p>Or read more on <a href="./importing/">importing ixfx into your own sketch</a>.</p>
<h2 id="why-ixfx">Why ixfx?</h2>
<p>There are many 'front-end' frameworks, but these are typically meant for regular
GUIs or document-based apps. They usually have idiosyncratic ways of structuring
code, custom syntax, and elaborate build processes.</p>
<p>There are also several 'creative coding' sandboxes. These are better suited than
front-end frameworks for experimentation in interactivity, but again tend to be
their own little ecosystem removed from the web platform. They favour
canvas-based visuals, and seem largely ignorant of the wider web platform or
modern coding practices.</p>
<p>In both cases one spends a lot of time learning the particular framework and its
way of doing things rather than the web platform itself. Learning Javascript as
a language also gets lost in this. Having to ask "how do I do <em>x</em> in React?" or
"how do I do <em>x</em> in P5.js?" is a sign the framework has eaten you.</p>
<p>Some design principles of ixfx are:</p>
<ul>
<li>No build process required</li>
<li>No sandbox lock-in: follow web platform conventions so that patterns learned
can be applied elsewhere</li>
<li>Good type definitions and documentation for improved editor experience (in VS
Code at least)</li>
<li>Plain, immutable data over complicated objects</li>
<li>Favour functional approaches over OOP, and try to stick to web programming conventions</li>
</ul>
<h2 id="this-documentation">This documentation</h2>
<p>Throughout this documentation there are lots of interactive controls to try
functions out.</p>
You may also notice gold 
<code style="color: var(--yellow)">
// repl-pad
</code>

text at the top of code snippets. Tap this to open a live-editable copy of the
code.
<p>Embedded demos are also scattered around. In their toolbars, you can open the
demo source on Github or view in a separate tab.</p>
<ul>
<li><a href="https://github.com/ClintH/ixfx">Source code on Github</a></li>
<li><a href="https://clinth.github.io/ixfx/">Browse API documentation</a></li>
</ul>` } };
const $$metadata = createMetadata("/src/pages/index.md", { modules: [{ module: $$module1, specifier: "../layouts/MainLayout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/src/pages/index.md", "https://clinth.github.io/ixfx-docs/", "file:///Users/af4766/repos/ixfx-docs/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const $$content = { "title": "ixfx", "description": "Docs intro", "astro": { "headers": [{ "depth": 2, "slug": "get-started", "text": "Get started" }, { "depth": 3, "slug": "1-start-with-demos-and-examples", "text": "1. Start with demos and examples" }, { "depth": 3, "slug": "2-start-with-a-starter-sketch", "text": "2. Start with a starter sketch" }, { "depth": 2, "slug": "why-ixfx", "text": "Why ixfx?" }, { "depth": 2, "slug": "this-documentation", "text": "This documentation" }], "source": `
ixfx is a collection of functions for programming _interactivity_.

It helps you to focus more on the design work rather than the plumbing work.

## Get started

Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the <code style="color: var(--yellow)">// repl-pad</code> link in code samples which opens an instant editor.

Once you've done that and are ready to tinker, choose your starting point:

### 1. Start with demos and examples

There is a large set of demo sketches utilising ixfx functions in the [ixfx-demos](https://clinth.github.io/ixfx-demos/) repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.

* [Try them out](https://github.com/clinth/ixfx-demos/)
* [Getting demos running on your local machine](https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md)

You can also use an online editing and hosting environment
- [Gitpod](https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm): A rich editing experience, hosting and integration with a local editor if you want
- [Glitch.com](https://glitch.com/edit/#!/ixfx-demos): A simple but cheery editor

### 2. Start with a starter sketch

Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.

We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.

Simple starter sketches
- [Glitch.com](https://glitch.com/edit/#!/ixfx-starter-url) editor
- [Gitpod.io](https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url) editor

Advanced starter sketches
- [Gitpod.io](https://gitpod.io/#https://github.com/ClintH/ixfx-starter) editor
- [Glitch.com](https://glitch.com/edit/#!/ixfx-starter-node) editor
  
Or read more on [importing ixfx into your own sketch](./importing/).

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
`, "html": `<p>ixfx is a collection of functions for programming <em>interactivity</em>.</p>
<p>It helps you to focus more on the design work rather than the plumbing work.</p>
<h2 id="get-started">Get started</h2>
Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the 
<code style="color: var(--yellow)">
// repl-pad
</code>
 link in code samples which opens an instant editor.
<p>Once you've done that and are ready to tinker, choose your starting point:</p>
<h3 id="1-start-with-demos-and-examples">1. Start with demos and examples</h3>
<p>There is a large set of demo sketches utilising ixfx functions in the <a href="https://clinth.github.io/ixfx-demos/">ixfx-demos</a> repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.</p>
<ul>
<li><a href="https://github.com/clinth/ixfx-demos/">Try them out</a></li>
<li><a href="https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md">Getting demos running on your local machine</a></li>
</ul>
<p>You can also use an online editing and hosting environment</p>
<ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm">Gitpod</a>: A rich editing experience, hosting and integration with a local editor if you want</li>
<li><a href="https://glitch.com/edit/#!/ixfx-demos">Glitch.com</a>: A simple but cheery editor</li>
</ul>
<h3 id="2-start-with-a-starter-sketch">2. Start with a starter sketch</h3>
<p>Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.</p>
<p>We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.</p>
<p>Simple starter sketches</p>
<ul>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-url">Glitch.com</a> editor</li>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url">Gitpod.io</a> editor</li>
</ul>
<p>Advanced starter sketches</p>
<ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter">Gitpod.io</a> editor</li>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-node">Glitch.com</a> editor</li>
</ul>
<p>Or read more on <a href="./importing/">importing ixfx into your own sketch</a>.</p>
<h2 id="why-ixfx">Why ixfx?</h2>
<p>There are many 'front-end' frameworks, but these are typically meant for regular
GUIs or document-based apps. They usually have idiosyncratic ways of structuring
code, custom syntax, and elaborate build processes.</p>
<p>There are also several 'creative coding' sandboxes. These are better suited than
front-end frameworks for experimentation in interactivity, but again tend to be
their own little ecosystem removed from the web platform. They favour
canvas-based visuals, and seem largely ignorant of the wider web platform or
modern coding practices.</p>
<p>In both cases one spends a lot of time learning the particular framework and its
way of doing things rather than the web platform itself. Learning Javascript as
a language also gets lost in this. Having to ask "how do I do <em>x</em> in React?" or
"how do I do <em>x</em> in P5.js?" is a sign the framework has eaten you.</p>
<p>Some design principles of ixfx are:</p>
<ul>
<li>No build process required</li>
<li>No sandbox lock-in: follow web platform conventions so that patterns learned
can be applied elsewhere</li>
<li>Good type definitions and documentation for improved editor experience (in VS
Code at least)</li>
<li>Plain, immutable data over complicated objects</li>
<li>Favour functional approaches over OOP, and try to stick to web programming conventions</li>
</ul>
<h2 id="this-documentation">This documentation</h2>
<p>Throughout this documentation there are lots of interactive controls to try
functions out.</p>
You may also notice gold 
<code style="color: var(--yellow)">
// repl-pad
</code>

text at the top of code snippets. Tap this to open a live-editable copy of the
code.
<p>Embedded demos are also scattered around. In their toolbars, you can open the
demo source on Github or view in a separate tab.</p>
<ul>
<li><a href="https://github.com/ClintH/ixfx">Source code on Github</a></li>
<li><a href="https://clinth.github.io/ixfx/">Browse API documentation</a></li>
</ul>` } };
  return render`${renderComponent($$result, "Layout", $$MainLayout, { "content": $$content }, { "default": () => render`<p>ixfx is a collection of functions for programming <em>interactivity</em>.</p><p>It helps you to focus more on the design work rather than the plumbing work.</p><h2 id="get-started">Get started</h2>
Explore what ixfx offers via the sidebar. There are lots of interactive illustrations and look out for the 
<code style="color: var(--yellow)">
// repl-pad
</code>
 link in code samples which opens an instant editor.
<p>Once you've done that and are ready to tinker, choose your starting point:</p><h3 id="1-start-with-demos-and-examples">1. Start with demos and examples</h3><p>There is a large set of demo sketches utilising ixfx functions in the <a href="https://clinth.github.io/ixfx-demos/">ixfx-demos</a> repository. These are a great way to get started and are meant as useful building-blocks. It's recommended you get them running on your local machine and edit the code there.</p><ul>
<li><a href="https://github.com/clinth/ixfx-demos/">Try them out</a></li>
<li><a href="https://github.com/ClintH/ixfx-demos/blob/main/_readmes/running-local.md">Getting demos running on your local machine</a></li>
</ul><p>You can also use an online editing and hosting environment</p><ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-demos-npm">Gitpod</a>: A rich editing experience, hosting and integration with a local editor if you want</li>
<li><a href="https://glitch.com/edit/#!/ixfx-demos">Glitch.com</a>: A simple but cheery editor</li>
</ul><h3 id="2-start-with-a-starter-sketch">2. Start with a starter sketch</h3><p>Our 'starter' sketches don't do anything out-of-the-box. They are lightweight, quick ways of starting a sketch using ixfx.</p><p>We offer two flavours, simple starters which are just client-side code, and advanced starters which come bundled with a Node.js server so you can use Websockets and Typescript.</p><p>Simple starter sketches</p><ul>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-url">Glitch.com</a> editor</li>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter-url">Gitpod.io</a> editor</li>
</ul><p>Advanced starter sketches</p><ul>
<li><a href="https://gitpod.io/#https://github.com/ClintH/ixfx-starter">Gitpod.io</a> editor</li>
<li><a href="https://glitch.com/edit/#!/ixfx-starter-node">Glitch.com</a> editor</li>
</ul><p>Or read more on <a href="./importing/">importing ixfx into your own sketch</a>.</p><h2 id="why-ixfx">Why ixfx?</h2><p>There are many 'front-end' frameworks, but these are typically meant for regular
GUIs or document-based apps. They usually have idiosyncratic ways of structuring
code, custom syntax, and elaborate build processes.</p><p>There are also several 'creative coding' sandboxes. These are better suited than
front-end frameworks for experimentation in interactivity, but again tend to be
their own little ecosystem removed from the web platform. They favour
canvas-based visuals, and seem largely ignorant of the wider web platform or
modern coding practices.</p><p>In both cases one spends a lot of time learning the particular framework and its
way of doing things rather than the web platform itself. Learning Javascript as
a language also gets lost in this. Having to ask "how do I do <em>x</em> in React?" or
"how do I do <em>x</em> in P5.js?" is a sign the framework has eaten you.</p><p>Some design principles of ixfx are:</p><ul>
<li>No build process required</li>
<li>No sandbox lock-in: follow web platform conventions so that patterns learned
can be applied elsewhere</li>
<li>Good type definitions and documentation for improved editor experience (in VS
Code at least)</li>
<li>Plain, immutable data over complicated objects</li>
<li>Favour functional approaches over OOP, and try to stick to web programming conventions</li>
</ul><h2 id="this-documentation">This documentation</h2><p>Throughout this documentation there are lots of interactive controls to try
functions out.</p>
You may also notice gold 
<code style="color: var(--yellow)">
// repl-pad
</code>

text at the top of code snippets. Tap this to open a live-editable copy of the
code.
<p>Embedded demos are also scattered around. In their toolbars, you can open the
demo source on Github or view in a separate tab.</p><ul>
<li><a href="https://github.com/ClintH/ixfx">Source code on Github</a></li>
<li><a href="https://clinth.github.io/ixfx/">Browse API documentation</a></li>
</ul>` })}`;
});

export { $$metadata, $$Index as default, frontmatter, metadata };
