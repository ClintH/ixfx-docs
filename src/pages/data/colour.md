---
title: Colour
setup: |
  import { Markdown } from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import ColourScaleElement from './ColourScaleElement.ts';
---

[API Docs: Colour module](https://clinth.github.io/ixfx/modules/Visual.Colour.html)

<script type="module" src={Astro.resolve('./ColourScaleElement.ts')}></script>
<script type="module" src={Astro.resolve('../../loader.ts')}></script>



## Interpolating

Colours can be _interpolated_, eg. getting the colour that is 50% between red and blue.

```js
import { Colour } from "https://unpkg.com/ixfx/visuals.js"

// Returns  `rgb(128, 0, 128)`
Colour.interpolate(0.5, `red`, `blue`);
```

Regular CSS colour definitions can also be used:

```js
// Returns `rgb(0, 85, 128))`
Colour.interpolate(0.5, `hsl(200, 100%, 50%)`, `hsl(90, 100%, 50%`);
```

By default colours are mixed in the RGB colour space. Options include: rgb, hsb, hcl, lch and lab.

```js
// Mix in HCL colour space. Returns `rgb(0, 170, 255))`
Colour.interpolate(0.5, `hsl(200, 100%, 50%)`, `hsl(90, 100%, 50%`, `hcl`);

// ..or object options can be used. Here we also add the `long` parameter
// to make interpolation go the long way around the circle
Colour.interpolate(0.5, `hsl(200, 100%, 50%)`, `hsl(90, 100%, 50%`, {space: `hcl`, long: true} );
```

The colour space you choose can have a large impact on what colour is generated. Colour spaces are different with regard to perceptual brightness, uniformity and saturation. See example below for `scale`.

## Scale

You can generate a series of colours with a specified number of steps with `scale`. The start and end colours are included appear as first and last step respectively.

```js
import { Colour } from "https://unpkg.com/ixfx/visuals.js"

// Mixes in HCL space, returns an array of 10 string rgb() values, spaced between red and blue.
Colour.scale(10, `hcl`, `red`, `blue`});
```

The demo below shows `scale` in action, as well how different interpolations can be between colour spaces.

<div id="colourScale"></div>
<script type="module">
importEl(
  `colourScale`, 
  `colourscale-element`, {});
</script>

By default, a scale will be made in the shortest distance between the colours. If you purposefully want to include more colour variations, use the `long` option. This only applies to hsl, hcl and cubehelix colour spaces.

```js
Colour.scale(10, {space: `hcl`, long: true}, `red`, `blue`);
```

## Parsing

If you need to parse a colour string into its components:

```js
import { Colour } from "https://unpkg.com/ixfx/visuals.js"

// Returns { h: 10.47, s: 1, l: 0.875 }
Colour.toHsl(`pink`);
// Returns { r: 255, g: 192, b: 203 }
Colour.toRgb(`pink`);
```

## Variations

```js
import { Colour } from "https://unpkg.com/ixfx/visuals.js"

// Returns a colour string for blue at 50% opacity
// `rgba(0, 0, 255, 0.5)`
const halfBlue = Colour.opacity(`blue`, 0.5);

// If a colour already has opacity, it is multiplied
// `rgba(0, 0, 255, 0.25)`
const quarterBlue = Colour.opacity(halfBlue, 0.5);
```

## Credits

Most of the functionality of the colour module is via Mike Bostock's [d3-color](https://github.com/d3/d3-color) and [d3-interpolate](https://github.com/d3/d3-interpolate). 