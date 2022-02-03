---
title: Units
setup: |
  import {Markdown} from 'astro/components';
  import Layout from '../../layouts/MainLayout.astro';
  import {RadiansEditor} from '../../components/RadiansEditor';
---

<style>
radians-editor {
  --label-color: var(--theme-text-light);
  --axis-color: var(--theme-bg-hover);
  --ray-color: var(--theme-hit-color);
}
</style>


## Radians

<radians-editor client:visible width="500" height="300"  />
