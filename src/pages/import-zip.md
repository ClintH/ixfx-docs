---
title: Importing via a ZIP
description: Importing the library
layout: ../layouts/MainLayout.astro
setup: |
  import ModuleList from './ModuleList.astro';
---

1. [Get the latest code](https://github.com/ClintH/ixfx/archive/refs/heads/main.zip)

2. Download and unzip. Grab the files from the `dist` folder and put them into a folder called `ixfx` in a directory containing your sketches.

Thus you should have:
```
|- ixfx\
|-- arrays.d.ts
|-- arrays.js
|-- ...
|- index.html <-- your HTML file
|- script.js  <-- your JS sketch
```

Assuming then the folder _ixfx_ is in the same parent folder as your sketch, you should then be able to import using a relative path:

```js
import { Timers } from "./ixfx/bundle.js"
Timers.continuously(...);
```

This is how the ixfx demos are organised, you can see this in action [in the repository](https://github.com/clinth/ixfx-demos/).