---
title: Espruino Puck.js
layout: ../../layouts/MainLayout.astro
---

[Espruino Puck.js](http://www.espruino.com/Puck.js) is an open-source platform
by Gordon Williams. Ixfx has a few functions to help communicating with Espruino
boards, but for the most part you write Javascript that runs on the board
itself.

It has on-board sensors, wireless connectivity and is battery powered. While it
does have the possibility for connecting additional components, the
[Pico](../espruino-pico/) is in a more friendly format.

<div class="tip">
<ul>
<li>API Reference <a href="https://clinth.github.io/ixfx/modules/Io.Espruino.html">Io.Espruino module</a></li>
<li>Parent <a href="https://clinth.github.io/ixfx/modules/Io.html">Io module</a></li>
<li>Official Espruino <a href="http://www.espruino.com/Reference#software">API Reference</a>, <a href="http://www.espruino.com/Tutorials">Tutorials</a></l>
</div>

### First steps

- [Preparing](http://www.espruino.com/Quick+Start+BLE) - Powering the Puck and
  getting the [Espruino IDE](http://www.espruino.com/Web+IDE) connected
- [Quick start - code](http://www.espruino.com/Quick+Start+Code) - First steps
  programming the Puck

### Playgrounds

- [repl](https://clinth.github.io/ixfx-play/io/espruino-repl/) -
  Execute code on the Puck.js. Useful for quick 'one-liners' to test syntax.
- [plot](https://clinth.github.io/ixfx-play/io/espruino-plot/) -
  Plots numerical data. Useful for seeing patterns and ranges of sensors.

## Demos

The prepared demos focus on using the Puck.js as an input or output to extend
the capabilities of the browser.

- [button](https://github.com/ClintH/ixfx-demos/tree/main/io/espruino/button) -
  Sends button press/release events to the browser
  ([try online](https://clinth.github.io/ixfx-demos/io/espruino/button/))
- [led](https://github.com/ClintH/ixfx-demos/tree/main/io/espruino/led) -
  Control the in-built LEDs from the browser
  ([try online](https://clinth.github.io/ixfx-demos/io/espruino/led/))
- [temperature](https://github.com/ClintH/ixfx-demos/tree/main/io/espruino/temperature) -
  Read temperature values in the browser
  ([try online](https://clinth.github.io/ixfx-demos/io/espruino/temperature/))
- [accel-gyro](https://github.com/ClintH/ixfx-demos/tree/main/io/espruino/accel-gyro) -
  Sends back a stream of acceleration & gyro data to the browser
  ([try online](https://clinth.github.io/ixfx-demos/io/espruino/accel-gyro/))

## Usage

To prompt to connect to any available Puck.js via BLE, use the
[`puck`](https://clinth.github.io/ixfx/functions/Io.Espruino.puck.html)
function, which returns an instance of
[EspruinoBleDevice](https://clinth.github.io/ixfx/classes/Io.Espruino.EspruinoBleDevice.html).

```js
import { Espruino } from "https://unpkg.com/ixfx/dist/io.js";
const e = await Espruino.puck();
```

Or to filter the list by name:

```js
import { Espruino } from "https://unpkg.com/ixfx/dist/io.js";
const e = await Espruino.puck({ name: `Puck.js a123` });
await e.connect();
```

An exception will be thrown if the user cancelled the scan, or something went
wrong.

Once connected, you can listen for _data_ and _change_ events. _data_ fires when
the Puck sends something, while _change_ fires when there is a change in the
connection status. This is useful for enabling/disabling parts of the UI, or
uploading some code on first connection.

```js
// Received data
e.addEventListener(`data`, (d) => console.log(d.data));

// Monitor connection state
e.addEventListener(
  `change`,
  (c) => console.log(`${d.priorState} -> ${d.newState}`),
);
```

[`writeScript`](https://clinth.github.io/ixfx/classes/Io.Espruino.EspruinoBleDevice.html#writeScript)
sends code for execution on the board. Note how the script is enclosed as a
string.

```js
e.writeScript(`
 setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
 NRF.on('disconnect',()=>reset());
`);
```

You probably want to test what code to send using the
[ixfx Espruino REPL](https://clinth.github.io/ixfx-play/io/espruino-repl/)
or the official [IDE](https://www.espruino.com/ide/).

`writeScript` does not support importing modules or other files via `require`.
Rather, upload your code using the official IDE, and then invoke a function
you've declared using ixfx's `writeScript` or `eval`.

To execute some code and await the result, use
[`eval`](https://clinth.github.io/ixfx/classes/Io.Espruino.EspruinoBleDevice.html#eval):

```js
const result = await e.eval(`2+2\n`);
// result will be the number 4
```

`eval` is useful for querying sensor values.

To check the state of the connection:

```js
e.isConnected;
```

And to disconnect:

```js
e.disconnect();
```

## Official resources

Below are some selected resources from Espruino.com.

Tutorials

- [Keyboard](http://www.espruino.com/BLE+Keyboard) - Send virtual keyboard
  events. Useful for leveraging an existing app for rapid prototyping
- [Music controller](http://www.espruino.com/BLE+Music+Control) - Use the BLE
  keyboard functionality to control media playback on a phone
- [MIDI](http://www.espruino.com/BLE+MIDI) - Send MIDI data
- [FET](http://www.espruino.com/Puck.js+FET) - Controlling a higher voltage
  device
- [Door controlled light](http://www.espruino.com/Puck.js+Door+Light) - Using
  the magnetometer to detect movement of an object (in this case, a door)
- [Temperature controlled night light](http://www.espruino.com/Puck.js+Night+Light) -
  Uses the IR-emitter of the Puck to control some off-the-shelf RGB lighting
  based on the temperature sensor.
- [Controlling Bluetooth devices](http://www.espruino.com/BLE+Lightbulbs) - An
  example of a Puck directly interfacing with another Bluetooth device - in this
  case some smart lighting

Guides

- [Pulse Width Modulation](http://www.espruino.com/PWM) - Controlled LED
  brightness
