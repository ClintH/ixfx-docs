---
title: Importing via NPM
description: Importing the library
layout: ../layouts/MainLayout.astro
setup: |
  import ModuleList from './ModuleList.astro';
---

Assuming you have Node.js and NPM installed on your machine, you can install ixfx with:

```
npm install ixfx
```

You'll then need to you use your bundler of choice to include ixfx.


Example module import:

```js
import { Timers } from "ixfx"
Timers.continuously(...);
```

Example function import:

```js
import { continuously } from "ixfx/lib/timers.js"
continuously(...);
```

Note the path for modules contains `lib/` before the module file. This is different than using a URL import.