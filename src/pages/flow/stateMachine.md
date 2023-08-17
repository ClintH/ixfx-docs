---
title: State Machine
layout: ../../layouts/MainLayout.astro
setup: |
  import { DemoElement } from '/src/components/DemoElement.ts';
  import StateMachinePlay from './StateMachinePlay.astro';

---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

<div class="tip"><ul>
<li>API Reference <a href="ttps://clinth.github.io/ixfx/modules/Flow.StateMachine.html">StateMachine</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
<li>Starter: <a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/statemachine-starter">GitHub</a>, <a href="https://glitch.com/edit/#!/ixfx-starter-statemachine">Glitch</a>
</ul></div>

A _state machine_ allows for a controlled change from one state to another. It sets up a well-defined set of possible states and what transitions are possible between them. It's up to you to 'drive' the machine, telling it when to transition.

State machines are defined with a plain object. Properties list of possible states, with values being what state(s) that are possible to change to, or _null_ if no further changes are possible.

## Machine definition

An example of a simple state machine is a light switch. It has two states: _on_ and _off_. When the light is _on_, the only other state is _off_. And vice-versa:

```js
{
  on: "off",
  off: "on"
}
```

With this machine definition, it would be illegal to have a state `dimmed`, or to turn it `off` when it is already `off`. In this case, the machine never reaches a final state, it can always oscillate between `on` / `off`. Note too that we can automatically and reliably advance the state of the machine, because each state indicates what follows.

It's possible to have several possible next states by using a string array:

```js
{
  on: ["off", "half_bright"],
  half_bright: ["on", "off"],
  off: "on"
}
```

The example below is intended to start with `plain` bread, with a few ways of getting to the eventual final state of `sprinkled_on_soup` or `eaten`. Once a machine is in its final state, it cannot change to another state unless it is _reset_.

```js
{
  plain: ["toasted", "buttered", "eaten"],
  toasted: ["buttered", "eaten", "diced"],
  buttered: ["eaten", "marmaladed"],
  marmaladed: "eaten",
  diced: "sprinkled_on_soup",
  sprinkled_on_soup: null,
  eaten: null
}
```

## Why?

Behaving according to a current state is a common pattern in programming interactivity. This is often solved by using different variables track state. A downside is that you have to be mindful what variables or conditions alter state as well as when and where to enforce rules about state changes.

A state machine therefore can help you catch errors and makes coding simpler when you know there are a fixed number of well-defined states to handle, and they are only activated according to a logic you have defined.

## Playground

Try out some state machines in this playground. 

1. Edit the description or choose a demo
2. Click _Use description_ to load it have it checked for errors.
3. If successful, you can see available states. Select a state and then 'Change state'

(Note that properties are enclosed in " marks here because it's represented as JSON)

<StateMachinePlay />

## Simple usage

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Flow.StateMachine.html">StateMachine</a></li>
<li><a href="https://clinth.github.io/ixfx/modules/Flow.html">Online demos</a></li>
<li>Starter: <a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/statemachine-starter">GitHub</a>, <a href="https://glitch.com/edit/#!/ixfx-starter-statemachine">Glitch</a>
</ul></div>

A simple way of using the state machine is the functional, immutable approach. Create the machine with its _description_ and _initial state_:

```js
const machine = StateMachine.init({
  on: "off",
  off: "on"
}, "on");
```

The machine description is a simple object that 1) lists all possible states (as its top-level properties), and 2) for each state, what other state(s) can be transitioned to, or `null` if it is a final state.

The following example has four possible states (`wakeup, sleep, coffee, breakfast, bike`). `sleep` can only transition to the `wakeup` state, while `wakeup` can transition to either `coffee` or `breakfast`. 

Use _null_ to signify the final state. Multiple states can terminate the machine if desired.

```js
// repl-pad#1
import { StateMachine } from "https://unpkg.com/ixfx/dist/flow.js"

const description = { 
 sleep: `wakeup`,
 wakeup: [`coffee`, `breakfast`],
 coffee: `bike`,
 breakfast: `bike`,
 bike: null
}
let sm = StateMachine.init(description, `sleep`);
```

`StateMachine.init` returns [`MachineState`](https://clinth.github.io/ixfx/types/Flow.StateMachine.MachineState.html) which captures the definition of the machine and its current state:

```js
// repl-pad#1
// Current state
sm.value; // eg. 'bike'
// List of unique states visited
sm.visited; // eg. ['sleep', 'wakeup']
// Original machine definition
sm.machine; 
```

To attempt to change state, use [`StateMachine.to`](https://clinth.github.io/ixfx/functions/Flow.StateMachine.to.html)

```js
// repl-pad#1
// Transition existing machine to state 'wakeup'
sm = StateMachine.to(sm, 'wakeup');
sm.value; // 'wakeup'
```

If this is a legal transition, you'll get a new `MachineState` object. If not, an exception will be thrown. Note that the state is immutable - a transition results in a new object.

Here are some helper functions:
```js
// repl-pad#1
// String array of possible next states
StateMachine.possible(sm);

// Returns _true_ if state machine cannot transition further
StateMachine.done(sm);

// Try to automatically move to next state
sm = StateMachine.next(sm);
```

## Class-based usage

ixfx has a class [`StateMachine.WithEvents`](https://clinth.github.io/ixfx/classes/Flow.StateMachine.WithEvents.html) which wraps the functional implementation described above and also provides events for listening for event changes.

The same format is used to define possible transitions. Now there's an mutable object, so `const` can be used:

```js
// repl-pad#2
import { StateMachine } from "https://unpkg.com/ixfx/dist/flow.js"
const description = { 
 sleep: `wakeup`,
 wakeup: [`coffee`, `breakfast`],
 coffee: `bike`,
 breakfast: `bike`,
 bike: null
}
const sm = new StateMachine.WithEvents(description, { initial: "sleep" });
```

Change the state by name:

```js
// repl-pad#2
sm.state = `wakeup`
```

In some cases, you might want to ask the machine to transition to its next possible state, regardless of its current state. If multiple states are possible, it will use the first one.

```js
// repl-pad#2
sm.next();
```

Reset the machine back to its initial state with `reset()`. This is the only way to continue after reaching the final state.

```js
// repl-pad#2
sm.reset();
```

Check status

```js
if (sm.state === `coffee`) ...
if (sm.isDone) ...
```

The `change` event is fired whenever state changes, and `stop` when the machine reaches a final state.

```js
sm.addEventListener(`change`, (evt) => {
 console.log(`State change from ${evt.priorState} -> ${evt.newState}`);

 // Prints for example:
 // State change from wakeup -> breakfast
});

sm.addEventListener(`stop`, (evt) => {
 console.log(`Machine has finished in state: ${evt.newState}`);
});
```

## Simple machines

[`StateMachine.fromList`](https://clinth.github.io/ixfx/functions/Flow.StateMachine.fromList.html) creates a machine that steps through a series of states and then terminates.

```js
// repl-pad#3
import { StateMachine } from "https://unpkg.com/ixfx/dist/flow.js"
// Machine that can go: init -> one -> two -> three -> [end]
const sm1 = StateMachine.fromList(`init`, `one`, `two`, `three`);
```

Once in the 'three' state, will be considered _done_, since there is no possible transition from there.

[`StateMachine.bidirectionalFromList`](https://clinth.github.io/ixfx/functions/Flow.StateMachine.bidirectionalFromList.html) is the same idea, but allow back-and-forth between states.

```js
// repl-pad#3
// Machine that can go: init <-> one <-> two <-> three
const sm2 = StateMachine.bidirectionalFromList(`init`,`one`, `two`, `three`);
```

In the above example, `sm2` will never be _done_, because it's always possible for it to transition to some state.

## Driver

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/functions/Flow.StateMachine.driver.html">StateMachine.driver</a></li>
<li><a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/statemachine-regions">Example code</a>, <a href="https://clinth.github.io/ixfx-demos/flow/statemachine-regions/">Online demo</a></li>
<li><a href="https://glitch.com/edit/#!/ixix-state-machines-driver?path=index.html%3A1%3A0">Glitch example</a></li>
</ul></div>

When using state machines, it's common to have a big `switch` statement (or lots of `if`s) to alter behaviour depending on the current state. Very often, these behaviours in turn trigger a state change. Since this is such a common pattern, the 
[`StateMachine.driver`](https://clinth.github.io/ixfx/functions/Flow.StateMachine.driver.html) makes this a little simpler.

With it, you set up _state handlers_ for different states and guiding the machine to subsequent states. 

Each handler has an `if` field, a single string or array of strings corresponding to the state(s) that handler applies to. While one handler can handle multiple different states, there can't be multiple handlers per state.

The other part of the handler is `then` field. At its simplest, it is an object that tells what state to transition to, for example:
```js
const handlers = [{
  if: `sleeping`, // If we're in the 'sleeping' state
  then: { next: 'walking' } // Go to 'walking' state
}]
```

It could alternatively be an array of functions, which return the same kind of object. When the handler is run, it executes these functions to determine what to do. Functions defined under `then` don't have to return a value - they could just be things you want to run when the state machine is in that state.

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

Once we have the state machine and the handlers, the driver can be initialised:
```js
// Set up driver (note the use of await for both lines)
const driver = await StateMachine.driver(states, handlers);

// To take action based on the current state, call .run():
await driver.run();
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
    // State is 'sleeping'
    if: 'sleeping',
    then: { next: true }
  },
  { 
    // State is 'waking'
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

// To take action based on the current state, call .run():
await driver.run();

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

In practice you might want to weight the random values so one choice is more or less likely than another. See [Random](../gen/random.md) for more on that.

Each handler also has an optional `resultChoice` field, which can be 'first', 'highest', 'lowest' or 'random'. By default, 'highest' is used, picking the highest scoring result. We could just as well use `resultChoice: 'random'` to evenly pick between choices.

```js
...
  {
    if: 'waking',
    resultChoice: 'random',
    then: [
      { next: 'resting' },
      { next: 'sleeping' }
    ]
  }
...
```

When calling `driver.run()`, a result is returned with some status information.
```js
const result = await driver.run();
result.value;   // state at the end of .run()
result.visited; // string array of unique states that have been visited
result.machine; // original machine description
```

### Demo

In the demo below, the driver is used to autonomously change states based on an 'energy' level, also affected by current activity.

<demo-element title="State machine driver" src="/flow/statemachine-agent/" />
