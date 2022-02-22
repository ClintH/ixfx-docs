---
title: Easing
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '../../components/DemoElement.ts';
  import EasingFunc from './EasingFunc.astro';
  
---

* [API Docs: easeOverTime](https://clinth.github.io/ixfx/modules/Modulation.html#easeOverTime)
* [Online modulation demos](https://clinth.github.io/ixfx-demos/modulation/)

Easing functions help to give a *dynamic* to transition. In [Cartesian](../geometry/units.md#cartesian) terms, they give a _y_ value for _x_ from `0 -> 1`. In temporal terms, you can think of them as giving a point in time from start to finish (`0 -> 1`).

Normally, one would start at `0` and count up by a fixed amount to `1`. And if that's all you need, ixfx's [count](../data/generator#count) and [numericRange](../data/generator#numericRange) functions might do the job.

Here we count by 0.1:

<div data-easing=true id="demo0" fn="x"></div>

This is a _linear_ function, with the same 'speed' throughout the progression towards the end point.

In contrast, easing functions can give some dynamics to the journey. For example, maybe it starts slowly, but gets faster as it nears the end:

<div data-easing=true id="demo1" title="easeInCubic" easing="easeInCubic"></div>

Or perhaps gathering speed quickly, but then slowing down toward the end:

<div data-easing=true id="demo1" title="easeOutCubic" easing="easeOutCubic"></div>

There are several well known easing functions that can be used in CSS, in animation software and so on.


...gallery...

## Usage

## It's a function



## Demos

Here, the easing function advances on each call (tapping the circle), rather than by time.

<demo-element title="Discrete easing" src="/modulation/easing-tick/" />

Below is the common usage of time-based easing

<demo-element title="Timer easing" src="/modulation/easing-timer/" />


<EasingFunc />