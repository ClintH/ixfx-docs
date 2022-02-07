---
title: Importing via URL
layout: ../layouts/MainLayout.astro
setup: |
  import ModuleList from './ModuleList.astro';
---

## Via URL import

You can import the whole package with a URL to _bundle.js_
```js
import {Timers} from "https://unpkg.com/ixfx/dist/bundle.js";

// Use something from the module, eg:
Timers.continuously( ... )
```

Or an individual module, note _timers.js_ instead:

```js
import {continuously} from "https://unpkg.com/ixfx/dist/timers.js";

// Use something from the module, eg:
continuously( ... )
```

A starting template is available on [Glitch](https://glitch.com/edit/#!/ixfx-starter-url?path=script.js%3A1%3A0)