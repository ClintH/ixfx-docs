---
title: Importing
description: Importing the library
layout: ../layouts/MainLayout.astro
setup: |
  import ModuleList from './ModuleList.astro';
---

<!-- <ModuleList /> -->

Read on for how to import ixfx with a URL import. Advanced users might want to install ixfx [via NPM](../import-npm/) or a [downloaded ZIP](../import-zip/).

## Modules

You'll mostly want to import functions as _modules_: 

```js
import { NameOfModule } from "https://unpkg.com/ixfx/dist/bundle.js"
```

The names of predefined modules are given in the list above. All of these can be imported from the main bundle.

For example, to import _Timers_:

```js
import { Timers } from "https://unpkg.com/ixfx/dist/bundle.js"
Timers.continuously(...);
```

Note the module name is capitalised, while the names in the URL are not. Also note that function names are preceded by the module name. One needs to call `Timers.continuously` not `continuously`.

## Functions

Some functions ([listed here](https://clinth.github.io/ixfx/modules.html)) don't live in a module at all. Or other times you just want to import a single function from within a module.

To import a function: 

```js
import { nameOfFunction } from "https://unpkg.com/ixfx/bundle.js
```

For example, to import `clamp`:

```js
import { clamp } from "https://unpkg.com/ixfx/dist/bundle.js"
```

You can also import functions from within a module:

```js
import { continuously } from "https://unpkg.com/ixfx/dist/flow.js"
continuously(...)
```

Note here the URL is using the module file _flow.js_, rather than _bundle.js_, and now we can call `continuously` without prefixing with a module name.

Browsing the [API documentation](https://clinth.github.io/ixfx/modules.html) is a good way of figuring out where to import from, if you're confused.
