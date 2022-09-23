---
title: State Machine
layout: ../../layouts/MainLayout.astro
setup: |
  import StateMachinePlay from './StateMachinePlay.astro';

---

<script type="module" hoist>
import '/src/components/ReplPad';
</script>

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Flow.StateMachine.StateMachine.html">StateMachine</a></li>
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

## Usage

<div class="tip"><ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/classes/Flow.StateMachine.StateMachine.html">StateMachine</a></li>
<li><a href="https://clinth.github.io/ixfx-demos/flow/">Online demos</a></li>
<li>Starter: <a href="https://github.com/ClintH/ixfx-demos/tree/main/flow/statemachine-starter">GitHub</a>, <a href="https://glitch.com/edit/#!/ixfx-starter-statemachine">Glitch</a>
</ul></div>

Create the machine with the an initial state and its _description_:

```js
const machine = StateMachine.create(initialState, description);
```

The machine description is a simple object that 1) lists all possible states (as its top-level properties), and 2) for each state, what other state(s) can be transitioned to, or `null` if it is a final state.

The following example has four possible states (`wakeup, sleep, coffee, breakfast, bike`). `sleep` can only transition to the `wakeup` state, while `wakeup` can transition to either `coffee` or `breakfast`. 

Use _null_ to signify the final state. Multiple states can terminate the machine if desired.

```js
// repl-pad#1
import { StateMachine } from "https://unpkg.com/ixfx/dist/flow.js"

const description = { 
 sleep: 'wakeup',
 wakeup: ['coffee', 'breakfast'],
 coffee: `bike`,
 breakfast: `bike`,
 bike: null
}
const machine = StateMachine.create(`sleep`, description);
```

### Changing state

Change the state by name:

```js
// repl-pad#1
machine.state = `wakeup`
```

Or request an automatic transition. If there are several states which could be to changed to, it will always use the first.

```js
// repl-pad#1
machine.next();
```

Reset the machine back to its initial state with `reset()`. This is the only way to continue after reaching the final state.

```js
// repl-pad#1
machine.reset();
```

### Status

Check status

```js
if (machine.state === `coffee`) ...
if (machine.isDone) ...
```

The `change` event is fired whenever state changes, and `stop` when the machine reaches a final state.

```js
machine.addEventListener(`change`, (evt) => {
 console.log(`State change from ${evt.priorState} -> ${evt.newState}`);

 // Prints for example:
 // State change from wakeup -> breakfast
});

machine.addEventListener(`stop`, (evt) => {
 console.log(`Machine has finished in state: ${evt.newState}`);
});
```



