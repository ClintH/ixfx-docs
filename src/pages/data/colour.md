---
title: Colour
setup: |
  import { Markdown } from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import ColourScaleElement from './ColourScaleElement.ts';
---

<script type="module" src={Astro.resolve('./ColourScaleElement.ts')}></script>
<script type="module" src={Astro.resolve('../../loader.ts')}></script>

<div id="colourScale"></div>
<script type="module">
importEl(
  `colourScale`, 
  `colourscale-element`, {});
</script>
