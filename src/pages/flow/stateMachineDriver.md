---
title: State Machine Driver
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '/src/components/DemoElement.ts';
  import StateMachinePlay from './StateMachinePlay.astro';

---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Flow.StateMachine.driver.html">StateMachine.driver</a></li>
<li><a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/statemachine-regions">Example code</a>, <a href="https://clinth.github.io/ixfx-demos/flow/statemachine-regions/">Online demo</a></li>
<li><a href="https://glitch.com/edit/#!/ixix-state-machines-driver?path=index.html%3A1%3A0">Glitch example</a></li>
</ul></div>

When using [state machines](../stateMachine/), it's common to have a big `switch` statement (or lots of `if`s) to alter behaviour depending on the current state. These behaviours in turn might trigger a state change. Since this is such a common pattern, the 
[`StateMachine.driver`](https://clinth.github.io/ixfx/functions/Flow.StateMachine.driver.html) is provided.

With it, you set up _state handlers_ for different states and guiding the machine to subsequent states. 

Each handler has an `if` field, a single string or array of strings corresponding to the state(s) that handler applies to. While one handler can handle multiple different states, there can't be multiple handlers per state.

The other part of the handler is `then` field. At its simplest, it is an object that tells what state to transition to, for example:
```js
const handlers = [{
  if: `sleeping`, // If we're in the 'sleeping' state
  then: { next: 'walking' } // Go to 'walking' state
}]
```

Note: The use of `if` and `then` for the handlers shouldn't be mistaken for regular Javascript `if .. else` control structures.

The `then` field can be an array of functions, all of which return the same kind of object. When the handler is run, it executes these functions to determine what to do. Functions defined under `then` don't have to return a value - they could just be things you want to run when the state machine is in that state.

```js
const handlers = [{
  if: `walking`,  // If we're in the 'walking' state
  then: [
    () => {  // Randomly either go to 'resting' or 'running' state next
      if (Math.random() > 0.5) return { next: 'resting' }
      else return { next: 'running' }
    }
  ]
}];
```

Once we have the state machine and the handlers, the driver can be initialised. This would likely happen once when your sketch is initialised.

```js
// Set up driver (note the use of await for both lines)
const driver = await StateMachine.driver(states, handlers);
```

And then, perhaps in a timing-based loop, call `run()`, which will execute a state handler for the current state.

```js
// Call .run every second
setInterval(async () => {
  await driver.run();
}, 1000);
```

Here's a complete example:

```js
// States
const states = {
  sleeping: 'waking',
  waking: ['resting','sleeping'],
  resting: ['sleeping', 'walking'],
  walking: ['running', 'resting'],
  running: ['walking']
};

const handlers = [
  { 
    // If we're in the 'sleeping' state, move to next state
    if: 'sleeping',
    then: { next: true }
  },
  { 
    // If we're in the 'waking' state, randomly either go to 'resting' or 'sleeping' state
    if: 'waking',
    then: [
      () => {
        if (Math.random() > 0.5) {
          return { next: 'resting' }
        } else {
          return { next: 'sleeping' }
        }
      }
    ]
  }
];

// Set up driver
const driver = await StateMachine.driver(states, handlers);
```

Once you have the state machine and driver set up, you need to call .run() whenever you want the driver to do its thing. This might be called for example in a loop based on a timer.
```js
driver.run();
```

If you use asynchronous event handlers, call `await driver.run()` instead.

Some other things to do with the driver:
```js
// Check current state
driver.getValue(); // eg. 'resting'

// Manually transition state
driver.to('walking');
```

So far, handlers have returned an object describing what state to transition. Instead of hardcoding the state, you can use `{ next: true }` to transition to next available state. An alternative is `{ reset: true }`. When that is returned, the machine goes back to its initial state.

Each result can also have a `score` field. This is only useful if you have several results under `then`. By default, the highest scoring result determines what happens. 

With this in mind, we can re-write the earlier example, assigning random scores for each possible next state:

```js
...
  { 
    if: 'waking',
    then: [
      // Two functions, each returns a result with a random score each time they are executed
      () =>  { score: Math.random(), next: 'resting' },
      () =>  { score: Math.random(), next: 'sleeping' }
    ]
  }
...
```

In practice you might want to weight the random values so one choice is more or less likely than another. See [Random](../../gen/random/) for more on that.

Each handler also has an optional `resultChoice` field, which can be 'first', 'highest', 'lowest' or 'random'. By default, 'highest' is used, picking the highest scoring result. In our example, we might use `resultChoice: 'random'` to evenly pick between choices. With that enabled, we no longer need scores.

```js
...
  {
    if: 'waking',
    resultChoice: 'random',
    then: [
      // Because of resultChoice 'random', the driver
      // will randomly pick one of these options when in the 'waking' state
      { next: 'resting' },
      { next: 'sleeping' }
    ]
  }
...
```

When calling `driver.run()`, a result is returned with some status information, if that's needed:

```js
const result = await driver.run();
result.value;   // state at the end of .run()
result.visited; // string array of unique states that have been visited
result.machine; // original machine description
```

### Demo

In the demo below, the driver is used to autonomously change states based on an 'energy' level, also affected by current activity.

<demo-element title="State machine driver" src="/flow/statemachine-agent/" />
