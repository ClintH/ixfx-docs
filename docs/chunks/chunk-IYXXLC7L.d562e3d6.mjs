// src/util/GuardThrowFromResult.ts
var throwFromResult = (test) => {
  if (test[0]) return false;
  else throw new Error(test[1]);
};

// src/util/GuardNumbers.ts
var isPowerOfTwo = (x) => Math.log2(x) % 1 === 0;
var ifNaN = (v, fallback) => {
  if (Number.isNaN(v)) return fallback;
  if (typeof v !== `number`) {
    throw new TypeError(`v is not a number. Got: ${typeof v}`);
  }
  return v;
};
var integerParse = (value, range = ``, defaultValue = Number.NaN) => {
  if (value === void 0) return defaultValue;
  if (value === null) return defaultValue;
  try {
    const parsed = Number.parseInt(value);
    const r = integerTest(parsed, range, `parsed`);
    return r[0] ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
  return Number.parseInt(value);
};
var numberTest = (value, range = ``, parameterName = `?`) => {
  if (value === null) return [false, `Parameter '${parameterName}' is null`];
  if (typeof value === `undefined`) {
    return [false, `Parameter '${parameterName}' is undefined`];
  }
  if (Number.isNaN(value)) {
    return [false, `Parameter '${parameterName}' is NaN`];
  }
  if (typeof value !== `number`) {
    return [false, `Parameter '${parameterName}' is not a number (${JSON.stringify(value)})`];
  }
  switch (range) {
    case `positive`: {
      if (value < 0) {
        return [false, `Parameter '${parameterName}' must be at least zero (${value})`];
      }
      break;
    }
    case `negative`: {
      if (value > 0) {
        return [false, `Parameter '${parameterName}' must be zero or lower (${value})`];
      }
      break;
    }
    case `aboveZero`: {
      if (value <= 0) {
        return [false, `Parameter '${parameterName}' must be above zero (${value})`];
      }
      break;
    }
    case `belowZero`: {
      if (value >= 0) {
        return [false, `Parameter '${parameterName}' must be below zero (${value})`];
      }
      break;
    }
    case `percentage`: {
      if (value > 1 || value < 0) {
        return [false, `Parameter '${parameterName}' must be in percentage range (0 to 1). (${value})`];
      }
      break;
    }
    case `nonZero`: {
      if (value === 0) {
        return [false, `Parameter '${parameterName}' must non-zero. (${value})`];
      }
      break;
    }
    case `bipolar`: {
      if (value > 1 || value < -1) {
        return [false, `Parameter '${parameterName}' must be in bipolar percentage range (-1 to 1). (${value})`];
      }
      break;
    }
  }
  return [true];
};
var throwNumberTest = (value, range = ``, parameterName = `?`) => {
  throwFromResult(numberTest(value, range, parameterName));
};
var percentTest = (value, parameterName = `?`) => numberTest(value, `percentage`, parameterName);
var throwPercentTest = (value, parameterName = `?`) => {
  throwFromResult(percentTest(value, parameterName));
};
var integerTest = (value, range = ``, parameterName = `?`) => {
  const r = numberTest(value, range, parameterName);
  if (!r[0]) return r;
  if (!Number.isInteger(value)) {
    return [false, `Parameter ${parameterName} is not an integer`];
  }
  return [true];
};
var throwIntegerTest = (value, range = ``, parameterName = `?`) => {
  throwFromResult(integerTest(value, range, parameterName));
};

// src/geometry/point/Guard.ts
var isNull = (p) => p.x === null && p.y === null;
var isNaN$1 = (p) => Number.isNaN(p.x) || Number.isNaN(p.y);
function guard$1(p, name = `Point`) {
  if (p === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p === null) {
    throw new Error(
      `'${name}' is null. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p.x === void 0) {
    throw new Error(
      `'${name}.x' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (p.y === void 0) {
    throw new Error(
      `'${name}.y' is undefined. Expected {x,y} got ${JSON.stringify(p)}`
    );
  }
  if (typeof p.x !== `number`) {
    throw new TypeError(`'${name}.x' must be a number. Got ${p.x}`);
  }
  if (typeof p.y !== `number`) {
    throw new TypeError(`'${name}.y' must be a number. Got ${p.y}`);
  }
  if (p.x === null) throw new Error(`'${name}.x' is null`);
  if (p.y === null) throw new Error(`'${name}.y' is null`);
  if (Number.isNaN(p.x)) throw new Error(`'${name}.x' is NaN`);
  if (Number.isNaN(p.y)) throw new Error(`'${name}.y' is NaN`);
}
var guardNonZeroPoint = (pt, name = `pt`) => {
  guard$1(pt, name);
  throwNumberTest(pt.x, `nonZero`, `${name}.x`);
  throwNumberTest(pt.y, `nonZero`, `${name}.y`);
  if (typeof pt.z !== `undefined`) {
    throwNumberTest(pt.z, `nonZero`, `${name}.z`);
  }
  return true;
};
function isPoint(p) {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  return true;
}
var isPoint3d = (p) => {
  if (p === void 0) return false;
  if (p === null) return false;
  if (p.x === void 0) return false;
  if (p.y === void 0) return false;
  if (p.z === void 0) return false;
  return true;
};
var isEmpty$2 = (p) => p.x === 0 && p.y === 0;
var isPlaceholder = (p) => Number.isNaN(p.x) && Number.isNaN(p.y);

// src/geometry/line/FromPoints.ts
var fromPoints = (a, b) => {
  guard$1(a, `a`);
  guard$1(b, `b`);
  a = Object.freeze({ ...a });
  b = Object.freeze({ ...b });
  return Object.freeze({
    a,
    b
  });
};

// src/geometry/line/FromNumbers.ts
var fromNumbers = (x1, y1, x2, y2) => {
  if (Number.isNaN(x1)) throw new Error(`x1 is NaN`);
  if (Number.isNaN(x2)) throw new Error(`x2 is NaN`);
  if (Number.isNaN(y1)) throw new Error(`y1 is NaN`);
  if (Number.isNaN(y2)) throw new Error(`y2 is NaN`);
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  return fromPoints(a, b);
};

// src/data/Clamp.ts
var clamp = (value, min = 0, max = 1) => {
  if (Number.isNaN(value)) throw new Error(`'value' parameter is NaN`);
  if (Number.isNaN(min)) throw new Error(`'min' parameter is NaN`);
  if (Number.isNaN(max)) throw new Error(`'max' parameter is NaN`);
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
var clampIndex = (v, arrayOrLength) => {
  if (!Number.isInteger(v)) {
    throw new TypeError(`v parameter must be an integer (${v})`);
  }
  const length = Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength;
  if (!Number.isInteger(length)) {
    throw new TypeError(
      `length parameter must be an integer (${length}, ${typeof length})`
    );
  }
  v = Math.round(v);
  if (v < 0) return 0;
  if (v >= length) return length - 1;
  return v;
};

// src/collections/arrays/GuardArray.ts
var guardArray = (array, name = `?`) => {
  if (array === void 0) {
    throw new TypeError(`Param '${name}' is undefined. Expected array.`);
  }
  if (array === null) {
    throw new TypeError(`Param '${name}' is null. Expected array.`);
  }
  if (!Array.isArray(array)) {
    throw new TypeError(`Param '${name}' not an array as expected`);
  }
};

// src/collections/arrays/Pairwise.ts
function* pairwise(values) {
  guardArray(values, `values`);
  if (values.length < 2) throw new Error(`Array needs to have at least two entries. Length: ${values.length}`);
  for (let index = 1; index < values.length; index++) {
    yield [values[index - 1], values[index]];
  }
}
var pairwiseReduce = (array, reducer, initial) => {
  guardArray(array, `arr`);
  if (array.length < 2) return initial;
  for (let index = 0; index < array.length - 1; index++) {
    initial = reducer(initial, array[index], array[index + 1]);
  }
  return initial;
};

// src/random/Types.ts
var defaultRandom = Math.random;

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/data/Scale.ts
var scale = (v, inMin, inMax, outMin, outMax, easing) => scaler$1(inMin, inMax, outMin, outMax, easing)(v);
var scaler$1 = (inMin, inMax, outMin, outMax, easing) => {
  const oMax = outMax ?? 1;
  const oMin = outMin ?? 0;
  return (v) => {
    if (inMin === inMax) return oMax;
    let a2 = (v - inMin) / (inMax - inMin);
    if (easing !== void 0) a2 = easing(a2);
    return a2 * (oMax - oMin) + oMin;
  };
};
var scaleClamped = (v, inMin, inMax, outMin, outMax, easing) => {
  if (outMax === void 0) outMax = 1;
  if (outMin === void 0) outMin = 0;
  if (inMin === inMax) return outMax;
  const x = scale(v, inMin, inMax, outMin, outMax, easing);
  return clamp(x, outMin, outMax);
};
var scalePercentages = (percentage, outMin, outMax = 1) => {
  throwNumberTest(percentage, `percentage`, `v`);
  throwNumberTest(outMin, `percentage`, `outMin`);
  throwNumberTest(outMax, `percentage`, `outMax`);
  return scale(percentage, 0, 1, outMin, outMax);
};
var scalePercent = (v, outMin, outMax) => scalerPercent(outMin, outMax)(v);
var scalerPercent = (outMin, outMax) => {
  return (v) => {
    throwNumberTest(v, `percentage`, `v`);
    return scale(v, 0, 1, outMin, outMax);
  };
};

// src/visual/Colour.ts
var Colour_exports = {};
__export(Colour_exports, {
  cssLinearGradient: () => cssLinearGradient,
  fromHsla: () => fromHsla,
  getCssVariable: () => getCssVariable,
  goldenAngleColour: () => goldenAngleColour,
  interpolator: () => interpolator,
  opacity: () => opacity,
  randomHue: () => randomHue,
  resolve: () => resolve,
  resolveToString: () => resolveToString,
  scale: () => scale3,
  toHex: () => toHex,
  toHsl: () => toHsl,
  toHsla: () => toHsla,
  toRgb: () => toRgb,
  toString: () => toString$3
});

// node_modules/colorjs.io/dist/color.js
function multiplyMatrices(A, B) {
  let m3 = A.length;
  if (!Array.isArray(A[0])) {
    A = [A];
  }
  if (!Array.isArray(B[0])) {
    B = B.map((x) => [x]);
  }
  let p2 = B[0].length;
  let B_cols = B[0].map((_, i) => B.map((x) => x[i]));
  let product = A.map((row) => B_cols.map((col) => {
    let ret = 0;
    if (!Array.isArray(row)) {
      for (let c4 of col) {
        ret += row * c4;
      }
      return ret;
    }
    for (let i = 0; i < row.length; i++) {
      ret += row[i] * (col[i] || 0);
    }
    return ret;
  }));
  if (m3 === 1) {
    product = product[0];
  }
  if (p2 === 1) {
    return product.map((x) => x[0]);
  }
  return product;
}
function isString(str) {
  return type(str) === "string";
}
function type(o) {
  let str = Object.prototype.toString.call(o);
  return (str.match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
}
function serializeNumber(n2, { precision, unit }) {
  if (isNone(n2)) {
    return "none";
  }
  return toPrecision(n2, precision) + (unit ?? "");
}
function isNone(n2) {
  return Number.isNaN(n2) || n2 instanceof Number && n2?.none;
}
function skipNone(n2) {
  return isNone(n2) ? 0 : n2;
}
function toPrecision(n2, precision) {
  if (n2 === 0) {
    return 0;
  }
  let integer = ~~n2;
  let digits = 0;
  if (integer && precision) {
    digits = ~~Math.log10(Math.abs(integer)) + 1;
  }
  const multiplier = 10 ** (precision - digits);
  return Math.floor(n2 * multiplier + 0.5) / multiplier;
}
var angleFactor = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
};
function parseFunction(str) {
  if (!str) {
    return;
  }
  str = str.trim();
  const isFunctionRegex = /^([a-z]+)\((.+?)\)$/i;
  const isNumberRegex = /^-?[\d.]+$/;
  const unitValueRegex = /%|deg|g?rad|turn$/;
  const singleArgument = /\/?\s*(none|[-\w.]+(?:%|deg|g?rad|turn)?)/g;
  let parts = str.match(isFunctionRegex);
  if (parts) {
    let args = [];
    parts[2].replace(singleArgument, ($0, rawArg) => {
      let match = rawArg.match(unitValueRegex);
      let arg = rawArg;
      if (match) {
        let unit = match[0];
        let unitlessArg = arg.slice(0, -unit.length);
        if (unit === "%") {
          arg = new Number(unitlessArg / 100);
          arg.type = "<percentage>";
        } else {
          arg = new Number(unitlessArg * angleFactor[unit]);
          arg.type = "<angle>";
          arg.unit = unit;
        }
      } else if (isNumberRegex.test(arg)) {
        arg = new Number(arg);
        arg.type = "<number>";
      } else if (arg === "none") {
        arg = new Number(NaN);
        arg.none = true;
      }
      if ($0.startsWith("/")) {
        arg = arg instanceof Number ? arg : new Number(arg);
        arg.alpha = true;
      }
      if (typeof arg === "object" && arg instanceof Number) {
        arg.raw = rawArg;
      }
      args.push(arg);
    });
    return {
      name: parts[1].toLowerCase(),
      rawName: parts[1],
      rawArgs: parts[2],
      // An argument could be (as of css-color-4):
      // a number, percentage, degrees (hue), ident (in color())
      args
    };
  }
}
function last$1(arr) {
  return arr[arr.length - 1];
}
function interpolate$2(start, end, p2) {
  if (isNaN(start)) {
    return end;
  }
  if (isNaN(end)) {
    return start;
  }
  return start + (end - start) * p2;
}
function interpolateInv(start, end, value) {
  return (value - start) / (end - start);
}
function mapRange(from, to2, value) {
  return interpolate$2(to2[0], to2[1], interpolateInv(from[0], from[1], value));
}
function parseCoordGrammar(coordGrammars) {
  return coordGrammars.map((coordGrammar2) => {
    return coordGrammar2.split("|").map((type2) => {
      type2 = type2.trim();
      let range2 = type2.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
      if (range2) {
        let ret = new String(range2[1]);
        ret.range = [+range2[2], +range2[3]];
        return ret;
      }
      return type2;
    });
  });
}
function clamp2$2(min, val, max2) {
  return Math.max(Math.min(max2, val), min);
}
function copySign(to2, from) {
  return Math.sign(to2) === Math.sign(from) ? to2 : -to2;
}
function spow(base, exp) {
  return copySign(Math.abs(base) ** exp, base);
}
function zdiv(n2, d2) {
  return d2 === 0 ? 0 : n2 / d2;
}
function bisectLeft(arr, value, lo = 0, hi = arr.length) {
  while (lo < hi) {
    const mid = lo + hi >> 1;
    if (arr[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
var util = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  bisectLeft,
  clamp: clamp2$2,
  copySign,
  interpolate: interpolate$2,
  interpolateInv,
  isNone,
  isString,
  last: last$1,
  mapRange,
  multiplyMatrices,
  parseCoordGrammar,
  parseFunction,
  serializeNumber,
  skipNone,
  spow,
  toPrecision,
  type,
  zdiv
});
var Hooks = class {
  add(name, callback, first) {
    if (typeof arguments[0] != "string") {
      for (var name in arguments[0]) {
        this.add(name, arguments[0][name], arguments[1]);
      }
      return;
    }
    (Array.isArray(name) ? name : [name]).forEach(function(name2) {
      this[name2] = this[name2] || [];
      if (callback) {
        this[name2][first ? "unshift" : "push"](callback);
      }
    }, this);
  }
  run(name, env) {
    this[name] = this[name] || [];
    this[name].forEach(function(callback) {
      callback.call(env && env.context ? env.context : env, env);
    });
  }
};
var hooks = new Hooks();
var defaults = {
  gamut_mapping: "css",
  precision: 5,
  deltaE: "76",
  // Default deltaE method
  verbose: globalThis?.process?.env?.NODE_ENV?.toLowerCase() !== "test",
  warn: function warn(msg) {
    if (this.verbose) {
      globalThis?.console?.warn?.(msg);
    }
  }
};
var WHITES = {
  // for compatibility, the four-digit chromaticity-derived ones everyone else uses
  D50: [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585],
  D65: [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329]
};
function getWhite(name) {
  if (Array.isArray(name)) {
    return name;
  }
  return WHITES[name];
}
function adapt$2(W1, W2, XYZ, options = {}) {
  W1 = getWhite(W1);
  W2 = getWhite(W2);
  if (!W1 || !W2) {
    throw new TypeError(`Missing white point to convert ${!W1 ? "from" : ""}${!W1 && !W2 ? "/" : ""}${!W2 ? "to" : ""}`);
  }
  if (W1 === W2) {
    return XYZ;
  }
  let env = { W1, W2, XYZ, options };
  hooks.run("chromatic-adaptation-start", env);
  if (!env.M) {
    if (env.W1 === WHITES.D65 && env.W2 === WHITES.D50) {
      env.M = [
        [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
        [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
        [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371]
      ];
    } else if (env.W1 === WHITES.D50 && env.W2 === WHITES.D65) {
      env.M = [
        [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
        [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
        [0.012314014864481998, -0.020507649298898964, 1.330365926242124]
      ];
    }
  }
  hooks.run("chromatic-adaptation-end", env);
  if (env.M) {
    return multiplyMatrices(env.M, env.XYZ);
  } else {
    throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
  }
}
var noneTypes = /* @__PURE__ */ new Set(["<number>", "<percentage>", "<angle>"]);
function coerceCoords(space, format, name, coords) {
  let types = Object.entries(space.coords).map(([id, coordMeta], i) => {
    let coordGrammar2 = format.coordGrammar[i];
    let arg = coords[i];
    let providedType = arg?.type;
    let type2;
    if (arg.none) {
      type2 = coordGrammar2.find((c4) => noneTypes.has(c4));
    } else {
      type2 = coordGrammar2.find((c4) => c4 == providedType);
    }
    if (!type2) {
      let coordName = coordMeta.name || id;
      throw new TypeError(`${providedType ?? arg.raw} not allowed for ${coordName} in ${name}()`);
    }
    let fromRange = type2.range;
    if (providedType === "<percentage>") {
      fromRange ||= [0, 1];
    }
    let toRange = coordMeta.range || coordMeta.refRange;
    if (fromRange && toRange) {
      coords[i] = mapRange(fromRange, toRange, coords[i]);
    }
    return type2;
  });
  return types;
}
function parse(str, { meta } = {}) {
  let env = { "str": String(str)?.trim() };
  hooks.run("parse-start", env);
  if (env.color) {
    return env.color;
  }
  env.parsed = parseFunction(env.str);
  if (env.parsed) {
    let name = env.parsed.name;
    if (name === "color") {
      let id = env.parsed.args.shift();
      let alternateId = id.startsWith("--") ? id.substring(2) : `--${id}`;
      let ids = [id, alternateId];
      let alpha = env.parsed.rawArgs.indexOf("/") > 0 ? env.parsed.args.pop() : 1;
      for (let space of ColorSpace.all) {
        let colorSpec = space.getFormat("color");
        if (colorSpec) {
          if (ids.includes(colorSpec.id) || colorSpec.ids?.filter((specId) => ids.includes(specId)).length) {
            const coords = Object.keys(space.coords).map((_, i) => env.parsed.args[i] || 0);
            let types;
            if (colorSpec.coordGrammar) {
              types = coerceCoords(space, colorSpec, "color", coords);
            }
            if (meta) {
              Object.assign(meta, { formatId: "color", types });
            }
            if (colorSpec.id.startsWith("--") && !id.startsWith("--")) {
              defaults.warn(`${space.name} is a non-standard space and not currently supported in the CSS spec. Use prefixed color(${colorSpec.id}) instead of color(${id}).`);
            }
            if (id.startsWith("--") && !colorSpec.id.startsWith("--")) {
              defaults.warn(`${space.name} is a standard space and supported in the CSS spec. Use color(${colorSpec.id}) instead of prefixed color(${id}).`);
            }
            return { spaceId: space.id, coords, alpha };
          }
        }
      }
      let didYouMean = "";
      let registryId = id in ColorSpace.registry ? id : alternateId;
      if (registryId in ColorSpace.registry) {
        let cssId = ColorSpace.registry[registryId].formats?.color?.id;
        if (cssId) {
          didYouMean = `Did you mean color(${cssId})?`;
        }
      }
      throw new TypeError(`Cannot parse color(${id}). ` + (didYouMean || "Missing a plugin?"));
    } else {
      for (let space of ColorSpace.all) {
        let format = space.getFormat(name);
        if (format && format.type === "function") {
          let alpha = 1;
          if (format.lastAlpha || last$1(env.parsed.args).alpha) {
            alpha = env.parsed.args.pop();
          }
          let coords = env.parsed.args;
          let types;
          if (format.coordGrammar) {
            types = coerceCoords(space, format, name, coords);
          }
          if (meta) {
            Object.assign(meta, { formatId: format.name, types });
          }
          return {
            spaceId: space.id,
            coords,
            alpha
          };
        }
      }
    }
  } else {
    for (let space of ColorSpace.all) {
      for (let formatId in space.formats) {
        let format = space.formats[formatId];
        if (format.type !== "custom") {
          continue;
        }
        if (format.test && !format.test(env.str)) {
          continue;
        }
        let color = format.parse(env.str);
        if (color) {
          color.alpha ??= 1;
          if (meta) {
            meta.formatId = formatId;
          }
          return color;
        }
      }
    }
  }
  throw new TypeError(`Could not parse ${str} as a color. Missing a plugin?`);
}
function getColor(color) {
  if (Array.isArray(color)) {
    return color.map(getColor);
  }
  if (!color) {
    throw new TypeError("Empty color reference");
  }
  if (isString(color)) {
    color = parse(color);
  }
  let space = color.space || color.spaceId;
  if (!(space instanceof ColorSpace)) {
    color.space = ColorSpace.get(space);
  }
  if (color.alpha === void 0) {
    color.alpha = 1;
  }
  return color;
}
var \u03B5$7 = 75e-6;
var ColorSpace = class _ColorSpace {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.base = options.base ? _ColorSpace.get(options.base) : null;
    this.aliases = options.aliases;
    if (this.base) {
      this.fromBase = options.fromBase;
      this.toBase = options.toBase;
    }
    let coords = options.coords ?? this.base.coords;
    for (let name in coords) {
      if (!("name" in coords[name])) {
        coords[name].name = name;
      }
    }
    this.coords = coords;
    let white2 = options.white ?? this.base.white ?? "D65";
    this.white = getWhite(white2);
    this.formats = options.formats ?? {};
    for (let name in this.formats) {
      let format = this.formats[name];
      format.type ||= "function";
      format.name ||= name;
    }
    if (!this.formats.color?.id) {
      this.formats.color = {
        ...this.formats.color ?? {},
        id: options.cssId || this.id
      };
    }
    if (options.gamutSpace) {
      this.gamutSpace = options.gamutSpace === "self" ? this : _ColorSpace.get(options.gamutSpace);
    } else {
      if (this.isPolar) {
        this.gamutSpace = this.base;
      } else {
        this.gamutSpace = this;
      }
    }
    if (this.gamutSpace.isUnbounded) {
      this.inGamut = (coords2, options2) => {
        return true;
      };
    }
    this.referred = options.referred;
    Object.defineProperty(this, "path", {
      value: getPath(this).reverse(),
      writable: false,
      enumerable: true,
      configurable: true
    });
    hooks.run("colorspace-init-end", this);
  }
  inGamut(coords, { epsilon = \u03B5$7 } = {}) {
    if (!this.equals(this.gamutSpace)) {
      coords = this.to(this.gamutSpace, coords);
      return this.gamutSpace.inGamut(coords, { epsilon });
    }
    let coordMeta = Object.values(this.coords);
    return coords.every((c4, i) => {
      let meta = coordMeta[i];
      if (meta.type !== "angle" && meta.range) {
        if (Number.isNaN(c4)) {
          return true;
        }
        let [min, max2] = meta.range;
        return (min === void 0 || c4 >= min - epsilon) && (max2 === void 0 || c4 <= max2 + epsilon);
      }
      return true;
    });
  }
  get isUnbounded() {
    return Object.values(this.coords).every((coord) => !("range" in coord));
  }
  get cssId() {
    return this.formats?.color?.id || this.id;
  }
  get isPolar() {
    for (let id in this.coords) {
      if (this.coords[id].type === "angle") {
        return true;
      }
    }
    return false;
  }
  getFormat(format) {
    if (typeof format === "object") {
      format = processFormat(format, this);
      return format;
    }
    let ret;
    if (format === "default") {
      ret = Object.values(this.formats)[0];
    } else {
      ret = this.formats[format];
    }
    if (ret) {
      ret = processFormat(ret, this);
      return ret;
    }
    return null;
  }
  /**
   * Check if this color space is the same as another color space reference.
   * Allows proxying color space objects and comparing color spaces with ids.
   * @param {string | ColorSpace} space ColorSpace object or id to compare to
   * @returns {boolean}
   */
  equals(space) {
    if (!space) {
      return false;
    }
    return this === space || this.id === space || this.id === space.id;
  }
  to(space, coords) {
    if (arguments.length === 1) {
      const color = getColor(space);
      [space, coords] = [color.space, color.coords];
    }
    space = _ColorSpace.get(space);
    if (this.equals(space)) {
      return coords;
    }
    coords = coords.map((c4) => Number.isNaN(c4) ? 0 : c4);
    let myPath = this.path;
    let otherPath = space.path;
    let connectionSpace, connectionSpaceIndex;
    for (let i = 0; i < myPath.length; i++) {
      if (myPath[i].equals(otherPath[i])) {
        connectionSpace = myPath[i];
        connectionSpaceIndex = i;
      } else {
        break;
      }
    }
    if (!connectionSpace) {
      throw new Error(`Cannot convert between color spaces ${this} and ${space}: no connection space was found`);
    }
    for (let i = myPath.length - 1; i > connectionSpaceIndex; i--) {
      coords = myPath[i].toBase(coords);
    }
    for (let i = connectionSpaceIndex + 1; i < otherPath.length; i++) {
      coords = otherPath[i].fromBase(coords);
    }
    return coords;
  }
  from(space, coords) {
    if (arguments.length === 1) {
      const color = getColor(space);
      [space, coords] = [color.space, color.coords];
    }
    space = _ColorSpace.get(space);
    return space.to(this, coords);
  }
  toString() {
    return `${this.name} (${this.id})`;
  }
  getMinCoords() {
    let ret = [];
    for (let id in this.coords) {
      let meta = this.coords[id];
      let range2 = meta.range || meta.refRange;
      ret.push(range2?.min ?? 0);
    }
    return ret;
  }
  static registry = {};
  // Returns array of unique color spaces
  static get all() {
    return [...new Set(Object.values(_ColorSpace.registry))];
  }
  static register(id, space) {
    if (arguments.length === 1) {
      space = arguments[0];
      id = space.id;
    }
    space = this.get(space);
    if (this.registry[id] && this.registry[id] !== space) {
      throw new Error(`Duplicate color space registration: '${id}'`);
    }
    this.registry[id] = space;
    if (arguments.length === 1 && space.aliases) {
      for (let alias of space.aliases) {
        this.register(alias, space);
      }
    }
    return space;
  }
  /**
   * Lookup ColorSpace object by name
   * @param {ColorSpace | string} name
   */
  static get(space, ...alternatives) {
    if (!space || space instanceof _ColorSpace) {
      return space;
    }
    let argType = type(space);
    if (argType === "string") {
      let ret = _ColorSpace.registry[space.toLowerCase()];
      if (!ret) {
        throw new TypeError(`No color space found with id = "${space}"`);
      }
      return ret;
    }
    if (alternatives.length) {
      return _ColorSpace.get(...alternatives);
    }
    throw new TypeError(`${space} is not a valid color space`);
  }
  /**
   * Get metadata about a coordinate of a color space
   *
   * @static
   * @param {Array | string} ref
   * @param {ColorSpace | string} [workingSpace]
   * @return {Object}
   */
  static resolveCoord(ref, workingSpace) {
    let coordType = type(ref);
    let space, coord;
    if (coordType === "string") {
      if (ref.includes(".")) {
        [space, coord] = ref.split(".");
      } else {
        [space, coord] = [, ref];
      }
    } else if (Array.isArray(ref)) {
      [space, coord] = ref;
    } else {
      space = ref.space;
      coord = ref.coordId;
    }
    space = _ColorSpace.get(space);
    if (!space) {
      space = workingSpace;
    }
    if (!space) {
      throw new TypeError(`Cannot resolve coordinate reference ${ref}: No color space specified and relative references are not allowed here`);
    }
    coordType = type(coord);
    if (coordType === "number" || coordType === "string" && coord >= 0) {
      let meta = Object.entries(space.coords)[coord];
      if (meta) {
        return { space, id: meta[0], index: coord, ...meta[1] };
      }
    }
    space = _ColorSpace.get(space);
    let normalizedCoord = coord.toLowerCase();
    let i = 0;
    for (let id in space.coords) {
      let meta = space.coords[id];
      if (id.toLowerCase() === normalizedCoord || meta.name?.toLowerCase() === normalizedCoord) {
        return { space, id, index: i, ...meta };
      }
      i++;
    }
    throw new TypeError(`No "${coord}" coordinate found in ${space.name}. Its coordinates are: ${Object.keys(space.coords).join(", ")}`);
  }
  static DEFAULT_FORMAT = {
    type: "functions",
    name: "color"
  };
};
function getPath(space) {
  let ret = [space];
  for (let s = space; s = s.base; ) {
    ret.push(s);
  }
  return ret;
}
function processFormat(format, { coords } = {}) {
  if (format.coords && !format.coordGrammar) {
    format.type ||= "function";
    format.name ||= "color";
    format.coordGrammar = parseCoordGrammar(format.coords);
    let coordFormats = Object.entries(coords).map(([id, coordMeta], i) => {
      let outputType = format.coordGrammar[i][0];
      let fromRange = coordMeta.range || coordMeta.refRange;
      let toRange = outputType.range, suffix = "";
      if (outputType == "<percentage>") {
        toRange = [0, 100];
        suffix = "%";
      } else if (outputType == "<angle>") {
        suffix = "deg";
      }
      return { fromRange, toRange, suffix };
    });
    format.serializeCoords = (coords2, precision) => {
      return coords2.map((c4, i) => {
        let { fromRange, toRange, suffix } = coordFormats[i];
        if (fromRange && toRange) {
          c4 = mapRange(fromRange, toRange, c4);
        }
        c4 = serializeNumber(c4, { precision, unit: suffix });
        return c4;
      });
    };
  }
  return format;
}
var xyz_d65 = new ColorSpace({
  id: "xyz-d65",
  name: "XYZ D65",
  coords: {
    x: { name: "X" },
    y: { name: "Y" },
    z: { name: "Z" }
  },
  white: "D65",
  formats: {
    color: {
      ids: ["xyz-d65", "xyz"]
    }
  },
  aliases: ["xyz"]
});
var RGBColorSpace = class extends ColorSpace {
  /**
   * Creates a new RGB ColorSpace.
   * If coords are not specified, they will use the default RGB coords.
   * Instead of `fromBase()` and `toBase()` functions,
   * you can specify to/from XYZ matrices and have `toBase()` and `fromBase()` automatically generated.
   * @param {*} options - Same options as {@link ColorSpace} plus:
   * @param {number[][]} options.toXYZ_M - Matrix to convert to XYZ
   * @param {number[][]} options.fromXYZ_M - Matrix to convert from XYZ
   */
  constructor(options) {
    if (!options.coords) {
      options.coords = {
        r: {
          range: [0, 1],
          name: "Red"
        },
        g: {
          range: [0, 1],
          name: "Green"
        },
        b: {
          range: [0, 1],
          name: "Blue"
        }
      };
    }
    if (!options.base) {
      options.base = xyz_d65;
    }
    if (options.toXYZ_M && options.fromXYZ_M) {
      options.toBase ??= (rgb) => {
        let xyz = multiplyMatrices(options.toXYZ_M, rgb);
        if (this.white !== this.base.white) {
          xyz = adapt$2(this.white, this.base.white, xyz);
        }
        return xyz;
      };
      options.fromBase ??= (xyz) => {
        xyz = adapt$2(this.base.white, this.white, xyz);
        return multiplyMatrices(options.fromXYZ_M, xyz);
      };
    }
    options.referred ??= "display";
    super(options);
  }
};
function getAll(color, space) {
  color = getColor(color);
  if (!space || color.space.equals(space)) {
    return color.coords.slice();
  }
  space = ColorSpace.get(space);
  return space.from(color);
}
function get$1(color, prop) {
  color = getColor(color);
  let { space, index } = ColorSpace.resolveCoord(prop, color.space);
  let coords = getAll(color, space);
  return coords[index];
}
function setAll(color, space, coords) {
  color = getColor(color);
  space = ColorSpace.get(space);
  color.coords = space.to(color.space, coords);
  return color;
}
setAll.returns = "color";
function set$1(color, prop, value) {
  color = getColor(color);
  if (arguments.length === 2 && type(arguments[1]) === "object") {
    let object = arguments[1];
    for (let p2 in object) {
      set$1(color, p2, object[p2]);
    }
  } else {
    if (typeof value === "function") {
      value = value(get$1(color, prop));
    }
    let { space, index } = ColorSpace.resolveCoord(prop, color.space);
    let coords = getAll(color, space);
    coords[index] = value;
    setAll(color, space, coords);
  }
  return color;
}
set$1.returns = "color";
var XYZ_D50 = new ColorSpace({
  id: "xyz-d50",
  name: "XYZ D50",
  white: "D50",
  base: xyz_d65,
  fromBase: (coords) => adapt$2(xyz_d65.white, "D50", coords),
  toBase: (coords) => adapt$2("D50", xyz_d65.white, coords)
});
var \u03B5$6 = 216 / 24389;
var \u03B53$1 = 24 / 116;
var \u03BA$4 = 24389 / 27;
var white$4 = WHITES.D50;
var lab = new ColorSpace({
  id: "lab",
  name: "Lab",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D50, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: white$4,
  base: XYZ_D50,
  // Convert D50-adapted XYX to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(XYZ) {
    let xyz = XYZ.map((value, i) => value / white$4[i]);
    let f = xyz.map((value) => value > \u03B5$6 ? Math.cbrt(value) : (\u03BA$4 * value + 16) / 116);
    return [
      116 * f[1] - 16,
      // L
      500 * (f[0] - f[1]),
      // a
      200 * (f[1] - f[2])
      // b
    ];
  },
  // Convert Lab to D50-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(Lab) {
    let f = [];
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    let xyz = [
      f[0] > \u03B53$1 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA$4,
      Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA$4,
      f[2] > \u03B53$1 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA$4
    ];
    return xyz.map((value, i) => value * white$4[i]);
  },
  formats: {
    "lab": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function constrain(angle) {
  return (angle % 360 + 360) % 360;
}
function adjust(arc, angles) {
  if (arc === "raw") {
    return angles;
  }
  let [a1, a2] = angles.map(constrain);
  let angleDiff = a2 - a1;
  if (arc === "increasing") {
    if (angleDiff < 0) {
      a2 += 360;
    }
  } else if (arc === "decreasing") {
    if (angleDiff > 0) {
      a1 += 360;
    }
  } else if (arc === "longer") {
    if (-180 < angleDiff && angleDiff < 180) {
      if (angleDiff > 0) {
        a1 += 360;
      } else {
        a2 += 360;
      }
    }
  } else if (arc === "shorter") {
    if (angleDiff > 180) {
      a1 += 360;
    } else if (angleDiff < -180) {
      a2 += 360;
    }
  }
  return [a1, a2];
}
var lch = new ColorSpace({
  id: "lch",
  name: "LCH",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 150],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: lab,
  fromBase(Lab) {
    let [L, a2, b2] = Lab;
    let hue;
    const \u03B52 = 0.02;
    if (Math.abs(a2) < \u03B52 && Math.abs(b2) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(b2, a2) * 180 / Math.PI;
    }
    return [
      L,
      // L is still L
      Math.sqrt(a2 ** 2 + b2 ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(LCH) {
    let [Lightness, Chroma, Hue] = LCH;
    if (Chroma < 0) {
      Chroma = 0;
    }
    if (isNaN(Hue)) {
      Hue = 0;
    }
    return [
      Lightness,
      // L is still L
      Chroma * Math.cos(Hue * Math.PI / 180),
      // a
      Chroma * Math.sin(Hue * Math.PI / 180)
      // b
    ];
  },
  formats: {
    "lch": {
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
var Gfactor = 25 ** 7;
var \u03C0$1 = Math.PI;
var r2d = 180 / \u03C0$1;
var d2r$1 = \u03C0$1 / 180;
function pow7(x) {
  const x2 = x * x;
  const x7 = x2 * x2 * x2 * x;
  return x7;
}
function deltaE2000(color, sample, { kL = 1, kC = 1, kH = 1 } = {}) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = lab.from(color);
  let C1 = lch.from(lab, [L1, a1, b1])[1];
  let [L2, a2, b2] = lab.from(sample);
  let C2 = lch.from(lab, [L2, a2, b2])[1];
  if (C1 < 0) {
    C1 = 0;
  }
  if (C2 < 0) {
    C2 = 0;
  }
  let Cbar = (C1 + C2) / 2;
  let C7 = pow7(Cbar);
  let G = 0.5 * (1 - Math.sqrt(C7 / (C7 + Gfactor)));
  let adash1 = (1 + G) * a1;
  let adash2 = (1 + G) * a2;
  let Cdash1 = Math.sqrt(adash1 ** 2 + b1 ** 2);
  let Cdash2 = Math.sqrt(adash2 ** 2 + b2 ** 2);
  let h1 = adash1 === 0 && b1 === 0 ? 0 : Math.atan2(b1, adash1);
  let h2 = adash2 === 0 && b2 === 0 ? 0 : Math.atan2(b2, adash2);
  if (h1 < 0) {
    h1 += 2 * \u03C0$1;
  }
  if (h2 < 0) {
    h2 += 2 * \u03C0$1;
  }
  h1 *= r2d;
  h2 *= r2d;
  let \u0394L = L2 - L1;
  let \u0394C = Cdash2 - Cdash1;
  let hdiff = h2 - h1;
  let hsum = h1 + h2;
  let habs = Math.abs(hdiff);
  let \u0394h;
  if (Cdash1 * Cdash2 === 0) {
    \u0394h = 0;
  } else if (habs <= 180) {
    \u0394h = hdiff;
  } else if (hdiff > 180) {
    \u0394h = hdiff - 360;
  } else if (hdiff < -180) {
    \u0394h = hdiff + 360;
  } else {
    defaults.warn("the unthinkable has happened");
  }
  let \u0394H = 2 * Math.sqrt(Cdash2 * Cdash1) * Math.sin(\u0394h * d2r$1 / 2);
  let Ldash = (L1 + L2) / 2;
  let Cdash = (Cdash1 + Cdash2) / 2;
  let Cdash7 = pow7(Cdash);
  let hdash;
  if (Cdash1 * Cdash2 === 0) {
    hdash = hsum;
  } else if (habs <= 180) {
    hdash = hsum / 2;
  } else if (hsum < 360) {
    hdash = (hsum + 360) / 2;
  } else {
    hdash = (hsum - 360) / 2;
  }
  let lsq = (Ldash - 50) ** 2;
  let SL = 1 + 0.015 * lsq / Math.sqrt(20 + lsq);
  let SC = 1 + 0.045 * Cdash;
  let T = 1;
  T -= 0.17 * Math.cos((hdash - 30) * d2r$1);
  T += 0.24 * Math.cos(2 * hdash * d2r$1);
  T += 0.32 * Math.cos((3 * hdash + 6) * d2r$1);
  T -= 0.2 * Math.cos((4 * hdash - 63) * d2r$1);
  let SH = 1 + 0.015 * Cdash * T;
  let \u0394\u03B8 = 30 * Math.exp(-1 * ((hdash - 275) / 25) ** 2);
  let RC = 2 * Math.sqrt(Cdash7 / (Cdash7 + Gfactor));
  let RT = -1 * Math.sin(2 * \u0394\u03B8 * d2r$1) * RC;
  let dE = (\u0394L / (kL * SL)) ** 2;
  dE += (\u0394C / (kC * SC)) ** 2;
  dE += (\u0394H / (kH * SH)) ** 2;
  dE += RT * (\u0394C / (kC * SC)) * (\u0394H / (kH * SH));
  return Math.sqrt(dE);
}
var XYZtoLMS_M$1 = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
];
var LMStoXYZ_M$1 = [
  [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
  [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
  [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
];
var LMStoLab_M = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
];
var LabtoLMS_M = [
  [1, 0.3963377773761749, 0.2158037573099136],
  [1, -0.1055613458156586, -0.0638541728258133],
  [1, -0.0894841775298119, -1.2914855480194092]
];
var OKLab = new ColorSpace({
  id: "oklab",
  name: "Oklab",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    a: {
      refRange: [-0.4, 0.4]
    },
    b: {
      refRange: [-0.4, 0.4]
    }
  },
  // Note that XYZ is relative to D65
  white: "D65",
  base: xyz_d65,
  fromBase(XYZ) {
    let LMS = multiplyMatrices(XYZtoLMS_M$1, XYZ);
    let LMSg = LMS.map((val) => Math.cbrt(val));
    return multiplyMatrices(LMStoLab_M, LMSg);
  },
  toBase(OKLab2) {
    let LMSg = multiplyMatrices(LabtoLMS_M, OKLab2);
    let LMS = LMSg.map((val) => val ** 3);
    return multiplyMatrices(LMStoXYZ_M$1, LMS);
  },
  formats: {
    "oklab": {
      coords: ["<percentage> | <number>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
function deltaEOK(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = OKLab.from(color);
  let [L2, a2, b2] = OKLab.from(sample);
  let \u0394L = L1 - L2;
  let \u0394a = a1 - a2;
  let \u0394b = b1 - b2;
  return Math.sqrt(\u0394L ** 2 + \u0394a ** 2 + \u0394b ** 2);
}
var \u03B5$5 = 75e-6;
function inGamut(color, space, { epsilon = \u03B5$5 } = {}) {
  color = getColor(color);
  if (!space) {
    space = color.space;
  }
  space = ColorSpace.get(space);
  let coords = color.coords;
  if (space !== color.space) {
    coords = space.from(color);
  }
  return space.inGamut(coords, { epsilon });
}
function clone$1(color) {
  return {
    space: color.space,
    coords: color.coords.slice(),
    alpha: color.alpha
  };
}
function distance$1(color1, color2, space = "lab") {
  space = ColorSpace.get(space);
  let coords1 = space.from(color1);
  let coords2 = space.from(color2);
  return Math.sqrt(coords1.reduce((acc, c12, i) => {
    let c22 = coords2[i];
    if (isNaN(c12) || isNaN(c22)) {
      return acc;
    }
    return acc + (c22 - c12) ** 2;
  }, 0));
}
function deltaE76(color, sample) {
  return distance$1(color, sample, "lab");
}
var \u03C0 = Math.PI;
var d2r = \u03C0 / 180;
function deltaECMC(color, sample, { l = 2, c: c4 = 1 } = {}) {
  [color, sample] = getColor([color, sample]);
  let [L1, a1, b1] = lab.from(color);
  let [, C1, H1] = lch.from(lab, [L1, a1, b1]);
  let [L2, a2, b2] = lab.from(sample);
  let C2 = lch.from(lab, [L2, a2, b2])[1];
  if (C1 < 0) {
    C1 = 0;
  }
  if (C2 < 0) {
    C2 = 0;
  }
  let \u0394L = L1 - L2;
  let \u0394C = C1 - C2;
  let \u0394a = a1 - a2;
  let \u0394b = b1 - b2;
  let H2 = \u0394a ** 2 + \u0394b ** 2 - \u0394C ** 2;
  let SL = 0.511;
  if (L1 >= 16) {
    SL = 0.040975 * L1 / (1 + 0.01765 * L1);
  }
  let SC = 0.0638 * C1 / (1 + 0.0131 * C1) + 0.638;
  let T;
  if (Number.isNaN(H1)) {
    H1 = 0;
  }
  if (H1 >= 164 && H1 <= 345) {
    T = 0.56 + Math.abs(0.2 * Math.cos((H1 + 168) * d2r));
  } else {
    T = 0.36 + Math.abs(0.4 * Math.cos((H1 + 35) * d2r));
  }
  let C4 = Math.pow(C1, 4);
  let F = Math.sqrt(C4 / (C4 + 1900));
  let SH = SC * (F * T + 1 - F);
  let dE = (\u0394L / (l * SL)) ** 2;
  dE += (\u0394C / (c4 * SC)) ** 2;
  dE += H2 / SH ** 2;
  return Math.sqrt(dE);
}
var Yw$1 = 203;
var XYZ_Abs_D65 = new ColorSpace({
  // Absolute CIE XYZ, with a D65 whitepoint,
  // as used in most HDR colorspaces as a starting point.
  // SDR spaces are converted per BT.2048
  // so that diffuse, media white is 203 cd/m²
  id: "xyz-abs-d65",
  cssId: "--xyz-abs-d65",
  name: "Absolute XYZ D65",
  coords: {
    x: {
      refRange: [0, 9504.7],
      name: "Xa"
    },
    y: {
      refRange: [0, 1e4],
      name: "Ya"
    },
    z: {
      refRange: [0, 10888.3],
      name: "Za"
    }
  },
  base: xyz_d65,
  fromBase(XYZ) {
    return XYZ.map((v) => Math.max(v * Yw$1, 0));
  },
  toBase(AbsXYZ) {
    return AbsXYZ.map((v) => Math.max(v / Yw$1, 0));
  }
});
var b$1 = 1.15;
var g = 0.66;
var n$1 = 2610 / 2 ** 14;
var ninv$1 = 2 ** 14 / 2610;
var c1$2 = 3424 / 2 ** 12;
var c2$2 = 2413 / 2 ** 7;
var c3$2 = 2392 / 2 ** 7;
var p = 1.7 * 2523 / 2 ** 5;
var pinv = 2 ** 5 / (1.7 * 2523);
var d = -0.56;
var d0 = 16295499532821565e-27;
var XYZtoCone_M = [
  [0.41478972, 0.579999, 0.014648],
  [-0.20151, 1.120649, 0.0531008],
  [-0.0166008, 0.2648, 0.6684799]
];
var ConetoXYZ_M = [
  [1.9242264357876067, -1.0047923125953657, 0.037651404030618],
  [0.35031676209499907, 0.7264811939316552, -0.06538442294808501],
  [-0.09098281098284752, -0.3127282905230739, 1.5227665613052603]
];
var ConetoIab_M = [
  [0.5, 0.5, 0],
  [3.524, -4.066708, 0.542708],
  [0.199076, 1.096799, -1.295875]
];
var IabtoCone_M = [
  [1, 0.1386050432715393, 0.05804731615611886],
  [0.9999999999999999, -0.1386050432715393, -0.05804731615611886],
  [0.9999999999999998, -0.09601924202631895, -0.8118918960560388]
];
var Jzazbz = new ColorSpace({
  id: "jzazbz",
  name: "Jzazbz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    az: {
      refRange: [-0.5, 0.5]
    },
    bz: {
      refRange: [-0.5, 0.5]
    }
  },
  base: XYZ_Abs_D65,
  fromBase(XYZ) {
    let [Xa, Ya, Za] = XYZ;
    let Xm = b$1 * Xa - (b$1 - 1) * Za;
    let Ym = g * Ya - (g - 1) * Xa;
    let LMS = multiplyMatrices(XYZtoCone_M, [Xm, Ym, Za]);
    let PQLMS = LMS.map(function(val) {
      let num = c1$2 + c2$2 * (val / 1e4) ** n$1;
      let denom = 1 + c3$2 * (val / 1e4) ** n$1;
      return (num / denom) ** p;
    });
    let [Iz, az, bz] = multiplyMatrices(ConetoIab_M, PQLMS);
    let Jz = (1 + d) * Iz / (1 + d * Iz) - d0;
    return [Jz, az, bz];
  },
  toBase(Jzazbz2) {
    let [Jz, az, bz] = Jzazbz2;
    let Iz = (Jz + d0) / (1 + d - d * (Jz + d0));
    let PQLMS = multiplyMatrices(IabtoCone_M, [Iz, az, bz]);
    let LMS = PQLMS.map(function(val) {
      let num = c1$2 - val ** pinv;
      let denom = c3$2 * val ** pinv - c2$2;
      let x = 1e4 * (num / denom) ** ninv$1;
      return x;
    });
    let [Xm, Ym, Za] = multiplyMatrices(ConetoXYZ_M, LMS);
    let Xa = (Xm + (b$1 - 1) * Za) / b$1;
    let Ya = (Ym + (g - 1) * Xa) / g;
    return [Xa, Ya, Za];
  },
  formats: {
    // https://drafts.csswg.org/css-color-hdr/#Jzazbz
    "color": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var jzczhz = new ColorSpace({
  id: "jzczhz",
  name: "JzCzHz",
  coords: {
    jz: {
      refRange: [0, 1],
      name: "Jz"
    },
    cz: {
      refRange: [0, 1],
      name: "Chroma"
    },
    hz: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Jzazbz,
  fromBase(jzazbz) {
    let [Jz, az, bz] = jzazbz;
    let hue;
    const \u03B52 = 2e-4;
    if (Math.abs(az) < \u03B52 && Math.abs(bz) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(bz, az) * 180 / Math.PI;
    }
    return [
      Jz,
      // Jz is still Jz
      Math.sqrt(az ** 2 + bz ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(jzczhz2) {
    return [
      jzczhz2[0],
      // Jz is still Jz
      jzczhz2[1] * Math.cos(jzczhz2[2] * Math.PI / 180),
      // az
      jzczhz2[1] * Math.sin(jzczhz2[2] * Math.PI / 180)
      // bz
    ];
  }
});
function deltaEJz(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [Jz1, Cz1, Hz1] = jzczhz.from(color);
  let [Jz2, Cz2, Hz2] = jzczhz.from(sample);
  let \u0394J = Jz1 - Jz2;
  let \u0394C = Cz1 - Cz2;
  if (Number.isNaN(Hz1) && Number.isNaN(Hz2)) {
    Hz1 = 0;
    Hz2 = 0;
  } else if (Number.isNaN(Hz1)) {
    Hz1 = Hz2;
  } else if (Number.isNaN(Hz2)) {
    Hz2 = Hz1;
  }
  let \u0394h = Hz1 - Hz2;
  let \u0394H = 2 * Math.sqrt(Cz1 * Cz2) * Math.sin(\u0394h / 2 * (Math.PI / 180));
  return Math.sqrt(\u0394J ** 2 + \u0394C ** 2 + \u0394H ** 2);
}
var c1$1 = 3424 / 4096;
var c2$1 = 2413 / 128;
var c3$1 = 2392 / 128;
var m1$1 = 2610 / 16384;
var m2 = 2523 / 32;
var im1 = 16384 / 2610;
var im2 = 32 / 2523;
var XYZtoLMS_M = [
  [0.3592832590121217, 0.6976051147779502, -0.035891593232029],
  [-0.1920808463704993, 1.100476797037432, 0.0753748658519118],
  [0.0070797844607479, 0.0748396662186362, 0.8433265453898765]
];
var LMStoIPT_M = [
  [2048 / 4096, 2048 / 4096, 0],
  [6610 / 4096, -13613 / 4096, 7003 / 4096],
  [17933 / 4096, -17390 / 4096, -543 / 4096]
];
var IPTtoLMS_M = [
  [0.9999999999999998, 0.0086090370379328, 0.111029625003026],
  [0.9999999999999998, -0.0086090370379328, -0.1110296250030259],
  [0.9999999999999998, 0.5600313357106791, -0.3206271749873188]
];
var LMStoXYZ_M = [
  [2.0701522183894223, -1.3263473389671563, 0.2066510476294053],
  [0.3647385209748072, 0.6805660249472273, -0.0453045459220347],
  [-0.0497472075358123, -0.0492609666966131, 1.1880659249923042]
];
var ictcp = new ColorSpace({
  id: "ictcp",
  name: "ICTCP",
  // From BT.2100-2 page 7:
  // During production, signal values are expected to exceed the
  // range E′ = [0.0 : 1.0]. This provides processing headroom and avoids
  // signal degradation during cascaded processing. Such values of E′,
  // below 0.0 or exceeding 1.0, should not be clipped during production
  // and exchange.
  // Values below 0.0 should not be clipped in reference displays (even
  // though they represent “negative” light) to allow the black level of
  // the signal (LB) to be properly set using test signals known as “PLUGE”
  coords: {
    i: {
      refRange: [0, 1],
      // Constant luminance,
      name: "I"
    },
    ct: {
      refRange: [-0.5, 0.5],
      // Full BT.2020 gamut in range [-0.5, 0.5]
      name: "CT"
    },
    cp: {
      refRange: [-0.5, 0.5],
      name: "CP"
    }
  },
  base: XYZ_Abs_D65,
  fromBase(XYZ) {
    let LMS = multiplyMatrices(XYZtoLMS_M, XYZ);
    return LMStoICtCp(LMS);
  },
  toBase(ICtCp) {
    let LMS = ICtCptoLMS(ICtCp);
    return multiplyMatrices(LMStoXYZ_M, LMS);
  }
});
function LMStoICtCp(LMS) {
  let PQLMS = LMS.map(function(val) {
    let num = c1$1 + c2$1 * (val / 1e4) ** m1$1;
    let denom = 1 + c3$1 * (val / 1e4) ** m1$1;
    return (num / denom) ** m2;
  });
  return multiplyMatrices(LMStoIPT_M, PQLMS);
}
function ICtCptoLMS(ICtCp) {
  let PQLMS = multiplyMatrices(IPTtoLMS_M, ICtCp);
  let LMS = PQLMS.map(function(val) {
    let num = Math.max(val ** im2 - c1$1, 0);
    let denom = c2$1 - c3$1 * val ** im2;
    return 1e4 * (num / denom) ** im1;
  });
  return LMS;
}
function deltaEITP(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [I1, T1, P1] = ictcp.from(color);
  let [I2, T2, P2] = ictcp.from(sample);
  return 720 * Math.sqrt((I1 - I2) ** 2 + 0.25 * (T1 - T2) ** 2 + (P1 - P2) ** 2);
}
var white$3 = WHITES.D65;
var adaptedCoef = 0.42;
var adaptedCoefInv = 1 / adaptedCoef;
var tau$1 = 2 * Math.PI;
var cat16 = [
  [0.401288, 0.650173, -0.051461],
  [-0.250268, 1.204414, 0.045854],
  [-2079e-6, 0.048952, 0.953127]
];
var cat16Inv = [
  [1.8620678550872327, -1.0112546305316843, 0.14918677544445175],
  [0.38752654323613717, 0.6214474419314753, -0.008973985167612518],
  [-0.015841498849333856, -0.03412293802851557, 1.0499644368778496]
];
var m1 = [
  [460, 451, 288],
  [460, -891, -261],
  [460, -220, -6300]
];
var surroundMap = {
  dark: [0.8, 0.525, 0.8],
  dim: [0.9, 0.59, 0.9],
  average: [1, 0.69, 1]
};
var hueQuadMap = {
  // Red, Yellow, Green, Blue, Red
  h: [20.14, 90, 164.25, 237.53, 380.14],
  e: [0.8, 0.7, 1, 1.2, 0.8],
  H: [0, 100, 200, 300, 400]
};
var rad2deg = 180 / Math.PI;
var deg2rad$1 = Math.PI / 180;
function adapt$1(coords, fl) {
  const temp = coords.map((c4) => {
    const x = spow(fl * Math.abs(c4) * 0.01, adaptedCoef);
    return 400 * copySign(x, c4) / (x + 27.13);
  });
  return temp;
}
function unadapt(adapted, fl) {
  const constant = 100 / fl * 27.13 ** adaptedCoefInv;
  return adapted.map((c4) => {
    const cabs = Math.abs(c4);
    return copySign(constant * spow(cabs / (400 - cabs), adaptedCoefInv), c4);
  });
}
function hueQuadrature(h) {
  let hp = constrain(h);
  if (hp <= hueQuadMap.h[0]) {
    hp += 360;
  }
  const i = bisectLeft(hueQuadMap.h, hp) - 1;
  const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
  const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
  const Hi = hueQuadMap.H[i];
  const t = (hp - hi) / ei;
  return Hi + 100 * t / (t + (hii - hp) / eii);
}
function invHueQuadrature(H) {
  let Hp = (H % 400 + 400) % 400;
  const i = Math.floor(0.01 * Hp);
  Hp = Hp % 100;
  const [hi, hii] = hueQuadMap.h.slice(i, i + 2);
  const [ei, eii] = hueQuadMap.e.slice(i, i + 2);
  return constrain(
    (Hp * (eii * hi - ei * hii) - 100 * hi * eii) / (Hp * (eii - ei) - 100 * eii)
  );
}
function environment(refWhite, adaptingLuminance, backgroundLuminance, surround, discounting) {
  const env = {};
  env.discounting = discounting;
  env.refWhite = refWhite;
  env.surround = surround;
  const xyzW = refWhite.map((c4) => {
    return c4 * 100;
  });
  env.la = adaptingLuminance;
  env.yb = backgroundLuminance;
  const yw = xyzW[1];
  const rgbW = multiplyMatrices(cat16, xyzW);
  surround = surroundMap[env.surround];
  const f = surround[0];
  env.c = surround[1];
  env.nc = surround[2];
  const k = 1 / (5 * env.la + 1);
  const k4 = k ** 4;
  env.fl = k4 * env.la + 0.1 * (1 - k4) * (1 - k4) * Math.cbrt(5 * env.la);
  env.flRoot = env.fl ** 0.25;
  env.n = env.yb / yw;
  env.z = 1.48 + Math.sqrt(env.n);
  env.nbb = 0.725 * env.n ** -0.2;
  env.ncb = env.nbb;
  const d2 = discounting ? 1 : Math.max(
    Math.min(f * (1 - 1 / 3.6 * Math.exp((-env.la - 42) / 92)), 1),
    0
  );
  env.dRgb = rgbW.map((c4) => {
    return interpolate$2(1, yw / c4, d2);
  });
  env.dRgbInv = env.dRgb.map((c4) => {
    return 1 / c4;
  });
  const rgbCW = rgbW.map((c4, i) => {
    return c4 * env.dRgb[i];
  });
  const rgbAW = adapt$1(rgbCW, env.fl);
  env.aW = env.nbb * (2 * rgbAW[0] + rgbAW[1] + 0.05 * rgbAW[2]);
  return env;
}
var viewingConditions$1 = environment(
  white$3,
  64 / Math.PI * 0.2,
  20,
  "average",
  false
);
function fromCam16(cam162, env) {
  if (!(cam162.J !== void 0 ^ cam162.Q !== void 0)) {
    throw new Error("Conversion requires one and only one: 'J' or 'Q'");
  }
  if (!(cam162.C !== void 0 ^ cam162.M !== void 0 ^ cam162.s !== void 0)) {
    throw new Error("Conversion requires one and only one: 'C', 'M' or 's'");
  }
  if (!(cam162.h !== void 0 ^ cam162.H !== void 0)) {
    throw new Error("Conversion requires one and only one: 'h' or 'H'");
  }
  if (cam162.J === 0 || cam162.Q === 0) {
    return [0, 0, 0];
  }
  let hRad = 0;
  if (cam162.h !== void 0) {
    hRad = constrain(cam162.h) * deg2rad$1;
  } else {
    hRad = invHueQuadrature(cam162.H) * deg2rad$1;
  }
  const cosh = Math.cos(hRad);
  const sinh = Math.sin(hRad);
  let Jroot = 0;
  if (cam162.J !== void 0) {
    Jroot = spow(cam162.J, 1 / 2) * 0.1;
  } else if (cam162.Q !== void 0) {
    Jroot = 0.25 * env.c * cam162.Q / ((env.aW + 4) * env.flRoot);
  }
  let alpha = 0;
  if (cam162.C !== void 0) {
    alpha = cam162.C / Jroot;
  } else if (cam162.M !== void 0) {
    alpha = cam162.M / env.flRoot / Jroot;
  } else if (cam162.s !== void 0) {
    alpha = 4e-4 * cam162.s ** 2 * (env.aW + 4) / env.c;
  }
  const t = spow(
    alpha * Math.pow(1.64 - Math.pow(0.29, env.n), -0.73),
    10 / 9
  );
  const et = 0.25 * (Math.cos(hRad + 2) + 3.8);
  const A = env.aW * spow(Jroot, 2 / env.c / env.z);
  const p1 = 5e4 / 13 * env.nc * env.ncb * et;
  const p2 = A / env.nbb;
  const r = 23 * (p2 + 0.305) * zdiv(t, 23 * p1 + t * (11 * cosh + 108 * sinh));
  const a2 = r * cosh;
  const b2 = r * sinh;
  const rgb_c = unadapt(
    multiplyMatrices(m1, [p2, a2, b2]).map((c4) => {
      return c4 * 1 / 1403;
    }),
    env.fl
  );
  return multiplyMatrices(
    cat16Inv,
    rgb_c.map((c4, i) => {
      return c4 * env.dRgbInv[i];
    })
  ).map((c4) => {
    return c4 / 100;
  });
}
function toCam16(xyzd65, env) {
  const xyz100 = xyzd65.map((c4) => {
    return c4 * 100;
  });
  const rgbA = adapt$1(
    multiplyMatrices(cat16, xyz100).map((c4, i) => {
      return c4 * env.dRgb[i];
    }),
    env.fl
  );
  const a2 = rgbA[0] + (-12 * rgbA[1] + rgbA[2]) / 11;
  const b2 = (rgbA[0] + rgbA[1] - 2 * rgbA[2]) / 9;
  const hRad = (Math.atan2(b2, a2) % tau$1 + tau$1) % tau$1;
  const et = 0.25 * (Math.cos(hRad + 2) + 3.8);
  const t = 5e4 / 13 * env.nc * env.ncb * zdiv(
    et * Math.sqrt(a2 ** 2 + b2 ** 2),
    rgbA[0] + rgbA[1] + 1.05 * rgbA[2] + 0.305
  );
  const alpha = spow(t, 0.9) * Math.pow(1.64 - Math.pow(0.29, env.n), 0.73);
  const A = env.nbb * (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]);
  const Jroot = spow(A / env.aW, 0.5 * env.c * env.z);
  const J = 100 * spow(Jroot, 2);
  const Q = 4 / env.c * Jroot * (env.aW + 4) * env.flRoot;
  const C = alpha * Jroot;
  const M = C * env.flRoot;
  const h = constrain(hRad * rad2deg);
  const H = hueQuadrature(h);
  const s = 50 * spow(env.c * alpha / (env.aW + 4), 1 / 2);
  return { J, C, h, s, Q, M, H };
}
var cam16 = new ColorSpace({
  id: "cam16-jmh",
  cssId: "--cam16-jmh",
  name: "CAM16-JMh",
  coords: {
    j: {
      refRange: [0, 100],
      name: "J"
    },
    m: {
      refRange: [0, 105],
      name: "Colorfulness"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: xyz_d65,
  fromBase(xyz) {
    const cam162 = toCam16(xyz, viewingConditions$1);
    return [cam162.J, cam162.M, cam162.h];
  },
  toBase(cam162) {
    return fromCam16(
      { J: cam162[0], M: cam162[1], h: cam162[2] },
      viewingConditions$1
    );
  }
});
var white$2 = WHITES.D65;
var \u03B5$4 = 216 / 24389;
var \u03BA$3 = 24389 / 27;
function toLstar(y) {
  const fy = y > \u03B5$4 ? Math.cbrt(y) : (\u03BA$3 * y + 16) / 116;
  return 116 * fy - 16;
}
function fromLstar(lstar) {
  return lstar > 8 ? Math.pow((lstar + 16) / 116, 3) : lstar / \u03BA$3;
}
function fromHct(coords, env) {
  let [h, c4, t] = coords;
  let xyz = [];
  let j = 0;
  if (t === 0) {
    return [0, 0, 0];
  }
  let y = fromLstar(t);
  if (t > 0) {
    j = 0.00379058511492914 * t ** 2 + 0.608983189401032 * t + 0.9155088574762233;
  } else {
    j = 9514440756550361e-21 * t ** 2 + 0.08693057439788597 * t - 21.928975842194614;
  }
  const threshold = 2e-12;
  const max_attempts = 15;
  let attempt = 0;
  let last2 = Infinity;
  while (attempt <= max_attempts) {
    xyz = fromCam16({ J: j, C: c4, h }, env);
    const delta = Math.abs(xyz[1] - y);
    if (delta < last2) {
      if (delta <= threshold) {
        return xyz;
      }
      last2 = delta;
    }
    j = j - (xyz[1] - y) * j / (2 * xyz[1]);
    attempt += 1;
  }
  return fromCam16({ J: j, C: c4, h }, env);
}
function toHct(xyz, env) {
  const t = toLstar(xyz[1]);
  if (t === 0) {
    return [0, 0, 0];
  }
  const cam162 = toCam16(xyz, viewingConditions);
  return [constrain(cam162.h), cam162.C, t];
}
var viewingConditions = environment(
  white$2,
  200 / Math.PI * fromLstar(50),
  fromLstar(50) * 100,
  "average",
  false
);
var hct = new ColorSpace({
  id: "hct",
  name: "HCT",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    c: {
      refRange: [0, 145],
      name: "Colorfulness"
    },
    t: {
      refRange: [0, 100],
      name: "Tone"
    }
  },
  base: xyz_d65,
  fromBase(xyz) {
    return toHct(xyz);
  },
  toBase(hct2) {
    return fromHct(hct2, viewingConditions);
  },
  formats: {
    color: {
      id: "--hct",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var deg2rad = Math.PI / 180;
var ucsCoeff = [1, 7e-3, 0.0228];
function convertUcsAb(coords) {
  if (coords[1] < 0) {
    coords = hct.fromBase(hct.toBase(coords));
  }
  const M = Math.log(Math.max(1 + ucsCoeff[2] * coords[1] * viewingConditions.flRoot, 1)) / ucsCoeff[2];
  const hrad = coords[0] * deg2rad;
  const a2 = M * Math.cos(hrad);
  const b2 = M * Math.sin(hrad);
  return [coords[2], a2, b2];
}
function deltaEHCT(color, sample) {
  [color, sample] = getColor([color, sample]);
  let [t1, a1, b1] = convertUcsAb(hct.from(color));
  let [t2, a2, b2] = convertUcsAb(hct.from(sample));
  return Math.sqrt((t1 - t2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}
var deltaEMethods = {
  deltaE76,
  deltaECMC,
  deltaE2000,
  deltaEJz,
  deltaEITP,
  deltaEOK,
  deltaEHCT
};
function calcEpsilon(jnd) {
  const order = !jnd ? 0 : Math.floor(Math.log10(Math.abs(jnd)));
  return Math.max(parseFloat(`1e${order - 2}`), 1e-6);
}
var GMAPPRESET = {
  "hct": {
    method: "hct.c",
    jnd: 2,
    deltaEMethod: "hct",
    blackWhiteClamp: {}
  },
  "hct-tonal": {
    method: "hct.c",
    jnd: 0,
    deltaEMethod: "hct",
    blackWhiteClamp: { channel: "hct.t", min: 0, max: 100 }
  }
};
function toGamut(color, {
  method = defaults.gamut_mapping,
  space = void 0,
  deltaEMethod = "",
  jnd = 2,
  blackWhiteClamp = {}
} = {}) {
  color = getColor(color);
  if (isString(arguments[1])) {
    space = arguments[1];
  } else if (!space) {
    space = color.space;
  }
  space = ColorSpace.get(space);
  if (inGamut(color, space, { epsilon: 0 })) {
    return color;
  }
  let spaceColor;
  if (method === "css") {
    spaceColor = toGamutCSS(color, { space });
  } else {
    if (method !== "clip" && !inGamut(color, space)) {
      if (Object.prototype.hasOwnProperty.call(GMAPPRESET, method)) {
        ({ method, jnd, deltaEMethod, blackWhiteClamp } = GMAPPRESET[method]);
      }
      let de = deltaE2000;
      if (deltaEMethod !== "") {
        for (let m3 in deltaEMethods) {
          if ("deltae" + deltaEMethod.toLowerCase() === m3.toLowerCase()) {
            de = deltaEMethods[m3];
            break;
          }
        }
      }
      let clipped = toGamut(to$2(color, space), { method: "clip", space });
      if (de(color, clipped) > jnd) {
        if (Object.keys(blackWhiteClamp).length === 3) {
          let channelMeta = ColorSpace.resolveCoord(blackWhiteClamp.channel);
          let channel = get$1(to$2(color, channelMeta.space), channelMeta.id);
          if (isNone(channel)) {
            channel = 0;
          }
          if (channel >= blackWhiteClamp.max) {
            return to$2({ space: "xyz-d65", coords: WHITES["D65"] }, color.space);
          } else if (channel <= blackWhiteClamp.min) {
            return to$2({ space: "xyz-d65", coords: [0, 0, 0] }, color.space);
          }
        }
        let coordMeta = ColorSpace.resolveCoord(method);
        let mapSpace = coordMeta.space;
        let coordId = coordMeta.id;
        let mappedColor = to$2(color, mapSpace);
        mappedColor.coords.forEach((c4, i) => {
          if (isNone(c4)) {
            mappedColor.coords[i] = 0;
          }
        });
        let bounds = coordMeta.range || coordMeta.refRange;
        let min = bounds[0];
        let \u03B52 = calcEpsilon(jnd);
        let low = min;
        let high = get$1(mappedColor, coordId);
        while (high - low > \u03B52) {
          let clipped2 = clone$1(mappedColor);
          clipped2 = toGamut(clipped2, { space, method: "clip" });
          let deltaE2 = de(mappedColor, clipped2);
          if (deltaE2 - jnd < \u03B52) {
            low = get$1(mappedColor, coordId);
          } else {
            high = get$1(mappedColor, coordId);
          }
          set$1(mappedColor, coordId, (low + high) / 2);
        }
        spaceColor = to$2(mappedColor, space);
      } else {
        spaceColor = clipped;
      }
    } else {
      spaceColor = to$2(color, space);
    }
    if (method === "clip" || !inGamut(spaceColor, space, { epsilon: 0 })) {
      let bounds = Object.values(space.coords).map((c4) => c4.range || []);
      spaceColor.coords = spaceColor.coords.map((c4, i) => {
        let [min, max2] = bounds[i];
        if (min !== void 0) {
          c4 = Math.max(min, c4);
        }
        if (max2 !== void 0) {
          c4 = Math.min(c4, max2);
        }
        return c4;
      });
    }
  }
  if (space !== color.space) {
    spaceColor = to$2(spaceColor, color.space);
  }
  color.coords = spaceColor.coords;
  return color;
}
toGamut.returns = "color";
var COLORS = {
  WHITE: { space: OKLab, coords: [1, 0, 0] },
  BLACK: { space: OKLab, coords: [0, 0, 0] }
};
function toGamutCSS(origin, { space } = {}) {
  const JND = 0.02;
  const \u03B52 = 1e-4;
  origin = getColor(origin);
  if (!space) {
    space = origin.space;
  }
  space = ColorSpace.get(space);
  const oklchSpace = ColorSpace.get("oklch");
  if (space.isUnbounded) {
    return to$2(origin, space);
  }
  const origin_OKLCH = to$2(origin, oklchSpace);
  let L = origin_OKLCH.coords[0];
  if (L >= 1) {
    const white2 = to$2(COLORS.WHITE, space);
    white2.alpha = origin.alpha;
    return to$2(white2, space);
  }
  if (L <= 0) {
    const black = to$2(COLORS.BLACK, space);
    black.alpha = origin.alpha;
    return to$2(black, space);
  }
  if (inGamut(origin_OKLCH, space, { epsilon: 0 })) {
    return to$2(origin_OKLCH, space);
  }
  function clip(_color) {
    const destColor = to$2(_color, space);
    const spaceCoords = Object.values(space.coords);
    destColor.coords = destColor.coords.map((coord, index) => {
      if ("range" in spaceCoords[index]) {
        const [min2, max3] = spaceCoords[index].range;
        return clamp2$2(min2, coord, max3);
      }
      return coord;
    });
    return destColor;
  }
  let min = 0;
  let max2 = origin_OKLCH.coords[1];
  let min_inGamut = true;
  let current = clone$1(origin_OKLCH);
  let clipped = clip(current);
  let E = deltaEOK(clipped, current);
  if (E < JND) {
    return clipped;
  }
  while (max2 - min > \u03B52) {
    const chroma = (min + max2) / 2;
    current.coords[1] = chroma;
    if (min_inGamut && inGamut(current, space, { epsilon: 0 })) {
      min = chroma;
    } else {
      clipped = clip(current);
      E = deltaEOK(clipped, current);
      if (E < JND) {
        if (JND - E < \u03B52) {
          break;
        } else {
          min_inGamut = false;
          min = chroma;
        }
      } else {
        max2 = chroma;
      }
    }
  }
  return clipped;
}
function to$2(color, space, { inGamut: inGamut2 } = {}) {
  color = getColor(color);
  space = ColorSpace.get(space);
  let coords = space.from(color);
  let ret = { space, coords, alpha: color.alpha };
  if (inGamut2) {
    ret = toGamut(ret, inGamut2 === true ? void 0 : inGamut2);
  }
  return ret;
}
to$2.returns = "color";
function serialize(color, {
  precision = defaults.precision,
  format = "default",
  inGamut: inGamut$1 = true,
  ...customOptions
} = {}) {
  let ret;
  color = getColor(color);
  let formatId = format;
  format = color.space.getFormat(format) ?? color.space.getFormat("default") ?? ColorSpace.DEFAULT_FORMAT;
  let coords = color.coords.slice();
  inGamut$1 ||= format.toGamut;
  if (inGamut$1 && !inGamut(color)) {
    coords = toGamut(clone$1(color), inGamut$1 === true ? void 0 : inGamut$1).coords;
  }
  if (format.type === "custom") {
    customOptions.precision = precision;
    if (format.serialize) {
      ret = format.serialize(coords, color.alpha, customOptions);
    } else {
      throw new TypeError(`format ${formatId} can only be used to parse colors, not for serialization`);
    }
  } else {
    let name = format.name || "color";
    if (format.serializeCoords) {
      coords = format.serializeCoords(coords, precision);
    } else {
      if (precision !== null) {
        coords = coords.map((c4) => {
          return serializeNumber(c4, { precision });
        });
      }
    }
    let args = [...coords];
    if (name === "color") {
      let cssId = format.id || format.ids?.[0] || color.space.id;
      args.unshift(cssId);
    }
    let alpha = color.alpha;
    if (precision !== null) {
      alpha = serializeNumber(alpha, { precision });
    }
    let strAlpha = color.alpha >= 1 || format.noAlpha ? "" : `${format.commas ? "," : " /"} ${alpha}`;
    ret = `${name}(${args.join(format.commas ? ", " : " ")}${strAlpha})`;
  }
  return ret;
}
var toXYZ_M$5 = [
  [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
  [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
  [0, 0.028072693049087428, 1.060985057710791]
];
var fromXYZ_M$5 = [
  [1.716651187971268, -0.355670783776392, -0.25336628137366],
  [-0.666684351832489, 1.616481236634939, 0.0157685458139111],
  [0.017639857445311, -0.042770613257809, 0.942103121235474]
];
var REC2020Linear = new RGBColorSpace({
  id: "rec2020-linear",
  cssId: "--rec2020-linear",
  name: "Linear REC.2020",
  white: "D65",
  toXYZ_M: toXYZ_M$5,
  fromXYZ_M: fromXYZ_M$5
});
var \u03B1 = 1.09929682680944;
var \u03B2 = 0.018053968510807;
var REC2020 = new RGBColorSpace({
  id: "rec2020",
  name: "REC.2020",
  base: REC2020Linear,
  // Non-linear transfer function from Rec. ITU-R BT.2020-2 table 4
  toBase(RGB) {
    return RGB.map(function(val) {
      if (val < \u03B2 * 4.5) {
        return val / 4.5;
      }
      return Math.pow((val + \u03B1 - 1) / \u03B1, 1 / 0.45);
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      if (val >= \u03B2) {
        return \u03B1 * Math.pow(val, 0.45) - (\u03B1 - 1);
      }
      return 4.5 * val;
    });
  }
});
var toXYZ_M$4 = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976]
];
var fromXYZ_M$4 = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
];
var P3Linear = new RGBColorSpace({
  id: "p3-linear",
  cssId: "--display-p3-linear",
  name: "Linear P3",
  white: "D65",
  toXYZ_M: toXYZ_M$4,
  fromXYZ_M: fromXYZ_M$4
});
var toXYZ_M$3 = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607]
];
var fromXYZ_M$3 = [
  [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
  [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
  [0.05563007969699366, -0.20397695888897652, 1.0569715142428786]
];
var sRGBLinear = new RGBColorSpace({
  id: "srgb-linear",
  name: "Linear sRGB",
  white: "D65",
  toXYZ_M: toXYZ_M$3,
  fromXYZ_M: fromXYZ_M$3
});
var KEYWORDS = {
  "aliceblue": [240 / 255, 248 / 255, 1],
  "antiquewhite": [250 / 255, 235 / 255, 215 / 255],
  "aqua": [0, 1, 1],
  "aquamarine": [127 / 255, 1, 212 / 255],
  "azure": [240 / 255, 1, 1],
  "beige": [245 / 255, 245 / 255, 220 / 255],
  "bisque": [1, 228 / 255, 196 / 255],
  "black": [0, 0, 0],
  "blanchedalmond": [1, 235 / 255, 205 / 255],
  "blue": [0, 0, 1],
  "blueviolet": [138 / 255, 43 / 255, 226 / 255],
  "brown": [165 / 255, 42 / 255, 42 / 255],
  "burlywood": [222 / 255, 184 / 255, 135 / 255],
  "cadetblue": [95 / 255, 158 / 255, 160 / 255],
  "chartreuse": [127 / 255, 1, 0],
  "chocolate": [210 / 255, 105 / 255, 30 / 255],
  "coral": [1, 127 / 255, 80 / 255],
  "cornflowerblue": [100 / 255, 149 / 255, 237 / 255],
  "cornsilk": [1, 248 / 255, 220 / 255],
  "crimson": [220 / 255, 20 / 255, 60 / 255],
  "cyan": [0, 1, 1],
  "darkblue": [0, 0, 139 / 255],
  "darkcyan": [0, 139 / 255, 139 / 255],
  "darkgoldenrod": [184 / 255, 134 / 255, 11 / 255],
  "darkgray": [169 / 255, 169 / 255, 169 / 255],
  "darkgreen": [0, 100 / 255, 0],
  "darkgrey": [169 / 255, 169 / 255, 169 / 255],
  "darkkhaki": [189 / 255, 183 / 255, 107 / 255],
  "darkmagenta": [139 / 255, 0, 139 / 255],
  "darkolivegreen": [85 / 255, 107 / 255, 47 / 255],
  "darkorange": [1, 140 / 255, 0],
  "darkorchid": [153 / 255, 50 / 255, 204 / 255],
  "darkred": [139 / 255, 0, 0],
  "darksalmon": [233 / 255, 150 / 255, 122 / 255],
  "darkseagreen": [143 / 255, 188 / 255, 143 / 255],
  "darkslateblue": [72 / 255, 61 / 255, 139 / 255],
  "darkslategray": [47 / 255, 79 / 255, 79 / 255],
  "darkslategrey": [47 / 255, 79 / 255, 79 / 255],
  "darkturquoise": [0, 206 / 255, 209 / 255],
  "darkviolet": [148 / 255, 0, 211 / 255],
  "deeppink": [1, 20 / 255, 147 / 255],
  "deepskyblue": [0, 191 / 255, 1],
  "dimgray": [105 / 255, 105 / 255, 105 / 255],
  "dimgrey": [105 / 255, 105 / 255, 105 / 255],
  "dodgerblue": [30 / 255, 144 / 255, 1],
  "firebrick": [178 / 255, 34 / 255, 34 / 255],
  "floralwhite": [1, 250 / 255, 240 / 255],
  "forestgreen": [34 / 255, 139 / 255, 34 / 255],
  "fuchsia": [1, 0, 1],
  "gainsboro": [220 / 255, 220 / 255, 220 / 255],
  "ghostwhite": [248 / 255, 248 / 255, 1],
  "gold": [1, 215 / 255, 0],
  "goldenrod": [218 / 255, 165 / 255, 32 / 255],
  "gray": [128 / 255, 128 / 255, 128 / 255],
  "green": [0, 128 / 255, 0],
  "greenyellow": [173 / 255, 1, 47 / 255],
  "grey": [128 / 255, 128 / 255, 128 / 255],
  "honeydew": [240 / 255, 1, 240 / 255],
  "hotpink": [1, 105 / 255, 180 / 255],
  "indianred": [205 / 255, 92 / 255, 92 / 255],
  "indigo": [75 / 255, 0, 130 / 255],
  "ivory": [1, 1, 240 / 255],
  "khaki": [240 / 255, 230 / 255, 140 / 255],
  "lavender": [230 / 255, 230 / 255, 250 / 255],
  "lavenderblush": [1, 240 / 255, 245 / 255],
  "lawngreen": [124 / 255, 252 / 255, 0],
  "lemonchiffon": [1, 250 / 255, 205 / 255],
  "lightblue": [173 / 255, 216 / 255, 230 / 255],
  "lightcoral": [240 / 255, 128 / 255, 128 / 255],
  "lightcyan": [224 / 255, 1, 1],
  "lightgoldenrodyellow": [250 / 255, 250 / 255, 210 / 255],
  "lightgray": [211 / 255, 211 / 255, 211 / 255],
  "lightgreen": [144 / 255, 238 / 255, 144 / 255],
  "lightgrey": [211 / 255, 211 / 255, 211 / 255],
  "lightpink": [1, 182 / 255, 193 / 255],
  "lightsalmon": [1, 160 / 255, 122 / 255],
  "lightseagreen": [32 / 255, 178 / 255, 170 / 255],
  "lightskyblue": [135 / 255, 206 / 255, 250 / 255],
  "lightslategray": [119 / 255, 136 / 255, 153 / 255],
  "lightslategrey": [119 / 255, 136 / 255, 153 / 255],
  "lightsteelblue": [176 / 255, 196 / 255, 222 / 255],
  "lightyellow": [1, 1, 224 / 255],
  "lime": [0, 1, 0],
  "limegreen": [50 / 255, 205 / 255, 50 / 255],
  "linen": [250 / 255, 240 / 255, 230 / 255],
  "magenta": [1, 0, 1],
  "maroon": [128 / 255, 0, 0],
  "mediumaquamarine": [102 / 255, 205 / 255, 170 / 255],
  "mediumblue": [0, 0, 205 / 255],
  "mediumorchid": [186 / 255, 85 / 255, 211 / 255],
  "mediumpurple": [147 / 255, 112 / 255, 219 / 255],
  "mediumseagreen": [60 / 255, 179 / 255, 113 / 255],
  "mediumslateblue": [123 / 255, 104 / 255, 238 / 255],
  "mediumspringgreen": [0, 250 / 255, 154 / 255],
  "mediumturquoise": [72 / 255, 209 / 255, 204 / 255],
  "mediumvioletred": [199 / 255, 21 / 255, 133 / 255],
  "midnightblue": [25 / 255, 25 / 255, 112 / 255],
  "mintcream": [245 / 255, 1, 250 / 255],
  "mistyrose": [1, 228 / 255, 225 / 255],
  "moccasin": [1, 228 / 255, 181 / 255],
  "navajowhite": [1, 222 / 255, 173 / 255],
  "navy": [0, 0, 128 / 255],
  "oldlace": [253 / 255, 245 / 255, 230 / 255],
  "olive": [128 / 255, 128 / 255, 0],
  "olivedrab": [107 / 255, 142 / 255, 35 / 255],
  "orange": [1, 165 / 255, 0],
  "orangered": [1, 69 / 255, 0],
  "orchid": [218 / 255, 112 / 255, 214 / 255],
  "palegoldenrod": [238 / 255, 232 / 255, 170 / 255],
  "palegreen": [152 / 255, 251 / 255, 152 / 255],
  "paleturquoise": [175 / 255, 238 / 255, 238 / 255],
  "palevioletred": [219 / 255, 112 / 255, 147 / 255],
  "papayawhip": [1, 239 / 255, 213 / 255],
  "peachpuff": [1, 218 / 255, 185 / 255],
  "peru": [205 / 255, 133 / 255, 63 / 255],
  "pink": [1, 192 / 255, 203 / 255],
  "plum": [221 / 255, 160 / 255, 221 / 255],
  "powderblue": [176 / 255, 224 / 255, 230 / 255],
  "purple": [128 / 255, 0, 128 / 255],
  "rebeccapurple": [102 / 255, 51 / 255, 153 / 255],
  "red": [1, 0, 0],
  "rosybrown": [188 / 255, 143 / 255, 143 / 255],
  "royalblue": [65 / 255, 105 / 255, 225 / 255],
  "saddlebrown": [139 / 255, 69 / 255, 19 / 255],
  "salmon": [250 / 255, 128 / 255, 114 / 255],
  "sandybrown": [244 / 255, 164 / 255, 96 / 255],
  "seagreen": [46 / 255, 139 / 255, 87 / 255],
  "seashell": [1, 245 / 255, 238 / 255],
  "sienna": [160 / 255, 82 / 255, 45 / 255],
  "silver": [192 / 255, 192 / 255, 192 / 255],
  "skyblue": [135 / 255, 206 / 255, 235 / 255],
  "slateblue": [106 / 255, 90 / 255, 205 / 255],
  "slategray": [112 / 255, 128 / 255, 144 / 255],
  "slategrey": [112 / 255, 128 / 255, 144 / 255],
  "snow": [1, 250 / 255, 250 / 255],
  "springgreen": [0, 1, 127 / 255],
  "steelblue": [70 / 255, 130 / 255, 180 / 255],
  "tan": [210 / 255, 180 / 255, 140 / 255],
  "teal": [0, 128 / 255, 128 / 255],
  "thistle": [216 / 255, 191 / 255, 216 / 255],
  "tomato": [1, 99 / 255, 71 / 255],
  "turquoise": [64 / 255, 224 / 255, 208 / 255],
  "violet": [238 / 255, 130 / 255, 238 / 255],
  "wheat": [245 / 255, 222 / 255, 179 / 255],
  "white": [1, 1, 1],
  "whitesmoke": [245 / 255, 245 / 255, 245 / 255],
  "yellow": [1, 1, 0],
  "yellowgreen": [154 / 255, 205 / 255, 50 / 255]
};
var coordGrammar = Array(3).fill("<percentage> | <number>[0, 255]");
var coordGrammarNumber = Array(3).fill("<number>[0, 255]");
var sRGB = new RGBColorSpace({
  id: "srgb",
  name: "sRGB",
  base: sRGBLinear,
  fromBase: (rgb) => {
    return rgb.map((val) => {
      let sign = val < 0 ? -1 : 1;
      let abs = val * sign;
      if (abs > 31308e-7) {
        return sign * (1.055 * abs ** (1 / 2.4) - 0.055);
      }
      return 12.92 * val;
    });
  },
  toBase: (rgb) => {
    return rgb.map((val) => {
      let sign = val < 0 ? -1 : 1;
      let abs = val * sign;
      if (abs <= 0.04045) {
        return val / 12.92;
      }
      return sign * ((abs + 0.055) / 1.055) ** 2.4;
    });
  },
  formats: {
    "rgb": {
      coords: coordGrammar
    },
    "rgb_number": {
      name: "rgb",
      commas: true,
      coords: coordGrammarNumber,
      noAlpha: true
    },
    "color": {
      /* use defaults */
    },
    "rgba": {
      coords: coordGrammar,
      commas: true,
      lastAlpha: true
    },
    "rgba_number": {
      name: "rgba",
      commas: true,
      coords: coordGrammarNumber
    },
    "hex": {
      type: "custom",
      toGamut: true,
      test: (str) => /^#([a-f0-9]{3,4}){1,2}$/i.test(str),
      parse(str) {
        if (str.length <= 5) {
          str = str.replace(/[a-f0-9]/gi, "$&$&");
        }
        let rgba = [];
        str.replace(/[a-f0-9]{2}/gi, (component) => {
          rgba.push(parseInt(component, 16) / 255);
        });
        return {
          spaceId: "srgb",
          coords: rgba.slice(0, 3),
          alpha: rgba.slice(3)[0]
        };
      },
      serialize: (coords, alpha, {
        collapse = true
        // collapse to 3-4 digit hex when possible?
      } = {}) => {
        if (alpha < 1) {
          coords.push(alpha);
        }
        coords = coords.map((c4) => Math.round(c4 * 255));
        let collapsible = collapse && coords.every((c4) => c4 % 17 === 0);
        let hex = coords.map((c4) => {
          if (collapsible) {
            return (c4 / 17).toString(16);
          }
          return c4.toString(16).padStart(2, "0");
        }).join("");
        return "#" + hex;
      }
    },
    "keyword": {
      type: "custom",
      test: (str) => /^[a-z]+$/i.test(str),
      parse(str) {
        str = str.toLowerCase();
        let ret = { spaceId: "srgb", coords: null, alpha: 1 };
        if (str === "transparent") {
          ret.coords = KEYWORDS.black;
          ret.alpha = 0;
        } else {
          ret.coords = KEYWORDS[str];
        }
        if (ret.coords) {
          return ret;
        }
      }
    }
  }
});
var P3 = new RGBColorSpace({
  id: "p3",
  cssId: "display-p3",
  name: "P3",
  base: P3Linear,
  // Gamma encoding/decoding is the same as sRGB
  fromBase: sRGB.fromBase,
  toBase: sRGB.toBase
});
defaults.display_space = sRGB;
var supportsNone;
if (typeof CSS !== "undefined" && CSS.supports) {
  for (let space of [lab, REC2020, P3]) {
    let coords = space.getMinCoords();
    let color = { space, coords, alpha: 1 };
    let str = serialize(color);
    if (CSS.supports("color", str)) {
      defaults.display_space = space;
      break;
    }
  }
}
function display(color, { space = defaults.display_space, ...options } = {}) {
  let ret = serialize(color, options);
  if (typeof CSS === "undefined" || CSS.supports("color", ret) || !defaults.display_space) {
    ret = new String(ret);
    ret.color = color;
  } else {
    let fallbackColor = color;
    let hasNone = color.coords.some(isNone) || isNone(color.alpha);
    if (hasNone) {
      if (!(supportsNone ??= CSS.supports("color", "hsl(none 50% 50%)"))) {
        fallbackColor = clone$1(color);
        fallbackColor.coords = fallbackColor.coords.map(skipNone);
        fallbackColor.alpha = skipNone(fallbackColor.alpha);
        ret = serialize(fallbackColor, options);
        if (CSS.supports("color", ret)) {
          ret = new String(ret);
          ret.color = fallbackColor;
          return ret;
        }
      }
    }
    fallbackColor = to$2(fallbackColor, space);
    ret = new String(serialize(fallbackColor, options));
    ret.color = fallbackColor;
  }
  return ret;
}
function equals$1(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  return color1.space === color2.space && color1.alpha === color2.alpha && color1.coords.every((c4, i) => c4 === color2.coords[i]);
}
function getLuminance(color) {
  return get$1(color, [xyz_d65, "y"]);
}
function setLuminance(color, value) {
  set$1(color, [xyz_d65, "y"], value);
}
function register$2(Color2) {
  Object.defineProperty(Color2.prototype, "luminance", {
    get() {
      return getLuminance(this);
    },
    set(value) {
      setLuminance(this, value);
    }
  });
}
var luminance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getLuminance,
  register: register$2,
  setLuminance
});
function contrastWCAG21(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  return (Y1 + 0.05) / (Y2 + 0.05);
}
var normBG = 0.56;
var normTXT = 0.57;
var revTXT = 0.62;
var revBG = 0.65;
var blkThrs = 0.022;
var blkClmp = 1.414;
var loClip = 0.1;
var deltaYmin = 5e-4;
var scaleBoW = 1.14;
var loBoWoffset = 0.027;
var scaleWoB = 1.14;
function fclamp(Y) {
  if (Y >= blkThrs) {
    return Y;
  }
  return Y + (blkThrs - Y) ** blkClmp;
}
function linearize(val) {
  let sign = val < 0 ? -1 : 1;
  let abs = Math.abs(val);
  return sign * Math.pow(abs, 2.4);
}
function contrastAPCA(background, foreground) {
  foreground = getColor(foreground);
  background = getColor(background);
  let S;
  let C;
  let Sapc;
  let R, G, B;
  foreground = to$2(foreground, "srgb");
  [R, G, B] = foreground.coords;
  let lumTxt = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.072175;
  background = to$2(background, "srgb");
  [R, G, B] = background.coords;
  let lumBg = linearize(R) * 0.2126729 + linearize(G) * 0.7151522 + linearize(B) * 0.072175;
  let Ytxt = fclamp(lumTxt);
  let Ybg = fclamp(lumBg);
  let BoW = Ybg > Ytxt;
  if (Math.abs(Ybg - Ytxt) < deltaYmin) {
    C = 0;
  } else {
    if (BoW) {
      S = Ybg ** normBG - Ytxt ** normTXT;
      C = S * scaleBoW;
    } else {
      S = Ybg ** revBG - Ytxt ** revTXT;
      C = S * scaleWoB;
    }
  }
  if (Math.abs(C) < loClip) {
    Sapc = 0;
  } else if (C > 0) {
    Sapc = C - loBoWoffset;
  } else {
    Sapc = C + loBoWoffset;
  }
  return Sapc * 100;
}
function contrastMichelson(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  let denom = Y1 + Y2;
  return denom === 0 ? 0 : (Y1 - Y2) / denom;
}
var max$3 = 5e4;
function contrastWeber(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Y1 = Math.max(getLuminance(color1), 0);
  let Y2 = Math.max(getLuminance(color2), 0);
  if (Y2 > Y1) {
    [Y1, Y2] = [Y2, Y1];
  }
  return Y2 === 0 ? max$3 : (Y1 - Y2) / Y2;
}
function contrastLstar(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let L1 = get$1(color1, [lab, "l"]);
  let L2 = get$1(color2, [lab, "l"]);
  return Math.abs(L1 - L2);
}
var \u03B5$3 = 216 / 24389;
var \u03B53 = 24 / 116;
var \u03BA$2 = 24389 / 27;
var white$1 = WHITES.D65;
var lab_d65 = new ColorSpace({
  id: "lab-d65",
  name: "Lab D65",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    a: {
      refRange: [-125, 125]
    },
    b: {
      refRange: [-125, 125]
    }
  },
  // Assuming XYZ is relative to D65, convert to CIE Lab
  // from CIE standard, which now defines these as a rational fraction
  white: white$1,
  base: xyz_d65,
  // Convert D65-adapted XYZ to Lab
  //  CIE 15.3:2004 section 8.2.1.1
  fromBase(XYZ) {
    let xyz = XYZ.map((value, i) => value / white$1[i]);
    let f = xyz.map((value) => value > \u03B5$3 ? Math.cbrt(value) : (\u03BA$2 * value + 16) / 116);
    return [
      116 * f[1] - 16,
      // L
      500 * (f[0] - f[1]),
      // a
      200 * (f[1] - f[2])
      // b
    ];
  },
  // Convert Lab to D65-adapted XYZ
  // Same result as CIE 15.3:2004 Appendix D although the derivation is different
  // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
  toBase(Lab) {
    let f = [];
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    let xyz = [
      f[0] > \u03B53 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / \u03BA$2,
      Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / \u03BA$2,
      f[2] > \u03B53 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / \u03BA$2
    ];
    return xyz.map((value, i) => value * white$1[i]);
  },
  formats: {
    "lab-d65": {
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var phi = Math.pow(5, 0.5) * 0.5 + 0.5;
function contrastDeltaPhi(color1, color2) {
  color1 = getColor(color1);
  color2 = getColor(color2);
  let Lstr1 = get$1(color1, [lab_d65, "l"]);
  let Lstr2 = get$1(color2, [lab_d65, "l"]);
  let deltaPhiStar = Math.abs(Math.pow(Lstr1, phi) - Math.pow(Lstr2, phi));
  let contrast2 = Math.pow(deltaPhiStar, 1 / phi) * Math.SQRT2 - 40;
  return contrast2 < 7.5 ? 0 : contrast2;
}
var contrastMethods = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  contrastAPCA,
  contrastDeltaPhi,
  contrastLstar,
  contrastMichelson,
  contrastWCAG21,
  contrastWeber
});
function contrast(background, foreground, o = {}) {
  if (isString(o)) {
    o = { algorithm: o };
  }
  let { algorithm, ...rest } = o;
  if (!algorithm) {
    let algorithms = Object.keys(contrastMethods).map((a2) => a2.replace(/^contrast/, "")).join(", ");
    throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${algorithms}`);
  }
  background = getColor(background);
  foreground = getColor(foreground);
  for (let a2 in contrastMethods) {
    if ("contrast" + algorithm.toLowerCase() === a2.toLowerCase()) {
      return contrastMethods[a2](background, foreground, rest);
    }
  }
  throw new TypeError(`Unknown contrast algorithm: ${algorithm}`);
}
function uv(color) {
  let [X, Y, Z] = getAll(color, xyz_d65);
  let denom = X + 15 * Y + 3 * Z;
  return [4 * X / denom, 9 * Y / denom];
}
function xy(color) {
  let [X, Y, Z] = getAll(color, xyz_d65);
  let sum = X + Y + Z;
  return [X / sum, Y / sum];
}
function register$1(Color2) {
  Object.defineProperty(Color2.prototype, "uv", {
    get() {
      return uv(this);
    }
  });
  Object.defineProperty(Color2.prototype, "xy", {
    get() {
      return xy(this);
    }
  });
}
var chromaticity = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  register: register$1,
  uv,
  xy
});
function deltaE(c12, c22, o = {}) {
  if (isString(o)) {
    o = { method: o };
  }
  let { method = defaults.deltaE, ...rest } = o;
  for (let m3 in deltaEMethods) {
    if ("deltae" + method.toLowerCase() === m3.toLowerCase()) {
      return deltaEMethods[m3](c12, c22, rest);
    }
  }
  throw new TypeError(`Unknown deltaE method: ${method}`);
}
function lighten(color, amount = 0.25) {
  let space = ColorSpace.get("oklch", "lch");
  let lightness = [space, "l"];
  return set$1(color, lightness, (l) => l * (1 + amount));
}
function darken(color, amount = 0.25) {
  let space = ColorSpace.get("oklch", "lch");
  let lightness = [space, "l"];
  return set$1(color, lightness, (l) => l * (1 - amount));
}
var variations = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  darken,
  lighten
});
function mix$1(c12, c22, p2 = 0.5, o = {}) {
  [c12, c22] = [getColor(c12), getColor(c22)];
  if (type(p2) === "object") {
    [p2, o] = [0.5, p2];
  }
  let r = range(c12, c22, o);
  return r(p2);
}
function steps(c12, c22, options = {}) {
  let colorRange;
  if (isRange(c12)) {
    [colorRange, options] = [c12, c22];
    [c12, c22] = colorRange.rangeArgs.colors;
  }
  let {
    maxDeltaE,
    deltaEMethod,
    steps: steps2 = 2,
    maxSteps = 1e3,
    ...rangeOptions
  } = options;
  if (!colorRange) {
    [c12, c22] = [getColor(c12), getColor(c22)];
    colorRange = range(c12, c22, rangeOptions);
  }
  let totalDelta = deltaE(c12, c22);
  let actualSteps = maxDeltaE > 0 ? Math.max(steps2, Math.ceil(totalDelta / maxDeltaE) + 1) : steps2;
  let ret = [];
  if (maxSteps !== void 0) {
    actualSteps = Math.min(actualSteps, maxSteps);
  }
  if (actualSteps === 1) {
    ret = [{ p: 0.5, color: colorRange(0.5) }];
  } else {
    let step = 1 / (actualSteps - 1);
    ret = Array.from({ length: actualSteps }, (_, i) => {
      let p2 = i * step;
      return { p: p2, color: colorRange(p2) };
    });
  }
  if (maxDeltaE > 0) {
    let maxDelta = ret.reduce((acc, cur, i) => {
      if (i === 0) {
        return 0;
      }
      let \u0394\u0395 = deltaE(cur.color, ret[i - 1].color, deltaEMethod);
      return Math.max(acc, \u0394\u0395);
    }, 0);
    while (maxDelta > maxDeltaE) {
      maxDelta = 0;
      for (let i = 1; i < ret.length && ret.length < maxSteps; i++) {
        let prev = ret[i - 1];
        let cur = ret[i];
        let p2 = (cur.p + prev.p) / 2;
        let color = colorRange(p2);
        maxDelta = Math.max(maxDelta, deltaE(color, prev.color), deltaE(color, cur.color));
        ret.splice(i, 0, { p: p2, color: colorRange(p2) });
        i++;
      }
    }
  }
  ret = ret.map((a2) => a2.color);
  return ret;
}
function range(color1, color2, options = {}) {
  if (isRange(color1)) {
    let [r, options2] = [color1, color2];
    return range(...r.rangeArgs.colors, { ...r.rangeArgs.options, ...options2 });
  }
  let { space, outputSpace, progression, premultiplied } = options;
  color1 = getColor(color1);
  color2 = getColor(color2);
  color1 = clone$1(color1);
  color2 = clone$1(color2);
  let rangeArgs = { colors: [color1, color2], options };
  if (space) {
    space = ColorSpace.get(space);
  } else {
    space = ColorSpace.registry[defaults.interpolationSpace] || color1.space;
  }
  outputSpace = outputSpace ? ColorSpace.get(outputSpace) : space;
  color1 = to$2(color1, space);
  color2 = to$2(color2, space);
  color1 = toGamut(color1);
  color2 = toGamut(color2);
  if (space.coords.h && space.coords.h.type === "angle") {
    let arc = options.hue = options.hue || "shorter";
    let hue = [space, "h"];
    let [\u03B81, \u03B82] = [get$1(color1, hue), get$1(color2, hue)];
    if (isNaN(\u03B81) && !isNaN(\u03B82)) {
      \u03B81 = \u03B82;
    } else if (isNaN(\u03B82) && !isNaN(\u03B81)) {
      \u03B82 = \u03B81;
    }
    [\u03B81, \u03B82] = adjust(arc, [\u03B81, \u03B82]);
    set$1(color1, hue, \u03B81);
    set$1(color2, hue, \u03B82);
  }
  if (premultiplied) {
    color1.coords = color1.coords.map((c4) => c4 * color1.alpha);
    color2.coords = color2.coords.map((c4) => c4 * color2.alpha);
  }
  return Object.assign((p2) => {
    p2 = progression ? progression(p2) : p2;
    let coords = color1.coords.map((start, i) => {
      let end = color2.coords[i];
      return interpolate$2(start, end, p2);
    });
    let alpha = interpolate$2(color1.alpha, color2.alpha, p2);
    let ret = { space, coords, alpha };
    if (premultiplied) {
      ret.coords = ret.coords.map((c4) => c4 / alpha);
    }
    if (outputSpace !== space) {
      ret = to$2(ret, outputSpace);
    }
    return ret;
  }, {
    rangeArgs
  });
}
function isRange(val) {
  return type(val) === "function" && !!val.rangeArgs;
}
defaults.interpolationSpace = "lab";
function register(Color2) {
  Color2.defineFunction("mix", mix$1, { returns: "color" });
  Color2.defineFunction("range", range, { returns: "function<color>" });
  Color2.defineFunction("steps", steps, { returns: "array<color>" });
}
var interpolation = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  isRange,
  mix: mix$1,
  range,
  register,
  steps
});
var HSL = new ColorSpace({
  id: "hsl",
  name: "HSL",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: sRGB,
  // Adapted from https://drafts.csswg.org/css-color-4/better-rgbToHsl.js
  fromBase: (rgb) => {
    let max2 = Math.max(...rgb);
    let min = Math.min(...rgb);
    let [r, g2, b2] = rgb;
    let [h, s, l] = [NaN, 0, (min + max2) / 2];
    let d2 = max2 - min;
    if (d2 !== 0) {
      s = l === 0 || l === 1 ? 0 : (max2 - l) / Math.min(l, 1 - l);
      switch (max2) {
        case r:
          h = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h = (b2 - r) / d2 + 2;
          break;
        case b2:
          h = (r - g2) / d2 + 4;
      }
      h = h * 60;
    }
    if (s < 0) {
      h += 180;
      s = Math.abs(s);
    }
    if (h >= 360) {
      h -= 360;
    }
    return [h, s * 100, l * 100];
  },
  // Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
  toBase: (hsl) => {
    let [h, s, l] = hsl;
    h = h % 360;
    if (h < 0) {
      h += 360;
    }
    s /= 100;
    l /= 100;
    function f(n2) {
      let k = (n2 + h / 30) % 12;
      let a2 = s * Math.min(l, 1 - l);
      return l - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    }
    return [f(0), f(8), f(4)];
  },
  formats: {
    "hsl": {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"]
    },
    "hsla": {
      coords: ["<number> | <angle>", "<percentage>", "<percentage>"],
      commas: true,
      lastAlpha: true
    }
  }
});
var HSV = new ColorSpace({
  id: "hsv",
  name: "HSV",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    v: {
      range: [0, 100],
      name: "Value"
    }
  },
  base: HSL,
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  fromBase(hsl) {
    let [h, s, l] = hsl;
    s /= 100;
    l /= 100;
    let v = l + s * Math.min(l, 1 - l);
    return [
      h,
      // h is the same
      v === 0 ? 0 : 200 * (1 - l / v),
      // s
      100 * v
    ];
  },
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
  toBase(hsv) {
    let [h, s, v] = hsv;
    s /= 100;
    v /= 100;
    let l = v * (1 - s / 2);
    return [
      h,
      // h is the same
      l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l) * 100,
      l * 100
    ];
  },
  formats: {
    color: {
      id: "--hsv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var hwb = new ColorSpace({
  id: "hwb",
  name: "HWB",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    w: {
      range: [0, 100],
      name: "Whiteness"
    },
    b: {
      range: [0, 100],
      name: "Blackness"
    }
  },
  base: HSV,
  fromBase(hsv) {
    let [h, s, v] = hsv;
    return [h, v * (100 - s) / 100, 100 - v];
  },
  toBase(hwb2) {
    let [h, w, b2] = hwb2;
    w /= 100;
    b2 /= 100;
    let sum = w + b2;
    if (sum >= 1) {
      let gray = w / sum;
      return [h, 0, gray * 100];
    }
    let v = 1 - b2;
    let s = v === 0 ? 0 : 1 - w / v;
    return [h, s * 100, v * 100];
  },
  formats: {
    "hwb": {
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var toXYZ_M$2 = [
  [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
  [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
  [0.02703136138641234, 0.07068885253582723, 0.9913375368376388]
];
var fromXYZ_M$2 = [
  [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
  [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
  [0.013444280632031142, -0.11836239223101838, 1.0151749943912054]
];
var A98Linear = new RGBColorSpace({
  id: "a98rgb-linear",
  cssId: "--a98-rgb-linear",
  name: "Linear Adobe\xAE 98 RGB compatible",
  white: "D65",
  toXYZ_M: toXYZ_M$2,
  fromXYZ_M: fromXYZ_M$2
});
var a98rgb = new RGBColorSpace({
  id: "a98rgb",
  cssId: "a98-rgb",
  name: "Adobe\xAE 98 RGB compatible",
  base: A98Linear,
  toBase: (RGB) => RGB.map((val) => Math.pow(Math.abs(val), 563 / 256) * Math.sign(val)),
  fromBase: (RGB) => RGB.map((val) => Math.pow(Math.abs(val), 256 / 563) * Math.sign(val))
});
var toXYZ_M$1 = [
  [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
  [0.2880748288194013, 0.711835234241873, 8993693872564e-17],
  [0, 0, 0.8251046025104602]
];
var fromXYZ_M$1 = [
  [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
  [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
  [0, 0, 1.2119675456389452]
];
var ProPhotoLinear = new RGBColorSpace({
  id: "prophoto-linear",
  cssId: "--prophoto-rgb-linear",
  name: "Linear ProPhoto",
  white: "D50",
  base: XYZ_D50,
  toXYZ_M: toXYZ_M$1,
  fromXYZ_M: fromXYZ_M$1
});
var Et = 1 / 512;
var Et2 = 16 / 512;
var prophoto = new RGBColorSpace({
  id: "prophoto",
  cssId: "prophoto-rgb",
  name: "ProPhoto",
  base: ProPhotoLinear,
  toBase(RGB) {
    return RGB.map((v) => v < Et2 ? v / 16 : v ** 1.8);
  },
  fromBase(RGB) {
    return RGB.map((v) => v >= Et ? v ** (1 / 1.8) : 16 * v);
  }
});
var oklch = new ColorSpace({
  id: "oklch",
  name: "Oklch",
  coords: {
    l: {
      refRange: [0, 1],
      name: "Lightness"
    },
    c: {
      refRange: [0, 0.4],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  white: "D65",
  base: OKLab,
  fromBase(oklab) {
    let [L, a2, b2] = oklab;
    let h;
    const \u03B52 = 2e-4;
    if (Math.abs(a2) < \u03B52 && Math.abs(b2) < \u03B52) {
      h = NaN;
    } else {
      h = Math.atan2(b2, a2) * 180 / Math.PI;
    }
    return [
      L,
      // OKLab L is still L
      Math.sqrt(a2 ** 2 + b2 ** 2),
      // Chroma
      constrain(h)
      // Hue, in degrees [0 to 360)
    ];
  },
  // Convert from polar form
  toBase(oklch2) {
    let [L, C, h] = oklch2;
    let a2, b2;
    if (isNaN(h)) {
      a2 = 0;
      b2 = 0;
    } else {
      a2 = C * Math.cos(h * Math.PI / 180);
      b2 = C * Math.sin(h * Math.PI / 180);
    }
    return [L, a2, b2];
  },
  formats: {
    "oklch": {
      coords: ["<percentage> | <number>", "<number> | <percentage>[0,1]", "<number> | <angle>"]
    }
  }
});
var white = WHITES.D65;
var \u03B5$2 = 216 / 24389;
var \u03BA$1 = 24389 / 27;
var [U_PRIME_WHITE, V_PRIME_WHITE] = uv({ space: xyz_d65, coords: white });
var Luv = new ColorSpace({
  id: "luv",
  name: "Luv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    // Reference ranges from https://facelessuser.github.io/coloraide/colors/luv/
    u: {
      refRange: [-215, 215]
    },
    v: {
      refRange: [-215, 215]
    }
  },
  white,
  base: xyz_d65,
  // Convert D65-adapted XYZ to Luv
  // https://en.wikipedia.org/wiki/CIELUV#The_forward_transformation
  fromBase(XYZ) {
    let xyz = [skipNone(XYZ[0]), skipNone(XYZ[1]), skipNone(XYZ[2])];
    let y = xyz[1];
    let [up, vp] = uv({ space: xyz_d65, coords: xyz });
    if (!Number.isFinite(up) || !Number.isFinite(vp)) {
      return [0, 0, 0];
    }
    let L = y <= \u03B5$2 ? \u03BA$1 * y : 116 * Math.cbrt(y) - 16;
    return [
      L,
      13 * L * (up - U_PRIME_WHITE),
      13 * L * (vp - V_PRIME_WHITE)
    ];
  },
  // Convert Luv to D65-adapted XYZ
  // https://en.wikipedia.org/wiki/CIELUV#The_reverse_transformation
  toBase(Luv2) {
    let [L, u, v] = Luv2;
    if (L === 0 || isNone(L)) {
      return [0, 0, 0];
    }
    u = skipNone(u);
    v = skipNone(v);
    let up = u / (13 * L) + U_PRIME_WHITE;
    let vp = v / (13 * L) + V_PRIME_WHITE;
    let y = L <= 8 ? L / \u03BA$1 : Math.pow((L + 16) / 116, 3);
    return [
      y * (9 * up / (4 * vp)),
      y,
      y * ((12 - 3 * up - 20 * vp) / (4 * vp))
    ];
  },
  formats: {
    color: {
      id: "--luv",
      coords: ["<number> | <percentage>", "<number> | <percentage>[-1,1]", "<number> | <percentage>[-1,1]"]
    }
  }
});
var LCHuv = new ColorSpace({
  id: "lchuv",
  name: "LChuv",
  coords: {
    l: {
      refRange: [0, 100],
      name: "Lightness"
    },
    c: {
      refRange: [0, 220],
      name: "Chroma"
    },
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    }
  },
  base: Luv,
  fromBase(Luv2) {
    let [L, u, v] = Luv2;
    let hue;
    const \u03B52 = 0.02;
    if (Math.abs(u) < \u03B52 && Math.abs(v) < \u03B52) {
      hue = NaN;
    } else {
      hue = Math.atan2(v, u) * 180 / Math.PI;
    }
    return [
      L,
      // L is still L
      Math.sqrt(u ** 2 + v ** 2),
      // Chroma
      constrain(hue)
      // Hue, in degrees [0 to 360)
    ];
  },
  toBase(LCH) {
    let [Lightness, Chroma, Hue] = LCH;
    if (Chroma < 0) {
      Chroma = 0;
    }
    if (isNaN(Hue)) {
      Hue = 0;
    }
    return [
      Lightness,
      // L is still L
      Chroma * Math.cos(Hue * Math.PI / 180),
      // u
      Chroma * Math.sin(Hue * Math.PI / 180)
      // v
    ];
  },
  formats: {
    color: {
      id: "--lchuv",
      coords: ["<number> | <percentage>", "<number> | <percentage>", "<number> | <angle>"]
    }
  }
});
var \u03B5$1 = 216 / 24389;
var \u03BA = 24389 / 27;
var m_r0 = fromXYZ_M$3[0][0];
var m_r1 = fromXYZ_M$3[0][1];
var m_r2 = fromXYZ_M$3[0][2];
var m_g0 = fromXYZ_M$3[1][0];
var m_g1 = fromXYZ_M$3[1][1];
var m_g2 = fromXYZ_M$3[1][2];
var m_b0 = fromXYZ_M$3[2][0];
var m_b1 = fromXYZ_M$3[2][1];
var m_b2 = fromXYZ_M$3[2][2];
function distanceFromOriginAngle(slope, intercept, angle) {
  const d2 = intercept / (Math.sin(angle) - slope * Math.cos(angle));
  return d2 < 0 ? Infinity : d2;
}
function calculateBoundingLines(l) {
  const sub1 = Math.pow(l + 16, 3) / 1560896;
  const sub2 = sub1 > \u03B5$1 ? sub1 : l / \u03BA;
  const s1r = sub2 * (284517 * m_r0 - 94839 * m_r2);
  const s2r = sub2 * (838422 * m_r2 + 769860 * m_r1 + 731718 * m_r0);
  const s3r = sub2 * (632260 * m_r2 - 126452 * m_r1);
  const s1g = sub2 * (284517 * m_g0 - 94839 * m_g2);
  const s2g = sub2 * (838422 * m_g2 + 769860 * m_g1 + 731718 * m_g0);
  const s3g = sub2 * (632260 * m_g2 - 126452 * m_g1);
  const s1b = sub2 * (284517 * m_b0 - 94839 * m_b2);
  const s2b = sub2 * (838422 * m_b2 + 769860 * m_b1 + 731718 * m_b0);
  const s3b = sub2 * (632260 * m_b2 - 126452 * m_b1);
  return {
    r0s: s1r / s3r,
    r0i: s2r * l / s3r,
    r1s: s1r / (s3r + 126452),
    r1i: (s2r - 769860) * l / (s3r + 126452),
    g0s: s1g / s3g,
    g0i: s2g * l / s3g,
    g1s: s1g / (s3g + 126452),
    g1i: (s2g - 769860) * l / (s3g + 126452),
    b0s: s1b / s3b,
    b0i: s2b * l / s3b,
    b1s: s1b / (s3b + 126452),
    b1i: (s2b - 769860) * l / (s3b + 126452)
  };
}
function calcMaxChromaHsluv(lines, h) {
  const hueRad = h / 360 * Math.PI * 2;
  const r0 = distanceFromOriginAngle(lines.r0s, lines.r0i, hueRad);
  const r1 = distanceFromOriginAngle(lines.r1s, lines.r1i, hueRad);
  const g0 = distanceFromOriginAngle(lines.g0s, lines.g0i, hueRad);
  const g1 = distanceFromOriginAngle(lines.g1s, lines.g1i, hueRad);
  const b0 = distanceFromOriginAngle(lines.b0s, lines.b0i, hueRad);
  const b1 = distanceFromOriginAngle(lines.b1s, lines.b1i, hueRad);
  return Math.min(r0, r1, g0, g1, b0, b1);
}
var hsluv = new ColorSpace({
  id: "hsluv",
  name: "HSLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: LCHuv,
  gamutSpace: sRGB,
  // Convert LCHuv to HSLuv
  fromBase(lch2) {
    let [l, c4, h] = [skipNone(lch2[0]), skipNone(lch2[1]), skipNone(lch2[2])];
    let s;
    if (l > 99.9999999) {
      s = 0;
      l = 100;
    } else if (l < 1e-8) {
      s = 0;
      l = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max2 = calcMaxChromaHsluv(lines, h);
      s = c4 / max2 * 100;
    }
    return [h, s, l];
  },
  // Convert HSLuv to LCHuv
  toBase(hsl) {
    let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
    let c4;
    if (l > 99.9999999) {
      l = 100;
      c4 = 0;
    } else if (l < 1e-8) {
      l = 0;
      c4 = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max2 = calcMaxChromaHsluv(lines, h);
      c4 = max2 / 100 * s;
    }
    return [l, c4, h];
  },
  formats: {
    color: {
      id: "--hsluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
fromXYZ_M$3[0][0];
fromXYZ_M$3[0][1];
fromXYZ_M$3[0][2];
fromXYZ_M$3[1][0];
fromXYZ_M$3[1][1];
fromXYZ_M$3[1][2];
fromXYZ_M$3[2][0];
fromXYZ_M$3[2][1];
fromXYZ_M$3[2][2];
function distanceFromOrigin(slope, intercept) {
  return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
}
function calcMaxChromaHpluv(lines) {
  let r0 = distanceFromOrigin(lines.r0s, lines.r0i);
  let r1 = distanceFromOrigin(lines.r1s, lines.r1i);
  let g0 = distanceFromOrigin(lines.g0s, lines.g0i);
  let g1 = distanceFromOrigin(lines.g1s, lines.g1i);
  let b0 = distanceFromOrigin(lines.b0s, lines.b0i);
  let b1 = distanceFromOrigin(lines.b1s, lines.b1i);
  return Math.min(r0, r1, g0, g1, b0, b1);
}
var hpluv = new ColorSpace({
  id: "hpluv",
  name: "HPLuv",
  coords: {
    h: {
      refRange: [0, 360],
      type: "angle",
      name: "Hue"
    },
    s: {
      range: [0, 100],
      name: "Saturation"
    },
    l: {
      range: [0, 100],
      name: "Lightness"
    }
  },
  base: LCHuv,
  gamutSpace: "self",
  // Convert LCHuv to HPLuv
  fromBase(lch2) {
    let [l, c4, h] = [skipNone(lch2[0]), skipNone(lch2[1]), skipNone(lch2[2])];
    let s;
    if (l > 99.9999999) {
      s = 0;
      l = 100;
    } else if (l < 1e-8) {
      s = 0;
      l = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max2 = calcMaxChromaHpluv(lines);
      s = c4 / max2 * 100;
    }
    return [h, s, l];
  },
  // Convert HPLuv to LCHuv
  toBase(hsl) {
    let [h, s, l] = [skipNone(hsl[0]), skipNone(hsl[1]), skipNone(hsl[2])];
    let c4;
    if (l > 99.9999999) {
      l = 100;
      c4 = 0;
    } else if (l < 1e-8) {
      l = 0;
      c4 = 0;
    } else {
      let lines = calculateBoundingLines(l);
      let max2 = calcMaxChromaHpluv(lines);
      c4 = max2 / 100 * s;
    }
    return [l, c4, h];
  },
  formats: {
    color: {
      id: "--hpluv",
      coords: ["<number> | <angle>", "<percentage> | <number>", "<percentage> | <number>"]
    }
  }
});
var Yw = 203;
var n = 2610 / 2 ** 14;
var ninv = 2 ** 14 / 2610;
var m = 2523 / 2 ** 5;
var minv = 2 ** 5 / 2523;
var c1 = 3424 / 2 ** 12;
var c2 = 2413 / 2 ** 7;
var c3 = 2392 / 2 ** 7;
var rec2100Pq = new RGBColorSpace({
  id: "rec2100pq",
  cssId: "rec2100-pq",
  name: "REC.2100-PQ",
  base: REC2020Linear,
  toBase(RGB) {
    return RGB.map(function(val) {
      let x = (Math.max(val ** minv - c1, 0) / (c2 - c3 * val ** minv)) ** ninv;
      return x * 1e4 / Yw;
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      let x = Math.max(val * Yw / 1e4, 0);
      let num = c1 + c2 * x ** n;
      let denom = 1 + c3 * x ** n;
      return (num / denom) ** m;
    });
  }
});
var a = 0.17883277;
var b = 0.28466892;
var c = 0.55991073;
var scale2$1 = 3.7743;
var rec2100Hlg = new RGBColorSpace({
  id: "rec2100hlg",
  cssId: "rec2100-hlg",
  name: "REC.2100-HLG",
  referred: "scene",
  base: REC2020Linear,
  toBase(RGB) {
    return RGB.map(function(val) {
      if (val <= 0.5) {
        return val ** 2 / 3 * scale2$1;
      }
      return (Math.exp((val - c) / a) + b) / 12 * scale2$1;
    });
  },
  fromBase(RGB) {
    return RGB.map(function(val) {
      val /= scale2$1;
      if (val <= 1 / 12) {
        return Math.sqrt(3 * val);
      }
      return a * Math.log(12 * val - b) + c;
    });
  }
});
var CATs = {};
hooks.add("chromatic-adaptation-start", (env) => {
  if (env.options.method) {
    env.M = adapt(env.W1, env.W2, env.options.method);
  }
});
hooks.add("chromatic-adaptation-end", (env) => {
  if (!env.M) {
    env.M = adapt(env.W1, env.W2, env.options.method);
  }
});
function defineCAT({ id, toCone_M, fromCone_M }) {
  CATs[id] = arguments[0];
}
function adapt(W1, W2, id = "Bradford") {
  let method = CATs[id];
  let [\u03C1s, \u03B3s, \u03B2s] = multiplyMatrices(method.toCone_M, W1);
  let [\u03C1d, \u03B3d, \u03B2d] = multiplyMatrices(method.toCone_M, W2);
  let scale4 = [
    [\u03C1d / \u03C1s, 0, 0],
    [0, \u03B3d / \u03B3s, 0],
    [0, 0, \u03B2d / \u03B2s]
  ];
  let scaled_cone_M = multiplyMatrices(scale4, method.toCone_M);
  let adapt_M = multiplyMatrices(method.fromCone_M, scaled_cone_M);
  return adapt_M;
}
defineCAT({
  id: "von Kries",
  toCone_M: [
    [0.40024, 0.7076, -0.08081],
    [-0.2263, 1.16532, 0.0457],
    [0, 0, 0.91822]
  ],
  fromCone_M: [
    [1.8599363874558397, -1.1293816185800916, 0.21989740959619328],
    [0.3611914362417676, 0.6388124632850422, -6370596838649899e-21],
    [0, 0, 1.0890636230968613]
  ]
});
defineCAT({
  id: "Bradford",
  // Convert an array of XYZ values in the range 0.0 - 1.0
  // to cone fundamentals
  toCone_M: [
    [0.8951, 0.2664, -0.1614],
    [-0.7502, 1.7135, 0.0367],
    [0.0389, -0.0685, 1.0296]
  ],
  // and back
  fromCone_M: [
    [0.9869929054667121, -0.14705425642099013, 0.15996265166373122],
    [0.4323052697233945, 0.5183602715367774, 0.049291228212855594],
    [-0.00852866457517732, 0.04004282165408486, 0.96848669578755]
  ]
});
defineCAT({
  id: "CAT02",
  // with complete chromatic adaptation to W2, so D = 1.0
  toCone_M: [
    [0.7328, 0.4296, -0.1624],
    [-0.7036, 1.6975, 61e-4],
    [3e-3, 0.0136, 0.9834]
  ],
  fromCone_M: [
    [1.0961238208355142, -0.27886900021828726, 0.18274517938277307],
    [0.4543690419753592, 0.4735331543074117, 0.07209780371722911],
    [-0.009627608738429355, -0.00569803121611342, 1.0153256399545427]
  ]
});
defineCAT({
  id: "CAT16",
  toCone_M: [
    [0.401288, 0.650173, -0.051461],
    [-0.250268, 1.204414, 0.045854],
    [-2079e-6, 0.048952, 0.953127]
  ],
  // the extra precision is needed to avoid roundtripping errors
  fromCone_M: [
    [1.862067855087233, -1.0112546305316845, 0.14918677544445172],
    [0.3875265432361372, 0.6214474419314753, -0.008973985167612521],
    [-0.01584149884933386, -0.03412293802851557, 1.0499644368778496]
  ]
});
Object.assign(WHITES, {
  // whitepoint values from ASTM E308-01 with 10nm spacing, 1931 2 degree observer
  // all normalized to Y (luminance) = 1.00000
  // Illuminant A is a tungsten electric light, giving a very warm, orange light.
  A: [1.0985, 1, 0.35585],
  // Illuminant C was an early approximation to daylight: illuminant A with a blue filter.
  C: [0.98074, 1, 1.18232],
  // The daylight series of illuminants simulate natural daylight.
  // The color temperature (in degrees Kelvin/100) ranges from
  // cool, overcast daylight (D50) to bright, direct sunlight (D65).
  D55: [0.95682, 1, 0.92149],
  D75: [0.94972, 1, 1.22638],
  // Equal-energy illuminant, used in two-stage CAT16
  E: [1, 1, 1],
  // The F series of illuminants represent fluorescent lights
  F2: [0.99186, 1, 0.67393],
  F7: [0.95041, 1, 1.08747],
  F11: [1.00962, 1, 0.6435]
});
WHITES.ACES = [0.32168 / 0.33767, 1, (1 - 0.32168 - 0.33767) / 0.33767];
var toXYZ_M = [
  [0.6624541811085053, 0.13400420645643313, 0.1561876870049078],
  [0.27222871678091454, 0.6740817658111484, 0.05368951740793705],
  [-0.005574649490394108, 0.004060733528982826, 1.0103391003129971]
];
var fromXYZ_M = [
  [1.6410233796943257, -0.32480329418479, -0.23642469523761225],
  [-0.6636628587229829, 1.6153315916573379, 0.016756347685530137],
  [0.011721894328375376, -0.008284441996237409, 0.9883948585390215]
];
var ACEScg = new RGBColorSpace({
  id: "acescg",
  cssId: "--acescg",
  name: "ACEScg",
  // ACEScg – A scene-referred, linear-light encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescg/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  coords: {
    r: {
      range: [0, 65504],
      name: "Red"
    },
    g: {
      range: [0, 65504],
      name: "Green"
    },
    b: {
      range: [0, 65504],
      name: "Blue"
    }
  },
  referred: "scene",
  white: WHITES.ACES,
  toXYZ_M,
  fromXYZ_M
});
var \u03B5 = 2 ** -16;
var ACES_min_nonzero = -0.35828683;
var ACES_cc_max = (Math.log2(65504) + 9.72) / 17.52;
var acescc = new RGBColorSpace({
  id: "acescc",
  cssId: "--acescc",
  name: "ACEScc",
  // see S-2014-003 ACEScc – A Logarithmic Encoding of ACES Data
  // https://docs.acescentral.com/specifications/acescc/
  // uses the AP1 primaries, see section 4.3.1 Color primaries
  // Appendix A: "Very small ACES scene referred values below 7 1/4 stops
  // below 18% middle gray are encoded as negative ACEScc values.
  // These values should be preserved per the encoding in Section 4.4
  // so that all positive ACES values are maintained."
  coords: {
    r: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Red"
    },
    g: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Green"
    },
    b: {
      range: [ACES_min_nonzero, ACES_cc_max],
      name: "Blue"
    }
  },
  referred: "scene",
  base: ACEScg,
  // from section 4.4.2 Decoding Function
  toBase(RGB) {
    const low = (9.72 - 15) / 17.52;
    return RGB.map(function(val) {
      if (val <= low) {
        return (2 ** (val * 17.52 - 9.72) - \u03B5) * 2;
      } else if (val < ACES_cc_max) {
        return 2 ** (val * 17.52 - 9.72);
      } else {
        return 65504;
      }
    });
  },
  // Non-linear encoding function from S-2014-003, section 4.4.1 Encoding Function
  fromBase(RGB) {
    return RGB.map(function(val) {
      if (val <= 0) {
        return (Math.log2(\u03B5) + 9.72) / 17.52;
      } else if (val < \u03B5) {
        return (Math.log2(\u03B5 + val * 0.5) + 9.72) / 17.52;
      } else {
        return (Math.log2(val) + 9.72) / 17.52;
      }
    });
  }
  // encoded media white (rgb 1,1,1) => linear  [ 222.861, 222.861, 222.861 ]
  // encoded media black (rgb 0,0,0) => linear [ 0.0011857, 0.0011857, 0.0011857]
});
var spaces = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  A98RGB: a98rgb,
  A98RGB_Linear: A98Linear,
  ACEScc: acescc,
  ACEScg,
  CAM16_JMh: cam16,
  HCT: hct,
  HPLuv: hpluv,
  HSL,
  HSLuv: hsluv,
  HSV,
  HWB: hwb,
  ICTCP: ictcp,
  JzCzHz: jzczhz,
  Jzazbz,
  LCH: lch,
  LCHuv,
  Lab: lab,
  Lab_D65: lab_d65,
  Luv,
  OKLCH: oklch,
  OKLab,
  P3,
  P3_Linear: P3Linear,
  ProPhoto: prophoto,
  ProPhoto_Linear: ProPhotoLinear,
  REC_2020: REC2020,
  REC_2020_Linear: REC2020Linear,
  REC_2100_HLG: rec2100Hlg,
  REC_2100_PQ: rec2100Pq,
  XYZ_ABS_D65: XYZ_Abs_D65,
  XYZ_D50,
  XYZ_D65: xyz_d65,
  sRGB,
  sRGB_Linear: sRGBLinear
});
var Color = class _Color {
  /**
   * Creates an instance of Color.
   * Signatures:
   * - `new Color(stringToParse)`
   * - `new Color(otherColor)`
   * - `new Color({space, coords, alpha})`
   * - `new Color(space, coords, alpha)`
   * - `new Color(spaceId, coords, alpha)`
   */
  constructor(...args) {
    let color;
    if (args.length === 1) {
      color = getColor(args[0]);
    }
    let space, coords, alpha;
    if (color) {
      space = color.space || color.spaceId;
      coords = color.coords;
      alpha = color.alpha;
    } else {
      [space, coords, alpha] = args;
    }
    Object.defineProperty(this, "space", {
      value: ColorSpace.get(space),
      writable: false,
      enumerable: true,
      configurable: true
      // see note in https://262.ecma-international.org/8.0/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver
    });
    this.coords = coords ? coords.slice() : [0, 0, 0];
    this.alpha = alpha > 1 || alpha === void 0 ? 1 : alpha < 0 ? 0 : alpha;
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i] === "NaN") {
        this.coords[i] = NaN;
      }
    }
    for (let id in this.space.coords) {
      Object.defineProperty(this, id, {
        get: () => this.get(id),
        set: (value) => this.set(id, value)
      });
    }
  }
  get spaceId() {
    return this.space.id;
  }
  clone() {
    return new _Color(this.space, this.coords, this.alpha);
  }
  toJSON() {
    return {
      spaceId: this.spaceId,
      coords: this.coords,
      alpha: this.alpha
    };
  }
  display(...args) {
    let ret = display(this, ...args);
    ret.color = new _Color(ret.color);
    return ret;
  }
  /**
   * Get a color from the argument passed
   * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
   */
  static get(color, ...args) {
    if (color instanceof _Color) {
      return color;
    }
    return new _Color(color, ...args);
  }
  static defineFunction(name, code, o = code) {
    let { instance = true, returns } = o;
    let func = function(...args) {
      let ret = code(...args);
      if (returns === "color") {
        ret = _Color.get(ret);
      } else if (returns === "function<color>") {
        let f = ret;
        ret = function(...args2) {
          let ret2 = f(...args2);
          return _Color.get(ret2);
        };
        Object.assign(ret, f);
      } else if (returns === "array<color>") {
        ret = ret.map((c4) => _Color.get(c4));
      }
      return ret;
    };
    if (!(name in _Color)) {
      _Color[name] = func;
    }
    if (instance) {
      _Color.prototype[name] = function(...args) {
        return func(this, ...args);
      };
    }
  }
  static defineFunctions(o) {
    for (let name in o) {
      _Color.defineFunction(name, o[name], o[name]);
    }
  }
  static extend(exports) {
    if (exports.register) {
      exports.register(_Color);
    } else {
      for (let name in exports) {
        _Color.defineFunction(name, exports[name]);
      }
    }
  }
};
Color.defineFunctions({
  get: get$1,
  getAll,
  set: set$1,
  setAll,
  to: to$2,
  equals: equals$1,
  inGamut,
  toGamut,
  distance: distance$1,
  toString: serialize
});
Object.assign(Color, {
  util,
  hooks,
  WHITES,
  Space: ColorSpace,
  spaces: ColorSpace.registry,
  parse,
  // Global defaults one may want to configure
  defaults
});
for (let key of Object.keys(spaces)) {
  ColorSpace.register(spaces[key]);
}
for (let id in ColorSpace.registry) {
  addSpaceAccessors(id, ColorSpace.registry[id]);
}
hooks.add("colorspace-init-end", (space) => {
  addSpaceAccessors(space.id, space);
  space.aliases?.forEach((alias) => {
    addSpaceAccessors(alias, space);
  });
});
function addSpaceAccessors(id, space) {
  let propId = id.replace(/-/g, "_");
  Object.defineProperty(Color.prototype, propId, {
    // Convert coords to coords in another colorspace and return them
    // Source colorspace: this.spaceId
    // Target colorspace: id
    get() {
      let ret = this.getAll(id);
      if (typeof Proxy === "undefined") {
        return ret;
      }
      return new Proxy(ret, {
        has: (obj, property) => {
          try {
            ColorSpace.resolveCoord([space, property]);
            return true;
          } catch (e) {
          }
          return Reflect.has(obj, property);
        },
        get: (obj, property, receiver) => {
          if (property && typeof property !== "symbol" && !(property in obj)) {
            let { index } = ColorSpace.resolveCoord([space, property]);
            if (index >= 0) {
              return obj[index];
            }
          }
          return Reflect.get(obj, property, receiver);
        },
        set: (obj, property, value, receiver) => {
          if (property && typeof property !== "symbol" && !(property in obj) || property >= 0) {
            let { index } = ColorSpace.resolveCoord([space, property]);
            if (index >= 0) {
              obj[index] = value;
              this.setAll(id, obj);
              return true;
            }
          }
          return Reflect.set(obj, property, value, receiver);
        }
      });
    },
    // Convert coords in another colorspace to internal coords and set them
    // Target colorspace: this.spaceId
    // Source colorspace: id
    set(coords) {
      this.setAll(id, coords);
    },
    configurable: true,
    enumerable: true
  });
}
Color.extend(deltaEMethods);
Color.extend({ deltaE });
Object.assign(Color, { deltaEMethods });
Color.extend(variations);
Color.extend({ contrast });
Color.extend(chromaticity);
Color.extend(luminance);
Color.extend(interpolation);
Color.extend(contrastMethods);

// src/visual/Colour.ts
var toHsla = (colour) => {
  const hsl = toHsl(colour);
  if (`opacity` in hsl) return hsl;
  else return {
    ...hsl,
    opacity: 1
  };
};
var toHsl = (colour) => {
  if (typeof colour === `string` && colour === `transparent`) return { h: 0, s: 0, l: 0, opacity: 0 };
  const c4 = resolve(colour);
  const hsl = c4.hsl;
  const parsedHsl = {
    h: hsl[0] / 360,
    s: hsl[1] / 100,
    l: hsl[2] / 100
  };
  if (c4.alpha !== 1) {
    if (`type` in c4.alpha) {
      const alphaRaw = Number.parseFloat(c4.alpha.raw);
      return { ...parsedHsl, opacity: alphaRaw };
    }
    return { ...parsedHsl, opacity: c4.alpha / 100 };
  }
  return parsedHsl;
};
var hslToColorJs = (hsl) => {
  if (hsl.h > 1) throw new Error(`Expecting relative hue value 0..1. Got: ${hsl.h}`);
  if (hsl.s > 1) throw new Error(`Expecting relative saturation value 0..1. Got: ${hsl.s}`);
  if (hsl.l > 1) throw new Error(`Expecting relative lightness value 0..1. Got: ${hsl.l}`);
  if (hsl.opacity && hsl.opacity > 1) throw new Error(`Expecting relative opacity value 0..1. Got: ${hsl.opacity}`);
  const coords = [
    hsl.h * 360,
    hsl.s * 100,
    hsl.l * 100
  ];
  return `opacity` in hsl ? new Color(`hsl`, coords, hsl.opacity) : new Color(`hsl`, coords);
};
var rgbToColorJs = (rgb) => {
  const coords = [
    rgb.r,
    rgb.g,
    rgb.b
  ];
  return `opacity` in rgb ? new Color(`srgb`, coords, rgb.opacity) : new Color(`srgb`, coords);
};
var toString$3 = (colour) => {
  const c4 = resolve(colour);
  return c4.display();
};
var goldenAngleColour = (index, saturation = 0.5, lightness = 0.75, alpha = 1) => {
  throwNumberTest(index, `positive`, `index`);
  throwNumberTest(saturation, `percentage`, `saturation`);
  throwNumberTest(lightness, `percentage`, `lightness`);
  throwNumberTest(alpha, `percentage`, `alpha`);
  const hue = index * 137.508;
  return alpha === 1 ? `hsl(${hue},${saturation * 100}%,${lightness * 100}%)` : `hsl(${hue},${saturation * 100}%,${lightness * 100}%,${alpha * 100}%)`;
};
var randomHue = (rand = defaultRandom) => {
  const r = rand();
  return r * 360;
};
var fromHsla = (h, s = 1, l = 0.5, opacity2 = 1) => {
  throwNumberTest(h, `percentage`, `h`);
  throwNumberTest(s, `percentage`, `s`);
  throwNumberTest(l, `percentage`, `l`);
  return resolve({ h, s, l, opacity: opacity2 });
};
var toRgb = (colour) => {
  const c4 = resolve(colour);
  const rgb = c4.srgb;
  return c4.alpha < 1 ? { r: rgb.r, g: rgb.g, b: rgb.b, opacity: c4.alpha } : { r: rgb.r, g: rgb.g, b: rgb.b };
};
var resolve = (colour) => {
  if (typeof colour === `string`) {
    if (colour.startsWith(`--`)) {
      colour = getComputedStyle(document.body).getPropertyValue(colour);
    }
    return new Color(colour);
  } else {
    if (isHsl(colour)) return new Color(hslToColorJs(colour));
    if (isRgb(colour)) return new Color(rgbToColorJs(colour));
  }
  return colour;
};
var resolveToString = (...colours) => {
  for (const colour of colours) {
    if (colour === void 0) continue;
    if (colour === null) continue;
    const c4 = resolve(colour);
    return c4.display();
  }
  return `rebeccapurple`;
};
var toHex = (colour) => {
  if (typeof colour === `string` && colour === `transparent`) return `#00000000`;
  return resolve(colour).to(`srgb`).toString({ format: `hex`, collapse: false });
};
var opacity = (colour, amt) => {
  const c4 = resolve(colour);
  c4.alpha *= amt;
  return c4.toString();
};
var getCssVariable = (name, fallbackColour = `black`, root) => {
  if (root === void 0) root = document.body;
  const fromCss = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
  if (fromCss === void 0 || fromCss.length === 0) return fallbackColour;
  return fromCss;
};
var interpolator = (colours, opts = {}) => {
  const space = opts.space ?? `lch`;
  const hue = opts.hue ?? `shorter`;
  const pieces = interpolatorInit(colours);
  const ranges = pieces.map((piece) => piece[0].range(piece[1], { space, hue }));
  return (amt) => {
    amt = clamp(amt);
    const s = scale(amt, 0, 1, 0, ranges.length);
    const index = Math.floor(s);
    const amtAdjusted = s - index;
    return ranges[index](amtAdjusted);
  };
};
var interpolatorInit = (colours) => {
  if (!Array.isArray(colours)) throw new Error(`Param 'colours' is not an array as expected. Got: ${typeof colours}`);
  if (colours.length < 2) throw new Error(`Param 'colours' should be at least two in length. Got: ${colours.length}`);
  const c4 = colours.map((colour) => resolve(colour));
  return [...pairwise(c4)];
};
var scale3 = (colours, numberOfSteps, opts = {}) => {
  const space = opts.space ?? `lch`;
  const hue = opts.hue ?? `shorter`;
  const pieces = interpolatorInit(colours);
  const stepsPerPair = Math.floor(numberOfSteps / pieces.length);
  const steps2 = pieces.map((piece) => piece[0].steps(
    piece[1],
    { space, hue, steps: stepsPerPair, outputSpace: `srgb` }
  ));
  return steps2.flat();
};
var cssLinearGradient = (colours) => {
  const c4 = colours.map((c5) => resolve(c5));
  return `linear-gradient(to right, ${c4.map((v) => v.display()).join(`, `)})`;
};
var isHsl = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  if (p2.spaceId !== void 0) return false;
  if (p2.coords !== void 0) return false;
  if (p2.h === void 0) return false;
  if (p2.s === void 0) return false;
  if (p2.l === void 0) return false;
  return true;
};
var isRgb = (p2) => {
  if (p2 === void 0 || p2 === null) return false;
  if (typeof p2 !== `object`) return false;
  if (p2.r === void 0) return false;
  if (p2.g === void 0) return false;
  if (p2.b === void 0) return false;
  return true;
};

// src/visual/Svg.ts
var Svg_exports = {};
__export(Svg_exports, {
  Elements: () => SvgElements_exports,
  applyOpts: () => applyOpts$1,
  applyPathOpts: () => applyPathOpts,
  applyStrokeOpts: () => applyStrokeOpts,
  clear: () => clear$1,
  createEl: () => createEl,
  createOrResolve: () => createOrResolve,
  getBounds: () => getBounds,
  makeHelper: () => makeHelper$1,
  remove: () => remove$2,
  setBounds: () => setBounds
});

// src/visual/SvgMarkers.ts
var createMarker = (id, opts, childCreator) => {
  const m = createEl(`marker`, id);
  if (opts.markerWidth) {
    m.setAttribute(`markerWidth`, opts.markerWidth?.toString());
  }
  if (opts.markerHeight) {
    m.setAttribute(`markerHeight`, opts.markerHeight?.toString());
  }
  if (opts.orient) m.setAttribute(`orient`, opts.orient.toString());
  else m.setAttribute(`orient`, `auto-start-reverse`);
  if (opts.viewBox) m.setAttribute(`viewBox`, opts.viewBox.toString());
  if (opts.refX) m.setAttribute(`refX`, opts.refX.toString());
  if (opts.refY) m.setAttribute(`refY`, opts.refY.toString());
  if (childCreator) {
    const c = childCreator();
    m.appendChild(c);
  }
  return m;
};
var markerPrebuilt = (elem, opts, _context) => {
  if (elem === null) return `(elem null)`;
  const parent = elem.ownerSVGElement;
  if (parent === null) throw new Error(`parent for elem is null`);
  const defsEl = createOrResolve(parent, `defs`, `defs`);
  let defEl = defsEl.querySelector(`#${opts.id}`);
  if (defEl !== null) {
    return `url(#${opts.id})`;
  }
  if (opts.id === `triangle`) {
    opts = { ...opts, strokeStyle: `transparent` };
    if (!opts.markerHeight) opts = { ...opts, markerHeight: 6 };
    if (!opts.markerWidth) opts = { ...opts, markerWidth: 6 };
    if (!opts.refX) opts = { ...opts, refX: opts.markerWidth };
    if (!opts.refY) opts = { ...opts, refY: opts.markerHeight };
    if (!opts.fillStyle || opts.fillStyle === `none`) {
      opts = { ...opts, fillStyle: `black` };
    }
    if (!opts.viewBox) opts = { ...opts, viewBox: `0 0 10 10` };
    defEl = createMarker(opts.id, opts, () => {
      const tri = createEl(`path`);
      tri.setAttribute(`d`, `M 0 0 L 10 5 L 0 10 z`);
      if (opts) applyOpts$1(tri, opts);
      return tri;
    });
  } else throw new Error(`Do not know how to make ${opts.id}`);
  defEl.id = opts.id;
  defsEl.appendChild(defEl);
  return `url(#${opts.id})`;
};

// src/visual/SvgElements.ts
var SvgElements_exports = {};
__export(SvgElements_exports, {
  circle: () => circle$1,
  circleUpdate: () => circleUpdate,
  grid: () => grid,
  group: () => group,
  groupUpdate: () => groupUpdate,
  line: () => line$1,
  lineUpdate: () => lineUpdate,
  path: () => path,
  pathUpdate: () => pathUpdate,
  text: () => text,
  textPath: () => textPath,
  textPathUpdate: () => textPathUpdate,
  textUpdate: () => textUpdate
});
var numberOrPercentage = (v) => {
  if (v >= 0 && v <= 1) return `${v * 100}%`;
  return v.toString();
};
var path = (svgOrArray, parent, opts, queryOrExisting) => {
  const elem = createOrResolve(
    parent,
    `path`,
    queryOrExisting
  );
  const svg = typeof svgOrArray === `string` ? svgOrArray : svgOrArray.join(`
`);
  elem.setAttributeNS(null, `d`, svg);
  parent.append(elem);
  return pathUpdate(elem, opts);
};
var pathUpdate = (elem, opts) => {
  if (opts) applyOpts$1(elem, opts);
  if (opts) applyStrokeOpts(elem, opts);
  return elem;
};
var circleUpdate = (elem, circle2, opts) => {
  elem.setAttributeNS(null, `cx`, circle2.x.toString());
  elem.setAttributeNS(null, `cy`, circle2.y.toString());
  elem.setAttributeNS(null, `r`, circle2.radius.toString());
  if (opts) applyOpts$1(elem, opts);
  if (opts) applyStrokeOpts(elem, opts);
  return elem;
};
var circle$1 = (circle2, parent, opts, queryOrExisting) => {
  const p = createOrResolve(
    parent,
    `circle`,
    queryOrExisting
  );
  return circleUpdate(p, circle2, opts);
};
var group = (children, parent, queryOrExisting) => {
  const p = createOrResolve(parent, `g`, queryOrExisting);
  return groupUpdate(p, children);
};
var groupUpdate = (elem, children) => {
  for (const c of children) {
    if (c.parentNode !== elem) {
      elem.append(c);
    }
  }
  return elem;
};
var line$1 = (line2, parent, opts, queryOrExisting) => {
  const lineEl = createOrResolve(
    parent,
    `line`,
    queryOrExisting
  );
  return lineUpdate(lineEl, line2, opts);
};
var lineUpdate = (lineEl, line2, opts) => {
  lineEl.setAttributeNS(null, `x1`, line2.a.x.toString());
  lineEl.setAttributeNS(null, `y1`, line2.a.y.toString());
  lineEl.setAttributeNS(null, `x2`, line2.b.x.toString());
  lineEl.setAttributeNS(null, `y2`, line2.b.y.toString());
  if (opts) applyOpts$1(lineEl, opts);
  if (opts) applyPathOpts(lineEl, opts);
  if (opts) applyStrokeOpts(lineEl, opts);
  return lineEl;
};
var textPathUpdate = (el, text2, opts) => {
  if (opts?.method) el.setAttributeNS(null, `method`, opts.method);
  if (opts?.side) el.setAttributeNS(null, `side`, opts.side);
  if (opts?.spacing) el.setAttributeNS(null, `spacing`, opts.spacing);
  if (opts?.startOffset) {
    el.setAttributeNS(null, `startOffset`, numberOrPercentage(opts.startOffset));
  }
  if (opts?.textLength) {
    el.setAttributeNS(null, `textLength`, numberOrPercentage(opts.textLength));
  }
  if (text2) {
    el.textContent = text2;
  }
  if (opts) applyOpts$1(el, opts);
  if (opts) applyStrokeOpts(el, opts);
  return el;
};
var textPath = (pathReference, text2, parent, opts, textQueryOrExisting, pathQueryOrExisting) => {
  const textEl = createOrResolve(
    parent,
    `text`,
    textQueryOrExisting,
    `-text`
  );
  textUpdate(textEl, void 0, void 0, opts);
  const p = createOrResolve(
    textEl,
    `textPath`,
    pathQueryOrExisting
  );
  p.setAttributeNS(null, `href`, pathReference);
  return textPathUpdate(p, text2, opts);
};
var textUpdate = (el, pos, text2, opts) => {
  if (pos) {
    el.setAttributeNS(null, `x`, pos.x.toString());
    el.setAttributeNS(null, `y`, pos.y.toString());
  }
  if (text2) {
    el.textContent = text2;
  }
  if (opts) {
    applyOpts$1(el, opts);
    if (opts) applyStrokeOpts(el, opts);
    if (opts.anchor) el.setAttributeNS(null, `text-anchor`, opts.anchor);
    if (opts.align) el.setAttributeNS(null, `alignment-baseline`, opts.align);
    const userSelect = opts.userSelect ?? true;
    if (!userSelect) {
      el.style.userSelect = `none`;
      el.style.webkitUserSelect = `none`;
    }
  }
  return el;
};
var text = (text2, parent, pos, opts, queryOrExisting) => {
  const p = createOrResolve(
    parent,
    `text`,
    queryOrExisting
  );
  return textUpdate(p, pos, text2, opts);
};
var grid = (parent, center, spacing, width, height, opts = {}) => {
  if (!opts.strokeStyle) {
    opts = { ...opts, strokeStyle: getCssVariable(`bg-dim`, `silver`) };
  }
  if (!opts.strokeWidth) opts = { ...opts, strokeWidth: 1 };
  const g = createEl(`g`);
  applyOpts$1(g, opts);
  applyPathOpts(g, opts);
  applyStrokeOpts(g, opts);
  let y = 0;
  while (y < height) {
    const horiz = fromNumbers(0, y, width, y);
    line$1(horiz, g);
    y += spacing;
  }
  let x = 0;
  while (x < width) {
    const vert = fromNumbers(x, 0, x, height);
    line$1(vert, g);
    x += spacing;
  }
  parent.append(g);
  return g;
};

// src/visual/Svg.ts
var createOrResolve = (parent, type, queryOrExisting, suffix) => {
  let existing = null;
  if (queryOrExisting !== void 0) {
    existing = typeof queryOrExisting === `string` ? parent.querySelector(queryOrExisting) : queryOrExisting;
  }
  if (existing === null) {
    const p = document.createElementNS(`http://www.w3.org/2000/svg`, type);
    parent.append(p);
    if (queryOrExisting && typeof queryOrExisting === `string` && queryOrExisting.startsWith(`#`)) {
      p.id = suffix !== void 0 && !queryOrExisting.endsWith(suffix) ? queryOrExisting.slice(1) + suffix : queryOrExisting.slice(1);
    }
    return p;
  }
  return existing;
};
var remove$2 = (parent, queryOrExisting) => {
  if (typeof queryOrExisting === `string`) {
    const elem = parent.querySelector(queryOrExisting);
    if (elem === null) return;
    elem.remove();
  } else {
    queryOrExisting.remove();
  }
};
var clear$1 = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    c.remove();
    c = parent.lastElementChild;
  }
};
var createEl = (type, id) => {
  const m = document.createElementNS(`http://www.w3.org/2000/svg`, type);
  if (id) {
    m.id = id;
  }
  return m;
};
var applyPathOpts = (elem, opts) => {
  if (opts.markerEnd) {
    elem.setAttribute(
      `marker-end`,
      markerPrebuilt(elem, opts.markerEnd)
    );
  }
  if (opts.markerStart) {
    elem.setAttribute(
      `marker-start`,
      markerPrebuilt(elem, opts.markerStart)
    );
  }
  if (opts.markerMid) {
    elem.setAttribute(
      `marker-mid`,
      markerPrebuilt(elem, opts.markerMid)
    );
  }
};
var applyOpts$1 = (elem, opts) => {
  if (opts.fillStyle) elem.setAttributeNS(null, `fill`, opts.fillStyle);
  if (opts.opacity) {
    elem.setAttributeNS(null, `opacity`, opts.opacity.toString());
  }
};
var applyStrokeOpts = (elem, opts) => {
  if (opts.strokeStyle) elem.setAttributeNS(null, `stroke`, opts.strokeStyle);
  if (opts.strokeWidth) {
    elem.setAttributeNS(null, `stroke-width`, opts.strokeWidth.toString());
  }
  if (opts.strokeDash) elem.setAttribute(`stroke-dasharray`, opts.strokeDash);
  if (opts.strokeLineCap) {
    elem.setAttribute(`stroke-linecap`, opts.strokeLineCap);
  }
};
var getBounds = (svg) => {
  const w = svg.getAttributeNS(null, `width`);
  const width = w === null ? 0 : Number.parseFloat(w);
  const h = svg.getAttributeNS(null, `height`);
  const height = h === null ? 0 : Number.parseFloat(h);
  return { width, height };
};
var setBounds = (svg, bounds) => {
  svg.setAttributeNS(null, `width`, bounds.width.toString());
  svg.setAttributeNS(null, `height`, bounds.height.toString());
};
var makeHelper$1 = (parent, parentOpts) => {
  if (parentOpts) {
    applyOpts$1(parent, parentOpts);
    applyStrokeOpts(parent, parentOpts);
  }
  const o = {
    remove: (queryOrExisting) => {
      remove$2(parent, queryOrExisting);
    },
    text: (text2, pos, opts, queryOrExisting) => text(text2, parent, pos, opts, queryOrExisting),
    textPath: (pathReference, text2, opts, textQueryOrExisting, pathQueryOrExisting) => textPath(pathReference, text2, parent, opts, textQueryOrExisting, pathQueryOrExisting),
    line: (line2, opts, queryOrExisting) => line$1(line2, parent, opts, queryOrExisting),
    circle: (circle2, opts, queryOrExisting) => circle$1(circle2, parent, opts, queryOrExisting),
    path: (svgString, opts, queryOrExisting) => path(svgString, parent, opts, queryOrExisting),
    grid: (center, spacing, width, height, opts) => grid(parent, center, spacing, width, height, opts),
    query: (selectors) => parent.querySelector(selectors),
    get width() {
      const w = parent.getAttributeNS(null, `width`);
      if (w === null) return 0;
      return Number.parseFloat(w);
    },
    set width(width) {
      parent.setAttributeNS(null, `width`, width.toString());
    },
    get parent() {
      return parent;
    },
    get height() {
      const w = parent.getAttributeNS(null, `height`);
      if (w === null) return 0;
      return Number.parseFloat(w);
    },
    set height(height) {
      parent.setAttributeNS(null, `height`, height.toString());
    },
    clear: () => {
      while (parent.firstChild) {
        parent.lastChild.remove();
      }
    }
  };
  return o;
};

// src/data/Wrap.ts
var wrapInteger = (v, min = 0, max = 360) => {
  throwIntegerTest(v, void 0, `v`);
  throwIntegerTest(min, void 0, `min`);
  throwIntegerTest(max, void 0, `max`);
  if (v === min) return min;
  if (v === max) return min;
  if (v > 0 && v < min) v += min;
  v -= min;
  max -= min;
  v = v % max;
  if (v < 0) v = max - Math.abs(v) + min;
  return v + min;
};
var wrap$1 = (v, min = 0, max = 1) => {
  throwNumberTest(v, ``, `min`);
  throwNumberTest(min, ``, `min`);
  throwNumberTest(max, ``, `max`);
  if (v === min) return min;
  if (v === max) return min;
  while (v <= min || v >= max) {
    if (v === max) break;
    if (v === min) break;
    if (v > max) {
      v = min + (v - max);
    } else if (v < min) {
      v = max - (min - v);
    }
  }
  return v;
};
var wrapRange = (min, max, fn, a, b) => {
  let r = 0;
  const distF = Math.abs(b - a);
  const distFwrap = Math.abs(max - a + b);
  const distBWrap = Math.abs(a + (360 - b));
  const distMin = Math.min(distF, distFwrap, distBWrap);
  if (distMin === distBWrap) {
    r = a - fn(distMin);
  } else if (distMin === distFwrap) {
    r = a + fn(distMin);
  } else {
    if (a > b) {
      r = a - fn(distMin);
    } else {
      r = a + fn(distMin);
    }
  }
  return wrapInteger(r, min, max);
};

// src/flow/IntervalType.ts
function intervalToMs(interval, defaultNumber) {
  if (isInterval(interval)) {
    if (typeof interval === `number`) return interval;
    let ms = interval.millis ?? 0;
    ms += (interval.hours ?? 0) * 60 * 60 * 1e3;
    ms += (interval.mins ?? 0) * 60 * 1e3;
    ms += (interval.secs ?? 0) * 1e3;
    return ms;
  } else {
    if (typeof defaultNumber !== `undefined`) return defaultNumber;
    throw new Error(`Not a valid interval: ${interval}`);
  }
}
function isInterval(interval) {
  if (interval === void 0) return false;
  if (interval === null) return false;
  if (typeof interval === `number`) {
    if (Number.isNaN(interval)) return false;
    if (!Number.isFinite(interval)) return false;
    return true;
  } else if (typeof interval !== `object`) return false;
  const hasMillis = `millis` in interval;
  const hasSecs = `secs` in interval;
  const hasMins = `mins` in interval;
  const hasHours = `hours` in interval;
  if (hasMillis && !numberTest(interval.millis)[0]) return false;
  if (hasSecs && !numberTest(interval.secs)[0]) return false;
  if (hasMins && !numberTest(interval.mins)[0]) return false;
  if (hasHours && !numberTest(interval.hours)[0]) return false;
  if (hasMillis || hasSecs || hasHours || hasMins) return true;
  return false;
}

// src/numbers/Round.ts
function round(a, b) {
  throwIntegerTest(a, `positive`, `decimalPlaces`);
  let rounder;
  if (a === 0) rounder = Math.round;
  else {
    const p = Math.pow(10, a);
    rounder = (v) => Math.floor(v * p) / p;
  }
  return b === void 0 ? rounder : rounder(b);
}
var roundUpToMultiple = (v, multiple) => {
  throwNumberTest(v, `nonZero`, `v`);
  throwNumberTest(multiple, `nonZero`, `multiple`);
  return Math.ceil(v / multiple) * multiple;
};

// src/flow/Timer.ts
function hasElapsed(elapsed) {
  const t = relativeTimer(intervalToMs(elapsed, 0), { timer: msElapsedTimer() });
  return () => t.isDone;
}
var frequencyTimerSource = (frequency) => () => frequencyTimer(frequency, { timer: msElapsedTimer() });
var relativeTimer = (total, opts = {}) => {
  const clampValue = opts.clampValue ?? false;
  const wrapValue = opts.wrapValue ?? false;
  if (clampValue && wrapValue) throw new Error(`clampValue and wrapValue cannot both be enabled`);
  let modulationAmount = 1;
  const timer = opts.timer ?? msElapsedTimer();
  const computeElapsed = () => {
    let v = timer.elapsed / (total * modulationAmount);
    if (clampValue) v = clamp(v);
    else if (wrapValue && v >= 1) v = v % 1;
    return v;
  };
  return {
    mod(amt) {
      modulationAmount = amt;
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    },
    reset: () => {
      timer.reset();
    }
  };
};
var frequencyTimer = (frequency, opts = {}) => {
  const timer = opts.timer ?? msElapsedTimer();
  const cyclesPerSecond = frequency / 1e3;
  let modulationAmount = 1;
  const computeElapsed = () => {
    const v = timer.elapsed * (cyclesPerSecond * modulationAmount);
    const f = v - Math.floor(v);
    if (f < 0) {
      throw new Error(
        `Unexpected cycle fraction less than 0. Elapsed: ${v} f: ${f}`
      );
    }
    if (f > 1) {
      throw new Error(
        `Unexpected cycle fraction more than 1. Elapsed: ${v} f: ${f}`
      );
    }
    return f;
  };
  return {
    mod: (amt) => {
      modulationAmount = amt;
    },
    reset: () => {
      timer.reset();
    },
    get isDone() {
      return computeElapsed() >= 1;
    },
    get elapsed() {
      return computeElapsed();
    }
  };
};
var msElapsedTimer = () => {
  let start = performance.now();
  return {
    /**
     * Reset timer
     */
    reset: () => {
      start = performance.now();
    },
    /**
     * Returns elapsed time since start
     */
    get elapsed() {
      return performance.now() - start;
    }
  };
};
var ticksElapsedTimer = () => {
  let start = 0;
  return {
    /**
     * Reset ticks to 0. The next call to `elapsed` will return 1.
     */
    reset: () => {
      start = 0;
    },
    /**
     * Returns the number of elapsed ticks as well as
     * incrementing the tick count. 
     * 
     * Minimum is 1
     */
    get elapsed() {
      return ++start;
    }
  };
};

// src/flow/Elapsed.ts
var Elapsed_exports = {};
__export(Elapsed_exports, {
  infinity: () => infinity,
  interval: () => interval$1,
  once: () => once,
  progress: () => progress,
  since: () => since,
  toString: () => toString$2
});
var since = () => {
  const start = performance.now();
  return () => {
    return performance.now() - start;
  };
};
var interval$1 = () => {
  let start = performance.now();
  return () => {
    const now = performance.now();
    const x = now - start;
    start = now;
    return x;
  };
};
var once = () => {
  const start = Date.now();
  let stoppedAt = 0;
  return () => {
    if (stoppedAt === 0) {
      stoppedAt = Date.now() - start;
    }
    return stoppedAt;
  };
};
var infinity = () => {
  return () => {
    return Number.POSITIVE_INFINITY;
  };
};
function progress(duration, opts = {}) {
  const totalMs = intervalToMs(duration);
  if (!totalMs) throw new Error(`duration invalid`);
  const timerOpts = {
    ...opts,
    timer: msElapsedTimer()
  };
  const t = relativeTimer(totalMs, timerOpts);
  return () => t.elapsed;
}
var toString$2 = (millisOrFunction, rounding = 2) => {
  let interval2 = 0;
  if (typeof millisOrFunction === `function`) {
    const intervalResult = millisOrFunction();
    return toString$2(intervalResult);
  } else if (typeof millisOrFunction === `number`) {
    interval2 = millisOrFunction;
  } else if (typeof millisOrFunction === `object`) {
    interval2 = intervalToMs(interval2);
  }
  let ms = intervalToMs(interval2);
  if (typeof ms === `undefined`) return `(undefined)`;
  if (ms < 1e3) return `${round(rounding, ms)}ms`;
  ms /= 1e3;
  if (ms < 120) return `${ms.toFixed(1)}secs`;
  ms /= 60;
  if (ms < 60) return `${ms.toFixed(2)}mins`;
  ms /= 60;
  return `${ms.toFixed(2)}hrs`;
};

// src/random/WeightedIndex.ts
var weightedIndex = (weightings, rand = defaultRandom) => {
  const precompute = [];
  let total = 0;
  for (let index = 0; index < weightings.length; index++) {
    total += weightings[index];
    precompute[index] = total;
  }
  if (total !== 1) throw new Error(`Weightings should add up to 1. Got: ${total}`);
  return () => {
    const v = rand();
    for (let index = 0; index < precompute.length; index++) {
      if (v <= precompute[index]) return index;
    }
    throw new Error(`Bug: weightedIndex could not select index`);
  };
};

// src/collections/arrays/Random.ts
var randomIndex = (array, rand = Math.random) => Math.floor(rand() * array.length);
var randomPluck = (array, mutate = false, rand = Math.random) => {
  if (array === void 0) throw new Error(`array is undefined`);
  if (!Array.isArray(array)) throw new Error(`'array' param is not an array`);
  if (array.length === 0) return { value: void 0, array: [] };
  const index = randomIndex(array, rand);
  if (mutate) {
    return {
      value: array[index],
      //eslint-disable-next-line functional/immutable-data
      array: array.splice(index, 1)
    };
  } else {
    const t = [...array];
    t.splice(index, 1);
    return {
      value: array[index],
      array: t
    };
  }
};
var randomElement = (array, rand = Math.random) => {
  guardArray(array, `array`);
  return array[Math.floor(rand() * array.length)];
};
var randomElementWeightedSource = (array, weightings, randomSource = Math.random) => {
  if (array.length !== weightings.length) throw new Error(`Lengths of 'array' and 'weightings' should be the same.`);
  const r = weightedIndex(weightings, randomSource);
  return () => {
    const index = r();
    return array[index];
  };
};
var shuffle = (dataToShuffle, rand = Math.random) => {
  const array = [...dataToShuffle];
  for (let index = array.length - 1; index > 0; index--) {
    const index_ = Math.floor(rand() * (index + 1));
    [array[index], array[index_]] = [array[index_], array[index]];
  }
  return array;
};

// src/random/String.ts
var string$1 = (lengthOrOptions = 5) => {
  const options = typeof lengthOrOptions === `number` ? { length: lengthOrOptions } : lengthOrOptions;
  const calculate = options.source ?? defaultRandom;
  return calculate().toString(36).slice(2, length + 2);
};

// src/random/index.ts
var random_exports = {};
__export(random_exports, {
  arrayElement: () => randomElement,
  arrayIndex: () => randomIndex,
  calculateNonZero: () => calculateNonZero,
  float: () => float,
  floatSource: () => floatSource,
  gaussian: () => gaussian,
  gaussianSource: () => gaussianSource,
  hue: () => randomHue,
  integer: () => integer,
  integerSource: () => integerSource,
  integerUniqueGen: () => integerUniqueGen,
  minutesMs: () => minutesMs,
  minutesMsSource: () => minutesMsSource,
  secondsMs: () => secondsMs,
  secondsMsSource: () => secondsMsSource,
  shortGuid: () => shortGuid,
  string: () => string$1,
  weighted: () => weighted,
  weightedIndex: () => weightedIndex,
  weightedInteger: () => weightedInteger,
  weightedIntegerSource: () => weightedIntegerSource,
  weightedSource: () => weightedSource
});

// src/random/FloatSource.ts
var floatSource = (maxOrOptions = 1) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = options.max;
  let min = options.min ?? 0;
  const source = options.source ?? defaultRandom;
  throwNumberTest(min, ``, `min`);
  throwNumberTest(max, ``, `max`);
  if (!options.min && max < 0) {
    min = max;
    max = 0;
  }
  if (min > max) {
    throw new Error(`Min is greater than max. Min: ${min} max: ${max}`);
  }
  return () => source() * (max - min) + min;
};
var float = (maxOrOptions = 1) => floatSource(maxOrOptions)();

// src/random/NonZero.ts
var calculateNonZero = (source = Math.random) => {
  let v = 0;
  while (v === 0) {
    v = source();
  }
  return v;
};

// src/random/Gaussian.ts
var gaussian = (skew = 1) => gaussianSource(skew)();
var gaussianSource = (skew = 1) => {
  const min = 0;
  const max = 1;
  const compute = () => {
    const u = calculateNonZero();
    const v = calculateNonZero();
    let result = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    result = result / 10 + 0.5;
    if (result > 1 || result < 0) {
      result = compute();
    } else {
      result = Math.pow(result, skew);
      result *= max - min;
      result += min;
    }
    return result;
  };
  return compute;
};

// src/random/Guid.ts
var shortGuid = (options = {}) => {
  const source = options.source ?? Math.random;
  const firstPart = Math.trunc(source() * 46656);
  const secondPart = Math.trunc(source() * 46656);
  const firstPartString = `000${firstPart.toString(36)}`.slice(-3);
  const secondPartString = `000${secondPart.toString(36)}`.slice(-3);
  return firstPartString + secondPartString;
};

// src/numbers/Count.ts
function* count$1(amount, offset = 0) {
  throwIntegerTest(amount, ``, `amount`);
  throwIntegerTest(offset, ``, `offset`);
  if (amount === 0) return;
  let index = 0;
  do {
    yield amount < 0 ? -index + offset : index + offset;
  } while (index++ < Math.abs(amount) - 1);
}

// src/random/Integer.ts
var integerSource = (maxOrOptions) => {
  if (typeof maxOrOptions === `undefined`) {
    throw new TypeError(`maxOrOptions is undefined`);
  }
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  let max = Math.floor(options.max);
  let min = Math.floor(options.min ?? 0);
  if (!options.min && max < 0) {
    max = 1;
    min = options.max;
  }
  const randomSource = options.source ?? Math.random;
  if (min > max) {
    throw new Error(`Min value is greater than max (min: ${min} max: ${max})`);
  }
  throwFromResult(numberTest(min, ``, `min`));
  throwFromResult(numberTest(max, ``, `max`));
  if (max === min) {
    throw new Error(`Max and min values cannot be the same (${max})`);
  }
  const amt = Math.abs(max - min);
  return () => Math.floor(randomSource() * amt) + min;
};
var integer = (maxOrOptions) => integerSource(maxOrOptions)();
function* integerUniqueGen(maxOrOptions) {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const min = options.min ?? 0;
  const max = options.max;
  const source = options.source ?? Math.random;
  const loop = options.loop ?? false;
  throwFromResult(integerTest(min, ``, `min`));
  throwFromResult(integerTest(max, ``, `max`));
  if (min > max) {
    throw new Error(`Min value is greater than max. Min: ${min} Max: ${max}`);
  }
  const origRange = [...count$1(max - min, min)];
  let numberRange = shuffle(origRange);
  let index = 0;
  while (true) {
    if (index === numberRange.length) {
      if (loop) numberRange = shuffle(origRange, source);
      else return;
    }
    yield numberRange[index++];
  }
}

// src/random/Time.ts
var minutesMsSource = (maxMinutesOrOptions) => {
  const options = typeof maxMinutesOrOptions === `number` ? { max: maxMinutesOrOptions } : maxMinutesOrOptions;
  const min = (options.min ?? 0) * 60 * 1e3;
  const max = options.max * 60 * 1e3;
  return integerSource({ ...options, max, min });
};
var minutesMs = (maxMinutesOrOptions) => minutesMsSource(maxMinutesOrOptions)();
var secondsMsSource = (maxSecondsOrOptions) => {
  const options = typeof maxSecondsOrOptions === `number` ? { max: maxSecondsOrOptions } : maxSecondsOrOptions;
  const min = (options.min ?? 0) * 1e3;
  const max = options.max * 1e3;
  return () => integer({ ...options, max, min });
};
var secondsMs = (maxSecondsOrOptions) => secondsMsSource(maxSecondsOrOptions)();

// src/modulation/Easing.ts
var Easing_exports = {};
__export(Easing_exports, {
  crossfade: () => crossfade,
  fromCubicBezier: () => fromCubicBezier,
  functions: () => functions,
  gaussian: () => gaussian2,
  get: () => get,
  getEasings: () => getEasings,
  mix: () => mix,
  tick: () => tick,
  time: () => time,
  weightedAverage: () => weightedAverage
});

// src/data/Interpolate.ts
var piPi$3 = Math.PI * 2;
function interpolate$1(amountOrA, aOrB, bOrMissingOrOpts, options) {
  const a = bOrMissingOrOpts === void 0 ? amountOrA : aOrB;
  const b = bOrMissingOrOpts === void 0 || typeof bOrMissingOrOpts === `object` ? aOrB : bOrMissingOrOpts;
  const opts = options !== void 0 ? options : typeof bOrMissingOrOpts === `number` ? {} : bOrMissingOrOpts;
  const limits = opts?.limits ?? `clamp`;
  throwNumberTest(a, ``, `a`);
  throwNumberTest(b, ``, `b`);
  const calculate = (amount) => {
    if (limits === `clamp`) {
      amount = clamp(amount);
    } else if (limits === `wrap`) {
      if (amount > 1) amount = amount % 1;
      else if (amount < 0) {
        amount = 1 + amount % 1;
      }
    }
    throwNumberTest(amount, ``, `amount`);
    return (1 - amount) * a + amount * b;
  };
  if (bOrMissingOrOpts === void 0 || typeof bOrMissingOrOpts === `object`) return calculate;
  return calculate(amountOrA);
}
var interpolatorStepped = (incrementAmount, a = 0, b = 1, startInterpolationAt = 0) => {
  let amount = startInterpolationAt;
  return (retargetB, retargetA) => {
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate$1(amount, a, b);
    amount += incrementAmount;
    return value;
  };
};
var interpolatorInterval = (duration, a = 0, b = 1) => {
  const durationProgression = progress(duration, { clampValue: true });
  return (retargetB, retargetA) => {
    const amount = durationProgression();
    if (retargetB !== void 0) b = retargetB;
    if (retargetA !== void 0) a = retargetA;
    if (amount >= 1) return b;
    const value = interpolate$1(amount, a, b);
    return value;
  };
};
var interpolateAngle = (amount, aRadians, bRadians) => {
  const t = wrap$1(bRadians - aRadians, 0, piPi$3);
  return interpolate$1(amount, aRadians, aRadians + (t > Math.PI ? t - piPi$3 : t));
};

// src/modulation/Easing.ts
var sqrt$1 = Math.sqrt;
var pow$1 = Math.pow;
var cos$1 = Math.cos;
var pi$1 = Math.PI;
var sin$1 = Math.sin;
var time = function(nameOrFunction, durationMs) {
  return create$3(nameOrFunction, durationMs, msElapsedTimer);
};
var tick = function(nameOrFunction, durationTicks) {
  return create$3(nameOrFunction, durationTicks, ticksElapsedTimer);
};
var create$3 = function(nameOrFunction, duration, timerSource) {
  const fn = typeof nameOrFunction === `function` ? nameOrFunction : get(nameOrFunction);
  if (fn === void 0) {
    const error = typeof nameOrFunction === `string` ? new Error(`Easing function not found: ${nameOrFunction}`) : new Error(`Easing function not found`);
    throw error;
  }
  const timer = relativeTimer(duration, {
    timer: timerSource(),
    clampValue: true
  });
  let startCount = 1;
  return {
    get isDone() {
      return timer.isDone;
    },
    get runState() {
      if (timer.isDone) return `idle`;
      return `scheduled`;
    },
    /**
     * Returns 1 if it has been created, returns +1 for each additional time the timer has been reset.
     */
    get startCount() {
      return startCount;
    },
    get startCountTotal() {
      return startCount;
    },
    compute: () => {
      const relative = timer.elapsed;
      return fn(relative);
    },
    reset: () => {
      timer.reset();
      startCount++;
    }
  };
};
var fromCubicBezier = (b, d) => (t) => {
  const s = 1 - t;
  const s2 = s * s;
  const t2 = t * t;
  const t3 = t2 * t;
  return 3 * b * s2 * t + 3 * d * s * t2 + t3;
};
var mix = (amt, balance, easingA, easingB) => interpolate$1(balance, easingA(amt), easingB(amt));
var crossfade = (amt, easingA, easingB) => mix(amt, amt, easingA, easingB);
var get = function(easingName) {
  if (easingName === null) throw new Error(`easingName is null`);
  if (easingName === void 0) throw new Error(`easingName is undefined`);
  const name = easingName.toLocaleLowerCase();
  const found = Object.entries(functions).find(
    ([k, _v]) => k.toLocaleLowerCase() === name
  );
  if (found === void 0) throw new Error(`easing not found ('${easingName})`);
  if (found === void 0) return found;
  return found[1];
};
function* getEasings() {
  yield* Object.keys(functions);
}
var gaussian2 = (standardDeviation = 0.4) => {
  const a = 1 / sqrt$1(2 * pi$1);
  const mean = 0.5;
  return (t) => {
    const f = a / standardDeviation;
    let p = -2.5;
    let c = (t - mean) / standardDeviation;
    c *= c;
    p *= c;
    const v = f * pow$1(Math.E, p);
    if (v > 1) return 1;
    if (v < 0) return 0;
    return v;
  };
};
var bounceOut = function(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var quintIn = (x) => x * x * x * x * x;
var quintOut = (x) => 1 - pow$1(1 - x, 5);
var arch = (x) => x * (1 - x) * 4;
var weightedAverage = (currentValue, targetValue, slowDownFactor) => {
  return (currentValue * (slowDownFactor - 1) + targetValue) / slowDownFactor;
};
var functions = {
  smoothstep: (x) => x * x * (3 - 2 * x),
  smootherstep: (x) => (x * (x * 6 - 15) + 10) * x * x * x,
  arch,
  bell: gaussian2(),
  sineIn: (x) => 1 - cos$1(x * pi$1 / 2),
  sineOut: (x) => sin$1(x * pi$1 / 2),
  quadIn: (x) => x * x,
  quadOut: (x) => 1 - (1 - x) * (1 - x),
  sineInOut: (x) => -(cos$1(pi$1 * x) - 1) / 2,
  quadInOut: (x) => x < 0.5 ? 2 * x * x : 1 - pow$1(-2 * x + 2, 2) / 2,
  cubicIn: (x) => x * x * x,
  cubicOut: (x) => 1 - pow$1(1 - x, 3),
  quartIn: (x) => x * x * x * x,
  quartOut: (x) => 1 - pow$1(1 - x, 4),
  quintIn,
  quintOut,
  //: (x: number): number => 1 - pow(1 - x, 5),
  expoIn: (x) => x === 0 ? 0 : pow$1(2, 10 * x - 10),
  expoOut: (x) => x === 1 ? 1 : 1 - pow$1(2, -10 * x),
  quintInOut: (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - pow$1(-2 * x + 2, 5) / 2,
  expoInOut: (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow$1(2, 20 * x - 10) / 2 : (2 - pow$1(2, -20 * x + 10)) / 2,
  circIn: (x) => 1 - sqrt$1(1 - pow$1(x, 2)),
  circOut: (x) => sqrt$1(1 - pow$1(x - 1, 2)),
  backIn: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  backOut: (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * pow$1(x - 1, 3) + c1 * pow$1(x - 1, 2);
  },
  circInOut: (x) => x < 0.5 ? (1 - sqrt$1(1 - pow$1(2 * x, 2))) / 2 : (sqrt$1(1 - pow$1(-2 * x + 2, 2)) + 1) / 2,
  backInOut: (x) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ? pow$1(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow$1(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  elasticIn: (x) => {
    const c4 = 2 * pi$1 / 3;
    return x === 0 ? 0 : x === 1 ? 1 : -pow$1(2, 10 * x - 10) * sin$1((x * 10 - 10.75) * c4);
  },
  elasticOut: (x) => {
    const c4 = 2 * pi$1 / 3;
    return x === 0 ? 0 : x === 1 ? 1 : pow$1(2, -10 * x) * sin$1((x * 10 - 0.75) * c4) + 1;
  },
  bounceIn: (x) => 1 - bounceOut(1 - x),
  bounceOut,
  elasticInOut: (x) => {
    const c5 = 2 * pi$1 / 4.5;
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow$1(2, 20 * x - 10) * sin$1((20 * x - 11.125) * c5)) / 2 : pow$1(2, -20 * x + 10) * sin$1((20 * x - 11.125) * c5) / 2 + 1;
  },
  bounceInOut: (x) => x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
};

// src/random/Weighted.ts
var weighted = (easingNameOrOptions = `quadIn`) => weightedSource(easingNameOrOptions)();
var weightedSource = (easingNameOrOptions = `quadIn`) => {
  const options = typeof easingNameOrOptions === `string` ? { easing: easingNameOrOptions } : easingNameOrOptions;
  const source = options.source ?? defaultRandom;
  const easingName = options.easing ?? `quadIn`;
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing function '${easingName}' not found.`);
  }
  const compute = () => {
    const r = source();
    return easingFunction(r);
  };
  return compute;
};

// src/random/WeightedInteger.ts
var weightedIntegerSource = (maxOrOptions) => {
  const options = typeof maxOrOptions === `number` ? { max: maxOrOptions } : maxOrOptions;
  const source = options.source ?? defaultRandom;
  const max = options.max;
  const min = options.min ?? 0;
  const easingName = options.easing ?? `quadIn`;
  if (typeof max === `undefined`) throw new Error(`max field is undefined`);
  if (typeof easingName !== `string`) {
    throw new TypeError(`easing field expected to be string`);
  }
  throwNumberTest(max);
  const easingFunction = get(easingName);
  if (easingFunction === void 0) {
    throw new Error(`Easing '${easingName}' not found`);
  }
  throwNumberTest(min);
  if (max <= min) throw new Error(`Max should be greater than min`);
  const compute = () => {
    const r = clamp(easingFunction(source()));
    return Math.floor(r * (max - min)) + min;
  };
  return compute;
};
var weightedInteger = (maxOrOptions) => weightedIntegerSource(maxOrOptions)();

// src/dom/ResolveEl.ts
var resolveEl = (domQueryOrEl) => {
  if (typeof domQueryOrEl === `string`) {
    const d = document.querySelector(domQueryOrEl);
    if (d === null) {
      const error = domQueryOrEl.startsWith(`#`) ? new Error(
        `Query '${domQueryOrEl}' did not match anything. Try '#id', 'div', or '.class'`
      ) : new Error(
        `Query '${domQueryOrEl}' did not match anything. Did you mean '#${domQueryOrEl}?`
      );
      throw error;
    }
    domQueryOrEl = d;
  } else if (domQueryOrEl === null) {
    throw new Error(`Param 'domQueryOrEl' is null`);
  } else if (domQueryOrEl === void 0) {
    throw new Error(`Param 'domQueryOrEl' is undefined`);
  }
  const el = domQueryOrEl;
  return el;
};
var resolveEls = (selectors) => {
  if (selectors === void 0) return [];
  if (selectors === null) return [];
  if (Array.isArray(selectors)) return selectors;
  if (typeof selectors === `string`) {
    const elements = [...document.querySelectorAll(selectors)];
    return elements;
  }
  return [selectors];
};

// src/dom/Forms.ts
var Forms_exports = {};
__export(Forms_exports, {
  button: () => button,
  buttonCreate: () => buttonCreate,
  checkbox: () => checkbox,
  numeric: () => numeric,
  select: () => select,
  textAreaKeyboard: () => textAreaKeyboard
});
var textAreaKeyboard = (el) => {
  el.addEventListener(`keydown`, (event) => {
    const elementValue = el.value;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (event.key === `Tab` && event.shiftKey) {
      if (el.value.substring(start - 2, start) === `  `) {
        el.value = elementValue.slice(0, Math.max(0, start - 2)) + elementValue.slice(Math.max(0, end));
      }
      el.selectionStart = el.selectionEnd = start - 2;
      event.preventDefault();
      return false;
    } else if (event.key === `Tab`) {
      el.value = elementValue.slice(0, Math.max(0, start)) + `  ` + elementValue.slice(Math.max(0, end));
      el.selectionStart = el.selectionEnd = start + 2;
      event.preventDefault();
      return false;
    }
  });
};
var checkbox = (domIdOrEl, onChanged) => {
  const el = resolveEl(domIdOrEl);
  if (onChanged) {
    el.addEventListener(`change`, () => {
      onChanged(el.checked);
    });
  }
  return {
    get checked() {
      return el.checked;
    },
    set checked(value) {
      el.checked = value;
    }
  };
};
var numeric = (domIdOrEl, onChanged, live) => {
  const el = resolveEl(domIdOrEl);
  const eventName = live ? `change` : `input`;
  if (onChanged) {
    el.addEventListener(eventName, () => {
      onChanged(Number.parseInt(el.value));
    });
  }
  return {
    get value() {
      return Number.parseInt(el.value);
    },
    set value(value) {
      el.value = value.toString();
    }
  };
};
var button = (domQueryOrEl, onClickHandler) => {
  const el = resolveEl(domQueryOrEl);
  const addEvent = () => {
    if (onClickHandler) {
      el.addEventListener(`click`, onClickHandler);
    }
  };
  const removeEvent = () => {
    if (onClickHandler) {
      el.removeEventListener(`click`, onClickHandler);
    }
  };
  addEvent();
  return {
    /**
     * Gets text content of button
     */
    get title() {
      return el.textContent;
    },
    /**
     * Sets text content of button
     */
    set title(value) {
      el.textContent = value;
    },
    /**
     * Disposes the button.
     * Removes event handler and optionally removes from document
     * @param deleteElement 
     */
    dispose(deleteElement = false) {
      removeEvent();
      if (deleteElement) el.remove();
    },
    /**
     * Sets the click handler, overwriting existing.
     * @param handler 
     */
    onClick(handler) {
      removeEvent();
      onClickHandler = handler;
      addEvent();
    },
    /**
     * Trigger onClick handler
     */
    click() {
      if (onClickHandler) onClickHandler();
    },
    /**
     * Sets disabled state of button
     */
    set disabled(value) {
      el.disabled = value;
    },
    /**
     * Gets the button element
     */
    get el() {
      return el;
    }
  };
};
var buttonCreate = (title, onClick) => {
  const el = document.createElement(`button`);
  const w = button(el, onClick);
  w.title = title;
  return w;
};
var select = (domQueryOrEl, onChanged, opts = {}) => {
  const el = resolveEl(domQueryOrEl);
  const {
    placeholderOpt,
    shouldAddChoosePlaceholder = false,
    autoSelectAfterChoice = -1
  } = opts;
  const change = () => {
    if (onChanged !== void 0) onChanged(el.value);
    if (autoSelectAfterChoice >= 0) el.selectedIndex = autoSelectAfterChoice;
  };
  if (onChanged) {
    el.addEventListener(`change`, (_event) => {
      change();
    });
  }
  return {
    set disabled(value) {
      el.disabled = value;
    },
    get value() {
      return el.value;
    },
    get index() {
      return el.selectedIndex;
    },
    get isSelectedPlaceholder() {
      return (shouldAddChoosePlaceholder || opts.placeholderOpt !== void 0) && el.selectedIndex === 0;
    },
    //eslint-disable-next-line functional/prefer-immutable-types
    setOpts(opts2, preSelect) {
      el.options.length = 0;
      if (shouldAddChoosePlaceholder) opts2 = [`-- Choose --`, ...opts2];
      else if (placeholderOpt !== void 0) opts2 = [placeholderOpt, ...opts2];
      let toSelect = 0;
      for (const [index, o] of opts2.entries()) {
        const optEl = document.createElement(`option`);
        optEl.value = o;
        optEl.innerHTML = o;
        if (preSelect !== void 0 && o === preSelect) toSelect = index;
        el.options.add(optEl);
      }
      el.selectedIndex = toSelect;
    },
    select(index = 0, trigger = false) {
      el.selectedIndex = index;
      if (trigger && onChanged) {
        change();
      }
    }
  };
};

// src/numbers/Quantise.ts
var quantiseEvery = (v, every, middleRoundsUp = true) => {
  throwNumberTest(v, ``, `v`);
  throwIntegerTest(every, ``, `every`);
  let div = v / every;
  const divModule = div % 1;
  div = Math.floor(div);
  if (divModule === 0.5 && middleRoundsUp || divModule > 0.5) div++;
  return every * div;
};

// src/numbers/LinearSpace.ts
function* linearSpace(start, end, steps, precision) {
  throwNumberTest(start, ``, `start`);
  throwNumberTest(end, ``, `end`);
  throwNumberTest(steps, ``, `steps`);
  const r = precision ? round(precision) : (v) => v;
  const step = (end - start) / (steps - 1);
  throwNumberTest(step, ``, `step`);
  if (!Number.isFinite(step)) {
    throw new TypeError(`Calculated step value is infinite`);
  }
  for (let index = 0; index < steps; index++) {
    const v = start + step * index;
    yield r(v);
  }
}

// src/util/ToString.ts
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isMap = (value) => toTypeString(value) === `[object Map]`;
var isSet = (value) => toTypeString(value) === `[object Set]`;
var toStringDefault = (itemToMakeStringFor) => typeof itemToMakeStringFor === `string` ? itemToMakeStringFor : JSON.stringify(itemToMakeStringFor);
var defaultToString = (object) => {
  if (object === null) return `null`;
  if (typeof object === `boolean` || typeof object === `number`) {
    return object.toString();
  }
  if (typeof object === `string`) return object;
  if (typeof object === `symbol`) throw new TypeError(`Symbol cannot be converted to string`);
  return JSON.stringify(object);
};

// src/util/IsEqual.ts
var toStringOrdered = (itemToMakeStringFor) => {
  if (typeof itemToMakeStringFor === `string`) return itemToMakeStringFor;
  const allKeys = /* @__PURE__ */ new Set();
  JSON.stringify(itemToMakeStringFor, (key, value) => (allKeys.add(key), value));
  return JSON.stringify(itemToMakeStringFor, [...allKeys].sort());
};
var isEqualDefault = (a, b) => a === b;
var isEqualValueDefault = (a, b) => {
  if (a === b) return true;
  return toStringDefault(a) === toStringDefault(b);
};
var isEqualValuePartial = (a, b, fieldComparer) => {
  if (typeof a !== `object`) throw new Error(`Parameter 'a' expected to be object`);
  if (typeof b !== `object`) throw new Error(`Parameter 'b' expected to be object`);
  if (Object.is(a, b)) return true;
  const comparer = fieldComparer ?? isEqualValuePartial;
  for (const entryB of Object.entries(b)) {
    const valueA = a[entryB[0]];
    const valueB = entryB[1];
    if (typeof valueA === `object` && typeof valueB === `object`) {
      if (!comparer(valueA, valueB)) {
        return false;
      }
    } else {
      if (valueA !== valueB) {
        return false;
      }
    }
  }
  return true;
};
var isEqualValueIgnoreOrder = (a, b) => {
  if (a === b) return true;
  return toStringOrdered(a) === toStringOrdered(b);
};

// src/Events.ts
var Events_exports = {};
__export(Events_exports, {
  SimpleEventEmitter: () => SimpleEventEmitter,
  eventRace: () => eventRace
});

// src/DefaultKeyer.ts
var defaultKeyer = (a) => {
  return typeof a === `string` ? a : JSON.stringify(a);
};

// src/collections/map/MapMultiFns.ts
var firstEntryByIterableValue$1 = (map, value, isEqual = isEqualDefault) => {
  for (const e of map.entries()) {
    const val = e[1];
    for (const subValue of val) {
      if (isEqual(subValue, value)) return e;
    }
  }
};

// src/collections/map/MapOfSimpleBase.ts
var MapOfSimpleBase = class {
  map;
  groupBy;
  valueEq;
  /**
   * Constructor
   * @param groupBy Creates keys for values when using `addValue`. By default uses JSON.stringify
   * @param valueEq Compare values. By default uses JS logic for equality
   */
  constructor(groupBy = defaultKeyer, valueEq = isEqualDefault, initial = []) {
    this.groupBy = groupBy;
    this.valueEq = valueEq;
    this.map = new Map(initial);
  }
  /**
   * Iterate over all entries
   */
  *entriesFlat() {
    for (const key of this.map.keys()) {
      for (const value of this.map.get(key)) {
        yield [key, value];
      }
    }
  }
  *entries() {
    for (const [k, v] of this.map.entries()) {
      yield [k, [...v]];
    }
  }
  firstKeyByValue(value, eq = isEqualDefault) {
    const entry = firstEntryByIterableValue$1(this, value, eq);
    if (entry) return entry[0];
  }
  /**
   * Get all values under `key`
   * @param key
   * @returns
   */
  *get(key) {
    const m = this.map.get(key);
    if (!m) return;
    yield* m.values();
  }
  /**
   * Iterate over all keys
   */
  *keys() {
    yield* this.map.keys();
  }
  /**
   * Iterate over all values (regardless of key)
   */
  *valuesFlat() {
    for (const entries of this.map) {
      yield* entries[1];
    }
  }
  /**
   * Iterate over keys and length of values stored under keys
   */
  *keysAndCounts() {
    for (const entries of this.map) {
      yield [entries[0], entries[1].length];
    }
  }
  /**
   * Returns _true_ if `key` exists
   * @param key
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.map.has(key);
  }
  /**
   * Returns _true_ if `value` exists under `key`.
   * @param key Key
   * @param value Value to seek under `key`
   * @returns _True_ if `value` exists under `key`.
   */
  hasKeyValue(key, value) {
    const values = this.map.get(key);
    if (!values) return false;
    for (const v of values) {
      if (this.valueEq(v, value)) return true;
    }
    return false;
  }
  /**
   * Debug dump of contents
   * @returns
   */
  debugString() {
    let r = ``;
    const keys = [...this.map.keys()];
    keys.every((k) => {
      const v = this.map.get(k);
      if (v === void 0) return;
      r += k + ` (${v.length}) = ${JSON.stringify(v)}\r
`;
    });
    return r;
  }
  /**
   * _True_ if empty
   */
  get isEmpty() {
    return this.map.size === 0;
  }
  /**
   * Return number of values stored under `key`.
   * Returns 0 if `key` is not found.
   * @param key
   * @returns
   */
  count(key) {
    const values = this.map.get(key);
    if (!values) return 0;
    return values.length;
  }
  get lengthKeys() {
    return this.map.size;
  }
};

// src/collections/map/MapOfSimpleMutable.ts
var MapOfSimpleMutable = class extends MapOfSimpleBase {
  addKeyedValues(key, ...values) {
    const existing = this.map.get(key);
    if (existing === void 0) {
      this.map.set(key, values);
    } else {
      this.map.set(key, [...existing, ...values]);
    }
  }
  /**
   * Adds a value, automatically extracting a key via the
   * `groupBy` function assigned in the constructor options.
   * @param values Adds several values
   */
  addValue(...values) {
    for (const v of values) {
      const key = this.groupBy(v);
      this.addKeyedValues(key, v);
    }
  }
  /**
   * Delete `value` under a particular `key`
   * @param key
   * @param value
   * @returns _True_ if `value` was found under `key`
   */
  deleteKeyValue(key, value) {
    const existing = this.map.get(key);
    if (existing === void 0) return false;
    const without = existing.filter((existingValue) => !this.valueEq(existingValue, value));
    this.map.set(key, without);
    return without.length < existing.length;
  }
  /**
   * Deletes `value` regardless of key.
   *
   * Uses the constructor-defined equality function.
   * @param value Value to delete
   * @returns
   */
  deleteByValue(value) {
    let del = false;
    const entries = [...this.map.entries()];
    for (const keyEntries of entries) {
      for (const values of keyEntries[1]) {
        if (this.valueEq(values, value)) {
          del = true;
          this.deleteKeyValue(keyEntries[0], value);
        }
      }
    }
    return del;
  }
  /**
   * Deletes all values under `key`,
   * @param key
   * @returns _True_ if `key` was found and values stored
   */
  delete(key) {
    const values = this.map.get(key);
    if (!values) return false;
    if (values.length === 0) return false;
    this.map.delete(key);
    return true;
  }
  /**
   * Clear contents
   */
  clear() {
    this.map.clear();
  }
};
var ofSimpleMutable = (groupBy = defaultKeyer, valueEq = isEqualDefault) => new MapOfSimpleMutable(groupBy, valueEq);

// src/Events.ts
var eventRace = (target, eventNames, opts = {}) => {
  const intervalMs = intervalToMs(opts.timeout, 60 * 1e3);
  const signal = opts.signal;
  let triggered = false;
  let disposed = false;
  let timeout;
  const promise = new Promise((resolve, reject) => {
    const onEvent = (event) => {
      if (`type` in event) {
        if (eventNames.includes(event.type)) {
          triggered = true;
          resolve(event);
          dispose();
        } else {
          console.warn(`eventRace: Got event '${event.type}' that is not in race list`);
        }
      } else {
        console.warn(`eventRace: Event data does not have expected 'type' field`);
        console.log(event);
      }
    };
    for (const name of eventNames) {
      target.addEventListener(name, onEvent);
    }
    const dispose = () => {
      if (disposed) return;
      if (timeout !== void 0) clearTimeout(timeout);
      timeout = void 0;
      disposed = true;
      for (const name of eventNames) {
        target.removeEventListener(name, onEvent);
      }
    };
    timeout = setTimeout(() => {
      if (triggered || disposed) return;
      dispose();
      reject(new Error(`eventRace: Events not fired within interval. Events: ${JSON.stringify(eventNames)} Interval: ${intervalMs}`));
    }, intervalMs);
    signal?.addEventListener(`abort`, () => {
      if (triggered || disposed) return;
      dispose();
      reject(new Error(`Abort signal received ${signal.reason}`));
    });
  });
  return promise;
};
var SimpleEventEmitter = class {
  #listeners = ofSimpleMutable();
  /**
   * Fire event
   * @param type Type of event
   * @param args Arguments for event
   * @returns
   */
  fireEvent(type, args) {
    const listeners = this.#listeners.get(type);
    for (const l of listeners) {
      l(args, this);
    }
  }
  /**
   * Adds event listener
   *
   * @template K
   * @param {K} type
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  addEventListener(type, listener) {
    this.#listeners.addKeyedValues(
      type,
      listener
    );
  }
  /**
   * Remove event listener
   *
   * @param {Listener<Events>} listener
   * @memberof SimpleEventEmitter
   */
  removeEventListener(type, listener) {
    this.#listeners.deleteKeyValue(
      type,
      listener
    );
  }
  /**
   * Clear all event listeners
   * @private
   * @memberof SimpleEventEmitter
   */
  clearEventListeners() {
    this.#listeners.clear();
  }
};

// src/collections/set/index.ts
var set_exports = {};
__export(set_exports, {
  MassiveSet: () => MassiveSet,
  immutable: () => immutable$3,
  mutable: () => mutable$3
});

// src/collections/set/SetMutable.ts
var mutable$3 = (keyString) => new SetStringMutable(keyString);
var SetStringMutable = class extends SimpleEventEmitter {
  // ✔ UNIT TESTED
  /* eslint-disable functional/prefer-readonly-type */
  store = /* @__PURE__ */ new Map();
  keyString;
  /**
   * Constructor
   * @param keyString Function which returns a string version of added items. If unspecified `JSON.stringify`
   */
  constructor(keyString) {
    super();
    this.keyString = keyString ?? defaultKeyer;
  }
  /**
   * Number of items stored in set
   */
  get size() {
    return this.store.size;
  }
  /**
   * Adds one or more items to set. `add` event is fired for each item
   * @param values items to add
   */
  add(...values) {
    let somethingAdded = false;
    for (const value of values) {
      const isUpdated = this.has(value);
      this.store.set(this.keyString(value), value);
      super.fireEvent(`add`, { value, updated: isUpdated });
      if (!isUpdated) somethingAdded = true;
    }
    return somethingAdded;
  }
  /**
   * Returns values from set as an iterable
   * @returns
   */
  //eslint-disable-next-line functional/prefer-tacit
  values() {
    return this.store.values();
  }
  /**
   * Clear items from set
   */
  clear() {
    this.store.clear();
    super.fireEvent(`clear`, true);
  }
  /**
   * Delete value from set.
   * @param v Value to delete
   * @returns _True_ if item was found and removed
   */
  delete(v) {
    const isDeleted = this.store.delete(this.keyString(v));
    if (isDeleted) super.fireEvent(`delete`, v);
    return isDeleted;
  }
  /**
   * Returns _true_ if item exists in set
   * @param v
   * @returns
   */
  has(v) {
    return this.store.has(this.keyString(v));
  }
  /**
   * Returns array copy of set
   * @returns Array copy of set
   */
  toArray() {
    return [...this.store.values()];
  }
};

// src/collections/set/SetImmutable.ts
var SetStringImmutable = class _SetStringImmutable {
  store;
  keyString;
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(keyString, map) {
    this.store = map ?? /* @__PURE__ */ new Map();
    this.keyString = keyString ?? defaultKeyer;
  }
  get size() {
    return this.store.size;
  }
  add(...values) {
    const s = new Map(this.store);
    for (const v of values) {
      const key = this.keyString(v);
      s.set(key, v);
    }
    return new _SetStringImmutable(this.keyString, s);
  }
  delete(v) {
    const s = new Map(this.store);
    const key = this.keyString(v);
    if (s.delete(key)) return new _SetStringImmutable(this.keyString, s);
    return this;
  }
  has(v) {
    const key = this.keyString(v);
    return this.store.has(key);
  }
  toArray() {
    return [...this.store.values()];
  }
  *values() {
    yield* this.store.values();
  }
};
var immutable$3 = (keyString = toStringDefault) => new SetStringImmutable(keyString);

// src/collections/set/MassiveSet.ts
var MassiveSet = class _MassiveSet {
  #depth;
  #maxDepth;
  children = /* @__PURE__ */ new Map();
  values = [];
  constructor(maxDepth = 1, depth = 0) {
    this.#depth = depth;
    this.#maxDepth = maxDepth;
  }
  /**
   * Returns the number of values stored in just this level of the set
   * @returns 
   */
  sizeLocal() {
    return this.values.length;
  }
  /**
   * Returns the number of branches at this node
   * Use {@link sizeChildrenDeep} to count all branches recursively
   * @returns 
   */
  sizeChildren() {
    return [...this.children.values()].length;
  }
  sizeChildrenDeep() {
    let t = this.sizeChildren();
    for (const c of this.children.values()) {
      t += c.sizeChildrenDeep();
    }
    return t;
  }
  /**
   * Returns the total number of values stored in the set
   */
  size() {
    let x = this.values.length;
    for (const set of this.children.values()) {
      x += set.size();
    }
    return x;
  }
  add(value) {
    if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
    if (value.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value, true);
    if (destination === this) {
      if (!this.hasLocal(value)) {
        this.values.push(value);
      }
      return;
    }
    if (!destination) throw new Error(`Could not create child set for: ${value}`);
    destination.add(value);
  }
  remove(value) {
    if (typeof value !== `string`) throw new Error(`Param 'value' must be a string. Got: ${typeof value}`);
    if (value.length === 0) throw new Error(`Param 'value' is empty`);
    const destination = this.#getChild(value, false);
    if (destination === void 0) return false;
    if (destination === this) {
      if (this.hasLocal(value)) {
        this.values = this.values.filter((v) => v !== value);
        return true;
      }
      return false;
    }
    return destination.remove(value);
  }
  debugDump() {
    const r = this.#dumpToArray();
    for (const rr of r) {
      console.log(rr);
    }
  }
  #dumpToArray(depth = 0) {
    const r = [];
    r.push(`Depth: ${this.#depth} Max: ${this.#maxDepth}`);
    for (const [key, value] of this.children.entries()) {
      const dumped = value.#dumpToArray(depth + 1);
      r.push(` key: ${key}`);
      for (const d of dumped) {
        r.push(` `.repeat(depth + 1) + d);
      }
    }
    r.push(`Values: (${this.values.length})`);
    for (const v of this.values) {
      r.push(` ${v}`);
    }
    return r.map((line) => ` `.repeat(depth) + line);
  }
  #getChild(value, create) {
    if (value === void 0) throw new Error(`Param 'value' undefined`);
    if (this.#depth === this.#maxDepth) return this;
    if (value.length <= this.#depth) return this;
    const k = value[this.#depth];
    if (k === void 0) throw new Error(`Logic error. Depth: ${this.#depth} Len: ${value.length}`);
    let child = this.children.get(k);
    if (child === void 0 && create) {
      child = new _MassiveSet(this.#maxDepth, this.#depth + 1);
      this.children.set(k, child);
    }
    return child;
  }
  /**
   * Returns _true_ if `value` stored on this node
   * @param value 
   * @returns 
   */
  hasLocal(value) {
    for (const v of this.values) {
      if (v === value) return true;
    }
    return false;
  }
  has(value) {
    if (typeof value !== `string`) return false;
    const destination = this.#getChild(value, false);
    if (destination === void 0) return false;
    if (destination === this) return this.hasLocal(value);
    return destination.has(value);
  }
};

// src/collections/arrays/SortByNumericProperty.ts
var sortByNumericProperty = (data, propertyName) => [...data].sort((a, b) => {
  guardArray(data, `data`);
  const av = a[propertyName];
  const bv = b[propertyName];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});

// src/Text.ts
var Text_exports = {};
__export(Text_exports, {
  abbreviate: () => abbreviate,
  afterMatch: () => afterMatch,
  beforeAfterMatch: () => beforeAfterMatch,
  beforeMatch: () => beforeMatch,
  between: () => between,
  betweenChomp: () => betweenChomp,
  countCharsFromStart: () => countCharsFromStart,
  htmlEntities: () => htmlEntities,
  indexOfCharCode: () => indexOfCharCode,
  lineSpan: () => lineSpan,
  omitChars: () => omitChars,
  random: () => string$1,
  splitByLength: () => splitByLength,
  splitRanges: () => splitRanges,
  startsEnds: () => startsEnds,
  toStringAbbreviate: () => toStringAbbreviate,
  unwrap: () => unwrap,
  wildcard: () => wildcard
});
var abbreviate = (source, maxLength = 15) => {
  throwFromResult(integerTest(maxLength, `aboveZero`, `maxLength`));
  if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
  if (source.length > maxLength && source.length > 3) {
    if (maxLength > 15) {
      const chunk = Math.round((maxLength - 2) / 2);
      return source.slice(0, chunk) + `...` + source.slice(-chunk);
    }
    return source.slice(0, maxLength) + `...`;
  }
  return source;
};
var toStringAbbreviate = (source, maxLength = 20) => {
  if (source === void 0) return `(undefined)`;
  if (source === null) return `(null)`;
  return abbreviate(JSON.stringify(source), maxLength);
};
var between = (source, start, end, lastEndMatch = true) => {
  const startPos = source.indexOf(start);
  if (startPos < 0) return;
  if (end === void 0) end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0) return;
  return source.slice(startPos + 1, endPos);
};
var betweenChomp = (source, start, end, lastEndMatch = true) => {
  if (typeof source !== `string`) throw new Error(`Parameter 'source' is not a string`);
  if (typeof start !== `string`) throw new Error(`Parameter 'start' is not a string`);
  if (end !== void 0 && typeof end !== `string`) throw new Error(`Parameter 'end' is not a string`);
  const startPos = source.indexOf(start);
  if (startPos < 0) return [source, void 0];
  if (end === void 0) end = start;
  const endPos = lastEndMatch ? source.lastIndexOf(end) : source.indexOf(end, startPos + 1);
  if (endPos < 0) return [source, void 0];
  const between2 = source.slice(startPos + 1, endPos);
  const sourceResult = source.slice(0, startPos) + source.slice(endPos + 1);
  return [sourceResult, between2];
};
var indexOfCharCode = (source, code, start = 0, end = source.length - 1) => {
  for (let index = start; index <= end; index++) {
    if (source.codePointAt(index) === code) return index;
  }
  return -1;
};
var omitChars = (source, removeStart, removeLength) => source.slice(0, removeStart) + source.slice(removeStart + removeLength);
var splitByLength = (source, length) => {
  throwFromResult(integerTest(length, `aboveZero`, `length`));
  if (source === null) throw new Error(`source parameter null`);
  if (typeof source !== `string`) {
    throw new TypeError(`source parameter not a string`);
  }
  const chunks = Math.ceil(source.length / length);
  const returnValue = [];
  let start = 0;
  for (let c = 0; c < chunks; c++) {
    returnValue.push(source.slice(start, start + length));
    start += length;
  }
  return returnValue;
};
var beforeMatch = (source, match, options = {}) => {
  const ba = beforeAfterMatch(source, match, options);
  return ba[0];
};
var afterMatch = (source, match, options = {}) => {
  const ba = beforeAfterMatch(source, match, options);
  return ba[1];
};
var beforeAfterMatch = (source, match, options = {}) => {
  if (source === void 0) throw new Error(`Param 'source' is undefined`);
  let fallback = options.fallback;
  const ifNoMatch = options.ifNoMatch ?? (fallback ? `fallback` : `original`);
  if (ifNoMatch === `original`) fallback = source;
  if (ifNoMatch === `fallback` && fallback === void 0) throw new Error(`Fallback must be provided`);
  const startPos = options.startPos ?? void 0;
  const fromEnd = options.fromEnd ?? false;
  const m = fromEnd ? source.lastIndexOf(match, startPos) : source.indexOf(match, startPos);
  if (m < 0 && ifNoMatch === `throw`) throw new Error(`Match '${match}' not found in source.`);
  if (m < 0 && ifNoMatch === `original`) return [source, source];
  if (m < 0 && ifNoMatch === `fallback`) {
    return [fallback, fallback];
  }
  return [
    source.slice(0, m),
    source.slice(Math.max(0, m + match.length))
  ];
};
var unwrap = (source, ...wrappers) => {
  let matched = false;
  do {
    matched = false;
    for (const w of wrappers) {
      if (source.startsWith(w) && source.endsWith(w)) {
        source = source.slice(w.length, source.length - w.length * 2 + 1);
        matched = true;
      }
    }
  } while (matched);
  return source;
};
var lineSpan = (ranges, start, end) => {
  let s = -1;
  let endPos = -1;
  for (const [index, r] of ranges.entries()) {
    s = index;
    if (r.text.length === 0) continue;
    if (start < r.end) {
      break;
    }
  }
  for (let index = s; index < ranges.length; index++) {
    const r = ranges[index];
    endPos = index;
    if (end === r.end) {
      endPos = index + 1;
      break;
    }
    if (end < r.end) {
      break;
    }
  }
  return { length: endPos - s, start: s, end: endPos };
};
var splitRanges = (source, split) => {
  let start = 0;
  let text = ``;
  const ranges = [];
  let index = 0;
  for (let i = 0; i < source.length; i++) {
    if (source.indexOf(split, i) === i) {
      const end = i;
      ranges.push({
        text,
        start,
        end,
        index
      });
      start = end + 1;
      text = ``;
      index++;
    } else {
      text += source.charAt(i);
    }
  }
  if (start < source.length) {
    ranges.push({ text, start, index, end: source.length });
  }
  return ranges;
};
var countCharsFromStart = (source, ...chars) => {
  let counted = 0;
  for (let index = 0; index < source.length; index++) {
    if (chars.includes(source.charAt(index))) {
      counted++;
    } else {
      break;
    }
  }
  return counted;
};
var startsEnds = (source, start, end = start) => source.startsWith(start) && source.endsWith(end);
var htmlEntities = (source) => source.replaceAll(/[&<>\u00A0-\u9999]/g, (index) => `&#${index.codePointAt(0)};`);
var wildcard = (pattern) => {
  const escapeRegex = (value) => value.replaceAll(/([!$()*+./:=?[\\\]^{|}])/g, `\\$1`);
  pattern = pattern.split(`*`).map((m) => escapeRegex(m)).join(`.*`);
  pattern = `^` + pattern + `$`;
  const regex = new RegExp(pattern);
  return (value) => {
    return regex.test(value);
  };
};

// src/util/guards.ts
var guards_exports = {};
__export(guards_exports, {
  arrayTest: () => arrayTest,
  defined: () => defined,
  ifNaN: () => ifNaN,
  integerParse: () => integerParse,
  integerTest: () => integerTest,
  isFunction: () => isFunction,
  isPlainObject: () => isPlainObject,
  isPlainObjectOrPrimitive: () => isPlainObjectOrPrimitive,
  isPowerOfTwo: () => isPowerOfTwo,
  isStringArray: () => isStringArray,
  nullUndef: () => nullUndef,
  numberTest: () => numberTest,
  percentTest: () => percentTest,
  throwArrayTest: () => throwArrayTest,
  throwFromResult: () => throwFromResult,
  throwIntegerTest: () => throwIntegerTest,
  throwNullUndef: () => throwNullUndef,
  throwNumberTest: () => throwNumberTest,
  throwPercentTest: () => throwPercentTest
});

// src/util/GuardArrays.ts
var arrayTest = (value, parameterName = `?`) => {
  if (!Array.isArray(value)) {
    return [false, `Parameter '${parameterName}' is expected to be an array'`];
  }
  return [true];
};
var throwArrayTest = (value, parameterName = `?`) => {
  throwFromResult(arrayTest(value, parameterName));
};
var isStringArray = (value) => {
  if (!Array.isArray(value)) return false;
  return !value.some((v) => typeof v !== `string`);
};

// src/util/GuardEmpty.ts
var nullUndef = (value, parameterName = `?`) => {
  if (typeof value === `undefined`) {
    return [false, `${parameterName} param is undefined`];
  }
  if (value === null) return [false, `${parameterName} param is null`];
  return [true];
};
var throwNullUndef = (value, parameterName = `?`) => {
  const r = nullUndef(value, parameterName);
  if (r[0]) return;
  throw new Error(r[1]);
};
var defined = (argument) => argument !== void 0;

// src/util/GuardFunction.ts
var isFunction = (object) => object instanceof Function;

// src/util/GuardObject.ts
var isPlainObject = (value) => {
  if (typeof value !== `object` || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
var isPlainObjectOrPrimitive = (value) => {
  const t = typeof value;
  if (t === `symbol`) return false;
  if (t === `function`) return false;
  if (t === `bigint`) return true;
  if (t === `number`) return true;
  if (t === `string`) return true;
  if (t === `boolean`) return true;
  return isPlainObject(value);
};

// src/util/MapKeys.ts
var mapKeys = (object, mapFunction) => {
  const destinationObject = {};
  for (const entries of Object.entries(object)) {
    const key = mapFunction(entries[0]);
    destinationObject[key] = entries[1];
  }
  return destinationObject;
};

// src/util/index.ts
var util_exports = {};
__export(util_exports, {
  Guards: () => guards_exports,
  comparerInverse: () => comparerInverse,
  defaultComparer: () => defaultComparer,
  defaultToString: () => defaultToString,
  isEqualDefault: () => isEqualDefault,
  isEqualTrace: () => isEqualTrace,
  isEqualValueDefault: () => isEqualValueDefault,
  isEqualValueIgnoreOrder: () => isEqualValueIgnoreOrder,
  isEqualValuePartial: () => isEqualValuePartial,
  isInteger: () => isInteger,
  isMap: () => isMap,
  isSet: () => isSet,
  jsComparer: () => jsComparer,
  mapKeys: () => mapKeys,
  numericComparer: () => numericComparer,
  runningiOS: () => runningiOS,
  toStringDefault: () => toStringDefault,
  toStringOrdered: () => toStringOrdered
});

// src/util/Comparers.ts
var numericComparer = (x, y) => {
  if (x === y) return 0;
  if (x > y) return 1;
  return -1;
};
var jsComparer = (x, y) => {
  if (x === void 0 && y === void 0) return 0;
  if (x === void 0) return 1;
  if (y === void 0) return -1;
  const xString = defaultToString(x);
  const yString = defaultToString(y);
  if (xString < yString) return -1;
  if (xString > yString) return 1;
  return 0;
};
var comparerInverse = (comparer) => {
  return (x, y) => {
    const v = comparer(x, y);
    return v * -1;
  };
};
var defaultComparer = (x, y) => {
  if (typeof x === `number` && typeof y === `number`) {
    return numericComparer(x, y);
  }
  return jsComparer(x, y);
};

// src/util/IsEqualTrace.ts
var isEqualTrace = (eq) => {
  return (a, b) => {
    const result = eq(a, b);
    console.log(`isEqualTrace eq: ${result} a: ${toStringAbbreviate(a)} b: ${toStringAbbreviate(b)}`);
    return result;
  };
};

// src/util/IsInteger.ts
var isInteger = (value) => {
  if (value === void 0) return false;
  if (typeof value === `string`) {
    const v = Number.parseInt(value);
    if (Number.isNaN(v)) return false;
    if (v.toString() === value.toString()) return true;
    return false;
  }
  if (typeof value === `number`) {
    if (Number.isNaN(value)) return false;
    if (!Number.isFinite(value)) return false;
    if (Math.round(value) === value) return true;
    return false;
  }
  return false;
};

// src/util/Platform.ts
var runningiOS = () => [
  `iPad Simulator`,
  `iPhone Simulator`,
  `iPod Simulator`,
  `iPad`,
  `iPhone`,
  `iPod`
].includes(navigator.platform) || // iPad on iOS 13 detection
navigator.userAgent.includes(`Mac`) && `ontouchend` in document;

// src/collections/Map/MapFns.ts
var getClosestIntegerKey = (data, target) => {
  target = Math.round(target);
  if (data.has(target)) {
    return target;
  } else {
    let offset = 1;
    while (offset < 1e3) {
      if (data.has(target - offset)) return target - offset;
      else if (data.has(target + offset)) return target + offset;
      offset++;
    }
    throw new Error(`Could not find target ${target}`);
  }
};
var getFromKeys = (data, keys) => {
  for (const key of keys) {
    if (data.has(key)) return data.get(key);
  }
};
var hasKeyValue = (map, key, value, comparer) => {
  if (!map.has(key)) return false;
  const values = [...map.values()];
  return values.some((v) => comparer(v, value));
};
var deleteByValue = (map, value, comparer = isEqualDefault) => {
  for (const entry of Object.entries(map)) {
    if (comparer(entry[1], value)) {
      map.delete(entry[0]);
    }
  }
};
var firstEntryByIterablePredicate = (map, predicate) => {
  for (const entry of map.entries()) {
    if (predicate(entry[1], entry[0])) return entry;
  }
};
var firstEntryByIterableValue = (map, value, isEqual = isEqualDefault) => {
  for (const entry of map.entries()) {
    if (isEqual(entry[1], value)) return entry;
  }
};
var addKeepingExisting = (set, hasher, ...values) => {
  const s = set === void 0 ? /* @__PURE__ */ new Map() : new Map(set);
  for (const v of values) {
    const hashResult = hasher(v);
    if (s.has(hashResult)) continue;
    s.set(hashResult, v);
  }
  return s;
};
var sortByValue = (map, comparer) => {
  const f = comparer ?? defaultComparer;
  return [...map.entries()].sort((a, b) => f(a[1], b[1]));
};
var sortByValueProperty = (map, property, compareFunction) => {
  const cfn = typeof compareFunction === `undefined` ? defaultComparer : compareFunction;
  return [...map.entries()].sort((aE, bE) => {
    const a = aE[1];
    const b = bE[1];
    return cfn(a[property], b[property]);
  });
};
var hasAnyValue = (map, value, comparer) => {
  const entries = [...map.entries()];
  return entries.some((kv) => comparer(kv[1], value));
};
function* filter$3(map, predicate) {
  for (const v of map.values()) {
    if (predicate(v)) yield v;
  }
}
var toArray$3 = (map) => [...map.values()];
var fromIterable$1 = (data, keyFunction = toStringDefault, allowOverwrites = false) => {
  const m = /* @__PURE__ */ new Map();
  for (const d of data) {
    const id = keyFunction(d);
    if (m.has(id) && !allowOverwrites) {
      throw new Error(
        `id ${id} is already used and new data will overwrite it. `
      );
    }
    m.set(id, d);
  }
  return m;
};
var fromObject$1 = (data) => {
  const map = /* @__PURE__ */ new Map();
  if (Array.isArray(data)) {
    for (const d of data) addObject(map, d);
  } else {
    addObject(map, data);
  }
  return map;
};
var addObject = (map, data) => {
  const entries = Object.entries(data);
  for (const [key, value] of entries) {
    map.set(key, value);
  }
};
var find$1 = (map, predicate) => [...map.values()].find((v) => predicate(v));
var some$1 = (map, predicate) => [...map.values()].some((v) => predicate(v));
var mapToObjectTransform = (m, valueTransform) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, unicorn/no-array-reduce
  [...m].reduce((object, [key, value]) => {
    const t = valueTransform(value);
    object[key] = t;
    return object;
  }, {})
);
var zipKeyValue = (keys, values) => {
  if (keys.length !== values.length) {
    throw new Error(`Keys and values arrays should be same length`);
  }
  return Object.fromEntries(keys.map((k, index) => [k, values[index]]));
};
var transformMap = (source, transformer) => new Map(Array.from(source, (v) => [v[0], transformer(v[1], v[0])]));
var toObject = (m) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  [...m].reduce((object, [key, value]) => {
    object[key] = value;
    return object;
  }, {})
);
var mapToArray = (m, transformer) => [...m.entries()].map((x) => transformer(x[0], x[1]));
var mergeByKey$1 = (reconcile, ...maps) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of maps) {
    for (const [mk, mv] of m) {
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return result;
};

// src/numbers/NumericArrays.ts
var weight = (data, fn) => {
  const f = fn ?? ((x) => x);
  return validNumbers(data).map(
    (v, index) => v * f(index / (validNumbers.length - 1))
  );
};
var validNumbers = (data) => data.filter((d) => typeof d === `number` && !Number.isNaN(d));
var dotProduct = (values) => {
  let r = 0;
  const length = values[0].length;
  for (let index = 0; index < length; index++) {
    let t = 0;
    for (const [p, value] of values.entries()) {
      if (p === 0) t = value[index];
      else {
        t *= value[index];
      }
    }
    r += t;
  }
  return r;
};
var average$1 = (data) => {
  if (data === void 0) throw new Error(`data parameter is undefined`);
  const valid = validNumbers(data);
  const total2 = valid.reduce((accumulator, v) => accumulator + v, 0);
  return total2 / valid.length;
};
var min$3 = (data) => Math.min(...validNumbers(data));
var maxIndex = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value > array[bestIndex] ? index : bestIndex,
    0
  )
);
var minIndex = (...data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce(
    (bestIndex, value, index, array) => value < array[bestIndex] ? index : bestIndex,
    0
  )
);
var max$2 = (data) => Math.max(...validNumbers(data));
var total = (data) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  data.reduce((previous, current) => {
    if (typeof current !== `number`) return previous;
    if (Number.isNaN(current)) return previous;
    if (Number.isFinite(current)) return previous;
    return previous + current;
  }, 0)
);
var maxFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.max(m, datum);
  }
  return m;
};
var totalFast = (data) => {
  let m = 0;
  for (const datum of data) {
    m += datum;
  }
  return m;
};
var minFast = (data) => {
  let m = Number.MIN_SAFE_INTEGER;
  for (const datum of data) {
    m = Math.min(m, datum);
  }
  return m;
};

// src/geometry/index.ts
var geometry_exports = {};
__export(geometry_exports, {
  Arcs: () => arc_exports,
  Beziers: () => bezier_exports,
  Circles: () => circle_exports,
  Compound: () => CompoundPath_exports,
  Convolve2d: () => Convolve2d_exports,
  CurveSimplification: () => CurveSimplification_exports,
  Ellipses: () => Ellipse_exports,
  Grids: () => Grid_exports,
  Layouts: () => Layout_exports,
  Lines: () => line_exports,
  Paths: () => path_exports,
  Points: () => point_exports,
  Polar: () => Polar_exports,
  QuadTree: () => QuadTree_exports,
  Rects: () => rect_exports,
  Scaler: () => Scaler_exports,
  Shapes: () => shape_exports,
  SurfacePoints: () => SurfacePoints_exports,
  Triangles: () => triangle_exports,
  Vectors: () => Vector_exports,
  Waypoints: () => Waypoint_exports,
  degreeToRadian: () => degreeToRadian,
  radianInvert: () => radianInvert,
  radianToDegree: () => radianToDegree,
  radiansFromAxisX: () => radiansFromAxisX
});

// src/geometry/Waypoint.ts
var Waypoint_exports = {};
__export(Waypoint_exports, {
  fromPoints: () => fromPoints2,
  init: () => init$2
});

// src/geometry/line/JoinPointsToLines.ts
var joinPointsToLines = (...points) => {
  const lines = [];
  let start = points[0];
  for (let index = 1; index < points.length; index++) {
    lines.push(fromPoints(start, points[index]));
    start = points[index];
  }
  return lines;
};

// src/geometry/line/Guard.ts
var isLine = (p) => {
  if (p === void 0) return false;
  if (p.a === void 0) return false;
  if (p.b === void 0) return false;
  if (!isPoint(p.a)) return false;
  if (!isPoint(p.b)) return false;
  return true;
};
var isPolyLine = (p) => {
  if (!Array.isArray(p)) return false;
  const valid = !p.some((v) => !isLine(v));
  return valid;
};
var guard2 = (line, name = `line`) => {
  if (line === void 0) throw new Error(`${name} undefined`);
  if (line.a === void 0) throw new Error(`${name}.a undefined. Expected {a:Point, b:Point}. Got: ${JSON.stringify(line)}`);
  if (line.b === void 0) throw new Error(`${name}.b undefined. Expected {a:Point, b:Point} Got: ${JSON.stringify(line)}`);
};

// src/geometry/line/GetPointsParameter.ts
var getPointParameter = (aOrLine, b) => {
  let a;
  if (isLine(aOrLine)) {
    b = aOrLine.b;
    a = aOrLine.a;
  } else {
    a = aOrLine;
    if (b === void 0) throw new Error(`Since first parameter is not a line, two points are expected. Got a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`);
  }
  guard$1(a, `a`);
  guard$1(a, `b`);
  return [a, b];
};

// src/geometry/line/Length.ts
function length$1(aOrLine, pointB) {
  if (isPolyLine(aOrLine)) {
    const sum5 = aOrLine.reduce((accumulator, v) => length$1(v) + accumulator, 0);
    return sum5;
  }
  if (aOrLine === void 0) throw new TypeError(`Parameter 'aOrLine' is undefined`);
  const [a, b] = getPointParameter(aOrLine, pointB);
  const x = b.x - a.x;
  const y = b.y - a.y;
  if (a.z !== void 0 && b.z !== void 0) {
    const z = b.z - a.z;
    return Math.hypot(x, y, z);
  } else {
    return Math.hypot(x, y);
  }
}

// src/geometry/line/Interpolate.ts
function interpolate(amount, aOrLine, pointBOrAllowOverflow, allowOverflow) {
  if (typeof pointBOrAllowOverflow === `boolean`) {
    allowOverflow = pointBOrAllowOverflow;
    pointBOrAllowOverflow = void 0;
  }
  if (!allowOverflow) throwPercentTest(amount, `amount`);
  else throwNumberTest(amount, ``, `amount`);
  const [a, b] = getPointParameter(aOrLine, pointBOrAllowOverflow);
  const d = length$1(a, b);
  const d2 = d * (1 - amount);
  if (d === 0 && d2 === 0) return Object.freeze({ ...b });
  const x = b.x - d2 * (b.x - a.x) / d;
  const y = b.y - d2 * (b.y - a.y) / d;
  return Object.freeze({
    ...b,
    x,
    y
  });
}

// src/geometry/line/Angles.ts
var directionVector = (line) => ({
  x: line.b.x - line.a.x,
  y: line.b.y - line.a.y
});
var directionVectorNormalised = (line) => {
  const l = length$1(line);
  const v = directionVector(line);
  return {
    x: v.x / l,
    y: v.y / l
  };
};
var parallel = (line, distance3) => {
  const dv = directionVector(line);
  const dvn = directionVectorNormalised(line);
  const a = {
    x: line.a.x - dvn.y * distance3,
    y: line.a.y + dvn.x * distance3
  };
  return {
    a,
    b: {
      x: a.x + dv.x,
      y: a.y + dv.y
    }
  };
};
var perpendicularPoint = (line, distance3, amount = 0) => {
  const origin = interpolate(amount, line);
  const dvn = directionVectorNormalised(line);
  return {
    x: origin.x - dvn.y * distance3,
    y: origin.y + dvn.x * distance3
  };
};

// src/geometry/line/Midpoint.ts
var midpoint = (aOrLine, pointB) => {
  const [a, b] = getPointParameter(aOrLine, pointB);
  return interpolate(0.5, a, b);
};

// src/geometry/line/index.ts
var line_exports = {};
__export(line_exports, {
  Empty: () => Empty2,
  Placeholder: () => Placeholder2,
  angleRadian: () => angleRadian,
  apply: () => apply2,
  asPoints: () => asPoints,
  bbox: () => bbox2,
  distance: () => distance2$1,
  distanceSingleLine: () => distanceSingleLine,
  divide: () => divide2,
  extendFromA: () => extendFromA,
  fromFlatArray: () => fromFlatArray,
  fromNumbers: () => fromNumbers,
  fromPivot: () => fromPivot,
  fromPoints: () => fromPoints,
  fromPointsToPath: () => fromPointsToPath,
  getPointParameter: () => getPointParameter,
  guard: () => guard2,
  interpolate: () => interpolate,
  isEmpty: () => isEmpty3,
  isEqual: () => isEqual2,
  isLine: () => isLine,
  isPlaceholder: () => isPlaceholder3,
  isPolyLine: () => isPolyLine,
  joinPointsToLines: () => joinPointsToLines,
  length: () => length$1,
  midpoint: () => midpoint,
  multiply: () => multiply3,
  nearest: () => nearest,
  normaliseByRect: () => normaliseByRect2,
  parallel: () => parallel,
  perpendicularPoint: () => perpendicularPoint,
  pointAtX: () => pointAtX,
  pointsOf: () => pointsOf,
  relativePosition: () => relativePosition,
  rotate: () => rotate3,
  scaleFromMidpoint: () => scaleFromMidpoint,
  slope: () => slope,
  subtract: () => subtract2,
  sum: () => sum2$2,
  toFlatArray: () => toFlatArray,
  toPath: () => toPath,
  toString: () => toString3,
  toSvgString: () => toSvgString,
  withinRange: () => withinRange2
});

// src/geometry/rect/Guard.ts
var guardDim = (d, name = `Dimension`) => {
  if (d === void 0) throw new Error(`${name} is undefined`);
  if (Number.isNaN(d)) throw new Error(`${name} is NaN`);
  if (d < 0) throw new Error(`${name} cannot be negative`);
};
var guard3 = (rect, name = `rect`) => {
  if (rect === void 0) throw new Error(`{$name} undefined`);
  if (isPositioned(rect)) guard$1(rect, name);
  guardDim(rect.width, name + `.width`);
  guardDim(rect.height, name + `.height`);
};
var getRectPositioned = (rect, origin) => {
  guard3(rect);
  if (isPositioned(rect) && origin === void 0) {
    return rect;
  }
  if (origin === void 0) throw new Error(`Unpositioned rect needs origin parameter`);
  return Object.freeze({ ...rect, ...origin });
};
var guardPositioned = (rect, name = `rect`) => {
  if (!isPositioned(rect)) throw new Error(`Expected ${name} to have x,y`);
  guard3(rect, name);
};
var isEmpty2 = (rect) => rect.width === 0 && rect.height === 0;
var isPlaceholder2 = (rect) => Number.isNaN(rect.width) && Number.isNaN(rect.height);
var isPositioned = (p) => p.x !== void 0 && p.y !== void 0;
var isRect = (p) => {
  if (p === void 0) return false;
  if (p.width === void 0) return false;
  if (p.height === void 0) return false;
  return true;
};
var isRectPositioned = (p) => isRect(p) && isPositioned(p);

// src/geometry/point/NormaliseByRect.ts
function normaliseByRect(a, b, c, d) {
  if (isPoint(a)) {
    if (typeof b === `number` && c !== void 0) {
      throwNumberTest(b, `positive`, `width`);
      throwNumberTest(c, `positive`, `height`);
    } else {
      if (!isRect(b)) {
        throw new Error(`Expected second parameter to be a rect`);
      }
      c = b.height;
      b = b.width;
    }
    return Object.freeze({
      x: a.x / b,
      y: a.y / c
    });
  } else {
    throwNumberTest(a, `positive`, `x`);
    if (typeof b !== `number`) {
      throw new TypeError(`Expecting second parameter to be a number (width)`);
    }
    if (typeof c !== `number`) {
      throw new TypeError(`Expecting third parameter to be a number (height)`);
    }
    throwNumberTest(b, `positive`, `y`);
    throwNumberTest(c, `positive`, `width`);
    if (d === void 0) throw new Error(`Expected height parameter`);
    throwNumberTest(d, `positive`, `height`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}

// src/geometry/point/GetPointParameter.ts
function getPointParameter2(a, b, c) {
  if (a === void 0) return { x: 0, y: 0 };
  if (Array.isArray(a)) {
    if (a.length === 0) return Object.freeze({ x: 0, y: 0 });
    if (a.length === 1) return Object.freeze({ x: a[0], y: 0 });
    if (a.length === 2) return Object.freeze({ x: a[0], y: a[1] });
    if (a.length === 3) return Object.freeze({ x: a[0], y: a[1], z: a[2] });
    throw new Error(
      `Expected array to be 1-3 elements in length. Got ${a.length}.`
    );
  }
  if (isPoint(a)) {
    return a;
  } else if (typeof a !== `number` || typeof b !== `number`) {
    throw new TypeError(
      `Expected point or x,y as parameters. Got: a: ${JSON.stringify(
        a
      )} b: ${JSON.stringify(b)}`
    );
  }
  if (typeof c === `number`) {
    return Object.freeze({ x: a, y: b, z: c });
  }
  return Object.freeze({ x: a, y: b });
}

// src/geometry/point/Distance.ts
function distance(a, xOrB, y, z) {
  const pt = getPointParameter2(xOrB, y, z);
  guard$1(pt, `b`);
  guard$1(a, `a`);
  return isPoint3d(pt) && isPoint3d(a) ? Math.hypot(pt.x - a.x, pt.y - a.y, pt.z - a.z) : Math.hypot(pt.x - a.x, pt.y - a.y);
}

// src/geometry/line/Nearest.ts
var nearest = (line, point2) => {
  const n = (line2) => {
    const { a, b } = line2;
    const atob = { x: b.x - a.x, y: b.y - a.y };
    const atop = { x: point2.x - a.x, y: point2.y - a.y };
    const length5 = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    const t2 = Math.min(1, Math.max(0, dot / length5));
    dot = (b.x - a.x) * (point2.y - a.y) - (b.y - a.y) * (point2.x - a.x);
    return { x: a.x + atob.x * t2, y: a.y + atob.y * t2 };
  };
  if (Array.isArray(line)) {
    const pts = line.map((l) => n(l));
    const dists = pts.map((p) => distance(p, point2));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n(line));
  }
};

// src/geometry/line/DistanceSingleLine.ts
var distanceSingleLine = (line, point2) => {
  guard2(line, `line`);
  guard$1(point2, `point`);
  if (length$1(line) === 0) {
    return length$1(line.a, point2);
  }
  const near = nearest(line, point2);
  return length$1(near, point2);
};

// src/geometry/point/FindMinimum.ts
var findMinimum = (comparer, ...points) => {
  if (points.length === 0) throw new Error(`No points provided`);
  let min2 = points[0];
  for (const p of points) {
    min2 = comparer(min2, p);
  }
  return min2;
};

// src/geometry/rect/Max.ts
var maxFromCorners = (topLeft, topRight, bottomRight, bottomLeft) => {
  if (topLeft.y > bottomRight.y) {
    throw new Error(`topLeft.y greater than bottomRight.y`);
  }
  if (topLeft.y > bottomLeft.y) {
    throw new Error(`topLeft.y greater than bottomLeft.y`);
  }
  const w1 = topRight.x - topLeft.x;
  const w2 = bottomRight.x - bottomLeft.x;
  const h1 = Math.abs(bottomLeft.y - topLeft.y);
  const h2 = Math.abs(bottomRight.y - topRight.y);
  return {
    x: Math.min(topLeft.x, bottomLeft.x),
    y: Math.min(topRight.y, topLeft.y),
    width: Math.max(w1, w2),
    height: Math.max(h1, h2)
  };
};

// src/geometry/point/Bbox.ts
var bbox = (...points) => {
  const leftMost = findMinimum((a, b) => {
    return a.x < b.x ? a : b;
  }, ...points);
  const rightMost = findMinimum((a, b) => {
    return a.x > b.x ? a : b;
  }, ...points);
  const topMost = findMinimum((a, b) => {
    return a.y < b.y ? a : b;
  }, ...points);
  const bottomMost = findMinimum((a, b) => {
    return a.y > b.y ? a : b;
  }, ...points);
  const topLeft = { x: leftMost.x, y: topMost.y };
  const topRight = { x: rightMost.x, y: topMost.y };
  const bottomRight = { x: rightMost.x, y: bottomMost.y };
  const bottomLeft = { x: leftMost.x, y: bottomMost.y };
  return maxFromCorners(topLeft, topRight, bottomRight, bottomLeft);
};

// src/geometry/line/Bbox.ts
var bbox2 = (line) => bbox(line.a, line.b);

// src/geometry/point/Divider.ts
function divide(a, b, c, d) {
  if (isPoint(a)) {
    guard$1(a, `a`);
    if (isPoint(b)) {
      return Object.freeze({
        x: a.x / b.x,
        y: a.y / b.y
      });
    } else if (isRect(b)) {
      guard3(b, `rect`);
      return Object.freeze({
        x: a.x / b.width,
        y: a.y / b.height
      });
    } else {
      if (c === void 0) c = b;
      guard$1(a);
      throwNumberTest(b, `nonZero`, `x`);
      throwNumberTest(c, `nonZero`, `y`);
      return Object.freeze({
        x: a.x / b,
        y: a.y / c
      });
    }
  } else {
    if (typeof b !== `number`) {
      throw new TypeError(`expected second parameter to be y1 coord`);
    }
    throwNumberTest(a, `positive`, `x1`);
    throwNumberTest(b, `positive`, `y1`);
    if (c === void 0) c = 1;
    if (d === void 0) d = c;
    throwNumberTest(c, `nonZero`, `x2`);
    throwNumberTest(d, `nonZero`, `y2`);
    return Object.freeze({
      x: a / c,
      y: b / d
    });
  }
}
function divider(a, b, c) {
  const divisor = getPointParameter2(a, b, c);
  guardNonZeroPoint(divisor, `divisor`);
  return (aa, bb, cc) => {
    const dividend = getPointParameter2(aa, bb, cc);
    return typeof dividend.z === `undefined` ? Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y
    }) : Object.freeze({
      x: dividend.x / divisor.x,
      y: dividend.y / divisor.y,
      z: dividend.z / (divisor.z ?? 1)
    });
  };
}

// src/geometry/line/Divide.ts
var divide2 = (line, point2) => Object.freeze({
  ...line,
  a: divide(line.a, point2),
  b: divide(line.b, point2)
});

// src/geometry/line/FromFlatArray.ts
var fromFlatArray = (array) => {
  if (!Array.isArray(array)) throw new Error(`arr parameter is not an array`);
  if (array.length !== 4) throw new Error(`array is expected to have length four`);
  return fromNumbers(array[0], array[1], array[2], array[3]);
};

// src/geometry/Polar.ts
var Polar_exports = {};
__export(Polar_exports, {
  clampMagnitude: () => clampMagnitude,
  divide: () => divide3,
  dotProduct: () => dotProduct2,
  fromCartesian: () => fromCartesian,
  guard: () => guard4,
  invert: () => invert,
  isAntiParallel: () => isAntiParallel,
  isOpposite: () => isOpposite,
  isParallel: () => isParallel,
  isPolarCoord: () => isPolarCoord,
  multiply: () => multiply,
  normalise: () => normalise,
  rotate: () => rotate,
  rotateDegrees: () => rotateDegrees,
  spiral: () => spiral,
  spiralRaw: () => spiralRaw,
  toCartesian: () => toCartesian,
  toPoint: () => toPoint,
  toString: () => toString$1
});

// src/geometry/Angles.ts
function degreeToRadian(angleInDegrees) {
  return Array.isArray(angleInDegrees) ? angleInDegrees.map((v) => v * (Math.PI / 180)) : angleInDegrees * (Math.PI / 180);
}
function radianInvert(angleInRadians) {
  return (angleInRadians + Math.PI) % (2 * Math.PI);
}
function radianToDegree(angleInRadians) {
  return Array.isArray(angleInRadians) ? angleInRadians.map((v) => v * 180 / Math.PI) : angleInRadians * 180 / Math.PI;
}
var radiansFromAxisX = (point2) => Math.atan2(point2.x, point2.y);

// src/geometry/point/Subtract.ts
function subtract(a, b, c, d) {
  if (isPoint(a)) {
    guard$1(a, `a`);
    if (isPoint(b)) {
      guard$1(b, `b`);
      return Object.freeze({
        ...a,
        x: a.x - b.x,
        y: a.y - b.y
      });
    } else {
      if (c === void 0) c = b;
      return Object.freeze({
        ...a,
        x: a.x - b,
        y: a.y - c
      });
    }
  } else {
    throwNumberTest(a, ``, `a`);
    if (typeof b !== `number`) {
      throw new TypeError(`Second parameter is expected to by y value`);
    }
    throwNumberTest(b, ``, `b`);
    if (Number.isNaN(c)) throw new Error(`Third parameter is NaN`);
    if (Number.isNaN(d)) throw new Error(`Fourth parameter is NaN`);
    if (c === void 0) c = 0;
    if (d === void 0) d = 0;
    return Object.freeze({
      x: a - c,
      y: b - d
    });
  }
}

// src/geometry/point/Empty.ts
var Empty = { x: 0, y: 0 };

// src/geometry/Polar.ts
var EmptyCartesian = Object.freeze({ x: 0, y: 0 });
var isPolarCoord = (p) => {
  if (p.distance === void 0) return false;
  if (p.angleRadian === void 0) return false;
  return true;
};
var fromCartesian = (point2, origin) => {
  point2 = subtract(point2, origin);
  const angle2 = Math.atan2(point2.y, point2.x);
  return Object.freeze({
    ...point2,
    angleRadian: angle2,
    distance: Math.hypot(point2.x, point2.y)
  });
};
var toCartesian = (a, b, c) => {
  if (isPolarCoord(a)) {
    if (b === void 0) b = Empty;
    if (isPoint(b)) {
      return polarToCartesian(a.distance, a.angleRadian, b);
    }
    throw new Error(
      `Expecting (Coord, Point). Second parameter is not a point`
    );
  } else if (typeof a === `object`) {
    throw new TypeError(
      `First param is an object, but not a Coord: ${JSON.stringify(a)}`
    );
  } else {
    if (typeof a === `number` && typeof b === `number`) {
      if (c === void 0) c = Empty;
      if (!isPoint(c)) {
        throw new Error(
          `Expecting (number, number, Point). Point param wrong type`
        );
      }
      return polarToCartesian(a, b, c);
    } else {
      throw new TypeError(
        `Expecting parameters of (number, number). Got: (${typeof a}, ${typeof b}, ${typeof c}). a: ${JSON.stringify(
          a
        )}`
      );
    }
  }
};
function* spiral(smoothness, zoom) {
  let step = 0;
  while (true) {
    const a = smoothness * step++;
    yield {
      distance: zoom * a,
      angleRadian: a,
      step
    };
  }
}
var rotate = (c, amountRadian) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + amountRadian
});
var normalise = (c) => {
  if (c.distance === 0) throw new Error(`Cannot normalise vector of length 0`);
  return Object.freeze({
    ...c,
    distance: 1
  });
};
var guard4 = (p, name = `Point`) => {
  if (p === void 0) {
    throw new Error(
      `'${name}' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p === null) {
    throw new Error(
      `'${name}' is null. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p.angleRadian === void 0) {
    throw new Error(
      `'${name}.angleRadian' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (p.distance === void 0) {
    throw new Error(
      `'${name}.distance' is undefined. Expected {distance, angleRadian} got ${JSON.stringify(
        p
      )}`
    );
  }
  if (typeof p.angleRadian !== `number`) {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `'${name}.angleRadian' must be a number. Got ${p.angleRadian}`
    );
  }
  if (typeof p.distance !== `number`) {
    throw new TypeError(`'${name}.distance' must be a number. Got ${p.distance}`);
  }
  if (p.angleRadian === null) throw new Error(`'${name}.angleRadian' is null`);
  if (p.distance === null) throw new Error(`'${name}.distance' is null`);
  if (Number.isNaN(p.angleRadian)) {
    throw new TypeError(`'${name}.angleRadian' is NaN`);
  }
  if (Number.isNaN(p.distance)) throw new Error(`'${name}.distance' is NaN`);
};
var dotProduct2 = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  return a.distance * b.distance * Math.cos(b.angleRadian - a.angleRadian);
};
var invert = (p) => {
  guard4(p, `c`);
  return Object.freeze({
    ...p,
    angleRadian: p.angleRadian - Math.PI
  });
};
var isOpposite = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  if (a.distance !== b.distance) return false;
  return a.angleRadian === -b.angleRadian;
};
var isParallel = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  return a.angleRadian === b.angleRadian;
};
var isAntiParallel = (a, b) => {
  guard4(a, `a`);
  guard4(b, `b`);
  return a.angleRadian === -b.angleRadian;
};
var rotateDegrees = (c, amountDeg) => Object.freeze({
  ...c,
  angleRadian: c.angleRadian + degreeToRadian(amountDeg)
});
var spiralRaw = (step, smoothness, zoom) => {
  const a = smoothness * step;
  return Object.freeze({
    distance: zoom * a,
    angleRadian: a
  });
};
var multiply = (v, amt) => {
  guard4(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance * amt
  });
};
var divide3 = (v, amt) => {
  guard4(v);
  throwNumberTest(amt, ``, `amt`);
  return Object.freeze({
    ...v,
    distance: v.distance / amt
  });
};
var clampMagnitude = (v, max2 = 1, min2 = 0) => {
  let mag = v.distance;
  if (mag > max2) mag = max2;
  if (mag < min2) mag = min2;
  return Object.freeze({
    ...v,
    distance: mag
  });
};
var polarToCartesian = (distance3, angleRadians, origin = Empty) => {
  guard$1(origin);
  return Object.freeze({
    x: origin.x + distance3 * Math.cos(angleRadians),
    y: origin.y + distance3 * Math.sin(angleRadians)
  });
};
var toString$1 = (p, digits) => {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  const angleDeg = radianToDegree(p.angleRadian);
  const d = digits ? p.distance.toFixed(digits) : p.distance;
  const a = digits ? angleDeg.toFixed(digits) : angleDeg;
  return `(${d},${a})`;
};
var toPoint = (v, origin = EmptyCartesian) => {
  guard4(v, `v`);
  return Object.freeze({
    x: origin.x + v.distance * Math.cos(v.angleRadian),
    y: origin.y + v.distance * Math.sin(v.angleRadian)
  });
};

// src/geometry/line/FromPivot.ts
var fromPivot = (origin = { x: 0.5, y: 0.5 }, length5 = 1, angleRadian2 = 0, balance = 0.5) => {
  const left = length5 * balance;
  const right = length5 * (1 - balance);
  const a = toCartesian(left, radianInvert(angleRadian2), origin);
  const b = toCartesian(right, angleRadian2, origin);
  return Object.freeze({
    a,
    b
  });
};

// src/geometry/line/FromPointsToPath.ts
var fromPointsToPath = (a, b) => toPath(fromPoints(a, b));

// src/geometry/point/IsEqual.ts
var isEqual$1 = (...p) => {
  if (p === void 0) throw new Error(`parameter 'p' is undefined`);
  if (p.length < 2) return true;
  for (let index = 1; index < p.length; index++) {
    if (p[index].x !== p[0].x) return false;
    if (p[index].y !== p[0].y) return false;
  }
  return true;
};

// src/geometry/line/IsEqual.ts
var isEqual2 = (a, b) => isEqual$1(a.a, b.a) && isEqual$1(a.b, b.b);

// src/geometry/point/index.ts
var point_exports = {};
__export(point_exports, {
  Empty: () => Empty,
  Placeholder: () => Placeholder,
  abs: () => abs,
  angle: () => angle,
  apply: () => apply$1,
  bbox: () => bbox,
  centroid: () => centroid,
  clamp: () => clamp2$1,
  clampMagnitude: () => clampMagnitude2,
  compare: () => compare$1,
  compareByX: () => compareByX,
  convexHull: () => convexHull,
  distance: () => distance,
  distanceToCenter: () => distanceToCenter,
  distanceToExterior: () => distanceToExterior,
  divide: () => divide,
  divider: () => divider,
  dotProduct: () => dotProduct3,
  findMinimum: () => findMinimum,
  from: () => from,
  fromNumbers: () => fromNumbers2,
  getPointParameter: () => getPointParameter2,
  guard: () => guard$1,
  guardNonZeroPoint: () => guardNonZeroPoint,
  interpolate: () => interpolate2,
  invert: () => invert2,
  isEmpty: () => isEmpty$2,
  isEqual: () => isEqual$1,
  isNaN: () => isNaN$1,
  isNull: () => isNull,
  isPlaceholder: () => isPlaceholder,
  isPoint: () => isPoint,
  isPoint3d: () => isPoint3d,
  leftmost: () => leftmost,
  multiply: () => multiply2,
  multiplyScalar: () => multiplyScalar,
  normalise: () => normalise2,
  normaliseByRect: () => normaliseByRect,
  pipeline: () => pipeline,
  pipelineApply: () => pipelineApply,
  progressBetween: () => progressBetween,
  project: () => project,
  quantiseEvery: () => quantiseEvery2,
  random: () => random$1,
  reduce: () => reduce$1,
  relation: () => relation,
  rightmost: () => rightmost,
  rotate: () => rotate2,
  rotatePointArray: () => rotatePointArray,
  round: () => round2,
  subtract: () => subtract,
  sum: () => sum$1,
  toArray: () => toArray$2,
  toIntegerValues: () => toIntegerValues,
  toString: () => toString2$1,
  withinRange: () => withinRange,
  wrap: () => wrap2$1
});

// src/geometry/point/Abs.ts
var abs = (pt) => ({
  ...pt,
  x: Math.abs(pt.x),
  y: Math.abs(pt.y)
});

// src/geometry/point/Angle.ts
var angle = (a, b, c) => {
  guard$1(a, `a`);
  if (b === void 0) {
    return Math.atan2(a.y, a.x);
  }
  guard$1(b, `b`);
  if (c === void 0) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }
  guard$1(c, `c`);
  return Math.atan2(b.y - a.y, b.x - a.x) - Math.atan2(c.y - a.y, c.x - a.x);
};

// src/geometry/point/Apply.ts
var apply$1 = (pt, fn) => {
  guard$1(pt, `pt`);
  return Object.freeze({
    ...pt,
    x: fn(pt.x, `x`),
    y: fn(pt.y, `y`)
  });
};

// src/geometry/point/Centroid.ts
var centroid = (...points) => {
  if (!Array.isArray(points)) throw new Error(`Expected list of points`);
  const sum5 = points.reduce(
    (previous, p) => {
      if (p === void 0) return previous;
      if (Array.isArray(p)) {
        throw new TypeError(
          `'points' list contains an array. Did you mean: centroid(...myPoints)?`
        );
      }
      if (!isPoint(p)) {
        throw new Error(
          `'points' contains something which is not a point: ${JSON.stringify(
            p
          )}`
        );
      }
      return {
        x: previous.x + p.x,
        y: previous.y + p.y
      };
    },
    { x: 0, y: 0 }
  );
  return Object.freeze({
    x: sum5.x / points.length,
    y: sum5.y / points.length
  });
};

// src/geometry/point/Clamp.ts
function clamp2$1(a, b, c, d) {
  if (isPoint(a)) {
    if (b === void 0) b = 0;
    if (c === void 0) c = 1;
    throwNumberTest(b, ``, `min`);
    throwNumberTest(c, ``, `max`);
    return Object.freeze({
      x: clamp(a.x, b, c),
      y: clamp(a.y, b, c)
    });
  } else {
    if (b === void 0) throw new Error(`Expected y coordinate`);
    if (c === void 0) c = 0;
    if (d === void 0) d = 1;
    throwNumberTest(a, ``, `x`);
    throwNumberTest(b, ``, `y`);
    throwNumberTest(c, ``, `min`);
    throwNumberTest(d, ``, `max`);
    return Object.freeze({
      x: clamp(a, c, d),
      y: clamp(b, c, d)
    });
  }
}

// src/geometry/point/Compare.ts
var compare$1 = (a, b) => {
  if (a.x < b.x && a.y < b.y) return -2;
  if (a.x > b.x && a.y > b.y) return 2;
  if (a.x < b.x || a.y < b.y) return -1;
  if (a.x > b.x || a.y > b.y) return 1;
  if (a.x === b.x && a.x === b.y) return 0;
  return Number.NaN;
};
var compareByX = (a, b) => a.x - b.x || a.y - b.y;

// src/geometry/point/ConvexHull.ts
var convexHull = (...pts) => {
  const sorted = [...pts].sort(compareByX);
  if (sorted.length === 1) return sorted;
  const x = (points) => {
    const v = [];
    for (const p of points) {
      while (v.length >= 2) {
        const q = v.at(-1);
        const r = v.at(-2);
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) {
          v.pop();
        } else break;
      }
      v.push(p);
    }
    v.pop();
    return v;
  };
  const upper = x(sorted);
  const lower = x(sorted.reverse());
  if (upper.length === 1 && lower.length === 1 && isEqual$1(lower[0], upper[0])) {
    return upper;
  }
  return [...upper, ...lower];
};

// src/geometry/circle/Guard.ts
var guard5 = (circle, parameterName = `circle`) => {
  if (isCirclePositioned(circle)) {
    guard$1(circle, `circle`);
  }
  if (Number.isNaN(circle.radius)) throw new Error(`${parameterName}.radius is NaN`);
  if (circle.radius <= 0) throw new Error(`${parameterName}.radius must be greater than zero`);
};
var guardPositioned2 = (circle, parameterName = `circle`) => {
  if (!isCirclePositioned(circle)) throw new Error(`Expected a positioned circle with x,y`);
  guard5(circle, parameterName);
};
var isNaN2 = (a) => {
  if (Number.isNaN(a.radius)) return true;
  if (isCirclePositioned(a)) {
    if (Number.isNaN(a.x)) return true;
    if (Number.isNaN(a.y)) return true;
  }
  return false;
};
var isPositioned2 = (p) => p.x !== void 0 && p.y !== void 0;
var isCircle = (p) => p.radius !== void 0;
var isCirclePositioned = (p) => isCircle(p) && isPositioned2(p);

// src/geometry/circle/DistanceCenter.ts
var distanceCenter = (a, b) => {
  guardPositioned2(a, `a`);
  if (isCirclePositioned(b)) {
    guardPositioned2(b, `b`);
  }
  return distance(a, b);
};

// src/geometry/circle/DistanceFromExterior.ts
var distanceFromExterior = (a, b) => {
  guardPositioned2(a, `a`);
  if (isCirclePositioned(b)) {
    return Math.max(0, distanceCenter(a, b) - a.radius - b.radius);
  } else if (isPoint(b)) {
    const distribution = distance(a, b);
    if (distribution < a.radius) return 0;
    return distribution;
  } else throw new Error(`Second parameter invalid type`);
};

// src/geometry/circle/IsEqual.ts
var isEqual3 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (isCirclePositioned(a) && isCirclePositioned(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
    return true;
  } else if (!isCirclePositioned(a) && !isCirclePositioned(b)) ; else return false;
  return false;
};

// src/geometry/point/Sum.ts
var sum$1 = function(a, b, c, d) {
  if (a === void 0) throw new TypeError(`a missing`);
  let ptA;
  let ptB;
  if (isPoint(a)) {
    ptA = a;
    if (b === void 0) b = Empty;
    if (isPoint(b)) {
      ptB = b;
    } else {
      if (b === void 0) throw new Error(`Expects x coordinate`);
      ptB = { x: b, y: c ?? b };
    }
  } else if (!isPoint(b)) {
    if (b === void 0) throw new Error(`Expected number as second param`);
    ptA = { x: a, y: b };
    if (c === void 0) throw new Error(`Expects x coordiante`);
    ptB = { x: c, y: d ?? 0 };
  }
  if (ptA === void 0) throw new Error(`ptA missing. a: ${JSON.stringify(a)}`);
  if (ptB === void 0) throw new Error(`ptB missing. b: ${JSON.stringify(b)}`);
  guard$1(ptA, `a`);
  guard$1(ptB, `b`);
  return Object.freeze({
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  });
};

// src/geometry/circle/Intersections.ts
var intersectionLine = (circle, line) => {
  const v1 = {
    x: line.b.x - line.a.x,
    y: line.b.y - line.a.y
  };
  const v2 = {
    x: line.a.x - circle.x,
    y: line.a.y - circle.y
  };
  const b = (v1.x * v2.x + v1.y * v2.y) * -2;
  const c = 2 * (v1.x * v1.x + v1.y * v1.y);
  const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
  if (Number.isNaN(d)) return [];
  const u1 = (b - d) / c;
  const u2 = (b + d) / c;
  const returnValue = [];
  if (u1 <= 1 && u1 >= 0) {
    returnValue.push({
      x: line.a.x + v1.x * u1,
      y: line.a.y + v1.y * u1
    });
  }
  if (u2 <= 1 && u2 >= 0) {
    returnValue.push({
      x: line.a.x + v1.x * u2,
      y: line.a.y + v1.y * u2
    });
  }
  return returnValue;
};
var intersections = (a, b) => {
  const vector = subtract(b, a);
  const centerD = Math.hypot(vector.y, vector.x);
  if (centerD > a.radius + b.radius) return [];
  if (centerD < Math.abs(a.radius - b.radius)) return [];
  if (isEqual3(a, b)) return [];
  const centroidD = (a.radius * a.radius - b.radius * b.radius + centerD * centerD) / (2 * centerD);
  const centroid3 = {
    x: a.x + vector.x * centroidD / centerD,
    y: a.y + vector.y * centroidD / centerD
  };
  const centroidIntersectionD = Math.sqrt(a.radius * a.radius - centroidD * centroidD);
  const intersection = {
    x: -vector.y * (centroidIntersectionD / centerD),
    y: vector.x * (centroidIntersectionD / centerD)
  };
  return [
    sum$1(centroid3, intersection),
    subtract(centroid3, intersection)
  ];
};

// src/geometry/Intersects.ts
var circleRect = (a, b) => {
  const deltaX = a.x - Math.max(b.x, Math.min(a.x, b.x + b.width));
  const deltaY = a.y - Math.max(b.y, Math.min(a.y, b.y + b.height));
  return deltaX * deltaX + deltaY * deltaY < a.radius * a.radius;
};
var circleCircle = (a, b) => intersections(a, b).length === 2;

// src/geometry/rect/Intersects.ts
function intersectsPoint(rect, a, b) {
  guard3(rect, `rect`);
  let x = 0;
  let y = 0;
  if (typeof a === `number`) {
    if (b === void 0) throw new Error(`x and y coordinate needed`);
    x = a;
    y = b;
  } else {
    x = a.x;
    y = a.y;
  }
  if (isPositioned(rect)) {
    if (x - rect.x > rect.width || x < rect.x) return false;
    if (y - rect.y > rect.height || y < rect.y) return false;
  } else {
    if (x > rect.width || x < 0) return false;
    if (y > rect.height || y < 0) return false;
  }
  return true;
}
var isIntersecting = (a, b) => {
  if (!isRectPositioned(a)) {
    throw new Error(`a parameter should be RectPositioned`);
  }
  if (isCirclePositioned(b)) {
    return circleRect(b, a);
  } else if (isPoint(b)) {
    return intersectsPoint(a, b);
  }
  throw new Error(`Unknown shape for b: ${JSON.stringify(b)}`);
};

// src/geometry/rect/Center.ts
var center = (rect, origin) => {
  guard3(rect);
  if (origin === void 0 && isPoint(rect)) origin = rect;
  else if (origin === void 0) origin = { x: 0, y: 0 };
  getRectPositioned(rect, origin);
  return Object.freeze({
    x: origin.x + rect.width / 2,
    y: origin.y + rect.height / 2
  });
};

// src/geometry/point/PointType.ts
var Placeholder = Object.freeze({ x: Number.NaN, y: Number.NaN });

// src/geometry/rect/Distance.ts
var distanceFromExterior2 = (rect, pt) => {
  guardPositioned(rect, `rect`);
  guard$1(pt, `pt`);
  if (intersectsPoint(rect, pt)) return 0;
  const dx = Math.max(rect.x - pt.x, 0, pt.x - rect.x + rect.width);
  const dy = Math.max(rect.y - pt.y, 0, pt.y - rect.y + rect.height);
  return Math.hypot(dx, dy);
};
var distanceFromCenter = (rect, pt) => distance(center(rect), pt);

// src/geometry/point/DistanceToCenter.ts
var distanceToCenter = (a, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a);
  }
  if (isPoint(shape)) return distance(a, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/DistanceToExterior.ts
var distanceToExterior = (a, shape) => {
  if (isRectPositioned(shape)) {
    return distanceFromExterior2(shape, a);
  }
  if (isCirclePositioned(shape)) {
    return distanceFromExterior(shape, a);
  }
  if (isPoint(shape)) return distance(a, shape);
  throw new Error(`Unknown shape`);
};

// src/geometry/point/ToArray.ts
var toArray$2 = (p) => [p.x, p.y];

// src/geometry/point/DotProduct.ts
var dotProduct3 = (...pts) => {
  const a = pts.map((p) => toArray$2(p));
  return dotProduct(a);
};

// src/geometry/point/From.ts
var from = (xOrArray, y) => {
  if (Array.isArray(xOrArray)) {
    if (xOrArray.length !== 2) {
      throw new Error(`Expected array of length two, got ${xOrArray.length}`);
    }
    return Object.freeze({
      x: xOrArray[0],
      y: xOrArray[1]
    });
  } else {
    if (xOrArray === void 0) xOrArray = 0;
    else if (Number.isNaN(xOrArray)) throw new Error(`x is NaN`);
    if (y === void 0) y = 0;
    else if (Number.isNaN(y)) throw new Error(`y is NaN`);
    return Object.freeze({ x: xOrArray, y });
  }
};
var fromNumbers2 = (...coords) => {
  const pts = [];
  if (Array.isArray(coords[0])) {
    for (const coord of coords) {
      if (!(coord.length % 2 === 0)) {
        throw new Error(`coords array should be even-numbered`);
      }
      pts.push(Object.freeze({ x: coord[0], y: coord[1] }));
    }
  } else {
    if (coords.length % 2 !== 0) {
      throw new Error(`Expected even number of elements: [x,y,x,y...]`);
    }
    for (let index = 0; index < coords.length; index += 2) {
      pts.push(
        Object.freeze({ x: coords[index], y: coords[index + 1] })
      );
    }
  }
  return pts;
};

// src/geometry/point/Interpolate.ts
var interpolate2 = (amount, a, b, allowOverflow = false) => interpolate(amount, a, b, allowOverflow);

// src/geometry/point/Invert.ts
var invert2 = (pt, what = `both`) => {
  switch (what) {
    case `both`: {
      return isPoint3d(pt) ? Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1,
        z: pt.z * -1
      }) : Object.freeze({
        ...pt,
        x: pt.x * -1,
        y: pt.y * -1
      });
    }
    case `x`: {
      return Object.freeze({
        ...pt,
        x: pt.x * -1
      });
    }
    case `y`: {
      return Object.freeze({
        ...pt,
        y: pt.y * -1
      });
    }
    case `z`: {
      if (isPoint3d(pt)) {
        return Object.freeze({
          ...pt,
          z: pt.z * -1
        });
      } else throw new Error(`pt parameter is missing z`);
    }
    default: {
      throw new Error(`Unknown what parameter. Expecting 'both', 'x' or 'y'`);
    }
  }
};

// src/geometry/point/Multiply.ts
function multiply2(a, bOrX, y) {
  guard$1(a, `a`);
  if (typeof bOrX === `number`) {
    if (typeof y === `undefined`) y = bOrX;
    throwNumberTest(y, ``, `y`);
    throwNumberTest(bOrX, ``, `x`);
    return Object.freeze({ x: a.x * bOrX, y: a.y * y });
  } else if (isPoint(bOrX)) {
    guard$1(bOrX, `b`);
    return Object.freeze({
      x: a.x * bOrX.x,
      y: a.y * bOrX.y
    });
  } else if (isRect(bOrX)) {
    guard3(bOrX, `rect`);
    return Object.freeze({
      x: a.x * bOrX.width,
      y: a.y * bOrX.height
    });
  } else {
    throw new Error(
      `Invalid arguments. a: ${JSON.stringify(a)} b: ${JSON.stringify(bOrX)}`
    );
  }
}
var multiplyScalar = (pt, v) => {
  return isPoint3d(pt) ? Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v,
    z: pt.z * v
  }) : Object.freeze({
    ...pt,
    x: pt.x * v,
    y: pt.y * v
  });
};

// src/geometry/point/Magnitude.ts
var clampMagnitude2 = (pt, max2 = 1, min2 = 0) => {
  const length5 = distance(pt);
  let ratio = 1;
  if (length5 > max2) {
    ratio = max2 / length5;
  } else if (length5 < min2) {
    ratio = min2 / length5;
  }
  return ratio === 1 ? pt : multiply2(pt, ratio, ratio);
};

// src/geometry/point/Most.ts
var leftmost = (...points) => findMinimum((a, b) => a.x <= b.x ? a : b, ...points);
var rightmost = (...points) => findMinimum((a, b) => a.x >= b.x ? a : b, ...points);

// src/geometry/point/Normalise.ts
var length2 = (ptOrX, y) => {
  if (isPoint(ptOrX)) {
    y = ptOrX.y;
    ptOrX = ptOrX.x;
  }
  if (y === void 0) throw new Error(`Expected y`);
  return Math.hypot(ptOrX, y);
};
var normalise2 = (ptOrX, y) => {
  const pt = getPointParameter2(ptOrX, y);
  const l = length2(pt);
  if (l === 0) return Empty;
  return Object.freeze({
    ...pt,
    x: pt.x / l,
    y: pt.y / l
  });
};

// src/geometry/point/Pipeline.ts
var pipelineApply = (pt, ...pipelineFns) => pipeline(...pipelineFns)(pt);
var pipeline = (...pipeline2) => (pt) => (
  // eslint-disable-next-line unicorn/no-array-reduce
  pipeline2.reduce((previous, current) => current(previous), pt)
);

// src/geometry/point/ProgressBetween.ts
var progressBetween = (currentPos, from2, to) => {
  const a = subtract(currentPos, from2);
  const b = subtract(to, from2);
  return isPoint3d(a) && isPoint3d(b) ? (a.x * b.x + a.y * b.y + a.z * b.z) / (b.x * b.x + b.y * b.y + b.z * b.z) : (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
};

// src/geometry/point/Project.ts
var project = (origin, distance3, angle2) => {
  const x = Math.cos(angle2) * distance3 + origin.x;
  const y = Math.sin(angle2) * distance3 + origin.y;
  return { x, y };
};

// src/geometry/point/Quantise.ts
var quantiseEvery2 = (pt, snap, middleRoundsUp = true) => Object.freeze({
  x: quantiseEvery(pt.x, snap.x, middleRoundsUp),
  y: quantiseEvery(pt.y, snap.y, middleRoundsUp)
});

// src/geometry/point/Random.ts
var random$1 = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando()
  });
};

// src/geometry/point/Reduce.ts
var reduce$1 = (pts, fn, initial) => {
  if (initial === void 0) initial = { x: 0, y: 0 };
  let accumulator = initial;
  for (const p of pts) {
    accumulator = fn(p, accumulator);
  }
  return accumulator;
};

// src/geometry/point/Relation.ts
var relation = (a, b) => {
  const start = getPointParameter2(a, b);
  let totalX = 0;
  let totalY = 0;
  let count = 0;
  let lastUpdate = performance.now();
  let lastPoint = start;
  const update = (aa, bb) => {
    const p = getPointParameter2(aa, bb);
    totalX += p.x;
    totalY += p.y;
    count++;
    const distanceFromStart = distance(p, start);
    const distanceFromLast = distance(p, lastPoint);
    const now = performance.now();
    const speed = distanceFromLast / (now - lastUpdate);
    lastUpdate = now;
    lastPoint = p;
    return Object.freeze({
      angle: angle(p, start),
      distanceFromStart,
      distanceFromLast,
      speed,
      centroid: centroid(p, start),
      average: {
        x: totalX / count,
        y: totalY / count
      }
    });
  };
  return update;
};

// src/geometry/point/Rotate.ts
function rotate2(pt, amountRadian, origin) {
  if (origin === void 0) origin = { x: 0, y: 0 };
  guard$1(origin, `origin`);
  throwNumberTest(amountRadian, ``, `amountRadian`);
  const arrayInput = Array.isArray(pt);
  if (amountRadian === 0) return pt;
  if (!arrayInput) {
    pt = [pt];
  }
  const ptAr = pt;
  for (const [index, p] of ptAr.entries()) guard$1(p, `pt[${index}]`);
  const asPolar = ptAr.map((p) => fromCartesian(p, origin));
  const rotated = asPolar.map((p) => rotate(p, amountRadian));
  const asCartesisan = rotated.map((p) => toCartesian(p, origin));
  return arrayInput ? asCartesisan : asCartesisan[0];
}

// src/geometry/point/RotatePointArray.ts
var rotatePointArray = (v, amountRadian) => {
  const mat = [
    [Math.cos(amountRadian), -Math.sin(amountRadian)],
    [Math.sin(amountRadian), Math.cos(amountRadian)]
  ];
  const result = [];
  for (const [index, element] of v.entries()) {
    result[index] = [
      mat[0][0] * element[0] + mat[0][1] * element[1],
      mat[1][0] * element[0] + mat[1][1] * element[1]
    ];
  }
  return result;
};

// src/geometry/point/Round.ts
var round2 = (ptOrX, yOrDigits, digits) => {
  const pt = getPointParameter2(ptOrX, yOrDigits);
  digits = digits ?? yOrDigits;
  digits = digits ?? 2;
  return Object.freeze({
    ...pt,
    x: round(digits, pt.x),
    y: round(digits, pt.y)
  });
};

// src/geometry/point/To.ts
var toIntegerValues = (pt, rounder = Math.round) => {
  guard$1(pt, `pt`);
  return Object.freeze({
    x: rounder(pt.x),
    y: rounder(pt.y)
  });
};
function toString2$1(p, digits) {
  if (p === void 0) return `(undefined)`;
  if (p === null) return `(null)`;
  guard$1(p, `pt`);
  const x = digits ? p.x.toFixed(digits) : p.x;
  const y = digits ? p.y.toFixed(digits) : p.y;
  if (p.z === void 0) {
    return `(${x},${y})`;
  } else {
    const z = digits ? p.z.toFixed(digits) : p.z;
    return `(${x},${y},${z})`;
  }
}

// src/geometry/point/WithinRange.ts
var withinRange = (a, b, maxRange) => {
  guard$1(a, `a`);
  guard$1(b, `b`);
  if (typeof maxRange === `number`) {
    throwNumberTest(maxRange, `positive`, `maxRange`);
    maxRange = { x: maxRange, y: maxRange };
  } else {
    guard$1(maxRange, `maxRange`);
  }
  const x = Math.abs(b.x - a.x);
  const y = Math.abs(b.y - a.y);
  return x <= maxRange.x && y <= maxRange.y;
};

// src/geometry/point/Wrap.ts
var wrap2$1 = (pt, ptMax, ptMin) => {
  if (ptMax === void 0) ptMax = { x: 1, y: 1 };
  if (ptMin === void 0) ptMin = { x: 0, y: 0 };
  guard$1(pt, `pt`);
  guard$1(ptMax, `ptMax`);
  guard$1(ptMin, `ptMin`);
  return Object.freeze({
    x: wrap$1(pt.x, ptMin.x, ptMax.x),
    y: wrap$1(pt.y, ptMin.y, ptMax.y)
  });
};

// src/geometry/line/Multiply.ts
var multiply3 = (line, point2) => Object.freeze({
  ...line,
  a: multiply2(line.a, point2),
  b: multiply2(line.b, point2)
});

// src/geometry/line/RelativePosition.ts
var relativePosition = (line, pt) => {
  const fromStart = distance(line.a, pt);
  const total = length$1(line);
  return fromStart / total;
};

// src/geometry/line/Rotate.ts
var rotate3 = (line, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return line;
  if (origin === void 0) origin = 0.5;
  if (typeof origin === `number`) {
    origin = interpolate(origin, line.a, line.b);
  }
  return Object.freeze({
    ...line,
    a: rotate2(line.a, amountRadian, origin),
    b: rotate2(line.b, amountRadian, origin)
  });
};

// src/geometry/line/Subtract.ts
var subtract2 = (line, point2) => Object.freeze({
  ...line,
  a: subtract(line.a, point2),
  b: subtract(line.b, point2)
});

// src/geometry/line/Sum.ts
var sum2$2 = (line, point2) => Object.freeze({
  ...line,
  a: sum$1(line.a, point2),
  b: sum$1(line.b, point2)
});

// src/geometry/line/ToString.ts
function toString3(a, b) {
  if (isLine(a)) {
    guard2(a, `a`);
    b = a.b;
    a = a.a;
  } else if (b === void 0) throw new Error(`Expect second point if first is a point`);
  return toString2$1(a) + `-` + toString2$1(b);
}

// src/geometry/line/index.ts
var Empty2 = Object.freeze({
  a: Object.freeze({ x: 0, y: 0 }),
  b: Object.freeze({ x: 0, y: 0 })
});
var Placeholder2 = Object.freeze({
  a: Object.freeze({ x: Number.NaN, y: Number.NaN }),
  b: Object.freeze({ x: Number.NaN, y: Number.NaN })
});
var isEmpty3 = (l) => isEmpty$2(l.a) && isEmpty$2(l.b);
var isPlaceholder3 = (l) => isPlaceholder(l.a) && isPlaceholder(l.b);
var apply2 = (line, fn) => Object.freeze(
  {
    ...line,
    a: fn(line.a),
    b: fn(line.b)
  }
);
var angleRadian = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b point must be provided`);
  }
  return Math.atan2(b.y - a.y, b.x - a.x);
};
var normaliseByRect2 = (line, width, height4) => Object.freeze({
  ...line,
  a: normaliseByRect(line.a, width, height4),
  b: normaliseByRect(line.b, width, height4)
});
var withinRange2 = (line, point2, maxRange) => {
  const calculatedDistance = distance2$1(line, point2);
  return calculatedDistance <= maxRange;
};
var slope = (lineOrPoint, b) => {
  let a;
  if (isLine(lineOrPoint)) {
    a = lineOrPoint.a;
    b = lineOrPoint.b;
  } else {
    a = lineOrPoint;
    if (b === void 0) throw new Error(`b parameter required`);
  }
  if (b === void 0) {
    throw new TypeError(`Second point missing`);
  } else {
    return (b.y - a.y) / (b.x - a.x);
  }
};
var scaleFromMidpoint = (line, factor) => {
  const a = interpolate(factor / 2, line);
  const b = interpolate(0.5 + factor / 2, line);
  return { a, b };
};
var pointAtX = (line, x) => {
  const y = line.a.y + (x - line.a.x) * slope(line);
  return Object.freeze({ x, y });
};
var extendFromA = (line, distance3) => {
  const calculatedLength = length$1(line);
  return Object.freeze({
    ...line,
    a: line.a,
    b: Object.freeze({
      x: line.b.x + (line.b.x - line.a.x) / calculatedLength * distance3,
      y: line.b.y + (line.b.y - line.a.y) / calculatedLength * distance3
    })
  });
};
function* pointsOf(line) {
  const { a, b } = line;
  let x0 = Math.floor(a.x);
  let y0 = Math.floor(a.y);
  const x1 = Math.floor(b.x);
  const y1 = Math.floor(b.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  while (true) {
    yield { x: x0, y: y0 };
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}
var distance2$1 = (line, point2) => {
  if (Array.isArray(line)) {
    const distances = line.map((l) => distanceSingleLine(l, point2));
    return minFast(distances);
  } else {
    return distanceSingleLine(line, point2);
  }
};
var toFlatArray = (a, b) => {
  if (isLine(a)) {
    return [a.a.x, a.a.y, a.b.x, a.b.y];
  } else if (isPoint(a) && isPoint(b)) {
    return [a.x, a.y, b.x, b.y];
  } else {
    throw new Error(`Expected single line parameter, or a and b points`);
  }
};
function* asPoints(lines) {
  for (const l of lines) {
    yield l.a;
    yield l.b;
  }
}
var toSvgString = (a, b) => [`M${a.x} ${a.y} L ${b.x} ${b.y}`];

// src/geometry/line/ToPath.ts
var toPath = (line) => {
  const { a, b } = line;
  return Object.freeze({
    ...line,
    length: () => length$1(a, b),
    interpolate: (amount) => interpolate(amount, a, b),
    relativePosition: (point2) => relativePosition(line, point2),
    bbox: () => bbox2(line),
    toString: () => toString3(a, b),
    toFlatArray: () => toFlatArray(a, b),
    toSvgString: () => toSvgString(a, b),
    toPoints: () => [a, b],
    rotate: (amountRadian, origin) => toPath(rotate3(line, amountRadian, origin)),
    nearest: (point2) => nearest(line, point2),
    sum: (point2) => toPath(sum2$2(line, point2)),
    divide: (point2) => toPath(divide2(line, point2)),
    multiply: (point2) => toPath(multiply3(line, point2)),
    subtract: (point2) => toPath(subtract2(line, point2)),
    midpoint: () => midpoint(a, b),
    distanceToPoint: (point2) => distanceSingleLine(line, point2),
    parallel: (distance3) => parallel(line, distance3),
    perpendicularPoint: (distance3, amount) => perpendicularPoint(line, distance3, amount),
    slope: () => slope(line),
    withinRange: (point2, maxRange) => withinRange2(line, point2, maxRange),
    isEqual: (otherLine) => isEqual2(line, otherLine),
    apply: (fn) => toPath(apply2(line, fn)),
    kind: `line`
  });
};

// src/geometry/Waypoint.ts
var fromPoints2 = (waypoints, opts = {}) => {
  const lines = joinPointsToLines(...waypoints);
  return init$2(
    lines.map((l) => toPath(l)),
    opts
  );
};
var init$2 = (paths, opts = {}) => {
  const maxDistanceFromLine = opts.maxDistanceFromLine ?? 0.1;
  const checkUnordered = (pt) => {
    const results = paths.map((p, index) => {
      const nearest3 = p.nearest(pt);
      const distance3 = distance(pt, nearest3);
      const positionRelative = p.relativePosition(nearest3, maxDistanceFromLine);
      return { positionRelative, path: p, index, nearest: nearest3, distance: distance3, rank: Number.MAX_SAFE_INTEGER };
    });
    const filtered = results.filter((v) => v.distance <= maxDistanceFromLine);
    const sorted = sortByNumericProperty(filtered, `distance`);
    for (let rank = 0; rank < sorted.length; rank++) {
      sorted[rank].rank = rank;
    }
    return sorted;
  };
  return checkUnordered;
};

// src/geometry/Layout.ts
var Layout_exports = {};
__export(Layout_exports, {
  CirclePacking: () => CirclePacking_exports
});

// src/geometry/CirclePacking.ts
var CirclePacking_exports = {};
__export(CirclePacking_exports, {
  random: () => random3
});

// src/geometry/shape/index.ts
var shape_exports = {};
__export(shape_exports, {
  arrow: () => arrow,
  center: () => center3,
  isIntersecting: () => isIntersecting3,
  randomPoint: () => randomPoint3,
  starburst: () => starburst
});

// src/geometry/rect/Corners.ts
var corners = (rect, origin) => {
  const r = getRectPositioned(rect, origin);
  return [
    { x: r.x, y: r.y },
    { x: r.x + r.width, y: r.y },
    { x: r.x + r.width, y: r.y + r.height },
    { x: r.x, y: r.y + r.height }
  ];
};

// src/geometry/rect/FromTopLeft.ts
var fromTopLeft = (origin, width, height4) => {
  guardDim(width, `width`);
  guardDim(height4, `height`);
  guard$1(origin, `origin`);
  return { x: origin.x, y: origin.y, width, height: height4 };
};

// src/geometry/circle/IsContainedBy.ts
var isContainedBy = (a, b, c) => {
  const d = distanceCenter(a, b);
  if (isCircle(b)) {
    return d < Math.abs(a.radius - b.radius);
  } else if (isPoint(b)) {
    if (c === void 0) {
      return d <= a.radius;
    } else {
      return d < Math.abs(a.radius - c);
    }
  } else throw new Error(`b parameter is expected to be CirclePositioned or Point`);
};

// src/geometry/circle/Intersecting.ts
var isIntersecting2 = (a, b, c) => {
  if (isEqual$1(a, b)) return true;
  if (isContainedBy(a, b, c)) return true;
  if (isCircle(b)) {
    return circleCircle(a, b);
  } else if (isRectPositioned(b)) {
    return circleRect(a, b);
  } else if (isPoint(b) && c !== void 0) {
    return circleCircle(a, { ...b, radius: c });
  }
  return false;
};

// src/geometry/circle/Random.ts
var piPi$2 = Math.PI * 2;
var randomPoint = (within, opts = {}) => {
  const offset2 = isCirclePositioned(within) ? within : { x: 0, y: 0 };
  const strategy = opts.strategy ?? `uniform`;
  const margin = opts.margin ?? 0;
  const radius = within.radius - margin;
  const rand = opts.randomSource ?? Math.random;
  switch (strategy) {
    case `naive`: {
      return sum$1(offset2, toCartesian(rand() * radius, rand() * piPi$2));
    }
    case `uniform`: {
      return sum$1(offset2, toCartesian(Math.sqrt(rand()) * radius, rand() * piPi$2));
    }
    default: {
      throw new Error(`Unknown strategy '${strategy}'. Expects 'uniform' or 'naive'`);
    }
  }
};

// src/geometry/circle/Center.ts
var center2 = (circle) => {
  return isCirclePositioned(circle) ? Object.freeze({ x: circle.x, y: circle.y }) : Object.freeze({ x: circle.radius, y: circle.radius });
};

// src/geometry/rect/Random.ts
var random2 = (rando) => {
  if (rando === void 0) rando = defaultRandom;
  return Object.freeze({
    x: rando(),
    y: rando(),
    width: rando(),
    height: rando()
  });
};
var randomPoint2 = (within, opts = {}) => {
  const rand = opts.randomSource ?? defaultRandom;
  const margin = opts.margin ?? { x: 0, y: 0 };
  const x = rand() * (within.width - margin.x - margin.x);
  const y = rand() * (within.height - margin.y - margin.y);
  const pos = { x: x + margin.x, y: y + margin.y };
  return isPositioned(within) ? sum$1(pos, within) : Object.freeze(pos);
};

// src/geometry/shape/index.ts
var isIntersecting3 = (a, b) => {
  if (isCirclePositioned(a)) {
    return isIntersecting2(a, b);
  } else if (isRectPositioned(a)) {
    return isIntersecting(a, b);
  }
  throw new Error(
    `a or b are unknown shapes. a: ${JSON.stringify(a)} b: ${JSON.stringify(b)}`
  );
};
var randomPoint3 = (shape, opts = {}) => {
  if (isCirclePositioned(shape)) {
    return randomPoint(shape, opts);
  } else if (isRectPositioned(shape)) {
    return randomPoint2(shape, opts);
  }
  throw new Error(`Unknown shape. Only CirclePositioned and RectPositioned are supported.`);
};
var center3 = (shape) => {
  if (shape === void 0) {
    return Object.freeze({ x: 0.5, y: 0.5 });
  } else if (isRect(shape)) {
    return center(shape);
  } else if (triangle_exports.isTriangle(shape)) {
    return triangle_exports.centroid(shape);
  } else if (isCircle(shape)) {
    return center2(shape);
  } else {
    throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
};
var starburst = (outerRadius, points = 5, innerRadius, origin = point_exports.Empty, opts) => {
  throwIntegerTest(points, `positive`, `points`);
  const angle2 = Math.PI * 2 / points;
  const angleHalf = angle2 / 2;
  const initialAngle = opts?.initialAngleRadian ?? -Math.PI / 2;
  if (innerRadius === void 0) innerRadius = outerRadius / 2;
  let a = initialAngle;
  const pts = [];
  for (let index = 0; index < points; index++) {
    const peak = toCartesian(outerRadius, a, origin);
    const left = toCartesian(innerRadius, a - angleHalf, origin);
    const right = toCartesian(innerRadius, a + angleHalf, origin);
    pts.push(left, peak);
    if (index + 1 < points) pts.push(right);
    a += angle2;
  }
  return pts;
};
var arrow = (origin, from2, opts = {}) => {
  const tailLength = opts.tailLength ?? 10;
  const tailThickness = opts.tailThickness ?? Math.max(tailLength / 5, 5);
  const angleRadian2 = opts.angleRadian ?? 0;
  const arrowSize = opts.arrowSize ?? Math.max(tailLength / 5, 15);
  const triAngle = Math.PI / 2;
  let tri;
  let tailPoints;
  if (from2 === `tip`) {
    tri = triangle_exports.equilateralFromVertex(origin, arrowSize, triAngle);
    tailPoints = corners(
      fromTopLeft(
        { x: tri.a.x - tailLength, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
  } else if (from2 === `middle`) {
    const midX = tailLength + arrowSize / 2;
    const midY = tailThickness / 2;
    tri = triangle_exports.equilateralFromVertex(
      {
        x: origin.x + arrowSize * 1.2,
        y: origin.y
      },
      arrowSize,
      triAngle
    );
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x - midX, y: origin.y - midY },
        tailLength + arrowSize,
        tailThickness
      )
    );
  } else {
    tailPoints = corners(
      fromTopLeft(
        { x: origin.x, y: origin.y - tailThickness / 2 },
        tailLength,
        tailThickness
      )
    );
    tri = triangle_exports.equilateralFromVertex(
      { x: origin.x + tailLength + arrowSize * 0.7, y: origin.y },
      arrowSize,
      triAngle
    );
  }
  const arrow2 = point_exports.rotate(
    [
      tailPoints[0],
      tailPoints[1],
      tri.a,
      tri.b,
      tri.c,
      tailPoints[2],
      tailPoints[3]
    ],
    angleRadian2,
    origin
  );
  return arrow2;
};

// src/geometry/CirclePacking.ts
var random3 = (circles, container, opts = {}) => {
  if (!Array.isArray(circles)) throw new Error(`Parameter 'circles' is not an array`);
  const attempts = opts.attempts ?? 2e3;
  const sorted = sortByNumericProperty(circles, `radius`);
  const positionedCircles = [];
  const willHit = (b, radius) => positionedCircles.some((v) => isIntersecting2(v, b, radius));
  while (sorted.length > 0) {
    const circle = sorted.pop();
    if (!circle) break;
    const randomPointOpts = { ...opts, margin: { x: circle.radius, y: circle.radius } };
    for (let index = 0; index < attempts; index++) {
      const position = randomPoint3(container, randomPointOpts);
      if (!willHit(position, circle.radius)) {
        positionedCircles.push(Object.freeze({ ...circle, ...position }));
        break;
      }
    }
  }
  return positionedCircles;
};

// src/geometry/circle/index.ts
var circle_exports = {};
__export(circle_exports, {
  area: () => area,
  bbox: () => bbox3,
  center: () => center2,
  circumference: () => circumference,
  distanceCenter: () => distanceCenter,
  distanceFromExterior: () => distanceFromExterior,
  exteriorIntegerPoints: () => exteriorIntegerPoints,
  guard: () => guard5,
  guardPositioned: () => guardPositioned2,
  interiorIntegerPoints: () => interiorIntegerPoints,
  interpolate: () => interpolate3,
  intersectionLine: () => intersectionLine,
  intersections: () => intersections,
  isCircle: () => isCircle,
  isCirclePositioned: () => isCirclePositioned,
  isContainedBy: () => isContainedBy,
  isEqual: () => isEqual3,
  isIntersecting: () => isIntersecting2,
  isNaN: () => isNaN2,
  isPositioned: () => isPositioned2,
  length: () => length3,
  multiplyScalar: () => multiplyScalar2,
  nearest: () => nearest2,
  pointOnPerimeter: () => pointOnPerimeter,
  randomPoint: () => randomPoint,
  toPath: () => toPath2,
  toPositioned: () => toPositioned,
  toSvg: () => toSvg
});

// src/geometry/circle/Area.ts
var area = (circle) => {
  guard5(circle);
  return Math.PI * circle.radius * circle.radius;
};

// src/geometry/rect/FromCenter.ts
var fromCenter = (origin, width, height4) => {
  guard$1(origin, `origin`);
  guardDim(width, `width`);
  guardDim(height4, `height`);
  const halfW = width / 2;
  const halfH = height4 / 2;
  return {
    x: origin.x - halfW,
    y: origin.y - halfH,
    width,
    height: height4
  };
};

// src/geometry/circle/Bbox.ts
var bbox3 = (circle) => {
  return isCirclePositioned(circle) ? fromCenter(circle, circle.radius * 2, circle.radius * 2) : { width: circle.radius * 2, height: circle.radius * 2, x: 0, y: 0 };
};

// src/geometry/circle/ExteriorPoints.ts
function* exteriorIntegerPoints(circle) {
  const { x, y, radius } = circle;
  let xx = radius;
  let yy = 0;
  let radiusError = 1 - x;
  while (xx >= yy) {
    yield { x: xx + x, y: yy + y };
    yield { x: yy + x, y: xx + y };
    yield { x: -xx + x, y: yy + y };
    yield { x: -yy + x, y: xx + y };
    yield { x: -xx + x, y: -yy + y };
    yield { x: -yy + x, y: -xx + y };
    yield { x: xx + x, y: -yy + y };
    yield { x: yy + x, y: -xx + y };
    yy++;
    if (radiusError < 0) {
      radiusError += 2 * yy + 1;
    } else {
      xx--;
      radiusError += 2 * (yy - xx + 1);
    }
  }
}

// src/geometry/circle/InteriorPoints.ts
function* interiorIntegerPoints(circle) {
  const xMin = circle.x - circle.radius;
  const xMax = circle.x + circle.radius;
  const yMin = circle.y - circle.radius;
  const yMax = circle.y + circle.radius;
  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      const r = Math.abs(distance(circle, x, y));
      if (r <= circle.radius) yield { x, y };
    }
  }
}

// src/geometry/circle/Perimeter.ts
var piPi2$1 = Math.PI * 2;
var nearest2 = (circle, b) => {
  const n = (a) => {
    const l = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const x = a.x + a.radius * ((b.x - a.x) / l);
    const y = a.y + a.radius * ((b.y - a.y) / l);
    return { x, y };
  };
  if (Array.isArray(circle)) {
    const pts = circle.map((l) => n(l));
    const dists = pts.map((p) => distance(p, b));
    return Object.freeze(pts[minIndex(...dists)]);
  } else {
    return Object.freeze(n(circle));
  }
};
var pointOnPerimeter = (circle, angleRadian2, origin) => {
  if (origin === void 0) {
    origin = isCirclePositioned(circle) ? circle : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(-angleRadian2) * circle.radius + origin.x,
    y: Math.sin(-angleRadian2) * circle.radius + origin.y
  };
};
var circumference = (circle) => {
  guard5(circle);
  return piPi2$1 * circle.radius;
};
var length3 = (circle) => circumference(circle);

// src/geometry/circle/Interpolate.ts
var piPi3 = Math.PI * 2;
var interpolate3 = (circle, t2) => pointOnPerimeter(circle, t2 * piPi3);

// src/geometry/circle/Multiply.ts
function multiplyScalar2(a, value) {
  if (isCirclePositioned(a)) {
    const pt = multiplyScalar(a, value);
    return Object.freeze({
      ...a,
      ...pt,
      radius: a.radius * value
    });
  } else {
    return Object.freeze({
      ...a,
      radius: a.radius * value
    });
  }
}

// src/geometry/circle/Svg.ts
var toSvg = (a, sweep, origin) => {
  if (isCircle(a)) {
    if (origin !== void 0) {
      return toSvgFull(a.radius, origin, sweep);
    }
    if (isCirclePositioned(a)) {
      return toSvgFull(a.radius, a, sweep);
    } else throw new Error(`origin parameter needed for non-positioned circle`);
  } else {
    if (origin === void 0) {
      throw new Error(`origin parameter needed`);
    } else {
      return toSvgFull(a, origin, sweep);
    }
  }
};
var toSvgFull = (radius, origin, sweep) => {
  const { x, y } = origin;
  const s = sweep ? `1` : `0`;
  return `
    M ${x}, ${y}
    m -${radius}, 0
    a ${radius},${radius} 0 1,${s} ${radius * 2},0
    a ${radius},${radius} 0 1,${s} -${radius * 2},0
  `.split(`
`);
};

// src/geometry/circle/ToPath.ts
var toPath2 = (circle) => {
  guard5(circle);
  return {
    ...circle,
    nearest: (point2) => nearest2(circle, point2),
    /**
     * Returns a relative (0.0-1.0) point on a circle. 0=3 o'clock, 0.25=6 o'clock, 0.5=9 o'clock, 0.75=12 o'clock etc.
     * @param {t} Relative (0.0-1.0) point
     * @returns {Point} X,y
     */
    interpolate: (t2) => interpolate3(circle, t2),
    bbox: () => bbox3(circle),
    length: () => circumference(circle),
    toSvgString: (sweep = true) => toSvg(circle, sweep),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `circular`
  };
};

// src/geometry/circle/ToPositioned.ts
var toPositioned = (circle, defaultPositionOrX, y) => {
  if (isCirclePositioned(circle)) return circle;
  const pt = getPointParameter2(defaultPositionOrX, y);
  return Object.freeze({
    ...circle,
    ...pt
  });
};

// src/geometry/rect/index.ts
var rect_exports = {};
__export(rect_exports, {
  area: () => area2,
  cardinal: () => cardinal,
  center: () => center,
  corners: () => corners,
  distanceFromCenter: () => distanceFromCenter,
  distanceFromExterior: () => distanceFromExterior2,
  edges: () => edges$1,
  empty: () => empty,
  emptyPositioned: () => emptyPositioned,
  fromCenter: () => fromCenter,
  fromElement: () => fromElement,
  fromNumbers: () => fromNumbers3,
  fromTopLeft: () => fromTopLeft,
  getEdgeX: () => getEdgeX,
  getEdgeY: () => getEdgeY,
  getRectPositioned: () => getRectPositioned,
  getRectPositionedParameter: () => getRectPositionedParameter,
  guard: () => guard3,
  guardDim: () => guardDim,
  guardPositioned: () => guardPositioned,
  intersectsPoint: () => intersectsPoint,
  isEmpty: () => isEmpty2,
  isEqual: () => isEqual4,
  isEqualSize: () => isEqualSize,
  isIntersecting: () => isIntersecting,
  isPlaceholder: () => isPlaceholder2,
  isPositioned: () => isPositioned,
  isRect: () => isRect,
  isRectPositioned: () => isRectPositioned,
  lengths: () => lengths,
  maxFromCorners: () => maxFromCorners,
  multiply: () => multiply4,
  multiplyScalar: () => multiplyScalar3,
  normaliseByRect: () => normaliseByRect3,
  random: () => random2,
  randomPoint: () => randomPoint2,
  subtract: () => subtract3,
  sum: () => sum3,
  toArray: () => toArray2$1
});

// src/geometry/rect/Area.ts
var area2 = (rect) => {
  guard3(rect);
  return rect.height * rect.width;
};

// src/geometry/rect/Cardinal.ts
var cardinal = (rect, card) => {
  const { x, y, width, height: height4 } = rect;
  switch (card) {
    case `nw`: {
      return Object.freeze({ x, y });
    }
    case `n`: {
      return Object.freeze({
        x: x + width / 2,
        y
      });
    }
    case `ne`: {
      return Object.freeze({
        x: x + width,
        y
      });
    }
    case `sw`: {
      return Object.freeze({ x, y: y + height4 });
    }
    case `s`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4
      });
    }
    case `se`: {
      return Object.freeze({
        x: x + width,
        y: y + height4
      });
    }
    case `w`: {
      return Object.freeze({ x, y: y + height4 / 2 });
    }
    case `e`: {
      return Object.freeze({ x: x + width, y: y + height4 / 2 });
    }
    case `center`: {
      return Object.freeze({
        x: x + width / 2,
        y: y + height4 / 2
      });
    }
    default: {
      throw new Error(`Unknown direction: ${card}`);
    }
  }
};

// src/geometry/rect/Edges.ts
var edges$1 = (rect, origin) => {
  const c = corners(rect, origin);
  return joinPointsToLines(...c, c[0]);
};
var getEdgeX = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.x : 0;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.x + rect.width : rect.width;
    }
  }
};
var getEdgeY = (rect, edge) => {
  guard3(rect);
  switch (edge) {
    case `top`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `bottom`: {
      return isPoint(rect) ? rect.y + rect.height : rect.height;
    }
    case `left`: {
      return isPoint(rect) ? rect.y : 0;
    }
    case `right`: {
      return isPoint(rect) ? rect.y : 0;
    }
  }
};

// src/geometry/rect/Empty.ts
var empty = Object.freeze({ width: 0, height: 0 });
var emptyPositioned = Object.freeze({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

// src/geometry/rect/FromElement.ts
var fromElement = (el) => ({
  width: el.clientWidth,
  height: el.clientHeight
});

// src/geometry/rect/FromNumbers.ts
function fromNumbers3(xOrWidth, yOrHeight, width, height4) {
  if (width === void 0 || height4 === void 0) {
    if (typeof xOrWidth !== `number`) throw new Error(`width is not an number`);
    if (typeof yOrHeight !== `number`) {
      throw new TypeError(`height is not an number`);
    }
    return Object.freeze({ width: xOrWidth, height: yOrHeight });
  }
  if (typeof xOrWidth !== `number`) throw new Error(`x is not an number`);
  if (typeof yOrHeight !== `number`) throw new Error(`y is not an number`);
  if (typeof width !== `number`) throw new Error(`width is not an number`);
  if (typeof height4 !== `number`) throw new Error(`height is not an number`);
  return Object.freeze({ x: xOrWidth, y: yOrHeight, width, height: height4 });
}

// src/geometry/rect/GetRectPositionedParameter.ts
function getRectPositionedParameter(a, b, c, d) {
  if (typeof a === `number`) {
    if (typeof b === `number`) {
      if (typeof c === `number` && typeof d === `number`) {
        return { x: a, y: b, width: c, height: d };
      } else if (isRect(c)) {
        return { x: a, y: b, width: c.width, height: c.height };
      } else {
        throw new TypeError(`If params 'a' & 'b' are numbers, expect following parameters to be x,y or Rect`);
      }
    } else {
      throw new TypeError(`If parameter 'a' is a number, expect following parameters to be: y,w,h`);
    }
  } else if (isRectPositioned(a)) {
    return a;
  } else if (isRect(a)) {
    if (typeof b === `number` && typeof c === `number`) {
      return { width: a.width, height: a.height, x: b, y: c };
    } else if (isPoint(b)) {
      return { width: a.width, height: a.height, x: b.x, y: b.y };
    } else {
      throw new TypeError(`If param 'a' is a Rect, expects following parameters to be x,y`);
    }
  } else if (isPoint(a)) {
    if (typeof b === `number` && typeof c === `number`) {
      return { x: a.x, y: a.y, width: b, height: c };
    } else if (isRect(b)) {
      return { x: a.x, y: a.y, width: b.width, height: b.height };
    } else {
      throw new TypeError(`If parameter 'a' is a Point, expect following params to be: Rect or width,height`);
    }
  }
  throw new TypeError(`Expect a first parameter to be x,RectPositioned,Rect or Point`);
}

// src/geometry/rect/IsEqual.ts
var isEqualSize = (a, b) => {
  if (a === void 0) throw new Error(`a undefined`);
  if (b === void 0) throw new Error(`b undefined`);
  return a.width === b.width && a.height === b.height;
};
var isEqual4 = (a, b) => {
  if (isPositioned(a) && isPositioned(b)) {
    if (!isEqual$1(a, b)) return false;
    return a.width === b.width && a.height === b.height;
  } else if (!isPositioned(a) && !isPositioned(b)) {
    return a.width === b.width && a.height === b.height;
  } else {
    return false;
  }
};

// src/geometry/rect/Lengths.ts
var lengths = (rect) => {
  guardPositioned(rect, `rect`);
  return edges$1(rect).map((l) => length$1(l));
};

// src/geometry/rect/Multiply.ts
function multiply4(a, b, c) {
  guard3(a, `a`);
  if (isRect(b)) {
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: a.x * b.width,
      y: a.y * b.height,
      width: a.width * b.width,
      height: a.height * b.height
    }) : Object.freeze({
      ...a,
      width: a.width * b.width,
      height: a.height * b.height
    });
  } else {
    if (typeof b !== `number`) {
      throw new TypeError(
        `Expected second parameter of type Rect or number. Got ${JSON.stringify(
          b
        )}`
      );
    }
    if (c === void 0) c = b;
    return isRectPositioned(a) ? Object.freeze({
      ...a,
      x: a.x * b,
      y: a.y * c,
      width: a.width * b,
      height: a.height * c
    }) : Object.freeze({
      ...a,
      width: a.width * b,
      height: a.height * c
    });
  }
}
function multiplyScalar3(rect, amount) {
  return isPositioned(rect) ? Object.freeze({
    ...rect,
    x: rect.x * amount,
    y: rect.y * amount,
    width: rect.width * amount,
    height: rect.height * amount
  }) : Object.freeze({
    ...rect,
    width: rect.width * amount,
    height: rect.height * amount
  });
}

// src/geometry/rect/NormaliseByRect.ts
var normaliseByRect3 = (rect, normaliseByOrWidth, height4) => {
  let width;
  if (height4 === void 0) {
    if (isRect(normaliseByOrWidth)) {
      height4 = normaliseByOrWidth.height;
      width = normaliseByOrWidth.width;
    } else {
      throw new Error(
        `Expects rectangle or width and height parameters for normaliseBy`
      );
    }
  } else {
    if (typeof normaliseByOrWidth === `number`) {
      width = normaliseByOrWidth;
    } else {
      throw new TypeError(
        `Expects rectangle or width and height parameters for normaliseBy`
      );
    }
  }
  return isPositioned(rect) ? Object.freeze({
    x: rect.x / width,
    y: rect.y / height4,
    width: rect.width / width,
    height: rect.height / height4
  }) : Object.freeze({
    width: rect.width / width,
    height: rect.height / height4
  });
};

// src/geometry/rect/Subtract.ts
function subtract3(a, b, c) {
  if (a === void 0) throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height4 = c ?? 0;
    return Object.freeze({
      ...a,
      width: a.width - b,
      height: a.height - height4
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width - b.width,
      height: a.height - b.height
    });
  }
}

// src/geometry/rect/Sum.ts
function sum3(a, b, c) {
  if (a === void 0) throw new Error(`First parameter undefined`);
  if (typeof b === `number`) {
    const height4 = c ?? 0;
    return Object.freeze({
      ...a,
      width: a.width + b,
      height: a.height + height4
    });
  } else {
    return Object.freeze({
      ...a,
      width: a.width + b.width,
      height: a.height + b.height
    });
  }
}

// src/geometry/rect/ToArray.ts
function toArray2$1(rect) {
  if (isPositioned(rect)) {
    return [rect.x, rect.y, rect.width, rect.height];
  } else if (isRect(rect)) {
    return [rect.width, rect.height];
  } else {
    throw new Error(
      `Param 'rect' is not a rectangle. Got: ${JSON.stringify(rect)}`
    );
  }
}

// src/geometry/path/index.ts
var path_exports = {};
__export(path_exports, {
  getEnd: () => getEnd,
  getStart: () => getStart
});

// src/geometry/bezier/Guard.ts
var isQuadraticBezier = (path) => path.quadratic !== void 0;
var isCubicBezier = (path) => path.cubic1 !== void 0 && path.cubic2 !== void 0;

// src/geometry/path/index.ts
var getStart = function(path) {
  if (isQuadraticBezier(path)) return path.a;
  else if (isLine(path)) return path.a;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};
var getEnd = function(path) {
  if (isQuadraticBezier(path)) return path.b;
  else if (isLine(path)) return path.b;
  else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
};

// src/geometry/Grid.ts
var Grid_exports = {};
__export(Grid_exports, {
  access1dArray: () => access1dArray,
  allDirections: () => allDirections,
  array2dUpdater: () => array2dUpdater,
  asRectangles: () => asRectangles,
  cellAtPoint: () => cellAtPoint,
  cellEquals: () => cellEquals,
  cellFromIndex: () => cellFromIndex,
  cellKeyString: () => cellKeyString,
  cellMiddle: () => cellMiddle,
  cells: () => cells,
  crossDirections: () => crossDirections,
  getLine: () => getLine,
  getVectorFromCardinal: () => getVectorFromCardinal,
  guardCell: () => guardCell,
  indexFromCell: () => indexFromCell,
  inside: () => inside,
  isEqual: () => isEqual5,
  neighbours: () => neighbours,
  offset: () => offset,
  offsetCardinals: () => offsetCardinals,
  rectangleForCell: () => rectangleForCell,
  rows: () => rows,
  simpleLine: () => simpleLine,
  toArray: () => toArray3$1,
  visitArray: () => visitArray,
  visitFor: () => visitFor,
  visitNeigbours: () => visitNeigbours,
  visitor: () => visitor,
  visitorBreadth: () => visitorBreadth,
  visitorColumn: () => visitorColumn,
  visitorDepth: () => visitorDepth,
  visitorRandom: () => visitorRandom,
  visitorRandomContiguous: () => visitorRandomContiguous,
  visitorRow: () => visitorRow
});
var isCell = (cell) => {
  if (cell === void 0) return false;
  return `x` in cell && `y` in cell;
};
var isNeighbour = (n) => {
  if (n === void 0) return false;
  if (n[1] === void 0) return false;
  return true;
};
var isEqual5 = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  if (`rows` in a && `cols` in a) {
    if (`rows` in b && `cols` in b) {
      if (a.rows !== b.rows || a.cols !== b.cols) return false;
    } else return false;
  }
  if (`size` in a) {
    if (`size` in b) {
      if (a.size !== b.size) return false;
    } else return false;
  }
  return true;
};
var cellKeyString = (v) => `Cell{${v.x},${v.y}}`;
var cellEquals = (a, b) => {
  if (b === void 0) return false;
  if (a === void 0) return false;
  return a.x === b.x && a.y === b.y;
};
var guardCell = (cell, parameterName = `Param`, grid) => {
  if (cell === void 0) {
    throw new Error(parameterName + ` is undefined. Expecting {x,y}`);
  }
  if (cell.x === void 0) throw new Error(parameterName + `.x is undefined`);
  if (cell.y === void 0) throw new Error(parameterName + `.y is undefined`);
  if (Number.isNaN(cell.x)) throw new Error(parameterName + `.x is NaN`);
  if (Number.isNaN(cell.y)) throw new Error(parameterName + `.y is NaN`);
  if (!Number.isInteger(cell.x)) {
    throw new TypeError(parameterName + `.x is non-integer`);
  }
  if (!Number.isInteger(cell.y)) {
    throw new TypeError(parameterName + `.y is non-integer`);
  }
  if (grid !== void 0 && !inside(grid, cell)) {
    throw new Error(
      `${parameterName} is outside of grid. Cell: ${cell.x},${cell.y} Grid: ${grid.cols}, ${grid.rows}`
    );
  }
};
var guardGrid = (grid, parameterName = `Param`) => {
  if (grid === void 0) {
    throw new Error(`${parameterName} is undefined. Expecting grid.`);
  }
  if (!(`rows` in grid)) throw new Error(`${parameterName}.rows is undefined`);
  if (!(`cols` in grid)) throw new Error(`${parameterName}.cols is undefined`);
  if (!Number.isInteger(grid.rows)) {
    throw new TypeError(`${parameterName}.rows is not an integer`);
  }
  if (!Number.isInteger(grid.cols)) {
    throw new TypeError(`${parameterName}.cols is not an integer`);
  }
};
var inside = (grid, cell) => {
  if (cell.x < 0 || cell.y < 0) return false;
  if (cell.x >= grid.cols || cell.y >= grid.rows) return false;
  return true;
};
var rectangleForCell = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  const r = fromTopLeft({ x, y }, size, size);
  return r;
};
function* asRectangles(grid) {
  for (const c of cells(grid)) {
    yield rectangleForCell(grid, c);
  }
}
var toArray3$1 = (grid, initialValue) => {
  const returnValue = [];
  for (let row = 0; row < grid.rows; row++) {
    returnValue[row] = Array.from({ length: grid.cols });
    if (initialValue) {
      for (let col = 0; col < grid.cols; col++) {
        returnValue[row][col] = initialValue;
      }
    }
  }
  return returnValue;
};
var cellAtPoint = (grid, position) => {
  const size = grid.size;
  throwNumberTest(size, `positive`, `grid.size`);
  if (position.x < 0 || position.y < 0) return;
  const x = Math.floor(position.x / size);
  const y = Math.floor(position.y / size);
  if (x >= grid.cols) return;
  if (y >= grid.rows) return;
  return { x, y };
};
var allDirections = Object.freeze([
  `n`,
  `ne`,
  `nw`,
  `e`,
  `s`,
  `se`,
  `sw`,
  `w`
]);
var crossDirections = Object.freeze([
  `n`,
  `e`,
  `s`,
  `w`
]);
var neighbours = (grid, cell, bounds = `undefined`, directions) => {
  const directories = directions ?? allDirections;
  const points = directories.map(
    (c) => offset(grid, cell, getVectorFromCardinal(c), bounds)
  );
  return zipKeyValue(directories, points);
};
function* visitNeigbours(grid, cell, bounds = `undefined`, directions) {
  const directories = directions ?? allDirections;
  const points = directories.map(
    (c) => offset(grid, cell, getVectorFromCardinal(c), bounds)
  );
  for (const pt of points) {
    if (pt !== void 0) yield pt;
  }
}
var cellMiddle = (grid, cell) => {
  guardCell(cell);
  const size = grid.size;
  const x = cell.x * size;
  const y = cell.y * size;
  return Object.freeze({ x: x + size / 2, y: y + size / 2 });
};
var getLine = (start, end) => {
  guardCell(start);
  guardCell(end);
  let startX = start.x;
  let startY = start.y;
  const dx = Math.abs(end.x - startX);
  const dy = Math.abs(end.y - startY);
  const sx = startX < end.x ? 1 : -1;
  const sy = startY < end.y ? 1 : -1;
  let error = dx - dy;
  const cells2 = [];
  while (true) {
    cells2.push(Object.freeze({ x: startX, y: startY }));
    if (startX === end.x && startY === end.y) break;
    const error2 = 2 * error;
    if (error2 > -dy) {
      error -= dy;
      startX += sx;
    }
    if (error2 < dx) {
      error += dx;
      startY += sy;
    }
  }
  return cells2;
};
var offsetCardinals = (grid, start, steps, bounds = `stop`) => {
  guardGrid(grid, `grid`);
  guardCell(start, `start`);
  throwIntegerTest(steps, `aboveZero`, `steps`);
  const directions = allDirections;
  const vectors = directions.map((d) => getVectorFromCardinal(d, steps));
  const cells2 = directions.map(
    (d, index) => offset(grid, start, vectors[index], bounds)
  );
  return zipKeyValue(directions, cells2);
};
var getVectorFromCardinal = (cardinal2, multiplier = 1) => {
  let v;
  switch (cardinal2) {
    case `n`: {
      v = { x: 0, y: -1 * multiplier };
      break;
    }
    case `ne`: {
      v = { x: 1 * multiplier, y: -1 * multiplier };
      break;
    }
    case `e`: {
      v = { x: 1 * multiplier, y: 0 };
      break;
    }
    case `se`: {
      v = { x: 1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `s`: {
      v = { x: 0, y: 1 * multiplier };
      break;
    }
    case `sw`: {
      v = { x: -1 * multiplier, y: 1 * multiplier };
      break;
    }
    case `w`: {
      v = { x: -1 * multiplier, y: 0 };
      break;
    }
    case `nw`: {
      v = { x: -1 * multiplier, y: -1 * multiplier };
      break;
    }
    default: {
      v = { x: 0, y: 0 };
    }
  }
  return Object.freeze(v);
};
var simpleLine = function(start, end, endInclusive = false) {
  const cells2 = [];
  if (start.x === end.x) {
    const lastY = endInclusive ? end.y + 1 : end.y;
    for (let y = start.y; y < lastY; y++) {
      cells2.push({ x: start.x, y });
    }
  } else if (start.y === end.y) {
    const lastX = endInclusive ? end.x + 1 : end.x;
    for (let x = start.x; x < lastX; x++) {
      cells2.push({ x, y: start.y });
    }
  } else {
    throw new Error(
      `Only does vertical and horizontal: ${start.x},${start.y} - ${end.x},${end.y}`
    );
  }
  return cells2;
};
var offset = function(grid, start, vector, bounds = `undefined`) {
  guardCell(start, `start`, grid);
  guardCell(vector);
  guardGrid(grid, `grid`);
  let x = start.x;
  let y = start.y;
  switch (bounds) {
    case `wrap`: {
      x += vector.x % grid.cols;
      y += vector.y % grid.rows;
      if (x < 0) x = grid.cols + x;
      else if (x >= grid.cols) {
        x -= grid.cols;
      }
      if (y < 0) y = grid.rows + y;
      else if (y >= grid.rows) {
        y -= grid.rows;
      }
      break;
    }
    case `stop`: {
      x += vector.x;
      y += vector.y;
      x = clampIndex(x, grid.cols);
      y = clampIndex(y, grid.rows);
      break;
    }
    case `undefined`: {
      x += vector.x;
      y += vector.y;
      if (x < 0 || y < 0) return;
      if (x >= grid.cols || y >= grid.rows) return;
      break;
    }
    case `unbounded`: {
      x += vector.x;
      y += vector.y;
      break;
    }
    default: {
      throw new Error(`Unknown BoundsLogic case ${bounds}`);
    }
  }
  return Object.freeze({ x, y });
};
var neighbourList = (grid, cell, directions, bounds) => {
  const cellNeighbours = neighbours(grid, cell, bounds, directions);
  const entries = Object.entries(cellNeighbours);
  return entries.filter((n) => isNeighbour(n));
};
var visitor = function* (logic, grid, start, opts = {}) {
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  const v = opts.visited ?? mutable$3(cellKeyString);
  const possibleNeighbours = logic.options ?? ((g, c) => neighbourList(g, c, crossDirections, `undefined`));
  if (!isCell(start)) {
    throw new Error(`'start' parameter is undefined or not a cell`);
  }
  let cellQueue = [start];
  let moveQueue = [];
  let current = void 0;
  while (cellQueue.length > 0) {
    if (current === void 0) {
      const nv = cellQueue.pop();
      if (nv === void 0) {
        break;
      }
      current = nv;
    }
    if (!v.has(current)) {
      v.add(current);
      yield current;
      const nextSteps = possibleNeighbours(grid, current).filter(
        (step) => {
          if (step[1] === void 0) return false;
          return !v.has(step[1]);
        }
      );
      if (nextSteps.length === 0) {
        if (current !== void 0) {
          cellQueue = cellQueue.filter((cq) => cellEquals(cq, current));
        }
      } else {
        for (const n of nextSteps) {
          if (n === void 0) continue;
          if (n[1] === void 0) continue;
          moveQueue.push(n);
        }
      }
    }
    moveQueue = moveQueue.filter((step) => !v.has(step[1]));
    if (moveQueue.length === 0) {
      current = void 0;
    } else {
      const potential = logic.select(moveQueue);
      if (potential !== void 0) {
        cellQueue.push(potential[1]);
        current = potential[1];
      }
    }
  }
};
var visitorDepth = (grid, start, opts = {}) => visitor(
  {
    select: (nbos) => nbos.at(-1)
  },
  grid,
  start,
  opts
);
var visitorBreadth = (grid, start, opts = {}) => visitor(
  {
    select: (nbos) => nbos[0]
  },
  grid,
  start,
  opts
);
var randomNeighbour = (nbos) => randomElement(nbos);
var visitorRandomContiguous = (grid, start, opts = {}) => visitor(
  {
    select: randomNeighbour
  },
  grid,
  start,
  opts
);
var visitorRandom = (grid, start, opts = {}) => visitor(
  {
    options: (grid2, cell) => {
      const t2 = [];
      for (const c of cells(grid2, cell)) {
        t2.push([`n`, c]);
      }
      return t2;
    },
    select: randomNeighbour
  },
  grid,
  start,
  opts
);
var visitorRow = (grid, start, opts = {}) => {
  if (!start) start = { x: 0, y: 0 };
  const { reversed = false } = opts;
  const neighbourSelect = (nbos) => nbos.find((n) => n[0] === (reversed ? `w` : `e`));
  const possibleNeighbours = (grid2, cell) => {
    if (reversed) {
      if (cell.x > 0) {
        cell = { x: cell.x - 1, y: cell.y };
      } else {
        if (cell.y > 0) {
          cell = { x: grid2.cols - 1, y: cell.y - 1 };
        } else {
          cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
        }
      }
    } else {
      if (cell.x < grid2.rows - 1) {
        cell = { x: cell.x + 1, y: cell.y };
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: 0, y: cell.y + 1 };
        } else {
          cell = { x: 0, y: 0 };
        }
      }
    }
    return [[reversed ? `w` : `e`, cell]];
  };
  const logic = {
    select: neighbourSelect,
    options: possibleNeighbours
  };
  return visitor(logic, grid, start, opts);
};
var visitFor = (grid, start, steps, visitor2) => {
  throwIntegerTest(steps, ``, `steps`);
  const opts = {
    reversed: steps < 0
  };
  steps = Math.abs(steps);
  let c = start;
  let v = visitor2(grid, start, opts);
  v.next();
  let stepsMade = 0;
  while (stepsMade < steps) {
    stepsMade++;
    const { value } = v.next();
    if (value) {
      c = value;
      if (opts.debug) {
        console.log(
          `stepsMade: ${stepsMade} cell: ${c.x}, ${c.y} reverse: ${opts.reversed}`
        );
      }
    } else {
      if (steps >= grid.cols * grid.rows) {
        steps -= grid.cols * grid.rows;
        stepsMade = 0;
        v = visitor2(grid, start, opts);
        v.next();
        c = start;
        if (opts.debug) console.log(`resetting visitor to ${steps}`);
      } else throw new Error(`Value not received by visitor`);
    }
  }
  return c;
};
var visitorColumn = (grid, start, opts = {}) => {
  const { reversed = false } = opts;
  const logic = {
    select: (nbos) => nbos.find((n) => n[0] === (reversed ? `n` : `s`)),
    options: (grid2, cell) => {
      if (reversed) {
        if (cell.y > 0) {
          cell = { x: cell.x, y: cell.y - 1 };
        } else {
          if (cell.x === 0) {
            cell = { x: grid2.cols - 1, y: grid2.rows - 1 };
          } else {
            cell = { x: cell.x - 1, y: grid2.rows - 1 };
          }
        }
      } else {
        if (cell.y < grid2.rows - 1) {
          cell = { x: cell.x, y: cell.y + 1 };
        } else {
          if (cell.x < grid2.cols - 1) {
            cell = { x: cell.x + 1, y: 0 };
          } else {
            cell = { x: 0, y: 0 };
          }
        }
      }
      return [[reversed ? `n` : `s`, cell]];
    }
  };
  return visitor(logic, grid, start, opts);
};
var rows = function* (grid, start) {
  if (!start) start = { x: 0, y: 0 };
  let row = start.y;
  let rowCells = [];
  for (const c of cells(grid, start)) {
    if (c.y === row) {
      rowCells.push(c);
    } else {
      yield rowCells;
      rowCells = [c];
      row = c.y;
    }
  }
  if (rowCells.length > 0) yield rowCells;
};
var cells = function* (grid, start) {
  if (!start) start = { x: 0, y: 0 };
  guardGrid(grid, `grid`);
  guardCell(start, `start`, grid);
  let { x, y } = start;
  let canMove = true;
  do {
    yield { x, y };
    x++;
    if (x === grid.cols) {
      y++;
      x = 0;
    }
    if (y === grid.rows) {
      y = 0;
      x = 0;
    }
    if (x === start.x && y === start.y) canMove = false;
  } while (canMove);
};
var access1dArray = (array, cols) => {
  const grid = { cols, rows: Math.ceil(array.length / cols) };
  const fn = (cell, wrap3) => {
    const index = indexFromCell(grid, cell, wrap3);
    if (index === void 0) return void 0;
    return array[index];
  };
  return fn;
};
var array2dUpdater = (grid, array) => {
  const fn = (v, position) => {
    const pos = cellAtPoint(grid, position);
    if (pos === void 0) {
      throw new Error(
        `Position does not exist. Pos: ${JSON.stringify(
          position
        )} Grid: ${JSON.stringify(grid)}`
      );
    }
    array[pos.y][pos.x] = v;
  };
  return fn;
};
function* visitArray(array, cols, iteratorFunction, opts) {
  if (typeof array === `undefined`) {
    throw new TypeError(`First parameter is undefined, expected an array`);
  }
  if (array === null) throw new Error(`First parameter is null, expected an array`);
  if (!Array.isArray(array)) throw new Error(`First parameter should be an array`);
  throwIntegerTest(cols, `aboveZero`, `cols`);
  if (array.length === 0) return;
  const wrap3 = opts?.boundsWrap ?? `stop`;
  const rows2 = Math.ceil(array.length / cols);
  const grid = {
    cols,
    rows: rows2
  };
  if (iteratorFunction === void 0) iteratorFunction = cells;
  const iter = iteratorFunction(grid, { x: 0, y: 0 }, opts);
  for (const cell of iter) {
    const index = indexFromCell(grid, cell, wrap3);
    if (index === void 0) return void 0;
    yield [array[index], index];
  }
}
var indexFromCell = (grid, cell, wrap3) => {
  guardGrid(grid, `grid`);
  if (cell.x < 0) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, x: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = offset(grid, { x: 0, y: cell.y }, { x: cell.x, y: 0 }, `wrap`);
        break;
      }
    }
  }
  if (cell.y < 0) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, y: 0 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: grid.rows + cell.y };
        break;
      }
    }
  }
  if (cell.x >= grid.cols) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, x: grid.cols - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, x: cell.x % grid.cols };
        break;
      }
    }
  }
  if (cell.y >= grid.rows) {
    switch (wrap3) {
      case `stop`: {
        cell = { ...cell, y: grid.rows - 1 };
        break;
      }
      case `unbounded`: {
        throw new Error(`unbounded not supported`);
      }
      case `undefined`: {
        return void 0;
      }
      case `wrap`: {
        cell = { ...cell, y: cell.y % grid.rows };
        break;
      }
    }
  }
  const index = cell.y * grid.cols + cell.x;
  return index;
};
var cellFromIndex = (colsOrGrid, index) => {
  let cols = 0;
  cols = typeof colsOrGrid === `number` ? colsOrGrid : colsOrGrid.cols;
  throwIntegerTest(cols, `aboveZero`, `colsOrGrid`);
  return {
    x: index % cols,
    y: Math.floor(index / cols)
  };
};

// src/geometry/bezier/index.ts
var bezier_exports = {};
__export(bezier_exports, {
  computeQuadraticSimple: () => computeQuadraticSimple,
  cubic: () => cubic,
  isCubicBezier: () => isCubicBezier,
  isQuadraticBezier: () => isQuadraticBezier,
  quadratic: () => quadratic,
  quadraticBend: () => quadraticBend,
  quadraticSimple: () => quadraticSimple,
  quadraticToSvgString: () => quadraticToSvgString,
  toPath: () => toPath3
});

// node_modules/bezier-js/src/utils.js
var { abs: abs2, cos, sin, acos, atan2, sqrt, pow } = Math;
function crt(v) {
  return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi = Math.PI;
var tau = 2 * pi;
var quart = pi / 2;
var epsilon = 1e-6;
var nMax = Number.MAX_SAFE_INTEGER || 9007199254740991;
var nMin = Number.MIN_SAFE_INTEGER || -9007199254740991;
var ZERO = { x: 0, y: 0, z: 0 };
var utils = {
  // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(t2, derivativeFn) {
    const d = derivativeFn(t2);
    let l = d.x * d.x + d.y * d.y;
    if (typeof d.z !== "undefined") {
      l += d.z * d.z;
    }
    return sqrt(l);
  },
  compute: function(t2, points, _3d) {
    if (t2 === 0) {
      points[0].t = 0;
      return points[0];
    }
    const order = points.length - 1;
    if (t2 === 1) {
      points[order].t = 1;
      return points[order];
    }
    const mt = 1 - t2;
    let p = points;
    if (order === 0) {
      points[0].t = t2;
      return points[0];
    }
    if (order === 1) {
      const ret = {
        x: mt * p[0].x + t2 * p[1].x,
        y: mt * p[0].y + t2 * p[1].y,
        t: t2
      };
      if (_3d) {
        ret.z = mt * p[0].z + t2 * p[1].z;
      }
      return ret;
    }
    if (order < 4) {
      let mt2 = mt * mt, t22 = t2 * t2, a, b, c, d = 0;
      if (order === 2) {
        p = [p[0], p[1], p[2], ZERO];
        a = mt2;
        b = mt * t2 * 2;
        c = t22;
      } else if (order === 3) {
        a = mt2 * mt;
        b = mt2 * t2 * 3;
        c = mt * t22 * 3;
        d = t2 * t22;
      }
      const ret = {
        x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
        y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
        t: t2
      };
      if (_3d) {
        ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
      }
      return ret;
    }
    const dCpts = JSON.parse(JSON.stringify(points));
    while (dCpts.length > 1) {
      for (let i = 0; i < dCpts.length - 1; i++) {
        dCpts[i] = {
          x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t2,
          y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t2
        };
        if (typeof dCpts[i].z !== "undefined") {
          dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t2;
        }
      }
      dCpts.splice(dCpts.length - 1, 1);
    }
    dCpts[0].t = t2;
    return dCpts[0];
  },
  computeWithRatios: function(t2, points, ratios, _3d) {
    const mt = 1 - t2, r = ratios, p = points;
    let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
    f1 *= mt;
    f2 *= t2;
    if (p.length === 2) {
      d = f1 + f2;
      return {
        x: (f1 * p[0].x + f2 * p[1].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 2 * mt;
    f3 *= t2 * t2;
    if (p.length === 3) {
      d = f1 + f2 + f3;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
        t: t2
      };
    }
    f1 *= mt;
    f2 *= 1.5 * mt;
    f3 *= 3 * mt;
    f4 *= t2 * t2 * t2;
    if (p.length === 4) {
      d = f1 + f2 + f3 + f4;
      return {
        x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
        y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
        z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
        t: t2
      };
    }
  },
  derive: function(points, _3d) {
    const dpoints = [];
    for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
      const list = [];
      for (let j = 0, dpt; j < c; j++) {
        dpt = {
          x: c * (p[j + 1].x - p[j].x),
          y: c * (p[j + 1].y - p[j].y)
        };
        if (_3d) {
          dpt.z = c * (p[j + 1].z - p[j].z);
        }
        list.push(dpt);
      }
      dpoints.push(list);
      p = list;
    }
    return dpoints;
  },
  between: function(v, m, M) {
    return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
  },
  approximately: function(a, b, precision) {
    return abs2(a - b) <= (precision || epsilon);
  },
  length: function(derivativeFn) {
    const z = 0.5, len = utils.Tvalues.length;
    let sum5 = 0;
    for (let i = 0, t2; i < len; i++) {
      t2 = z * utils.Tvalues[i] + z;
      sum5 += utils.Cvalues[i] * utils.arcfn(t2, derivativeFn);
    }
    return z * sum5;
  },
  map: function(v, ds, de, ts, te) {
    const d1 = de - ds, d2 = te - ts, v2 = v - ds, r = v2 / d1;
    return ts + d2 * r;
  },
  lerp: function(r, v1, v2) {
    const ret = {
      x: v1.x + r * (v2.x - v1.x),
      y: v1.y + r * (v2.y - v1.y)
    };
    if (v1.z !== void 0 && v2.z !== void 0) {
      ret.z = v1.z + r * (v2.z - v1.z);
    }
    return ret;
  },
  pointToString: function(p) {
    let s = p.x + "/" + p.y;
    if (typeof p.z !== "undefined") {
      s += "/" + p.z;
    }
    return s;
  },
  pointsToString: function(points) {
    return "[" + points.map(utils.pointToString).join(", ") + "]";
  },
  copy: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  angle: function(o, v1, v2) {
    const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y, cross = dx1 * dy2 - dy1 * dx2, dot = dx1 * dx2 + dy1 * dy2;
    return atan2(cross, dot);
  },
  // round as string, to avoid rounding errors
  round: function(v, d) {
    const s = "" + v;
    const pos = s.indexOf(".");
    return parseFloat(s.substring(0, pos + 1 + d));
  },
  dist: function(p1, p2) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    return sqrt(dx * dx + dy * dy);
  },
  closest: function(LUT, point2) {
    let mdist = pow(2, 63), mpos, d;
    LUT.forEach(function(p, idx) {
      d = utils.dist(point2, p);
      if (d < mdist) {
        mdist = d;
        mpos = idx;
      }
    });
    return { mdist, mpos };
  },
  abcratio: function(t2, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const bottom = pow(t2, n) + pow(1 - t2, n), top = bottom - 1;
    return abs2(top / bottom);
  },
  projectionratio: function(t2, n) {
    if (n !== 2 && n !== 3) {
      return false;
    }
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    } else if (t2 === 0 || t2 === 1) {
      return t2;
    }
    const top = pow(1 - t2, n), bottom = pow(t2, n) + top;
    return top / bottom;
  },
  lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
    const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d == 0) {
      return false;
    }
    return { x: nx / d, y: ny / d };
  },
  lli4: function(p1, p2, p3, p4) {
    const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
    return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
  },
  lli: function(v1, v2) {
    return utils.lli4(v1, v1.c, v2, v2.c);
  },
  makeline: function(p1, p2) {
    return new Bezier(
      p1.x,
      p1.y,
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2,
      p2.x,
      p2.y
    );
  },
  findbbox: function(sections) {
    let mx = nMax, my = nMax, MX = nMin, MY = nMin;
    sections.forEach(function(s) {
      const bbox7 = s.bbox();
      if (mx > bbox7.x.min) mx = bbox7.x.min;
      if (my > bbox7.y.min) my = bbox7.y.min;
      if (MX < bbox7.x.max) MX = bbox7.x.max;
      if (MY < bbox7.y.max) MY = bbox7.y.max;
    });
    return {
      x: { min: mx, mid: (mx + MX) / 2, max: MX, size: MX - mx },
      y: { min: my, mid: (my + MY) / 2, max: MY, size: MY - my }
    };
  },
  shapeintersections: function(s1, bbox1, s2, bbox22, curveIntersectionThreshold) {
    if (!utils.bboxoverlap(bbox1, bbox22)) return [];
    const intersections2 = [];
    const a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
    const a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
    a1.forEach(function(l1) {
      if (l1.virtual) return;
      a2.forEach(function(l2) {
        if (l2.virtual) return;
        const iss = l1.intersects(l2, curveIntersectionThreshold);
        if (iss.length > 0) {
          iss.c1 = l1;
          iss.c2 = l2;
          iss.s1 = s1;
          iss.s2 = s2;
          intersections2.push(iss);
        }
      });
    });
    return intersections2;
  },
  makeshape: function(forward, back, curveIntersectionThreshold) {
    const bpl = back.points.length;
    const fpl = forward.points.length;
    const start = utils.makeline(back.points[bpl - 1], forward.points[0]);
    const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
    const shape = {
      startcap: start,
      forward,
      back,
      endcap: end,
      bbox: utils.findbbox([start, forward, back, end])
    };
    shape.intersections = function(s2) {
      return utils.shapeintersections(
        shape,
        shape.bbox,
        s2,
        s2.bbox,
        curveIntersectionThreshold
      );
    };
    return shape;
  },
  getminmax: function(curve, d, list) {
    if (!list) return { min: 0, max: 0 };
    let min2 = nMax, max2 = nMin, t2, c;
    if (list.indexOf(0) === -1) {
      list = [0].concat(list);
    }
    if (list.indexOf(1) === -1) {
      list.push(1);
    }
    for (let i = 0, len = list.length; i < len; i++) {
      t2 = list[i];
      c = curve.get(t2);
      if (c[d] < min2) {
        min2 = c[d];
      }
      if (c[d] > max2) {
        max2 = c[d];
      }
    }
    return { min: min2, mid: (min2 + max2) / 2, max: max2, size: max2 - min2 };
  },
  align: function(points, line) {
    const tx = line.p1.x, ty = line.p1.y, a = -atan2(line.p2.y - ty, line.p2.x - tx), d = function(v) {
      return {
        x: (v.x - tx) * cos(a) - (v.y - ty) * sin(a),
        y: (v.x - tx) * sin(a) + (v.y - ty) * cos(a)
      };
    };
    return points.map(d);
  },
  roots: function(points, line) {
    line = line || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const order = points.length - 1;
    const aligned = utils.align(points, line);
    const reduce2 = function(t2) {
      return 0 <= t2 && t2 <= 1;
    };
    if (order === 2) {
      const a2 = aligned[0].y, b2 = aligned[1].y, c2 = aligned[2].y, d2 = a2 - 2 * b2 + c2;
      if (d2 !== 0) {
        const m1 = -sqrt(b2 * b2 - a2 * c2), m2 = -a2 + b2, v12 = -(m1 + m2) / d2, v2 = -(-m1 + m2) / d2;
        return [v12, v2].filter(reduce2);
      } else if (b2 !== c2 && d2 === 0) {
        return [(2 * b2 - c2) / (2 * b2 - 2 * c2)].filter(reduce2);
      }
      return [];
    }
    const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
    let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
    if (utils.approximately(d, 0)) {
      if (utils.approximately(a, 0)) {
        if (utils.approximately(b, 0)) {
          return [];
        }
        return [-c / b].filter(reduce2);
      }
      const q3 = sqrt(b * b - 4 * a * c), a2 = 2 * a;
      return [(q3 - b) / a2, (-b - q3) / a2].filter(reduce2);
    }
    a /= d;
    b /= d;
    c /= d;
    const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
    let u1, v1, x1, x2, x3;
    if (discriminant < 0) {
      const mp3 = -p / 3, mp33 = mp3 * mp3 * mp3, r = sqrt(mp33), t2 = -q / (2 * r), cosphi = t2 < -1 ? -1 : t2 > 1 ? 1 : t2, phi = acos(cosphi), crtr = crt(r), t1 = 2 * crtr;
      x1 = t1 * cos(phi / 3) - a / 3;
      x2 = t1 * cos((phi + tau) / 3) - a / 3;
      x3 = t1 * cos((phi + 2 * tau) / 3) - a / 3;
      return [x1, x2, x3].filter(reduce2);
    } else if (discriminant === 0) {
      u1 = q2 < 0 ? crt(-q2) : -crt(q2);
      x1 = 2 * u1 - a / 3;
      x2 = -u1 - a / 3;
      return [x1, x2].filter(reduce2);
    } else {
      const sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      return [u1 - v1 - a / 3].filter(reduce2);
    }
  },
  droots: function(p) {
    if (p.length === 3) {
      const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
      if (d !== 0) {
        const m1 = -sqrt(b * b - a * c), m2 = -a + b, v1 = -(m1 + m2) / d, v2 = -(-m1 + m2) / d;
        return [v1, v2];
      } else if (b !== c && d === 0) {
        return [(2 * b - c) / (2 * (b - c))];
      }
      return [];
    }
    if (p.length === 2) {
      const a = p[0], b = p[1];
      if (a !== b) {
        return [a / (a - b)];
      }
      return [];
    }
    return [];
  },
  curvature: function(t2, d1, d2, _3d, kOnly) {
    let num, dnm, adk, dk, k = 0, r = 0;
    const d = utils.compute(t2, d1);
    const dd = utils.compute(t2, d2);
    const qdsum = d.x * d.x + d.y * d.y;
    if (_3d) {
      num = sqrt(
        pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2)
      );
      dnm = pow(qdsum + d.z * d.z, 3 / 2);
    } else {
      num = d.x * dd.y - d.y * dd.x;
      dnm = pow(qdsum, 3 / 2);
    }
    if (num === 0 || dnm === 0) {
      return { k: 0, r: 0 };
    }
    k = num / dnm;
    r = dnm / num;
    if (!kOnly) {
      const pk = utils.curvature(t2 - 1e-3, d1, d2, _3d, true).k;
      const nk = utils.curvature(t2 + 1e-3, d1, d2, _3d, true).k;
      dk = (nk - k + (k - pk)) / 2;
      adk = (abs2(nk - k) + abs2(k - pk)) / 2;
    }
    return { k, r, dk, adk };
  },
  inflections: function(points) {
    if (points.length < 4) return [];
    const p = utils.align(points, { p1: points[0], p2: points.slice(-1)[0] }), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
    if (utils.approximately(v1, 0)) {
      if (!utils.approximately(v2, 0)) {
        let t2 = -v3 / v2;
        if (0 <= t2 && t2 <= 1) return [t2];
      }
      return [];
    }
    const d2 = 2 * v1;
    if (utils.approximately(d2, 0)) return [];
    const trm = v2 * v2 - 4 * v1 * v3;
    if (trm < 0) return [];
    const sq = Math.sqrt(trm);
    return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
      return 0 <= r && r <= 1;
    });
  },
  bboxoverlap: function(b1, b2) {
    const dims = ["x", "y"], len = dims.length;
    for (let i = 0, dim, l, t2, d; i < len; i++) {
      dim = dims[i];
      l = b1[dim].mid;
      t2 = b2[dim].mid;
      d = (b1[dim].size + b2[dim].size) / 2;
      if (abs2(l - t2) >= d) return false;
    }
    return true;
  },
  expandbox: function(bbox7, _bbox) {
    if (_bbox.x.min < bbox7.x.min) {
      bbox7.x.min = _bbox.x.min;
    }
    if (_bbox.y.min < bbox7.y.min) {
      bbox7.y.min = _bbox.y.min;
    }
    if (_bbox.z && _bbox.z.min < bbox7.z.min) {
      bbox7.z.min = _bbox.z.min;
    }
    if (_bbox.x.max > bbox7.x.max) {
      bbox7.x.max = _bbox.x.max;
    }
    if (_bbox.y.max > bbox7.y.max) {
      bbox7.y.max = _bbox.y.max;
    }
    if (_bbox.z && _bbox.z.max > bbox7.z.max) {
      bbox7.z.max = _bbox.z.max;
    }
    bbox7.x.mid = (bbox7.x.min + bbox7.x.max) / 2;
    bbox7.y.mid = (bbox7.y.min + bbox7.y.max) / 2;
    if (bbox7.z) {
      bbox7.z.mid = (bbox7.z.min + bbox7.z.max) / 2;
    }
    bbox7.x.size = bbox7.x.max - bbox7.x.min;
    bbox7.y.size = bbox7.y.max - bbox7.y.min;
    if (bbox7.z) {
      bbox7.z.size = bbox7.z.max - bbox7.z.min;
    }
  },
  pairiteration: function(c1, c2, curveIntersectionThreshold) {
    const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || 0.5;
    if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
      return [
        (r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r
      ];
    }
    let cc1 = c1.split(0.5), cc2 = c2.split(0.5), pairs = [
      { left: cc1.left, right: cc2.left },
      { left: cc1.left, right: cc2.right },
      { left: cc1.right, right: cc2.right },
      { left: cc1.right, right: cc2.left }
    ];
    pairs = pairs.filter(function(pair) {
      return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
    });
    let results = [];
    if (pairs.length === 0) return results;
    pairs.forEach(function(pair) {
      results = results.concat(
        utils.pairiteration(pair.left, pair.right, threshold)
      );
    });
    results = results.filter(function(v, i) {
      return results.indexOf(v) === i;
    });
    return results;
  },
  getccenter: function(p1, p2, p3) {
    const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos(quart) - dy1 * sin(quart), dy1p = dx1 * sin(quart) + dy1 * cos(quart), dx2p = dx2 * cos(quart) - dy2 * sin(quart), dy2p = dx2 * sin(quart) + dy2 * cos(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
    let s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
    if (s < e) {
      if (s > m || m > e) {
        s += tau;
      }
      if (s > e) {
        _ = e;
        e = s;
        s = _;
      }
    } else {
      if (e < m && m < s) {
        _ = e;
        e = s;
        s = _;
      } else {
        e += tau;
      }
    }
    arc.s = s;
    arc.e = e;
    arc.r = r;
    return arc;
  },
  numberSort: function(a, b) {
    return a - b;
  }
};

// node_modules/bezier-js/src/poly-bezier.js
var PolyBezier = class _PolyBezier {
  constructor(curves) {
    this.curves = [];
    this._3d = false;
    if (!!curves) {
      this.curves = curves;
      this._3d = this.curves[0]._3d;
    }
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(curve) {
      return utils.pointsToString(curve.points);
    }).join(", ") + "]";
  }
  addCurve(curve) {
    this.curves.push(curve);
    this._3d = this._3d || curve._3d;
  }
  length() {
    return this.curves.map(function(v) {
      return v.length();
    }).reduce(function(a, b) {
      return a + b;
    });
  }
  curve(idx) {
    return this.curves[idx];
  }
  bbox() {
    const c = this.curves;
    var bbox7 = c[0].bbox();
    for (var i = 1; i < c.length; i++) {
      utils.expandbox(bbox7, c[i].bbox());
    }
    return bbox7;
  }
  offset(d) {
    const offset2 = [];
    this.curves.forEach(function(v) {
      offset2.push(...v.offset(d));
    });
    return new _PolyBezier(offset2);
  }
};

// node_modules/bezier-js/src/bezier.js
var { abs: abs3, min: min$2, max: max$1, cos: cos2, sin: sin2, acos: acos2, sqrt: sqrt2 } = Math;
var pi2 = Math.PI;
var Bezier = class _Bezier {
  constructor(coords) {
    let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
    let coordlen = false;
    if (typeof args[0] === "object") {
      coordlen = args.length;
      const newargs = [];
      args.forEach(function(point3) {
        ["x", "y", "z"].forEach(function(d) {
          if (typeof point3[d] !== "undefined") {
            newargs.push(point3[d]);
          }
        });
      });
      args = newargs;
    }
    let higher = false;
    const len = args.length;
    if (coordlen) {
      if (coordlen > 4) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
        higher = true;
      }
    } else {
      if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
        if (arguments.length !== 1) {
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        }
      }
    }
    const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
    const points = this.points = [];
    for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
      var point2 = {
        x: args[idx],
        y: args[idx + 1]
      };
      if (_3d) {
        point2.z = args[idx + 2];
      }
      points.push(point2);
    }
    const order = this.order = points.length - 1;
    const dims = this.dims = ["x", "y"];
    if (_3d) dims.push("z");
    this.dimlen = dims.length;
    const aligned = utils.align(points, { p1: points[0], p2: points[order] });
    const baselength = utils.dist(points[0], points[order]);
    this._linear = aligned.reduce((t2, p) => t2 + abs3(p.y), 0) < baselength / 50;
    this._lut = [];
    this._t1 = 0;
    this._t2 = 1;
    this.update();
  }
  static quadraticFromPoints(p1, p2, p3, t2) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    if (t2 === 0) {
      return new _Bezier(p2, p2, p3);
    }
    if (t2 === 1) {
      return new _Bezier(p1, p2, p2);
    }
    const abc = _Bezier.getABC(2, p1, p2, p3, t2);
    return new _Bezier(p1, abc.A, p3);
  }
  static cubicFromPoints(S, B, E, t2, d1) {
    if (typeof t2 === "undefined") {
      t2 = 0.5;
    }
    const abc = _Bezier.getABC(3, S, B, E, t2);
    if (typeof d1 === "undefined") {
      d1 = utils.dist(B, abc.C);
    }
    const d2 = d1 * (1 - t2) / t2;
    const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
    const e1 = { x: B.x - bx1, y: B.y - by1 }, e2 = { x: B.x + bx2, y: B.y + by2 }, A = abc.A, v1 = { x: A.x + (e1.x - A.x) / (1 - t2), y: A.y + (e1.y - A.y) / (1 - t2) }, v2 = { x: A.x + (e2.x - A.x) / t2, y: A.y + (e2.y - A.y) / t2 }, nc1 = { x: S.x + (v1.x - S.x) / t2, y: S.y + (v1.y - S.y) / t2 }, nc2 = {
      x: E.x + (v2.x - E.x) / (1 - t2),
      y: E.y + (v2.y - E.y) / (1 - t2)
    };
    return new _Bezier(S, nc1, nc2, E);
  }
  static getUtils() {
    return utils;
  }
  getUtils() {
    return _Bezier.getUtils();
  }
  static get PolyBezier() {
    return PolyBezier;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return utils.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d) return false;
    const p = this.points, x = p[0].x, y = p[0].y, s = ["M", x, y, this.order === 2 ? "Q" : "C"];
    for (let i = 1, last = p.length; i < last; i++) {
      s.push(p[i].x);
      s.push(p[i].y);
    }
    return s.join(" ");
  }
  setRatios(ratios) {
    if (ratios.length !== this.points.length) {
      throw new Error("incorrect number of ratio values");
    }
    this.ratios = ratios;
    this._lut = [];
  }
  verify() {
    const print = this.coordDigest();
    if (print !== this._print) {
      this._print = print;
      this.update();
    }
  }
  coordDigest() {
    return this.points.map(function(c, pos) {
      return "" + pos + c.x + c.y + (c.z ? c.z : 0);
    }).join("");
  }
  update() {
    this._lut = [];
    this.dpoints = utils.derive(this.points, this._3d);
    this.computedirection();
  }
  computedirection() {
    const points = this.points;
    const angle2 = utils.angle(points[0], points[this.order], points[1]);
    this.clockwise = angle2 > 0;
  }
  length() {
    return utils.length(this.derivative.bind(this));
  }
  static getABC(order = 2, S, B, E, t2 = 0.5) {
    const u = utils.projectionratio(t2, order), um = 1 - u, C = {
      x: u * S.x + um * E.x,
      y: u * S.y + um * E.y
    }, s = utils.abcratio(t2, order), A = {
      x: B.x + (B.x - C.x) / s,
      y: B.y + (B.y - C.y) / s
    };
    return { A, B, C, S, E };
  }
  getABC(t2, B) {
    B = B || this.get(t2);
    let S = this.points[0];
    let E = this.points[this.order];
    return _Bezier.getABC(this.order, S, B, E, t2);
  }
  getLUT(steps) {
    this.verify();
    steps = steps || 100;
    if (this._lut.length === steps + 1) {
      return this._lut;
    }
    this._lut = [];
    steps++;
    this._lut = [];
    for (let i = 0, p, t2; i < steps; i++) {
      t2 = i / (steps - 1);
      p = this.compute(t2);
      p.t = t2;
      this._lut.push(p);
    }
    return this._lut;
  }
  on(point2, error) {
    error = error || 5;
    const lut = this.getLUT(), hits = [];
    for (let i = 0, c, t2 = 0; i < lut.length; i++) {
      c = lut[i];
      if (utils.dist(c, point2) < error) {
        hits.push(c);
        t2 += i / lut.length;
      }
    }
    if (!hits.length) return false;
    return t /= hits.length;
  }
  project(point2) {
    const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point2), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = 0.1 / l;
    let mdist = closest.mdist, t3 = t1, ft = t3, p;
    mdist += 1;
    for (let d; t3 < t2 + step; t3 += step) {
      p = this.compute(t3);
      d = utils.dist(point2, p);
      if (d < mdist) {
        mdist = d;
        ft = t3;
      }
    }
    ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
    p = this.compute(ft);
    p.t = ft;
    p.d = mdist;
    return p;
  }
  get(t2) {
    return this.compute(t2);
  }
  point(idx) {
    return this.points[idx];
  }
  compute(t2) {
    if (this.ratios) {
      return utils.computeWithRatios(t2, this.points, this.ratios, this._3d);
    }
    return utils.compute(t2, this.points, this._3d, this.ratios);
  }
  raise() {
    const p = this.points, np = [p[0]], k = p.length;
    for (let i = 1, pi5, pim; i < k; i++) {
      pi5 = p[i];
      pim = p[i - 1];
      np[i] = {
        x: (k - i) / k * pi5.x + i / k * pim.x,
        y: (k - i) / k * pi5.y + i / k * pim.y
      };
    }
    np[k] = p[k - 1];
    return new _Bezier(np);
  }
  derivative(t2) {
    return utils.compute(t2, this.dpoints[0], this._3d);
  }
  dderivative(t2) {
    return utils.compute(t2, this.dpoints[1], this._3d);
  }
  align() {
    let p = this.points;
    return new _Bezier(utils.align(p, { p1: p[0], p2: p[p.length - 1] }));
  }
  curvature(t2) {
    return utils.curvature(t2, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return utils.inflections(this.points);
  }
  normal(t2) {
    return this._3d ? this.__normal3(t2) : this.__normal2(t2);
  }
  __normal2(t2) {
    const d = this.derivative(t2);
    const q = sqrt2(d.x * d.x + d.y * d.y);
    return { t: t2, x: -d.y / q, y: d.x / q };
  }
  __normal3(t2) {
    const r1 = this.derivative(t2), r2 = this.derivative(t2 + 0.01), q1 = sqrt2(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt2(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
    r1.x /= q1;
    r1.y /= q1;
    r1.z /= q1;
    r2.x /= q2;
    r2.y /= q2;
    r2.z /= q2;
    const c = {
      x: r2.y * r1.z - r2.z * r1.y,
      y: r2.z * r1.x - r2.x * r1.z,
      z: r2.x * r1.y - r2.y * r1.x
    };
    const m = sqrt2(c.x * c.x + c.y * c.y + c.z * c.z);
    c.x /= m;
    c.y /= m;
    c.z /= m;
    const R = [
      c.x * c.x,
      c.x * c.y - c.z,
      c.x * c.z + c.y,
      c.x * c.y + c.z,
      c.y * c.y,
      c.y * c.z - c.x,
      c.x * c.z - c.y,
      c.y * c.z + c.x,
      c.z * c.z
    ];
    const n = {
      t: t2,
      x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
      y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
      z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
    };
    return n;
  }
  hull(t2) {
    let p = this.points, _p = [], q = [], idx = 0;
    q[idx++] = p[0];
    q[idx++] = p[1];
    q[idx++] = p[2];
    if (this.order === 3) {
      q[idx++] = p[3];
    }
    while (p.length > 1) {
      _p = [];
      for (let i = 0, pt, l = p.length - 1; i < l; i++) {
        pt = utils.lerp(t2, p[i], p[i + 1]);
        q[idx++] = pt;
        _p.push(pt);
      }
      p = _p;
    }
    return q;
  }
  split(t1, t2) {
    if (t1 === 0 && !!t2) {
      return this.split(t2).left;
    }
    if (t2 === 1) {
      return this.split(t1).right;
    }
    const q = this.hull(t1);
    const result = {
      left: this.order === 2 ? new _Bezier([q[0], q[3], q[5]]) : new _Bezier([q[0], q[4], q[7], q[9]]),
      right: this.order === 2 ? new _Bezier([q[5], q[4], q[2]]) : new _Bezier([q[9], q[8], q[6], q[3]]),
      span: q
    };
    result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
    result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
    result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
    if (!t2) {
      return result;
    }
    t2 = utils.map(t2, t1, 1, 0, 1);
    return result.right.split(t2).left;
  }
  extrema() {
    const result = {};
    let roots = [];
    this.dims.forEach(
      function(dim) {
        let mfn = function(v) {
          return v[dim];
        };
        let p = this.dpoints[0].map(mfn);
        result[dim] = utils.droots(p);
        if (this.order === 3) {
          p = this.dpoints[1].map(mfn);
          result[dim] = result[dim].concat(utils.droots(p));
        }
        result[dim] = result[dim].filter(function(t2) {
          return t2 >= 0 && t2 <= 1;
        });
        roots = roots.concat(result[dim].sort(utils.numberSort));
      }.bind(this)
    );
    result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
      return roots.indexOf(v) === idx;
    });
    return result;
  }
  bbox() {
    const extrema = this.extrema(), result = {};
    this.dims.forEach(
      function(d) {
        result[d] = utils.getminmax(this, d, extrema[d]);
      }.bind(this)
    );
    return result;
  }
  overlaps(curve) {
    const lbbox = this.bbox(), tbbox = curve.bbox();
    return utils.bboxoverlap(lbbox, tbbox);
  }
  offset(t2, d) {
    if (typeof d !== "undefined") {
      const c = this.get(t2), n = this.normal(t2);
      const ret = {
        c,
        n,
        x: c.x + n.x * d,
        y: c.y + n.y * d
      };
      if (this._3d) {
        ret.z = c.z + n.z * d;
      }
      return ret;
    }
    if (this._linear) {
      const nv = this.normal(0), coords = this.points.map(function(p) {
        const ret = {
          x: p.x + t2 * nv.x,
          y: p.y + t2 * nv.y
        };
        if (p.z && nv.z) {
          ret.z = p.z + t2 * nv.z;
        }
        return ret;
      });
      return [new _Bezier(coords)];
    }
    return this.reduce().map(function(s) {
      if (s._linear) {
        return s.offset(t2)[0];
      }
      return s.scale(t2);
    });
  }
  simple() {
    if (this.order === 3) {
      const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
      const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
      if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
    }
    const n1 = this.normal(0);
    const n2 = this.normal(1);
    let s = n1.x * n2.x + n1.y * n2.y;
    if (this._3d) {
      s += n1.z * n2.z;
    }
    return abs3(acos2(s)) < pi2 / 3;
  }
  reduce() {
    let i, t1 = 0, t2 = 0, step = 0.01, segment, pass1 = [], pass2 = [];
    let extrema = this.extrema().values;
    if (extrema.indexOf(0) === -1) {
      extrema = [0].concat(extrema);
    }
    if (extrema.indexOf(1) === -1) {
      extrema.push(1);
    }
    for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
      t2 = extrema[i];
      segment = this.split(t1, t2);
      segment._t1 = t1;
      segment._t2 = t2;
      pass1.push(segment);
      t1 = t2;
    }
    pass1.forEach(function(p1) {
      t1 = 0;
      t2 = 0;
      while (t2 <= 1) {
        for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
          segment = p1.split(t1, t2);
          if (!segment.simple()) {
            t2 -= step;
            if (abs3(t1 - t2) < step) {
              return [];
            }
            segment = p1.split(t1, t2);
            segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
            segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
            pass2.push(segment);
            t1 = t2;
            break;
          }
        }
      }
      if (t1 < 1) {
        segment = p1.split(t1, 1);
        segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
        segment._t2 = p1._t2;
        pass2.push(segment);
      }
    });
    return pass2;
  }
  translate(v, d1, d2) {
    d2 = typeof d2 === "number" ? d2 : d1;
    const o = this.order;
    let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
    return new _Bezier(
      this.points.map((p, i) => ({
        x: p.x + v.x * d[i],
        y: p.y + v.y * d[i]
      }))
    );
  }
  scale(d) {
    const order = this.order;
    let distanceFn = false;
    if (typeof d === "function") {
      distanceFn = d;
    }
    if (distanceFn && order === 2) {
      return this.raise().scale(distanceFn);
    }
    const clockwise = this.clockwise;
    const points = this.points;
    if (this._linear) {
      return this.translate(
        this.normal(0),
        distanceFn ? distanceFn(0) : d,
        distanceFn ? distanceFn(1) : d
      );
    }
    const r1 = distanceFn ? distanceFn(0) : d;
    const r2 = distanceFn ? distanceFn(1) : d;
    const v = [this.offset(0, 10), this.offset(1, 10)];
    const np = [];
    const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
    if (!o) {
      throw new Error("cannot scale this curve. Try reducing it first.");
    }
    [0, 1].forEach(function(t2) {
      const p = np[t2 * order] = utils.copy(points[t2 * order]);
      p.x += (t2 ? r2 : r1) * v[t2].n.x;
      p.y += (t2 ? r2 : r1) * v[t2].n.y;
    });
    if (!distanceFn) {
      [0, 1].forEach((t2) => {
        if (order === 2 && !!t2) return;
        const p = np[t2 * order];
        const d2 = this.derivative(t2);
        const p2 = { x: p.x + d2.x, y: p.y + d2.y };
        np[t2 + 1] = utils.lli4(p, p2, o, points[t2 + 1]);
      });
      return new _Bezier(np);
    }
    [0, 1].forEach(function(t2) {
      if (order === 2 && !!t2) return;
      var p = points[t2 + 1];
      var ov = {
        x: p.x - o.x,
        y: p.y - o.y
      };
      var rc = distanceFn ? distanceFn((t2 + 1) / order) : d;
      if (distanceFn && !clockwise) rc = -rc;
      var m = sqrt2(ov.x * ov.x + ov.y * ov.y);
      ov.x /= m;
      ov.y /= m;
      np[t2 + 1] = {
        x: p.x + rc * ov.x,
        y: p.y + rc * ov.y
      };
    });
    return new _Bezier(np);
  }
  outline(d1, d2, d3, d4) {
    d2 = d2 === void 0 ? d1 : d2;
    if (this._linear) {
      const n = this.normal(0);
      const start = this.points[0];
      const end = this.points[this.points.length - 1];
      let s, mid, e;
      if (d3 === void 0) {
        d3 = d1;
        d4 = d2;
      }
      s = { x: start.x + n.x * d1, y: start.y + n.y * d1 };
      e = { x: end.x + n.x * d3, y: end.y + n.y * d3 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const fline = [s, mid, e];
      s = { x: start.x - n.x * d2, y: start.y - n.y * d2 };
      e = { x: end.x - n.x * d4, y: end.y - n.y * d4 };
      mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };
      const bline = [e, mid, s];
      const ls2 = utils.makeline(bline[2], fline[0]);
      const le2 = utils.makeline(fline[2], bline[0]);
      const segments2 = [ls2, new _Bezier(fline), le2, new _Bezier(bline)];
      return new PolyBezier(segments2);
    }
    const reduced = this.reduce(), len = reduced.length, fcurves = [];
    let bcurves = [], p, alen = 0, tlen = this.length();
    const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
    function linearDistanceFunction(s, e, tlen2, alen2, slen) {
      return function(v) {
        const f1 = alen2 / tlen2, f2 = (alen2 + slen) / tlen2, d = e - s;
        return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
      };
    }
    reduced.forEach(function(segment) {
      const slen = segment.length();
      if (graduated) {
        fcurves.push(
          segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen))
        );
        bcurves.push(
          segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen))
        );
      } else {
        fcurves.push(segment.scale(d1));
        bcurves.push(segment.scale(-d2));
      }
      alen += slen;
    });
    bcurves = bcurves.map(function(s) {
      p = s.points;
      if (p[3]) {
        s.points = [p[3], p[2], p[1], p[0]];
      } else {
        s.points = [p[2], p[1], p[0]];
      }
      return s;
    }).reverse();
    const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be), segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
    return new PolyBezier(segments);
  }
  outlineshapes(d1, d2, curveIntersectionThreshold) {
    d2 = d2 || d1;
    const outline = this.outline(d1, d2).curves;
    const shapes = [];
    for (let i = 1, len = outline.length; i < len / 2; i++) {
      const shape = utils.makeshape(
        outline[i],
        outline[len - i],
        curveIntersectionThreshold
      );
      shape.startcap.virtual = i > 1;
      shape.endcap.virtual = i < len / 2 - 1;
      shapes.push(shape);
    }
    return shapes;
  }
  intersects(curve, curveIntersectionThreshold) {
    if (!curve) return this.selfintersects(curveIntersectionThreshold);
    if (curve.p1 && curve.p2) {
      return this.lineIntersects(curve);
    }
    if (curve instanceof _Bezier) {
      curve = curve.reduce();
    }
    return this.curveintersects(
      this.reduce(),
      curve,
      curveIntersectionThreshold
    );
  }
  lineIntersects(line) {
    const mx = min$2(line.p1.x, line.p2.x), my = min$2(line.p1.y, line.p2.y), MX = max$1(line.p1.x, line.p2.x), MY = max$1(line.p1.y, line.p2.y);
    return utils.roots(this.points, line).filter((t2) => {
      var p = this.get(t2);
      return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
    });
  }
  selfintersects(curveIntersectionThreshold) {
    const reduced = this.reduce(), len = reduced.length - 2, results = [];
    for (let i = 0, result, left, right; i < len; i++) {
      left = reduced.slice(i, i + 1);
      right = reduced.slice(i + 2);
      result = this.curveintersects(left, right, curveIntersectionThreshold);
      results.push(...result);
    }
    return results;
  }
  curveintersects(c1, c2, curveIntersectionThreshold) {
    const pairs = [];
    c1.forEach(function(l) {
      c2.forEach(function(r) {
        if (l.overlaps(r)) {
          pairs.push({ left: l, right: r });
        }
      });
    });
    let intersections2 = [];
    pairs.forEach(function(pair) {
      const result = utils.pairiteration(
        pair.left,
        pair.right,
        curveIntersectionThreshold
      );
      if (result.length > 0) {
        intersections2 = intersections2.concat(result);
      }
    });
    return intersections2;
  }
  arcs(errorThreshold) {
    errorThreshold = errorThreshold || 0.5;
    return this._iterate(errorThreshold, []);
  }
  _error(pc, np1, s, e) {
    const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
    return abs3(d1 - ref) + abs3(d2 - ref);
  }
  _iterate(errorThreshold, circles) {
    let t_s = 0, t_e = 1, safety;
    do {
      safety = 0;
      t_e = 1;
      let np1 = this.get(t_s), np2, np3, arc, prev_arc;
      let curr_good = false, prev_good = false, done;
      let t_m = t_e, prev_e = 1;
      do {
        prev_good = curr_good;
        prev_arc = arc;
        t_m = (t_s + t_e) / 2;
        np2 = this.get(t_m);
        np3 = this.get(t_e);
        arc = utils.getccenter(np1, np2, np3);
        arc.interval = {
          start: t_s,
          end: t_e
        };
        let error = this._error(arc, np1, t_s, t_e);
        curr_good = error <= errorThreshold;
        done = prev_good && !curr_good;
        if (!done) prev_e = t_e;
        if (curr_good) {
          if (t_e >= 1) {
            arc.interval.end = prev_e = 1;
            prev_arc = arc;
            if (t_e > 1) {
              let d = {
                x: arc.x + arc.r * cos2(arc.e),
                y: arc.y + arc.r * sin2(arc.e)
              };
              arc.e += utils.angle({ x: arc.x, y: arc.y }, d, this.get(1));
            }
            break;
          }
          t_e = t_e + (t_e - t_s) / 2;
        } else {
          t_e = t_m;
        }
      } while (!done && safety++ < 100);
      if (safety >= 100) {
        break;
      }
      prev_arc = prev_arc ? prev_arc : arc;
      circles.push(prev_arc);
      t_s = prev_e;
    } while (t_e < 1);
    return circles;
  }
};

// src/geometry/bezier/index.ts
var quadraticBend = (a, b, bend = 0) => quadraticSimple(a, b, bend);
var quadraticSimple = (start, end, bend = 0) => {
  if (Number.isNaN(bend)) throw new Error(`bend is NaN`);
  if (bend < -1 || bend > 1) throw new Error(`Expects bend range of -1 to 1`);
  const middle = interpolate(0.5, start, end);
  let target = middle;
  if (end.y < start.y) {
    target = bend > 0 ? { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  } else {
    target = bend > 0 ? { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y) } : { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y) };
  }
  const handle = interpolate(Math.abs(bend), middle, target);
  return quadratic(start, end, handle);
};
var computeQuadraticSimple = (start, end, bend, amt) => {
  const q = quadraticSimple(start, end, bend);
  const bzr = new Bezier(q.a, q.quadratic, q.b);
  return bzr.compute(amt);
};
var quadraticToSvgString = (start, end, handle) => [`M ${start.x} ${start.y} Q ${handle.x} ${handle.y} ${end.x} ${end.y}`];
var toPath3 = (cubicOrQuadratic) => {
  if (isCubicBezier(cubicOrQuadratic)) {
    return cubicToPath(cubicOrQuadratic);
  } else if (isQuadraticBezier(cubicOrQuadratic)) {
    return quadratictoPath(cubicOrQuadratic);
  } else {
    throw new Error(`Unknown bezier type`);
  }
};
var cubic = (start, end, cubic1, cubic2) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  cubic1: Object.freeze(cubic1),
  cubic2: Object.freeze(cubic2)
});
var cubicToPath = (cubic2) => {
  const { a, cubic1, cubic2: cubic22, b } = cubic2;
  const bzr = new Bezier(a, cubic1, cubic22, b);
  return Object.freeze({
    ...cubic2,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    toSvgString: () => [`brrup`],
    kind: `bezier/cubic`
  });
};
var quadratic = (start, end, handle) => ({
  a: Object.freeze(start),
  b: Object.freeze(end),
  quadratic: Object.freeze(handle)
});
var quadratictoPath = (quadraticBezier) => {
  const { a, b, quadratic: quadratic2 } = quadraticBezier;
  const bzr = new Bezier(a, quadratic2, b);
  return Object.freeze({
    ...quadraticBezier,
    length: () => bzr.length(),
    interpolate: (t2) => bzr.compute(t2),
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    bbox: () => {
      const { x, y } = bzr.bbox();
      const xSize = x.size;
      const ySize = y.size;
      if (xSize === void 0) throw new Error(`x.size not present on calculated bbox`);
      if (ySize === void 0) throw new Error(`x.size not present on calculated bbox`);
      return fromTopLeft({ x: x.min, y: y.min }, xSize, ySize);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    toString: () => bzr.toString(),
    toSvgString: () => quadraticToSvgString(a, b, quadratic2),
    kind: `bezier/quadratic`
  });
};

// src/geometry/path/CompoundPath.ts
var CompoundPath_exports = {};
__export(CompoundPath_exports, {
  bbox: () => bbox4,
  computeDimensions: () => computeDimensions,
  distanceToPoint: () => distanceToPoint,
  fromPaths: () => fromPaths,
  guardContinuous: () => guardContinuous,
  interpolate: () => interpolate4,
  relativePosition: () => relativePosition2,
  setSegment: () => setSegment,
  toString: () => toString4,
  toSvgString: () => toSvgString2
});
var setSegment = (compoundPath, index, path) => {
  const existing = [...compoundPath.segments];
  existing[index] = path;
  return fromPaths(...existing);
};
var interpolate4 = (paths, t2, useWidth, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  const expected = t2 * (useWidth ? dimensions.totalWidth : dimensions.totalLength);
  let soFar = 0;
  const l = useWidth ? dimensions.widths : dimensions.lengths;
  for (const [index, element] of l.entries()) {
    if (soFar + element >= expected) {
      const relative = expected - soFar;
      let amt = relative / element;
      if (amt > 1) amt = 1;
      return paths[index].interpolate(amt);
    } else soFar += element;
  }
  return { x: 0, y: 0 };
};
var distanceToPoint = (paths, point2) => {
  if (paths.length === 0) return 0;
  let distances = paths.map((p, index) => ({ path: p, index, distance: p.distanceToPoint(point2) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length === 0) throw new Error(`Could not look up distances`);
  return distances[0].distance;
};
var relativePosition2 = (paths, point2, intersectionThreshold, dimensions) => {
  if (dimensions === void 0) {
    dimensions = computeDimensions(paths);
  }
  let distances = paths.map((p, index) => ({ path: p, index, distance: p.distanceToPoint(point2) }));
  distances = sortByNumericProperty(distances, `distance`);
  if (distances.length < 0) throw new Error(`Point does not intersect with path`);
  const d = distances[0];
  if (d.distance > intersectionThreshold) throw new Error(`Point does not intersect with path. Minimum distance: ${d.distance}, threshold: ${intersectionThreshold}`);
  const relativePositionOnPath = d.path.relativePosition(point2, intersectionThreshold);
  let accumulated = 0;
  for (let index = 0; index < d.index; index++) {
    accumulated += dimensions.lengths[index];
  }
  accumulated += dimensions.lengths[d.index] * relativePositionOnPath;
  const accumulatedRel = accumulated / dimensions.totalLength;
  console.log(`acc: ${accumulated} rel: ${accumulatedRel} on path: ${relativePositionOnPath} path: ${d.index}`);
  return accumulatedRel;
};
var computeDimensions = (paths) => {
  const widths = paths.map((l) => l.bbox().width);
  const lengths3 = paths.map((l) => l.length());
  let totalLength = 0;
  let totalWidth = 0;
  for (const length5 of lengths3) {
    totalLength += length5;
  }
  for (const width of widths) {
    totalWidth += width;
  }
  return { totalLength, totalWidth, widths, lengths: lengths3 };
};
var bbox4 = (paths) => {
  const boxes = paths.map((p) => p.bbox());
  const corners3 = boxes.flatMap((b) => corners(b));
  return bbox(...corners3);
};
var toString4 = (paths) => paths.map((p) => p.toString()).join(`, `);
var guardContinuous = (paths) => {
  let lastPos = getEnd(paths[0]);
  for (let index = 1; index < paths.length; index++) {
    const start = getStart(paths[index]);
    if (!isEqual$1(start, lastPos)) throw new Error(`Path index ${index} does not start at prior path end. Start: ${start.x},${start.y} expected: ${lastPos.x},${lastPos.y}`);
    lastPos = getEnd(paths[index]);
  }
};
var toSvgString2 = (paths) => paths.flatMap((p) => p.toSvgString());
var fromPaths = (...paths) => {
  guardContinuous(paths);
  const dims = computeDimensions(paths);
  return Object.freeze({
    segments: paths,
    length: () => dims.totalLength,
    nearest: (_) => {
      throw new Error(`not implemented`);
    },
    interpolate: (t2, useWidth = false) => interpolate4(paths, t2, useWidth, dims),
    relativePosition: (point2, intersectionThreshold) => relativePosition2(paths, point2, intersectionThreshold, dims),
    distanceToPoint: (point2) => distanceToPoint(paths, point2),
    bbox: () => bbox4(paths),
    toString: () => toString4(paths),
    toSvgString: () => toSvgString2(paths),
    kind: `compound`
  });
};

// src/geometry/Ellipse.ts
var Ellipse_exports = {};
__export(Ellipse_exports, {
  fromDegrees: () => fromDegrees
});
var fromDegrees = (radiusX, radiusY, rotationDeg = 0, startAngleDeg = 0, endAngleDeg = 360) => ({
  radiusX,
  radiusY,
  rotation: degreeToRadian(rotationDeg),
  startAngle: degreeToRadian(startAngleDeg),
  endAngle: degreeToRadian(endAngleDeg)
});

// src/geometry/CurveSimplification.ts
var CurveSimplification_exports = {};
__export(CurveSimplification_exports, {
  rdpPerpendicularDistance: () => rdpPerpendicularDistance,
  rdpShortestDistance: () => rdpShortestDistance
});
var rdpShortestDistance = (points, epsilon2 = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) {
    return points;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = distanceFromPointToLine(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpShortestDistance(l1, epsilon2);
    const r2 = rdpShortestDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
var rdpPerpendicularDistance = (points, epsilon2 = 0.1) => {
  const firstPoint = points[0];
  const lastPoint = points.at(-1);
  if (points.length < 3) {
    return points;
  }
  let index = -1;
  let distribution = 0;
  for (let index_ = 1; index_ < points.length - 1; index_++) {
    const cDistribution = findPerpendicularDistance(points[index_], firstPoint, lastPoint);
    if (cDistribution > distribution) {
      distribution = cDistribution;
      index = index_;
    }
  }
  if (distribution > epsilon2) {
    const l1 = points.slice(0, index + 1);
    const l2 = points.slice(index);
    const r1 = rdpPerpendicularDistance(l1, epsilon2);
    const r2 = rdpPerpendicularDistance(l2, epsilon2);
    const rs = [...r1.slice(0, -1), ...r2];
    return rs;
  } else {
    return [firstPoint, lastPoint];
  }
};
function findPerpendicularDistance(p, p1, p2) {
  let result;
  let slope2;
  let intercept;
  if (p1.x == p2.x) {
    result = Math.abs(p.x - p1.x);
  } else {
    slope2 = (p2.y - p1.y) / (p2.x - p1.x);
    intercept = p1.y - slope2 * p1.x;
    result = Math.abs(slope2 * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope2, 2) + 1);
  }
  return result;
}
var distanceFromPointToLine = (p, index, index_) => {
  const lineLength = distance(index, index_);
  if (lineLength == 0) {
    return distance(p, index);
  }
  const t2 = ((p.x - index.x) * (index_.x - index.x) + (p.y - index.y) * (index_.y - index.y)) / lineLength;
  if (t2 < 0) {
    return distance(p, index);
  }
  if (t2 > 1) {
    return distance(p, index_);
  }
  return distance(p, { x: index.x + t2 * (index_.x - index.x), y: index.y + t2 * (index_.y - index.y) });
};

// src/geometry/QuadTree.ts
var QuadTree_exports = {};
__export(QuadTree_exports, {
  Direction: () => Direction,
  QuadTreeNode: () => QuadTreeNode,
  quadTree: () => quadTree
});
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["Nw"] = 0] = "Nw";
  Direction2[Direction2["Ne"] = 1] = "Ne";
  Direction2[Direction2["Sw"] = 2] = "Sw";
  Direction2[Direction2["Se"] = 3] = "Se";
  return Direction2;
})(Direction || {});
var quadTree = (bounds, initialData = [], opts = {}) => {
  const o = {
    maxItems: opts.maxItems ?? 4,
    maxLevels: opts.maxLevels ?? 4
  };
  const n = new QuadTreeNode(void 0, bounds, 0, o);
  for (const d of initialData) {
    n.add(d);
  }
  return n;
};
var QuadTreeNode = class _QuadTreeNode {
  /**
   * Constructor
   * @param boundary
   * @param level
   * @param opts
   */
  constructor(parent, boundary, level, opts) {
    this.boundary = boundary;
    this.level = level;
    this.opts = opts;
    this.#parent = parent;
  }
  #items = [];
  #children = [];
  #parent;
  getLengthChildren() {
    return this.#children.length;
  }
  *parents() {
    let n = this;
    while (n.#parent !== void 0) {
      yield n.#parent;
      n = n.#parent;
    }
  }
  getParent() {
    return this.#parent;
  }
  /**
   * Iterates over immediate children
   */
  *children() {
    for (const c of this.#children) {
      yield c;
    }
  }
  /**
   * Array of QuadTreeItem
   * @returns
   */
  getValue() {
    return this.#items;
  }
  getIdentity() {
    return this;
  }
  /**
   * Get a descendant node in a given direction
   * @param d
   * @returns
   */
  direction(d) {
    return this.#children[d];
  }
  /**
   * Add an item to the quadtree
   * @param p
   * @returns False if item is outside of boundary, True if item was added
   */
  add(p) {
    if (!isIntersecting3(this.boundary, p)) return false;
    if (this.#children.length > 0) {
      for (const d of this.#children) d.add(p);
      return true;
    }
    this.#items.push(p);
    if (this.#items.length > this.opts.maxItems && this.level < this.opts.maxLevels) {
      if (this.#children.length === 0) {
        this.#subdivide();
      }
      for (const item of this.#items) {
        for (const d of this.#children) d.add(item);
      }
      this.#items = [];
    }
    return true;
  }
  /**
   * Returns true if point is inside node's boundary
   * @param p
   * @returns
   */
  couldHold(p) {
    return intersectsPoint(this.boundary, p);
  }
  #subdivide() {
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    const x = this.boundary.x;
    const y = this.boundary.y;
    const coords = fromNumbers2(x + w, y, x, y, x, y + h, x + w, y + h);
    const rects = coords.map((p) => fromTopLeft(p, w, h));
    this.#children = rects.map(
      (r) => new _QuadTreeNode(this, r, this.level + 1, this.opts)
    );
  }
};

// src/geometry/Scaler.ts
var Scaler_exports = {};
__export(Scaler_exports, {
  scaler: () => scaler
});

// src/geometry/rect/Placeholder.ts
var placeholder = Object.freeze({
  width: Number.NaN,
  height: Number.NaN
});
var placeholderPositioned = Object.freeze({
  x: Number.NaN,
  y: Number.NaN,
  width: Number.NaN,
  height: Number.NaN
});

// src/geometry/Scaler.ts
var scaler = (scaleBy = `both`, defaultRect) => {
  const defaultBounds = defaultRect ?? placeholder;
  let sw = 1;
  let sh = 1;
  let s = { x: 1, y: 1 };
  const computeScale = () => {
    switch (scaleBy) {
      case `height`: {
        return { x: sh, y: sh };
      }
      case `width`: {
        return { x: sw, y: sw };
      }
      case `min`: {
        return { x: Math.min(sw, sh), y: Math.min(sw, sh) };
      }
      case `max`: {
        return { x: Math.max(sw, sh), y: Math.max(sw, sh) };
      }
      default: {
        return { x: sw, y: sh };
      }
    }
  };
  const normalise4 = (a, b, c, d) => {
    let inX = Number.NaN;
    let inY = Number.NaN;
    let outW = defaultBounds.width;
    let outH = defaultBounds.height;
    if (typeof a === `number`) {
      inX = a;
      if (typeof b === `number`) {
        inY = b;
        if (c === void 0) return [inX, inY, outW, outH];
        if (isRect(c)) {
          outW = c.width;
          outH = c.height;
        } else if (typeof c === `number`) {
          outW = c;
          if (typeof d === `number`) {
            outH = d;
          } else {
            throw new TypeError(`Missing final height value`);
          }
        } else throw new Error(`Missing valid output range`);
      } else if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else {
        throw new Error(
          `Expected input y or output Rect to follow first number parameter`
        );
      }
    } else if (isPoint(a)) {
      inX = a.x;
      inY = a.y;
      if (b === void 0) return [inX, inY, outW, outH];
      if (isRect(b)) {
        outW = b.width;
        outH = b.height;
      } else if (typeof b === `number`) {
        outW = b;
        if (typeof c === `number`) {
          outH = c;
        } else {
          throw new TypeError(
            `Expected height as third parameter after Point and output width`
          );
        }
      } else {
        throw new TypeError(
          `Expected Rect or width as second parameter when first parameter is a Point`
        );
      }
    } else {
      throw new Error(`Expected input Point or x value as first parameter`);
    }
    return [inX, inY, outW, outH];
  };
  const scaleAbs = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(true, ...n);
  };
  const scaleRel = (a, b, c, d) => {
    const n = normalise4(a, b, c, d);
    return scaleNormalised(false, ...n);
  };
  const scaleNormalised = (abs4, x, y, w, h) => {
    if (Number.isNaN(w)) throw new Error(`Output width range missing`);
    if (Number.isNaN(h)) throw new Error(`Output height range missing`);
    if (w !== sw || h !== sh) {
      sw = w;
      sh = h;
      s = computeScale();
    }
    return abs4 ? {
      x: x * s.x,
      y: y * s.y
    } : {
      x: x / s.x,
      y: y / s.y
    };
  };
  return {
    computeScale,
    rel: scaleRel,
    abs: scaleAbs,
    width: defaultBounds.width,
    height: defaultBounds.height
  };
};

// src/geometry/Convolve2d.ts
var Convolve2d_exports = {};
__export(Convolve2d_exports, {
  boxBlurKernel: () => boxBlurKernel,
  convolve: () => convolve,
  convolveCell: () => convolveCell,
  convolveImage: () => convolveImage,
  edgeDetectionKernel: () => edgeDetectionKernel,
  gaussianBlur3Kernel: () => gaussianBlur3Kernel,
  gaussianBlur5Kernel: () => gaussianBlur5Kernel,
  identityKernel: () => identityKernel,
  kernel2dToArray: () => kernel2dToArray,
  multiply: () => multiply5,
  rgbReducer: () => rgbReducer,
  sharpenKernel: () => sharpenKernel,
  unsharpMasking5Kernel: () => unsharpMasking5Kernel
});

// src/visual/ImageDataGrid.ts
var ImageDataGrid_exports = {};
__export(ImageDataGrid_exports, {
  accessor: () => accessor
});
var accessor = (image) => {
  const grid = { rows: image.width, cols: image.height };
  const data = image.data;
  const fn = (cell, bounds) => {
    const index = indexFromCell(grid, cell, bounds);
    if (index === void 0) {
      return void 0;
    }
    const pxIndex = index * 4;
    return {
      r: data[pxIndex],
      g: data[pxIndex + 1],
      b: data[pxIndex + 2],
      opacity: data[pxIndex + 3]
    };
  };
  return fn;
};

// src/geometry/Convolve2d.ts
var multiply5 = (kernel, scalar) => {
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  const copy = [];
  for (let row = 0; row < rows2; row++) {
    copy[row] = [];
    for (let col = 0; col < cols; col++) {
      copy[row][col] = kernel[row][col] * scalar;
    }
  }
  return copy;
};
function convolveCell(c, kernel, source, access, reduce2) {
  const valuesAtKernelPos = kernel.map((o) => {
    const pos = offset(source, c, o[0], `stop`);
    if (!pos) return [o[1], void 0];
    return [o[1], access(pos, `undefined`)];
  });
  return reduce2(valuesAtKernelPos);
}
function* convolveImage(kernel, image) {
  const grid = { rows: image.width, cols: image.height };
  const imageDataAsGrid = accessor(image);
  yield* convolve(kernel, grid, imageDataAsGrid, cells(grid), rgbReducer);
}
function* convolve(kernel, source, access, visitor2, reduce2, origin) {
  if (!origin) {
    const kernelRows = kernel.length;
    const kernelCols = kernel[0].length;
    origin = { x: Math.floor(kernelRows / 2), y: Math.floor(kernelCols / 2) };
  }
  const asArray = kernel2dToArray(kernel, origin);
  for (const c of visitor2) {
    const v = convolveCell(c, asArray, source, access, reduce2);
    yield [c, v];
  }
}
var kernel2dToArray = (kernel, origin) => {
  const offsets = [];
  const rows2 = kernel.length;
  const cols = kernel[0].length;
  if (!origin) origin = { x: Math.floor(rows2 / 2), y: Math.floor(cols / 2) };
  for (let xx = 0; xx < rows2; xx++) {
    for (let yy = 0; yy < cols; yy++) {
      offsets.push([{ x: xx - origin.x, y: yy - origin.y }, kernel[xx][yy]]);
    }
  }
  return offsets;
};
var rgbReducer = (values) => {
  let r = 0;
  let g = 0;
  let b = 0;
  for (const value of values) {
    const rgb = value[1];
    const scale2 = value[0];
    if (rgb === void 0) continue;
    if (rgb.opacity === 0) continue;
    if (scale2 === 0) continue;
    r += rgb.r * scale2;
    g += rgb.g * scale2;
    b += rgb.b * scale2;
  }
  const result = {
    r,
    g,
    b,
    opacity: 255
  };
  return result;
};
var identityKernel = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];
var edgeDetectionKernel = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0]
];
var sharpenKernel = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0]
];
var boxBlurKernel = multiply5([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
], 1 / 9);
var gaussianBlur3Kernel = multiply5([
  [1, 2, 1],
  [2, 4, 2],
  [1, 2, 1]
], 1 / 16);
var gaussianBlur5Kernel = multiply5([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, 36, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], 1 / 256);
var unsharpMasking5Kernel = multiply5([
  [1, 4, 6, 4, 1],
  [4, 16, 24, 16, 4],
  [6, 24, -476, 24, 6],
  [4, 16, 24, 16, 4],
  [1, 4, 6, 4, 1]
], -1 / 256);

// src/geometry/arc/index.ts
var arc_exports = {};
__export(arc_exports, {
  bbox: () => bbox5,
  distanceCenter: () => distanceCenter2,
  fromDegrees: () => fromDegrees2,
  guard: () => guard6,
  interpolate: () => interpolate5,
  isArc: () => isArc,
  isEqual: () => isEqual6,
  isPositioned: () => isPositioned3,
  length: () => length4,
  point: () => point,
  toLine: () => toLine,
  toPath: () => toPath4,
  toSvg: () => toSvg2
});
var isArc = (p) => p.startRadian !== void 0 && p.endRadian !== void 0;
var isPositioned3 = (p) => p.x !== void 0 && p.y !== void 0;
var piPi4 = Math.PI * 2;
function fromDegrees2(radius, startDegrees, endDegrees, origin) {
  const a = {
    radius,
    startRadian: degreeToRadian(startDegrees),
    endRadian: degreeToRadian(endDegrees)
  };
  if (isPoint(origin)) {
    guard$1(origin);
    const ap = {
      ...a,
      x: origin.x,
      y: origin.y
    };
    return Object.freeze(ap);
  } else {
    return Object.freeze(a);
  }
}
var toLine = (arc) => fromPoints(
  point(arc, arc.startRadian),
  point(arc, arc.endRadian)
);
var point = (arc, angleRadian2, origin) => {
  if (angleRadian2 > arc.endRadian) throw new Error(`angleRadian beyond end angle of arc`);
  if (angleRadian2 < arc.startRadian) throw new Error(`angleRadian beyond start angle of arc`);
  if (origin === void 0) {
    origin = isPositioned3(arc) ? arc : { x: 0, y: 0 };
  }
  return {
    x: Math.cos(angleRadian2) * arc.radius + origin.x,
    y: Math.sin(angleRadian2) * arc.radius + origin.y
  };
};
var guard6 = (arc) => {
  if (arc === void 0) throw new Error(`Arc is undefined`);
  if (isPositioned3(arc)) {
    guard$1(arc, `arc`);
  }
  if (arc.radius === void 0) throw new Error(`Arc radius is undefined (${JSON.stringify(arc)})`);
  if (typeof arc.radius !== `number`) throw new Error(`Radius must be a number`);
  if (Number.isNaN(arc.radius)) throw new Error(`Radius is NaN`);
  if (arc.radius <= 0) throw new Error(`Radius must be greater than zero`);
  if (arc.startRadian === void 0) throw new Error(`Arc is missing 'startRadian' field`);
  if (arc.endRadian === void 0) throw new Error(`Arc is missing 'startRadian' field`);
  if (Number.isNaN(arc.endRadian)) throw new Error(`Arc endRadian is NaN`);
  if (Number.isNaN(arc.startRadian)) throw new Error(`Arc endRadian is NaN`);
  if (arc.startRadian >= arc.endRadian) throw new Error(`startRadian is expected to be les than endRadian`);
};
var interpolate5 = (amount, arc, origin) => {
  guard6(arc);
  return point(arc, arc.startRadian + (arc.endRadian - arc.startRadian) * amount, origin);
};
var toPath4 = (arc) => {
  guard6(arc);
  return Object.freeze({
    ...arc,
    nearest: (point2) => {
      throw new Error(`not implemented`);
    },
    interpolate: (amount) => interpolate5(amount, arc),
    bbox: () => bbox5(arc),
    length: () => length4(arc),
    toSvgString: () => toSvg2(arc),
    relativePosition: (_point, _intersectionThreshold) => {
      throw new Error(`Not implemented`);
    },
    distanceToPoint: (_point) => {
      throw new Error(`Not implemented`);
    },
    kind: `arc`
  });
};
var length4 = (arc) => piPi4 * arc.radius * ((arc.startRadian - arc.endRadian) / piPi4);
var bbox5 = (arc) => {
  if (isPositioned3(arc)) {
    const middle = interpolate5(0.5, arc);
    const asLine = toLine(arc);
    return bbox(middle, asLine.a, asLine.b);
  } else {
    return {
      width: arc.radius * 2,
      height: arc.radius * 2
    };
  }
};
var toSvg2 = (a, b, c, d, e) => {
  if (isArc(a)) {
    if (isPositioned3(a)) {
      return toSvgFull2(a, a.radius, a.startRadian, a.endRadian, b);
    } else {
      return isPoint(b) ? toSvgFull2(b, a.radius, a.startRadian, a.endRadian, c) : toSvgFull2({ x: 0, y: 0 }, a.radius, a.startRadian, a.endRadian);
    }
  } else {
    if (c === void 0) throw new Error(`startAngle undefined`);
    if (d === void 0) throw new Error(`endAngle undefined`);
    if (isPoint(a)) {
      if (typeof b === `number` && typeof c === `number` && typeof d === `number`) {
        return toSvgFull2(a, b, c, d, e);
      } else {
        throw new TypeError(`Expected (point, number, number, number). Missing a number param.`);
      }
    } else {
      throw new Error(`Expected (point, number, number, number). Missing first point.`);
    }
  }
};
var toSvgFull2 = (origin, radius, startRadian, endRadian, opts) => {
  if (opts === void 0 || typeof opts !== `object`) opts = {};
  const isFullCircle = endRadian - startRadian === 360;
  const start = toCartesian(radius, endRadian - 0.01, origin);
  const end = toCartesian(radius, startRadian, origin);
  const { largeArc = false, sweep = false } = opts;
  const d = [`
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArc ? `1` : `0`} ${sweep ? `1` : `0`} ${end.x} ${end.y},
  `];
  if (isFullCircle) d.push(`z`);
  return d;
};
var distanceCenter2 = (a, b) => distance(a, b);
var isEqual6 = (a, b) => {
  if (a.radius !== b.radius) return false;
  if (isPositioned3(a) && isPositioned3(b)) {
    if (a.x !== b.x) return false;
    if (a.y !== b.y) return false;
    if (a.z !== b.z) return false;
    return true;
  } else if (!isPositioned3(a) && !isPositioned3(b)) ; else return false;
  if (a.endRadian !== b.endRadian) return false;
  if (a.startRadian !== b.startRadian) return false;
  return true;
};

// src/geometry/Vector.ts
var Vector_exports = {};
__export(Vector_exports, {
  clampMagnitude: () => clampMagnitude3,
  divide: () => divide4,
  dotProduct: () => dotProduct4,
  fromLineCartesian: () => fromLineCartesian,
  fromLinePolar: () => fromLinePolar,
  fromPointPolar: () => fromPointPolar,
  fromRadians: () => fromRadians,
  multiply: () => multiply6,
  normalise: () => normalise3,
  quadrantOffsetAngle: () => quadrantOffsetAngle,
  subtract: () => subtract4,
  sum: () => sum4,
  toCartesian: () => toCartesian2,
  toPolar: () => toPolar,
  toRadians: () => toRadians,
  toString: () => toString5
});
var EmptyCartesian2 = Object.freeze({ x: 0, y: 0 });
var piPi5 = Math.PI * 2;
var pi3 = Math.PI;
var fromRadians = (radians) => {
  return Object.freeze({
    x: Math.cos(radians),
    y: Math.sin(radians)
  });
};
var toRadians = (point2) => {
  return Math.atan2(point2.y, point2.x);
};
var fromPointPolar = (pt, angleNormalisation = ``, origin = EmptyCartesian2) => {
  pt = subtract(pt, origin);
  let direction = Math.atan2(pt.y, pt.x);
  if (angleNormalisation === `unipolar` && direction < 0) direction += piPi5;
  else if (angleNormalisation === `bipolar`) {
    if (direction > pi3) direction -= piPi5;
    else if (direction <= -pi3) direction += piPi5;
  }
  return Object.freeze({
    distance: distance(pt),
    angleRadian: direction
  });
};
var fromLineCartesian = (line) => subtract(line.b, line.a);
var fromLinePolar = (line) => {
  guard2(line, `line`);
  const pt = subtract(line.b, line.a);
  return fromPointPolar(pt);
};
var isPolar = (v) => {
  if (isPolarCoord(v)) return true;
  return false;
};
var isCartesian = (v) => {
  if (isPoint(v)) return true;
  return false;
};
var normalise3 = (v) => {
  if (isPolar(v)) {
    return normalise(v);
  } else if (isCartesian(v)) {
    return normalise2(v);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var quadrantOffsetAngle = (p) => {
  if (p.x >= 0 && p.y >= 0) return 0;
  if (p.x < 0 && p.y >= 0) return pi3;
  if (p.x < 0 && p.y < 0) return pi3;
  return piPi5;
};
var toPolar = (v, origin = Empty) => {
  if (isPolar(v)) {
    return v;
  } else if (isCartesian(v)) {
    return fromCartesian(v, origin);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toCartesian2 = (v) => {
  if (isPolar(v)) {
    return toPoint(v);
  } else if (isCartesian(v)) {
    return v;
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var toString5 = (v, digits) => {
  if (isPolar(v)) {
    return toString$1(v, digits);
  } else if (isCartesian(v)) {
    return toString2$1(v, digits);
  }
  throw new Error(`Expected polar/cartesian vector. Got: ${v}`);
};
var dotProduct4 = (a, b) => {
  if (isPolar(a) && isPolar(b)) {
    return dotProduct2(a, b);
  } else if (isCartesian(a) && isCartesian(b)) {
    return dotProduct3(a, b);
  }
  throw new Error(`Expected two polar/Cartesian vectors.`);
};
var clampMagnitude3 = (v, max2 = 1, min2 = 0) => {
  if (isPolar(v)) {
    return clampMagnitude(v, max2, min2);
  } else if (isCartesian(v)) {
    return clampMagnitude2(v, max2, min2);
  }
  throw new Error(`Expected either polar or Cartesian vector`);
};
var sum4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = sum$1(a, b);
  return polar ? toPolar(c) : c;
};
var subtract4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = subtract(a, b);
  return polar ? toPolar(c) : c;
};
var multiply6 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = multiply2(a, b);
  return polar ? toPolar(c) : c;
};
var divide4 = (a, b) => {
  const polar = isPolar(a);
  a = toCartesian2(a);
  b = toCartesian2(b);
  const c = divide(a, b);
  return polar ? toPolar(c) : c;
};

// src/geometry/SurfacePoints.ts
var SurfacePoints_exports = {};
__export(SurfacePoints_exports, {
  circleRings: () => circleRings,
  circleVogelSpiral: () => circleVogelSpiral,
  sphereFibonacci: () => sphereFibonacci
});
var cos3 = Math.cos;
var sin3 = Math.sin;
var asin = Math.asin;
var sqrt3 = Math.sqrt;
var pow2 = Math.pow;
var pi4 = Math.PI;
var piPi6 = Math.PI * 2;
var goldenAngle = pi4 * (3 - sqrt3(5));
var goldenSection = (1 + sqrt3(5)) / 2;
function* circleVogelSpiral(circle, opts = {}) {
  const maxPoints = opts.maxPoints ?? 5e3;
  const density = opts.density ?? 0.95;
  const rotationOffset = opts.rotation ?? 0;
  const c = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const max2 = c.radius;
  let spacing = c.radius * scale(density, 0, 1, 0.3, 0.01);
  if (opts.spacing) spacing = opts.spacing;
  let radius = 0;
  let count = 0;
  let angle2 = 0;
  while (count < maxPoints && radius < max2) {
    radius = spacing * count ** 0.5;
    angle2 = rotationOffset + count * 2 * pi4 / goldenSection;
    yield Object.freeze({
      x: c.x + radius * cos3(angle2),
      y: c.y + radius * sin3(angle2)
    });
    count++;
  }
}
function* circleRings(circle, opts = {}) {
  const rings = opts.rings ?? 5;
  const c = toPositioned(circle ?? { radius: 1, x: 0, y: 0 });
  const ringR = 1 / rings;
  const rotationOffset = opts.rotation ?? 0;
  let ringCount = 1;
  yield Object.freeze({ x: c.x, y: c.y });
  for (let r = ringR; r <= 1; r += ringR) {
    const n = Math.round(pi4 / asin(1 / (2 * ringCount)));
    for (const theta of linearSpace(0, piPi6, n + 1)) {
      yield Object.freeze({
        x: c.x + r * cos3(theta + rotationOffset) * c.radius,
        y: c.y + r * sin3(theta + rotationOffset) * c.radius
      });
    }
    ringCount++;
  }
}
function* sphereFibonacci(samples = 100, rotationRadians = 0, sphere) {
  const offset2 = 2 / samples;
  const s = sphere ?? { x: 0, y: 0, z: 0, radius: 1 };
  for (let index = 0; index < samples; index++) {
    const y = index * offset2 - 1 + offset2 / 2;
    const r = sqrt3(1 - pow2(y, 2));
    const a = (index + 1) % samples * goldenAngle + rotationRadians;
    const x = cos3(a) * r;
    const z = sin3(a) * r;
    yield Object.freeze({
      x: s.x + x * s.radius,
      y: s.y + y * s.radius,
      z: s.z + z * s.radius
    });
  }
}

// src/geometry/triangle/index.ts
var triangle_exports = {};
__export(triangle_exports, {
  Empty: () => Empty3,
  Equilateral: () => Equilateral_exports,
  Isosceles: () => Isosceles_exports,
  Placeholder: () => Placeholder3,
  Right: () => Right_exports,
  angles: () => angles,
  anglesDegrees: () => anglesDegrees,
  apply: () => apply3,
  area: () => area3,
  barycentricCoord: () => barycentricCoord,
  barycentricToCartestian: () => barycentricToCartestian,
  bbox: () => bbox6,
  centroid: () => centroid2,
  corners: () => corners2,
  edges: () => edges2,
  equilateralFromVertex: () => equilateralFromVertex,
  fromFlatArray: () => fromFlatArray2,
  fromPoints: () => fromPoints3,
  fromRadius: () => fromRadius,
  guard: () => guard7,
  innerCircle: () => innerCircle,
  intersectsPoint: () => intersectsPoint2,
  isAcute: () => isAcute,
  isEmpty: () => isEmpty4,
  isEqual: () => isEqual7,
  isEquilateral: () => isEquilateral,
  isIsosceles: () => isIsosceles,
  isOblique: () => isOblique,
  isObtuse: () => isObtuse,
  isPlaceholder: () => isPlaceholder4,
  isRightAngle: () => isRightAngle,
  isTriangle: () => isTriangle,
  lengths: () => lengths2,
  outerCircle: () => outerCircle,
  perimeter: () => perimeter,
  rotate: () => rotate4,
  rotateByVertex: () => rotateByVertex,
  toFlatArray: () => toFlatArray2
});

// src/geometry/triangle/Guard.ts
var guard7 = (t2, name = `t`) => {
  if (t2 === void 0) throw new Error(`{$name} undefined`);
  guard$1(t2.a, name + `.a`);
  guard$1(t2.b, name + `.b`);
  guard$1(t2.c, name + `.c`);
};

// src/geometry/triangle/Edges.ts
var edges2 = (t2) => {
  guard7(t2);
  return joinPointsToLines(t2.a, t2.b, t2.c, t2.a);
};

// src/geometry/triangle/Area.ts
var area3 = (t2) => {
  guard7(t2, `t`);
  const lengths3 = edges2(t2).map((l) => length$1(l));
  const p = (lengths3[0] + lengths3[1] + lengths3[2]) / 2;
  return Math.sqrt(p * (p - lengths3[0]) * (p - lengths3[1]) * (p - lengths3[2]));
};

// src/geometry/triangle/Centroid.ts
var centroid2 = (t2) => {
  guard7(t2);
  const total = reduce$1(
    [t2.a, t2.b, t2.c],
    (p, accumulator) => ({
      x: p.x + accumulator.x,
      y: p.y + accumulator.y
    })
  );
  const div = {
    x: total.x / 3,
    y: total.y / 3
  };
  return div;
};

// src/geometry/triangle/Perimeter.ts
var perimeter = (t2) => {
  guard7(t2);
  return edges2(t2).reduce((accumulator, v) => accumulator + length$1(v), 0);
};

// src/geometry/triangle/InnerCircle.ts
var innerCircle = (t2) => {
  const c = centroid2(t2);
  const p = perimeter(t2) / 2;
  const a = area3(t2);
  const radius = a / p;
  return { radius, ...c };
};

// src/geometry/triangle/OuterCircle.ts
var outerCircle = (t2) => {
  const [a, b, c] = edges2(t2).map((l) => length$1(l));
  const cent = centroid2(t2);
  const radius = a * b * c / Math.sqrt((a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c));
  return {
    radius,
    ...cent
  };
};

// src/geometry/triangle/Rotate.ts
var rotate4 = (t2, amountRadian, origin) => {
  if (amountRadian === void 0 || amountRadian === 0) return t2;
  if (origin === void 0) origin = centroid2(t2);
  return Object.freeze({
    ...t2,
    a: rotate2(t2.a, amountRadian, origin),
    b: rotate2(t2.b, amountRadian, origin),
    c: rotate2(t2.c, amountRadian, origin)
  });
};

// src/geometry/triangle/Equilateral.ts
var Equilateral_exports = {};
__export(Equilateral_exports, {
  area: () => area4,
  centerFromA: () => centerFromA,
  centerFromB: () => centerFromB,
  centerFromC: () => centerFromC,
  circumcircle: () => circumcircle,
  fromCenter: () => fromCenter2,
  height: () => height,
  incircle: () => incircle,
  perimeter: () => perimeter2
});
var pi4over3 = Math.PI * 4 / 3;
var pi2over3 = Math.PI * 2 / 3;
var resolveLength = (t2) => {
  if (typeof t2 === `number`) return t2;
  return t2.length;
};
var fromCenter2 = (t2, origin, rotationRad) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2) / Math.sqrt(3);
  const rot = rotationRad ?? Math.PI * 1.5;
  const b = {
    x: r * Math.cos(rot) + origin.x,
    y: r * Math.sin(rot) + origin.y
  };
  const a = {
    x: r * Math.cos(rot + pi4over3) + origin.x,
    y: r * Math.sin(rot + pi4over3) + origin.y
  };
  const c = {
    x: r * Math.cos(rot + pi2over3) + origin.x,
    y: r * Math.sin(rot + pi2over3) + origin.y
  };
  return Object.freeze({ a, b, c });
};
var centerFromA = (t2, ptA) => {
  if (!ptA) ptA = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2);
  const { radius } = incircle(t2);
  return {
    x: ptA.x + r / 2,
    y: ptA.y - radius
  };
};
var centerFromB = (t2, ptB) => {
  if (!ptB) ptB = Object.freeze({ x: 0, y: 0 });
  const { radius } = incircle(t2);
  return {
    x: ptB.x,
    y: ptB.y + radius * 2
  };
};
var centerFromC = (t2, ptC) => {
  if (!ptC) ptC = Object.freeze({ x: 0, y: 0 });
  const r = resolveLength(t2);
  const { radius } = incircle(t2);
  return {
    x: ptC.x - r / 2,
    y: ptC.y - radius
  };
};
var height = (t2) => Math.sqrt(3) / 2 * resolveLength(t2);
var perimeter2 = (t2) => resolveLength(t2) * 3;
var area4 = (t2) => Math.pow(resolveLength(t2), 2) * Math.sqrt(3) / 4;
var circumcircle = (t2) => ({
  radius: Math.sqrt(3) / 3 * resolveLength(t2)
});
var incircle = (t2) => ({
  radius: Math.sqrt(3) / 6 * resolveLength(t2)
});

// src/geometry/triangle/Right.ts
var Right_exports = {};
__export(Right_exports, {
  adjacentFromHypotenuse: () => adjacentFromHypotenuse,
  adjacentFromOpposite: () => adjacentFromOpposite,
  angleAtPointA: () => angleAtPointA,
  angleAtPointB: () => angleAtPointB,
  area: () => area5,
  circumcircle: () => circumcircle2,
  fromA: () => fromA,
  fromB: () => fromB,
  fromC: () => fromC,
  height: () => height2,
  hypotenuseFromAdjacent: () => hypotenuseFromAdjacent,
  hypotenuseFromOpposite: () => hypotenuseFromOpposite,
  hypotenuseSegments: () => hypotenuseSegments,
  incircle: () => incircle2,
  medians: () => medians,
  oppositeFromAdjacent: () => oppositeFromAdjacent,
  oppositeFromHypotenuse: () => oppositeFromHypotenuse,
  perimeter: () => perimeter3,
  resolveLengths: () => resolveLengths
});
var fromA = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + tt.hypotenuse, y: origin.y };
  const c = { x: origin.x + seg[1], y: origin.y - h };
  return { a, b, c };
};
var fromB = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const tt = resolveLengths(t2);
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - tt.hypotenuse, y: origin.y };
  const c = { x: origin.x - seg[0], y: origin.y - h };
  return { a, b, c };
};
var fromC = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const seg = hypotenuseSegments(t2);
  const h = height2(t2);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - seg[1], y: origin.y + h };
  const b = { x: origin.x + seg[0], y: origin.y + h };
  return { a, b, c };
};
var resolveLengths = (t2) => {
  const a = t2.adjacent;
  const o = t2.opposite;
  const h = t2.hypotenuse;
  if (a !== void 0 && o !== void 0) {
    return {
      ...t2,
      adjacent: a,
      opposite: o,
      hypotenuse: Math.hypot(a, o)
    };
  } else if (a && h) {
    return {
      ...t2,
      adjacent: a,
      hypotenuse: h,
      opposite: h * h - a * a
    };
  } else if (o && h) {
    return {
      ...t2,
      hypotenuse: h,
      opposite: o,
      adjacent: h * h - o * o
    };
  } else if (t2.opposite && t2.hypotenuse && t2.adjacent) {
    return t2;
  }
  throw new Error(`Missing at least two edges`);
};
var height2 = (t2) => {
  const tt = resolveLengths(t2);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return Math.sqrt(p * q);
};
var hypotenuseSegments = (t2) => {
  const tt = resolveLengths(t2);
  const p = tt.opposite * tt.opposite / tt.hypotenuse;
  const q = tt.adjacent * tt.adjacent / tt.hypotenuse;
  return [p, q];
};
var perimeter3 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.adjacent + tt.hypotenuse + tt.opposite;
};
var area5 = (t2) => {
  const tt = resolveLengths(t2);
  return tt.opposite * tt.adjacent / 2;
};
var angleAtPointA = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos(
    (tt.adjacent * tt.adjacent + tt.hypotenuse * tt.hypotenuse - tt.opposite * tt.opposite) / (2 * tt.adjacent * tt.hypotenuse)
  );
};
var angleAtPointB = (t2) => {
  const tt = resolveLengths(t2);
  return Math.acos(
    (tt.opposite * tt.opposite + tt.hypotenuse * tt.hypotenuse - tt.adjacent * tt.adjacent) / (2 * tt.opposite * tt.hypotenuse)
  );
};
var medians = (t2) => {
  const tt = resolveLengths(t2);
  const b = tt.adjacent * tt.adjacent;
  const c = tt.hypotenuse * tt.hypotenuse;
  const a = tt.opposite * tt.opposite;
  return [
    Math.sqrt(2 * (b + c) - a) / 2,
    Math.sqrt(2 * (c + a) - b) / 2,
    Math.sqrt(2 * (a + b) - c) / 2
  ];
};
var circumcircle2 = (t2) => {
  const tt = resolveLengths(t2);
  return { radius: tt.hypotenuse / 2 };
};
var incircle2 = (t2) => {
  const tt = resolveLengths(t2);
  return {
    radius: (tt.adjacent + tt.opposite - tt.hypotenuse) / 2
  };
};
var oppositeFromAdjacent = (angleRad, adjacent) => Math.tan(angleRad) * adjacent;
var oppositeFromHypotenuse = (angleRad, hypotenuse) => Math.sin(angleRad) * hypotenuse;
var adjacentFromHypotenuse = (angleRad, hypotenuse) => Math.cos(angleRad) * hypotenuse;
var adjacentFromOpposite = (angleRad, opposite) => opposite / Math.tan(angleRad);
var hypotenuseFromOpposite = (angleRad, opposite) => opposite / Math.sin(angleRad);
var hypotenuseFromAdjacent = (angleRad, adjacent) => adjacent / Math.cos(angleRad);

// src/geometry/triangle/Isosceles.ts
var Isosceles_exports = {};
__export(Isosceles_exports, {
  apexAngle: () => apexAngle,
  area: () => area6,
  baseAngle: () => baseAngle,
  circumcircle: () => circumcircle3,
  fromA: () => fromA2,
  fromB: () => fromB2,
  fromC: () => fromC2,
  fromCenter: () => fromCenter3,
  height: () => height3,
  incircle: () => incircle3,
  legHeights: () => legHeights,
  medians: () => medians2,
  perimeter: () => perimeter4
});
var baseAngle = (t2) => Math.acos(t2.base / (2 * t2.legs));
var apexAngle = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.acos((2 * aa - cc) / (2 * aa));
};
var height3 = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  return Math.sqrt((4 * aa - cc) / 4);
};
var legHeights = (t2) => {
  const b = baseAngle(t2);
  return t2.base * Math.sin(b);
};
var perimeter4 = (t2) => 2 * t2.legs + t2.base;
var area6 = (t2) => {
  const h = height3(t2);
  return h * t2.base / 2;
};
var circumcircle3 = (t2) => {
  const h = height3(t2);
  const hh = h * h;
  const cc = t2.base * t2.base;
  return { radius: (4 * hh + cc) / (8 * h) };
};
var incircle3 = (t2) => {
  const h = height3(t2);
  return { radius: t2.base * h / (2 * t2.legs + t2.base) };
};
var medians2 = (t2) => {
  const aa = t2.legs * t2.legs;
  const cc = t2.base * t2.base;
  const medianAB = Math.sqrt(aa + 2 * cc) / 2;
  const medianC = Math.sqrt(4 * aa - cc) / 2;
  return [medianAB, medianAB, medianC];
};
var fromCenter3 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const incircleR = incircle3(t2).radius;
  const verticalToApex = h - incircleR;
  const a = { x: origin.x - t2.base / 2, y: origin.y + incircleR };
  const b = { x: origin.x + t2.base / 2, y: origin.y + incircleR };
  const c = { x: origin.x, y: origin.y - verticalToApex };
  return { a, b, c };
};
var fromA2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const a = { x: origin.x, y: origin.y };
  const b = { x: origin.x + t2.base, y: origin.y };
  const c = { x: origin.x + t2.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromB2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const b = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t2.base, y: origin.y };
  const c = { x: origin.x - t2.base / 2, y: origin.y - h };
  return { a, b, c };
};
var fromC2 = (t2, origin) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const h = height3(t2);
  const c = { x: origin.x, y: origin.y };
  const a = { x: origin.x - t2.base / 2, y: origin.y + h };
  const b = { x: origin.x + t2.base / 2, y: origin.y + h };
  return { a, b, c };
};

// src/geometry/triangle/index.ts
var piPi7 = Math.PI * 2;
var Empty3 = Object.freeze({
  a: { x: 0, y: 0 },
  b: { x: 0, y: 0 },
  c: { x: 0, y: 0 }
});
var Placeholder3 = Object.freeze({
  a: { x: Number.NaN, y: Number.NaN },
  b: { x: Number.NaN, y: Number.NaN },
  c: { x: Number.NaN, y: Number.NaN }
});
var isEmpty4 = (t2) => isEmpty$2(t2.a) && isEmpty$2(t2.b) && isEmpty$2(t2.c);
var isPlaceholder4 = (t2) => isPlaceholder(t2.a) && isPlaceholder(t2.b) && isPlaceholder(t2.c);
var apply3 = (t2, fn) => Object.freeze({
  ...t2,
  a: fn(t2.a, `a`),
  b: fn(t2.b, `b`),
  c: fn(t2.c, `c`)
});
var isTriangle = (p) => {
  if (p === void 0) return false;
  const tri = p;
  if (!isPoint(tri.a)) return false;
  if (!isPoint(tri.b)) return false;
  if (!isPoint(tri.c)) return false;
  return true;
};
var isEqual7 = (a, b) => isEqual$1(a.a, b.a) && isEqual$1(a.b, b.b) && isEqual$1(a.c, b.c);
var corners2 = (t2) => {
  guard7(t2);
  return [t2.a, t2.b, t2.c];
};
var lengths2 = (t2) => {
  guard7(t2);
  return [
    distance(t2.a, t2.b),
    distance(t2.b, t2.c),
    distance(t2.c, t2.a)
  ];
};
var angles = (t2) => {
  guard7(t2);
  return [
    angle(t2.a, t2.b),
    angle(t2.b, t2.c),
    angle(t2.c, t2.a)
  ];
};
var anglesDegrees = (t2) => {
  guard7(t2);
  return radianToDegree(angles(t2));
};
var isEquilateral = (t2) => {
  guard7(t2);
  const [a, b, c] = lengths2(t2);
  return a === b && b === c;
};
var isIsosceles = (t2) => {
  const [a, b, c] = lengths2(t2);
  if (a === b) return true;
  if (b === c) return true;
  if (c === a) return true;
  return false;
};
var isRightAngle = (t2) => angles(t2).includes(Math.PI / 2);
var isOblique = (t2) => !isRightAngle(t2);
var isAcute = (t2) => !angles(t2).some((v) => v >= Math.PI / 2);
var isObtuse = (t2) => angles(t2).some((v) => v > Math.PI / 2);
var fromRadius = (origin, radius, opts = {}) => {
  throwNumberTest(radius, `positive`, `radius`);
  guard$1(origin, `origin`);
  const initialAngleRadian = opts.initialAngleRadian ?? 0;
  const angles2 = [
    initialAngleRadian,
    initialAngleRadian + piPi7 * 1 / 3,
    initialAngleRadian + piPi7 * 2 / 3
  ];
  const points = angles2.map((a) => toCartesian(radius, a, origin));
  return fromPoints3(points);
};
var rotateByVertex = (triangle, amountRadian, vertex = `b`) => {
  const origin = vertex === `a` ? triangle.a : vertex === `b` ? triangle.b : triangle.c;
  return Object.freeze({
    a: rotate2(triangle.a, amountRadian, origin),
    b: rotate2(triangle.b, amountRadian, origin),
    c: rotate2(triangle.c, amountRadian, origin)
  });
};
var equilateralFromVertex = (origin, length5 = 10, angleRadian2 = Math.PI / 2) => {
  if (!origin) origin = Object.freeze({ x: 0, y: 0 });
  const a = project(origin, length5, Math.PI - -angleRadian2 / 2);
  const c = project(origin, length5, Math.PI - angleRadian2 / 2);
  return { a, b: origin, c };
};
var toFlatArray2 = (t2) => {
  guard7(t2);
  return [t2.a.x, t2.a.y, t2.b.x, t2.b.y, t2.c.x, t2.c.y];
};
var fromFlatArray2 = (coords) => {
  if (!Array.isArray(coords)) throw new Error(`coords expected as array`);
  if (coords.length !== 6) {
    throw new Error(
      `coords array expected with 6 elements. Got ${coords.length}`
    );
  }
  return fromPoints3(fromNumbers2(...coords));
};
var fromPoints3 = (points) => {
  if (!Array.isArray(points)) throw new Error(`points expected as array`);
  if (points.length !== 3) {
    throw new Error(
      `points array expected with 3 elements. Got ${points.length}`
    );
  }
  const t2 = {
    a: points[0],
    b: points[1],
    c: points[2]
  };
  return t2;
};
var bbox6 = (t2, inflation = 0) => {
  const { a, b, c } = t2;
  const xMin = Math.min(a.x, b.x, c.x) - inflation;
  const xMax = Math.max(a.x, b.x, c.x) + inflation;
  const yMin = Math.min(a.y, b.y, c.y) - inflation;
  const yMax = Math.max(a.y, b.y, c.y) + inflation;
  const r = {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
  return r;
};
var barycentricCoord = (t2, a, b) => {
  const pt = getPointParameter2(a, b);
  const ab = (x, y, pa, pb) => (pa.y - pb.y) * x + (pb.x - pa.x) * y + pa.x * pb.y - pb.x * pa.y;
  const alpha = ab(pt.x, pt.y, t2.b, t2.c) / ab(t2.a.x, t2.a.y, t2.b, t2.c);
  const theta = ab(pt.x, pt.y, t2.c, t2.a) / ab(t2.b.x, t2.b.y, t2.c, t2.a);
  const gamma = ab(pt.x, pt.y, t2.a, t2.b) / ab(t2.c.x, t2.c.y, t2.a, t2.b);
  return {
    a: alpha,
    b: theta,
    c: gamma
  };
};
var barycentricToCartestian = (t2, bc) => {
  guard7(t2);
  const { a, b, c } = t2;
  const x = a.x * bc.a + b.x * bc.b + c.x * bc.c;
  const y = a.y * bc.a + b.y * bc.b + c.y * bc.c;
  if (a.z && b.z && c.z) {
    const z = a.z * bc.a + b.z * bc.b + c.z * bc.c;
    return Object.freeze({ x, y, z });
  } else {
    return Object.freeze({ x, y });
  }
};
var intersectsPoint2 = (t2, a, b) => {
  const box = bbox6(t2);
  const pt = getPointParameter2(a, b);
  if (!intersectsPoint(box, pt)) return false;
  const bc = barycentricCoord(t2, pt);
  return 0 <= bc.a && bc.a <= 1 && 0 <= bc.b && bc.b <= 1 && 0 <= bc.c && bc.c <= 1;
};

// src/collections/arrays/AdditionalValues.ts
function* additionalValues(input, values, eq = isEqualDefault) {
  const yielded = [];
  for (const v of values) {
    const found = input.find((index) => eq(index, v));
    if (!found) {
      const alreadyYielded = yielded.find((ii) => eq(ii, v));
      if (!alreadyYielded) {
        yielded.push(v);
        yield v;
      }
    }
  }
}

// src/collections/arrays/Unique.ts
var unique$1 = (arrays, comparer = isEqualDefault) => {
  const t = [];
  for (const a of arrays) {
    if (Array.isArray(a)) {
      for (const v of additionalValues(t, a, comparer)) {
        t.push(v);
      }
    } else {
      return [...additionalValues([], arrays, comparer)];
    }
  }
  return t;
};

// src/collections/map/GetOrGenerate.ts
var getOrGenerateSync = (map, fn) => (key, args) => {
  let value = map.get(key);
  if (value !== void 0) return value;
  value = fn(key, args);
  map.set(key, value);
  return value;
};
var getOrGenerate = (map, fn) => async (key, args) => {
  let value = map.get(key);
  if (value !== void 0) return value;
  value = await fn(key, args);
  if (value === void 0) throw new Error(`fn returned undefined`);
  map.set(key, value);
  return value;
};

// src/debug/Logger.ts
var logger = (prefix, kind = `log`, colourKey) => (m) => {
  if (m === void 0) {
    m = `(undefined)`;
  } else if (typeof m === `object`) {
    m = JSON.stringify(m);
  }
  const colour = colourKey ?? prefix;
  switch (kind) {
    case `log`: {
      console.log(`%c${prefix} ${m}`, `color: ${logColours(colour)}`);
      break;
    }
    case `warn`: {
      console.warn(prefix, m);
      break;
    }
    case `error`: {
      console.error(prefix, m);
      break;
    }
  }
};
var logSet = (prefix, verbose = true, colourKey) => {
  if (verbose) {
    return {
      log: logger(prefix, `log`, colourKey),
      warn: logger(prefix, `warn`, colourKey),
      error: logger(prefix, `error`, colourKey)
    };
  }
  return {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (_) => {
    },
    warn: logger(prefix, `warn`, colourKey),
    error: logger(prefix, `error`, colourKey)
  };
};
var resolveLogOption = (l, defaults = {}) => {
  if (l === void 0 || typeof l === `boolean` && !l) {
    return (_) => {
    };
  }
  const defaultCat = defaults.category ?? ``;
  const defaultKind = defaults.kind ?? void 0;
  if (typeof l === `boolean`) {
    return (messageOrString) => {
      const m = typeof messageOrString === `string` ? { msg: messageOrString } : messageOrString;
      const kind = m.kind ?? defaultKind;
      const category = m.category ?? defaultCat;
      let message = m.msg;
      if (category) message = `[${category}] ${message}`;
      switch (kind) {
        case `error`: {
          console.error(message);
          break;
        }
        case `warn`: {
          console.warn(message);
          break;
        }
        case `info`: {
          console.info(message);
          break;
        }
        default: {
          console.log(message);
        }
      }
    };
  }
  return l;
};
var logColourCount = 0;
var logColours = getOrGenerateSync(/* @__PURE__ */ new Map(), () => {
  const hue = ++logColourCount * 137.508;
  return `hsl(${hue},50%,75%)`;
});

// src/flow/StateMachine.ts
var StateMachine_exports = {};
__export(StateMachine_exports, {
  WithEvents: () => StateMachineWithEvents,
  cloneState: () => cloneState,
  done: () => done,
  driver: () => init2,
  fromList: () => fromList$1,
  fromListBidirectional: () => fromListBidirectional,
  init: () => init$1,
  isValidTransition: () => isValidTransition,
  next: () => next$1,
  normaliseTargets: () => normaliseTargets,
  possible: () => possible,
  possibleTargets: () => possibleTargets,
  reset: () => reset,
  to: () => to$1,
  validateMachine: () => validateMachine,
  validateTransition: () => validateTransition
});

// src/flow/Execute.ts
var run$2 = async (expressions, opts = {}, args) => {
  const results = [];
  const compareFn = opts.rank ?? defaultComparer;
  let expressionsArray = Array.isArray(expressions) ? expressions : [expressions];
  if (opts.shuffle) expressionsArray = shuffle(expressionsArray);
  for (let i = 0; i < expressionsArray.length; i++) {
    const exp = expressionsArray[i];
    let r;
    if (typeof exp === "function") {
      r = await exp(args);
    } else {
      r = exp;
    }
    if (r !== void 0) {
      results.push(r);
      results.sort(compareFn);
    }
    if (typeof opts.stop !== "undefined") {
      if (opts.stop(r, results)) {
        break;
      }
    }
  }
  if (opts.filter) {
    return results.filter(opts.filter);
  }
  return results;
};
var runSingle = async (expressions, opts = {}, args) => {
  const results = await run$2(expressions, opts, args);
  if (!results) return;
  if (results.length === 0) return;
  const at = opts.at ?? -1;
  return results.at(at);
};

// src/flow/StateMachineDriver.ts
async function init2(machine, handlersOrOpts) {
  const opts = Array.isArray(handlersOrOpts) ? {
    handlers: handlersOrOpts
  } : handlersOrOpts;
  const debug = resolveLogOption(opts.debug, {
    category: `StateMachineDriver`
  });
  const byState = /* @__PURE__ */ new Map();
  for (const h of opts.handlers) {
    const ifBlock = Array.isArray(h.if) ? h.if : [h.if];
    for (const state of ifBlock) {
      if (typeof state !== `string`) {
        throw new TypeError(
          `Expected single or array of strings for the 'if' field. Got: '${typeof state}'.`
        );
      }
      if (byState.has(state)) {
        throw new Error(
          `Multiple handlers defined for state '${state}'. There should be at most one.`
        );
      }
      byState.set(state, h);
    }
  }
  const runOpts = {
    // Rank results by score
    rank: (a, b) => {
      return defaultComparer(a.score ?? 0, b.score ?? 0);
    },
    shuffle: opts.shuffleHandlers ?? false
  };
  let sm = init$1(machine);
  for (const [ifState] of byState) {
    if (typeof sm.machine[ifState] === `undefined` && ifState !== `__fallback`) {
      throw new Error(
        `StateMachineDriver handler references a state ('${ifState}') which is not defined on the machine. Therefore this handler will never run.'`
      );
    }
  }
  const run2 = async () => {
    debug(`Run. State: ${sm.value}`);
    const state = sm.value;
    let handler = byState.get(state);
    if (handler === void 0) {
      debug(`  No handler for state '${state}', trying __fallback`);
      handler = byState.get(`__fallback`);
    }
    if (handler === void 0) {
      debug(`  No __fallback handler`);
      return;
    }
    const runOptionsForHandler = handler.resultChoice === `first` ? {
      ...runOpts,
      stop: (latest) => {
        if (!latest) return false;
        if (`reset` in latest) return true;
        if (`next` in latest && latest.next !== void 0) return true;
        return false;
      }
    } : runOpts;
    const results = await run$2(
      handler.then,
      runOptionsForHandler,
      sm
    );
    debug(
      `  In state '${sm.value}' results: ${results.length}. Choice: ${handler.resultChoice}`
    );
    let r;
    switch (handler.resultChoice ?? `highest`) {
      case `highest`: {
        r = results.at(-1);
        break;
      }
      case `first`: {
        r = results[0];
        break;
      }
      case `lowest`: {
        r = results.at(0);
        break;
      }
      case `random`: {
        r = randomElement(results);
        break;
      }
      default: {
        throw new Error(
          `Unknown 'resultChoice' option: ${handler.resultChoice}. Expected highest, first, lowest or random`
        );
      }
    }
    debug(`  Chosen result: ${JSON.stringify(r)}`);
    if (r?.reset) {
      sm = reset(sm);
    } else if (r && r.next) {
      if (typeof r.next === `boolean`) {
        sm = next$1(sm);
      } else {
        debug(JSON.stringify(results));
        sm = to$1(sm, r.next);
      }
    }
    return sm;
  };
  return {
    reset: () => {
      sm = reset(sm);
    },
    getValue: () => sm.value,
    run: run2,
    to: (state) => {
      sm = to$1(sm, state);
      return sm;
    }
  };
}

// src/flow/StateMachineWithEvents.ts
var StateMachineWithEvents = class extends SimpleEventEmitter {
  #sm;
  #smInitial;
  #debug;
  #isDoneNeedsFiring = false;
  #isDone = false;
  #changedAt = infinity();
  /**
   * Create a state machine with initial state, description and options
   * @param m Machine description
   * @param opts Options for machine (defaults to `{debug:false}`)
   */
  constructor(m, opts = {}) {
    super();
    this.#debug = opts.debug ?? false;
    this.#sm = init$1(m, opts.initial);
    this.#smInitial = cloneState(this.#sm);
  }
  #setIsDone(v) {
    if (this.#isDone === v) return;
    this.#isDone = v;
    if (v) {
      this.#isDoneNeedsFiring = true;
      setTimeout(() => {
        if (!this.#isDoneNeedsFiring) return;
        this.#isDoneNeedsFiring = false;
        this.fireEvent(`stop`, { state: this.#sm.value });
      }, 2);
    } else {
      this.#isDoneNeedsFiring = false;
    }
  }
  /**
   * Return a list of possible states from current state.
   *
   * If list is empty, no states are possible. Otherwise lists
   * possible states, including 'null' for terminal
   */
  get statesPossible() {
    return possible(this.#sm);
  }
  /**
   * Return a list of all defined states
   */
  get statesDefined() {
    return Object.keys(this.#sm.machine);
  }
  /**
   * Moves to the next state if possible. If multiple states are possible, it will use the first.
   * If machine is finalised, no error is thrown and null is returned.
   *
   * @returns {(string|null)} Returns new state, or null if machine is finalised
   * @memberof StateMachine
   */
  next() {
    const p = possible(this.#sm);
    if (p.length === 0) return null;
    this.state = p[0];
    return p[0];
  }
  /**
   * Returns _true_ if state machine is in its final state
   *
   * @returns
   */
  get isDone() {
    return done(this.#sm);
  }
  /**
   * Resets machine to initial state
   */
  reset() {
    this.#setIsDone(false);
    this.#sm = cloneState(this.#smInitial);
    this.#changedAt = since();
  }
  /**
   * Throws if it's not valid to transition to `newState`
   * @param newState
   * @returns
   */
  validateTransition(newState) {
    validateTransition(this.#sm, newState);
  }
  /**
   * Returns _true_ if `newState` is valid transition from current state.
   * Use {@link validateTransition} if you want an explanation for the _false_ results.
   * @param newState
   * @returns
   */
  isValid(newState) {
    return isValidTransition(this.#sm, newState);
  }
  /**
   * Gets or sets state. Throws an error if an invalid transition is attempted.
   * Use `isValid()` to check validity without changing.
   *
   * If `newState` is the same as current state, the request is ignored silently.
   *
   * @memberof StateMachine
   */
  set state(newState) {
    const priorState = this.#sm.value;
    if (newState === this.#sm.value) return;
    this.#sm = to$1(this.#sm, newState);
    if (this.#debug) {
      console.log(`StateMachine: ${priorState} -> ${newState}`);
    }
    this.#changedAt = since();
    setTimeout(() => {
      this.fireEvent(`change`, { newState, priorState });
    }, 1);
    if (done(this.#sm)) this.#setIsDone(true);
  }
  get state() {
    return this.#sm.value;
  }
  /**
   * Returns timestamp when state was last changed.
   * See also `elapsed`
   */
  get changedAt() {
    return this.#changedAt();
  }
  /**
   * Returns milliseconds elapsed since last state change.
   * See also `changedAt`
   */
  get elapsed() {
    return this.#changedAt();
  }
};

// src/flow/StateMachine.ts
var cloneState = (toClone) => {
  return Object.freeze({
    value: toClone.value,
    visited: [...toClone.visited],
    machine: toClone.machine
  });
};
var init$1 = (stateMachine, initialState) => {
  const [machine, machineValidationError] = validateMachine(stateMachine);
  if (!machine) throw new Error(machineValidationError);
  const state = (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    initialState ?? Object.keys(machine.states)[0]
  );
  if (machine.states[state] === void 0) {
    throw new TypeError(`Initial state not found`);
  }
  const transitions = validateAndNormaliseTransitions(machine.states);
  if (transitions === void 0) {
    throw new Error(`Could not normalise transitions`);
  }
  return Object.freeze({
    value: state,
    visited: [],
    machine: Object.fromEntries(transitions)
  });
};
var reset = (sm) => {
  return init$1(sm.machine);
};
var validateMachine = (smOrTransitions) => {
  if (smOrTransitions === void 0) {
    return [void 0, `Parameter undefined`];
  }
  if (smOrTransitions === null) {
    return [void 0, `Parameter null`];
  }
  if (`states` in smOrTransitions) {
    return [smOrTransitions, ``];
  }
  if (typeof smOrTransitions === `object`) {
    return [
      {
        // @ts-expect-error
        states: smOrTransitions
      },
      ``
    ];
  }
  return [
    void 0,
    `Unexpected type: ${typeof smOrTransitions}. Expected object`
  ];
};
var done = (sm) => {
  return possible(sm).length === 0;
};
var possibleTargets = (sm) => {
  validateMachineState(sm);
  const fromS = sm.machine[sm.value];
  if (fromS.length === 1 && fromS[0].state === null) return [];
  return fromS;
};
var possible = (sm) => {
  const targets = possibleTargets(sm);
  return targets.map((v) => v.state);
};
var normaliseTargets = (targets) => {
  const normaliseSingleTarget = (target) => {
    if (target === null) return { state: null };
    if (typeof target === `string`) {
      return {
        state: target
      };
    } else if (typeof target === `object` && `state` in target) {
      const targetState = target.state;
      if (typeof targetState !== `string`) {
        throw new TypeError(
          `Target 'state' field is not a string. Got: ${typeof targetState}`
        );
      }
      if (`preconditions` in target) {
        return {
          state: targetState,
          preconditions: target.preconditions
        };
      }
      return { state: targetState };
    } else {
      throw new Error(
        `Unexpected type: ${typeof target}. Expected string or object with 'state' field.`
      );
    }
  };
  if (Array.isArray(targets)) {
    let containsNull = false;
    const mapResults = targets.map((t) => {
      const r = normaliseSingleTarget(t);
      if (!r) throw new Error(`Invalid target`);
      containsNull = containsNull || r.state === null;
      return r;
    });
    if (containsNull && mapResults.length > 1) {
      throw new Error(`Cannot have null as an possible state`);
    }
    return mapResults;
  } else {
    const target = normaliseSingleTarget(targets);
    if (!target) return;
    return [target];
  }
};
var validateAndNormaliseTransitions = (d) => {
  const returnMap = /* @__PURE__ */ new Map();
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    if (typeof topLevelState === `undefined`) {
      throw new TypeError(`Top-level undefined state`);
    }
    if (typeof topLevelTargets === `undefined`) {
      throw new TypeError(`Undefined target state for ${topLevelState}`);
    }
    if (returnMap.has(topLevelState)) {
      throw new Error(`State defined twice: ${topLevelState}`);
    }
    if (topLevelState.includes(` `)) {
      throw new Error(`State names cannot contain spaces`);
    }
    returnMap.set(topLevelState, []);
  }
  for (const [topLevelState, topLevelTargets] of Object.entries(d)) {
    const targets = normaliseTargets(topLevelTargets);
    if (targets === void 0) throw new Error(`Could not normalise target`);
    if (targets !== null) {
      const seenStates = /* @__PURE__ */ new Set();
      for (const target of targets) {
        if (seenStates.has(target.state)) {
          throw new Error(
            `Target state '${target.state}' already exists for '${topLevelState}'`
          );
        }
        seenStates.add(target.state);
        if (target.state === null) continue;
        if (!returnMap.has(target.state)) {
          throw new Error(
            `Target state '${target.state}' is not defined as a top-level state. Defined under: '${topLevelState}'`
          );
        }
      }
      returnMap.set(topLevelState, targets);
    }
  }
  return returnMap;
};
var validateMachineState = (state) => {
  if (state === void 0) {
    throw new TypeError(`Parameter 'state' is undefined`);
  }
  if (typeof state.value !== `string`) {
    throw new TypeError(`Existing state is not a string`);
  }
};
var to$1 = (sm, toState) => {
  validateMachineState(sm);
  validateTransition(sm, toState);
  return Object.freeze({
    value: toState,
    machine: sm.machine,
    visited: unique$1([sm.visited, [sm.value]])
  });
};
var next$1 = (sm) => {
  const first = possibleTargets(sm).at(0);
  if (!first || first.state === null) {
    throw new Error(
      `Not possible to move to a next state from '${sm.value}`
    );
  }
  return to$1(sm, first.state);
};
var isValidTransition = (sm, toState) => {
  try {
    validateTransition(sm, toState);
    return true;
  } catch {
    return false;
  }
};
var validateTransition = (sm, toState) => {
  if (toState === null) throw new Error(`Cannot transition to null state`);
  if (toState === void 0) {
    throw new Error(`Cannot transition to undefined state`);
  }
  if (typeof toState !== `string`) {
    throw new TypeError(
      `Parameter 'toState' should be a string. Got: ${typeof toState}`
    );
  }
  const p = possible(sm);
  if (p.length === 0) throw new Error(`Machine is in terminal state`);
  if (!p.includes(toState)) {
    throw new Error(
      `Target state '${toState}' not available at current state '${sm.value}'. Possible states: ${p.join(`, `)}`
    );
  }
};
var fromList$1 = (...states) => {
  const t = {};
  if (!Array.isArray(states)) throw new Error(`Expected array of strings`);
  if (states.length <= 2) throw new Error(`Expects at least two states`);
  for (let index = 0; index < states.length; index++) {
    const s = states[index];
    if (typeof s !== `string`) {
      throw new TypeError(
        `Expected array of strings. Got type '${typeof s}' at index ${index}`
      );
    }
    t[s] = index === states.length - 1 ? null : states[index + 1];
  }
  return t;
};
var fromListBidirectional = (...states) => {
  const t = {};
  if (!Array.isArray(states)) throw new Error(`Expected array of strings`);
  if (states.length < 2) throw new Error(`Expects at least two states`);
  for (const [index, s] of states.entries()) {
    if (typeof s !== `string`) {
      throw new TypeError(
        `Expected array of strings. Got type '${typeof s}' at index ${index}`
      );
    }
    t[s] = [];
  }
  for (let index = 0; index < states.length; index++) {
    const v = t[states[index]];
    if (index === states.length - 1) {
      if (states.length > 1) {
        v.push(states[index - 1]);
      } else {
        t[states[index]] = null;
      }
    } else {
      v.push(states[index + 1]);
      if (index > 0) v.push(states[index - 1]);
    }
  }
  return t;
};

// src/collections/queue/QueueFns.ts
var trimQueue = (opts, queue, toAdd) => {
  const potentialLength = queue.length + toAdd.length;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  const policy = opts.discardPolicy ?? `additions`;
  switch (policy) {
    case `additions`: {
      if (queue.length === 0) return toAdd.slice(0, toAdd.length - toRemove);
      if (queue.length === opts.capacity) {
        return queue;
      } else {
        return [...queue, ...toAdd.slice(0, toRemove - 1)];
      }
    }
    case `newer`: {
      if (toRemove >= queue.length) {
        if (queue.length === 0) {
          return [...toAdd.slice(0, capacity - 1), toAdd.at(-1)];
        }
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        const countToAdd = Math.max(1, toAdd.length - queue.length);
        const toAddFinal = toAdd.slice(toAdd.length - countToAdd, toAdd.length);
        const toKeep = queue.slice(0, Math.min(queue.length, capacity - 1));
        const t = [...toKeep, ...toAddFinal];
        return t;
      }
    }
    case `older`: {
      return [...queue, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown overflow policy ${policy}`);
    }
  }
};
var enqueue = (opts, queue, ...toAdd) => {
  if (opts === void 0) throw new Error(`opts parameter undefined`);
  const potentialLength = queue.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimQueue(opts, queue, toAdd) : [...queue, ...toAdd];
  if (opts.capacity && toReturn.length !== opts.capacity && overSize) {
    throw new Error(
      `Bug! Expected return to be at capacity. Return len: ${toReturn.length} capacity: ${opts.capacity} opts: ${JSON.stringify(opts)}`
    );
  }
  if (!opts.capacity && toReturn.length !== potentialLength) {
    throw new Error(
      `Bug! Return length not expected. Return len: ${toReturn.length} expected: ${potentialLength} opts: ${JSON.stringify(opts)}`
    );
  }
  return toReturn;
};
var dequeue = (opts, queue) => {
  if (queue.length === 0) throw new Error(`Queue is empty`);
  return queue.slice(1);
};
var peek$1 = (opts, queue) => queue[0];
var isEmpty$1 = (opts, queue) => queue.length === 0;
var isFull$1 = (opts, queue) => {
  if (opts.capacity) {
    return queue.length >= opts.capacity;
  }
  return false;
};

// src/collections/queue/QueueMutable.ts
var QueueMutable = class extends SimpleEventEmitter {
  opts;
  data;
  eq;
  constructor(opts = {}, data = []) {
    super();
    if (opts === void 0) throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.data = data;
    this.eq = opts.eq ?? isEqualDefault;
  }
  clear() {
    const copy = [...this.data];
    this.data = [];
    this.fireEvent(`removed`, { finalData: this.data, removed: copy });
    this.onClear();
  }
  /**
   * Called when all data is cleared
   */
  onClear() {
  }
  at(index) {
    if (index >= this.data.length) throw new Error(`Index outside bounds of queue`);
    const v = this.data.at(index);
    if (v === void 0) throw new Error(`Index appears to be outside range of queue`);
    return v;
  }
  enqueue(...toAdd) {
    this.data = enqueue(this.opts, this.data, ...toAdd);
    const length = this.data.length;
    this.onEnqueue(this.data, toAdd);
    return length;
  }
  onEnqueue(result, attemptedToAdd) {
    this.fireEvent(`enqueue`, { added: attemptedToAdd, finalData: result });
  }
  dequeue() {
    const v = peek$1(this.opts, this.data);
    if (v === void 0) return;
    this.data = dequeue(this.opts, this.data);
    this.fireEvent(`dequeue`, { removed: v, finalData: this.data });
    this.onRemoved([v], this.data);
    return v;
  }
  onRemoved(removed, finalData) {
    this.fireEvent(`removed`, { removed, finalData });
  }
  /**
   * Removes values that match `predicate`.
   * @param predicate 
   * @returns Returns number of items removed.
   */
  removeWhere(predicate) {
    const countPre = this.data.length;
    const toRemove = this.data.filter((v) => predicate(v));
    if (toRemove.length === 0) return 0;
    this.data = this.data.filter((element) => !predicate(element));
    this.onRemoved(toRemove, this.data);
    return countPre - this.data.length;
  }
  /**
  * Return a copy of the array
  * @returns 
  */
  toArray() {
    return [...this.data];
  }
  get isEmpty() {
    return isEmpty$1(this.opts, this.data);
  }
  get isFull() {
    return isFull$1(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
  get peek() {
    return peek$1(this.opts, this.data);
  }
};
function mutable$2(opts = {}, ...startingItems) {
  return new QueueMutable({ ...opts }, [...startingItems]);
}

// src/debug/GetErrorMessage.ts
var getErrorMessage = (ex) => {
  if (typeof ex === `string`) return ex;
  if (ex instanceof Error) {
    return ex.message;
  }
  return ex;
};

// src/flow/index.ts
var flow_exports = {};
__export(flow_exports, {
  DispatchList: () => DispatchList,
  Elapsed: () => Elapsed_exports,
  RequestResponseMatch: () => RequestResponseMatch,
  StateMachine: () => StateMachine_exports,
  SyncWait: () => SyncWait,
  TaskQueueMutable: () => TaskQueueMutable,
  WaitForValue: () => WaitForValue,
  backoffGenerator: () => backoffGenerator,
  continuously: () => continuously,
  debounce: () => debounce$2,
  delay: () => delay$1,
  delayLoop: () => delayLoop,
  everyNth: () => everyNth,
  forEach: () => forEach$1,
  forEachAsync: () => forEachAsync,
  frequencyTimer: () => frequencyTimer,
  frequencyTimerSource: () => frequencyTimerSource,
  hasElapsed: () => hasElapsed,
  interval: () => interval,
  intervalToMs: () => intervalToMs,
  isInterval: () => isInterval,
  iterateBreadth: () => iterateBreadth,
  iterateDepth: () => iterateDepth,
  msElapsedTimer: () => msElapsedTimer,
  promiseFromEvent: () => promiseFromEvent,
  promiseWithResolvers: () => promiseWithResolvers,
  rateMinimum: () => rateMinimum,
  relativeTimer: () => relativeTimer,
  repeat: () => repeat$2,
  repeatAwait: () => repeatAwait,
  retryFunction: () => retryFunction,
  retryTask: () => retryTask,
  run: () => run$2,
  runOnce: () => runOnce,
  runSingle: () => runSingle,
  singleItem: () => singleItem,
  sleep: () => sleep,
  sleepWhile: () => sleepWhile,
  throttle: () => throttle$1,
  ticksElapsedTimer: () => ticksElapsedTimer,
  timeout: () => timeout,
  updateOutdated: () => updateOutdated,
  waitFor: () => waitFor
});

// src/flow/BehaviourTree.ts
var getName = (t, defaultValue = ``) => {
  if (typeof t === `object` && `name` in t && t.name !== void 0) return t.name;
  return defaultValue;
};
function* iterateBreadth(t, pathPrefix) {
  if (typeof pathPrefix === `undefined`) {
    pathPrefix = getName(t);
  }
  for (const [index, n] of entries(t)) {
    yield [n, pathPrefix];
  }
  for (const [index, n] of entries(t)) {
    const name = getName(n, `?`);
    const prefix = pathPrefix.length > 0 ? pathPrefix + `.` + name : name;
    yield* iterateBreadth(n, prefix);
  }
}
function* iterateDepth(t, pathPrefix) {
  if (typeof pathPrefix === `undefined`) {
    pathPrefix = getName(t);
  }
  for (const [index, n] of entries(t)) {
    yield [n, pathPrefix];
    const name = getName(n, `?`);
    const prefix = pathPrefix.length > 0 ? pathPrefix + `.` + name : name;
    yield* iterateBreadth(n, prefix);
  }
}
function isSeqNode(n) {
  return n.seq !== void 0;
}
function isSelNode(n) {
  return n.sel !== void 0;
}
function* entries(n) {
  if (isSeqNode(n)) {
    yield* n.seq.entries();
  } else if (isSelNode(n)) {
    yield* n.sel.entries();
  } else if (typeof n === `string`) ; else {
    throw new TypeError(`Unexpected shape of node. seq/sel missing`);
  }
}

// src/flow/Continuously.ts
var continuously = (callback, interval2, opts = {}) => {
  let intervalMs = intervalToMs(interval2, 0);
  throwIntegerTest(intervalMs, `positive`, `interval`);
  const fireBeforeWait = opts.fireBeforeWait ?? false;
  const onStartCalled = opts.onStartCalled;
  const signal = opts.signal;
  let disposed = false;
  let runState = `idle`;
  let startCount = 0;
  let startCountTotal = 0;
  let startedAt = performance.now();
  let intervalUsed = interval2 ?? 0;
  let cancelled = false;
  let currentTimer;
  const deschedule = () => {
    if (currentTimer === void 0) return;
    globalThis.clearTimeout(currentTimer);
    currentTimer = void 0;
    startCount = 0;
    startedAt = Number.NaN;
  };
  const schedule = (scheduledCallback) => {
    if (intervalMs === 0) {
      if (typeof requestAnimationFrame === `undefined`) {
        currentTimer = globalThis.setTimeout(scheduledCallback, 0);
      } else {
        currentTimer = void 0;
        requestAnimationFrame(scheduledCallback);
      }
    } else {
      currentTimer = globalThis.setTimeout(scheduledCallback, intervalMs);
    }
  };
  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (runState === `idle`) return;
    runState = `idle`;
    deschedule();
  };
  const loop = async () => {
    if (signal?.aborted) {
      runState = `idle`;
    }
    if (runState === `idle`) return;
    runState = `running`;
    startCount++;
    startCountTotal++;
    const valueOrPromise = callback(startCount, performance.now() - startedAt);
    const value = typeof valueOrPromise === `object` ? await valueOrPromise : valueOrPromise;
    if (cancelled) {
      return;
    }
    runState = `scheduled`;
    if (value !== void 0 && !value) {
      cancel();
      return;
    }
    if (cancelled) return;
    schedule(loop);
  };
  const start = () => {
    if (disposed) throw new Error(`Disposed`);
    cancelled = false;
    if (onStartCalled !== void 0) {
      const doWhat = onStartCalled(startCount, performance.now() - startedAt);
      switch (doWhat) {
        case `cancel`: {
          cancel();
          return;
        }
        case `reset`: {
          reset();
          return;
        }
        case `dispose`: {
          disposed = true;
          cancel();
          return;
        }
      }
    }
    if (runState === `idle`) {
      startCount = 0;
      startedAt = performance.now();
      runState = `scheduled`;
      if (fireBeforeWait) {
        void loop();
      } else {
        schedule(loop);
      }
    }
  };
  const reset = () => {
    if (disposed) throw new Error(`Disposed`);
    cancelled = false;
    startCount = 0;
    startedAt = Number.NaN;
    if (runState !== `idle`) {
      cancel();
    }
    start();
  };
  return {
    start,
    reset,
    cancel,
    get interval() {
      return intervalUsed;
    },
    get runState() {
      return runState;
    },
    get startCountTotal() {
      return startCountTotal;
    },
    get startCount() {
      return startCount;
    },
    set interval(interval3) {
      const ms = intervalToMs(interval3, 0);
      throwIntegerTest(ms, `positive`, `interval`);
      intervalMs = ms;
      intervalUsed = interval3;
    },
    get isDisposed() {
      return disposed;
    },
    get elapsedMs() {
      return performance.now() - startedAt;
    }
  };
};

// src/flow/Timeout.ts
var timeout = (callback, interval2) => {
  if (callback === void 0) {
    throw new Error(`callback parameter is undefined`);
  }
  const intervalMs = intervalToMs(interval2);
  throwIntegerTest(intervalMs, `aboveZero`, `interval`);
  let timer;
  let startedAt = 0;
  let startCount = 0;
  let startCountTotal = 0;
  let state = `idle`;
  const clear = () => {
    startedAt = 0;
    globalThis.clearTimeout(timer);
    state = `idle`;
  };
  const start = async (altInterval = interval2, args) => {
    const p = new Promise((resolve, reject) => {
      startedAt = performance.now();
      const altTimeoutMs = intervalToMs(altInterval);
      const it = integerTest(altTimeoutMs, `aboveZero`, `altTimeoutMs`);
      if (!it[0]) {
        reject(new Error(it[1]));
        return;
      }
      switch (state) {
        case `scheduled`: {
          cancel();
          break;
        }
      }
      state = `scheduled`;
      timer = globalThis.setTimeout(async () => {
        if (state !== `scheduled`) {
          console.warn(`Timeout skipping execution since state is not 'scheduled'`);
          clear();
          return;
        }
        const args_ = args ?? [];
        startCount++;
        startCountTotal++;
        state = `running`;
        await callback(performance.now() - startedAt, ...args_);
        state = `idle`;
        clear();
        resolve();
      }, altTimeoutMs);
    });
    return p;
  };
  const cancel = () => {
    if (state === `idle`) return;
    clear();
  };
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    start,
    cancel,
    get runState() {
      return state;
    },
    get startCount() {
      return startCount;
    },
    get startCountTotal() {
      return startCountTotal;
    }
  };
};

// src/flow/Debounce.ts
var debounce$2 = (callback, interval2) => {
  const t = timeout(callback, interval2);
  return (...args) => {
    t.start(void 0, args);
  };
};

// src/flow/Sleep.ts
if (typeof window === `undefined` || !(`requestAnimationFrame` in window)) {
  if (typeof window === `undefined`) {
    globalThis.requestAnimationFrame = (callback) => {
      setTimeout(callback, 1);
    };
  }
}
var sleep = (optsOrMillis) => {
  const timeoutMs = intervalToMs(optsOrMillis, 1);
  const signal = optsOrMillis.signal;
  const value = optsOrMillis.value;
  throwNumberTest(timeoutMs, `positive`, `timeoutMs`);
  if (timeoutMs === 0) {
    return new Promise(
      (resolve) => requestAnimationFrame((_) => {
        resolve(value);
      })
    );
  } else {
    return new Promise((resolve, reject) => {
      const onAbortSignal = () => {
        clearTimeout(t);
        if (signal) {
          signal.removeEventListener(`abort`, onAbortSignal);
          reject(new Error(signal.reason));
        } else {
          reject(new Error(`Cancelled`));
        }
      };
      if (signal) {
        signal.addEventListener(`abort`, onAbortSignal);
      }
      const t = setTimeout(() => {
        signal?.removeEventListener(`abort`, onAbortSignal);
        if (signal?.aborted) {
          reject(new Error(signal.reason));
          return;
        }
        resolve(value);
      }, timeoutMs);
    });
  }
};
var sleepWhile = async (predicate, checkInterval = 100) => {
  while (predicate()) {
    await sleep(checkInterval);
  }
};

// src/flow/Delay.ts
var delay$1 = async (callback, optsOrMillis) => {
  const opts = typeof optsOrMillis === `number` ? { millis: optsOrMillis } : optsOrMillis;
  const delayWhen = opts.delay ?? `before`;
  if (delayWhen === `before` || delayWhen === `both`) {
    await sleep(opts);
  }
  const r = Promise.resolve(await callback());
  if (delayWhen === `after` || delayWhen === `both`) {
    await sleep(opts);
  }
  return r;
};
async function* delayAnimationLoop() {
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer = 0;
  const callback = () => {
    if (resolve) resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = globalThis.requestAnimationFrame(callback);
      const _ = await p;
      yield _;
    }
  } finally {
    if (resolve) resolve();
    globalThis.cancelAnimationFrame(timer);
  }
}
async function* delayLoop(timeout2) {
  const timeoutMs = intervalToMs(timeout2);
  if (typeof timeoutMs === `undefined`) throw new Error(`timeout is undefined`);
  if (timeoutMs < 0) throw new Error(`Timeout is less than zero`);
  if (timeoutMs === 0) return yield* delayAnimationLoop();
  let resolve;
  let p = new Promise((r) => resolve = r);
  let timer;
  const callback = () => {
    if (resolve) resolve();
    p = new Promise((r) => resolve = r);
  };
  try {
    while (true) {
      timer = globalThis.setTimeout(callback, timeoutMs);
      const _ = await p;
      yield _;
    }
  } finally {
    if (resolve) resolve();
    if (timer !== void 0) globalThis.clearTimeout(timer);
    timer = void 0;
  }
}

// src/flow/DispatchList.ts
var DispatchList = class {
  #handlers;
  #counter = 0;
  #id = Math.floor(Math.random() * 100);
  constructor() {
    this.#handlers = [];
  }
  /**
   * Returns _true_ if list is empty
   * @returns 
   */
  isEmpty() {
    return this.#handlers.length === 0;
  }
  /**
   * Adds a handler
   * @param handler 
   * @param options 
   * @returns 
   */
  add(handler, options = {}) {
    this.#counter++;
    const once = options.once ?? false;
    const wrap = {
      id: `${this.#id} - ${this.#counter}`,
      handler,
      once
    };
    this.#handlers.push(wrap);
    return wrap.id;
  }
  remove(id) {
    const length = this.#handlers.length;
    this.#handlers = this.#handlers.filter((handler) => handler.id !== id);
    return this.#handlers.length !== length;
  }
  notify(value) {
    for (const handler of this.#handlers) {
      handler.handler(value);
      if (handler.once) {
        this.remove(handler.id);
      }
    }
  }
  clear() {
    this.#handlers = [];
  }
};

// src/flow/Every.ts
var everyNth = (nth, callback) => {
  throwIntegerTest(nth, `positive`, `nth`);
  let counter = 0;
  return (data) => {
    counter++;
    if (counter === nth) {
      counter = 0;
      if (callback) callback(data);
      return true;
    }
    return false;
  };
};

// src/flow/ForEach.ts
var forEach$1 = (iterator, fn) => {
  for (const x of iterator) {
    const r = fn(x);
    if (typeof r === `boolean` && !r) break;
  }
};
var forEachAsync = async function(iterator, fn, intervalMs) {
  if (Array.isArray(iterator)) {
    for (const x of iterator) {
      const r = await fn(x);
      if (intervalMs) await sleep(intervalMs);
      if (typeof r === `boolean` && !r) break;
    }
  } else {
    for await (const x of iterator) {
      const r = await fn(x);
      if (intervalMs) await sleep(intervalMs);
      if (typeof r === `boolean` && !r) break;
    }
  }
};

// src/flow/Interval.ts
var interval = async function* (produce, optsOrFixedMs = {}) {
  const opts = typeof optsOrFixedMs === `number` ? { fixed: optsOrFixedMs } : optsOrFixedMs;
  const signal = opts.signal;
  const when = opts.delay ?? `before`;
  const minIntervalMs = opts.minimum ? intervalToMs(opts.minimum) : void 0;
  let cancelled = false;
  let sleepMs = intervalToMs(opts.fixed) ?? intervalToMs(opts.minimum, 0);
  let started = performance.now();
  const doDelay = async () => {
    const elapsed = performance.now() - started;
    if (typeof minIntervalMs !== `undefined`) {
      sleepMs = Math.max(0, minIntervalMs - elapsed);
    }
    if (sleepMs) {
      await sleep({ millis: sleepMs, signal });
    }
    started = performance.now();
    if (signal?.aborted) throw new Error(`Signal aborted ${signal.reason}`);
  };
  if (Array.isArray(produce)) produce = produce.values();
  const isGenerator = typeof produce === `object` && `next` in produce && typeof produce.next === `function`;
  try {
    while (!cancelled) {
      if (when === `before`) await doDelay();
      if (typeof produce === `function`) {
        const result = await produce();
        if (typeof result === `undefined`) return;
        yield result;
      } else if (isGenerator) {
        const result = await produce.next();
        if (result.done) return;
        yield result.value;
      } else {
        throw new Error(
          `produce param does not seem to return a value/Promise and is not a generator?`
        );
      }
      if (when === `after`) await doDelay();
    }
  } finally {
    cancelled = true;
  }
};

// src/flow/PromiseFromEvent.ts
var promiseFromEvent = (target, name) => {
  return new Promise((resolve) => {
    const handler = (...args) => {
      target.removeEventListener(name, handler);
      if (Array.isArray(args) && args.length === 1) resolve(args[0]);
      else resolve(args);
    };
    target.addEventListener(name, handler);
  });
};

// src/flow/PromiseWithResolvers.ts
function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise(
    (_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }
  );
  return { promise, resolve, reject };
}

// src/flow/RateMinimum.ts
var rateMinimum = (options) => {
  let disposed = false;
  const t = timeout(() => {
    if (disposed) return;
    t.start();
    options.whatToCall(options.fallback());
  }, options.interval);
  if (options.abort) {
    options.abort.addEventListener(`abort`, (_) => {
      disposed = true;
      t.cancel();
    });
  }
  t.start();
  return (args) => {
    if (disposed) throw new Error(`AbortSignal has been fired`);
    t.start();
    options.whatToCall(args);
  };
};

// src/flow/Repeat.ts
function repeatAwait(countOrPredicate, fn) {
  return typeof countOrPredicate === `number` ? repeatTimesAwaited(countOrPredicate, fn) : repeatWhileAwaited(countOrPredicate, fn);
}
function repeat$2(countOrPredicate, fn) {
  return typeof countOrPredicate === `number` ? repeatTimes(countOrPredicate, fn) : repeatWhile(countOrPredicate, fn);
}
async function* repeatWhileAwaited(predicate, fn) {
  let repeats = 0;
  let valuesProduced = 0;
  while (predicate(repeats, valuesProduced)) {
    repeats++;
    const v = await fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}
function* repeatWhile(predicate, fn) {
  let repeats = 0;
  let valuesProduced = 0;
  while (predicate(repeats, valuesProduced)) {
    repeats++;
    const v = fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}
async function* repeatTimesAwaited(count, fn) {
  throwNumberTest(count, `positive`, `count`);
  let valuesProduced = 0;
  let repeats = 0;
  while (count-- > 0) {
    repeats++;
    const v = await fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}
function* repeatTimes(count, fn) {
  throwNumberTest(count, `positive`, `count`);
  let valuesProduced = 0;
  let repeats = 0;
  while (count-- > 0) {
    repeats++;
    const v = fn(repeats, valuesProduced);
    if (v === void 0) continue;
    yield v;
    valuesProduced++;
  }
}

// src/flow/RequestResponseMatch.ts
var RequestResponseMatch = class extends SimpleEventEmitter {
  timeoutMs;
  whenUnmatchedResponse;
  keyRequest;
  keyResponse;
  #outgoing = /* @__PURE__ */ new Map();
  #maintainLoop;
  constructor(options = {}) {
    super();
    if (typeof window === `undefined`) {
      globalThis.window = {
        setTimeout,
        clearTimeout
      };
    }
    this.timeoutMs = options.timeoutMs ?? 1e3;
    this.whenUnmatchedResponse = options.whenUnmatchedResponse ?? `throw`;
    this.#maintainLoop = continuously(() => this.#maintain(), this.timeoutMs * 2);
    if (options.key) {
      if (options.keyRequest) throw new Error(`Cannot set 'keyRequest' when 'key' is set `);
      if (options.keyResponse) throw new Error(`Cannot set 'keyResponse' when 'key' is set `);
      this.keyRequest = options.key;
      this.keyResponse = options.key;
    } else {
      if (!options.keyRequest || !options.keyResponse) {
        throw new Error(`Expects 'keyRequest' & 'keyResponse' fields to be set if 'key' is not set`);
      }
      this.keyRequest = options.keyRequest;
      this.keyResponse = options.keyResponse;
    }
  }
  #maintain() {
    const values = [...this.#outgoing.values()];
    const now = Date.now();
    for (const v of values) {
      if (v.expiresAt <= now) {
        if (v.promiseReject) {
          v.promiseReject(`Request timeout`);
        }
        const callback = v.callback;
        if (callback) {
          setTimeout(() => {
            callback(true, `Request timeout`);
          }, 1);
        }
        this.fireEvent(`completed`, { request: v.req, response: `Request timeout`, success: false });
        this.#outgoing.delete(v.id);
      }
    }
    this.debugDump();
    return this.#outgoing.size > 0;
  }
  debugDump() {
    const values = [...this.#outgoing.values()];
    const now = Date.now();
    for (const v of values) {
      const expire = now - v.expiresAt;
      console.log(`${v.id} Expires in: ${Math.floor(expire / 1e3)}s`);
    }
  }
  /**
   * Makes a request.
   * If `callback` is set, it's equivalent to calling `requestCallback`.
   * If `callback` is not set, a promise is returned
   * @param request 
   * @param callback 
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  request(request, callback) {
    if (callback !== void 0) {
      this.#requestCallback(request, callback);
      return;
    }
    return this.#requestAwait(request);
  }
  /**
   * Make a request and don't wait for the outcome.
   * @param request 
   */
  requestAndForget(request) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const r = {
      expiresAt: Date.now() + this.timeoutMs,
      id,
      req: request
    };
    this.#outgoing.set(id, r);
    this.#maintainLoop.start();
  }
  /**
   * Make a request, returning a Promise for the outcome.
   * Errors will throw an exception.
   * @param request 
   * @returns 
   */
  #requestAwait(request) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const p = new Promise((resolve, reject) => {
      const r = {
        expiresAt: Date.now() + this.timeoutMs,
        id,
        req: request,
        promiseResolve: resolve,
        promiseReject: reject
      };
      this.#outgoing.set(id, r);
      this.#maintainLoop.start();
    });
    return p;
  }
  /**
   * Make a request, and get notified of outcome with a callback
   * @param request 
   * @param callback 
   */
  #requestCallback(request, callback) {
    const id = this.keyRequest(request);
    if (this.#outgoing.has(id)) throw new Error(`Already a request pending with id '${id}'`);
    const r = {
      expiresAt: Date.now() + this.timeoutMs,
      id,
      req: request,
      callback
    };
    this.#outgoing.set(id, r);
    this.#maintainLoop.start();
  }
  /**
   * Response has been received
   * @param response Response
   * @returns _True_ if response matched a request 
   */
  response(response, keepAlive) {
    const id = this.keyResponse(response);
    const request = this.#outgoing.get(id);
    if (!request) {
      if (this.whenUnmatchedResponse === `throw`) throw new Error(`Unmatched response with id: '${id}'`, { cause: response });
      return false;
    }
    if (keepAlive) {
      request.expiresAt = Date.now() + this.timeoutMs;
    } else {
      this.#outgoing.delete(id);
    }
    if (request.promiseResolve) {
      request.promiseResolve(response);
    }
    if (request.callback) {
      request.callback(false, response);
    }
    this.fireEvent(`match`, { request: request.req, response });
    if (!keepAlive) {
      this.fireEvent(`completed`, { request: request.req, response, success: true });
    }
    return true;
  }
};

// src/flow/Retry.ts
function* backoffGenerator(options = {}) {
  const startAt = options.startAt ?? 1;
  let limitAttempts = options.limitAttempts ?? Number.MAX_SAFE_INTEGER;
  const limitValue = options.limitValue;
  const power = options.power ?? 1.1;
  let value = startAt;
  throwIntegerTest(limitAttempts, `aboveZero`, `limitAttempts`);
  throwNumberTest(startAt, ``, `startAt`);
  throwNumberTest(limitAttempts, ``, `limitAttempts`);
  if (limitValue !== void 0) throwNumberTest(limitValue, ``, `limitValue`);
  throwNumberTest(power, ``, `power`);
  while (limitAttempts > 0) {
    if (limitValue && value >= limitValue) return;
    limitAttempts--;
    yield value;
    value += Math.pow(value, power);
  }
}
var retryFunction = (callback, opts = {}) => {
  const task = {
    async probe() {
      try {
        const v = await callback();
        if (v === void 0) return { value: opts.taskValueFallback, success: false };
        return { value: v, success: true };
      } catch (error) {
        return { success: false, message: getErrorMessage(error) };
      }
    }
  };
  return retryTask(task, opts);
};
var retryTask = async (task, opts = {}) => {
  const signal = opts.abort;
  const log = resolveLogOption(opts.log);
  const predelayMs = opts.predelayMs ?? 0;
  const startedAt = since();
  let attempts = 0;
  const initialValue = opts.startAt ?? 1e3;
  const limitAttempts = opts.limitAttempts ?? Number.MAX_SAFE_INTEGER;
  const backoffGen = backoffGenerator({ ...opts, startAt: initialValue, limitAttempts });
  if (initialValue <= 0) throw new Error(`Param 'initialValue' must be above zero`);
  if (predelayMs > 0) {
    try {
      await sleep({ millis: predelayMs, signal });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.taskValueFallback,
        elapsed: startedAt(),
        message: getErrorMessage(error)
      };
    }
  }
  for (const t of backoffGen) {
    attempts++;
    const result = await task.probe(attempts);
    if (result.success) {
      return { success: result.success, value: result.value, attempts, elapsed: startedAt() };
    }
    log({
      msg: `retry attempts: ${attempts} t: ${toString$2(t)}`
    });
    if (attempts >= limitAttempts) {
      break;
    }
    try {
      await sleep({ millis: t, signal });
    } catch (error) {
      return {
        success: false,
        attempts,
        value: opts.taskValueFallback,
        message: getErrorMessage(error),
        elapsed: startedAt()
      };
    }
  }
  return {
    message: `Giving up after ${attempts} attempts.`,
    success: false,
    attempts,
    value: opts.taskValueFallback,
    elapsed: startedAt()
  };
};

// src/flow/RunOnce.ts
var runOnce = (onRun) => {
  let run2 = false;
  let success = false;
  return () => {
    if (run2) return success;
    run2 = true;
    success = onRun();
    return success;
  };
};

// src/flow/SyncWait.ts
var SyncWait = class {
  #resolve;
  #reject;
  #promise;
  signal() {
    if (this.#resolve) {
      this.#resolve();
      this.#resolve = void 0;
    }
    this.#promise = Promise.resolve();
  }
  /**
   * Throw away any previous signalled state.
   * This will cause any currently waiters to throw
   */
  flush() {
    if (this.#reject) {
      this.#reject(`Flushed`);
      this.#reject = void 0;
    }
    this.#resolve = void 0;
    this.#promise = void 0;
  }
  #initPromise() {
    const p = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
    this.#promise = p;
    return p;
  }
  /**
   * Call with `await` to wait until .signal() happens.
   * If a wait period is specified, an exception is thrown if signal does not happen within this time.
   * @param maximumWaitMs 
   */
  async forSignal(maximumWaitMs) {
    let p = this.#promise;
    if (!p) p = this.#initPromise();
    if (maximumWaitMs) {
      const reject = this.#reject;
      setTimeout(() => {
        if (reject) {
          reject(`Timeout elapsed ${maximumWaitMs}`);
        }
      }, maximumWaitMs);
    }
    await p;
    this.#promise = void 0;
    this.#resolve = void 0;
    this.#reject = void 0;
  }
  /**
   * An alternative to {@link forSignal}, returning _true_
   * if signalled, or _false_ if wait period was exceeded 
   * 
   * ```js
   * const s = await sw.didSignal(5000);
   * ```
   * @param maximumWaitMs 
   * @returns 
   */
  async didSignal(maximumWaitMs) {
    try {
      await this.forSignal(maximumWaitMs);
      return true;
    } catch {
      return false;
    }
  }
};

// src/flow/TaskQueueMutable.ts
var TaskQueueMutable = class _TaskQueueMutable extends SimpleEventEmitter {
  static shared = new _TaskQueueMutable();
  _loop;
  _queue;
  constructor() {
    super();
    this._queue = mutable$2();
    this._loop = continuously(() => {
      return this.processQueue();
    }, 100);
  }
  /**
   * Adds a task. This triggers processing loop if not already started.
   *
   * ```js
   * queue.add(async () => {
   *  await sleep(1000);
   * });
   * ```
   * @param task Task to run
   */
  enqueue(task) {
    const length = this._queue.enqueue(task);
    if (this._loop.runState === `idle`) {
      this.fireEvent(`started`, {});
      this._loop.start();
    }
    return length;
  }
  dequeue() {
    return this._queue.dequeue();
  }
  async processQueue() {
    const task = this._queue.dequeue();
    if (task === void 0) {
      this.fireEvent(`empty`, {});
      return false;
    }
    try {
      await task();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Clears all tasks, and stops any scheduled processing.
   * Currently running tasks will continue.
   * @returns 
   */
  clear() {
    if (this._queue.length === 0) return;
    this._queue.clear();
    this._loop.cancel();
    this.fireEvent(`empty`, {});
  }
  /**
  * Returns true if queue is empty
  */
  get isEmpty() {
    return this._queue.isEmpty;
  }
  /**
   * Number of items in queue
   */
  get length() {
    return this._queue.length;
  }
};

// src/flow/Throttle.ts
var throttle$1 = (callback, intervalMinMs) => {
  let trigger = 0;
  return async (...args) => {
    const elapsed = performance.now() - trigger;
    if (elapsed >= intervalMinMs) {
      const r = callback(elapsed, ...args);
      if (typeof r === `object`) await r;
      trigger = performance.now();
    }
  };
};

// src/flow/UpdateOutdated.ts
var updateOutdated = (fn, interval2, updateFail = `slow`) => {
  let lastRun = 0;
  let lastValue;
  let intervalMsCurrent = intervalToMs(interval2, 1e3);
  return () => (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    new Promise(async (resolve, reject) => {
      const elapsed = performance.now() - lastRun;
      if (lastValue === void 0 || elapsed > intervalMsCurrent) {
        try {
          lastRun = performance.now();
          lastValue = await fn(elapsed);
          intervalMsCurrent = intervalToMs(interval2, 1e3);
        } catch (error) {
          if (updateFail === `fast`) {
            lastValue = void 0;
            lastRun = 0;
          } else if (updateFail === `backoff`) {
            intervalMsCurrent = Math.floor(intervalMsCurrent * 1.2);
          }
          reject(error);
          return;
        }
      }
      resolve(lastValue);
    })
  );
};

// src/flow/WaitFor.ts
var waitFor = (timeoutMs, onAborted, onComplete) => {
  let t;
  let success = false;
  const done = (error) => {
    if (t !== void 0) {
      window.clearTimeout(t);
      t = void 0;
    }
    if (error) {
      onAborted(error);
    } else {
      success = true;
    }
    if (onComplete !== void 0) onComplete(success);
  };
  t = globalThis.setTimeout(() => {
    t = void 0;
    try {
      onAborted(`Timeout after ${timeoutMs}ms`);
    } finally {
      if (onComplete !== void 0) onComplete(success);
    }
  }, timeoutMs);
  return done;
};

// src/flow/WaitForValue.ts
var WaitForValue = class {
  #promise;
  #resolve;
  #written = false;
  constructor() {
    const { promise, resolve } = promiseWithResolvers();
    this.#promise = promise;
    this.#resolve = resolve;
  }
  get() {
    return this.#promise;
  }
  add(value) {
    if (this.#written) throw new Error(`QueueSingleUse has already been used`);
    this.#written = true;
    this.#resolve(value);
  }
  /**
   * Returns _true_ if a value has been added
   * and therefore no more values can be written
   */
  get isUsed() {
    return this.#written;
  }
};
var singleItem = () => new WaitForValue();

// src/collections/arrays/ContainsDuplicateInstances.ts
var containsDuplicateInstances = (array) => {
  if (!Array.isArray(array)) throw new Error(`Parameter needs to be an array`);
  for (let index = 0; index < array.length; index++) {
    for (let x = 0; x < array.length; x++) {
      if (index === x) continue;
      if (array[index] === array[x]) return true;
    }
  }
  return false;
};

// src/iterables/sync/Slice.ts
function* slice(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.iterator]();
  for (; start > 0; start--, end--) iit.next();
  for (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}

// src/collections/arrays/GuardIndex.ts
var guardIndex = (array, index, name = `index`) => {
  guardArray(array);
  throwIntegerTest(index, `positive`, name);
  if (index > array.length - 1) {
    throw new Error(
      `'${name}' ${index} beyond array max of ${array.length - 1}`
    );
  }
};

// src/collections/arrays/Filter.ts
var withoutUndefined = (data) => {
  return data.filter((v) => v !== void 0);
};
var filterAB = (data, filter) => {
  const a = [];
  const b = [];
  for (const datum of data) {
    if (filter(datum)) a.push(datum);
    else b.push(datum);
  }
  return [a, b];
};
var filterBetween = (array, predicate, startIndex, endIndex) => {
  guardArray(array);
  if (typeof startIndex === `undefined`) startIndex = 0;
  if (typeof endIndex === `undefined`) endIndex = array.length;
  guardIndex(array, startIndex, `startIndex`);
  guardIndex(array, endIndex - 1, `endIndex`);
  const t = [];
  for (let index = startIndex; index < endIndex; index++) {
    if (predicate(array[index], index, array)) t.push(array[index]);
  }
  return t;
};
var without = (sourceArray, toRemove, comparer = isEqualDefault) => {
  if (Array.isArray(toRemove)) {
    const returnArray = [];
    for (const source of sourceArray) {
      if (!toRemove.some((v) => comparer(source, v))) {
        returnArray.push(source);
      }
    }
    return returnArray;
  } else {
    return sourceArray.filter((v) => !comparer(v, toRemove));
  }
};

// src/collections/tree/index.ts
var tree_exports = {};
__export(tree_exports, {
  FromObject: () => TraverseObject_exports,
  Mutable: () => TreeMutable_exports,
  Pathed: () => Pathed_exports$1,
  Traverse: () => TraversableTree_exports,
  compare: () => compare,
  isTraversable: () => isTraversable,
  isTreeNode: () => isTreeNode,
  toTraversable: () => toTraversable
});

// src/collections/tree/TraverseObject.ts
var TraverseObject_exports = {};
__export(TraverseObject_exports, {
  asDynamicTraversable: () => asDynamicTraversable2,
  children: () => children2,
  create: () => create$2,
  createSimplified: () => createSimplified,
  createWrapped: () => createWrapped,
  depthFirst: () => depthFirst2,
  getByPath: () => getByPath,
  prettyPrint: () => prettyPrint,
  prettyPrintEntries: () => prettyPrintEntries,
  toStringDeep: () => toStringDeep2,
  traceByPath: () => traceByPath
});

// src/iterables/IterableSync.ts
var IterableSync_exports = {};
__export(IterableSync_exports, {
  chunks: () => chunks$1,
  chunksOverlapping: () => chunksOverlapping,
  concat: () => concat,
  dropWhile: () => dropWhile,
  equals: () => equals,
  every: () => every,
  fill: () => fill,
  filter: () => filter$2,
  find: () => find,
  first: () => first,
  flatten: () => flatten$1,
  forEach: () => forEach,
  fromArray: () => fromArray,
  fromIterable: () => fromIterable,
  last: () => last,
  map: () => map,
  max: () => max,
  min: () => min$1,
  next: () => next,
  reduce: () => reduce,
  repeat: () => repeat$1,
  slice: () => slice,
  some: () => some,
  toArray: () => toArray$1,
  unique: () => unique,
  uniqueByValue: () => uniqueByValue,
  until: () => until$1,
  yieldNumber: () => yieldNumber,
  zip: () => zip$1
});

// src/iterables/Iterable.ts
var isAsyncIterable = (v) => Symbol.asyncIterator in new Object(v);
var isIterable = (v) => Symbol.iterator in new Object(v);
var fromEvent = (eventSource, eventType) => {
  const pullQueue = [];
  const pushQueue = [];
  let done = false;
  const pushValue = (args) => {
    if (pullQueue.length > 0) {
      const resolver = pullQueue.shift();
      resolver(...args);
    } else {
      pushQueue.push(args);
    }
  };
  const pullValue = () => new Promise((resolve) => {
    if (pushQueue.length > 0) {
      const arguments_ = pushQueue.shift();
      resolve(...arguments_);
    } else {
      pullQueue.push(resolve);
    }
  });
  const handler = (...arguments_) => {
    pushValue(arguments_);
  };
  eventSource.addEventListener(eventType, handler);
  const r = {
    next: async () => {
      if (done) return { done: true, value: void 0 };
      return {
        done: false,
        value: await pullValue()
      };
    },
    //eslint-disable-next-line @typescript-eslint/require-await
    return: async () => {
      done = true;
      eventSource.removeEventListener(eventType, handler);
      return { done: true, value: void 0 };
    },
    //eslint-disable-next-line @typescript-eslint/require-await
    throw: async (error) => {
      done = true;
      return {
        done: true,
        value: Promise.reject(new Error(error))
      };
    }
  };
  return r;
};

// src/iterables/sync/Reduce.ts
function reduce(it, f, start) {
  for (const v of it) start = f(start, v);
  return start;
}

// src/iterables/IterableSync.ts
function* uniqueByValue(input, toString3 = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for (const v of input) {
    const key = toString3(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
function yieldNumber(generator, defaultValue) {
  return () => {
    const v = generator.next().value;
    if (v === void 0) return defaultValue;
    return v;
  };
}
function first(it) {
  for (const value2 of it) {
    return value2;
  }
}
function last(it) {
  let returnValue;
  for (const value2 of it) {
    returnValue = value2;
  }
  return returnValue;
}
function* chunksOverlapping(it, size) {
  if (size <= 1) throw new Error(`Size should be at least 2`);
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [buffer.at(-1)];
    }
  }
  if (buffer.length <= 1) return;
  if (buffer.length > 0) yield buffer;
}
function* chunks$1(it, size) {
  let buffer = [];
  for (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
}
function* concat(...its) {
  for (const it of its) yield* it;
}
function* dropWhile(it, f) {
  for (const v of it) {
    if (!f(v)) {
      yield v;
    }
  }
}
var until$1 = (it, callback) => {
  for (const _ of it) {
    const value2 = callback();
    if (typeof value2 === `boolean` && !value2) break;
  }
};
var next = (it) => {
  return () => {
    const r = it.next();
    if (r.done) return;
    return r.value;
  };
};
function equals(it1, it2, equality) {
  while (true) {
    const index1 = it1.next(), index2 = it2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
function every(it, f) {
  for (const v of it) {
    const result = f(v);
    if (!result) return false;
  }
  return true;
}
function* fill(it, v) {
  for (const _ of it) yield v;
}
function forEach(it, f) {
  for (const v of it) {
    const result = f(v);
    if (typeof result === `boolean` && !result) break;
  }
}
function* filter$2(it, f) {
  for (const v of it) {
    if (!f(v)) continue;
    yield v;
  }
}
function find(it, f) {
  for (const v of it) {
    if (f(v)) return v;
  }
}
function* flatten$1(it) {
  for (const v of it) {
    if (typeof v === `object`) {
      if (Array.isArray(v)) {
        for (const vv of v) yield vv;
      } else if (isIterable(v)) {
        for (const vv of v) {
          yield vv;
        }
      }
    } else {
      yield v;
    }
  }
}
function* map(it, f) {
  for (const v of it) {
    yield f(v);
  }
}
function* max(it, gt = (a, b) => a > b) {
  let max2;
  for (const v of it) {
    if (max2 === void 0) {
      max2 = v;
      yield max2;
      continue;
    }
    if (gt(v, max2)) {
      max2 = v;
      yield max2;
    }
  }
  return max2;
}
function* min$1(it, gt = (a, b) => a > b) {
  let min2;
  for (const v of it) {
    if (min2 === void 0) {
      min2 = v;
      yield min2;
    }
    if (gt(min2, v)) {
      min2 = v;
      yield min2;
    }
  }
}
function some(it, f) {
  for (const v of it) {
    if (f(v)) return true;
  }
  return false;
}
function* repeat$1(genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count = repeats;
  while (true) {
    for (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count--;
      if (count === 0) break;
    }
    if (signal?.aborted) break;
  }
}
function* unique(iterable) {
  const buffer = [];
  let itera = [];
  itera = Array.isArray(iterable) ? iterable : [iterable];
  for (const it of itera) {
    for (const v of it) {
      if (buffer.includes(v)) continue;
      buffer.push(v);
      yield v;
    }
  }
}
function* zip$1(...its) {
  const iits = its.map((it) => it[Symbol.iterator]());
  while (true) {
    const vs = iits.map((it) => it.next());
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}
function* fromIterable(iterable) {
  for (const v of iterable) {
    yield v;
  }
}
function toArray$1(it, options = {}) {
  const result = [];
  const started = Date.now();
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  for (const v of it) {
    if (result.length >= maxItems) break;
    if (Date.now() - started > maxElapsed) break;
    result.push(v);
  }
  return result;
}
function* fromArray(array) {
  for (const v of array) {
    yield v;
  }
}

// src/collections/tree/TreeMutable.ts
var TreeMutable_exports = {};
__export(TreeMutable_exports, {
  add: () => add$2,
  addValue: () => addValue,
  asDynamicTraversable: () => asDynamicTraversable,
  breadthFirst: () => breadthFirst,
  children: () => children,
  childrenLength: () => childrenLength,
  compare: () => compare2,
  computeMaxDepth: () => computeMaxDepth,
  createNode: () => createNode,
  depthFirst: () => depthFirst,
  findAnyChildByValue: () => findAnyChildByValue,
  findChildByValue: () => findChildByValue,
  followValue: () => followValue,
  fromPlainObject: () => fromPlainObject,
  getRoot: () => getRoot,
  hasAnyChild: () => hasAnyChild,
  hasAnyParent: () => hasAnyParent,
  hasChild: () => hasChild,
  hasParent: () => hasParent,
  nodeDepth: () => nodeDepth,
  parents: () => parents,
  queryByValue: () => queryByValue,
  remove: () => remove$1,
  root: () => root,
  rootWrapped: () => rootWrapped,
  setChildren: () => setChildren,
  stripParentage: () => stripParentage,
  throwTreeTest: () => throwTreeTest,
  toStringDeep: () => toStringDeep,
  treeTest: () => treeTest,
  value: () => value,
  wrap: () => wrap
});

// src/collections/stack/StackFns.ts
var trimStack = (opts, stack, toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const policy = opts.discardPolicy ?? `additions`;
  const capacity = opts.capacity ?? potentialLength;
  const toRemove = potentialLength - capacity;
  if (opts.debug) {
    console.log(
      `Stack.push: stackLen: ${stack.length} potentialLen: ${potentialLength} toRemove: ${toRemove} policy: ${policy}`
    );
  }
  switch (policy) {
    case `additions`: {
      if (opts.debug) {
        console.log(
          `Stack.push:DiscardAdditions: stackLen: ${stack.length} slice: ${potentialLength - capacity} toAddLen: ${toAdd.length}`
        );
      }
      if (stack.length === opts.capacity) {
        return stack;
      } else {
        return [...stack, ...toAdd.slice(0, toAdd.length - toRemove)];
      }
    }
    case `newer`: {
      if (toRemove >= stack.length) {
        return toAdd.slice(
          Math.max(0, toAdd.length - capacity),
          Math.min(toAdd.length, capacity) + 1
        );
      } else {
        if (opts.debug) {
          console.log(` from orig: ${JSON.stringify(stack.slice(0, stack.length - toRemove))}`);
        }
        return [
          ...stack.slice(0, stack.length - toRemove),
          ...toAdd.slice(0, Math.min(toAdd.length, capacity - toRemove + 1))
        ];
      }
    }
    case `older`: {
      return [...stack, ...toAdd].slice(toRemove);
    }
    default: {
      throw new Error(`Unknown discard policy ${policy}`);
    }
  }
};
var push = (opts, stack, ...toAdd) => {
  const potentialLength = stack.length + toAdd.length;
  const overSize = opts.capacity && potentialLength > opts.capacity;
  const toReturn = overSize ? trimStack(opts, stack, toAdd) : [...stack, ...toAdd];
  return toReturn;
};
var pop = (opts, stack) => {
  if (stack.length === 0) throw new Error(`Stack is empty`);
  return stack.slice(0, -1);
};
var peek = (opts, stack) => stack.at(-1);
var isEmpty = (opts, stack) => stack.length === 0;
var isFull = (opts, stack) => {
  if (opts.capacity) {
    return stack.length >= opts.capacity;
  }
  return false;
};

// src/collections/stack/StackMutable.ts
var StackMutable = class {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  /**
   * Push data onto the stack.
   * If `toAdd` is empty, nothing happens
   * @param toAdd Data to add
   * @returns Length of stack
   */
  push(...toAdd) {
    if (toAdd.length === 0) return this.data.length;
    this.data = push(this.opts, this.data, ...toAdd);
    return this.data.length;
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  pop() {
    const v = peek(this.opts, this.data);
    this.data = pop(this.opts, this.data);
    return v;
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var mutable$1 = (opts = {}, ...startingItems) => new StackMutable({ ...opts }, [...startingItems]);

// src/collections/tree/Compare.ts
var compare = (a, b, eq = isEqualValueIgnoreOrder, parent) => {
  const valueEqual = valueOrIdentityEqual(a, b, eq);
  const childrenCompare = compareChildren(a, b, eq);
  const diff = {
    valueChanged: !valueEqual,
    a,
    b,
    added: childrenCompare.added,
    removed: childrenCompare.removed,
    childChanged: false
  };
  const diffNode = {
    value: diff,
    childrenStore: [],
    parent
  };
  const childrenDiff = childrenCompare.identical.map((c) => compare(c[0], c[1], eq, diffNode));
  const someChildChange = hasChange(diff) || childrenDiff.some((v) => hasChange(v.value));
  setChildren(diffNode, childrenDiff);
  diffNode.toString = () => toString(diffNode, 0);
  diffNode.value.childChanged = someChildChange;
  throwTreeTest(diffNode);
  return diffNode;
};
var hasChange = (vv) => {
  if (vv === void 0) return false;
  if (vv.valueChanged) return true;
  if (vv.childChanged) return true;
  if (vv.added.length > 0) return true;
  if (vv.removed.length > 0) return true;
  return false;
};
var compareChildren = (a, b, eq = isEqualValueIgnoreOrder) => {
  const childrenOfA = [...a.children()];
  const childrenOfB = [...b.children()];
  const identical = [];
  const removed = [];
  for (const childA of childrenOfA) {
    let foundIndex = -1;
    for (const [index, childOfB] of childrenOfB.entries()) {
      const d = valueOrIdentityEqual(childA, childOfB, eq);
      if (d) {
        identical.push([childA, childOfB]);
        foundIndex = index;
        break;
      }
    }
    if (foundIndex === -1) {
      removed.push(childA);
    } else {
      childrenOfB.splice(foundIndex, 1);
    }
  }
  const added = [...childrenOfB];
  return { added, identical, removed };
};
var valueOrIdentityEqual = (a, b, eq) => {
  if (a.getIdentity() === b.getIdentity()) return true;
  if (eq(a.getValue(), b.getValue())) return true;
  return false;
};
var toStringSingle = (n) => {
  return JSON.stringify(n.getValue());
};
var toString = (n, indent = 0) => {
  if (n === void 0) return `(undefined)`;
  let t = toStringDiff(n.value, indent);
  for (const c of n.childrenStore) {
    t += toString(c, indent + 2);
  }
  return t;
};
var toStringDiff = (n, indent) => {
  const spaces = ` `.repeat(indent);
  if (n === void 0) return `${spaces}(undefined)`;
  const t = [];
  t.push(`a: ${toStringSingle(n.a)} b: ${toStringSingle(n.b)}`);
  if (n.valueChanged) t.push(`Value changed. Child changed: ${n.childChanged}`);
  else t.push(`Value unchanged. Child changed: ${n.childChanged}`);
  if (n.added.length > 0) {
    t.push(`Added:`);
    for (const c of n.added) {
      t.push(` - ` + toStringSingle(c));
    }
  }
  if (n.removed.length > 0) {
    t.push(`Removed: ${n.removed.length}`);
    for (const c of n.removed) {
      t.push(` - ` + toStringSingle(c));
    }
  }
  t.push(`----
`);
  return t.map((line) => spaces + line).join(`
`);
};

// src/collections/tree/TreeMutable.ts
var compare2 = (a, b, eq) => {
  return compare(asDynamicTraversable(a), asDynamicTraversable(b), eq);
};
var stripParentage = (node) => {
  const n = {
    value: node.value,
    childrenStore: node.childrenStore.map((c) => stripParentage(c))
  };
  return n;
};
var unwrapped = (node) => `wraps` in node ? node.wraps : node;
var wrapped = (node) => `wraps` in node ? node : wrap(node);
var wrap = (n) => {
  return {
    *children() {
      for (const c of n.childrenStore) {
        yield wrap(c);
      }
    },
    getValue: () => n.value,
    getIdentity: () => n,
    *queryValue(value2) {
      for (const v of queryByValue(value2, unwrapped(n))) {
        yield wrap(v);
      }
    },
    getParent: () => n.parent === void 0 ? void 0 : wrap(n.parent),
    hasParent: (parent) => {
      return hasParent(n, unwrapped(parent));
    },
    hasAnyParent: (parent) => {
      return hasAnyParent(n, unwrapped(parent));
    },
    hasChild: (child) => {
      return hasChild(unwrapped(child), n);
    },
    hasAnyChild: (child) => {
      return hasAnyChild(unwrapped(child), n);
    },
    remove: () => {
      remove$1(n);
    },
    addValue: (value2) => {
      const nodeValue = addValue(value2, n);
      return wrap(nodeValue);
    },
    add: (child) => {
      add$2(unwrapped(child), n);
      return wrapped(child);
    },
    wraps: n
  };
};
var remove$1 = (child) => {
  const p = child.parent;
  if (p === void 0) return;
  child.parent = void 0;
  p.childrenStore = without(p.childrenStore, child);
};
function* depthFirst(node) {
  if (!root) return;
  const stack = new StackMutable();
  stack.push(...node.childrenStore);
  let entry = stack.pop();
  while (entry) {
    yield entry;
    if (entry) {
      stack.push(...entry.childrenStore);
    }
    if (stack.isEmpty) break;
    entry = stack.pop();
  }
}
function* breadthFirst(node) {
  if (!node) return;
  const queue = new QueueMutable();
  queue.enqueue(...node.childrenStore);
  let entry = queue.dequeue();
  while (entry) {
    yield entry;
    if (entry) {
      queue.enqueue(...entry.childrenStore);
    }
    if (queue.isEmpty) break;
    entry = queue.dequeue();
  }
}
function treeTest(root2, seen = []) {
  if (root2.parent === root2) return [false, `Root has itself as parent`, root2];
  if (seen.includes(root2)) return [false, `Same node instance is appearing further in tree`, root2];
  seen.push(root2);
  if (containsDuplicateInstances(root2.childrenStore)) return [false, `Children list contains duplicates`, root2];
  for (const c of root2.childrenStore) {
    if (c.parent !== root2) return [false, `Member of childrenStore does not have .parent set`, c];
    if (hasAnyChild(root2, c)) return [false, `Child has parent as its own child`, c];
    const v = treeTest(c, seen);
    if (!v[0]) return v;
  }
  return [true, ``, root2];
}
function throwTreeTest(root2) {
  const v = treeTest(root2);
  if (v[0]) return;
  throw new Error(`${v[1]} Node: ${toStringAbbreviate(v[2].value, 30)}`, { cause: v[2] });
}
function* children(root2) {
  for (const c of root2.childrenStore) {
    yield c;
  }
}
function* parents(root2) {
  let p = root2.parent;
  while (p) {
    yield p;
    p = p.parent;
  }
}
function nodeDepth(node) {
  const p = [...parents(node)];
  return p.length;
}
var hasChild = (child, parent) => {
  for (const c of parent.childrenStore) {
    if (c === child) return true;
  }
  return false;
};
var findChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value)) return c;
  }
};
function* queryByValue(value2, parent, eq = isEqualDefault) {
  for (const c of parent.childrenStore) {
    if (eq(value2, c.value)) yield c;
  }
}
var hasAnyChild = (prospectiveChild, parent) => {
  for (const c of breadthFirst(parent)) {
    if (c === prospectiveChild) return true;
  }
  return false;
};
var findAnyChildByValue = (value2, parent, eq = isEqualDefault) => {
  for (const c of breadthFirst(parent)) {
    if (eq(c.value, value2)) return c;
  }
};
var getRoot = (node) => {
  if (node.parent) return getRoot(node.parent);
  return node;
};
var hasAnyParent = (child, prospectiveParent) => {
  for (const p of parents(child)) {
    if (p === prospectiveParent) return true;
  }
  return false;
};
var hasParent = (child, prospectiveParent) => {
  return child.parent === prospectiveParent;
};
var computeMaxDepth = (node) => {
  return computeMaxDepthImpl(node, 0);
};
var computeMaxDepthImpl = (node, startingDepth = 0) => {
  let depth = startingDepth;
  for (const c of node.childrenStore) {
    depth = Math.max(depth, computeMaxDepthImpl(c, startingDepth + 1));
  }
  return depth;
};
var add$2 = (child, parent) => {
  throwAttemptedChild(child, parent);
  const p = child.parent;
  parent.childrenStore = [...parent.childrenStore, child];
  child.parent = parent;
  if (p) {
    p.childrenStore = without(p.childrenStore, child);
  }
};
var addValue = (value2, parent) => {
  return createNode(value2, parent);
};
var root = (value2) => {
  return createNode(value2);
};
var fromPlainObject = (value2, label = ``, parent, seen = []) => {
  const entries = Object.entries(value2);
  parent = parent === void 0 ? root() : addValue({ label, value: value2 }, parent);
  for (const entry of entries) {
    const value3 = entry[1];
    if (seen.includes(value3)) continue;
    seen.push(value3);
    if (typeof entry[1] === `object`) {
      fromPlainObject(value3, entry[0], parent, seen);
    } else {
      addValue({ label: entry[0], value: value3 }, parent);
    }
  }
  return parent;
};
var rootWrapped = (value2) => {
  return wrap(createNode(value2));
};
var createNode = (value2, parent) => {
  const n = {
    childrenStore: [],
    parent,
    value: value2
  };
  if (parent !== void 0) {
    parent.childrenStore = [...parent.childrenStore, n];
  }
  return n;
};
var childrenLength = (node) => {
  return node.childrenStore.length;
};
var value = (node) => {
  return node.value;
};
var asDynamicTraversable = (node) => {
  const t = {
    *children() {
      for (const c of node.childrenStore) {
        yield asDynamicTraversable(c);
      }
    },
    getParent() {
      if (node.parent === void 0) return;
      return asDynamicTraversable(node.parent);
    },
    getValue() {
      return node.value;
    },
    getIdentity() {
      return node;
    }
  };
  return t;
};
var throwAttemptedChild = (c, parent) => {
  if (parent === c) throw new Error(`Cannot add self as child`);
  if (c.parent === parent) return;
  if (hasAnyParent(parent, c)) throw new Error(`Child contains parent (1)`, { cause: c });
  if (hasAnyParent(c, parent)) throw new Error(`Parent already contains child`, { cause: c });
  if (hasAnyChild(parent, c)) throw new Error(`Child contains parent (2)`, { cause: c });
};
var setChildren = (parent, children3) => {
  for (const c of children3) {
    throwAttemptedChild(c, parent);
  }
  parent.childrenStore = [...children3];
  for (const c of children3) {
    c.parent = parent;
  }
};
var toStringDeep = (node, indent = 0) => {
  const t = `${`  `.repeat(indent)} + ${node.value ? JSON.stringify(node.value) : `-`}`;
  return node.childrenStore.length > 0 ? t + `
` + node.childrenStore.map((d) => toStringDeep(d, indent + 1)).join(`
`) : t;
};
function* followValue(root2, continuePredicate, depth = 1) {
  for (const c of root2.childrenStore) {
    const value2 = c.value;
    if (value2 === void 0) continue;
    if (continuePredicate(value2, depth)) {
      yield c.value;
      yield* followValue(c, continuePredicate, depth + 1);
    }
  }
}

// src/IsPrimitive.ts
function isPrimitive(value2) {
  if (typeof value2 === `number`) return true;
  if (typeof value2 === `string`) return true;
  if (typeof value2 === `bigint`) return true;
  if (typeof value2 === `boolean`) return true;
  return false;
}

// src/collections/tree/TraverseObject.ts
function prettyPrintEntries(entries) {
  if (entries.length === 0) return `(empty)`;
  let t = ``;
  for (const [index, entry] of entries.entries()) {
    t += `  `.repeat(index);
    t += entry.name + ` = ` + JSON.stringify(entry.nodeValue) + `
`;
  }
  return t;
}
var prettyPrint = (node, indent = 0, options = {}) => {
  throwNullUndef(node, `node`);
  const defaultName = options.name ?? `node`;
  const entry = getNamedEntry(node, defaultName);
  const t = `${`  `.repeat(indent)} + name: ${entry.name} value: ${JSON.stringify(entry.nodeValue)}`;
  const childrenAsArray = [...children2(node, options)];
  return childrenAsArray.length > 0 ? t + `
` + childrenAsArray.map((d) => prettyPrint(d.nodeValue, indent + 1, { ...options, name: d.name })).join(`
`) : t;
};
var toStringDeep2 = (node, indent = 0) => {
  let t = ` `.repeat(indent) + ` ${node.value?.name}`;
  if (node.value !== void 0) {
    if (`sourceValue` in node.value && `nodeValue` in node.value) {
      let sourceValue = toStringAbbreviate(node.value?.sourceValue, 20);
      const nodeValue = toStringAbbreviate(node.value?.nodeValue, 20);
      sourceValue = sourceValue === nodeValue ? `` : `source: ` + sourceValue;
      t += ` = ${nodeValue} ${sourceValue}`;
    } else if (`value` in node.value && node.value.value !== void 0) t += ` = ${node.value.value}`;
    if (`ancestors` in node.value) {
      t += ` (ancestors: ${node.value.ancestors.join(`, `)})`;
    }
  }
  t += `
`;
  for (const c of node.childrenStore) {
    t += toStringDeep2(c, indent + 1);
  }
  return t;
};
function* children2(node, options = {}) {
  throwNullUndef(node, `node`);
  const filter2 = options.filter ?? `none`;
  const filterByValue = (v) => {
    if (filter2 === `none`) return [true, isPrimitive(v)];
    else if (filter2 === `leaves` && isPrimitive(v)) return [true, true];
    else if (filter2 === `branches` && !isPrimitive(v)) return [true, false];
    return [false, isPrimitive(v)];
  };
  if (Array.isArray(node)) {
    for (const [index, element] of node.entries()) {
      const f = filterByValue(element);
      if (f[0]) {
        yield { name: index.toString(), sourceValue: element, nodeValue: f[1] ? element : void 0 };
      }
    }
  } else if (typeof node === `object`) {
    const entriesIter = `entries` in node ? node.entries() : Object.entries(node);
    for (const [name, value2] of entriesIter) {
      const f = filterByValue(value2);
      if (f[0]) {
        yield { name, sourceValue: value2, nodeValue: f[1] ? value2 : void 0 };
      }
    }
  }
}
function* depthFirst2(node, options = {}, ancestors = []) {
  for (const c of children2(node, options)) {
    yield { ...c, ancestors: [...ancestors] };
    yield* depthFirst2(c.sourceValue, options, [...ancestors, c.name]);
  }
}
function childByName(name, node) {
  for (const d of children2(node)) {
    if (d.name === name) return d;
  }
}
function getByPath(path, node, opts = {}) {
  const v = last(traceByPath(path, node, opts));
  if (!v) throw new Error(`Could not trace path: ${path} `);
  return v;
}
function* traceByPath(path, node, opts = {}) {
  throwNullUndef(path, `path`);
  throwNullUndef(node, `node`);
  const separator = opts.separator ?? `.`;
  const pathSplit = path.split(separator);
  const ancestors = [];
  for (const p of pathSplit) {
    const entry = childByName(p, node);
    if (!entry) {
      yield { name: p, sourceValue: void 0, nodeValue: void 0, ancestors };
      return;
    }
    node = entry.sourceValue;
    yield { ...entry, ancestors: [...ancestors] };
    ancestors.push(p);
  }
}
var asDynamicTraversable2 = (node, options = {}, ancestors = [], parent) => {
  const name = options.name ?? `object`;
  const t = {
    *children() {
      for (const c of children2(node, options)) {
        yield asDynamicTraversable2(c.sourceValue, { ...options, name: c.name }, [...ancestors, name], t);
      }
    },
    getParent() {
      return parent;
    },
    getValue() {
      return { name, value: node, ancestors };
    },
    getIdentity() {
      return node;
    }
  };
  return t;
};
var createWrapped = (node, options) => {
  return wrap(create$2(node, options));
};
var create$2 = (node, options = {}) => {
  const valuesAtLeaves = options.valuesAtLeaves ?? false;
  const valueFor = valuesAtLeaves ? (v) => {
    if (isPrimitive(v)) return v;
  } : (v) => v;
  return createImpl(node, valueFor(node), options, []);
};
var createImpl = (sourceValue, nodeValue, options = {}, ancestors) => {
  const defaultName = options.name ?? `object_ci`;
  const r = root({ name: defaultName, value: nodeValue, ancestors: [...ancestors] });
  ancestors = [...ancestors, defaultName];
  for (const c of children2(sourceValue, options)) {
    const v = options.valuesAtLeaves ? c.nodeValue : c.sourceValue;
    add$2(createImpl(c.sourceValue, v, { ...options, name: c.name }, ancestors), r);
  }
  return r;
};
var createSimplified = (node, options = {}) => {
  return stripParentage(create$2(node, options));
};
function getNamedEntry(node, defaultName = ``) {
  if (`name` in node && `nodeValue` in node && `sourceValue` in node) return node;
  if (`name` in node) {
    return { name: node.name, nodeValue: node, sourceValue: node };
  }
  return { name: defaultName, nodeValue: node, sourceValue: node };
}

// src/collections/tree/Pathed.ts
var Pathed_exports$1 = {};
__export(Pathed_exports$1, {
  addValueByPath: () => addValueByPath,
  childrenLengthByPath: () => childrenLengthByPath,
  clearValuesByPath: () => clearValuesByPath,
  create: () => create2$1,
  removeByPath: () => removeByPath,
  valueByPath: () => valueByPath,
  valuesByPath: () => valuesByPath
});
var create2$1 = (pathOpts = {}) => {
  let root2;
  const add2 = (value2, path) => {
    const n = addValueByPath(value2, path, root2, pathOpts);
    if (root2 === void 0) {
      root2 = getRoot(n);
    }
  };
  const prettyPrint2 = () => {
    if (root2 === void 0) return `(empty)`;
    return toStringDeep(root2);
  };
  const getValue = (path) => {
    if (root2 === void 0) return;
    return valueByPath(path, root2, pathOpts);
  };
  const remove2 = (path) => {
    if (root2 === void 0) return false;
    return removeByPath(path, root2, pathOpts);
  };
  const hasPath = (path) => {
    if (root2 === void 0) return false;
    const c = findChildByPath(path, root2, pathOpts);
    return c !== void 0;
  };
  const getNode = (path) => {
    if (root2 === void 0) return;
    const c = findChildByPath(path, root2, pathOpts);
    return c;
  };
  const childrenLength3 = (path) => {
    if (root2 === void 0) return 0;
    const c = findChildByPath(path, root2, pathOpts);
    if (c === void 0) return 0;
    return c.childrenStore.length;
  };
  const getValues = (path) => {
    if (root2 === void 0) return [];
    return valuesByPath(path, root2, pathOpts);
  };
  const clearValues = (path) => {
    if (root2 === void 0) return false;
    return clearValuesByPath(path, root2, pathOpts);
  };
  return { add: add2, prettyPrint: prettyPrint2, remove: remove2, getValue, getValues, hasPath, childrenLength: childrenLength3, getNode, clearValues };
};
var addValueByPath = (value2, path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const duplicatePath = pathOpts.duplicates ?? `overwrite`;
  const split = path.split(separator);
  let count = 0;
  for (const p of split) {
    const lastEntry = count === split.length - 1;
    const found = findChildByLabel(p, node);
    if (found === void 0) {
      const labelled = {
        value: lastEntry ? value2 : void 0,
        label: p
      };
      node = createNode(labelled, node);
    } else {
      node = found;
      if (lastEntry) {
        switch (duplicatePath) {
          case `ignore`: {
            break;
          }
          case `allow`: {
            const existing = getValuesFromNode(node);
            node.value = {
              values: [...existing, value2],
              label: p
            };
            break;
          }
          case `overwrite`: {
            node.value = {
              value: value2,
              label: p
            };
            break;
          }
        }
      } else {
        node = found;
      }
    }
    count++;
  }
  if (node === void 0) throw new Error(`Could not create tree`);
  return node;
};
var removeByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0) return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0) return false;
  remove$1(c);
  return true;
};
var clearValuesByPath = (path, root2, pathOpts = {}) => {
  if (root2 === void 0) return false;
  const c = findChildByPath(path, root2, pathOpts);
  if (c === void 0) return false;
  c.value = {
    label: c.value?.label ?? ``,
    value: void 0
  };
  return true;
};
var childrenLengthByPath = (path, node, pathOpts = {}) => {
  if (node === void 0) return 0;
  const c = findChildByPath(path, node, pathOpts);
  if (c === void 0) return 0;
  return c.childrenStore.length;
};
var findChildByLabel = (label, node) => {
  if (node === void 0) return void 0;
  if (label === void 0) throw new Error(`Parameter 'label' cannot be undefined`);
  if (node.value?.label === label) return node;
  for (const c of node.childrenStore) {
    if (c.value?.label === label) return c;
  }
};
var valueByPath = (path, node, pathOpts = {}) => {
  const values = valuesByPath(path, node, pathOpts);
  if (values.length === 0) return void 0;
  if (values.length > 1) throw new Error(`Multiple values at path. Use getValues instead`);
  return values[0];
};
var getValuesFromNode = (c) => {
  if (c.value === void 0) return [];
  if (`values` in c.value) return c.value.values;
  if (`value` in c.value) {
    if (c.value.value === void 0) return [];
    return [c.value.value];
  }
  return [];
};
var findChildByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) {
      return;
    }
  }
  return c;
};
var valuesByPath = (path, node, pathOpts = {}) => {
  const separator = pathOpts.separator ?? `.`;
  const split = path.split(separator);
  let c = node;
  for (const p of split) {
    c = findChildByLabel(p, c);
    if (c === void 0) {
      return [];
    }
  }
  return getValuesFromNode(c);
};

// src/collections/tree/TraversableTree.ts
var TraversableTree_exports = {};
__export(TraversableTree_exports, {
  breadthFirst: () => breadthFirst2,
  childrenLength: () => childrenLength2,
  couldAddChild: () => couldAddChild,
  depthFirst: () => depthFirst3,
  find: () => find2$1,
  findAnyChildByValue: () => findAnyChildByValue2,
  findAnyParentByValue: () => findAnyParentByValue,
  findByValue: () => findByValue,
  findChildByValue: () => findChildByValue2,
  findParentByValue: () => findParentByValue,
  followValue: () => followValue2,
  hasAnyChild: () => hasAnyChild2,
  hasAnyChildValue: () => hasAnyChildValue,
  hasAnyParent: () => hasAnyParent2,
  hasAnyParentValue: () => hasAnyParentValue,
  hasChild: () => hasChild2,
  hasChildValue: () => hasChildValue,
  hasParent: () => hasParent2,
  hasParentValue: () => hasParentValue,
  parents: () => parents2,
  siblings: () => siblings,
  toString: () => toString2,
  toStringDeep: () => toStringDeep3
});
var childrenLength2 = (tree) => {
  return [...tree.children()].length;
};
var hasAnyParent2 = (child, possibleParent, eq) => {
  return hasParent2(child, possibleParent, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyParentValue = (child, possibleParentValue, eq) => {
  return hasParentValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var findAnyParentByValue = (child, possibleParentValue, eq) => {
  return findParentByValue(child, possibleParentValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasParent2 = (child, possibleParent, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  const p = child.getParent();
  if (p === void 0) return false;
  if (eq(p, possibleParent)) return true;
  if (eq(p.getIdentity(), possibleParent.getIdentity())) return true;
  return hasParent2(p, possibleParent, eq, maxDepth - 1);
};
var hasParentValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  const p = child.getParent();
  if (p === void 0) return false;
  if (eq(p.getValue(), possibleParentValue)) return true;
  return hasParentValue(p, possibleParentValue, eq, maxDepth - 1);
};
var findParentByValue = (child, possibleParentValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return;
  const p = child.getParent();
  if (p === void 0) return;
  if (eq(p.getValue(), possibleParentValue)) return p;
  return findParentByValue(p, possibleParentValue, eq, maxDepth - 1);
};
var couldAddChild = (parent, prospectiveChild, eq = isEqualDefault) => {
  if (eq(parent, prospectiveChild)) throw new Error(`Child equals parent`);
  if (hasAnyChild2(parent, prospectiveChild, eq)) {
    throw new Error(`Circular. Parent already has child`);
  }
  if (hasAnyChild2(prospectiveChild, parent, eq)) {
    throw new Error(`Prospective child has parent as child relation`);
  }
};
var hasAnyChild2 = (parent, possibleChild, eq = isEqualDefault) => {
  return hasChild2(parent, possibleChild, eq, Number.MAX_SAFE_INTEGER);
};
var hasAnyChildValue = (parent, possibleChildValue, eq = isEqualDefault) => {
  return hasChildValue(parent, possibleChildValue, eq, Number.MAX_SAFE_INTEGER);
};
var hasChild2 = (parent, possibleChild, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent, possibleChild)) return true;
  if (eq(parent.getIdentity(), possibleChild.getIdentity())) return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c, possibleChild)) return true;
    if (eq(c.getIdentity(), possibleChild.getIdentity())) return true;
  }
  return false;
};
var hasChildValue = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return false;
  if (eq(parent.getValue(), possibleValue)) return true;
  for (const c of breadthFirst2(parent, maxDepth)) {
    if (eq(c.getValue(), possibleValue)) return true;
  }
  return false;
};
function* siblings(node) {
  const p = node.getParent();
  if (p === void 0) return;
  for (const s of p.children()) {
    if (s === node) continue;
    yield s;
  }
}
function* parents2(node) {
  let p = node.getParent();
  while (p !== void 0) {
    yield p;
    p = p.getParent();
  }
}
var findAnyChildByValue2 = (parent, possibleValue, eq = isEqualDefault) => {
  return findChildByValue2(parent, possibleValue, eq, Number.MAX_SAFE_INTEGER);
};
var findChildByValue2 = (parent, possibleValue, eq = isEqualDefault, maxDepth = 0) => {
  if (maxDepth < 0) return;
  if (eq(parent.getValue(), possibleValue)) return parent;
  for (const d of breadthFirst2(parent, maxDepth)) {
    if (eq(d.getValue(), possibleValue)) return d;
  }
  return;
};
function* depthFirst3(root2) {
  if (!root2) return;
  const stack = new StackMutable();
  let entry = root2;
  while (entry) {
    const entries = [...entry.children()];
    stack.push(...entries);
    if (stack.isEmpty) break;
    entry = stack.pop();
    if (entry) yield entry;
  }
}
function* breadthFirst2(root2, depth = Number.MAX_SAFE_INTEGER) {
  if (!root2) return;
  const queue = new QueueMutable();
  let entry = root2;
  while (entry) {
    if (depth < 0) return;
    for (const c of entry.children()) {
      yield c;
      queue.enqueue(c);
    }
    entry = queue.dequeue();
    depth--;
  }
}
function find2$1(root2, predicate, order = `breadth`) {
  if (predicate(root2)) return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c)) return c;
  }
}
function findByValue(root2, predicate, order = `breadth`) {
  if (predicate(root2.getValue())) return root2;
  const iter = order === `breadth` ? breadthFirst2 : depthFirst3;
  for (const c of iter(root2)) {
    if (predicate(c.getValue())) return c;
  }
}
function* followValue2(root2, continuePredicate, depth = 1) {
  for (const c of root2.children()) {
    if (continuePredicate(c.getValue(), depth)) {
      yield c.getValue();
      yield* followValue2(c, continuePredicate, depth + 1);
    }
  }
}
function toStringDeep3(node, depth = 0) {
  if (node === void 0) return `(undefined)`;
  if (node === null) return `(null)`;
  const v = node.getValue();
  let type = typeof v;
  if (Array.isArray(v)) type = `array`;
  let t = `  `.repeat(depth) + `value: ${JSON.stringify(v)} (${type})
`;
  for (const n of node.children()) {
    t += toStringDeep3(n, depth + 1);
  }
  return t;
}
function toString2(...nodes) {
  let t = ``;
  for (const node of nodes) {
    const v = node.getValue();
    const vString = toStringAbbreviate(v);
    const children3 = [...node.children()];
    const parent = node.getParent();
    let type = typeof v;
    if (Array.isArray(v)) type = `array`;
    t += `value: ${vString} (${type}) kids: ${children3.length} parented: ${parent ? `y` : `n`}
`;
  }
  return t;
}

// src/collections/tree/index.ts
var toTraversable = (node) => {
  if (isTraversable(node)) return node;
  if (isTreeNode(node)) return asDynamicTraversable(node);
  if (typeof node === `object`) return asDynamicTraversable2(node);
  throw new Error(`Parameter 'node' not convertible`);
};
var isTreeNode = (node) => {
  if (`parent` in node && `childrenStore` in node && `value` in node) {
    if (Array.isArray(node.childrenStore)) return true;
  }
  return false;
};
var isTraversable = (node) => {
  return `children` in node && `getParent` in node && `getValue` in node && `getIdentity` in node;
};

// src/collections/arrays/CircularArray.ts
var CircularArray = class _CircularArray extends Array {
  // ✔ Class is unit tested!
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #capacity;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #pointer;
  constructor(capacity = 0) {
    super();
    throwIntegerTest(capacity, `positive`, `capacity`);
    this.#capacity = capacity;
    this.#pointer = 0;
  }
  /**
   * Add to array
   * @param value Thing to add
   * @returns 
   */
  add(value) {
    const ca = _CircularArray.from(this);
    ca[this.#pointer] = value;
    ca.#capacity = this.#capacity;
    if (this.#capacity > 0) {
      ca.#pointer = this.#pointer + 1 === this.#capacity ? 0 : this.#pointer + 1;
    } else {
      ca.#pointer = this.#pointer + 1;
    }
    return ca;
  }
  get pointer() {
    return this.#pointer;
  }
  get isFull() {
    if (this.#capacity === 0) return false;
    return this.length === this.#capacity;
  }
};
var circularArray = (capacity) => new CircularArray(capacity);

// src/collections/Map/index.ts
var Map_exports = {};
__export(Map_exports, {
  ExpiringMap: () => ExpiringMap,
  MapOfMutableImpl: () => MapOfMutableImpl,
  MapOfSimpleMutable: () => MapOfSimpleMutable,
  NumberMap: () => NumberMap,
  addKeepingExisting: () => addKeepingExisting,
  addObject: () => addObject,
  deleteByValue: () => deleteByValue,
  expiringMap: () => create$1,
  filter: () => filter$3,
  find: () => find$1,
  firstEntryByIterablePredicate: () => firstEntryByIterablePredicate,
  firstEntryByIterableValue: () => firstEntryByIterableValue,
  fromIterable: () => fromIterable$1,
  fromObject: () => fromObject$1,
  getClosestIntegerKey: () => getClosestIntegerKey,
  getFromKeys: () => getFromKeys,
  getOrGenerate: () => getOrGenerate,
  getOrGenerateSync: () => getOrGenerateSync,
  hasAnyValue: () => hasAnyValue,
  hasKeyValue: () => hasKeyValue,
  immutable: () => immutable$2,
  mapOfSimpleMutable: () => ofSimpleMutable,
  mapToArray: () => mapToArray,
  mapToObjectTransform: () => mapToObjectTransform,
  mergeByKey: () => mergeByKey$1,
  mutable: () => mutable,
  ofArrayMutable: () => ofArrayMutable,
  ofCircularMutable: () => ofCircularMutable,
  ofSetMutable: () => ofSetMutable,
  some: () => some$1,
  sortByValue: () => sortByValue,
  sortByValueProperty: () => sortByValueProperty,
  toArray: () => toArray$3,
  toObject: () => toObject,
  transformMap: () => transformMap,
  zipKeyValue: () => zipKeyValue
});

// src/collections/Map/ExpiringMap.ts
var create$1 = (opts = {}) => new ExpiringMap(opts);
var ExpiringMap = class extends SimpleEventEmitter {
  capacity;
  store;
  //private keyCount: number;
  evictPolicy;
  autoDeleteElapsedMs;
  autoDeletePolicy;
  constructor(opts = {}) {
    super();
    this.capacity = opts.capacity ?? -1;
    throwIntegerTest(this.capacity, `nonZero`, `capacity`);
    this.store = /* @__PURE__ */ new Map();
    if (opts.evictPolicy && this.capacity <= 0) {
      throw new Error(`evictPolicy is set, but no capacity limit is set`);
    }
    this.evictPolicy = opts.evictPolicy ?? `none`;
    this.autoDeleteElapsedMs = opts.autoDeleteElapsedMs ?? -1;
    this.autoDeletePolicy = opts.autoDeletePolicy ?? `none`;
    if (this.autoDeleteElapsedMs > 0) {
      setInterval(
        () => {
          this.#maintain();
        },
        Math.max(1e3, this.autoDeleteElapsedMs * 2)
      );
    }
  }
  /**
   * Returns the number of keys being stored.
   */
  get keyLength() {
    return this.store.size;
  }
  *entries() {
    for (const entry of this.store.entries()) {
      yield [entry[0], entry[1].value];
    }
  }
  *values() {
    for (const v of this.store.values()) {
      yield v.value;
    }
  }
  *keys() {
    yield* this.store.keys();
  }
  /**
   * Returns the elapsed time since `key`
   * was set. Returns _undefined_ if `key`
   * does not exist
   */
  elapsedSet(key) {
    const v = this.store.get(key);
    if (!v) return v;
    return Date.now() - v.lastSet;
  }
  /**
   * Returns the elapsed time since `key`
   * was accessed. Returns _undefined_ if `key`
   * does not exist
   */
  elapsedGet(key) {
    const v = this.store.get(key);
    if (!v) return v;
    return Date.now() - v.lastGet;
  }
  /**
   * Returns true if `key` is stored.
   * Does not affect the key's last access time.
   * @param key
   * @returns
   */
  has(key) {
    return this.store.has(key);
  }
  /**
   * Gets an item from the map by key, returning
   * undefined if not present
   * @param key Key
   * @returns Value, or undefined
   */
  get(key) {
    const v = this.store.get(key);
    if (v) {
      return v.value;
    }
  }
  /**
   * Deletes the value under `key`, if present.
   *
   * Returns _true_ if something was removed.
   * @param key
   * @returns
   */
  delete(key) {
    const value = this.store.get(key);
    if (!value) return false;
    const d = this.store.delete(key);
    this.fireEvent(`removed`, {
      key,
      value: value.value
    });
    return d;
  }
  /**
   * Clears the contents of the map.
   * Note: does not fire `removed` event
   */
  clear() {
    this.store.clear();
  }
  /**
   * Updates the lastSet/lastGet time for a value
   * under `k`.
   *
   * Returns false if key was not found
   * @param key
   * @returns
   */
  touch(key) {
    const v = this.store.get(key);
    if (!v) return false;
    this.store.set(key, {
      ...v,
      lastSet: Date.now(),
      lastGet: Date.now()
    });
    return true;
  }
  findEvicteeKey() {
    if (this.evictPolicy === `none`) return;
    let sortBy = ``;
    if (this.evictPolicy === `oldestGet`) sortBy = `lastGet`;
    else if (this.evictPolicy === `oldestSet`) sortBy = `lastSet`;
    else throw new Error(`Unknown eviction policy ${this.evictPolicy}`);
    const sorted = sortByValueProperty(this.store, sortBy);
    return sorted[0][0];
  }
  #maintain() {
    if (this.autoDeletePolicy === `none`) return;
    this.deleteWithElapsed(this.autoDeleteElapsedMs, this.autoDeletePolicy);
  }
  /**
   * Deletes all values where elapsed time has past
   * for get/set or either.
   * ```js
   * // Delete all keys (and associated values) not accessed for a minute
   * em.deleteWithElapsed({mins:1}, `get`);
   * // Delete things that were set 1s ago
   * em.deleteWithElapsed(1000, `set`);
   * ```
   * 
   * @param interval Interval
   * @param property Basis for deletion 'get','set' or 'either'
   * @returns Items removed
   */
  deleteWithElapsed(interval, property) {
    const entries = [...this.store.entries()];
    const prune = [];
    const intervalMs = intervalToMs(interval, 1e3);
    const now = Date.now();
    for (const entry of entries) {
      const elapsedGet = now - entry[1].lastGet;
      const elapsedSet = now - entry[1].lastSet;
      const elapsed = property === `get` ? elapsedGet : property === `set` ? elapsedSet : Math.max(elapsedGet, elapsedSet);
      if (elapsed >= intervalMs) {
        prune.push([entry[0], entry[1].value]);
      }
    }
    for (const entry of prune) {
      this.store.delete(entry[0]);
      const eventArguments = {
        key: entry[0],
        value: entry[1]
      };
      this.fireEvent(`expired`, eventArguments);
      this.fireEvent(`removed`, eventArguments);
    }
    return prune;
  }
  /**
   * Sets the `key` to be `value`.
   *
   * If the key already exists, it is updated.
   *
   * If the map is full, according to its capacity,
   * another value is selected for removal.
   * @param key
   * @param value
   * @returns
   */
  set(key, value) {
    const existing = this.store.get(key);
    if (existing) {
      this.store.set(key, {
        ...existing,
        lastSet: performance.now()
      });
      return;
    }
    if (this.keyLength === this.capacity && this.capacity > 0) {
      const key2 = this.findEvicteeKey();
      if (!key2) {
        throw new Error(`ExpiringMap full (capacity: ${this.capacity})`);
      }
      const existing2 = this.store.get(key2);
      this.store.delete(key2);
      if (existing2) {
        const eventArguments = { key: key2, value: existing2.value };
        this.fireEvent(`expired`, eventArguments);
        this.fireEvent(`removed`, eventArguments);
      }
    }
    this.store.set(key, {
      lastGet: 0,
      lastSet: Date.now(),
      value
    });
    this.fireEvent(`newKey`, { key, value });
  }
};

// src/collections/Map/MapImmutableFns.ts
var addArray = (map, data) => {
  const x = new Map(map.entries());
  for (const d of data) {
    if (d[0] === void 0) throw new Error(`key cannot be undefined`);
    if (d[1] === void 0) throw new Error(`value cannot be undefined`);
    x.set(d[0], d[1]);
  }
  return x;
};
var addObjects = (map, data) => {
  const x = new Map(map.entries());
  for (const d of data) {
    if (d.key === void 0) throw new Error(`key cannot be undefined`);
    if (d.value === void 0) throw new Error(`value cannot be undefined`);
    x.set(d.key, d.value);
  }
  return x;
};
var has = (map, key) => map.has(key);
var add$1 = (map, ...data) => {
  if (map === void 0) throw new Error(`map parameter is undefined`);
  if (data === void 0) throw new Error(`data parameter i.s undefined`);
  if (data.length === 0) return map;
  const firstRecord = data[0];
  const isObject = typeof firstRecord.key !== `undefined` && typeof firstRecord.value !== `undefined`;
  return isObject ? addObjects(map, data) : addArray(map, data);
};
var set = (map, key, value) => {
  const x = new Map(map.entries());
  x.set(key, value);
  return x;
};
var del = (map, key) => {
  const x = new Map(map.entries());
  x.delete(key);
  return x;
};

// src/collections/Map/Map.ts
var immutable$2 = (dataOrMap) => {
  if (dataOrMap === void 0) return immutable$2([]);
  if (Array.isArray(dataOrMap)) return immutable$2(add$1(/* @__PURE__ */ new Map(), ...dataOrMap));
  const data = dataOrMap;
  return {
    add: (...itemsToAdd) => {
      const s = add$1(data, ...itemsToAdd);
      return immutable$2(s);
    },
    set: (key, value) => {
      const s = set(data, key, value);
      return immutable$2(s);
    },
    get: (key) => data.get(key),
    delete: (key) => immutable$2(del(data, key)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: () => immutable$2(),
    has: (key) => data.has(key),
    entries: () => data.entries(),
    values: () => data.values(),
    isEmpty: () => data.size === 0
  };
};

// src/collections/Map/MapMutable.ts
var mutable = (...data) => {
  let m = add$1(/* @__PURE__ */ new Map(), ...data);
  return {
    add: (...data2) => {
      m = add$1(m, ...data2);
    },
    delete: (key) => {
      m = del(m, key);
    },
    clear: () => {
      m = add$1(/* @__PURE__ */ new Map());
    },
    set: (key, value) => {
      m = set(m, key, value);
    },
    get: (key) => m.get(key),
    entries: () => m.entries(),
    values: () => m.values(),
    isEmpty: () => m.size === 0,
    has: (key) => has(m, key)
  };
};

// src/collections/Map/MapOfMultiImpl.ts
var MapOfMutableImpl = class extends SimpleEventEmitter {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #map = /* @__PURE__ */ new Map();
  groupBy;
  type;
  constructor(type, opts = {}) {
    super();
    this.type = type;
    this.groupBy = opts.groupBy ?? toStringDefault;
  }
  /**
   * Returns the type name. For in-built implementations, it will be one of: array, set or circular
   */
  get typeName() {
    return this.type.name;
  }
  /**
   * Returns the number of keys
   */
  get lengthKeys() {
    return this.#map.size;
  }
  /**
   * Returns the length of the longest child list
   */
  get lengthMax() {
    let m = 0;
    for (const v of this.#map.values()) {
      m = Math.max(m, this.type.count(v));
    }
    return m;
  }
  debugString() {
    const keys = [...this.#map.keys()];
    let r = `Keys: ${keys.join(`, `)}\r
`;
    for (const k of keys) {
      const v = this.#map.get(k);
      if (v === void 0) {
        r += ` - ${k} (undefined)\r
`;
      } else {
        const asArray = this.type.toArray(v);
        if (asArray !== void 0) {
          r += ` - ${k} (${this.type.count(v)}) = ${JSON.stringify(
            asArray
          )}\r
`;
        }
      }
    }
    return r;
  }
  get isEmpty() {
    return this.#map.size === 0;
  }
  clear() {
    this.#map.clear();
    super.fireEvent(`clear`, true);
  }
  //eslint-disable-next-line functional/prefer-immutable-types
  addKeyedValues(key, ...values) {
    const set2 = this.#map.get(key);
    if (set2 === void 0) {
      this.#map.set(key, this.type.add(void 0, values));
      super.fireEvent(`addedKey`, { key });
      super.fireEvent(`addedValues`, { values });
    } else {
      this.#map.set(key, this.type.add(set2, values));
      super.fireEvent(`addedValues`, { values });
    }
  }
  //eslint-disable-next-line functional/prefer-immutable-types
  set(key, values) {
    this.addKeyedValues(key, ...values);
    return this;
  }
  addValue(...values) {
    for (const v of values) this.addKeyedValues(this.groupBy(v), v);
  }
  hasKeyValue(key, value, eq) {
    const m = this.#map.get(key);
    if (m === void 0) return false;
    return this.type.has(m, value, eq);
  }
  //eslint-disable-next-line functional/prefer-tacit
  has(key) {
    return this.#map.has(key);
  }
  deleteKeyValue(key, value) {
    const a = this.#map.get(key);
    if (a === void 0) return false;
    return this.deleteKeyValueFromMap(a, key, value);
  }
  deleteKeyValueFromMap(map, key, value) {
    const preCount = this.type.count(map);
    const filtered = this.type.without(map, value);
    const postCount = filtered.length;
    this.#map.set(key, this.type.add(void 0, filtered));
    return preCount > postCount;
  }
  deleteByValue(value) {
    let something = false;
    [...this.#map.keys()].filter((key) => {
      const a = this.#map.get(key);
      if (!a) throw new Error(`Bug: map could not be accessed`);
      if (this.deleteKeyValueFromMap(a, key, value)) {
        something = true;
        if (this.count(key) === 0) this.delete(key);
      }
    });
    return something;
  }
  delete(key) {
    const a = this.#map.get(key);
    if (a === void 0) return false;
    this.#map.delete(key);
    this.fireEvent(`deleteKey`, { key });
    return true;
  }
  firstKeyByValue(value, eq = isEqualDefault) {
    const keys = [...this.#map.keys()];
    const found = keys.find((key) => {
      const a = this.#map.get(key);
      if (a === void 0) throw new Error(`Bug: map could not be accessed`);
      const r = this.type.has(a, value, eq);
      return r;
    });
    return found;
  }
  count(key) {
    const entry = this.#map.get(key);
    if (entry === void 0) return 0;
    return this.type.count(entry);
  }
  /**
   * Iterates over values stored under `key`
   * An empty array is returned if there are no values
   */
  *get(key) {
    const m = this.#map.get(key);
    if (m === void 0) return;
    yield* this.type.iterable(m);
  }
  /**
   * Iterate over the values stored under `key`.
   * If key does not exist, iteration is essentially a no-op
   * @param key
   * @returns
   */
  *valuesFor(key) {
    const m = this.#map.get(key);
    if (m === void 0) return;
    yield* this.type.iterable(m);
  }
  //eslint-disable-next-line functional/prefer-tacit
  getSource(key) {
    return this.#map.get(key);
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  *keys() {
    yield* this.#map.keys();
  }
  *entriesFlat() {
    for (const entry of this.#map.entries()) {
      for (const v of this.type.iterable(entry[1])) {
        yield [entry[0], v];
      }
    }
  }
  *valuesFlat() {
    for (const entry of this.#map.entries()) {
      yield* this.type.iterable(entry[1]);
    }
  }
  *entries() {
    for (const [k, v] of this.#map.entries()) {
      const temporary = [...this.type.iterable(v)];
      yield [k, temporary];
    }
  }
  /* eslint-disable-next-line functional/prefer-readonly-type */
  *keysAndCounts() {
    for (const key of this.keys()) {
      yield [key, this.count(key)];
    }
  }
  merge(other) {
    for (const key of other.keys()) {
      const data = other.get(key);
      this.addKeyedValues(key, ...data);
    }
  }
  get size() {
    return this.#map.size;
  }
  get [Symbol.toStringTag]() {
    return this.#map[Symbol.toStringTag];
  }
};

// src/collections/Map/MapOfSetMutable.ts
var ofSetMutable = (opts) => {
  const hash = opts?.hash ?? toStringDefault;
  const comparer = (a, b) => hash(a) === hash(b);
  const t = {
    get name() {
      return `set`;
    },
    iterable: (source) => source.values(),
    add: (dest, values) => addKeepingExisting(dest, hash, ...values),
    count: (source) => source.size,
    find: (source, predicate) => find$1(source, predicate),
    filter: (source, predicate) => filter$3(source, predicate),
    toArray: (source) => toArray$3(source),
    has: (source, value) => hasAnyValue(source, value, comparer),
    without: (source, value) => without(toArray$3(source), value, comparer)
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};

// src/collections/Map/MapOfCircularMutable.ts
var ofCircularMutable = (opts) => {
  const comparer = isEqualDefault;
  const t = {
    get name() {
      return `circular`;
    },
    add: (destination, values) => {
      if (destination === void 0) destination = circularArray(opts.capacity);
      for (const v of values) {
        destination = destination.add(v);
      }
      return destination;
    },
    count: (source) => source.length,
    find: (source, predicate) => source.find(predicate),
    filter: (source, predicate) => source.filter(predicate),
    toArray: (source) => source,
    iterable: (source) => source.values(),
    has: (source, value) => source.find((v) => comparer(v, value)) !== void 0,
    without: (source, value) => source.filter((v) => !comparer(v, value))
  };
  return new MapOfMutableImpl(t, opts);
};

// src/collections/Map/NumberMap.ts
var NumberMap = class extends Map {
  defaultValue;
  constructor(defaultValue = 0) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key) {
    const v = super.get(key);
    if (v === void 0) return this.defaultValue;
    return v;
  }
  reset(key) {
    super.set(key, this.defaultValue);
    return this.defaultValue;
  }
  multiply(key, amount) {
    const v = super.get(key);
    let value = v ?? this.defaultValue;
    value *= amount;
    super.set(key, value);
    return value;
  }
  add(key, amount = 1) {
    const v = super.get(key);
    let value = v ?? this.defaultValue;
    value += amount;
    super.set(key, value);
    return value;
  }
  subtract(key, amount = 1) {
    const v = super.get(key);
    let value = v ?? this.defaultValue;
    value -= amount;
    super.set(key, value);
    return value;
  }
};

// src/collections/Map/MapOfArrayMutable.ts
var ofArrayMutable = (opts = {}) => {
  const convertToString = opts.convertToString;
  const toStringFunction = typeof convertToString === `undefined` ? isEqualDefault : (a, b) => convertToString(a) === convertToString(b);
  const comparer = opts.comparer ?? toStringFunction;
  const t = {
    get name() {
      return `array`;
    },
    add: (destination, values) => {
      if (destination === void 0) return [...values];
      return [...destination, ...values];
    },
    iterable: (source) => source.values(),
    count: (source) => source.length,
    find: (source, predicate) => source.find((f) => predicate(f)),
    filter: (source, predicate) => source.filter((f) => predicate(f)),
    toArray: (source) => source,
    has: (source, value) => source.some((v) => comparer(v, value)),
    without: (source, value) => source.filter((v) => !comparer(v, value))
    //[Symbol.iterator]: (source) => source[Symbol.iterator]()
  };
  const m = new MapOfMutableImpl(t, opts);
  return m;
};

// src/iterables/CompareValues.ts
var maxScore = (iterable, scorer) => {
  let highestValue;
  let highestScore = Number.MIN_SAFE_INTEGER;
  for (const value of iterable) {
    const score = scorer(value);
    if (score >= highestScore) {
      highestScore = score;
      highestValue = value;
    }
  }
  return highestValue;
};
var min = (iterable, scorer) => {
  let lowestValue;
  let lowestScore = Number.MAX_SAFE_INTEGER;
  for (const value of iterable) {
    const score = scorer(value);
    if (score <= lowestScore) {
      lowestScore = score;
      lowestValue = value;
    }
  }
  return lowestValue;
};
var compareValuesShallow = (a, b, eq = isEqualDefault) => {
  const shared = [];
  const aUnique = [];
  const bUnique = [];
  for (const elementOfA of a) {
    let seenInB = false;
    for (const elementOfB of b) {
      if (eq(elementOfA, elementOfB)) {
        seenInB = true;
        break;
      }
    }
    if (seenInB) {
      shared.push(elementOfA);
    } else {
      aUnique.push(elementOfA);
    }
  }
  for (const elementOfB of b) {
    let seenInA = false;
    for (const elementOfA of a) {
      if (eq(elementOfB, elementOfA)) {
        seenInA = true;
      }
    }
    if (!seenInA) {
      bUnique.push(elementOfB);
    }
  }
  const isSame = aUnique.length === 0 && bUnique.length === 0;
  return {
    shared,
    isSame,
    a: aUnique,
    b: bUnique
  };
};

// src/collections/queue/index.ts
var queue_exports = {};
__export(queue_exports, {
  QueueMutable: () => QueueMutable,
  immutable: () => immutable$1,
  mutable: () => mutable$2,
  priority: () => priority
});

// src/collections/queue/QueueImmutable.ts
var QueueImmutable = class _QueueImmutable {
  opts;
  #data;
  /**
   * Creates an instance of Queue.
   * @param {QueueOpts} opts Options foor queue
   * @param {V[]} data Initial data. Index 0 is front of queue
   * @memberof Queue
   */
  constructor(opts = {}, data = []) {
    if (opts === void 0) throw new Error(`opts parameter undefined`);
    this.opts = opts;
    this.#data = data;
  }
  forEach(fn) {
    for (let index = this.#data.length - 1; index >= 0; index--) {
      fn(this.#data[index]);
    }
  }
  forEachFromFront(fn) {
    this.#data.forEach((item) => {
      fn(item);
    });
  }
  enqueue(...toAdd) {
    return new _QueueImmutable(
      this.opts,
      enqueue(this.opts, this.#data, ...toAdd)
    );
  }
  dequeue() {
    return new _QueueImmutable(this.opts, dequeue(this.opts, this.#data));
  }
  get isEmpty() {
    return isEmpty$1(this.opts, this.#data);
  }
  get isFull() {
    return isFull$1(this.opts, this.#data);
  }
  get length() {
    return this.#data.length;
  }
  get peek() {
    return peek$1(this.opts, this.#data);
  }
  toArray() {
    return [...this.#data];
  }
};
var immutable$1 = (opts = {}, ...startingItems) => {
  opts = { ...opts };
  return new QueueImmutable(opts, [...startingItems]);
};

// src/collections/queue/PriorityMutable.ts
var PriorityMutable = class extends QueueMutable {
  constructor(opts = {}) {
    if (opts.eq === void 0) {
      opts = {
        ...opts,
        eq: (a, b) => {
          return isEqualDefault(a.item, b.item);
        }
      };
    }
    super(opts);
  }
  /**
   * Adds an item with a given priority
   * @param item Item
   * @param priority Priority (higher numeric value means higher priority)
   */
  enqueueWithPriority(item, priority2) {
    throwNumberTest(priority2, `positive`);
    super.enqueue({ item, priority: priority2 });
  }
  changePriority(item, priority2, addIfMissing = false, eq) {
    if (item === void 0) throw new Error(`Item cannot be undefined`);
    let toDelete;
    for (const d of this.data) {
      if (eq) {
        if (eq(d.item, item)) {
          toDelete = d;
          break;
        }
      } else {
        if (this.eq(d, { item, priority: 0 })) {
          toDelete = d;
          break;
        }
      }
    }
    if (toDelete === void 0 && !addIfMissing) throw new Error(`Item not found in priority queue. Item: ${JSON.stringify(item)}`);
    if (toDelete !== void 0) {
      this.removeWhere((item2) => toDelete === item2);
    }
    this.enqueueWithPriority(item, priority2);
  }
  dequeueMax() {
    const m = maxScore(this.data, (v) => v.priority);
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  dequeueMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0) return;
    this.removeWhere((item) => item === m);
    return m.item;
  }
  peekMax() {
    const m = maxScore(this.data, (v) => v.priority);
    if (m === void 0) return;
    return m.item;
  }
  peekMin() {
    const m = min(this.data, (v) => v.priority);
    if (m === void 0) return;
    return m.item;
  }
};
function priority(opts = {}) {
  return new PriorityMutable(opts);
}

// src/collections/arrays/Equality.ts
var isEqual = (arrayA, arrayB, eq = isEqualDefault) => {
  guardArray(arrayA, `arrayA`);
  guardArray(arrayB, `arrayB`);
  if (arrayA.length !== arrayB.length) return false;
  for (let indexA = 0; indexA < arrayA.length; indexA++) {
    if (!eq(arrayA[indexA], arrayB[indexA])) return false;
  }
  return true;
};
var isContentsTheSame = (array, equality) => {
  if (!Array.isArray(array)) throw new Error(`Param 'array' is not an array.`);
  if (array.length === 0) return true;
  const eq = equality ?? isEqualValueDefault;
  const a = array[0];
  const r = array.some((v) => !eq(a, v));
  if (r) return false;
  return true;
};

// src/collections/arrays/Zip.ts
var zip = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!isContentsTheSame(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    returnValue.push(arrays.map((a) => a[index]));
  }
  return returnValue;
};

// src/numbers/AverageWeighted.ts
var averageWeighted = (data, weightings) => {
  if (typeof weightings === `function`) weightings = weight(data, weightings);
  const ww = zip(data, weightings);
  const [totalV, totalW] = ww.reduce(
    (accumulator, v) => [accumulator[0] + v[0] * v[1], accumulator[1] + v[1]],
    [0, 0]
  );
  return totalV / totalW;
};

// src/iterables/index.ts
var iterables_exports = {};
__export(iterables_exports, {
  Async: () => IterableAsync_exports,
  Chains: () => chain_exports,
  Sync: () => IterableSync_exports,
  chunks: () => chunks3,
  combineLatestToArray: () => combineLatestToArray2,
  concat: () => concat3,
  dropWhile: () => dropWhile3,
  equals: () => equals3,
  every: () => every3,
  fill: () => fill3,
  filter: () => filter4,
  find: () => find3,
  flatten: () => flatten3,
  forEach: () => forEach3,
  fromArray: () => fromArray3,
  fromEvent: () => fromEvent,
  fromIterable: () => fromIterable3,
  isAsyncIterable: () => isAsyncIterable,
  isIterable: () => isIterable,
  map: () => map3,
  max: () => max5,
  min: () => min5,
  reduce: () => reduce4,
  slice: () => slice3,
  some: () => some3,
  toArray: () => toArray3,
  unique: () => unique3,
  uniqueByValue: () => uniqueByValue3,
  until: () => until3,
  zip: () => zip3
});

// src/iterables/IterableAsync.ts
var IterableAsync_exports = {};
__export(IterableAsync_exports, {
  chunks: () => chunks2,
  concat: () => concat2,
  dropWhile: () => dropWhile2,
  equals: () => equals2,
  every: () => every2,
  fill: () => fill2,
  filter: () => filter2,
  find: () => find2,
  flatten: () => flatten2,
  forEach: () => forEach2,
  fromArray: () => fromArray2,
  fromFunction: () => fromFunction,
  fromFunctionAwaited: () => fromFunctionAwaited,
  fromIterable: () => fromIterable2,
  map: () => map2,
  max: () => max2$1,
  min: () => min2$1,
  nextWithTimeout: () => nextWithTimeout,
  reduce: () => reduce2,
  repeat: () => repeat,
  slice: () => slice2,
  some: () => some2,
  toArray: () => toArray2,
  unique: () => unique2,
  uniqueByValue: () => uniqueByValue2,
  until: () => until2,
  withDelay: () => withDelay,
  zip: () => zip2
});
async function* fromArray2(array2, interval = 1) {
  for (const v of array2) {
    yield v;
    await sleep(interval);
  }
}
async function* fromIterable2(iterable2, interval = 1) {
  for await (const v of iterable2) {
    yield v;
    await sleep(interval);
  }
}
async function* chunks2(it, size) {
  let buffer = [];
  for await (const v of it) {
    buffer.push(v);
    if (buffer.length === size) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
}
async function* concat2(...its) {
  for await (const it of its) yield* it;
}
async function* dropWhile2(it, f) {
  for await (const v of it) {
    if (!f(v)) {
      yield v;
    }
  }
}
var until2 = async (it, callback) => {
  for await (const _ of it) {
    const value = await callback();
    if (typeof value === `boolean` && !value) break;
  }
};
var repeat = async function* (genCreator, repeatsOrSignal) {
  const repeats = typeof repeatsOrSignal === `number` ? repeatsOrSignal : Number.POSITIVE_INFINITY;
  const signal = typeof repeatsOrSignal === `number` ? void 0 : repeatsOrSignal;
  let count = repeats;
  while (true) {
    for await (const v of genCreator()) {
      yield v;
      if (signal?.aborted) break;
    }
    if (Number.isFinite(repeats)) {
      count--;
      if (count === 0) break;
    }
    if (signal?.aborted) break;
  }
};
async function equals2(it1, it2, equality) {
  const iit1 = it1[Symbol.asyncIterator]();
  const iit2 = it2[Symbol.asyncIterator]();
  while (true) {
    const index1 = await iit1.next();
    const index2 = await iit2.next();
    if (equality !== void 0) {
      if (!equality(index1.value, index2.value)) return false;
    } else if (index1.value !== index2.value) return false;
    if (index1.done ?? index2.done) return index1.done && index2.done;
  }
}
async function every2(it, f) {
  for await (const v of it) {
    const result = await f(v);
    if (!result) return false;
  }
  return true;
}
async function* fill2(it, v) {
  for await (const _ of it) yield v;
}
async function* filter2(it, f) {
  for await (const v of it) {
    if (!await f(v)) continue;
    yield v;
  }
}
async function find2(it, f) {
  for await (const v of it) {
    if (await f(v)) return v;
  }
}
async function* flatten2(it) {
  for await (const v of it) {
    if (typeof v === `object`) {
      if (Array.isArray(v)) {
        for (const vv of v) yield vv;
      } else if (isAsyncIterable(v)) {
        for await (const vv of v) {
          yield vv;
        }
      } else if (isIterable(v)) {
        for (const vv of v) {
          yield vv;
        }
      }
    } else {
      yield v;
    }
  }
}
async function forEach2(it, f) {
  for await (const v of it) {
    const result = await f(v);
    if (typeof result === `boolean` && !result) break;
  }
}
async function* map2(it, f) {
  for await (const v of it) {
    yield f(v);
  }
}
async function* max2$1(it, gt = (a, b) => a > b) {
  let max6;
  for await (const v of it) {
    if (max6 === void 0) {
      max6 = v;
      yield max6;
      continue;
    }
    if (gt(v, max6)) {
      max6 = v;
      yield v;
    }
  }
}
async function* min2$1(it, gt = (a, b) => a > b) {
  let min6;
  for await (const v of it) {
    if (min6 === void 0) {
      min6 = v;
      yield min6;
      continue;
    }
    if (gt(min6, v)) {
      min6 = v;
      yield v;
    }
  }
  return min6;
}
async function reduce2(it, f, start) {
  for await (const v of it) start = f(start, v);
  return start;
}
async function* slice2(it, start = 0, end = Number.POSITIVE_INFINITY) {
  const iit = it[Symbol.asyncIterator]();
  for (; start > 0; start--, end--) await iit.next();
  for await (const v of it) {
    if (end-- > 0) {
      yield v;
    } else {
      break;
    }
  }
}
async function* withDelay(it, delay2) {
  for (const v of it) {
    await sleep(delay2);
    yield v;
  }
}
async function nextWithTimeout(it, options) {
  const ms = intervalToMs(options, 1e3);
  const value = await Promise.race([
    (async () => {
      await sleep({ millis: ms, signal: options.signal });
      return void 0;
    })(),
    (async () => {
      return await it.next();
    })()
  ]);
  if (value === void 0) throw new Error(`Timeout`);
  return value;
}
async function some2(it, f) {
  for await (const v of it) {
    if (await f(v)) return true;
  }
  return false;
}
async function toArray2(it, options = {}) {
  const result = [];
  const iterator = it[Symbol.asyncIterator]();
  const started = Date.now();
  const maxItems = options.limit ?? Number.POSITIVE_INFINITY;
  const maxElapsed = intervalToMs(options.elapsed, Number.POSITIVE_INFINITY);
  while (result.length < maxItems && Date.now() - started < maxElapsed) {
    const r = await iterator.next();
    if (r.done) break;
    result.push(r.value);
  }
  return result;
}
async function* fromFunctionAwaited(callback) {
  while (true) {
    const v = await callback();
    yield v;
  }
}
function* fromFunction(callback) {
  while (true) {
    const v = callback();
    yield v;
  }
}
async function* unique2(iterable2) {
  const buffer = [];
  const itera = Array.isArray(iterable2) ? iterable2 : [iterable2];
  for await (const it of itera) {
    for await (const v of it) {
      if (buffer.includes(v)) continue;
      buffer.push(v);
      yield v;
    }
  }
}
async function* uniqueByValue2(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  for await (const v of input) {
    const key = toString(v);
    if (seen.has(key)) continue;
    seen.add(key);
    yield v;
  }
}
async function* zip2(...its) {
  const iits = its.map((it) => it[Symbol.asyncIterator]());
  while (true) {
    const vs = await Promise.all(iits.map((it) => it.next()));
    if (vs.some((v) => v.done)) return;
    yield vs.map((v) => v.value);
  }
}

// src/iterables/chain/index.ts
var chain_exports = {};
__export(chain_exports, {
  Dom: () => Dom_exports$1,
  From: () => from_exports,
  Links: () => Links_exports,
  addToArray: () => addToArray,
  asArray: () => asArray,
  asCallback: () => asCallback,
  asPromise: () => asPromise,
  asValue: () => asValue,
  combineLatestToArray: () => combineLatestToArray$1,
  combineLatestToObject: () => combineLatestToObject$1,
  isGenFactoryNoInput: () => isGenFactoryNoInput,
  lazy: () => lazy,
  mergeFlat: () => mergeFlat,
  prepare: () => prepare$1,
  resolveToAsyncGen: () => resolveToAsyncGen,
  resolveToGen: () => resolveToGen,
  run: () => run$1,
  runN: () => runN,
  single: () => single,
  syncToArray: () => syncToArray$1,
  timestamp: () => timestamp
});

// src/iterables/chain/Dom.ts
var Dom_exports$1 = {};
__export(Dom_exports$1, {
  perValue: () => perValue,
  query: () => query$1
});

// src/iterables/chain/Util.ts
function isGenFactoryNoInput(c) {
  if (!(`_type` in c)) return false;
  if (c._type === `GenFactoryNoInput`) return true;
  return false;
}
function* primitiveToGenerator(value) {
  yield value;
}
async function* primitiveToAsyncGenerator(value) {
  yield value;
  await sleep(1);
}
function resolveToGen(input) {
  if (Array.isArray(input)) {
    const a = input.values();
    a._name = `arrayInput`;
    return a;
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  }
  return input;
}
function resolveToAsyncGen(input) {
  if (input === void 0) return;
  if (Array.isArray(input)) {
    return fromArray2(input);
  } else if (typeof input === `number` || typeof input === `boolean` || typeof input === `string`) {
    return primitiveToAsyncGenerator(input);
  } else if (typeof input === `function`) {
    return input();
  } else if (isAsyncIterable(input)) {
    return input;
  }
  return fromIterable2(input);
}

// src/iterables/chain/Dom.ts
var createMap = (key) => {
  const keyFunction = key ?? ((value) => value);
  const map4 = /* @__PURE__ */ new Map();
  return {
    has(key2) {
      return map4.has(keyFunction(key2));
    },
    get(key2) {
      return map4.get(keyFunction(key2));
    },
    set(key2, value) {
      map4.set(keyFunction(key2), value);
    },
    entries() {
      return map4.entries();
    },
    delete(key2) {
      map4.delete(key2);
    }
  };
};
function perValue(options = {}) {
  const byReference = options.byReference;
  const tagName = options.tagName ?? `div`;
  if (byReference && options.key) throw new Error(`byReference and key options are mutually exclusive`);
  const keyFunction = byReference ? void 0 : options.key ?? toStringDefault;
  const map4 = createMap(keyFunction);
  const parentElementOrQuery = options.parentEl ?? document.body;
  const parentEl = resolveEl(parentElementOrQuery);
  const usedElements = /* @__PURE__ */ new Set();
  async function* perValue2(input) {
    for await (const value of resolveToGen(input)) {
      let el = map4.get(value);
      if (!el) {
        el = document.createElement(tagName);
        map4.set(value, el);
        if (options.beforeInsert) options.beforeInsert(el);
        parentEl.append(el);
        if (options.afterInsert) options.afterInsert(el);
      }
      usedElements.add(el);
      yield { el, value };
    }
    for (const [id, el] of map4.entries()) {
      if (usedElements.has(el)) continue;
      if (options.beforeRemove) options.beforeRemove(el);
      el.remove();
      map4.delete(id);
    }
  }
  perValue2._name = `dom.perValue`;
  return perValue2;
}
function query$1(options = {}) {
  const baseElement = options.baseElement ?? document;
  async function* query2(input) {
    const gen = resolveToGen(input);
    for await (const value of gen) {
      for (const element of baseElement.querySelectorAll(value)) {
        yield element;
      }
    }
  }
  query2._name = `dom.query`;
  return query2;
}

// src/iterables/chain/Links.ts
var Links_exports = {};
__export(Links_exports, {
  average: () => average2,
  chunk: () => chunk,
  debounce: () => debounce$1,
  delay: () => delay,
  drop: () => drop$1,
  duration: () => duration,
  filter: () => filter3,
  max: () => max4,
  min: () => min4,
  rank: () => rank2$1,
  rankArray: () => rankArray,
  reduce: () => reduce3,
  sum: () => sum2$1,
  take: () => take,
  tally: () => tally2$1,
  transform: () => transform$1
});

// src/data/BasicProcessors.ts
var max3 = () => {
  let max6 = Number.MIN_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      max6 = Math.max(subValue, max6);
      return max6;
    }
  };
  return compute;
};
var min3 = () => {
  let min6 = Number.MAX_SAFE_INTEGER;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      min6 = Math.min(subValue, min6);
      return min6;
    }
  };
  return compute;
};
var sum = () => {
  let t = 0;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      t += subValue;
      return t;
    }
  };
  return compute;
};
var average = () => {
  let total = 0;
  let tally3 = 0;
  const compute = (value) => {
    const valueArray = Array.isArray(value) ? value : [value];
    for (const subValue of valueArray) {
      if (typeof subValue !== `number`) break;
      tally3++;
      total += subValue;
      return total / tally3;
    }
  };
  return compute;
};
var tally = (countArrayItems) => {
  let t = 0;
  const compute = (value) => {
    if (countArrayItems) {
      if (Array.isArray(value)) t += value.length;
      else t++;
    } else {
      t++;
    }
    return t;
  };
  return compute;
};
function rank(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  let best;
  return (value) => {
    if (includeType && typeof value !== includeType) return;
    if (best === void 0) {
      best = value;
      return best;
    } else {
      const result = r(value, best);
      if (result == `a`) {
        best = value;
        return best;
      } else if (result === `eq` && emitEqualRanked) {
        return best;
      } else if (emitRepeatHighest) {
        return best;
      }
    }
  };
}

// src/iterables/chain/Links.ts
function transform$1(transformer) {
  async function* transform2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield transformer(value);
    }
  }
  transform2._name = `transform`;
  return transform2;
}
function take(limit) {
  async function* take2(input) {
    input = resolveToGen(input);
    let yielded = 0;
    for await (const value of input) {
      if (++yielded > limit) break;
      yield value;
    }
  }
  take2._name = `take`;
  return take2;
}
function reduce3(reducer) {
  async function* reduce5(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      yield reducer(value);
    }
  }
  reduce5._name = `reduce`;
  return reduce5;
}
function duration(elapsed) {
  const durationMs = intervalToMs(elapsed, 0);
  async function* duration2(input) {
    input = resolveToGen(input);
    const elapsed2 = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed2() > durationMs) break;
      yield value;
    }
  }
  duration2._name = `duration`;
  return duration2;
}
function delay(options) {
  const before = intervalToMs(options.before, 0);
  const after = intervalToMs(options.after, 0);
  async function* delay2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (before > 0) {
        await sleep(before);
      }
      yield value;
      if (after > 0) {
        await sleep(after);
      }
    }
  }
  delay2._name = `delay`;
  return delay2;
}
function debounce$1(rate) {
  const rateMs = intervalToMs(rate, 0);
  async function* debounce2(input) {
    input = resolveToGen(input);
    let elapsed = Elapsed_exports.since();
    for await (const value of input) {
      if (elapsed() < rateMs) continue;
      yield value;
      elapsed = Elapsed_exports.since();
    }
  }
  debounce2._name = `debounce`;
  return debounce2;
}
function tally2$1(countArrayItems = true) {
  async function* tally3(input) {
    input = resolveToGen(input);
    const p = tally(countArrayItems);
    for await (const v of input) {
      yield p(v);
    }
  }
  tally3._name = `tally`;
  return tally3;
}
function min4() {
  async function* min6(input) {
    input = resolveToGen(input);
    const p = min3();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  min6._name = `min`;
  return min6;
}
function max4() {
  async function* max6(input) {
    input = resolveToGen(input);
    const p = max3();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  max6._name = `max`;
  return max6;
}
function rank2$1(r, options = {}) {
  async function* rank3(input) {
    input = resolveToGen(input);
    const p = rank(r, options);
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  rank3._name = `rank`;
  return rank3;
}
function rankArray(r, options = {}) {
  const includeType = options.includeType;
  const emitEqualRanked = options.emitEqualRanked ?? false;
  const emitRepeatHighest = options.emitRepeatHighest ?? false;
  const withinArrays = options.withinArrays ?? false;
  async function* rankArray2(input) {
    input = resolveToGen(input);
    let best;
    for await (const value of input) {
      let emit = false;
      if (withinArrays) best = void 0;
      for (const subValue of value) {
        if (includeType && typeof subValue !== includeType) continue;
        if (best === void 0) {
          best = subValue;
          emit = true;
        } else {
          const result = r(subValue, best);
          if (result == `a`) {
            best = subValue;
            emit = true;
          } else if (result === `eq` && emitEqualRanked) {
            emit = true;
          } else if (emitRepeatHighest) {
            emit = true;
          }
        }
      }
      if (emit && best) yield best;
    }
  }
  rankArray2._name = `rankArray`;
  return rankArray2;
}
function average2() {
  async function* average3(input) {
    input = resolveToGen(input);
    const p = average();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  average3._name = `average`;
  return average3;
}
function sum2$1() {
  async function* total(input) {
    input = resolveToGen(input);
    const p = sum();
    for await (const value of input) {
      const x = p(value);
      if (x === void 0) continue;
      yield x;
    }
  }
  total._name = `total`;
  return total;
}
function chunk(size, returnRemainders = true) {
  throwIntegerTest(size, `aboveZero`, `size`);
  async function* chunk2(input) {
    input = resolveToGen(input);
    let buffer = [];
    for await (const value of input) {
      buffer.push(value);
      if (buffer.length >= size) {
        yield buffer;
        buffer = [];
      }
    }
    if (returnRemainders && buffer.length > 0) yield buffer;
  }
  chunk2._name = `chunk`;
  return chunk2;
}
function filter3(predicate) {
  async function* filter5(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (predicate(value)) {
        yield value;
      }
    }
  }
  filter5._name = `filter`;
  return filter5;
}
function drop$1(predicate) {
  async function* drop2(input) {
    input = resolveToGen(input);
    for await (const value of input) {
      if (!predicate(value)) {
        yield value;
      }
    }
  }
  drop2._name = `drop`;
  return drop2;
}

// src/iterables/chain/AddToArray.ts
async function addToArray(array2, valueToWrap) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    array2.push(value);
  }
}

// src/iterables/chain/AsArray.ts
async function asArray(valueToWrap, options = {}) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  return toArray2(outputType, options);
}

// src/iterables/chain/AsCallback.ts
async function asCallback(valueToWrap, callback, onDone) {
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  for await (const value of outputType) {
    callback(value);
  }
  if (onDone) onDone();
}

// src/iterables/chain/AsPromise.ts
function asPromise(valueToWrap) {
  let lastValue;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  async function asPromise2() {
    const v = await outputType.next();
    if (v.done) return;
    lastValue = v.value;
    return lastValue;
  }
  return asPromise2;
}

// src/iterables/chain/AsValue.ts
function asValue(valueToWrap, initialValue) {
  let lastValue = initialValue;
  let awaiting = false;
  const outputType = typeof valueToWrap === `function` ? valueToWrap() : valueToWrap;
  function asValue2() {
    if (!awaiting) {
      awaiting = true;
      outputType.next().then((v) => {
        lastValue = v.value;
        awaiting = false;
      }).catch((error) => {
        awaiting = false;
        throw error;
      });
    }
    return lastValue;
  }
  return asValue2;
}

// src/iterables/chain/Run.ts
async function* runN(...functions) {
  let input;
  for (const fnOrData of functions) {
    input = typeof fnOrData === `function` ? fnOrData(input ?? []) : resolveToGen(fnOrData);
  }
  if (input === void 0) return;
  for await (const v of input) {
    yield v;
  }
}
async function* run$1(gen, l0, l1, l2, l3, l4, l5) {
  let input;
  const functions = arguments;
  for (const fnOrData of functions) {
    if (typeof fnOrData === `function`) {
      input = fnOrData(input ?? []);
    } else {
      input = resolveToGen(fnOrData);
    }
  }
  if (input === void 0) return;
  for await (const v of input) {
    yield v;
  }
}

// src/iterables/chain/Prepare.ts
function prepare$1(...functions) {
  const r = (source) => {
    return runN(source, ...functions);
  };
  return r;
}

// src/iterables/chain/from/index.ts
var from_exports = {};
__export(from_exports, {
  array: () => array$1,
  event: () => event$1,
  func: () => func$1,
  iterable: () => iterable,
  timestamp: () => timestamp
});

// src/iterables/chain/from/Array.ts
function array$1(it, delay2 = 5) {
  async function* fromArray4() {
    for (const v of it) {
      await sleep(delay2);
      yield v;
    }
  }
  fromArray4._name = `fromArray`;
  fromArray4._type = `GenFactoryNoInput`;
  return fromArray4;
}

// src/iterables/chain/from/Event.ts
function event$1(target, name) {
  async function* event2() {
    while (true) {
      yield await promiseFromEvent(target, name);
    }
  }
  event2._name = `event`;
  event2._type = `GenFactoryNoInput`;
  return event2;
}

// src/iterables/chain/from/Function.ts
function func$1(callback) {
  async function* fromFunction2() {
    while (true) {
      const v = await callback();
      if (v === void 0) break;
      yield v;
    }
  }
  fromFunction2._name = `fromFunction`;
  fromFunction2._type = `GenFactoryNoInput`;
  return fromFunction2;
}

// src/iterables/chain/from/Iterable.ts
function iterable(it) {
  async function* fromIterable4() {
    for await (const v of it) {
      yield v;
    }
  }
  fromIterable4._name = `fromIterable`;
  fromIterable4._type = `GenFactoryNoInput`;
  return fromIterable4;
}

// src/iterables/chain/from/Ticks.ts
function timestamp(options) {
  const intervalMs = intervalToMs(options.interval, 0);
  const asClockTime = options.asClockTime ?? false;
  const loops = options.loops ?? Number.MAX_SAFE_INTEGER;
  let looped = 0;
  const durationTime = intervalToMs(options.elapsed, Number.MAX_SAFE_INTEGER);
  async function* ts() {
    const elapsed = Elapsed_exports.since();
    while (looped < loops && elapsed() < durationTime) {
      yield asClockTime ? Date.now() : elapsed();
      const expectedTimeDiff = looped * intervalMs - elapsed();
      await sleep(Math.max(0, intervalMs + expectedTimeDiff));
      looped++;
    }
  }
  ts._name = `timestamp`;
  ts._type = `GenFactoryNoInput`;
  return ts;
}

// src/iterables/chain/Lazy.ts
var getLinkName = (c) => {
  return c._name ?? c.name;
};
function lazy() {
  const chained = [];
  let dataToUse;
  const asGenerator = (data) => {
    if (data === void 0) data = dataToUse;
    let d = resolveToAsyncGen(data);
    for (const c of chained) {
      if (d === void 0) {
        if (isGenFactoryNoInput(c)) {
          d = c();
        } else {
          throw new Error(`Function '${getLinkName(c)}' requires input. Provide it to the function, or call 'input' earlier.`);
        }
      } else {
        d = c(d);
      }
    }
    return d;
  };
  const w = {
    rankArray: (r, options) => {
      chained.push(rankArray(r, options));
      return w;
    },
    rank: (r, options) => {
      chained.push(rank2$1(r, options));
      return w;
    },
    transform: (transformer) => {
      chained.push(transform$1(transformer));
      return w;
    },
    reduce: (reducer) => {
      chained.push(reduce3(reducer));
      return w;
    },
    drop: (predicate) => {
      chained.push(drop$1(predicate));
      return w;
    },
    delay: (options) => {
      chained.push(delay(options));
      return w;
    },
    duration: (elapsed) => {
      chained.push(duration(elapsed));
      return w;
    },
    debounce: (rate) => {
      chained.push(debounce$1(rate));
      return w;
    },
    fromFunction: (callback) => {
      chained.push(func$1(callback));
      return w;
    },
    take: (limit) => {
      chained.push(take(limit));
      return w;
    },
    chunk: (size, returnRemainders = true) => {
      chained.push(chunk(size, returnRemainders));
      return w;
    },
    filter: (predicate) => {
      chained.push(filter3((v) => predicate(v)));
      return w;
    },
    min: () => {
      chained.push(min4());
      return w;
    },
    max: () => {
      chained.push(max4());
      return w;
    },
    average: () => {
      chained.push(average2());
      return w;
    },
    sum: () => {
      chained.push(sum2$1());
      return w;
    },
    tally: (countArrayItems) => {
      chained.push(tally2$1(countArrayItems));
      return w;
    },
    input(data) {
      dataToUse = data;
      return w;
    },
    asGenerator,
    asAsync(data) {
      let d = data ?? dataToUse;
      for (const c of chained) {
        if (d === void 0 && isGenFactoryNoInput(c)) {
          d = c();
        } else if (d === void 0) {
          throw new Error(`Function '${getLinkName(c)}' needs input. Pass in data calling 'asAsync', or call 'input' earlier`);
        } else {
          d = c(d);
        }
      }
      return w;
    },
    asArray: async (data) => {
      const g = asGenerator(data);
      return await toArray2(g);
    },
    firstOutput: async (data) => {
      const g = asGenerator(data);
      const v = await g.next();
      return v.value;
    },
    lastOutput: async (data) => {
      const g = asGenerator(data);
      let lastValue;
      for await (const v of g) {
        lastValue = v;
      }
      return lastValue;
    }
  };
  return w;
}

// src/iterables/chain/MergeFlat.ts
async function* mergeFlat(...sources) {
  const sourcesInput = sources.map((source) => resolveToAsyncGen(source));
  const buffer = queue_exports.mutable();
  let completed = 0;
  const schedule = async (source) => {
    if (source === void 0) {
      completed++;
      return;
    }
    const x = await source.next();
    if (x.done) {
      completed++;
    } else {
      buffer.enqueue(x.value);
      setTimeout(() => schedule(source), 1);
    }
  };
  for (const source of sourcesInput) {
    setTimeout(() => schedule(source), 1);
  }
  const loopSpeed = 10;
  let loopFactor = 1;
  while (completed < sourcesInput.length) {
    const d = buffer.dequeue();
    if (d === void 0) {
      loopFactor = Math.min(loopFactor + 1, 10);
    } else {
      yield d;
      loopFactor = 1;
    }
    await sleep(loopSpeed * loopFactor);
  }
}

// src/iterables/chain/CombineLatestToArray.ts
async function* combineLatestToArray$1(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const afterEmit = options.afterEmit ?? `last`;
  const inputs = sources.map((source, index) => ({ waiting: void 0, index, gen: resolveToGen(source), done: false, lastValue: void 0 }));
  const isDone = () => !inputs.some((v) => !v.done);
  const isWaiting = () => inputs.some((v) => v.waiting !== void 0);
  const allEmpty = (d) => !d.some((v) => v !== void 0);
  let lastEmitted = [];
  while (true) {
    const promises = [];
    for (const input of inputs) {
      if (input.done) continue;
      if (input.waiting !== void 0) {
        promises.push(input.waiting);
        continue;
      }
      const p = Promise.resolve((async () => {
        if (input.done) return input;
        const v = await input.gen.next();
        input.waiting = void 0;
        if (v.done) {
          input.done = true;
          if (finalValue === `undefined`) input.lastValue = void 0;
        } else {
          input.lastValue = v.value;
        }
        return input;
      })());
      input.waiting = p;
      promises.push(p);
    }
    const won = await Promise.race(promises);
    if (won.done && onSourceDone === `break`) break;
    const d = inputs.map((v) => v.lastValue);
    if (d.length === 0) {
      return;
    }
    const dataEmpty = allEmpty(d);
    if (dataEmpty && !isWaiting()) {
      return;
    }
    if (!isEqual(lastEmitted, d) && !dataEmpty) {
      lastEmitted = d;
      yield d;
    }
    if (afterEmit === `undefined`) {
      for (const input of inputs) {
        if (input.waiting !== void 0) continue;
        input.lastValue = void 0;
      }
    }
    if (isDone()) {
      break;
    }
  }
}

// src/iterables/chain/CombineLatestToObject.ts
async function* combineLatestToObject$1(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const afterEmit = options.afterEmit ?? `last`;
  const states = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(sources)) {
    states.set(key, {
      gen: resolveToGen(value),
      done: false,
      lastValue: void 0,
      waiting: void 0,
      key
    });
  }
  const isDone = () => !Map_exports.some(states, (v) => !v.done);
  const isWaiting = () => Map_exports.some(states, (v) => v.waiting !== void 0);
  const allEmpty = (d) => {
    for (const v of Object.values(d)) {
      if (v !== void 0) return false;
    }
    return true;
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) {
      r[key] = state.lastValue;
    }
    return r;
  };
  let lastEmitted;
  while (true) {
    const promises = [];
    for (const input of states.values()) {
      if (input.done) continue;
      if (input.waiting !== void 0) {
        promises.push(input.waiting);
        continue;
      }
      const p = Promise.resolve((async () => {
        if (input.done) return input;
        const v = await input.gen.next();
        input.waiting = void 0;
        if (v.done) {
          input.done = true;
          if (finalValue === `undefined`) input.lastValue = void 0;
        } else {
          input.lastValue = v.value;
        }
        return input;
      })());
      input.waiting = p;
      promises.push(p);
    }
    const won = await Promise.race(promises);
    if (won.done && onSourceDone === `break`) break;
    const d = getData();
    const dataEmpty = allEmpty(d);
    if (dataEmpty && !isWaiting()) {
      return;
    }
    if (!isEqualValueIgnoreOrder(lastEmitted, d) && !dataEmpty) {
      lastEmitted = d;
      yield d;
    }
    if (afterEmit === `undefined`) {
      for (const input of states.values()) {
        if (input.waiting !== void 0) continue;
        input.lastValue = void 0;
      }
    }
    if (isDone()) {
      break;
    }
  }
}

// src/iterables/chain/Single.ts
async function single(f, input) {
  const iterator = await f([input]).next();
  return iterator.value;
}

// src/iterables/chain/Sync.ts
async function* syncToArray$1(sources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const maximumWaitMs = intervalToMs(options.maximumWait, 2e3);
  const finalValue = options.finalValue ?? `undefined`;
  const inputs = sources.map((source) => ({ seq: 0, lastValue: void 0, gen: resolveToGen(source), done: false }));
  const nextWithTimeoutOpts = {
    millis: maximumWaitMs
  };
  let seq = 0;
  const isAllDone = () => !inputs.some((v) => !v.done);
  let go = true;
  while (go) {
    seq++;
    for (const input of inputs) {
      if (input.done) {
        input.seq = seq;
        continue;
      }
      const v = await nextWithTimeout(input.gen, nextWithTimeoutOpts);
      if (v.done) {
        input.done = true;
        input.seq = seq;
        if (finalValue === `undefined`) {
          input.lastValue = void 0;
        }
        if (onSourceDone === `break`) {
          return;
        }
      } else {
        input.lastValue = v.value;
        input.seq = seq;
      }
    }
    if (go) {
      const d = inputs.filter((v) => v.seq === seq).map((v) => v.lastValue);
      if (d.length === 0) return;
      if (!d.some((v) => v !== void 0)) return;
      yield d;
    }
    if (isAllDone()) go = false;
  }
}

// src/iterables/index.ts
function combineLatestToArray2(sources, options = {}) {
  return combineLatestToArray$1(sources, options);
}
function min5(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? min2$1(it, gt) : min$1(it, gt);
}
function max5(it, gt = (a, b) => a > b) {
  return isAsyncIterable(it) ? max2$1(it, gt) : max(it, gt);
}
function dropWhile3(it, f) {
  return isAsyncIterable(it) ? dropWhile2(it, f) : dropWhile(it, f);
}
function until3(it, callback) {
  if (isAsyncIterable(it)) {
    return until2(it, callback);
  } else {
    until$1(it, callback);
  }
}
function chunks3(it, size) {
  return isAsyncIterable(it) ? chunks2(it, size) : chunks$1(it, size);
}
function filter4(it, f) {
  return isAsyncIterable(it) ? filter2(it, f) : filter$2(it, f);
}
function fill3(it, v) {
  return isAsyncIterable(it) ? fill2(it, v) : fill(it, v);
}
function concat3(...its) {
  return isAsyncIterable(its[0]) ? concat2(...its) : concat(...its);
}
function find3(it, f) {
  return isAsyncIterable(it) ? find2(it, f) : find(it, f);
}
function forEach3(it, f) {
  if (isAsyncIterable(it)) {
    return forEach2(it, f);
  } else {
    forEach(it, f);
  }
}
function map3(it, f) {
  return isAsyncIterable(it) ? map2(it, f) : map(it, f);
}
function fromArray3(array2, interval) {
  return interval === void 0 ? fromArray(array2) : fromArray2(array2, interval);
}
function flatten3(it) {
  return isAsyncIterable(it) ? flatten2(it) : flatten$1(it);
}
function some3(it, f) {
  return isAsyncIterable(it) ? some2(it, f) : some(it, f);
}
function reduce4(it, f, start) {
  return isAsyncIterable(it) ? reduce2(it, f, start) : reduce(it, f, start);
}
function slice3(it, start = 0, end = Number.POSITIVE_INFINITY) {
  return isAsyncIterable(it) ? slice2(it, start, end) : slice(it, end);
}
function unique3(iterable2) {
  if (Array.isArray(iterable2)) {
    if (iterable2.length === 0) return fromArray([]);
    return isAsyncIterable(iterable2[0]) ? unique2(iterable2) : unique(iterable2);
  } else if (isAsyncIterable(iterable2)) {
    return unique2(iterable2);
  } else {
    return unique(iterable2);
  }
}
function* uniqueByValue3(input, toString = toStringDefault, seen = /* @__PURE__ */ new Set()) {
  return isAsyncIterable(input) ? uniqueByValue2(input, toString, seen) : uniqueByValue(input, toString, seen);
}
function toArray3(it, options = {}) {
  return isAsyncIterable(it) ? toArray2(it, options) : toArray$1(it, options);
}
function every3(it, f) {
  return isAsyncIterable(it) ? every2(it, f) : every(it, f);
}
function equals3(it1, it2, equality) {
  const as = isAsyncIterable(it1) && isAsyncIterable(it2);
  return as ? equals2(it1, it2, equality) : equals(it1, it2, equality);
}
function zip3(...its) {
  if (its.length === 0) return fromArray([]);
  return isAsyncIterable(its[0]) ? zip2(...its) : zip$1(...its);
}
function fromIterable3(iterable2, interval) {
  if (isAsyncIterable(iterable2) || interval !== void 0) return fromIterable2(iterable2, interval);
  return fromIterable(iterable2);
}

// src/data/TrackerBase.ts
var TrackerBase = class {
  /**
   * @ignore
   */
  seenCount;
  /**
   * @ignore
   */
  storeIntermediate;
  /**
   * @ignore
   */
  resetAfterSamples;
  /**
   * @ignore
   */
  sampleLimit;
  id;
  debug;
  constructor(opts = {}) {
    this.id = opts.id ?? `tracker`;
    this.debug = opts.debug ?? false;
    this.sampleLimit = opts.sampleLimit ?? -1;
    this.resetAfterSamples = opts.resetAfterSamples ?? -1;
    this.storeIntermediate = opts.storeIntermediate ?? (this.sampleLimit > -1 || this.resetAfterSamples > -1);
    this.seenCount = 0;
    if (this.debug) {
      console.log(`TrackerBase: sampleLimit: ${this.sampleLimit} resetAfter: ${this.resetAfterSamples} store: ${this.storeIntermediate}`);
    }
  }
  /**
   * Reset tracker
   */
  reset() {
    this.seenCount = 0;
    this.onReset();
  }
  /**
   * Calculate results
   *  
   * @param p 
   * @returns 
   */
  seen(...p) {
    if (this.resetAfterSamples > 0 && this.seenCount > this.resetAfterSamples) {
      this.reset();
    } else if (this.sampleLimit > 0 && this.seenCount > this.sampleLimit * 2) {
      this.seenCount = this.trimStore(this.sampleLimit);
      this.onTrimmed();
    }
    this.seenCount += p.length;
    const t = this.filterData(p);
    return this.computeResults(t);
  }
};

// src/data/TrackedValue.ts
var TrackedValueMap = class {
  store;
  gog;
  constructor(creator) {
    this.store = /* @__PURE__ */ new Map();
    this.gog = getOrGenerate(this.store, creator);
  }
  /**
   * Number of named values being tracked
   */
  get size() {
    return this.store.size;
  }
  /**
   * Returns _true_ if `id` is stored
   * @param id
   * @returns
   */
  has(id) {
    return this.store.has(id);
  }
  /**
   * For a given id, note that we have seen one or more values.
   * @param id Id
   * @param values Values(s)
   * @returns Information about start to last value
   */
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  //eslint-disable-next-line functional/prefer-immutable-types
  async seen(id, ...values) {
    const trackedValue = await this.getTrackedValue(id, ...values);
    const result = trackedValue.seen(...values);
    return result;
  }
  /**
   * Creates or returns a TrackedValue instance for `id`.
   * @param id
   * @param values
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  async getTrackedValue(id, ...values) {
    if (id === null) throw new Error(`id parameter cannot be null`);
    if (id === void 0) throw new Error(`id parameter cannot be undefined`);
    const trackedValue = await this.gog(id, values[0]);
    return trackedValue;
  }
  /**
   * Remove a tracked value by id.
   * Use {@link reset} to clear them all.
   * @param id
   */
  delete(id) {
    this.store.delete(id);
  }
  /**
   * Remove all tracked values.
   * Use {@link delete} to remove a single value by id.
   */
  reset() {
    this.store = /* @__PURE__ */ new Map();
  }
  /**
   * Enumerate ids
   */
  *ids() {
    yield* this.store.keys();
  }
  /**
   * Enumerate tracked values
   */
  *tracked() {
    yield* this.store.values();
  }
  /**
   * Iterates TrackedValues ordered with oldest first
   * @returns
   */
  *trackedByAge() {
    const tp = [...this.store.values()];
    tp.sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa > bb) return -1;
      return 1;
    });
    for (const t of tp) {
      yield t;
    }
  }
  /**
   * Iterates underlying values, ordered by age (oldest first)
   * First the named values are sorted by their `elapsed` value, and then
   * we return the last value for that group.
   */
  *valuesByAge() {
    for (const tb of this.trackedByAge()) {
      yield tb.last;
    }
  }
  /**
   * Enumerate last received values
   *
   * @example Calculate centroid of latest-received values
   * ```js
   * const pointers = pointTracker();
   * const c = Points.centroid(...Array.from(pointers.lastPoints()));
   * ```
   */
  *last() {
    for (const p of this.store.values()) {
      yield p.last;
    }
  }
  /**
   * Enumerate starting values
   */
  *initialValues() {
    for (const p of this.store.values()) {
      yield p.initial;
    }
  }
  /**
   * Returns a tracked value by id, or undefined if not found
   * @param id
   * @returns
   */
  get(id) {
    return this.store.get(id);
  }
};

// src/data/PrimitiveTracker.ts
var PrimitiveTracker = class extends TrackerBase {
  //computeResults(_p: Timestamped[]): TResult;
  values;
  timestamps;
  //data: Array<TimestampedPrimitive<V>>;
  constructor(opts) {
    super(opts);
    this.values = [];
    this.timestamps = [];
  }
  /**
   * Reduces size of value store to `limit`. Returns
   * number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length) return this.values.length;
    this.values = this.values.slice(-limit);
    this.timestamps = this.timestamps.slice(-limit);
    return this.values.length;
  }
  onTrimmed() {
  }
  get last() {
    return this.values.at(-1);
  }
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (this can include the initial value)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the instance was created
   */
  get elapsed() {
    if (this.values.length < 0) throw new Error(`No values seen yet`);
    return Date.now() - this.timestamps[0];
  }
  onReset() {
    this.values = [];
    this.timestamps = [];
  }
  /**
   * Tracks a value
   */
  filterData(rawValues) {
    const lastValue = rawValues.at(-1);
    const last = { value: lastValue, at: performance.now() };
    const values = rawValues.map((value) => ({
      at: performance.now(),
      value
    }));
    if (this.storeIntermediate) {
      this.values.push(...rawValues);
      this.timestamps.push(...values.map((v) => v.at));
    } else switch (this.values.length) {
      case 0: {
        this.values.push(last.value);
        this.timestamps.push(last.at);
        break;
      }
      case 2: {
        this.values[1] = last.value;
        this.timestamps[1] = last.at;
        break;
      }
      case 1: {
        this.values.push(last.value);
        this.timestamps.push(last.at);
        break;
      }
    }
    return values;
  }
};

// src/data/NumberTracker.ts
var NumberTracker = class extends PrimitiveTracker {
  total = 0;
  min = Number.MAX_SAFE_INTEGER;
  max = Number.MIN_SAFE_INTEGER;
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(opts) {
    super(opts);
  }
  get avg() {
    return this.total / this.seenCount;
  }
  /**
   * Difference between last value and initial.
   * Eg. if last value was 10 and initial value was 5, 5 is returned (10 - 5)
   * If either of those is missing, undefined is returned
   */
  difference() {
    if (this.last === void 0) return;
    if (this.initial === void 0) return;
    return this.last - this.initial;
  }
  /**
   * Relative difference between last value and initial.
   * Eg if last value was 10 and initial value was 5, 2 is returned (200%)
   */
  relativeDifference() {
    if (this.last === void 0) return;
    if (this.initial === void 0) return;
    return this.last / this.initial;
  }
  onReset() {
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = Number.MIN_SAFE_INTEGER;
    this.total = 0;
    super.onReset();
  }
  onTrimmed() {
    this.min = minFast(this.values);
    this.max = maxFast(this.values);
    this.total = totalFast(this.values);
  }
  computeResults(values) {
    if (values.some((v) => Number.isNaN(v))) throw new Error(`Cannot add NaN`);
    const numbers = values.map((value) => value.value);
    this.total = numbers.reduce((accumulator, v) => accumulator + v, this.total);
    this.min = Math.min(...numbers, this.min);
    this.max = Math.max(...numbers, this.max);
    const r = {
      max: this.max,
      min: this.min,
      total: this.total,
      avg: this.avg
    };
    return r;
  }
  getMinMaxAvg() {
    return {
      min: this.min,
      max: this.max,
      avg: this.avg
    };
  }
};
var numberTracker = (opts = {}) => new NumberTracker(opts);

// src/collections/arrays/MinMaxAvg.ts
var minMaxAvg = (data, opts = {}) => {
  if (data === void 0) throw new Error(`'data' is undefined`);
  if (!Array.isArray(data)) {
    if (`next` in data) {
      if (opts.startIndex || opts.endIndex) {
        data = slice(data, opts.startIndex, opts.endIndex);
      }
      let total2 = 0;
      let min = Number.MAX_SAFE_INTEGER;
      let max = Number.MIN_SAFE_INTEGER;
      let samples = 0;
      for (const v of data) {
        if (typeof v !== `number`) {
          throw new TypeError(`Generator should yield numbers. Got: ${typeof v}`);
        }
        total2 += v;
        samples++;
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
      return {
        avg: total2 / samples,
        total: total2,
        max,
        min
      };
    } else {
      throw new Error(`'data' parameter is neither array or iterable`);
    }
  }
  if (data.length === 0) {
    return {
      total: 0,
      min: 0,
      max: 0,
      avg: 0
    };
  }
  const startIndex = opts.startIndex ?? 0;
  const endIndex = opts.endIndex ?? data.length;
  const validNumbers = filterBetween(
    data,
    (d) => typeof d === `number` && !Number.isNaN(d),
    startIndex,
    endIndex
  );
  const total = validNumbers.reduce((accumulator, v) => accumulator + v, 0);
  return {
    total,
    max: Math.max(...validNumbers),
    min: Math.min(...validNumbers),
    avg: total / validNumbers.length
  };
};

// src/io/index.ts
var io_exports = {};
__export(io_exports, {
  AudioAnalysers: () => AudioAnalyser_exports,
  AudioVisualisers: () => AudioVisualiser_exports,
  Bluetooth: () => NordicBleDevice_exports,
  Camera: () => Camera_exports,
  Codec: () => Codec,
  Espruino: () => Espruino_exports,
  FrameProcessor: () => FrameProcessor,
  Serial: () => Serial_exports,
  StringReceiveBuffer: () => StringReceiveBuffer,
  StringWriteBuffer: () => StringWriteBuffer,
  VideoFile: () => VideoFile_exports,
  genericStateTransitionsInstance: () => genericStateTransitionsInstance,
  reconnectingWebsocket: () => reconnectingWebsocket
});

// src/io/NordicBleDevice.ts
var NordicBleDevice_exports = {};
__export(NordicBleDevice_exports, {
  NordicBleDevice: () => NordicBleDevice,
  defaultOpts: () => defaultOpts
});

// src/io/Codec.ts
var Codec = class {
  enc = new TextEncoder();
  dec = new TextDecoder(`utf-8`);
  /**
   * Convert string to Uint8Array buffer
   * @param str
   * @returns
   */
  toBuffer(str) {
    return this.enc.encode(str);
  }
  /**
   * Returns a string from a provided buffer
   * @param buffer
   * @returns
   */
  fromBuffer(buffer) {
    return this.dec.decode(buffer);
  }
};

// src/io/StringReceiveBuffer.ts
var StringReceiveBuffer = class {
  constructor(onData, separator = `
`) {
    this.onData = onData;
    this.separator = separator;
  }
  buffer = ``;
  stream;
  async close() {
    const s = this.stream;
    if (!s) return;
    await s.abort();
    await s.close();
  }
  clear() {
    this.buffer = ``;
  }
  writable() {
    if (this.stream === void 0) this.stream = this.createWritable();
    return this.stream;
  }
  createWritable() {
    const b = this;
    return new WritableStream({
      write(chunk) {
        b.add(chunk);
      },
      close() {
        b.clear();
      }
    });
  }
  addImpl(str) {
    const pos = str.indexOf(this.separator);
    if (pos < 0) {
      this.buffer += str;
      return ``;
    }
    const part = str.substring(0, pos);
    try {
      this.onData(this.buffer + part);
      str = str.substring(part.length + this.separator.length);
    } catch (ex) {
      console.warn(ex);
    }
    this.buffer = ``;
    return str;
  }
  add(str) {
    while (str.length > 0) {
      str = this.addImpl(str);
    }
  }
};

// src/io/StringWriteBuffer.ts
var StringWriteBuffer = class {
  /**
   * Constructor
   * @param dataHandler Calback to 'send' data onwards
   * @param opts Options
   */
  constructor(dataHandler, opts = {}) {
    this.dataHandler = dataHandler;
    this.chunkSize = opts.chunkSize ?? -1;
    this.writer = continuously(async () => {
      await this.onWrite();
    }, opts.interval ?? 10);
  }
  paused = false;
  queue = new QueueMutable();
  writer;
  stream;
  closed = false;
  chunkSize;
  /**
   * Close writer (async)
   */
  async close() {
    if (this.closed) return;
    const w = this.stream?.getWriter();
    w?.releaseLock();
    await w?.close();
    this.closed = true;
  }
  /**
   * Clear queued data.
   *
   * Throws an error if {@link close} has been called.
   */
  clear() {
    if (this.closed) throw new Error(`Buffer closed`);
    this.queue = new QueueMutable();
  }
  /**
   * Gets the buffer as a writable stream.
   *
   * Do not close stream directly, use .close on this class instead.
   *
   * Throws an error if .close() has been called.
   * @returns Underlying stream
   */
  writable() {
    if (this.closed) throw new Error(`Buffer closed`);
    if (this.stream === void 0) this.stream = this.createWritable();
    return this.stream;
  }
  createWritable() {
    const b = this;
    return new WritableStream({
      write(chunk) {
        b.add(chunk);
      },
      close() {
        b.clear();
      }
    });
  }
  /**
   * Run in a `continunously` loop to process queued data
   * @returns _False_ if queue is empty and loop should stop. _True_ if it shoud continue.
   */
  async onWrite() {
    if (this.queue.isEmpty) {
      return false;
    }
    if (this.paused) {
      console.warn(`WriteBuffer.onWrite: paused...`);
      return true;
    }
    const s = this.queue.dequeue();
    if (s === void 0) return false;
    await this.dataHandler(s);
    return true;
  }
  /**
   * Returns _true_ if {@link close} has been called.
   */
  get isClosed() {
    return this.closed;
  }
  /**
   * Adds some queued data to send.
   * Longer strings are automatically chunked up according to the buffer's settings.
   *
   * Throws an error if {@link close} has been called.
   * @param stringToQueue
   */
  add(stringToQueue) {
    if (this.closed) throw new Error(`Buffer closed`);
    if (this.chunkSize > 0) {
      this.queue.enqueue(...splitByLength(stringToQueue, this.chunkSize));
    } else {
      this.queue.enqueue(stringToQueue);
    }
    this.writer.start();
  }
};

// src/io/GenericStateTransitions.ts
var genericStateTransitionsInstance = Object.freeze({
  ready: `connecting`,
  connecting: [`connected`, `closed`],
  connected: [`closed`],
  closed: `connecting`
});

// src/io/BleDevice.ts
var BleDevice = class extends SimpleEventEmitter {
  constructor(device, config) {
    super();
    this.device = device;
    this.config = config;
    this.verboseLogging = config.debug;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config);
    this.rxBuffer = new StringReceiveBuffer((line) => {
      this.fireEvent(`data`, { data: line });
    });
    this.codec = new Codec();
    this.states = new StateMachineWithEvents(
      genericStateTransitionsInstance,
      {
        initial: `ready`
      }
    );
    this.states.addEventListener(`change`, (event) => {
      this.fireEvent(`change`, event);
      this.verbose(`${event.priorState} -> ${event.newState}`);
      if (event.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
    device.addEventListener(`gattserverdisconnected`, () => {
      if (this.isClosed) return;
      this.verbose(`GATT server disconnected`);
      this.states.state = `closed`;
    });
    this.verbose(`ctor ${device.name} ${device.id}`);
  }
  states;
  codec;
  rx;
  tx;
  gatt;
  verboseLogging = false;
  rxBuffer;
  txBuffer;
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`) {
      throw new Error(`Cannot write while state is ${this.states.state}`);
    }
    this.txBuffer.add(txt);
  }
  async writeInternal(txt) {
    this.verbose(`writeInternal ${txt}`);
    const tx = this.tx;
    if (tx === void 0) {
      throw new Error(`Unexpectedly without tx characteristic`);
    }
    try {
      await tx.writeValue(this.codec.toBuffer(txt));
    } catch (error) {
      this.warn(error);
    }
  }
  disconnect() {
    if (this.states.state !== `connected`) return;
    this.gatt?.disconnect();
  }
  async connect() {
    const attempts = this.config.connectAttempts ?? 3;
    this.states.state = `connecting`;
    this.verbose(`connect`);
    const gatt = this.device.gatt;
    if (gatt === void 0) throw new Error(`Gatt not available on device`);
    await retryFunction(
      async () => {
        this.verbose(`connect.retry`);
        const server = await gatt.connect();
        this.verbose(`Getting primary service`);
        const service = await server.getPrimaryService(this.config.service);
        this.verbose(`Getting characteristics`);
        const rx = await service.getCharacteristic(
          this.config.rxGattCharacteristic
        );
        const tx = await service.getCharacteristic(
          this.config.txGattCharacteristic
        );
        rx.addEventListener(
          `characteristicvaluechanged`,
          (event) => {
            this.onRx(event);
          }
        );
        this.rx = rx;
        this.tx = tx;
        this.gatt = gatt;
        this.states.state = `connected`;
        await rx.startNotifications();
        return true;
      },
      {
        limitAttempts: attempts,
        startAt: 200
      }
    );
  }
  onRx(event) {
    const rx = this.rx;
    if (rx === void 0) return;
    const view = event.target.value;
    if (view === void 0) return;
    let string_ = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(string_, 19);
    const plzStart = indexOfCharCode(string_, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      string_ = omitChars(string_, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      string_ = omitChars(string_, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(string_);
  }
  verbose(m) {
    if (this.verboseLogging) console.info(`${this.config.name}`, m);
  }
  log(m) {
    console.log(`${this.config.name}`, m);
  }
  warn(m) {
    console.warn(`${this.config.name}`, m);
  }
};

// src/io/NordicBleDevice.ts
var defaultOpts = {
  chunkSize: 20,
  service: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`,
  txGattCharacteristic: `6e400002-b5a3-f393-e0a9-e50e24dcca9e`,
  rxGattCharacteristic: `6e400003-b5a3-f393-e0a9-e50e24dcca9e`,
  name: `NordicDevice`,
  connectAttempts: 5,
  debug: false
};
var NordicBleDevice = class extends BleDevice {
  constructor(device, opts = {}) {
    super(device, { ...defaultOpts, ...opts });
  }
};

// src/io/AudioAnalyser.ts
var AudioAnalyser_exports = {};
__export(AudioAnalyser_exports, {
  AudioAnalyser: () => AudioAnalyser2,
  basic: () => basic,
  freq: () => freq,
  peakLevel: () => peakLevel
});

// src/io/AudioVisualiser.ts
var AudioVisualiser_exports = {};
__export(AudioVisualiser_exports, {
  default: () => AudioVisualiser
});
var AudioVisualiser = class {
  freqMaxRange = 200;
  audio;
  parent;
  lastPointer = { x: 0, y: 0 };
  pointerDown = false;
  pointerClicking = false;
  pointerClickDelayMs = 100;
  pointerDelaying = false;
  waveTracker;
  freqTracker;
  el;
  constructor(parentElem, audio) {
    this.audio = audio;
    this.parent = parentElem;
    this.waveTracker = numberTracker();
    this.freqTracker = numberTracker();
    parentElem.innerHTML = `
    <section>
      <button id="rendererComponentToggle">\u{1F53C}</button>
      <div>
        <h1>Visualiser</h1>
        <div style="display:flex; flex-wrap: wrap">
          <div class="visPanel">
            <h2>Frequency distribution</h2>
            <br />
            <canvas id="rendererComponentFreqData" height="200" width="400"></canvas>
          </div>
          <div class="visPanel">
            <h2>Waveform</h2>
            <button id="rendererComponentWaveReset">Reset</button>
            <div>
              Press and hold on wave to measure
            </div>
            <br />
            <canvas id="rendererComponentWaveData" height="200" width="400"></canvas>
          </div>
        </div>
      </div>
    </section>
    `;
    this.el = parentElem.children[0];
    document.getElementById(`rendererComponentToggle`)?.addEventListener(`click`, () => {
      this.setExpanded(!this.isExpanded());
    });
    this.el.addEventListener(`pointermove`, (e) => this.onPointer(e));
    this.el.addEventListener(`pointerup`, () => {
      this.pointerDelaying = false;
      this.pointerDown = false;
    });
    this.el.addEventListener(`pointerdown`, () => {
      this.pointerDelaying = true;
      setTimeout(() => {
        if (this.pointerDelaying) {
          this.pointerDelaying = false;
          this.pointerDown = true;
        }
      }, this.pointerClickDelayMs);
    });
    this.el.addEventListener(`pointerleave`, () => {
      this.pointerDelaying = false;
      this.pointerDown = false;
    });
    document.getElementById(`rendererComponentWaveReset`)?.addEventListener(`click`, () => {
      this.clear();
    });
  }
  renderFreq(freq2) {
    if (!this.isExpanded()) return;
    if (!freq2) return;
    const canvas = document.getElementById(
      `rendererComponentFreqData`
    );
    if (canvas === null) throw new Error(`Cannot find canvas element`);
    const g = canvas.getContext(`2d`);
    if (g === null) throw new Error(`Cannot create drawing context`);
    const bins = freq2.length;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    g.clearRect(0, 0, canvasWidth, canvasHeight);
    const pointer = this.getPointerRelativeTo(canvas);
    const width = canvasWidth / bins;
    const minMax = minMaxAvg(freq2);
    for (let i = 0; i < bins; i++) {
      if (!Number.isFinite(freq2[i])) continue;
      const value = freq2[i] - minMax.min;
      const valueRelative = value / this.freqMaxRange;
      const height = Math.abs(canvasHeight * valueRelative);
      const offset = canvasHeight - height;
      const hue = i / bins * 360;
      const left = i * width;
      g.fillStyle = `hsl(` + hue + `, 100%, 50%)`;
      if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= left && pointer.x <= left + width) {
        if (this.freqTracker.id !== i.toString()) {
          this.freqTracker = numberTracker({ id: i.toString() });
        }
        this.freqTracker.seen(freq2[i]);
        const freqMma = this.freqTracker.getMinMaxAvg();
        g.fillStyle = `black`;
        if (this.audio) {
          g.fillText(
            `Frequency (${i}) at pointer: ${this.audio.getFrequencyAtIndex(i).toLocaleString(`en`)} - ${this.audio.getFrequencyAtIndex(i + 1).toLocaleString(`en`)}`,
            2,
            10
          );
        }
        g.fillText(`Raw value: ${freq2[i].toFixed(2)}`, 2, 20);
        g.fillText(`Min: ${freqMma.min.toFixed(2)}`, 2, 40);
        g.fillText(`Max: ${freqMma.max.toFixed(2)}`, 60, 40);
        g.fillText(`Avg: ${freqMma.avg.toFixed(2)}`, 120, 40);
      }
      g.fillRect(left, offset, width, height);
    }
  }
  isExpanded() {
    const contentsElem = this.el.querySelector(`div`);
    if (contentsElem === null) throw new Error(`contents div not found`);
    return contentsElem.style.display === ``;
  }
  setExpanded(value) {
    const contentsElem = this.el.querySelector(`div`);
    const button = this.el.querySelector(`button`);
    if (button === null) throw new Error(`Button element not found`);
    if (contentsElem === null) throw new Error(`Contents element not found`);
    if (value) {
      contentsElem.style.display = ``;
      button.innerText = `\u{1F53C}`;
    } else {
      contentsElem.style.display = `none`;
      button.innerText = `\u{1F53D}`;
    }
  }
  clear() {
    this.clearCanvas(
      document.getElementById(`rendererComponentFreqData`)
    );
    this.clearCanvas(
      document.getElementById(`rendererComponentWaveData`)
    );
  }
  // Clears a canvas to white
  clearCanvas(canvas) {
    if (canvas === null) throw new Error(`Canvas is null`);
    const g = canvas.getContext(`2d`);
    if (g === null) throw new Error(`Cannot create drawing context`);
    g.fillStyle = `white`;
    g.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }
  // Renders waveform data.
  // Adapted from MDN's AnalyserNode.getFloatTimeDomainData() example
  renderWave(wave, bipolar = true) {
    if (!this.isExpanded()) return;
    if (!wave) return;
    const canvas = document.getElementById(
      `rendererComponentWaveData`
    );
    if (canvas === null) throw new Error(`Cannot find wave canvas`);
    const g = canvas.getContext(`2d`);
    if (g === null) throw new Error(`Cannot create drawing context for wave`);
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const pointer = this.getPointerRelativeTo(canvas);
    const infoAreaHeight = 20;
    const infoAreaWidth = 60;
    const bins = wave.length;
    g.fillStyle = `white`;
    g.fillRect(0, 0, infoAreaWidth, infoAreaHeight);
    const width = canvasWidth / bins;
    g.fillStyle = `rgba(255, 255, 255, 0.03)`;
    g.fillRect(0, 20, canvasWidth, canvasHeight);
    g.fillStyle = `red`;
    if (bipolar) {
      g.fillRect(0, canvasHeight / 2, canvasWidth, 1);
    } else {
      g.fillRect(0, canvasHeight - 1, canvasWidth, 1);
    }
    g.lineWidth = 1;
    g.strokeStyle = `black`;
    g.beginPath();
    let x = 0;
    for (let i = 0; i < bins; i++) {
      const height = wave[i] * canvasHeight;
      const y = bipolar ? canvasHeight / 2 - height : canvasHeight - height;
      if (i === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
      x += width;
      if (this.pointerDown) this.waveTracker.seen(wave[i]);
    }
    g.lineTo(canvasWidth, bipolar ? canvasHeight / 2 : canvasHeight);
    g.stroke();
    if (this.pointerDown) {
      const waveMma = this.waveTracker.getMinMaxAvg();
      g.fillStyle = `rgba(255,255,0,1)`;
      g.fillRect(infoAreaWidth, 0, 150, 20);
      g.fillStyle = `black`;
      g.fillText(`Min: ` + waveMma.min.toFixed(2), 60, 10);
      g.fillText(`Max: ` + waveMma.max.toFixed(2), 110, 10);
      g.fillText(`Avg: ` + waveMma.avg.toFixed(2), 160, 10);
    } else {
      this.waveTracker.reset();
    }
    if (pointer.y > 0 && pointer.y <= canvasHeight && pointer.x >= 0 && pointer.x <= canvasWidth) {
      g.fillStyle = `black`;
      g.fillText(
        `Level: ` + (1 - pointer.y / canvasHeight).toFixed(2),
        2,
        10
      );
    }
  }
  // Yields pointer position relative to given element
  getPointerRelativeTo(elem) {
    const rect = elem.getBoundingClientRect();
    return {
      x: this.lastPointer.x - rect.left - window.scrollX,
      //elem.offsetLeft + window.scrollX,
      y: this.lastPointer.y - rect.top - window.scrollY
      //elem.offsetTop + window.scrollY
    };
  }
  // Keeps track of last pointer position in page coordinate space
  onPointer(evt) {
    this.lastPointer = {
      x: evt.pageX,
      y: evt.pageY
    };
    evt.preventDefault();
  }
  // getMinMax(data, start = 0, end = data.length) {
  //   if (end > data.length) throw new Error(`end is past size of array`);
  //   if (start < 0) throw new Error(`start should be at least 0`);
  //   if (end <= start) throw new Error(`end should be greater than start`);
  //   let max = Number.MIN_SAFE_INTEGER;
  //   let min = Number.MAX_SAFE_INTEGER;
  //   for (let i = start; i < end; i++) {
  //     max = Math.max(data[i], max);
  //     min = Math.min(data[i], min);
  //   }
  //   if (!Number.isFinite(max)) max = 0;
  //   if (!Number.isFinite(min)) min = 0;
  //   return {max: max, min: min};
  // }
};

// src/io/AudioAnalyser.ts
var basic = (onData, opts = {}) => new AudioAnalyser2((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  const wave = new Float32Array(node.fftSize);
  node.getFloatFrequencyData(freq2);
  node.getFloatTimeDomainData(wave);
  onData(freq2, wave, analyser);
}, opts);
var freq = (onData, opts = {}) => new AudioAnalyser2((node, analyser) => {
  const freq2 = new Float32Array(node.frequencyBinCount);
  node.getFloatFrequencyData(freq2);
  onData(freq2, analyser);
}, opts);
var peakLevel = (onData, opts = {}) => new AudioAnalyser2((node, analyser) => {
  const wave = new Float32Array(node.fftSize);
  node.getFloatTimeDomainData(wave);
  onData(maxFast(wave), analyser);
}, opts);
var AudioAnalyser2 = class {
  showVis;
  fftSize;
  smoothingTimeConstant;
  #isPaused = false;
  debug;
  #initInProgress = false;
  visualiser;
  audioCtx;
  analyserNode;
  analyse;
  constructor(analyse, opts = {}) {
    this.showVis = opts.showVis ?? false;
    this.fftSize = opts.fftSize ?? 1024;
    this.debug = opts.debug ?? false;
    this.smoothingTimeConstant = opts.smoothingTimeConstant ?? 0.8;
    throwIntegerTest(this.fftSize, `positive`, `opts.fftSize`);
    throwNumberTest(
      this.smoothingTimeConstant,
      `percentage`,
      `opts.smoothingTimeConstant`
    );
    if (!isPowerOfTwo(this.fftSize)) {
      throw new Error(
        `fftSize must be a power of two from 32 to 32768 (${this.fftSize})`
      );
    }
    if (this.fftSize < 32) throw new Error(`fftSize must be at least 32`);
    if (this.fftSize > 32768) {
      throw new Error(`fftSize must be no greater than 32768`);
    }
    this.analyse = analyse;
    this.paused = false;
    this.init();
    const visualiserEl = document.querySelector(`#audio-visualiser`);
    if (visualiserEl) {
      const visualiser = new AudioVisualiser(visualiserEl, this);
      visualiser.setExpanded(this.showVis);
      this.visualiser = visualiser;
    }
  }
  init() {
    if (this.#initInProgress) {
      if (this.debug) console.debug(`Init already in progress`);
      return;
    }
    this.#initInProgress = true;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.onMicSuccess(stream);
    }).catch((error) => {
      this.#initInProgress = false;
      console.error(error);
    });
  }
  get paused() {
    return this.#isPaused;
  }
  set paused(v) {
    if (v === this.#isPaused) return;
    this.#isPaused = v;
    if (v) {
      if (this.debug) console.log(`Paused`);
    } else {
      if (this.debug) console.log(`Unpaused`);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    }
  }
  setup(context, stream) {
    const analyser = context.createAnalyser();
    analyser.fftSize = this.fftSize;
    analyser.smoothingTimeConstant = this.smoothingTimeConstant;
    const micSource = context.createMediaStreamSource(stream);
    micSource.connect(analyser);
    return analyser;
  }
  // Microphone successfully initalised, now have access to audio data
  onMicSuccess(stream) {
    try {
      const context = new AudioContext();
      context.addEventListener(`statechange`, () => {
        if (this.debug) console.log(`Audio context state: ${context.state}`);
      });
      this.audioCtx = context;
      this.analyserNode = this.setup(context, stream);
      window.requestAnimationFrame(this.analyseLoop.bind(this));
    } catch (error) {
      this.#initInProgress = false;
      console.error(error);
    }
  }
  analyseLoop() {
    if (this.paused) {
      if (this.debug) console.log(`Paused`);
      return;
    }
    const a = this.analyserNode;
    if (a === void 0) {
      console.warn(`Analyser undefined`);
      return;
    }
    try {
      this.analyse(a, this);
    } catch (error) {
      console.error(error);
    }
    window.requestAnimationFrame(this.analyseLoop.bind(this));
  }
  // visualise(wave, freq) {
  //   if (!this.visualiser) return;
  //   this.visualiser.renderWave(wave, true);
  //   this.visualiser.renderFreq(freq);
  // }
  /**
   * Returns the maximum FFT value within the given frequency range
   */
  getFrequencyRangeMax(lowFreq, highFreq, freqData) {
    const samples = this.sliceByFrequency(lowFreq, highFreq, freqData);
    return max$2(samples);
  }
  /**
   * Returns a sub-sampling of frequency analysis data that falls between
   * `lowFreq` and `highFreq`.
   * @param lowFreq Low frequency
   * @param highFreq High frequency
   * @param freqData Full-spectrum frequency data
   * @returns Sub-sampling of analysis
   */
  sliceByFrequency(lowFreq, highFreq, freqData) {
    const lowIndex = this.getIndexForFrequency(lowFreq);
    const highIndex = this.getIndexForFrequency(highFreq);
    const samples = freqData.slice(lowIndex, highIndex);
    return samples;
  }
  /**
   * Returns the starting frequency for a given binned frequency index.
   * @param index Array index
   * @returns Sound frequency
   */
  getFrequencyAtIndex(index) {
    const a = this.analyserNode;
    const ctx = this.audioCtx;
    if (a === void 0) throw new Error(`Analyser not available`);
    if (ctx === void 0) throw new Error(`Audio context not available`);
    throwIntegerTest(index, `positive`, `index`);
    if (index > a.frequencyBinCount) {
      throw new Error(
        `Index ${index} exceeds frequency bin count ${a.frequencyBinCount}`
      );
    }
    return index * ctx.sampleRate / (a.frequencyBinCount * 2);
  }
  /**
   * Returns a binned array index for a given frequency
   * @param freq Sound frequency
   * @returns Array index into frequency bins
   */
  getIndexForFrequency(freq2) {
    const a = this.analyserNode;
    if (a === void 0) throw new Error(`Analyser not available`);
    const nyquist = a.context.sampleRate / 2;
    const index = Math.round(freq2 / nyquist * a.frequencyBinCount);
    if (index < 0) return 0;
    if (index >= a.frequencyBinCount) return a.frequencyBinCount - 1;
    return index;
  }
};

// src/io/Espruino.ts
var Espruino_exports = {};
__export(Espruino_exports, {
  EspruinoBleDevice: () => EspruinoBleDevice,
  EspruinoSerialDevice: () => EspruinoSerialDevice,
  bangle: () => bangle,
  connectBle: () => connectBle,
  deviceEval: () => deviceEval,
  puck: () => puck,
  serial: () => serial
});

// src/io/EspruinoBleDevice.ts
var EspruinoBleDevice = class extends NordicBleDevice {
  evalTimeoutMs;
  evalReplyBluetooth = true;
  /**
   * Creates instance. You probably would rather use {@link puck} to create.
   * @param device
   * @param opts
   */
  constructor(device, opts = {}) {
    super(device, opts);
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  async eval(code, opts = {}, warn) {
    const debug = opts.debug ?? false;
    const warnCallback = warn ?? ((m) => {
      this.warn(m);
    });
    return deviceEval(code, opts, this, `Bluetooth.println`, debug, warnCallback);
  }
  /*
      const timeoutMs = opts.timeoutMs ?? this.evalTimeoutMs;
      const assumeExclusive = opts.assumeExclusive ?? true;
  
      if (typeof code !== `string`) throw new Error(`code parameter should be a string`);
        
      return new Promise((resolve, reject) => {
        // Generate a random id so reply can be matched up with this request
        const id = randomString(5);
  
        const onData = (d:DataEvent) => {
          try {
            // Parse reply, expecting JSON.
            const dd = JSON.parse(d.data);
  
            // Check for reply field, and that it matches
            if (`reply` in dd) {
              if (dd.reply === id) {
                done(); // Stop waiting for result
                if (`result` in dd) {
                  resolve(dd.result);
                }
              } else {
                this.warn(`Expected reply ${id}, got ${dd.reply}`);
              }
            }
          } catch (ex:unknown) {
            // If there was a syntax error, response won't be JSON
            if (assumeExclusive) {
              // Fail with unexpected reply as the message
              done(d.data);
            } else {
              // Unexpected reply, but we cannot be sure if it's in response to eval or
              // some other code running on board. So just warn and eventually timeout
              this.warn(ex);
            }
          }
        };
  
        const onStateChange = (e:StateChangeEvent) => {
          if (e.newState !== `connected`) done(`State changed to '${e.newState}', aborting`);
        };
  
        this.addEventListener(`data`, onData);
        this.addEventListener(`change`, onStateChange);
  
        // Init waitFor
        const done = waitFor(timeoutMs, (reason:string) => {
          reject(reason);
        }, () => {
          // If we got a response or there was a timeout, remove event listeners
          this.removeEventListener(`data`, onData);
          this.removeEventListener(`change`, onStateChange);
        });
  
        this.write(`\x10Bluetooth.println(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))\n`);
      });
    */
};

// src/io/Serial.ts
var Serial_exports = {};
__export(Serial_exports, {
  Device: () => Device
});

// src/io/JsonDevice.ts
var JsonDevice = class extends SimpleEventEmitter {
  states;
  codec;
  verboseLogging = false;
  name;
  connectAttempts;
  chunkSize;
  rxBuffer;
  txBuffer;
  constructor(config = {}) {
    super();
    this.verboseLogging = config.debug ?? false;
    this.chunkSize = config.chunkSize ?? 1024;
    this.connectAttempts = config.connectAttempts ?? 3;
    this.name = config.name ?? `JsonDevice`;
    this.txBuffer = new StringWriteBuffer(async (data) => {
      await this.writeInternal(data);
    }, config);
    this.rxBuffer = new StringReceiveBuffer((line) => {
      this.fireEvent(`data`, { data: line });
    });
    this.codec = new Codec();
    this.states = new StateMachineWithEvents(genericStateTransitionsInstance, {
      initial: `ready`
    });
    this.states.addEventListener(`change`, (event) => {
      this.fireEvent(`change`, event);
      this.verbose(`${event.priorState} -> ${event.newState}`);
      if (event.priorState === `connected`) {
        this.rxBuffer.clear();
        this.txBuffer.clear();
      }
    });
  }
  get isConnected() {
    return this.states.state === `connected`;
  }
  get isClosed() {
    return this.states.state === `closed`;
  }
  write(txt) {
    if (this.states.state !== `connected`) {
      throw new Error(`Cannot write while state is ${this.states.state}`);
    }
    this.txBuffer.add(txt);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async close() {
    if (this.states.state !== `connected`) return;
    this.onClosed();
  }
  async connect() {
    const attempts = this.connectAttempts;
    this.states.state = `connecting`;
    await this.onPreConnect();
    await retryFunction(
      async () => {
        await this.onConnectAttempt();
        this.states.state = `connected`;
        return true;
      },
      {
        limitAttempts: attempts,
        startAt: 200
      }
    );
  }
  onRx(event) {
    const view = event.target.value;
    if (view === void 0) return;
    let string_ = this.codec.fromBuffer(view.buffer);
    const plzStop = indexOfCharCode(string_, 19);
    const plzStart = indexOfCharCode(string_, 17);
    if (plzStart && plzStop < plzStart) {
      this.verbose(`Tx plz start`);
      string_ = omitChars(string_, plzStart, 1);
      this.txBuffer.paused = false;
    }
    if (plzStop && plzStop > plzStart) {
      this.verbose(`Tx plz stop`);
      string_ = omitChars(string_, plzStop, 1);
      this.txBuffer.paused = true;
    }
    this.rxBuffer.add(string_);
  }
  verbose(m) {
    if (this.verboseLogging) console.info(`${this.name}`, m);
  }
  log(m) {
    console.log(`${this.name}`, m);
  }
  warn(m) {
    console.warn(`${this.name}`, m);
  }
};

// src/io/Serial.ts
var Device = class extends JsonDevice {
  constructor(config = {}) {
    super(config);
    this.config = config;
    this.abort = new AbortController();
    const eol = config.eol ?? `\r
`;
    this.baudRate = config.baudRate ?? 9600;
    if (config.name === void 0) this.name = `Serial.Device`;
    this.rxBuffer.separator = eol;
  }
  port;
  tx;
  abort;
  baudRate;
  /**
   * Writes text collected in buffer
   * @param txt
   */
  async writeInternal(txt) {
    if (this.tx === void 0) throw new Error(`tx not ready`);
    try {
      this.tx.write(txt);
    } catch (error) {
      this.warn(error);
    }
  }
  onClosed() {
    this.tx?.releaseLock();
    this.abort.abort(`closing port`);
    this.states.state = `closed`;
  }
  onPreConnect() {
    return Promise.resolve();
  }
  async onConnectAttempt() {
    let reqOpts = {};
    const openOpts = {
      baudRate: this.baudRate
    };
    if (this.config.filters) reqOpts = { filters: [...this.config.filters] };
    this.port = await navigator.serial.requestPort(reqOpts);
    this.port.addEventListener(`disconnect`, (_) => {
      this.close();
    });
    await this.port.open(openOpts);
    const txW = this.port.writable;
    const txText = new TextEncoderStream();
    if (txW !== null) {
      txText.readable.pipeTo(txW, { signal: this.abort.signal }).catch((error) => {
        console.log(`Serial.onConnectAttempt txText pipe:`);
        console.log(error);
      });
      this.tx = txText.writable.getWriter();
    }
    const rxR = this.port.readable;
    const rxText = new TextDecoderStream();
    if (rxR !== null) {
      rxR.pipeTo(rxText.writable, { signal: this.abort.signal }).catch((error) => {
        console.log(`Serial.onConnectAttempt rxR pipe:`);
        console.log(error);
      });
      rxText.readable.pipeTo(this.rxBuffer.writable(), { signal: this.abort.signal }).catch((error) => {
        console.log(`Serial.onConnectAttempt rxText pipe:`);
        console.log(error);
        try {
          this.port?.close();
        } catch (error2) {
          console.log(error2);
        }
      });
    }
  }
};

// src/io/EspruinoSerialDevice.ts
var EspruinoSerialDevice = class extends Device {
  evalTimeoutMs;
  evalReplyBluetooth = false;
  constructor(opts) {
    super(opts);
    if (opts === void 0) opts = {};
    this.evalTimeoutMs = opts.evalTimeoutMs ?? 5 * 1e3;
  }
  async disconnect() {
    return super.close();
  }
  /**
   * Writes a script to Espruino.
   *
   * It will first send a CTRL+C to cancel any previous input, `reset()` to clear the board,
   * and then the provided `code` followed by a new line.
   *
   * Use {@link eval} instead to execute remote code and get the result back.
   *
   * ```js
   * // Eg from https://www.espruino.com/Web+Bluetooth
   * writeScript(`
   *  setInterval(() => Bluetooth.println(E.getTemperature()), 1000);
   *  NRF.on('disconnect',()=>reset());
   * `);
   * ```
   *
   * @param code Code to send. A new line is added automatically.
   */
  writeScript(code) {
    this.write(`reset();
`);
    this.write(`${code}
`);
  }
  /**
   * Sends some code to be executed on the Espruino. The result
   * is packaged into JSON and sent back to your code. An exception is
   * thrown if code can't be executed for some reason.
   *
   * ```js
   * const sum = await e.eval(`2+2`);
   * ```
   *
   * It will wait for a period of time for a well-formed response from the
   * Espruino. This might not happen if there is a connection problem
   * or a syntax error in the code being evaled. In cases like the latter,
   * it will take up to `timeoutMs` (default 5 seconds) before we give up
   * waiting for a correct response and throw an error.
   *
   * Tweaking of the timeout may be required if `eval()` is giving up too quickly
   * or too slowly. A default timeout can be given when creating the class.
   *
   * Options:
   *  timeoutMs: Timeout for execution. 5 seconds by default
   *  assumeExclusive: If true, eval assumes all replies from controller are in response to eval. True by default
   *  debug: If true, execution is traced via `warn` callback
   * @param code Code to run on the Espruino.
   * @param opts Options
   * @param warn Function to pass warning/trace messages to. If undefined, this.warn is used, printing to console.
   */
  async eval(code, opts = {}, warn) {
    const debug = opts.debug ?? false;
    const warner = warn ?? ((m) => {
      this.warn(m);
    });
    return deviceEval(code, opts, this, `USB.println`, debug, warner);
  }
};

// src/io/Espruino.ts
var puck = async (opts = {}) => {
  const name = opts.name ?? `Puck`;
  const debug = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts, `Puck.js`),
    optionalServices: [defaultOpts.service]
  });
  console.log(device.name);
  const d = new EspruinoBleDevice(device, { name, debug });
  await d.connect();
  return d;
};
var bangle = async (opts = {}) => {
  const name = opts.name ?? `Bangle`;
  const debug = opts.debug ?? false;
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts, `Bangle.js`),
    optionalServices: [defaultOpts.service]
  });
  console.log(device.name);
  const d = new EspruinoBleDevice(device, { name, debug });
  await d.connect();
  return d;
};
var serial = async (opts = {}) => {
  const d = new EspruinoSerialDevice(opts);
  await d.connect();
  return d;
};
var getFilters = (opts, defaultNamePrefix) => {
  const filters = [];
  if (opts.filters) {
    filters.push(...opts.filters);
  } else if (opts.name) {
    filters.push({ name: opts.name });
    console.info(`Filtering Bluetooth devices by name '${opts.name}'`);
  } else {
    filters.push({ namePrefix: defaultNamePrefix });
  }
  return filters;
};
var connectBle = async (opts = {}) => {
  const device = await navigator.bluetooth.requestDevice({
    filters: getFilters(opts, `Puck.js`),
    optionalServices: [defaultOpts.service]
  });
  const d = new EspruinoBleDevice(device, { name: `Espruino`, ...opts });
  await d.connect();
  return d;
};
var deviceEval = async (code, opts = {}, device, evalReplyPrefix, debug, warn) => {
  const timeoutMs = opts.timeoutMs ?? device.evalTimeoutMs;
  const assumeExclusive = opts.assumeExclusive ?? true;
  if (typeof code !== `string`) {
    throw new TypeError(`code parameter should be a string`);
  }
  return new Promise((resolve, reject) => {
    const id = string$1(5);
    const onData = (d) => {
      try {
        let cleaned = d.data;
        if (cleaned.startsWith(`>{`) && cleaned.endsWith(`}`)) {
          cleaned = cleaned.slice(1);
        }
        const dd = JSON.parse(cleaned);
        if (`reply` in dd) {
          if (dd.reply === id) {
            done();
            if (`result` in dd) {
              resolve(dd.result);
            }
          } else {
            warn(`Expected reply ${id}, got ${dd.reply}`);
          }
        } else {
          warn(`Expected packet, missing 'reply' field. Got: ${d.data}`);
        }
      } catch (error) {
        if (assumeExclusive) {
          done(d.data);
        } else {
          warn(error);
        }
      }
    };
    const onStateChange = (event) => {
      if (event.newState !== `connected`) {
        done(`State changed to '${event.newState}', aborting`);
      }
    };
    device.addEventListener(`data`, onData);
    device.addEventListener(`change`, onStateChange);
    const done = waitFor(
      timeoutMs,
      (reason) => {
        reject(new Error(reason));
      },
      () => {
        device.removeEventListener(`data`, onData);
        device.removeEventListener(`change`, onStateChange);
      }
    );
    const source = `${evalReplyPrefix}(JSON.stringify({reply:"${id}", result:JSON.stringify(${code})}))
`;
    if (debug) warn(source);
    device.write(source);
  });
};

// src/io/Camera.ts
var Camera_exports = {};
__export(Camera_exports, {
  dumpDevices: () => dumpDevices,
  start: () => start
});
var startTimeoutMs = 1e4;
var dumpDevices = async (filterKind = `videoinput`) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  for (const d of devices) {
    if (d.kind !== filterKind) continue;
    console.log(d.label);
    console.log(` Kind: ${d.kind}`);
    console.log(` Device id: ${d.deviceId}`);
  }
};
var start = async (constraints = {}) => {
  const videoEl = document.createElement(`VIDEO`);
  videoEl.style.display = `none`;
  videoEl.playsInline = true;
  videoEl.muted = true;
  videoEl.classList.add(`ixfx-camera`);
  document.body.append(videoEl);
  let stopVideo = () => {
  };
  const dispose = () => {
    try {
      stopVideo();
    } catch {
    }
    videoEl.remove();
  };
  try {
    const r = await startWithVideoEl(videoEl, constraints);
    stopVideo = r.dispose;
    return { videoEl, dispose };
  } catch (error) {
    console.error(error);
    dispose();
    throw error;
  }
};
var startWithVideoEl = async (videoEl, constraints = {}) => {
  if (videoEl === void 0) throw new Error(`videoEl undefined`);
  if (videoEl === null) throw new Error(`videoEl null`);
  const maxResolution = constraints.max;
  const minResolution = constraints.min;
  const idealResolution = constraints.ideal;
  const c = {
    audio: false,
    video: {
      width: {},
      height: {}
    }
  };
  if (constraints.facingMode === `front`) {
    constraints = { ...constraints, facingMode: `user` };
  }
  if (constraints.facingMode === `back`) {
    constraints = { ...constraints, facingMode: `environment` };
  }
  if (constraints.facingMode) {
    c.video.facingMode = constraints.facingMode;
  }
  if (constraints.deviceId) {
    c.video.deviceId = constraints.deviceId;
  }
  if (idealResolution) {
    c.video.width = {
      ...c.video.width,
      ideal: idealResolution.width
    };
    c.video.height = {
      ...c.video.height,
      ideal: idealResolution.height
    };
  }
  if (maxResolution) {
    c.video.width = {
      ...c.video.width,
      max: maxResolution.width
    };
    c.video.height = {
      ...c.video.height,
      max: maxResolution.height
    };
  }
  if (minResolution) {
    c.video.width = {
      ...c.video.width,
      min: minResolution.width
    };
    c.video.height = {
      ...c.video.height,
      min: minResolution.height
    };
  }
  const done = waitFor(
    constraints.startTimeoutMs ?? startTimeoutMs,
    (reason) => {
      throw new Error(`Camera getUserMedia failed: ${reason}`);
    }
  );
  try {
    const stream = await navigator.mediaDevices.getUserMedia(c);
    const dispose = () => {
      videoEl.pause();
      const t = stream.getTracks();
      for (const track of t) track.stop();
    };
    videoEl.srcObject = stream;
    done();
    const returnValue = { videoEl, dispose };
    const p = new Promise((resolve, reject) => {
      videoEl.addEventListener(`loadedmetadata`, () => {
        videoEl.play().then(() => {
          resolve(returnValue);
        }).catch((error) => {
          reject(error);
        });
      });
    });
    return p;
  } catch (error) {
    done(getErrorMessage(error));
    throw error;
  }
};

// src/io/VideoFile.ts
var VideoFile_exports = {};
__export(VideoFile_exports, {
  start: () => start2
});
var start2 = async (file) => {
  const videoEl = document.createElement(`VIDEO`);
  videoEl.style.display = `none`;
  videoEl.playsInline = true;
  videoEl.muted = true;
  videoEl.classList.add(`ixfx-video`);
  document.body.appendChild(videoEl);
  let stopVideo = () => {
  };
  const dispose = () => {
    try {
      stopVideo();
    } catch {
    }
    videoEl.remove();
  };
  try {
    const r = await startWithVideoEl2(videoEl, file);
    stopVideo = r.dispose;
    return { videoEl, dispose };
  } catch (ex) {
    console.error(ex);
    dispose();
    throw ex;
  }
};
var startWithVideoEl2 = async (videoEl, file) => {
  if (videoEl === void 0) throw new Error(`videoEl undefined`);
  if (videoEl === null) throw new Error(`videoEl null`);
  const url = URL.createObjectURL(file);
  videoEl.src = url;
  videoEl.loop = true;
  const dispose = () => {
    videoEl.pause();
  };
  const ret = { videoEl, dispose };
  const p = new Promise((resolve, reject) => {
    videoEl.addEventListener(`loadedmetadata`, () => {
      videoEl.play().then(() => {
        resolve(ret);
      }).catch((ex) => {
        reject(ex);
      });
    });
  });
  return p;
};

// src/visual/Video.ts
var Video_exports = {};
__export(Video_exports, {
  capture: () => capture,
  frames: () => frames,
  manualCapture: () => manualCapture
});
async function* frames(sourceVideoEl, opts = {}) {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  let canvasEl = opts.canvasEl;
  let w, h;
  w = h = 0;
  if (canvasEl === void 0) {
    canvasEl = document.createElement(`CANVAS`);
    canvasEl.classList.add(`ixfx-frames`);
    if (!showCanvas) {
      canvasEl.style.display = `none`;
    }
    document.body.appendChild(canvasEl);
  }
  const updateSize = () => {
    if (canvasEl === void 0) return;
    w = sourceVideoEl.videoWidth;
    h = sourceVideoEl.videoHeight;
    canvasEl.width = w;
    canvasEl.height = h;
  };
  let c = null;
  const looper = delayLoop(maxIntervalMs);
  for await (const _ of looper) {
    if (w === 0 || h === 0) updateSize();
    if (w === 0 || h === 0) continue;
    if (c === null) c = canvasEl.getContext(`2d`);
    if (c === null) return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c.getImageData(0, 0, w, h);
    yield pixels;
  }
}
var capture = (sourceVideoEl, opts = {}) => {
  const maxIntervalMs = opts.maxIntervalMs ?? 0;
  const showCanvas = opts.showCanvas ?? false;
  const onFrame = opts.onFrame;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const canvasEl = document.createElement(`CANVAS`);
  canvasEl.classList.add(`ixfx-capture`);
  if (!showCanvas) {
    canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  let c = null;
  let worker;
  if (opts.workerScript) {
    worker = new Worker(opts.workerScript);
  }
  const getPixels = worker || onFrame;
  if (!getPixels && !showCanvas) {
    console.warn(
      `Video will be captured to hidden element without any processing. Is this what you want?`
    );
  }
  const loop = continuously(() => {
    if (c === null) c = canvasEl.getContext(`2d`);
    if (c === null) return;
    c.drawImage(sourceVideoEl, 0, 0, w, h);
    let pixels;
    if (getPixels) {
      pixels = c.getImageData(0, 0, w, h);
    }
    if (worker) {
      worker.postMessage(
        {
          pixels: pixels.data.buffer,
          width: w,
          height: h,
          channels: 4
        },
        [pixels.data.buffer]
      );
    }
    if (onFrame) {
      try {
        onFrame(pixels);
      } catch (e) {
        console.error(e);
      }
    }
  }, maxIntervalMs);
  return {
    start: () => loop.start(),
    cancel: () => loop.cancel(),
    canvasEl
  };
};
var manualCapture = (sourceVideoEl, opts = {}) => {
  const showCanvas = opts.showCanvas ?? false;
  const w = sourceVideoEl.videoWidth;
  const h = sourceVideoEl.videoHeight;
  const definedCanvasEl = opts.canvasEl !== void 0;
  let canvasEl = opts.canvasEl;
  if (!canvasEl) {
    canvasEl = document.createElement(`CANVAS`);
    canvasEl.classList.add(`ixfx-capture`);
    document.body.append(canvasEl);
    if (!showCanvas) canvasEl.style.display = `none`;
  }
  canvasEl.width = w;
  canvasEl.height = h;
  const capture2 = () => {
    let c2;
    if (!c2) c2 = canvasEl?.getContext(`2d`, { willReadFrequently: true });
    if (!c2) throw new Error(`Could not create graphics context`);
    c2.drawImage(sourceVideoEl, 0, 0, w, h);
    const pixels = c2.getImageData(0, 0, w, h);
    pixels.currentTime = sourceVideoEl.currentTime;
    if (opts.postCaptureDraw) opts.postCaptureDraw(c2, w, h);
    return pixels;
  };
  const dispose = () => {
    if (definedCanvasEl) return;
    try {
      canvasEl?.remove();
    } catch (_) {
    }
  };
  const c = {
    canvasEl,
    capture: capture2,
    dispose
  };
  return c;
};

// src/io/FrameProcessor.ts
var FrameProcessor = class {
  _source;
  _state;
  _teardownNeeded = false;
  _cameraConstraints;
  _cameraStartResult;
  _videoSourceCapture;
  _videoFile;
  _videoStartResult;
  _showCanvas;
  _showPreview;
  _postCaptureDraw;
  _timer;
  _captureCanvasEl;
  /**
   * Create a new frame processor
   * @param opts
   */
  constructor(opts = {}) {
    this._state = `ready`;
    this._source = ``;
    this._timer = performance.now();
    this._showCanvas = opts.showCanvas ?? false;
    this._showPreview = opts.showPreview ?? false;
    this._cameraConstraints = opts.cameraConstraints ?? void 0;
    this._captureCanvasEl = opts.captureCanvasEl ?? void 0;
    this._postCaptureDraw = opts.postCaptureDraw;
  }
  /**
   * Hides or shows the raw source in the DOM
   * @param enabled Preview enabled
   */
  showPreview(enabled) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    let el;
    switch (this._source) {
      case `camera`: {
        el = this._cameraStartResult?.videoEl;
        if (el !== void 0) el.style.display = enabled ? `block` : `none`;
        break;
      }
    }
    this._showPreview = enabled;
  }
  /**
   * Shows or hides the Canvas we're capturing to
   * @param enabled
   */
  showCanvas(enabled) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    let el;
    if (this._source === `camera` || this._source === `video`) {
      el = this._videoSourceCapture?.canvasEl;
      if (el !== void 0) el.style.display = enabled ? `block` : `none`;
    } else throw new Error(`Source not implemented: ${this._source}`);
    this._showCanvas = enabled;
  }
  /**
   * Returns the current capturer instance
   * @returns
   */
  getCapturer() {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    if (this._source === `camera` || this._source === `video`) {
      return this._videoSourceCapture;
    }
    throw new Error(`Source kind not supported ${this._source}`);
  }
  /**
   * Grab frames from a video camera source and initialises
   * frame processor.
   *
   * If `constraints` are not specified, it will use the ones
   * provided when creating the class, or defaults.
   *
   * @param constraints Override of constraints when requesting camera access
   */
  async useCamera(constraints) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    this._source = `camera`;
    if (this._teardownNeeded) this.teardown();
    if (constraints) this._cameraConstraints;
    await this.init();
  }
  async useVideo(file) {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    this._source = `video`;
    if (this._teardownNeeded) this.teardown();
    this._videoFile = file;
    await this.init();
  }
  /**
   * Initialises camera
   */
  async initCamera() {
    const r = await start(this._cameraConstraints);
    if (r === void 0) throw new Error(`Could not start camera`);
    this._cameraStartResult = r;
    this.postInit(r);
  }
  async initVideo() {
    if (!this._videoFile) throw new Error(`Video file not defined`);
    const r = await start2(this._videoFile);
    this._videoStartResult = r;
    this.postInit(r);
  }
  async postInit(r) {
    if (this._showPreview) r.videoEl.style.display = `block`;
    this._videoSourceCapture = manualCapture(r.videoEl, {
      postCaptureDraw: this._postCaptureDraw,
      showCanvas: this._showCanvas,
      canvasEl: this._captureCanvasEl
    });
    this._teardownNeeded = true;
    this._cameraStartResult = r;
  }
  /**
   * Closes down connections and removes created elements.
   * Once disposed, the frame processor cannot be used
   * @returns
   */
  dispose() {
    if (this._state === `disposed`) return;
    this.teardown();
    this._state = `disposed`;
  }
  async init() {
    this._timer = performance.now();
    switch (this._source) {
      case `camera`: {
        await this.initCamera();
        break;
      }
      case `video`: {
        await this.initVideo();
        break;
      }
    }
    this._state = `initialised`;
  }
  teardown() {
    if (!this._teardownNeeded) return;
    if (this._source === `camera` || this._source === `video`) {
      this._videoSourceCapture?.dispose();
    }
    switch (this._source) {
      case `camera`: {
        this._cameraStartResult?.dispose();
        break;
      }
      case `video`: {
        this._videoStartResult?.dispose();
        break;
      }
    }
    this._teardownNeeded = false;
  }
  /**
   * Get the last frame
   * @returns
   */
  getFrame() {
    if (this._state === `disposed`) throw new Error(`Disposed`);
    switch (this._source) {
      case `camera`: {
        return this.getFrameCamera();
      }
      case `video`: {
        return this.getFrameCamera();
      }
      default: {
        throw new Error(`source type unhandled ${this._source}`);
      }
    }
  }
  /**
   * Get the timestamp of the processor (elapsed time since starting)
   * @returns
   */
  getTimestamp() {
    return performance.now() - this._timer;
  }
  getFrameCamera() {
    return this._videoSourceCapture?.capture();
  }
};

// src/io/ReconnectingWebSocket.ts
var reconnectingWebsocket = (url, opts = {}) => {
  const startDelayMs = intervalToMs(opts.startDelay, 2e3);
  const maxDelayMs = intervalToMs(opts.maxDelay, startDelayMs * 10);
  const checkStateMs = intervalToMs(opts.checkStateMs, 5e3);
  if (startDelayMs > maxDelayMs) throw new Error(`startDelay should be less than maxDelay`);
  if (checkStateMs < 0) throw new Error(`Param 'checkState' should be above zero`);
  let reconnect = true;
  let currentState = StateMachine_exports.init({
    closed: `connecting`,
    open: `closed`,
    connecting: [`closed`, `open`]
  });
  let ws;
  const onError = (event_) => {
    if (opts.onError) {
      opts.onError(event_);
    } else {
      console.log(`rw on error`, event_);
      console.error(` error: ${event_.error}`);
      console.error(` type: ${event_.type}`);
      console.error(` error msg: ${event_.message}`);
    }
  };
  const onMessage = (message) => {
    if (opts.onMessage) opts.onMessage(message.data);
  };
  const connect = async () => {
    if (currentState.value === `connecting`) throw new Error(`Cannot connect twice`);
    currentState = StateMachine_exports.to(currentState, `connecting`);
    if (ws !== void 0) {
      ws.removeEventListener(`error`, onError);
      if (opts.onMessage) {
        ws.removeEventListener(`message`, onMessage);
      }
      ws = void 0;
    }
    const retry = await retryTask({
      async probe(_attempts) {
        try {
          const wss = new WebSocket(url);
          const r = await eventRace(wss, [`open`, `error`], { timeout: 1e3 });
          return r.type === `open` ? { success: true, value: wss } : { success: false, value: void 0 };
        } catch (error) {
          return { success: false, message: getErrorMessage(error) };
        }
      }
    }, { predelayMs: startDelayMs, limitAttempts: opts.limitAttempts });
    ws = retry.value;
    let result = false;
    if (retry.success && ws) {
      ws.addEventListener(`error`, onError);
      if (opts.onMessage) {
        ws.addEventListener(`message`, onMessage);
      }
      result = true;
      currentState = StateMachine_exports.to(currentState, `open`);
      if (opts.onConnected) opts.onConnected();
    } else {
      currentState = StateMachine_exports.to(currentState, `closed`);
    }
    return result;
  };
  const send = (data) => {
    if (ws) {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      } else {
        onDisconnected();
      }
    } else {
      throw new Error(`Not connected`);
    }
  };
  const onDisconnected = () => {
    if (currentState.value === `closed`) return;
    if (currentState.value === `open`) {
      currentState = StateMachine_exports.to(currentState, `closed`);
      if (opts.onDisconnected) opts.onDisconnected();
    }
    if (reconnect && currentState.value !== `connecting`) {
      console.log(`Scheduling connect`);
      setTimeout(() => {
        void connect();
      }, 100);
    }
  };
  const isConnected = () => {
    if (!ws) return false;
    return ws.readyState === ws.OPEN;
  };
  const close = () => {
    reconnect = false;
    currentState = StateMachine_exports.to(currentState, `closed`);
    ws?.close();
    if (opts.onDisconnected) opts.onDisconnected();
  };
  const open = () => {
    reconnect = true;
    if (currentState.value === `open`) return Promise.resolve(true);
    if (currentState.value === `connecting`) return Promise.resolve(false);
    return connect();
  };
  void connect();
  setInterval(() => {
    if (!ws) return;
    switch (ws.readyState) {
      case ws.CLOSED: {
        if (currentState.value === `open`) {
          onDisconnected();
        }
        break;
      }
    }
  }, checkStateMs);
  return { send, isConnected, close, open };
};

// src/collections/arrays/index.ts
var arrays_exports = {};
__export(arrays_exports, {
  additionalValues: () => additionalValues,
  average: () => average$1,
  averageWeighted: () => averageWeighted,
  chunks: () => chunks,
  circularArray: () => circularArray,
  contains: () => contains,
  containsDuplicateInstances: () => containsDuplicateInstances,
  containsDuplicateValues: () => containsDuplicateValues,
  cycle: () => cycle,
  dotProduct: () => dotProduct,
  ensureLength: () => ensureLength,
  filterAB: () => filterAB,
  filterBetween: () => filterBetween,
  flatten: () => flatten,
  groupBy: () => groupBy,
  guardArray: () => guardArray,
  guardIndex: () => guardIndex,
  insertAt: () => insertAt,
  interleave: () => interleave,
  isContentsTheSame: () => isContentsTheSame,
  isEqual: () => isEqual,
  max: () => max$2,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  mergeByKey: () => mergeByKey,
  min: () => min$3,
  minFast: () => minFast,
  minIndex: () => minIndex,
  minMaxAvg: () => minMaxAvg,
  pairwise: () => pairwise,
  pairwiseReduce: () => pairwiseReduce,
  randomElement: () => randomElement,
  randomElementWeightedSource: () => randomElementWeightedSource,
  randomIndex: () => randomIndex,
  randomPluck: () => randomPluck,
  remove: () => remove,
  sample: () => sample,
  shuffle: () => shuffle,
  sortByNumericProperty: () => sortByNumericProperty,
  total: () => total,
  totalFast: () => totalFast,
  unique: () => unique$1,
  until: () => until,
  validNumbers: () => validNumbers,
  weight: () => weight,
  without: () => without,
  withoutUndefined: () => withoutUndefined,
  zip: () => zip
});

// src/collections/arrays/ArrayCycle.ts
var cycle = (options) => {
  const opts = [...options];
  let index = 0;
  const next = () => {
    index++;
    if (index === opts.length) index = 0;
    return value();
  };
  const prev = () => {
    index--;
    if (index === -1) index = opts.length - 1;
    return value();
  };
  const value = () => {
    return opts.at(index);
  };
  const select = (indexOrValue) => {
    if (typeof indexOrValue === `number`) {
      index = indexOrValue;
    } else {
      const found = opts.indexOf(indexOrValue);
      if (found === -1) throw new Error(`Could not find value`);
      index = found;
    }
  };
  const toArray = () => [...opts];
  return { toArray, next, prev, get current() {
    return value();
  }, select };
};

// src/collections/arrays/Chunks.ts
function chunks(array, size) {
  const output = [];
  for (let index = 0; index < array.length; index += size) {
    output.push(array.slice(index, index + size));
  }
  return output;
}

// src/collections/arrays/Contains.ts
var contains = (haystack, needles, eq = isEqualDefault) => {
  if (!Array.isArray(haystack)) {
    throw new TypeError(`Expects haystack parameter to be an array`);
  }
  if (!Array.isArray(needles)) {
    throw new TypeError(`Expects needles parameter to be an array`);
  }
  for (const needle of needles) {
    let found = false;
    for (const element of haystack) {
      if (eq(needle, element)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};
var containsDuplicateValues = (array, keyFunction = toStringDefault) => {
  if (!Array.isArray(array)) throw new Error(`Parameter needs to be an array`);
  try {
    const _ = fromIterable$1(array, keyFunction);
  } catch {
    return true;
  }
  return false;
};

// src/collections/arrays/EnsureLength.ts
var ensureLength = (data, length, expand = `undefined`) => {
  if (data === void 0) throw new Error(`Data undefined`);
  if (!Array.isArray(data)) throw new Error(`data is not an array`);
  if (data.length === length) return [...data];
  if (data.length > length) {
    return data.slice(0, length);
  }
  const d = [...data];
  const add = length - d.length;
  for (let index = 0; index < add; index++) {
    switch (expand) {
      case `undefined`: {
        d.push(void 0);
        break;
      }
      case `repeat`: {
        d.push(data[index % data.length]);
        break;
      }
      case `first`: {
        d.push(data[0]);
        break;
      }
      case `last`: {
        d.push(data.at(-1));
        break;
      }
    }
  }
  return d;
};

// src/collections/arrays/Flatten.ts
var flatten = (array) => [...array].flat();

// src/collections/arrays/GroupBy.ts
var groupBy = (array, grouper) => {
  const map = /* @__PURE__ */ new Map();
  for (const a of array) {
    const key = grouper(a);
    let existing = map.get(key);
    if (!existing) {
      existing = [];
      map.set(key, existing);
    }
    existing.push(a);
  }
  return map;
};

// src/collections/arrays/InsertAt.ts
var insertAt = (data, index, ...values) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`Param 'data' is not an arry`);
  }
  return [...data.slice(0, index), ...values, ...data.slice(index + 1)];
};

// src/collections/arrays/Interleave.ts
var interleave = (...arrays) => {
  if (arrays.some((a) => !Array.isArray(a))) {
    throw new Error(`All parameters must be an array`);
  }
  const lengths = arrays.map((a) => a.length);
  if (!isContentsTheSame(lengths)) {
    throw new Error(`Arrays must be of same length`);
  }
  const returnValue = [];
  const length = lengths[0];
  for (let index = 0; index < length; index++) {
    for (const array of arrays) {
      returnValue.push(array[index]);
    }
  }
  return returnValue;
};

// src/collections/arrays/MergeByKey.ts
var mergeByKey = (keyFunction, reconcile, ...arrays) => {
  const result = /* @__PURE__ */ new Map();
  for (const m of arrays) {
    for (const mv of m) {
      if (mv === void 0) continue;
      const mk = keyFunction(mv);
      let v = result.get(mk);
      v = v ? reconcile(v, mv) : mv;
      result.set(mk, v);
    }
  }
  return [...result.values()];
};

// src/collections/arrays/Remove.ts
var remove = (data, index) => {
  if (!Array.isArray(data)) {
    throw new TypeError(`'data' parameter should be an array`);
  }
  guardIndex(data, index, `index`);
  return [...data.slice(0, index), ...data.slice(index + 1)];
};

// src/collections/arrays/Sample.ts
var sample = (array, amount) => {
  let subsampleSteps = 1;
  if (amount <= 1) {
    const numberOfItems = array.length * amount;
    subsampleSteps = Math.round(array.length / numberOfItems);
  } else {
    subsampleSteps = amount;
  }
  throwIntegerTest(subsampleSteps, `positive`, `amount`);
  if (subsampleSteps > array.length - 1) {
    throw new Error(`Subsample steps exceeds array length`);
  }
  const r = [];
  for (let index = subsampleSteps - 1; index < array.length; index += subsampleSteps) {
    r.push(array[index]);
  }
  return r;
};

// src/collections/arrays/Until.ts
var until = (data, predicate, initial) => {
  const returnValue = [];
  let total2 = initial;
  for (const datum of data) {
    const [stop, accumulator] = predicate(datum, total2);
    if (stop) break;
    total2 = accumulator;
    returnValue.push(datum);
  }
  return returnValue;
};

// src/collections/index.ts
var collections_exports = {};
__export(collections_exports, {
  Arrays: () => arrays_exports,
  Maps: () => Map_exports,
  QueueImmutable: () => QueueImmutable,
  QueueMutable: () => QueueMutable,
  Queues: () => queue_exports,
  SetStringImmutable: () => SetStringImmutable,
  SetStringMutable: () => SetStringMutable,
  Sets: () => set_exports,
  StackImmutable: () => StackImmutable,
  StackMutable: () => StackMutable,
  Stacks: () => stack_exports,
  Trees: () => tree_exports,
  circularArray: () => circularArray
});

// src/collections/stack/index.ts
var stack_exports = {};
__export(stack_exports, {
  immutable: () => immutable,
  mutable: () => mutable$1
});

// src/collections/stack/StackImmutable.ts
var StackImmutable = class _StackImmutable {
  opts;
  /* eslint-disable-next-line functional/prefer-readonly-type */
  data;
  constructor(opts = {}, data = []) {
    this.opts = opts;
    this.data = data;
  }
  push(...toAdd) {
    return new _StackImmutable(
      this.opts,
      push(this.opts, this.data, ...toAdd)
    );
  }
  pop() {
    return new _StackImmutable(this.opts, pop(this.opts, this.data));
  }
  forEach(fn) {
    this.data.forEach(fn);
  }
  forEachFromTop(fn) {
    [...this.data].reverse().forEach(fn);
  }
  get isEmpty() {
    return isEmpty(this.opts, this.data);
  }
  get isFull() {
    return isFull(this.opts, this.data);
  }
  get peek() {
    return peek(this.opts, this.data);
  }
  get length() {
    return this.data.length;
  }
};
var immutable = (opts = {}, ...startingItems) => new StackImmutable({ ...opts }, [...startingItems]);

// src/KeyValue.ts
var KeyValue_exports = {};
__export(KeyValue_exports, {
  getSorter: () => getSorter,
  minMaxAvg: () => minMaxAvg2
});
var sorterByValueIndex = (index, reverse = false) => {
  return (values) => {
    const s = values.toSorted((a, b) => {
      return defaultComparer(a[index], b[index]);
    });
    if (reverse) return s.reverse();
    return s;
  };
};
var getSorter = (sortStyle) => {
  switch (sortStyle) {
    case `value`: {
      return sorterByValueIndex(1, false);
    }
    case `value-reverse`: {
      return sorterByValueIndex(1, true);
    }
    case `key`: {
      return sorterByValueIndex(0, false);
    }
    case `key-reverse`: {
      return sorterByValueIndex(0, true);
    }
    default: {
      throw new Error(`Unknown sorting value '${sortStyle}'. Expecting: value, value-reverse, key or key-reverse`);
    }
  }
};
var minMaxAvg2 = (entries, conversionFunction) => {
  const converter = conversionFunction ?? ((v) => v[1]);
  const values = entries.map((entry) => converter(entry));
  return minMaxAvg(values);
};

// src/data/Compare.ts
var compareKeys = (a, b) => {
  const c = compareValuesShallow(Object.keys(a), Object.keys(b));
  return c;
};
var changedDataFields = (a, b) => {
  const r = compareData(a, b, true);
  if (Object.entries(r.added).length > 0) throw new Error(`Shape of data has changed`);
  if (Object.entries(r.removed).length > 0) throw new Error(`Shape of data has changed`);
  const output = compareResultToObject(r, b);
  return output;
};
var compareResultToObject = (r, b) => {
  const output = {};
  if (r.isArray) {
    return b;
  }
  for (const entry of Object.entries(r.changed)) {
    output[entry[0]] = entry[1];
  }
  for (const entry of Object.entries(r.added)) {
    output[entry[0]] = entry[1];
  }
  for (const childEntry of Object.entries(r.children)) {
    if (childEntry[1].hasChanged) {
      output[childEntry[0]] = compareResultToObject(childEntry[1], b[childEntry[0]]);
    }
  }
  return output;
};
var compareArrays = (a, b, eq = isEqualDefault) => {
  if (!Array.isArray(a)) throw new Error(`Param 'a' is not an array`);
  if (!Array.isArray(b)) throw new Error(`Param 'b' is not an array`);
  const c = compareData(a, b, false, eq);
  if (!c.isArray) throw new Error(`Change set does not have arrays as parameters`);
  const convert = (key) => {
    if (key.startsWith(`_`)) {
      return Number.parseInt(key.slice(1));
    } else throw new Error(`Unexpected key '${key}'`);
  };
  const cc = {
    ...c,
    added: mapKeys(c.added, convert),
    changed: mapKeys(c.changed, convert),
    removed: c.removed.map((v) => convert(v)),
    summary: c.summary.map((value) => {
      return [value[0], convert(value[1]), value[2]];
    })
  };
  return cc;
};
var compareData = (a, b, assumeSameShape = false, eq = isEqualDefault) => {
  const entriesA = Object.entries(a);
  const entriesB = Object.entries(b);
  const scannedKeys = /* @__PURE__ */ new Set();
  const changed = {};
  const added = {};
  const children = {};
  const removed = [];
  const isArray = Array.isArray(a);
  const summary = new Array();
  let hasChanged = false;
  for (const entry of entriesA) {
    const outputKey = isArray ? `_${entry[0]}` : entry[0];
    const aValue = entry[1];
    const bValue = b[entry[0]];
    scannedKeys.add(entry[0]);
    if (bValue === void 0) {
      hasChanged = true;
      if (assumeSameShape && !isArray) {
        changed[outputKey] = bValue;
        summary.push([`mutate`, outputKey, bValue]);
      } else {
        removed.push(outputKey);
        summary.push([`del`, outputKey, aValue]);
      }
      continue;
    }
    if (typeof aValue === `object`) {
      const r = compareData(aValue, bValue, assumeSameShape, eq);
      if (r.hasChanged) hasChanged = true;
      children[outputKey] = r;
      const childSummary = r.summary.map((sum) => {
        return [sum[0], outputKey + `.` + sum[1], sum[2]];
      });
      summary.push(...childSummary);
    } else {
      if (!eq(aValue, bValue)) {
        changed[outputKey] = bValue;
        hasChanged = true;
        summary.push([`mutate`, outputKey, bValue]);
      }
    }
  }
  if (!assumeSameShape || isArray) {
    for (const entry of entriesB) {
      const key = isArray ? `_${entry[0]}` : entry[0];
      if (scannedKeys.has(entry[0])) continue;
      added[key] = entry[1];
      hasChanged = true;
      summary.push([`add`, key, entry[1]]);
    }
  }
  return {
    changed,
    added,
    removed,
    children,
    hasChanged,
    isArray,
    summary
  };
};

// node_modules/json5/dist/index.js
var require_dist = __commonJS({
  "node_modules/json5/dist/index.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
    })(exports, function() {
      function createCommonjsModule(fn, module2) {
        return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
      }
      var _global = createCommonjsModule(function(module2) {
        var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
        if (typeof __g == "number") {
          __g = global;
        }
      });
      var _core = createCommonjsModule(function(module2) {
        var core = module2.exports = { version: "2.6.5" };
        if (typeof __e == "number") {
          __e = core;
        }
      });
      _core.version;
      var _isObject = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
      };
      var _anObject = function(it) {
        if (!_isObject(it)) {
          throw TypeError(it + " is not an object!");
        }
        return it;
      };
      var _fails = function(exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };
      var _descriptors = !_fails(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
      var document2 = _global.document;
      var is = _isObject(document2) && _isObject(document2.createElement);
      var _domCreate = function(it) {
        return is ? document2.createElement(it) : {};
      };
      var _ie8DomDefine = !_descriptors && !_fails(function() {
        return Object.defineProperty(_domCreate("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
      var _toPrimitive = function(it, S) {
        if (!_isObject(it)) {
          return it;
        }
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
          return val;
        }
        throw TypeError("Can't convert object to primitive value");
      };
      var dP = Object.defineProperty;
      var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine) {
          try {
            return dP(O, P, Attributes);
          } catch (e) {
          }
        }
        if ("get" in Attributes || "set" in Attributes) {
          throw TypeError("Accessors not supported!");
        }
        if ("value" in Attributes) {
          O[P] = Attributes.value;
        }
        return O;
      };
      var _objectDp = {
        f
      };
      var _propertyDesc = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value
        };
      };
      var _hide = _descriptors ? function(object2, key2, value) {
        return _objectDp.f(object2, key2, _propertyDesc(1, value));
      } : function(object2, key2, value) {
        object2[key2] = value;
        return object2;
      };
      var hasOwnProperty = {}.hasOwnProperty;
      var _has = function(it, key2) {
        return hasOwnProperty.call(it, key2);
      };
      var id = 0;
      var px = Math.random();
      var _uid = function(key2) {
        return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
      };
      var _shared = createCommonjsModule(function(module2) {
        var SHARED = "__core-js_shared__";
        var store = _global[SHARED] || (_global[SHARED] = {});
        (module2.exports = function(key2, value) {
          return store[key2] || (store[key2] = value !== void 0 ? value : {});
        })("versions", []).push({
          version: _core.version,
          mode: "global",
          copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
        });
      });
      var _functionToString = _shared("native-function-to-string", Function.toString);
      var _redefine = createCommonjsModule(function(module2) {
        var SRC = _uid("src");
        var TO_STRING = "toString";
        var TPL = ("" + _functionToString).split(TO_STRING);
        _core.inspectSource = function(it) {
          return _functionToString.call(it);
        };
        (module2.exports = function(O, key2, val, safe) {
          var isFunction = typeof val == "function";
          if (isFunction) {
            _has(val, "name") || _hide(val, "name", key2);
          }
          if (O[key2] === val) {
            return;
          }
          if (isFunction) {
            _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
          }
          if (O === _global) {
            O[key2] = val;
          } else if (!safe) {
            delete O[key2];
            _hide(O, key2, val);
          } else if (O[key2]) {
            O[key2] = val;
          } else {
            _hide(O, key2, val);
          }
        })(Function.prototype, TO_STRING, function toString() {
          return typeof this == "function" && this[SRC] || _functionToString.call(this);
        });
      });
      var _aFunction = function(it) {
        if (typeof it != "function") {
          throw TypeError(it + " is not a function!");
        }
        return it;
      };
      var _ctx = function(fn, that, length2) {
        _aFunction(fn);
        if (that === void 0) {
          return fn;
        }
        switch (length2) {
          case 1:
            return function(a) {
              return fn.call(that, a);
            };
          case 2:
            return function(a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function(a, b, c2) {
              return fn.call(that, a, b, c2);
            };
        }
        return function() {
          return fn.apply(that, arguments);
        };
      };
      var PROTOTYPE = "prototype";
      var $export = function(type, name, source2) {
        var IS_FORCED = type & $export.F;
        var IS_GLOBAL = type & $export.G;
        var IS_STATIC = type & $export.S;
        var IS_PROTO = type & $export.P;
        var IS_BIND = type & $export.B;
        var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
        var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
        var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
        var key2, own, out, exp;
        if (IS_GLOBAL) {
          source2 = name;
        }
        for (key2 in source2) {
          own = !IS_FORCED && target && target[key2] !== void 0;
          out = (own ? target : source2)[key2];
          exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
          if (target) {
            _redefine(target, key2, out, type & $export.U);
          }
          if (exports2[key2] != out) {
            _hide(exports2, key2, exp);
          }
          if (IS_PROTO && expProto[key2] != out) {
            expProto[key2] = out;
          }
        }
      };
      _global.core = _core;
      $export.F = 1;
      $export.G = 2;
      $export.S = 4;
      $export.P = 8;
      $export.B = 16;
      $export.W = 32;
      $export.U = 64;
      $export.R = 128;
      var _export = $export;
      var ceil = Math.ceil;
      var floor = Math.floor;
      var _toInteger = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
      };
      var _defined = function(it) {
        if (it == void 0) {
          throw TypeError("Can't call method on  " + it);
        }
        return it;
      };
      var _stringAt = function(TO_STRING) {
        return function(that, pos2) {
          var s = String(_defined(that));
          var i = _toInteger(pos2);
          var l = s.length;
          var a, b;
          if (i < 0 || i >= l) {
            return TO_STRING ? "" : void 0;
          }
          a = s.charCodeAt(i);
          return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
        };
      };
      var $at = _stringAt(false);
      _export(_export.P, "String", {
        // 21.1.3.3 String.prototype.codePointAt(pos)
        codePointAt: function codePointAt2(pos2) {
          return $at(this, pos2);
        }
      });
      _core.String.codePointAt;
      var max3 = Math.max;
      var min3 = Math.min;
      var _toAbsoluteIndex = function(index, length2) {
        index = _toInteger(index);
        return index < 0 ? max3(index + length2, 0) : min3(index, length2);
      };
      var fromCharCode = String.fromCharCode;
      var $fromCodePoint = String.fromCodePoint;
      _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
        // 21.1.2.2 String.fromCodePoint(...codePoints)
        fromCodePoint: function fromCodePoint2(x) {
          var arguments$1 = arguments;
          var res = [];
          var aLen = arguments.length;
          var i = 0;
          var code;
          while (aLen > i) {
            code = +arguments$1[i++];
            if (_toAbsoluteIndex(code, 1114111) !== code) {
              throw RangeError(code + " is not a valid code point");
            }
            res.push(
              code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320)
            );
          }
          return res.join("");
        }
      });
      _core.String.fromCodePoint;
      var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
      var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
      var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
      var unicode = {
        Space_Separator,
        ID_Start,
        ID_Continue
      };
      var util = {
        isSpaceSeparator: function isSpaceSeparator(c2) {
          return typeof c2 === "string" && unicode.Space_Separator.test(c2);
        },
        isIdStartChar: function isIdStartChar(c2) {
          return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
        },
        isIdContinueChar: function isIdContinueChar(c2) {
          return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
        },
        isDigit: function isDigit(c2) {
          return typeof c2 === "string" && /[0-9]/.test(c2);
        },
        isHexDigit: function isHexDigit(c2) {
          return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
        }
      };
      var source;
      var parseState;
      var stack;
      var pos;
      var line2;
      var column;
      var token;
      var key;
      var root;
      var parse = function parse2(text, reviver) {
        source = String(text);
        parseState = "start";
        stack = [];
        pos = 0;
        line2 = 1;
        column = 0;
        token = void 0;
        key = void 0;
        root = void 0;
        do {
          token = lex();
          parseStates[parseState]();
        } while (token.type !== "eof");
        if (typeof reviver === "function") {
          return internalize({ "": root }, "", reviver);
        }
        return root;
      };
      function internalize(holder, name, reviver) {
        var value = holder[name];
        if (value != null && typeof value === "object") {
          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              var key2 = String(i);
              var replacement = internalize(value, key2, reviver);
              if (replacement === void 0) {
                delete value[key2];
              } else {
                Object.defineProperty(value, key2, {
                  value: replacement,
                  writable: true,
                  enumerable: true,
                  configurable: true
                });
              }
            }
          } else {
            for (var key$1 in value) {
              var replacement$1 = internalize(value, key$1, reviver);
              if (replacement$1 === void 0) {
                delete value[key$1];
              } else {
                Object.defineProperty(value, key$1, {
                  value: replacement$1,
                  writable: true,
                  enumerable: true,
                  configurable: true
                });
              }
            }
          }
        }
        return reviver.call(holder, name, value);
      }
      var lexState;
      var buffer;
      var doubleQuote;
      var sign;
      var c;
      function lex() {
        lexState = "default";
        buffer = "";
        doubleQuote = false;
        sign = 1;
        for (; ; ) {
          c = peek();
          var token2 = lexStates[lexState]();
          if (token2) {
            return token2;
          }
        }
      }
      function peek() {
        if (source[pos]) {
          return String.fromCodePoint(source.codePointAt(pos));
        }
      }
      function read() {
        var c2 = peek();
        if (c2 === "\n") {
          line2++;
          column = 0;
        } else if (c2) {
          column += c2.length;
        } else {
          column++;
        }
        if (c2) {
          pos += c2.length;
        }
        return c2;
      }
      var lexStates = {
        default: function default$1() {
          switch (c) {
            case "	":
            case "\v":
            case "\f":
            case " ":
            case "\xA0":
            case "\uFEFF":
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              read();
              return;
            case "/":
              read();
              lexState = "comment";
              return;
            case void 0:
              read();
              return newToken("eof");
          }
          if (util.isSpaceSeparator(c)) {
            read();
            return;
          }
          return lexStates[parseState]();
        },
        comment: function comment() {
          switch (c) {
            case "*":
              read();
              lexState = "multiLineComment";
              return;
            case "/":
              read();
              lexState = "singleLineComment";
              return;
          }
          throw invalidChar(read());
        },
        multiLineComment: function multiLineComment() {
          switch (c) {
            case "*":
              read();
              lexState = "multiLineCommentAsterisk";
              return;
            case void 0:
              throw invalidChar(read());
          }
          read();
        },
        multiLineCommentAsterisk: function multiLineCommentAsterisk() {
          switch (c) {
            case "*":
              read();
              return;
            case "/":
              read();
              lexState = "default";
              return;
            case void 0:
              throw invalidChar(read());
          }
          read();
          lexState = "multiLineComment";
        },
        singleLineComment: function singleLineComment() {
          switch (c) {
            case "\n":
            case "\r":
            case "\u2028":
            case "\u2029":
              read();
              lexState = "default";
              return;
            case void 0:
              read();
              return newToken("eof");
          }
          read();
        },
        value: function value() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
            case "n":
              read();
              literal("ull");
              return newToken("null", null);
            case "t":
              read();
              literal("rue");
              return newToken("boolean", true);
            case "f":
              read();
              literal("alse");
              return newToken("boolean", false);
            case "-":
            case "+":
              if (read() === "-") {
                sign = -1;
              }
              lexState = "sign";
              return;
            case ".":
              buffer = read();
              lexState = "decimalPointLeading";
              return;
            case "0":
              buffer = read();
              lexState = "zero";
              return;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              buffer = read();
              lexState = "decimalInteger";
              return;
            case "I":
              read();
              literal("nfinity");
              return newToken("numeric", Infinity);
            case "N":
              read();
              literal("aN");
              return newToken("numeric", NaN);
            case '"':
            case "'":
              doubleQuote = read() === '"';
              buffer = "";
              lexState = "string";
              return;
          }
          throw invalidChar(read());
        },
        identifierNameStartEscape: function identifierNameStartEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          var u = unicodeEscape();
          switch (u) {
            case "$":
            case "_":
              break;
            default:
              if (!util.isIdStartChar(u)) {
                throw invalidIdentifier();
              }
              break;
          }
          buffer += u;
          lexState = "identifierName";
        },
        identifierName: function identifierName() {
          switch (c) {
            case "$":
            case "_":
            case "\u200C":
            case "\u200D":
              buffer += read();
              return;
            case "\\":
              read();
              lexState = "identifierNameEscape";
              return;
          }
          if (util.isIdContinueChar(c)) {
            buffer += read();
            return;
          }
          return newToken("identifier", buffer);
        },
        identifierNameEscape: function identifierNameEscape() {
          if (c !== "u") {
            throw invalidChar(read());
          }
          read();
          var u = unicodeEscape();
          switch (u) {
            case "$":
            case "_":
            case "\u200C":
            case "\u200D":
              break;
            default:
              if (!util.isIdContinueChar(u)) {
                throw invalidIdentifier();
              }
              break;
          }
          buffer += u;
          lexState = "identifierName";
        },
        sign: function sign$1() {
          switch (c) {
            case ".":
              buffer = read();
              lexState = "decimalPointLeading";
              return;
            case "0":
              buffer = read();
              lexState = "zero";
              return;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              buffer = read();
              lexState = "decimalInteger";
              return;
            case "I":
              read();
              literal("nfinity");
              return newToken("numeric", sign * Infinity);
            case "N":
              read();
              literal("aN");
              return newToken("numeric", NaN);
          }
          throw invalidChar(read());
        },
        zero: function zero() {
          switch (c) {
            case ".":
              buffer += read();
              lexState = "decimalPoint";
              return;
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
            case "x":
            case "X":
              buffer += read();
              lexState = "hexadecimal";
              return;
          }
          return newToken("numeric", sign * 0);
        },
        decimalInteger: function decimalInteger() {
          switch (c) {
            case ".":
              buffer += read();
              lexState = "decimalPoint";
              return;
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalPointLeading: function decimalPointLeading() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          throw invalidChar(read());
        },
        decimalPoint: function decimalPoint() {
          switch (c) {
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalFraction";
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalFraction: function decimalFraction() {
          switch (c) {
            case "e":
            case "E":
              buffer += read();
              lexState = "decimalExponent";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        decimalExponent: function decimalExponent() {
          switch (c) {
            case "+":
            case "-":
              buffer += read();
              lexState = "decimalExponentSign";
              return;
          }
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentSign: function decimalExponentSign() {
          if (util.isDigit(c)) {
            buffer += read();
            lexState = "decimalExponentInteger";
            return;
          }
          throw invalidChar(read());
        },
        decimalExponentInteger: function decimalExponentInteger() {
          if (util.isDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        hexadecimal: function hexadecimal() {
          if (util.isHexDigit(c)) {
            buffer += read();
            lexState = "hexadecimalInteger";
            return;
          }
          throw invalidChar(read());
        },
        hexadecimalInteger: function hexadecimalInteger() {
          if (util.isHexDigit(c)) {
            buffer += read();
            return;
          }
          return newToken("numeric", sign * Number(buffer));
        },
        string: function string2() {
          switch (c) {
            case "\\":
              read();
              buffer += escape();
              return;
            case '"':
              if (doubleQuote) {
                read();
                return newToken("string", buffer);
              }
              buffer += read();
              return;
            case "'":
              if (!doubleQuote) {
                read();
                return newToken("string", buffer);
              }
              buffer += read();
              return;
            case "\n":
            case "\r":
              throw invalidChar(read());
            case "\u2028":
            case "\u2029":
              separatorChar(c);
              break;
            case void 0:
              throw invalidChar(read());
          }
          buffer += read();
        },
        start: function start() {
          switch (c) {
            case "{":
            case "[":
              return newToken("punctuator", read());
          }
          lexState = "value";
        },
        beforePropertyName: function beforePropertyName() {
          switch (c) {
            case "$":
            case "_":
              buffer = read();
              lexState = "identifierName";
              return;
            case "\\":
              read();
              lexState = "identifierNameStartEscape";
              return;
            case "}":
              return newToken("punctuator", read());
            case '"':
            case "'":
              doubleQuote = read() === '"';
              lexState = "string";
              return;
          }
          if (util.isIdStartChar(c)) {
            buffer += read();
            lexState = "identifierName";
            return;
          }
          throw invalidChar(read());
        },
        afterPropertyName: function afterPropertyName() {
          if (c === ":") {
            return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforePropertyValue: function beforePropertyValue() {
          lexState = "value";
        },
        afterPropertyValue: function afterPropertyValue() {
          switch (c) {
            case ",":
            case "}":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        beforeArrayValue: function beforeArrayValue() {
          if (c === "]") {
            return newToken("punctuator", read());
          }
          lexState = "value";
        },
        afterArrayValue: function afterArrayValue() {
          switch (c) {
            case ",":
            case "]":
              return newToken("punctuator", read());
          }
          throw invalidChar(read());
        },
        end: function end() {
          throw invalidChar(read());
        }
      };
      function newToken(type, value) {
        return {
          type,
          value,
          line: line2,
          column
        };
      }
      function literal(s) {
        for (var i = 0, list = s; i < list.length; i += 1) {
          var c2 = list[i];
          var p = peek();
          if (p !== c2) {
            throw invalidChar(read());
          }
          read();
        }
      }
      function escape() {
        var c2 = peek();
        switch (c2) {
          case "b":
            read();
            return "\b";
          case "f":
            read();
            return "\f";
          case "n":
            read();
            return "\n";
          case "r":
            read();
            return "\r";
          case "t":
            read();
            return "	";
          case "v":
            read();
            return "\v";
          case "0":
            read();
            if (util.isDigit(peek())) {
              throw invalidChar(read());
            }
            return "\0";
          case "x":
            read();
            return hexEscape();
          case "u":
            read();
            return unicodeEscape();
          case "\n":
          case "\u2028":
          case "\u2029":
            read();
            return "";
          case "\r":
            read();
            if (peek() === "\n") {
              read();
            }
            return "";
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            throw invalidChar(read());
          case void 0:
            throw invalidChar(read());
        }
        return read();
      }
      function hexEscape() {
        var buffer2 = "";
        var c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
        c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      function unicodeEscape() {
        var buffer2 = "";
        var count2 = 4;
        while (count2-- > 0) {
          var c2 = peek();
          if (!util.isHexDigit(c2)) {
            throw invalidChar(read());
          }
          buffer2 += read();
        }
        return String.fromCodePoint(parseInt(buffer2, 16));
      }
      var parseStates = {
        start: function start() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push();
        },
        beforePropertyName: function beforePropertyName() {
          switch (token.type) {
            case "identifier":
            case "string":
              key = token.value;
              parseState = "afterPropertyName";
              return;
            case "punctuator":
              pop();
              return;
            case "eof":
              throw invalidEOF();
          }
        },
        afterPropertyName: function afterPropertyName() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          parseState = "beforePropertyValue";
        },
        beforePropertyValue: function beforePropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          push();
        },
        beforeArrayValue: function beforeArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          if (token.type === "punctuator" && token.value === "]") {
            pop();
            return;
          }
          push();
        },
        afterPropertyValue: function afterPropertyValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          switch (token.value) {
            case ",":
              parseState = "beforePropertyName";
              return;
            case "}":
              pop();
          }
        },
        afterArrayValue: function afterArrayValue() {
          if (token.type === "eof") {
            throw invalidEOF();
          }
          switch (token.value) {
            case ",":
              parseState = "beforeArrayValue";
              return;
            case "]":
              pop();
          }
        },
        end: function end() {
        }
      };
      function push() {
        var value;
        switch (token.type) {
          case "punctuator":
            switch (token.value) {
              case "{":
                value = {};
                break;
              case "[":
                value = [];
                break;
            }
            break;
          case "null":
          case "boolean":
          case "numeric":
          case "string":
            value = token.value;
            break;
        }
        if (root === void 0) {
          root = value;
        } else {
          var parent = stack[stack.length - 1];
          if (Array.isArray(parent)) {
            parent.push(value);
          } else {
            Object.defineProperty(parent, key, {
              value,
              writable: true,
              enumerable: true,
              configurable: true
            });
          }
        }
        if (value !== null && typeof value === "object") {
          stack.push(value);
          if (Array.isArray(value)) {
            parseState = "beforeArrayValue";
          } else {
            parseState = "beforePropertyName";
          }
        } else {
          var current = stack[stack.length - 1];
          if (current == null) {
            parseState = "end";
          } else if (Array.isArray(current)) {
            parseState = "afterArrayValue";
          } else {
            parseState = "afterPropertyValue";
          }
        }
      }
      function pop() {
        stack.pop();
        var current = stack[stack.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
      function invalidChar(c2) {
        if (c2 === void 0) {
          return syntaxError("JSON5: invalid end of input at " + line2 + ":" + column);
        }
        return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line2 + ":" + column);
      }
      function invalidEOF() {
        return syntaxError("JSON5: invalid end of input at " + line2 + ":" + column);
      }
      function invalidIdentifier() {
        column -= 5;
        return syntaxError("JSON5: invalid identifier character at " + line2 + ":" + column);
      }
      function separatorChar(c2) {
        console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
      }
      function formatChar(c2) {
        var replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        if (replacements[c2]) {
          return replacements[c2];
        }
        if (c2 < " ") {
          var hexString = c2.charCodeAt(0).toString(16);
          return "\\x" + ("00" + hexString).substring(hexString.length);
        }
        return c2;
      }
      function syntaxError(message) {
        var err = new SyntaxError(message);
        err.lineNumber = line2;
        err.columnNumber = column;
        return err;
      }
      var stringify2 = function stringify3(value, replacer, space) {
        var stack2 = [];
        var indent = "";
        var propertyList;
        var replacerFunc;
        var gap = "";
        var quote;
        if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
          space = replacer.space;
          quote = replacer.quote;
          replacer = replacer.replacer;
        }
        if (typeof replacer === "function") {
          replacerFunc = replacer;
        } else if (Array.isArray(replacer)) {
          propertyList = [];
          for (var i = 0, list = replacer; i < list.length; i += 1) {
            var v = list[i];
            var item = void 0;
            if (typeof v === "string") {
              item = v;
            } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
              item = String(v);
            }
            if (item !== void 0 && propertyList.indexOf(item) < 0) {
              propertyList.push(item);
            }
          }
        }
        if (space instanceof Number) {
          space = Number(space);
        } else if (space instanceof String) {
          space = String(space);
        }
        if (typeof space === "number") {
          if (space > 0) {
            space = Math.min(10, Math.floor(space));
            gap = "          ".substr(0, space);
          }
        } else if (typeof space === "string") {
          gap = space.substr(0, 10);
        }
        return serializeProperty("", { "": value });
        function serializeProperty(key2, holder) {
          var value2 = holder[key2];
          if (value2 != null) {
            if (typeof value2.toJSON5 === "function") {
              value2 = value2.toJSON5(key2);
            } else if (typeof value2.toJSON === "function") {
              value2 = value2.toJSON(key2);
            }
          }
          if (replacerFunc) {
            value2 = replacerFunc.call(holder, key2, value2);
          }
          if (value2 instanceof Number) {
            value2 = Number(value2);
          } else if (value2 instanceof String) {
            value2 = String(value2);
          } else if (value2 instanceof Boolean) {
            value2 = value2.valueOf();
          }
          switch (value2) {
            case null:
              return "null";
            case true:
              return "true";
            case false:
              return "false";
          }
          if (typeof value2 === "string") {
            return quoteString(value2);
          }
          if (typeof value2 === "number") {
            return String(value2);
          }
          if (typeof value2 === "object") {
            return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
          }
          return void 0;
        }
        function quoteString(value2) {
          var quotes = {
            "'": 0.1,
            '"': 0.2
          };
          var replacements = {
            "'": "\\'",
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t",
            "\v": "\\v",
            "\0": "\\0",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
          };
          var product = "";
          for (var i2 = 0; i2 < value2.length; i2++) {
            var c2 = value2[i2];
            switch (c2) {
              case "'":
              case '"':
                quotes[c2]++;
                product += c2;
                continue;
              case "\0":
                if (util.isDigit(value2[i2 + 1])) {
                  product += "\\x00";
                  continue;
                }
            }
            if (replacements[c2]) {
              product += replacements[c2];
              continue;
            }
            if (c2 < " ") {
              var hexString = c2.charCodeAt(0).toString(16);
              product += "\\x" + ("00" + hexString).substring(hexString.length);
              continue;
            }
            product += c2;
          }
          var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
            return quotes[a] < quotes[b] ? a : b;
          });
          product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
          return quoteChar + product + quoteChar;
        }
        function serializeObject(value2) {
          if (stack2.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack2.push(value2);
          var stepback = indent;
          indent = indent + gap;
          var keys = propertyList || Object.keys(value2);
          var partial = [];
          for (var i2 = 0, list2 = keys; i2 < list2.length; i2 += 1) {
            var key2 = list2[i2];
            var propertyString = serializeProperty(key2, value2);
            if (propertyString !== void 0) {
              var member = serializeKey(key2) + ":";
              if (gap !== "") {
                member += " ";
              }
              member += propertyString;
              partial.push(member);
            }
          }
          var final;
          if (partial.length === 0) {
            final = "{}";
          } else {
            var properties;
            if (gap === "") {
              properties = partial.join(",");
              final = "{" + properties + "}";
            } else {
              var separator = ",\n" + indent;
              properties = partial.join(separator);
              final = "{\n" + indent + properties + ",\n" + stepback + "}";
            }
          }
          stack2.pop();
          indent = stepback;
          return final;
        }
        function serializeKey(key2) {
          if (key2.length === 0) {
            return quoteString(key2);
          }
          var firstChar = String.fromCodePoint(key2.codePointAt(0));
          if (!util.isIdStartChar(firstChar)) {
            return quoteString(key2);
          }
          for (var i2 = firstChar.length; i2 < key2.length; i2++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
              return quoteString(key2);
            }
          }
          return key2;
        }
        function serializeArray(value2) {
          if (stack2.indexOf(value2) >= 0) {
            throw TypeError("Converting circular structure to JSON5");
          }
          stack2.push(value2);
          var stepback = indent;
          indent = indent + gap;
          var partial = [];
          for (var i2 = 0; i2 < value2.length; i2++) {
            var propertyString = serializeProperty(String(i2), value2);
            partial.push(propertyString !== void 0 ? propertyString : "null");
          }
          var final;
          if (partial.length === 0) {
            final = "[]";
          } else {
            if (gap === "") {
              var properties = partial.join(",");
              final = "[" + properties + "]";
            } else {
              var separator = ",\n" + indent;
              var properties$1 = partial.join(separator);
              final = "[\n" + indent + properties$1 + ",\n" + stepback + "]";
            }
          }
          stack2.pop();
          indent = stepback;
          return final;
        }
      };
      var JSON54 = {
        parse,
        stringify: stringify2
      };
      var lib = JSON54;
      var es5 = lib;
      return es5;
    });
  }
});

// src/rx/index.ts
var rx_exports = {};
__export(rx_exports, {
  Dom: () => Dom_exports,
  From: () => sources_exports,
  Ops: () => Ops,
  Sinks: () => Sinks,
  annotate: () => annotate,
  annotateWithOp: () => annotateWithOp,
  average: () => average3,
  batch: () => batch,
  cache: () => cache,
  chainer: () => chainer,
  cloneFromFields: () => cloneFromFields,
  combineLatestToArray: () => combineLatestToArray,
  combineLatestToObject: () => combineLatestToObject,
  count: () => count,
  debounce: () => debounce,
  drop: () => drop,
  elapsed: () => elapsed,
  field: () => field,
  filter: () => filter$1,
  hasLast: () => hasLast,
  isReactive: () => isReactive,
  isTrigger: () => isTrigger,
  isTriggerFunction: () => isTriggerFunction,
  isTriggerGenerator: () => isTriggerGenerator,
  isTriggerValue: () => isTriggerValue,
  isWrapped: () => isWrapped,
  isWritable: () => isWritable,
  manual: () => manual,
  max: () => max2,
  messageHasValue: () => messageHasValue,
  messageIsDoneSignal: () => messageIsDoneSignal,
  messageIsSignal: () => messageIsSignal,
  min: () => min2,
  opify: () => opify,
  pipe: () => pipe,
  prepare: () => prepare,
  rank: () => rank2,
  resolveSource: () => resolveSource,
  resolveTriggerValue: () => resolveTriggerValue,
  run: () => run,
  runHead: () => runHead,
  setHtmlText: () => setHtmlText,
  singleFromArray: () => singleFromArray,
  split: () => split,
  splitLabelled: () => splitLabelled,
  sum: () => sum2,
  switcher: () => switcher,
  symbol: () => symbol,
  syncToArray: () => syncToArray,
  syncToObject: () => syncToObject,
  takeNextValue: () => takeNextValue,
  tally: () => tally2,
  tapOps: () => tapOps,
  tapProcess: () => tapProcess,
  tapStream: () => tapStream,
  throttle: () => throttle,
  timeoutTrigger: () => timeoutTrigger,
  to: () => to,
  toArray: () => toArray,
  toArrayOrThrow: () => toArrayOrThrow,
  toGenerator: () => toGenerator,
  transform: () => transform,
  withValue: () => withValue,
  wrap: () => wrap2
});

// src/rx/Util.ts
function messageIsSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal !== void 0) return true;
  return false;
}
function messageIsDoneSignal(message) {
  if (message.value !== void 0) return false;
  if (`signal` in message && message.signal === `done`) return true;
  return false;
}
function messageHasValue(v) {
  if (v.value !== void 0) return true;
  return false;
}
var hasLast = (rx) => {
  if (!isReactive(rx)) return false;
  {
    const v = rx.last();
    if (v !== void 0) return true;
  }
  return false;
};
var isReactive = (rx) => {
  if (typeof rx !== `object`) return false;
  if (rx === null) return false;
  return `on` in rx && `onValue` in rx;
};
var isWritable = (rx) => {
  if (!isReactive(rx)) return false;
  if (`set` in rx) return true;
  return false;
};
var isWrapped = (v) => {
  if (typeof v !== `object`) return false;
  if (!(`source` in v)) return false;
  if (!(`annotateElapsed` in v)) return false;
  return true;
};
var opify = (fn, ...args) => {
  return (source) => {
    return fn(source, ...args);
  };
};
var isTriggerValue = (t) => `value` in t;
var isTriggerFunction = (t) => `fn` in t;
var isTriggerGenerator = (t) => isIterable(t);
var isTrigger = (t) => {
  if (typeof t !== `object`) return false;
  if (isTriggerValue(t)) return true;
  if (isTriggerFunction(t)) return true;
  if (isTriggerGenerator(t)) return true;
  return false;
};
function resolveTriggerValue(t) {
  if (isTriggerValue(t)) return [t.value, false];
  if (isTriggerFunction(t)) {
    const v = t.fn();
    if (v === void 0) return [void 0, true];
    return [v, false];
  }
  if (isTriggerGenerator(t)) {
    const v = t.gen.next();
    if (v.done) return [void 0, true];
    return [v.value, false];
  }
  throw new Error(`Invalid trigger. Missing 'value' or 'fn' fields`);
}

// src/rx/sources/Function.ts
function func(callback, options = {}) {
  const maximumRepeats = options.maximumRepeats ?? Number.MAX_SAFE_INTEGER;
  const closeOnError = options.closeOnError ?? true;
  const interval = intervalToMs(options.interval, 1);
  const loop = options.interval !== void 0;
  const predelay = intervalToMs(options.predelay, 1);
  const lazy = options.lazy ?? `very`;
  const signal = options.signal;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let sentResults = 0;
  if (options.maximumRepeats && !loop) throw new Error(`'maximumRepeats' has no purpose if 'loop' is not set to true`);
  const done = (reason) => {
    events.dispose(reason);
    run2.cancel();
  };
  const run2 = continuously(async () => {
    if (predelay) await sleep(predelay);
    try {
      if (signal?.aborted) {
        done(`Signal (${signal.aborted})`);
        return false;
      }
      const value = await callback(internalAbortCallback);
      events.set(value);
      sentResults++;
    } catch (error) {
      if (closeOnError) {
        done(`Function error: ${getErrorMessage(error)}`);
        return false;
      } else {
        events.signal(`warn`, getErrorMessage(error));
      }
    }
    if (!loop) {
      done(`fromFunction done`);
      return false;
    }
    if (internalAbort.signal.aborted) {
      done(`callback function aborted (${internalAbort.signal.reason})`);
      return false;
    }
    if (sentResults >= maximumRepeats) {
      done(`Maximum repeats reached ${maximumRepeats.toString()}`);
      return false;
    }
  }, interval);
  const events = initLazyStream({
    lazy,
    onStart() {
      run2.start();
    },
    onStop() {
      run2.cancel();
    }
  });
  if (lazy === `never`) run2.start();
  return events;
}

// src/rx/sources/Iterator.ts
function iterator(source, options = {}) {
  const lazy = options.lazy ?? `very`;
  const log2 = options.traceLifecycle ? (message) => {
    console.log(`Rx.From.iterator ${message}`);
  } : (_) => {
  };
  const readIntervalMs = intervalToMs(options.readInterval, 5);
  const readTimeoutMs = intervalToMs(options.readTimeout, 5 * 60 * 1e3);
  const whenStopped = options.whenStopped ?? `continue`;
  let iterator2;
  let ourAc;
  let sm = StateMachine_exports.init({
    idle: [`wait_for_next`],
    wait_for_next: [`processing_result`, `stopping`, `disposed`],
    processing_result: [`queued`, `disposed`, `stopping`],
    queued: [`wait_for_next`, `disposed`, `stopping`],
    stopping: `idle`,
    // eslint-disable-next-line unicorn/no-null
    disposed: null
  }, `idle`);
  const onExternalSignal = () => {
    log2(`onExternalSignal`);
    ourAc?.abort(options.signal?.reason);
  };
  if (options.signal) {
    options.signal.addEventListener(`abort`, onExternalSignal, { once: true });
  }
  const read = async () => {
    log2(`read. State: ${sm.value}`);
    ourAc = new AbortController();
    try {
      sm = StateMachine_exports.to(sm, `wait_for_next`);
      const v = await nextWithTimeout(iterator2, { signal: ourAc.signal, millis: readTimeoutMs });
      sm = StateMachine_exports.to(sm, `processing_result`);
      ourAc?.abort(`nextWithTimeout completed`);
      if (v.done) {
        log2(`read v.done true`);
        events.dispose(`Generator complete`);
        sm = StateMachine_exports.to(sm, `disposed`);
      }
      if (sm.value === `stopping`) {
        log2(`read. sm.value = stopping`);
        sm = StateMachine_exports.to(sm, `idle`);
        return;
      }
      if (sm.value === `disposed`) {
        log2(`read. sm.value = disposed`);
        return;
      }
      events.set(v.value);
    } catch (error) {
      events.dispose(`Generator error: ${error.toString()}`);
      return;
    }
    if (sm.value === `processing_result`) {
      sm = StateMachine_exports.to(sm, `queued`);
      log2(`scheduling read. State: ${sm.value}`);
      setTimeout(read, readIntervalMs);
    } else {
      sm = StateMachine_exports.to(sm, `idle`);
    }
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      log2(`onStart state: ${sm.value} whenStopped: ${whenStopped}`);
      if (sm.value !== `idle`) return;
      if (sm.value === `idle` && whenStopped === `reset` || iterator2 === void 0) {
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
      void read();
    },
    onStop() {
      log2(`onStop state: ${sm.value} whenStopped: ${whenStopped}`);
      sm = StateMachine_exports.to(sm, `stopping`);
      if (whenStopped === `reset`) {
        log2(`onStop reiniting iterator`);
        iterator2 = isAsyncIterable(source) ? source[Symbol.asyncIterator]() : source[Symbol.iterator]();
      }
    },
    onDispose(reason) {
      log2(`onDispose (${reason})`);
      ourAc?.abort(`Rx.From.iterator disposed (${reason})`);
      if (options.signal) options.signal.removeEventListener(`abort`, onExternalSignal);
    }
  });
  return events;
}

// src/rx/ResolveSource.ts
var resolveSource = (source, options = {}) => {
  if (isReactive(source)) return source;
  const generatorOptions = options.generator ?? { lazy: `initial`, interval: 5 };
  const functionOptions = options.function ?? { lazy: `very` };
  if (Array.isArray(source)) {
    return iterator(source.values(), generatorOptions);
  } else if (typeof source === `function`) {
    return func(source, functionOptions);
  } else if (typeof source === `object`) {
    if (isWrapped(source)) {
      return source.source;
    }
    if (isIterable(source) || isAsyncIterable(source)) {
      return iterator(source, generatorOptions);
    }
  }
  throw new TypeError(`Unable to resolve source. Supports: array, Reactive, Async/Iterable. Got type: ${typeof source}`);
};

// src/rx/InitStream.ts
var initUpstream = (upstreamSource, options) => {
  const lazy = options.lazy ?? `initial`;
  const disposeIfSourceDone = options.disposeIfSourceDone ?? true;
  const onValue = options.onValue ?? ((_v) => {
  });
  const source = resolveSource(upstreamSource);
  let unsub;
  const start = () => {
    if (unsub !== void 0) return;
    if (options.onStart) options.onStart();
    unsub = source.on((value) => {
      if (messageIsSignal(value)) {
        if (value.signal === `done`) {
          stop();
          if (disposeIfSourceDone) events.dispose(`Upstream source has completed (${value.context ?? ``})`);
        } else {
          events.through(value);
        }
      } else if (messageHasValue(value)) {
        onValue(value.value);
      }
    });
  };
  const stop = () => {
    if (unsub === void 0) return;
    unsub();
    unsub = void 0;
    if (options.onStop) options.onStop();
  };
  const events = initLazyStream({
    ...options,
    lazy,
    onStart() {
      start();
    },
    onStop() {
      stop();
    }
  });
  return events;
};
function initLazyStream(options) {
  const lazy = options.lazy ?? `initial`;
  const onStop = options.onStop ?? (() => {
  });
  const onStart = options.onStart ?? (() => {
  });
  const events = initStream({
    ...options,
    onFirstSubscribe() {
      if (lazy !== `never`) onStart();
    },
    onNoSubscribers() {
      if (lazy === `very`) onStop();
    }
  });
  if (lazy === `never`) onStart();
  return events;
}
function initStream(options = {}) {
  let dispatcher;
  let disposed = false;
  let firstSubscribe = false;
  let emptySubscriptions = true;
  const onFirstSubscribe = options.onFirstSubscribe ?? void 0;
  const onNoSubscribers = options.onNoSubscribers ?? void 0;
  const isEmpty = () => {
    if (dispatcher === void 0) return;
    if (!dispatcher.isEmpty) return;
    if (!emptySubscriptions) {
      emptySubscriptions = true;
      firstSubscribe = false;
      if (onNoSubscribers) onNoSubscribers();
    }
  };
  const subscribe = (handler) => {
    if (disposed) throw new Error(`Disposed, cannot subscribe`);
    if (dispatcher === void 0) dispatcher = new DispatchList();
    const id = dispatcher.add(handler);
    emptySubscriptions = false;
    if (!firstSubscribe) {
      firstSubscribe = true;
      if (onFirstSubscribe) setTimeout(() => {
        onFirstSubscribe();
      }, 10);
    }
    return () => {
      dispatcher?.remove(id);
      isEmpty();
    };
  };
  return {
    dispose: (reason) => {
      if (disposed) return;
      dispatcher?.notify({ value: void 0, signal: `done`, context: `Disposed: ${reason}` });
      disposed = true;
      if (options.onDispose) options.onDispose(reason);
    },
    isDisposed: () => {
      return disposed;
    },
    reset: () => {
      dispatcher?.clear();
      isEmpty();
    },
    set: (v) => {
      if (disposed) throw new Error(`Disposed, cannot set`);
      dispatcher?.notify({ value: v });
    },
    through: (pass) => {
      if (disposed) throw new Error(`Disposed, cannot through`);
      dispatcher?.notify(pass);
    },
    signal: (signal, context) => {
      if (disposed) throw new Error(`Disposed, cannot signal`);
      dispatcher?.notify({ signal, value: void 0, context });
    },
    on: (handler) => subscribe(handler),
    onValue: (handler) => {
      const unsub = subscribe((message) => {
        if (messageHasValue(message)) {
          handler(message.value);
        }
      });
      return unsub;
    }
  };
}

// src/rx/ToReadable.ts
var toReadable = (stream2) => ({
  on: stream2.on,
  dispose: stream2.dispose,
  isDisposed: stream2.isDisposed,
  onValue: stream2.onValue
});

// src/rx/ops/Annotate.ts
function annotate(input, annotator, options = {}) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const annotation = annotator(value);
      upstream.set({ value, annotation });
    }
  });
  return toReadable(upstream);
}
function annotateWithOp(input, annotatorOp) {
  const inputStream = resolveSource(input);
  const stream2 = annotatorOp(inputStream);
  const synced = syncToObject({
    value: inputStream,
    annotation: stream2
  });
  return synced;
}

// src/rx/ops/Batch.ts
function batch(batchSource, options = {}) {
  const queue = new QueueMutable();
  const quantity = options.quantity ?? 0;
  const returnRemainder = options.returnRemainder ?? true;
  const upstreamOpts = {
    ...options,
    onStop() {
      if (returnRemainder && !queue.isEmpty) {
        const data = queue.toArray();
        queue.clear();
        upstream.set(data);
      }
    },
    onValue(value) {
      queue.enqueue(value);
      if (quantity > 0 && queue.length >= quantity) {
        send();
      }
      if (timer !== void 0 && timer.runState === `idle`) {
        timer.start();
      }
    }
  };
  const upstream = initUpstream(batchSource, upstreamOpts);
  const send = () => {
    if (queue.isEmpty) return;
    if (timer !== void 0) timer.start();
    const data = queue.toArray();
    queue.clear();
    upstream.set(data);
  };
  const timer = options.elapsed ? timeout(send, options.elapsed) : void 0;
  return toReadable(upstream);
}

// src/rx/ops/Transform.ts
function transform(input, transformer, options = {}) {
  const traceInput = options.traceInput ?? false;
  const traceOutput = options.traceOutput ?? false;
  const upstream = initUpstream(input, {
    lazy: `initial`,
    ...options,
    onValue(value) {
      const t = transformer(value);
      if (traceInput && traceOutput) {
        console.log(`Rx.Ops.transform input: ${JSON.stringify(value)} output: ${JSON.stringify(t)}`);
      } else if (traceInput) {
        console.log(`Rx.Ops.transform input: ${JSON.stringify(value)}`);
      } else if (traceOutput) {
        console.log(`Rx.Ops.transform output: ${JSON.stringify(t)}`);
      }
      upstream.set(t);
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/CloneFromFields.ts
var cloneFromFields = (source) => {
  return transform(source, (v) => {
    const entries = [];
    for (const field2 in v) {
      const value = v[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return Object.fromEntries(entries);
  });
};

// src/rx/ops/CombineLatestToArray.ts
function combineLatestToArray(reactiveSources, options = {}) {
  const event2 = initStream();
  const onSourceDone = options.onSourceDone ?? `break`;
  const data = [];
  const sources = reactiveSources.map((source) => resolveSource(source));
  const noop = () => {
  };
  const sourceOff = sources.map((_) => noop);
  const doneSources = sources.map((_) => false);
  const unsub = () => {
    for (const v of sourceOff) {
      v();
    }
  };
  for (const [index, v] of sources.entries()) {
    data[index] = void 0;
    sourceOff[index] = v.on((message) => {
      if (messageIsDoneSignal(message)) {
        doneSources[index] = true;
        sourceOff[index]();
        sourceOff[index] = noop;
        if (onSourceDone === `break`) {
          unsub();
          event2.dispose(`Source has completed and 'break' is set`);
          return;
        }
        if (!doneSources.includes(false)) {
          unsub();
          event2.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        data[index] = message.value;
        event2.set([...data]);
      }
    });
  }
  return {
    dispose: event2.dispose,
    isDisposed: event2.isDisposed,
    on: event2.on,
    onValue: event2.onValue
  };
}

// src/data/Pathed.ts
var Pathed_exports = {};
__export(Pathed_exports, {
  applyChanges: () => applyChanges,
  compareData: () => compareData2,
  getField: () => getField,
  getPaths: () => getPaths,
  getPathsAndData: () => getPathsAndData,
  updateByPath: () => updateByPath
});

// src/data/Util.ts
var JSON5 = __toESM(require_dist(), 1);
var isEmptyEntries = (value) => [...Object.entries(value)].length === 0;
var isEqualContextString = (a, b, _path) => {
  return JSON5.stringify(a) === JSON5.stringify(b);
};

// src/data/Pathed.ts
var getEntries = (target, deepProbe) => {
  if (deepProbe) {
    const entries = [];
    for (const field2 in target) {
      const value = target[field2];
      if (isPlainObjectOrPrimitive(value)) {
        entries.push([field2, value]);
      }
    }
    return entries;
  } else {
    return Object.entries(target);
  }
};
function* compareData2(a, b, options = {}) {
  if (a === void 0) {
    yield {
      path: options.pathPrefix ?? ``,
      value: b,
      state: `added`
    };
    return;
  }
  if (b === void 0) {
    yield { path: options.pathPrefix ?? ``, previous: a, value: void 0, state: `removed` };
    return;
  }
  const pathPrefix = options.pathPrefix ?? ``;
  const deepEntries = options.deepEntries ?? false;
  const eq = options.eq ?? isEqualContextString;
  const includeMissingFromA = options.includeMissingFromA ?? false;
  const includeParents = options.includeParents ?? false;
  if (isPrimitive(a) && isPrimitive(b)) {
    if (a !== b) yield { path: pathPrefix, value: b, previous: a, state: `change` };
    return;
  }
  const entriesA = getEntries(a, deepEntries);
  const entriesAKeys = /* @__PURE__ */ new Set();
  for (const [key, valueA] of entriesA) {
    entriesAKeys.add(key);
    if (typeof valueA === `object`) {
      const sub = [...compareData2(valueA, b[key], {
        ...options,
        pathPrefix: pathPrefix + key + `.`
      })];
      if (sub.length > 0) {
        for (const s of sub) yield s;
        if (includeParents) {
          yield { path: pathPrefix + key, value: b[key], previous: valueA, state: `change` };
        }
      }
    } else {
      const subPath = pathPrefix + key;
      if (key in b) {
        const valueB = b[key];
        if (!eq(valueA, valueB, subPath)) {
          yield { path: subPath, previous: valueA, value: valueB, state: `change` };
        }
      } else {
        yield { path: subPath, previous: valueA, value: void 0, state: `removed` };
      }
    }
  }
  if (includeMissingFromA) {
    const entriesB = getEntries(b, deepEntries);
    for (const [key, valueB] of entriesB) {
      if (entriesAKeys.has(key)) continue;
      yield { path: pathPrefix + key, previous: void 0, value: valueB, state: `added` };
    }
  }
}
var applyChanges = (source, changes) => {
  for (const change of changes) {
    source = updateByPath(source, change.path, change.value);
  }
  return source;
};
var updateByPath = (target, path, value, allowShapeChange = false) => {
  if (path === void 0) throw new Error(`Parameter 'path' is undefined`);
  if (typeof path !== `string`) throw new Error(`Parameter 'path' should be a string. Got: ${typeof path}`);
  if (target === void 0) throw new Error(`Parameter 'target' is undefined`);
  if (target === null) throw new Error(`Parameter 'target' is null`);
  const split2 = path.split(`.`);
  const r = updateByPathImpl(target, split2, value, allowShapeChange);
  return r;
};
var updateByPathImpl = (o, split2, value, allowShapeChange) => {
  if (split2.length === 0) {
    if (allowShapeChange) return value;
    if (Array.isArray(o) && !Array.isArray(value)) throw new Error(`Expected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
    if (!Array.isArray(o) && Array.isArray(value)) throw new Error(`Unexpected array value, got: '${JSON.stringify(value)}'. Set allowShapeChange=true to ignore.`);
    if (typeof o !== typeof value) throw new Error(`Cannot reassign object type. (${typeof o} -> ${typeof value}). Set allowShapeChange=true to ignore.`);
    if (typeof o === `object` && !Array.isArray(o)) {
      const c = compareKeys(o, value);
      if (c.a.length > 0) {
        throw new Error(`New value is missing key(s): ${c.a.join(`,`)}`);
      }
      if (c.b.length > 0) {
        throw new Error(`New value cannot add new key(s): ${c.b.join(`,`)}`);
      }
    }
    return value;
  }
  const start = split2.shift();
  if (!start) return value;
  const isInt = isInteger(start);
  if (isInt && Array.isArray(o)) {
    const index = Number.parseInt(start);
    if (index >= o.length && !allowShapeChange) throw new Error(`Array index ${index.toString()} is outside of the existing length of ${o.length.toString()}. Use allowShapeChange=true to permit this.`);
    const copy = [...o];
    copy[index] = updateByPathImpl(copy[index], split2, value, allowShapeChange);
    return copy;
  } else if (start in o) {
    const copy = { ...o };
    copy[start] = updateByPathImpl(copy[start], split2, value, allowShapeChange);
    return copy;
  } else {
    throw new Error(`Path ${start} not found in data`);
  }
};
var getField = (object2, path) => {
  if (typeof path !== `string`) throw new Error(`Parameter 'path' ought to be a string. Got: '${typeof path}'`);
  if (path.length === 0) throw new Error(`Parameter 'path' is empty`);
  if (object2 === void 0) throw new Error(`Parameter 'object' is undefined`);
  if (object2 === null) throw new Error(`Parameter 'object' is null`);
  const split2 = path.split(`.`);
  const v = getFieldImpl(object2, split2);
  return v;
};
var getFieldImpl = (object2, split2) => {
  if (object2 === void 0) throw new Error(`Parameter 'object' is undefined`);
  if (split2.length === 0) throw new Error(`Path run out`);
  const start = split2.shift();
  if (!start) throw new Error(`Unexpected empty split path`);
  const isInt = isInteger(start);
  if (isInt && Array.isArray(object2)) {
    const index = Number.parseInt(start);
    if (split2.length === 0) {
      return object2[index];
    } else {
      return getFieldImpl(object2[index], split2);
    }
  } else if (start in object2) {
    if (split2.length === 0) {
      return object2[start];
    } else {
      return getFieldImpl(object2[start], split2);
    }
  } else {
    throw new Error(`Path '${start}' not found in data`);
  }
};
function* getPaths(object2, onlyLeaves = false) {
  if (object2 === void 0 || object2 === null) return;
  const iter = depthFirst2(object2);
  for (const c of iter) {
    if (c.nodeValue === void 0 && onlyLeaves) continue;
    let path = c.name;
    if (c.ancestors.length > 0) path = c.ancestors.join(`.`) + `.` + path;
    yield path;
  }
}
function* getPathsAndData(o, maxDepth = Number.MAX_SAFE_INTEGER, prefix = ``) {
  if (o === null) return;
  if (o === void 0) return;
  yield* getPathsAndDataImpl(o, prefix, maxDepth);
}
function* getPathsAndDataImpl(o, prefix, maxDepth) {
  if (maxDepth <= 0) return;
  if (typeof o !== `object`) return;
  for (const entries of Object.entries(o)) {
    const sub = (prefix.length > 0 ? prefix + `.` : ``) + entries[0];
    yield { path: sub, value: entries[1] };
    yield* getPathsAndDataImpl(entries[1], sub, maxDepth - 1);
  }
}

// src/rx/sources/Object.ts
function object(initialValue, options = {}) {
  const eq = options.eq ?? isEqualContextString;
  const setEvent = initStream();
  const diffEvent = initStream();
  const fieldChangeEvents = /* @__PURE__ */ new Map();
  let value = initialValue;
  let disposed = false;
  const set = (v) => {
    const diff = [...compareData2(value ?? {}, v, { ...options, includeMissingFromA: true })];
    if (diff.length === 0) return;
    value = v;
    setEvent.set(v);
    diffEvent.set(diff);
  };
  const fireFieldUpdate = (field2, value2) => {
    const l = fieldChangeEvents.get(field2.toLowerCase());
    if (l === void 0) return;
    l.notify(value2);
  };
  const update = (toMerge) => {
    if (value === void 0) {
      value = toMerge;
      setEvent.set(value);
      for (const [k, v] of Object.entries(toMerge)) {
        fireFieldUpdate(k, v);
      }
      return value;
    } else {
      const diff = [...compareData2(value, toMerge)];
      const diffWithoutRemoved = diff.filter((d) => d.state !== `removed`);
      if (diffWithoutRemoved.length === 0) return value;
      value = {
        ...value,
        ...toMerge
      };
      setEvent.set(value);
      diffEvent.set(diff);
      for (const d of diffWithoutRemoved) {
        fireFieldUpdate(d.path, d.value);
      }
      return value;
    }
  };
  const updateField = (path, valueForField) => {
    if (value === void 0) throw new Error(`Cannot update value when it has not already been set`);
    const existing = getField(value, path);
    if (eq(existing, valueForField, path)) {
      return;
    }
    let diff = [...compareData2(existing, valueForField, { ...options, includeMissingFromA: true })];
    diff = diff.map((d) => {
      if (d.path.length > 0) return { ...d, path: path + `.` + d.path };
      return { ...d, path };
    });
    const o = updateByPath(value, path, valueForField, true);
    value = o;
    setEvent.set(o);
    diffEvent.set(diff);
    fireFieldUpdate(path, valueForField);
  };
  const dispose = (reason) => {
    if (disposed) return;
    diffEvent.dispose(reason);
    setEvent.dispose(reason);
    disposed = true;
  };
  return {
    dispose,
    isDisposed() {
      return disposed;
    },
    /**
     * Update a field.
     * Exception is thrown if field does not exist
     */
    updateField,
    last: () => value,
    on: setEvent.on,
    onValue: setEvent.onValue,
    onDiff: diffEvent.onValue,
    onField(fieldName, handler) {
      let listeners = fieldChangeEvents.get(fieldName.toLowerCase());
      if (listeners === void 0) {
        listeners = new DispatchList();
        fieldChangeEvents.set(fieldName.toLowerCase(), listeners);
      }
      const id = listeners.add((value2) => {
        setTimeout(() => {
          handler(value2, fieldName);
        }, 1);
      });
      return () => listeners.remove(id);
    },
    /**
     * Set the whole object
     */
    set,
    /**
     * Update the object with a partial set of fields and values
     */
    update
  };
}

// src/rx/ops/CombineLatestToObject.ts
function combineLatestToObject(reactiveSources, options = {}) {
  const disposeSources = options.disposeSources ?? true;
  const event2 = object(void 0);
  const onSourceDone = options.onSourceDone ?? `break`;
  const states = /* @__PURE__ */ new Map();
  for (const [key, source] of Object.entries(reactiveSources)) {
    const initialData = `last` in source ? source.last() : void 0;
    const s = {
      source: resolveSource(source),
      done: false,
      data: initialData,
      off: () => {
      }
    };
    states.set(key, s);
  }
  const sources = Object.fromEntries(Object.entries(states).map((entry) => [entry[0], entry[1].source]));
  const someUnfinished = () => Map_exports.some(states, (v) => !v.done);
  const unsub = () => {
    for (const state of states.values()) state.off();
  };
  const getData = () => {
    const r = {};
    for (const [key, state] of states) {
      const d = state.data;
      if (d !== void 0) {
        r[key] = state.data;
      }
    }
    return r;
  };
  const wireUpState = (state) => {
    state.off = state.source.on((message) => {
      if (messageIsDoneSignal(message)) {
        state.done = true;
        state.off();
        state.off = () => {
        };
        if (onSourceDone === `break`) {
          unsub();
          event2.dispose(`Source has completed and 'break' is behaviour`);
          return;
        }
        if (!someUnfinished()) {
          unsub();
          event2.dispose(`All sources completed`);
        }
      } else if (messageHasValue(message)) {
        state.data = message.value;
        event2.set(getData());
      }
    });
  };
  for (const state of states.values()) {
    wireUpState(state);
  }
  return {
    ...event2,
    hasSource(field2) {
      return states.has(field2);
    },
    replaceSource(field2, source) {
      const state = states.get(field2);
      if (state === void 0) throw new Error(`Field does not exist: '${field2}'`);
      state.off();
      const s = resolveSource(source);
      state.source = s;
      wireUpState(state);
    },
    setWith(data) {
      let written = {};
      for (const [key, value] of Object.entries(data)) {
        const state = states.get(key);
        if (state !== void 0) {
          if (isWritable(state.source)) {
            state.source.set(value);
            written[key] = value;
          }
          state.data = value;
        }
      }
      return written;
    },
    sources,
    last() {
      return getData();
    },
    dispose(reason) {
      unsub();
      event2.dispose(reason);
      if (disposeSources) {
        for (const v of states.values()) {
          v.source.dispose(`Part of disposed mergeToObject`);
        }
      }
    }
  };
}

// src/rx/ops/Debounce.ts
function debounce(source, options = {}) {
  const elapsed2 = intervalToMs(options.elapsed, 50);
  let lastValue;
  const timer = timeout(() => {
    const v = lastValue;
    if (v) {
      upstream.set(v);
      lastValue = void 0;
    }
  }, elapsed2);
  const upstream = initUpstream(source, {
    ...options,
    onValue(value) {
      lastValue = value;
      timer.start();
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Elapsed.ts
var elapsed = (input) => {
  let last = 0;
  return transform(input, (_ignored) => {
    const elapsed2 = last === 0 ? 0 : Date.now() - last;
    last = Date.now();
    return elapsed2;
  });
};

// src/rx/ops/Field.ts
function field(fieldSource, fieldName, options = {}) {
  const fallbackFieldValue = options.fallbackFieldValue;
  const fallbackObject = options.fallbackObject;
  const upstream = initUpstream(fieldSource, {
    disposeIfSourceDone: true,
    ...options,
    onValue(value) {
      let v;
      if (fieldName in value) {
        v = value[fieldName];
      } else if (fallbackObject && fieldName in fallbackObject) {
        v = fallbackObject[fieldName];
      }
      if (v === void 0) {
        v = fallbackFieldValue;
      }
      if (v !== void 0) {
        upstream.set(v);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Filter.ts
function filter$1(input, predicate, options) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      if (predicate(value)) {
        upstream.set(value);
      }
    }
  });
  return toReadable(upstream);
}
function drop(input, predicate, options) {
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      if (!predicate(value)) {
        upstream.set(value);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Math.ts
function max2(input, options) {
  const p = max3();
  return process(p, `max`, input, options);
}
function min2(input, options) {
  const p = min3();
  return process(p, `min`, input, options);
}
function average3(input, options) {
  const p = average();
  return process(p, `average`, input, options);
}
function sum2(input, options) {
  const p = sum();
  return process(p, `sum`, input, options);
}
function tally2(input, options = {}) {
  const countArrayItems = options.countArrayItems ?? true;
  const p = tally(countArrayItems);
  return process(p, `tally`, input, options);
}
function rank2(input, rank3, options) {
  const p = rank(rank3, options);
  return process(p, `rank`, input, options);
}
function process(processor, annotationField, input, options = {}) {
  const annotate2 = options.annotate;
  let previous;
  const skipUndefined = options.skipUndefined ?? true;
  const skipIdentical = options.skipIdentical ?? true;
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      const x = processor(value);
      if (x === void 0 && skipUndefined) return;
      if (skipIdentical && x === previous) return;
      previous = x;
      if (annotate2) {
        const ret = { value };
        ret[annotationField] = x;
        upstream.set(ret);
      } else {
        upstream.set(x);
      }
    }
  });
  return toReadable(upstream);
}

// src/rx/ops/Pipe.ts
var pipe = (...streams) => {
  const event2 = initStream();
  const unsubs = [];
  const performDispose = (reason) => {
    for (const s of streams) {
      if (!s.isDisposed) s.dispose(reason);
    }
    for (const s of unsubs) {
      s();
    }
    event2.dispose(reason);
  };
  for (let index = 0; index < streams.length; index++) {
    unsubs.push(streams[index].on((message) => {
      const isLast = index === streams.length - 1;
      if (messageHasValue(message)) {
        if (isLast) {
          event2.set(message.value);
        } else {
          streams[index + 1].set(message.value);
        }
      } else if (messageIsDoneSignal(message)) {
        performDispose(`Upstream disposed`);
      }
    }));
  }
  return {
    on: event2.on,
    onValue: event2.onValue,
    dispose(reason) {
      performDispose(reason);
    },
    isDisposed() {
      return event2.isDisposed();
    }
  };
};

// src/rx/ops/SingleFromArray.ts
function singleFromArray(source, options = {}) {
  const order = options.order ?? `default`;
  if (!options.at && !options.predicate) throw new Error(`Options must have 'predicate' or 'at' fields`);
  let preprocess = (values) => values;
  if (order === `random`) preprocess = shuffle;
  else if (typeof order === `function`) preprocess = (values) => values.toSorted(order);
  const upstream = initUpstream(source, {
    onValue(values) {
      values = preprocess(values);
      if (options.predicate) {
        for (const v of values) {
          if (options.predicate(v)) {
            upstream.set(v);
          }
        }
      } else if (options.at) {
        upstream.set(values.at(options.at));
      }
    }
  });
  return upstream;
}

// src/rx/ops/Split.ts
var split = (r, options = {}) => {
  const quantity = options.quantity ?? 2;
  const outputs = [];
  const source = resolveSource(r);
  for (let index = 0; index < quantity; index++) {
    outputs.push(initUpstream(source, { disposeIfSourceDone: true, lazy: `initial` }));
  }
  return outputs;
};
var splitLabelled = (r, labels) => {
  const source = resolveSource(r);
  const t = {};
  for (const label of labels) {
    t[label] = initUpstream(source, { lazy: `initial`, disposeIfSourceDone: true });
  }
  return t;
};

// src/rx/ops/Switcher.ts
var switcher = (reactiveOrSource, cases, options = {}) => {
  const match = options.match ?? `first`;
  const source = resolveSource(reactiveOrSource);
  let disposed = false;
  const t = {};
  for (const label of Object.keys(cases)) {
    t[label] = initStream();
  }
  const performDispose = () => {
    if (disposed) return;
    unsub();
    disposed = true;
    for (const stream2 of Object.values(t)) {
      stream2.dispose(`switcher source dispose`);
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      for (const [lbl, pred] of Object.entries(cases)) {
        if (pred(message.value)) {
          t[lbl].set(message.value);
          if (match === `first`) break;
        }
      }
    } else if (messageIsDoneSignal(message)) {
      performDispose();
    }
  });
  return t;
};

// src/rx/ops/SyncToArray.ts
function syncToArray(reactiveSources, options = {}) {
  const onSourceDone = options.onSourceDone ?? `break`;
  const finalValue = options.finalValue ?? `undefined`;
  const maximumWait = intervalToMs(options.maximumWait, 2e3);
  let watchdog;
  const data = [];
  const states = reactiveSources.map((source) => ({
    finalData: void 0,
    done: false,
    source: resolveSource(source),
    unsub: () => {
    }
  }));
  const unsubscribe = () => {
    for (const s of states) {
      s.unsub();
      s.unsub = () => {
      };
    }
  };
  const isDataSetComplete = () => {
    for (let index = 0; index < data.length; index++) {
      if (onSourceDone === `allow` && states[index].done) continue;
      if (data[index] === void 0) return false;
    }
    return true;
  };
  const hasIncompleteSource = () => states.some((s) => !s.done);
  const resetDataSet = () => {
    for (let index = 0; index < data.length; index++) {
      if (finalValue === `last` && states[index].done) continue;
      data[index] = void 0;
    }
  };
  const onWatchdog = () => {
    done(`Sync timeout exceeded (${maximumWait.toString()})`);
  };
  const done = (reason) => {
    if (watchdog) clearTimeout(watchdog);
    unsubscribe();
    event2.dispose(reason);
  };
  const init2 = () => {
    watchdog = setTimeout(onWatchdog, maximumWait);
    for (const [index, state] of states.entries()) {
      data[index] = void 0;
      state.unsub = state.source.on((valueChanged) => {
        if (messageIsSignal(valueChanged)) {
          if (valueChanged.signal === `done`) {
            state.finalData = data[index];
            state.unsub();
            state.done = true;
            state.unsub = () => {
            };
            if (finalValue === `undefined`) data[index] = void 0;
            if (onSourceDone === `break`) {
              done(`Source '${index.toString()}' done, and onSourceDone:'break' is set`);
              return;
            }
            if (!hasIncompleteSource()) {
              done(`All sources done`);
              return;
            }
          }
          return;
        }
        data[index] = valueChanged.value;
        if (isDataSetComplete()) {
          event2.set([...data]);
          resetDataSet();
          if (watchdog) clearTimeout(watchdog);
          watchdog = setTimeout(onWatchdog, maximumWait);
        }
      });
    }
  };
  const event2 = initStream({
    onFirstSubscribe() {
      unsubscribe();
      init2();
    },
    onNoSubscribers() {
      if (watchdog) clearTimeout(watchdog);
      unsubscribe();
    }
  });
  return {
    dispose: event2.dispose,
    isDisposed: event2.isDisposed,
    on: event2.on,
    onValue: event2.onValue
  };
}

// src/rx/ops/SyncToObject.ts
function syncToObject(reactiveSources, options = {}) {
  const keys = Object.keys(reactiveSources);
  const values = Object.values(reactiveSources);
  const s = syncToArray(values, options);
  const st = transform(s, (streamValues) => {
    return zipKeyValue(keys, streamValues);
  });
  return st;
}

// src/data/Process.ts
function processChain(...processors) {
  return (value) => {
    let v = value;
    for (const p of processors) {
      v = p(v);
    }
    return v;
  };
}

// src/rx/ops/Tap.ts
function tapProcess(input, ...processors) {
  const inputStream = resolveSource(input);
  const chain = processChain(...processors);
  inputStream.onValue((value) => {
    chain(value);
  });
  return inputStream;
}
function tapStream(input, diverged) {
  const inputStream = resolveSource(input);
  inputStream.onValue((value) => {
    diverged.set(value);
  });
  return inputStream;
}
var tapOps = (input, ...ops) => {
  for (const op of ops) {
    input = op(input);
  }
  return input;
};

// src/rx/ops/Throttle.ts
function throttle(throttleSource, options = {}) {
  const elapsed2 = intervalToMs(options.elapsed, 0);
  let lastFire = performance.now();
  let lastValue;
  const upstream = initUpstream(throttleSource, {
    ...options,
    onValue(value) {
      lastValue = value;
      trigger();
    }
  });
  const trigger = () => {
    const now = performance.now();
    if (elapsed2 > 0 && now - lastFire > elapsed2) {
      lastFire = now;
      if (lastValue !== void 0) {
        upstream.set(lastValue);
      }
    }
  };
  return toReadable(upstream);
}

// src/rx/ops/TimeoutTrigger.ts
function timeoutTrigger(source, options) {
  let timer;
  const immediate = options.immediate ?? true;
  const repeat = options.repeat ?? false;
  const timeoutMs = intervalToMs(options.interval, 1e3);
  if (!isTrigger(options)) {
    throw new Error(`Param 'options' does not contain trigger 'value' or 'fn' fields`);
  }
  const sendFallback = () => {
    const [value, done] = resolveTriggerValue(options);
    if (done) {
      events.dispose(`Trigger completed`);
    } else {
      if (events.isDisposed()) return;
      events.set(value);
      if (repeat) {
        timer = setTimeout(sendFallback, timeoutMs);
      }
    }
  };
  const events = initUpstream(source, {
    disposeIfSourceDone: true,
    // Received a value from upstream source
    onValue(v) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(sendFallback, timeoutMs);
      events.set(v);
    },
    onDispose() {
      if (timer) clearTimeout(timer);
    }
  });
  if (immediate && !timer) {
    timer = setTimeout(sendFallback, timeoutMs);
  }
  return events;
}

// src/rx/ops/WithValue.ts
function withValue(input, options) {
  let lastValue = options.initial;
  const upstream = initUpstream(input, {
    ...options,
    onValue(value) {
      lastValue = value;
      upstream.set(value);
    }
  });
  const readable = toReadable(upstream);
  return {
    ...readable,
    // @ts-expect-error
    last() {
      return lastValue;
    }
  };
}

// src/dom/SetProperty.ts
function setText(selectors, value) {
  return setProperty(`textContent`, selectors, value);
}
function setHtml(selectors, value) {
  return setProperty(`innerHTML`, selectors, value);
}
function setProperty(property, selectors, value) {
  let elements2 = [];
  const set = (v) => {
    const typ = typeof v;
    const vv = typ === `string` || typ === `number` || typ === `boolean` ? v : JSON.stringify(v);
    if (elements2.length === 0) {
      elements2 = resolveEls(selectors);
    }
    for (const element of elements2) {
      element[property] = vv;
    }
    return vv;
  };
  return value === void 0 ? set : set(value);
}

// src/rx/sinks/Dom.ts
var setHtmlText = (input, optionsOrElementOrQuery) => {
  let el2;
  let options;
  if (typeof optionsOrElementOrQuery === `string`) {
    options = { query: optionsOrElementOrQuery };
  }
  if (typeof optionsOrElementOrQuery === `object`) {
    if (`nodeName` in optionsOrElementOrQuery) {
      options = { el: optionsOrElementOrQuery };
    } else {
      options = optionsOrElementOrQuery;
    }
  }
  if (options === void 0) throw new TypeError(`Missing element as second parameter or option`);
  if (`el` in options) {
    el2 = options.el;
  } else if (`query` in options) {
    el2 = document.querySelector(options.query);
  } else {
    throw new TypeError(`Options does not include 'el' or 'query' fields`);
  }
  if (el2 === null || el2 === void 0) throw new Error(`Element could not be resolved.`);
  const stream2 = resolveSource(input);
  const setter = setProperty(options.asHtml ? `innerHTML` : `textContent`, el2);
  const off = stream2.onValue((value) => {
    setter(value);
  });
  return off;
};

// src/rx/Chain.ts
function chainer(...ops) {
  return (source) => {
    for (const op of ops) {
      source = op(source);
    }
    return source;
  };
}
function run(source, ...ops) {
  let s = resolveSource(source);
  for (const op of ops) {
    s = op(s);
  }
  return s;
}
function runHead(source, ...ops) {
  let originalSource = resolveSource(source);
  let s = originalSource;
  for (const op of ops) {
    s = op(s);
  }
  const rr = s;
  if (isWritable(originalSource)) {
    return {
      ...rr,
      set(value) {
        originalSource.set(value);
      }
    };
  } else {
    return rr;
  }
}

// src/data/graphs/DirectedGraph.ts
var DirectedGraph_exports = {};
__export(DirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices,
  areAdjacent: () => areAdjacent,
  bfs: () => bfs,
  clone: () => clone,
  connect: () => connect,
  connectTo: () => connectTo,
  createVertex: () => createVertex,
  dfs: () => dfs,
  disconnect: () => disconnect,
  distance: () => distance2,
  distanceDefault: () => distanceDefault,
  dumpGraph: () => dumpGraph,
  edges: () => edges,
  getCycles: () => getCycles,
  getOrCreate: () => getOrCreate,
  getOrFail: () => getOrFail,
  graph: () => graph,
  graphFromVertices: () => graphFromVertices,
  hasNoOuts: () => hasNoOuts,
  hasOnlyOuts: () => hasOnlyOuts,
  hasOut: () => hasOut,
  isAcyclic: () => isAcyclic,
  pathDijkstra: () => pathDijkstra,
  toAdjacencyMatrix: () => toAdjacencyMatrix,
  topologicalSort: () => topologicalSort,
  transitiveReduction: () => transitiveReduction,
  updateGraphVertex: () => updateGraphVertex,
  vertexHasOut: () => vertexHasOut,
  vertices: () => vertices
});

// src/data/Table.ts
var Table = class {
  rows = [];
  rowLabels = [];
  colLabels = [];
  labelColumns(...labels) {
    this.colLabels = labels;
  }
  labelColumn(columnNumber, label) {
    this.colLabels[columnNumber] = label;
  }
  getColumnLabelIndex(label) {
    for (const [index, l] of this.colLabels.entries()) {
      if (l === label) return index;
    }
  }
  print() {
    console.table([...this.rowsWithLabelsObject()]);
  }
  *rowsWithLabelsArray() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsArray(index);
      yield labelledRow;
    }
  }
  /**
   * Return a copy of table as nested array
   * ```js
   * const t = new Table();
   * // add stuff
   * // ...
   * const m = t.asArray();
   * for (const row of m) {
   *  for (const colValue of row) {
   *    // iterate over all column values for this row
   *  }
   * }
   * ```
   * 
   * Alternative: get value at row Y and column X
   * ```js
   * const value = m[y][x];
   * ```
   * @returns 
   */
  asArray() {
    const r = [];
    for (const row of this.rows) {
      if (row === void 0) r.push([]);
      else r.push([...row]);
    }
    return r;
  }
  /**
   * Return the number of rows
   */
  get rowCount() {
    return this.rows.length;
  }
  /**
   * Return the maximum number of columns in any row
   */
  get columnCount() {
    const lengths = this.rows.map((row) => row.length);
    return Math.max(...lengths);
  }
  *rowsWithLabelsObject() {
    for (let index = 0; index < this.rows.length; index++) {
      const labelledRow = this.getRowWithLabelsObject(index);
      yield labelledRow;
    }
  }
  labelRows(...labels) {
    this.rowLabels = labels;
  }
  appendRow(...data) {
    this.rows.push(data);
  }
  getRowWithLabelsArray(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0) return void 0;
    return row.map((value, index) => [this.colLabels.at(index), value]);
  }
  /**
   * Return a row of objects. Keys use the column labels.
   * 
   * ```js
   * const row = table.getRowWithLabelsObject(10);
   * // eg:
   * // [{ colour: red, size: 10}, { colour: blue, size: 20 }]
   * ```
   * @param rowNumber 
   * @returns 
   */
  getRowWithLabelsObject(rowNumber) {
    const row = this.rows.at(rowNumber);
    if (row === void 0) return void 0;
    const object2 = {};
    for (let index = 0; index < this.colLabels.length; index++) {
      const label = this.colLabels.at(index) ?? index.toString();
      object2[label] = row[index];
    }
    return object2;
  }
  /**
   * Gets or creates a row at `rowNumber`.
   * @param rowNumber 
   * @returns 
   */
  getOrCreateRow(rowNumber) {
    let row = this.rows.at(rowNumber);
    if (row === void 0) {
      row = [];
      this.rows[rowNumber] = row;
    }
    return row;
  }
  /**
   * Gets the values at `rowNumber`
   * @param rowNumber 
   * @returns 
   */
  row(rowNumber) {
    return this.rows.at(rowNumber);
  }
  /**
   * Set the value of row,column to `value`
   * @param rowNumber 
   * @param columnNumber 
   * @param value 
   */
  set(rowNumber, columnNumber, value) {
    const row = this.getOrCreateRow(rowNumber);
    row[columnNumber] = value;
  }
  get(rowNumber, column) {
    const row = this.getOrCreateRow(rowNumber);
    const index = typeof column === `number` ? column : this.getColumnLabelIndex(column);
    if (index === void 0) throw new Error(`Column not found: ${column}`);
    return row[index];
  }
  /**
   * For a given row number, set all the columns to `value`.
   * `cols` gives the number of columns to set
   * @param rowNumber 
   * @param cols 
   * @param value 
   */
  setRow(rowNumber, cols, value) {
    const row = this.getOrCreateRow(rowNumber);
    for (let columnNumber = 0; columnNumber < cols; columnNumber++) {
      row[columnNumber] = value;
    }
  }
};

// src/data/graphs/DirectedGraph.ts
var createVertex = (id) => {
  return {
    id,
    out: []
  };
};
function toAdjacencyMatrix(graph3) {
  const v = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      if (ii.out.some((o) => o.id === jj.id)) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph = (graph3) => {
  const lines = debugGraphToArray(graph3);
  return lines.join(`
`);
};
var debugGraphToArray = (graph3) => {
  const r = [];
  const vertices2 = `vertices` in graph3 ? graph3.vertices.values() : graph3;
  for (const v of vertices2) {
    const str = debugDumpVertex(v);
    r.push(...str.map((line2) => ` ${line2}`));
  }
  return r;
};
var distance2 = (graph3, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function* edges(graph3) {
  const vertices2 = [...graph3.vertices.values()];
  for (const vertex of vertices2) {
    for (const edge of vertex.out) {
      yield edge;
    }
  }
}
function* vertices(graph3) {
  const vertices2 = [...graph3.vertices.values()];
  for (const vertex of vertices2) {
    yield vertex;
  }
}
function* adjacentVertices(graph3, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of vertex.out) {
    const edgeV = graph3.vertices.get(edge.id);
    if (edgeV === void 0) throw new Error(`Could not find vertex: ${edge.id}`);
    yield edgeV;
  }
}
var vertexHasOut = (vertex, outIdOrVertex) => {
  if (vertex === void 0) return false;
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return vertex.out.some((edge) => edge.id === outId);
};
var hasNoOuts = (graph3, vertex) => {
  const context = typeof vertex === `string` ? graph3.vertices.get(vertex) : vertex;
  if (context === void 0) return false;
  return context.out.length === 0;
};
var hasOnlyOuts = (graph3, vertex, ...outIdOrVertex) => {
  const context = resolveVertex(graph3, vertex);
  const outs = outIdOrVertex.map((o) => resolveVertex(graph3, o));
  if (outs.length !== context.out.length) {
    return false;
  }
  for (const out of outs) {
    if (!hasOut(graph3, context, out)) {
      return false;
    }
  }
  return true;
};
var hasOut = (graph3, vertex, outIdOrVertex) => {
  const context = resolveVertex(graph3, vertex);
  const outId = typeof outIdOrVertex === `string` ? outIdOrVertex : outIdOrVertex.id;
  return context.out.some((edge) => edge.id === outId);
};
var getOrCreate = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v !== void 0) return { graph: graph3, vertex: v };
  const vv = createVertex(id);
  const gg = updateGraphVertex(graph3, vv);
  return { graph: gg, vertex: vv };
};
var getOrFail = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v === void 0) throw new Error(`Vertex '${id}' not found in graph`);
  return v;
};
var updateGraphVertex = (graph3, vertex) => {
  const gr = {
    ...graph3,
    vertices: graph3.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var distanceDefault = (graph3, edge) => {
  if (edge.weight !== void 0) return edge.weight;
  return 1;
};
function disconnect(graph3, from, to2) {
  const fromV = resolveVertex(graph3, from);
  const toV = resolveVertex(graph3, to2);
  return hasOut(graph3, fromV, toV) ? updateGraphVertex(graph3, {
    ...fromV,
    out: fromV.out.filter((t) => t.id !== toV.id)
  }) : graph3;
}
function connectTo(graph3, from, to2, weight) {
  const fromResult = getOrCreate(graph3, from);
  graph3 = fromResult.graph;
  const toResult = getOrCreate(graph3, to2);
  graph3 = toResult.graph;
  const edge = {
    id: to2,
    weight
  };
  if (!hasOut(graph3, fromResult.vertex, toResult.vertex)) {
    graph3 = updateGraphVertex(graph3, {
      ...fromResult.vertex,
      // Add new edge to list of edges for this node
      out: [...fromResult.vertex.out, edge]
    });
  }
  return { graph: graph3, edge };
}
function connect(graph3, options) {
  const { to: to2, weight, from } = options;
  const bidi = options.bidi ?? false;
  const toList = Array.isArray(to2) ? to2 : [to2];
  for (const toSingle of toList) {
    const result = connectTo(graph3, from, toSingle, weight);
    graph3 = result.graph;
  }
  if (!bidi) return graph3;
  for (const toSingle of toList) {
    const result = connectTo(graph3, toSingle, from, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var debugDumpVertex = (v) => {
  const r = [
    v.id
  ];
  const stringForEdge2 = (edge) => edge.weight === void 0 ? edge.id : `${edge.id} (${edge.weight})`;
  for (const edge of v.out) {
    r.push(` -> ${stringForEdge2(edge)}`);
  }
  if (v.out.length === 0) r[0] += ` (terminal)`;
  return r;
};
function areAdjacent(graph3, a, b) {
  if (hasOut(graph3, a, b.id)) return true;
  if (hasOut(graph3, b, a.id)) return true;
}
function resolveVertex(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
function* bfs(graph3, startIdOrVertex, targetIdOrVertex) {
  const start = resolveVertex(graph3, startIdOrVertex);
  const target = targetIdOrVertex === void 0 ? void 0 : resolveVertex(graph3, targetIdOrVertex);
  const queue = new QueueMutable();
  const seen = /* @__PURE__ */ new Set();
  queue.enqueue(start);
  while (!queue.isEmpty) {
    const v = queue.dequeue();
    yield v;
    if (target !== void 0 && target === v) return;
    for (const edge of adjacentVertices(graph3, v)) {
      if (!seen.has(edge.id)) {
        seen.add(edge.id);
        queue.enqueue(resolveVertex(graph3, edge.id));
      }
    }
  }
}
function* dfs(graph3, startIdOrVertex) {
  const source = resolveVertex(graph3, startIdOrVertex);
  const s = new StackMutable();
  const seen = /* @__PURE__ */ new Set();
  s.push(source);
  while (!s.isEmpty) {
    const v = s.pop();
    if (v === void 0) continue;
    if (!seen.has(v.id)) {
      seen.add(v.id);
      yield v;
      for (const edge of v.out) {
        const destination = graph3.vertices.get(edge.id);
        if (destination) {
          s.push(destination);
        }
      }
    }
  }
}
var pathDijkstra = (graph3, sourceOrId) => {
  const source = typeof sourceOrId === `string` ? graph3.vertices.get(sourceOrId) : sourceOrId;
  if (source === void 0) throw new Error(`source vertex not found`);
  const distances = /* @__PURE__ */ new Map();
  const previous = /* @__PURE__ */ new Map();
  distances.set(source.id, 0);
  const pq = new PriorityMutable();
  const vertices2 = [...graph3.vertices.values()];
  for (const v of vertices2) {
    if (v.id !== source.id) {
      distances.set(v.id, Number.MAX_SAFE_INTEGER);
      previous.set(v.id, null);
    }
    pq.enqueueWithPriority(v.id, Number.MAX_SAFE_INTEGER);
  }
  while (!pq.isEmpty) {
    const u = pq.dequeueMin();
    if (u === void 0) throw new Error(`Bug. Queue unexpectedly empty`);
    const vertexU = graph3.vertices.get(u);
    for (const neighbour of vertexU.out) {
      const alt = distances.get(u) + distance2(graph3, neighbour);
      if (alt < distances.get(neighbour.id)) {
        distances.set(neighbour.id, alt);
        previous.set(neighbour.id, vertexU);
        pq.changePriority(neighbour.id, alt, true);
      }
    }
  }
  const pathTo = (id) => {
    const path = [];
    while (true) {
      if (id === source.id) break;
      const v = previous.get(id);
      if (v === void 0 || v === null) throw new Error(`Id not present: ${id}`);
      path.push({ id, weight: distances.get(id) });
      id = v.id;
    }
    return path;
  };
  return {
    distances,
    previous,
    pathTo
  };
};
var clone = (graph3) => {
  const g = {
    vertices: immutable$2([...graph3.vertices.entries()])
  };
  return g;
};
var graph = (...initialConnections) => {
  let g = {
    vertices: immutable$2()
  };
  for (const ic of initialConnections) {
    g = connect(g, ic);
  }
  return g;
};
function isAcyclic(graph3) {
  const cycles = getCycles(graph3);
  return cycles.length === 0;
}
function topologicalSort(graph3) {
  const indegrees = new NumberMap(0);
  for (const edge of edges(graph3)) {
    indegrees.add(edge.id, 1);
  }
  const queue = new QueueMutable();
  let vertexCount = 0;
  for (const vertex of vertices(graph3)) {
    if (indegrees.get(vertex.id) === 0) {
      queue.enqueue(vertex);
    }
    vertexCount++;
  }
  const topOrder = [];
  while (!queue.isEmpty) {
    const u = queue.dequeue();
    topOrder.push(u);
    for (const neighbour of u.out) {
      const result = indegrees.subtract(neighbour.id, 1);
      if (result === 0) {
        queue.enqueue(graph3.vertices.get(neighbour.id));
      }
    }
  }
  if (topOrder.length !== vertexCount) {
    throw new Error(`Graph contains cycles`);
  }
  return graphFromVertices(topOrder);
}
function graphFromVertices(vertices2) {
  const keyValues = map(vertices2, (f) => {
    return [f.id, f];
  });
  const m = immutable$2([...keyValues]);
  return {
    vertices: m
  };
}
function getCycles(graph3) {
  let index = 0;
  const stack = new StackMutable();
  const vertices2 = /* @__PURE__ */ new Map();
  const scc = [];
  for (const v of graph3.vertices.values()) {
    vertices2.set(v.id, {
      ...v,
      lowlink: Number.NaN,
      index: Number.NaN,
      onStack: false
    });
  }
  const strongConnect = (vertex) => {
    vertex.index = index;
    vertex.lowlink = index;
    index++;
    stack.push(vertex);
    vertex.onStack = true;
    for (const edge of vertex.out) {
      const edgeV = vertices2.get(edge.id);
      if (Number.isNaN(edgeV.index)) {
        strongConnect(edgeV);
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      } else if (edgeV.onStack) {
        vertex.lowlink = Math.min(vertex.lowlink, edgeV.lowlink);
      }
    }
    if (vertex.lowlink === vertex.index) {
      const stronglyConnected = [];
      let w;
      while (vertex !== w) {
        w = stack.pop();
        w.onStack = false;
        stronglyConnected.push({ id: w.id, out: w.out });
      }
      if (stronglyConnected.length > 1)
        scc.push(stronglyConnected);
    }
  };
  for (const v of vertices2.values()) {
    if (Number.isNaN(v.index)) {
      strongConnect(v);
    }
  }
  return scc;
}
function transitiveReduction(graph3) {
  for (const u of vertices(graph3)) {
    for (const v of adjacentVertices(graph3, u)) {
      for (const v1 of dfs(graph3, v)) {
        if (v.id === v1.id) continue;
        if (hasOut(graph3, u, v1)) {
          const g = disconnect(graph3, u, v1);
          return transitiveReduction(g);
        }
      }
    }
  }
  return graph3;
}
function prepare(_rx) {
  let g = graph();
  const events = initStream();
  const returnValue = {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dispose: events.dispose,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    isDisposed: events.isDisposed,
    graph: g,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: events.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onValue: events.onValue
  };
  return returnValue;
}

// src/rx/Types.ts
var symbol = Symbol(`Rx`);

// src/rx/ToArray.ts
async function toArray(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = intervalToMs(options.maximumWait, 10 * 1e3);
  const underThreshold = options.underThreshold ?? `partial`;
  const read = [];
  const rx = resolveSource(source);
  const promise = new Promise((resolve, reject) => {
    const done = () => {
      clearTimeout(maxWait);
      unsub();
      if (read.length < limit && underThreshold === `throw`) {
        reject(new Error(`Threshold not reached. Wanted: ${limit} got: ${read.length}. Maximum wait: ${maximumWait}`));
        return;
      }
      if (read.length < limit && underThreshold === `fill`) {
        for (let index = 0; index < limit; index++) {
          if (read[index] === void 0) {
            read[index] = options.fillValue;
          }
        }
      }
      resolve(read);
    };
    const maxWait = setTimeout(() => {
      done();
    }, maximumWait);
    const unsub = rx.on((message) => {
      if (messageIsDoneSignal(message)) {
        done();
      } else if (messageHasValue(message)) {
        read.push(message.value);
        if (read.length === limit) {
          done();
        }
      }
    });
  });
  return promise;
}
async function toArrayOrThrow(source, options = {}) {
  const limit = options.limit ?? Number.MAX_SAFE_INTEGER;
  const maximumWait = options.maximumWait ?? 5 * 1e3;
  const v = await toArray(source, { limit, maximumWait, underThreshold: `partial` });
  if (options.limit && v.length < options.limit) throw new Error(`Threshold not reached. Wanted: ${options.limit}, got ${v.length}`);
  return v;
}

// src/rx/ToGenerator.ts
async function* toGenerator(source) {
  const s = resolveSource(source);
  let promiseResolve = (_) => {
  };
  let promiseReject = (_) => {
  };
  const promiseInit = () => new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
  let promise = promiseInit();
  let keepRunning = true;
  s.on((message) => {
    if (messageHasValue(message)) {
      promiseResolve(message.value);
      promise = promiseInit();
    } else if (messageIsDoneSignal(message)) {
      keepRunning = false;
      promiseReject(`Source has completed`);
    }
  });
  while (keepRunning) {
    yield await promise;
  }
}

// src/data/MapObject.ts
var mapObjectShallow = (object2, mapFunction) => {
  const entries = Object.entries(object2);
  const mapped = entries.map(([sourceField, sourceFieldValue], index) => [
    sourceField,
    mapFunction({ value: sourceFieldValue, field: sourceField, index })
  ]);
  return Object.fromEntries(mapped);
};

// src/rx/Wrap.ts
function wrap2(source) {
  return {
    source: resolveSource(source),
    enacts: {
      setHtmlText: (options) => {
        return setHtmlText(source, options);
      }
    },
    annotate: (transformer) => {
      const a = annotate(source, transformer);
      return wrap2(a);
    },
    batch: (options) => {
      const w = wrap2(batch(source, options));
      return w;
    },
    debounce: (options = {}) => {
      return wrap2(debounce(source, options));
    },
    field: (fieldName, options = {}) => {
      const f = field(source, fieldName, options);
      return wrap2(f);
    },
    filter: (predicate, options) => {
      return wrap2(filter$1(source, predicate, options));
    },
    combineLatestToArray: (sources, options = {}) => {
      const srcs = [source, ...sources];
      return wrap2(combineLatestToArray(srcs, options));
    },
    combineLatestToObject: (sources, options) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap2(combineLatestToObject(o, options));
    },
    min: (options = {}) => {
      return wrap2(min2(source, options));
    },
    max: (options = {}) => {
      return wrap2(max2(source, options));
    },
    average: (options = {}) => {
      return wrap2(average3(source, options));
    },
    sum: (options = {}) => {
      return wrap2(sum2(source, options));
    },
    tally: (options = {}) => {
      return wrap2(tally2(source, options));
    },
    split: (options = {}) => {
      const streams = split(source, options).map((v) => wrap2(v));
      return streams;
    },
    splitLabelled: (...labels) => {
      const l = splitLabelled(source, labels);
      const m = mapObjectShallow(l, (args) => wrap2(args.value));
      return m;
    },
    switcher: (cases, options = {}) => {
      const s = switcher(source, cases, options);
      const m = mapObjectShallow(s, (args) => wrap2(args.value));
      return m;
    },
    syncToArray: (additionalSources, options = {}) => {
      const unwrapped = [source, ...additionalSources].map((v) => resolveSource(v));
      const x = syncToArray(unwrapped, options);
      return wrap2(x);
    },
    syncToObject: (sources, options = {}) => {
      const name = options.name ?? `source`;
      const o = { ...sources };
      o[name] = source;
      return wrap2(syncToObject(o, options));
    },
    tapProcess: (...processors) => {
      tapProcess(source, ...processors);
      return wrap2(source);
    },
    tapStream: (divergedStream) => {
      tapStream(source, divergedStream);
      return wrap2(source);
    },
    tapOps: (source2, ...ops) => {
      tapOps(source2, ...ops);
      return wrap2(source2);
    },
    throttle: (options = {}) => {
      return wrap2(throttle(source, options));
    },
    transform: (transformer, options = {}) => {
      return wrap2(transform(source, transformer, options));
    },
    timeoutTrigger: (options) => {
      return wrap2(timeoutTrigger(source, options));
    },
    toArray: (options) => {
      return toArray(source, options);
    },
    toArrayOrThrow: (options) => {
      return toArrayOrThrow(source, options);
    },
    onValue: (callback) => {
      const s = resolveSource(source);
      s.on((message) => {
        if (messageHasValue(message)) callback(message.value);
      });
    }
  };
}

// src/rx/Count.ts
function count(options = {}) {
  const lazy = options.lazy ?? `initial`;
  const interval = intervalToMs(options.interval, 1e3);
  const amount = options.amount ?? 1;
  const offset = options.offset ?? 0;
  let produced = 0;
  let value = offset;
  const done = (reason) => {
    events.dispose(reason);
  };
  const timer = continuously(() => {
    if (options.signal?.aborted) {
      done(`Aborted (${options.signal.reason})`);
      return false;
    }
    events.set(value);
    value += 1;
    produced++;
    if (produced >= amount) {
      done(`Limit reached`);
      return false;
    }
  }, interval);
  const events = initLazyStream({
    onStart() {
      timer.start();
    },
    onStop() {
      timer.cancel();
    },
    onDispose() {
      timer.cancel();
    },
    lazy
  });
  return events;
}

// src/rx/Dom.ts
var Dom_exports = {};
__export(Dom_exports, {
  bind: () => bind,
  bindDiffUpdate: () => bindDiffUpdate,
  bindElement: () => bindElement,
  bindHtml: () => bindHtml,
  bindText: () => bindText,
  bindUpdate: () => bindUpdate,
  bindValueText: () => bindValueText,
  elements: () => elements,
  fromDomQuery: () => fromDomQuery,
  win: () => win
});

// src/text/Segments.ts
function* stringSegmentsWholeToEnd(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const trimmed = afterMatch(source, delimiter);
    if (trimmed === source) {
      break;
    }
    source = trimmed;
  }
}
function* stringSegmentsWholeToFirst(source, delimiter = `.`) {
  while (source.length > 0) {
    yield source;
    const b = beforeMatch(source, delimiter, { ifNoMatch: `original`, fromEnd: true });
    if (b === source) break;
    source = b;
  }
}

// src/rx/Dom.ts
function fromDomQuery(query2) {
  const elements2 = [...document.querySelectorAll(query2)];
  return object(elements2);
}
var bindText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `textContent` });
};
var bindValueText = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `value`, attribName: `value` });
};
var bindHtml = (source, elOrQuery, bindOpts = {}) => {
  return bindElement(source, elOrQuery, { ...bindOpts, elField: `innerHTML` });
};
var bindElement = (source, elOrQuery, ...binds) => {
  if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
  const el2 = resolveEl(elOrQuery);
  let b = [];
  if (binds.length === 0) {
    b.push({ elField: `textContent` });
  } else {
    b = [...binds];
  }
  const bb = b.map((bind2) => {
    if (`element` in bind2) return bind2;
    return { ...bind2, element: el2 };
  });
  return bind(source, ...bb);
};
var resolveBindUpdater = (bind2, element) => {
  const b = resolveBindUpdaterBase(bind2);
  return (value) => {
    b(value, element);
  };
};
var resolveBindUpdaterBase = (bind2) => {
  if (bind2.elField !== void 0 || bind2.cssVariable === void 0 && bind2.attribName === void 0 && bind2.cssProperty === void 0 && bind2.textContent === void 0 && bind2.htmlContent === void 0) {
    const field2 = bind2.elField ?? `textContent`;
    return (v, element) => {
      element[field2] = v;
    };
  }
  if (bind2.attribName !== void 0) {
    const attrib = bind2.attribName;
    return (v, element) => {
      element.setAttribute(attrib, v);
    };
  }
  if (bind2.textContent) {
    return (v, element) => {
      element.textContent = v;
    };
  }
  if (bind2.htmlContent) {
    return (v, element) => {
      element.innerHTML = v;
    };
  }
  if (bind2.cssVariable !== void 0) {
    let css = bind2.cssVariable;
    if (!css.startsWith(`--`)) css = `--` + css;
    return (v, element) => {
      element.style.setProperty(css, v);
    };
  }
  if (bind2.cssProperty !== void 0) {
    return (v, element) => {
      element.style[bind2.cssProperty] = v;
    };
  }
  return (_, _element) => {
  };
};
var resolveTransform = (bind2) => {
  if (!bind2.transform && !bind2.transformValue) return;
  if (bind2.transformValue) {
    if (bind2.sourceField === void 0) throw new Error(`Expects 'sourceField' to be set when 'transformValue' is set`);
    return (value) => {
      const fieldValue = value[bind2.sourceField];
      return bind2.transformValue(fieldValue);
    };
  } else if (bind2.transform) {
    if (bind2.sourceField !== void 0) throw new Error(`If 'transform' is set, 'sourceField' is ignored`);
    return (value) => bind2.transform(value);
  }
};
var bind = (source, ...bindsUnresolvedElements) => {
  const binds = bindsUnresolvedElements.map((bind2) => {
    if (bind2.element && bind2.element !== void 0) return bind2;
    if (bind2.query) return {
      ...bind2,
      element: resolveEl(bind2.query)
    };
    throw new Error(`Unable to resolve element. Missing 'element' or 'query' values on bind. ${JSON.stringify(bind2)}`);
  });
  const bindsResolved = binds.map((bind2) => ({
    update: resolveBindUpdater(bind2, bind2.element),
    transformer: resolveTransform(bind2),
    sourceField: bind2.sourceField
  }));
  const update = (value) => {
    for (const bind2 of bindsResolved) {
      if (bind2.transformer) {
        bind2.update(bind2.transformer(value));
      } else {
        const v = bind2.sourceField ? value[bind2.sourceField] : value;
        if (typeof v === `object`) {
          if (bind2.sourceField) {
            bind2.update(JSON.stringify(v));
          } else {
            bind2.update(JSON.stringify(v));
          }
        } else bind2.update(v);
      }
    }
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      update(message.value);
    } else if (messageIsSignal(message)) {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElements) => {
      unsub();
      if (removeElements) {
        for (const bind2 of binds) {
          bind2.element.remove();
        }
      }
    }
  };
};
var bindUpdate = (source, elOrQuery, updater) => {
  const el2 = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el2);
  };
  const unsub = source.on((message) => {
    if (messageHasValue(message)) {
      console.log(message);
      update(message.value);
    } else {
      console.warn(message);
    }
  });
  if (hasLast(source)) {
    update(source.last());
  }
  return {
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el2.remove();
      }
    }
  };
};
var bindDiffUpdate = (source, elOrQuery, updater, opts = {}) => {
  if (elOrQuery === null) throw new Error(`Param 'elOrQuery' is null`);
  if (elOrQuery === void 0) throw new Error(`Param 'elOrQuery' is undefined`);
  const el2 = resolveEl(elOrQuery);
  const update = (value) => {
    updater(value, el2);
  };
  const unsub = source.onDiff((value) => {
    update(value);
  });
  const init2 = () => {
    if (hasLast(source) && opts.initial) opts.initial(source.last(), el2);
  };
  init2();
  return {
    refresh: () => {
      init2();
    },
    remove: (removeElement) => {
      unsub();
      if (removeElement) {
        el2.remove();
      }
    }
  };
};
var elements = (source, options) => {
  const containerEl = options.container ? resolveEl(options.container) : document.body;
  const defaultTag = options.defaultTag ?? `div`;
  const elByField = /* @__PURE__ */ new Map();
  const binds = /* @__PURE__ */ new Map();
  for (const [key, value] of Object.entries(options.binds ?? {})) {
    const tagName = value.tagName ?? defaultTag;
    binds.set(key, {
      ...value,
      update: resolveBindUpdaterBase(value),
      transform: resolveTransform(value),
      tagName,
      path: key
    });
  }
  const findBind = (path) => {
    const bind2 = getFromKeys(binds, stringSegmentsWholeToEnd(path));
    if (bind2 !== void 0) return bind2;
    if (!path.includes(`.`)) return binds.get(`_root`);
  };
  function* ancestorBinds(path) {
    for (const p of stringSegmentsWholeToFirst(path)) {
      if (binds.has(p)) {
        yield binds.get(p);
      }
    }
    if (binds.has(`_root`) && path.includes(`.`)) yield binds.get(`_root`);
  }
  const create3 = (path, value) => {
    const rootedPath = getRootedPath(path);
    console.log(`Rx.Dom.elements.create: ${path} rooted: ${rootedPath} value: ${JSON.stringify(value)}`);
    const bind2 = findBind(getRootedPath(path));
    let tagName = defaultTag;
    if (bind2?.tagName) tagName = bind2.tagName;
    const el2 = document.createElement(tagName);
    el2.setAttribute(`data-path`, path);
    update(path, el2, value);
    let parentForEl;
    for (const b of ancestorBinds(rootedPath)) {
      if (b?.nestChildren) {
        const absoluteRoot = beforeMatch(path, `.`);
        const findBy = b.path.replace(`_root`, absoluteRoot);
        parentForEl = elByField.get(findBy);
        if (parentForEl === void 0) ; else {
          break;
        }
      }
    }
    (parentForEl ?? containerEl).append(el2);
    elByField.set(path, el2);
    console.log(`Added el: ${path}`);
  };
  const update = (path, el2, value) => {
    console.log(`Rx.dom.update path: ${path} value:`, value);
    const bind2 = findBind(getRootedPath(path));
    if (bind2 === void 0) {
      if (typeof value === `object`) value = JSON.stringify(value);
      el2.textContent = value;
    } else {
      if (bind2.transform) value = bind2.transform(value);
      bind2.update(value, el2);
    }
  };
  const changes = (changes2) => {
    const queue = new QueueMutable({}, changes2);
    let d = queue.dequeue();
    const seenPaths = /* @__PURE__ */ new Set();
    while (d !== void 0) {
      const path = d.path;
      if (!(`previous` in d) || d.previous === void 0) {
        console.log(`Rx.Dom.elements.changes no previous. path: ${path}`);
        create3(path, d.value);
        const subdata = [...getPathsAndData(d.value, Number.MAX_SAFE_INTEGER, path)];
        console.log(subdata);
        for (const dd of subdata) {
          if (!seenPaths.has(dd.path)) {
            queue.enqueue(dd);
            seenPaths.add(dd.path);
          }
        }
      } else if (d.value === void 0) {
        const el2 = elByField.get(path);
        if (el2 === void 0) {
          console.warn(`No element to delete? ${path} `);
        } else {
          console.log(`Rx.Dom.elements.changes delete ${path}`);
          el2.remove();
        }
      } else {
        const el2 = elByField.get(path);
        if (el2 === void 0) {
          console.warn(`Rx.Dom.elements.changes No element to update ? ${path} `);
          create3(path, d.value);
        } else {
          update(path, el2, d.value);
        }
      }
      d = queue.dequeue();
    }
  };
  source.onDiff((value) => {
    changes(value);
  });
  if (hasLast(source)) {
    const last = source.last();
    changes([...getPathsAndData(last, 1)]);
  }
};
var getRootedPath = (path) => {
  const after = afterMatch(path, `.`);
  return after === path ? `_root` : `_root.` + after;
};
function win() {
  const generateRect = () => ({ width: window.innerWidth, height: window.innerHeight });
  const size = sources_exports.event(window, `resize`, {
    lazy: `very`,
    transform: () => generateRect()
  });
  const pointer = sources_exports.event(window, `pointermove`, {
    lazy: `very`,
    transform: (args) => {
      if (args === void 0) return { x: 0, y: 0 };
      const pe = args;
      return { x: pe.x, y: pe.y };
    }
  });
  const dispose = (reason = `Reactive.win.dispose`) => {
    size.dispose(reason);
    pointer.dispose(reason);
  };
  return { dispose, size, pointer };
}

// src/rx/sources/index.ts
var sources_exports = {};
__export(sources_exports, {
  array: () => array,
  arrayObject: () => arrayObject,
  boolean: () => boolean,
  domHslInputValue: () => domHslInputValue,
  domInputValue: () => domInputValue,
  domNumberInputValue: () => domNumberInputValue,
  event: () => event,
  eventField: () => eventField,
  eventTrigger: () => eventTrigger,
  func: () => func,
  iterator: () => iterator,
  number: () => number,
  object: () => object,
  objectProxy: () => objectProxy,
  objectProxySymbol: () => objectProxySymbol,
  observable: () => observable,
  observableWritable: () => observableWritable,
  of: () => of,
  pinged: () => pinged,
  string: () => string
});

// src/rx/sources/Array.ts
var of = (source, options = {}) => {
  if (Array.isArray(source)) {
    return array(source, options);
  }
};
var array = (sourceArray, options = {}) => {
  const lazy = options.lazy ?? `initial`;
  const signal = options.signal;
  const whenStopped = options.whenStopped ?? `continue`;
  const debugLifecycle = options.debugLifecycle ?? false;
  const array3 = [...sourceArray];
  if (lazy !== `very` && whenStopped === `reset`) throw new Error(`whenStopped:'reset' has no effect with 'lazy:${lazy}'. Use lazy:'very' instead.`);
  const intervalMs = intervalToMs(options.interval, 5);
  let index = 0;
  let lastValue = array3[0];
  const s = initLazyStream({
    ...options,
    lazy,
    onStart() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStart`);
      c.start();
    },
    onStop() {
      if (debugLifecycle) console.log(`Rx.readFromArray:onStop. whenStopped: ${whenStopped} index: ${index}`);
      c.cancel();
      if (whenStopped === `reset`) index = 0;
    }
    // onFirstSubscribe() {
    //   if (debugLifecycle) console.log(`Rx.readFromArray:onFirstSubscribe lazy: ${ lazy } runState: '${ c.runState }'`);
    //   // Start if in lazy mode and not running
    //   if (lazy !== `never` && c.runState === `idle`) c.start();
    // },
    // onNoSubscribers() {
    //   if (debugLifecycle) console.log(`Rx.readFromArray:onNoSubscribers lazy: ${ lazy } runState: '${ c.runState }' whenStopped: '${ whenStopped }'`);
    //   if (lazy === `very`) {
    //     c.cancel();
    //     if (whenStopped === `reset`) {
    //       index = 0;
    //     }
    //   }
    // }
  });
  const c = continuously(() => {
    if (signal?.aborted) {
      s.dispose(`Signalled (${signal.reason})`);
      return false;
    }
    lastValue = array3[index];
    index++;
    s.set(lastValue);
    if (index === array3.length) {
      s.dispose(`Source array complete`);
      return false;
    }
  }, intervalMs);
  if (!lazy) c.start();
  return {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dispose: s.dispose,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    isDisposed: s.isDisposed,
    isDone() {
      return index === array3.length;
    },
    last() {
      return lastValue;
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    on: s.on,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    onValue: s.onValue
  };
};

// src/rx/sources/ArrayObject.ts
function arrayObject(initialValue = [], options = {}) {
  const eq = options.eq ?? isEqualValueDefault;
  const setEvent = initStream();
  const arrayEvent = initStream();
  let value = initialValue;
  let disposed = false;
  const set = (replacement) => {
    compareArrays(value, replacement, eq);
    value = replacement;
    setEvent.set([...replacement]);
  };
  const setAt = (index, v) => {
    value[index] = v;
    setEvent.set([...value]);
  };
  const push = (v) => {
    value = [...value, v];
    setEvent.set([...value]);
    const cr = [`add`, value.length - 1, v];
    arrayEvent.set([cr]);
  };
  const deleteAt = (index) => {
    const valueChanged = remove(value, index);
    if (valueChanged.length === value.length) return;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const deleteWhere = (filter2) => {
    const valueChanged = value.filter((v) => !filter2(v));
    const count2 = value.length - valueChanged.length;
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
    return count2;
  };
  const insertAt2 = (index, v) => {
    const valueChanged = insertAt(value, index, v);
    const diff = compareArrays(value, valueChanged, eq);
    value = valueChanged;
    setEvent.set([...value]);
    arrayEvent.set(diff.summary);
  };
  const dispose = (reason) => {
    if (disposed) return;
    setEvent.dispose(reason);
    disposed = true;
  };
  const r = {
    dispose,
    isDisposed() {
      return disposed;
    },
    last: () => value,
    on: setEvent.on,
    onArray: arrayEvent.on,
    onValue: setEvent.onValue,
    setAt,
    push,
    deleteAt,
    deleteWhere,
    insertAt: insertAt2,
    /**
     * Set the whole object
     */
    set
  };
  return r;
}

// src/rx/sources/Boolean.ts
function boolean(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set
  };
}

// src/rx/sources/Event.ts
function eventField(targetOrQuery, eventName, fieldName, initialValue, options = {}) {
  const initial = {};
  initial[fieldName] = initialValue;
  const rxField = field(
    event(targetOrQuery, eventName, initial, options),
    fieldName,
    options
  );
  return rxField;
}
function event(targetOrQuery, name, initialValue, options = {}) {
  let target;
  if (typeof targetOrQuery === `string`) {
    target = document.querySelector(targetOrQuery);
    if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
  } else {
    target = targetOrQuery;
  }
  if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const lazy = options.lazy ?? false;
  if (initialValue === void 0) initialValue = {};
  const rxObject = object(initialValue, { deepEntries: true });
  let eventAdded = false;
  let disposed = false;
  const callback = (args) => {
    if (debugFiring) console.log(`Reactive.event '${name}' firing '${JSON.stringify(args)}`);
    rxObject.set(args);
  };
  const remove2 = () => {
    if (!eventAdded) return;
    eventAdded = false;
    target.removeEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Rx.From.event remove '${name}'`);
    }
  };
  const add2 = () => {
    if (eventAdded) return;
    eventAdded = true;
    target.addEventListener(name, callback);
    if (debugLifecycle) {
      console.log(`Rx.From.event add '${name}'`);
    }
  };
  if (!lazy) add2();
  return {
    last: () => {
      if (lazy) add2();
      return rxObject.last();
    },
    dispose: (reason) => {
      if (disposed) return;
      disposed = true;
      remove2();
      rxObject.dispose(reason);
    },
    isDisposed() {
      return disposed;
    },
    on: (handler) => {
      if (lazy) add2();
      return rxObject.on(handler);
    },
    onValue: (handler) => {
      if (lazy) add2();
      return rxObject.onValue(handler);
    }
  };
}
function eventTrigger(targetOrQuery, name, options = {}) {
  let target;
  if (typeof targetOrQuery === `string`) {
    target = document.querySelector(targetOrQuery);
    if (target === null) throw new Error(`Target query did not resolve to an element. Query: '${targetOrQuery}'`);
  } else {
    target = targetOrQuery;
  }
  if (target === null) throw new Error(`Param 'targetOrQuery' is null`);
  const debugLifecycle = options.debugLifecycle ?? false;
  const debugFiring = options.debugFiring ?? false;
  const fireInitial = options.fireInitial ?? false;
  let count2 = 0;
  const elapsed2 = Elapsed_exports.interval();
  const stream2 = initLazyStream({
    lazy: options.lazy ?? `very`,
    onStart() {
      target.addEventListener(name, callback);
      if (debugLifecycle) {
        console.log(`Rx.From.eventTrigger add '${name}'`);
      }
      if (fireInitial && count2 === 0) {
        callback();
      }
    },
    onStop() {
      target.removeEventListener(name, callback);
      if (debugLifecycle) {
        console.log(`Rx.From.eventTrigger remove '${name}'`);
      }
    }
  });
  const callback = (_args) => {
    if (debugFiring) console.log(`Rx.From.eventTrigger '${name}' triggered'`);
    stream2.set({
      sinceLast: elapsed2(),
      total: ++count2
    });
  };
  return stream2;
}

// src/data/index.ts
var data_exports = {};
__export(data_exports, {
  Bipolar: () => Bipolar_exports,
  Correlate: () => Correlate_exports,
  FrequencyMutable: () => FrequencyMutable,
  Graphs: () => graphs_exports,
  IntervalTracker: () => IntervalTracker,
  Normalise: () => Normalise_exports,
  NumberTracker: () => NumberTracker,
  Pathed: () => Pathed_exports,
  PointTracker: () => PointTracker,
  Pool: () => Pool_exports,
  PrimitiveTracker: () => PrimitiveTracker,
  Table: () => Table,
  TrackedPointMap: () => TrackedPointMap,
  TrackedValueMap: () => TrackedValueMap,
  TrackerBase: () => TrackerBase,
  changedDataFields: () => changedDataFields,
  clamp: () => clamp,
  clampIndex: () => clampIndex,
  compareArrays: () => compareArrays,
  compareData: () => compareData,
  compareDataExecute: () => compareDataExecute,
  compareKeys: () => compareKeys,
  fieldResolve: () => fieldResolve,
  fieldResolver: () => fieldResolver,
  flip: () => flip,
  frequencyMutable: () => frequencyMutable,
  interpolate: () => interpolate$1,
  interpolateAngle: () => interpolateAngle,
  interpolatorInterval: () => interpolatorInterval,
  interpolatorStepped: () => interpolatorStepped,
  intervalTracker: () => intervalTracker,
  isEmptyEntries: () => isEmptyEntries,
  isEqualContextString: () => isEqualContextString,
  keysToNumbers: () => keysToNumbers,
  mapObjectShallow: () => mapObjectShallow,
  movingAverage: () => movingAverage,
  movingAverageLight: () => movingAverageLight,
  movingAverageTimed: () => movingAverageTimed,
  noiseFilter: () => noiseFilter,
  numberTracker: () => numberTracker,
  piPi: () => piPi$1,
  pointTracker: () => pointTracker,
  pointsTracker: () => pointsTracker,
  processChain: () => processChain,
  proportion: () => proportion,
  pull: () => pull,
  reactiveUpdate: () => reactiveUpdate,
  scale: () => scale,
  scaleClamped: () => scaleClamped,
  scalePercent: () => scalePercent,
  scalePercentages: () => scalePercentages,
  scaler: () => scaler$1,
  scalerPercent: () => scalerPercent,
  softmax: () => softmax,
  trackUnique: () => trackUnique,
  trackUniqueInstances: () => trackUniqueInstances,
  wrap: () => wrap$1,
  wrapInteger: () => wrapInteger,
  wrapRange: () => wrapRange
});

// src/data/Bipolar.ts
var Bipolar_exports = {};
__export(Bipolar_exports, {
  clamp: () => clamp2,
  fromScalar: () => fromScalar,
  immutable: () => immutable3,
  random: () => random,
  randomSource: () => randomSource,
  scale: () => scale2,
  scaleClamped: () => scaleClamped2,
  toScalar: () => toScalar,
  towardZero: () => towardZero
});
var immutable3 = (startingValueOrBipolar = 0) => {
  const startingValue = typeof startingValueOrBipolar === `number` ? startingValueOrBipolar : startingValueOrBipolar.value;
  if (startingValue > 1) throw new Error(`Cannot be larger than 1`);
  if (startingValue < -1) throw new Error(`Cannot be smaller than -1`);
  if (Number.isNaN(startingValue)) throw new Error(`startingValue is NaN`);
  const v = startingValue;
  return {
    [Symbol.toPrimitive](hint) {
      if (hint === `number`) return v;
      else if (hint === `string`) return v.toString();
      return true;
    },
    value: v,
    towardZero: (amt) => {
      return immutable3(towardZero(v, amt));
    },
    add: (amt) => {
      return immutable3(clamp2(v + amt));
    },
    multiply: (amt) => {
      return immutable3(clamp2(v * amt));
    },
    inverse: () => {
      return immutable3(-v);
    },
    interpolate: (amt, b) => {
      return immutable3(clamp2(interpolate$1(amt, v, b)));
    },
    asScalar: () => {
      return toScalar(v);
    }
  };
};
var toScalar = (bipolarValue) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Expected v to be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`Parameter is NaN`);
  return (bipolarValue + 1) / 2;
};
var fromScalar = (scalarValue) => {
  throwNumberTest(scalarValue, `percentage`, `v`);
  return scalarValue * 2 - 1;
};
var scale2 = (inputValue, inMin, inMax) => {
  return clamp2(scaler$1(inMin, inMax, -1, 1)(inputValue));
};
var scaleClamped2 = (inputValue, inMin, inMax) => {
  return scaler$1(inMin, inMax, -1, 1)(inputValue);
};
var randomSource = (maxOrOptions) => {
  const source = floatSource(maxOrOptions);
  return () => source() * 2 - 1;
};
var random = (maxOrOptions) => {
  const source = randomSource(maxOrOptions);
  return source();
};
var clamp2 = (bipolarValue) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Parameter must be a number. Got: ${typeof bipolarValue}`);
  if (Number.isNaN(bipolarValue)) throw new Error(`v parameter is NaN`);
  if (bipolarValue > 1) return 1;
  if (bipolarValue < -1) return -1;
  return bipolarValue;
};
var towardZero = (bipolarValue, amount) => {
  if (typeof bipolarValue !== `number`) throw new Error(`Parameter 'v' must be a number. Got: ${typeof bipolarValue}`);
  if (typeof amount !== `number`) throw new Error(`Parameter 'amt' must be a number. Got: ${typeof amount}`);
  if (amount < 0) throw new Error(`Parameter 'amt' must be positive`);
  if (bipolarValue < 0) {
    bipolarValue += amount;
    if (bipolarValue > 0) bipolarValue = 0;
  } else if (bipolarValue > 0) {
    bipolarValue -= amount;
    if (bipolarValue < 0) bipolarValue = 0;
  }
  return bipolarValue;
};

// src/data/Correlate.ts
var Correlate_exports = {};
__export(Correlate_exports, {
  align: () => align,
  alignById: () => alignById
});
var orderScore = (a, b) => {
  if (a.score > b.score) return -1;
  else if (a.score < b.score) return 1;
  return 0;
};
var align = (similarityFn, lastData, newData, opts = {}) => {
  const matchThreshold = opts.matchThreshold ?? 0;
  const debug = opts.debug ?? false;
  const results = /* @__PURE__ */ new Map();
  const newThings = [];
  const lastMap = /* @__PURE__ */ new Map();
  lastData?.forEach((d, index) => {
    if (d === void 0) {
      throw new Error(`'lastData' contains undefined (index: ${index})`);
    }
    lastMap.set(d.id, d);
  });
  for (let i = 0; i < newData.length; i++) {
    const newD = newData[i];
    if (!lastData || lastData.length === 0) {
      if (debug) console.debug(`Correlate.align() new id: ${newD.id}`);
      newThings.push(newD);
      continue;
    }
    const scoredLastValues = Array.from(lastMap.values()).map((last) => ({
      id: last.id,
      score: last === null ? -1 : similarityFn(last, newD),
      last
    }));
    if (scoredLastValues.length === 0) {
      if (debug) {
        console.debug(`Correlate.align() no valid last values id: ${newD.id}`);
      }
      newThings.push(newD);
      continue;
    }
    scoredLastValues.sort(orderScore);
    const top = scoredLastValues[0];
    if (top.score < matchThreshold) {
      if (debug) {
        console.debug(
          `Correlate.align() new item does not reach threshold. Top score: ${top.score} id: ${newD.id}`
        );
      }
      newThings.push(newD);
      continue;
    }
    if (debug && top.id !== newD.id) {
      console.log(
        `Correlate.align() Remapped ${newD.id} -> ${top.id} (score: ${top.score})`
      );
    }
    results.set(top.id, { ...newD, id: top.id });
    lastMap.delete(top.id);
  }
  newThings.forEach((t) => results.set(t.id, t));
  return Array.from(results.values());
};
var alignById = (fn, opts = {}) => {
  let lastData = [];
  const compute = (newData) => {
    lastData = align(fn, lastData, newData, opts);
    return [...lastData];
  };
  return compute;
};

// src/data/Flip.ts
var flip = (v) => {
  if (typeof v === `function`) v = v();
  throwNumberTest(v, `percentage`, `v`);
  return 1 - v;
};

// src/data/FrequencyMutable.ts
var FrequencyMutable = class extends SimpleEventEmitter {
  #store;
  #keyString;
  /**
   * Constructor
   * @param keyString Function to key items. Uses JSON.stringify by default
   */
  constructor(keyString) {
    super();
    this.#store = /* @__PURE__ */ new Map();
    if (keyString === void 0) {
      keyString = (a) => {
        if (a === void 0) throw new Error(`Cannot create key for undefined`);
        return typeof a === `string` ? a : JSON.stringify(a);
      };
    }
    this.#keyString = keyString;
  }
  /**
   * Clear data. Fires `change` event
   */
  clear() {
    this.#store.clear();
    this.fireEvent(`change`, { context: this });
  }
  /**
   * @returns Iterator over keys (ie. groups)
   */
  keys() {
    return this.#store.keys();
  }
  /**
   * @returns Iterator over frequency counts
   */
  values() {
    return this.#store.values();
  }
  /**
   * @returns Copy of entries as an array of `[key, count]`
   */
  toArray() {
    return [...this.#store.entries()];
  }
  /**
   * Returns a string with keys and counts, useful for debugging.
   * @returns
   */
  debugString() {
    let t = ``;
    for (const [key, count2] of this.#store.entries()) {
      t += `${key}: ${count2}, `;
    }
    if (t.endsWith(`, `)) return t.slice(0, Math.max(0, t.length - 2));
    return t;
  }
  /**
   *
   * @param value Value to count
   * @returns Frequency of value, or _undefined_ if it does not exist
   */
  frequencyOf(value) {
    if (typeof value === `string`) return this.#store.get(value);
    const key = this.#keyString(value);
    return this.#store.get(key);
  }
  /**
   *
   * @param value Value to count
   * @returns Relative frequency of `value`, or _undefined_ if it does not exist
   */
  relativeFrequencyOf(value) {
    let freq;
    if (typeof value === `string`) freq = this.#store.get(value);
    else {
      const key = this.#keyString(value);
      freq = this.#store.get(key);
    }
    if (freq === void 0) return;
    const mma = this.minMaxAvg();
    return freq / mma.total;
  }
  /**
   * @returns Copy of entries as an array
   */
  entries() {
    return [...this.#store.entries()];
  }
  /**
   *
   * @returns Returns `{min,max,avg,total}`
   */
  minMaxAvg() {
    return minMaxAvg2(this.entries());
  }
  /**
   *
   * @param sortStyle Sorting style (default: _value_, ie. count)
   * @returns Sorted array of [key,frequency]
   */
  entriesSorted(sortStyle = `value`) {
    const s = getSorter(sortStyle);
    return s(this.entries());
  }
  /**
   *
   * @param values Values to add. Fires _change_ event after adding item(s)
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  add(...values) {
    if (values === void 0) throw new Error(`value parameter is undefined`);
    const keys = values.map((v) => this.#keyString(v));
    for (const key of keys) {
      const score = this.#store.get(key) ?? 0;
      this.#store.set(key, score + 1);
    }
    this.fireEvent(`change`, { context: this });
  }
};
var frequencyMutable = (keyString) => new FrequencyMutable(keyString);

// src/data/IntervalTracker.ts
var IntervalTracker = class extends NumberTracker {
  lastMark = 0;
  mark() {
    if (this.lastMark > 0) {
      this.seen(performance.now() - this.lastMark);
    }
    this.lastMark = performance.now();
  }
};
var intervalTracker = (opts) => new IntervalTracker(opts);

// src/data/KeysToNumbers.ts
var keysToNumbers = (object2, onInvalidKey = `throw`) => {
  const returnObject = {};
  for (const entry of Object.entries(object2)) {
    const asNumber = Number.parseInt(entry[0]);
    if (Number.isNaN(asNumber)) {
      switch (onInvalidKey) {
        case `throw`: {
          throw new TypeError(`Cannot convert key '${entry[0]}' to an integer`);
        }
        case `ignore`: {
          continue;
        }
        case `keep`: {
          returnObject[entry[0]] = entry[1];
          continue;
        }
        default: {
          throw new Error(`Param 'onInvalidKey' should be: 'throw', 'ignore' or 'keep'.`);
        }
      }
    }
    returnObject[asNumber] = entry[1];
  }
  return returnObject;
};

// src/data/MovingAverage.ts
var movingAverageLight = (scaling = 3) => {
  throwNumberTest(scaling, `aboveZero`, `scaling`);
  let average4 = 0;
  let count2 = 0;
  return (v) => {
    const r = numberTest(v, ``, `v`);
    if (r[0] && v !== void 0) {
      count2++;
      average4 = average4 + (v - average4) / Math.min(count2, scaling);
    }
    return average4;
  };
};
var movingAverageTimed = (options) => {
  const average4 = movingAverageLight();
  const rm = rateMinimum({
    ...options,
    whatToCall: (distance3) => {
      average4(distance3);
    },
    fallback() {
      return options.default ?? 0;
    }
  });
  return (v) => {
    rm(v);
    return average4();
  };
};
var movingAverage = (samples = 100, weighter) => {
  const q = new QueueMutable({
    capacity: samples,
    discardPolicy: `older`
  });
  return (v) => {
    const r = numberTest(v);
    if (r[0] && v !== void 0) {
      q.enqueue(v);
    }
    return weighter === void 0 ? average$1(q.data) : averageWeighted(q.data, weighter);
  };
};
var PiPi = Math.PI * 2;
var smoothingFactor = (timeDelta, cutoff) => {
  const r = PiPi * cutoff * timeDelta;
  return r / (r + 1);
};
var exponentialSmoothing = (smoothingFactor2, value, previous) => {
  return smoothingFactor2 * value + (1 - smoothingFactor2) * previous;
};
var noiseFilter = (cutoffMin = 1, speedCoefficient = 0, cutoffDefault = 1) => {
  let previousValue = 0;
  let derivativeLast = 0;
  let timestampLast = 0;
  const compute = (value, timestamp) => {
    if (timestamp === void 0) timestamp = performance.now();
    const timeDelta = timestamp - timestampLast;
    const s = smoothingFactor(timeDelta, cutoffDefault);
    const valueDelta = (value - previousValue) / timeDelta;
    const derivative = exponentialSmoothing(s, valueDelta, derivativeLast);
    const cutoff = cutoffMin + speedCoefficient * Math.abs(derivative);
    const a = smoothingFactor(timeDelta, cutoff);
    const smoothed = exponentialSmoothing(a, value, previousValue);
    previousValue = smoothed;
    derivativeLast = derivative;
    timestampLast = timestamp;
    return smoothed;
  };
  return compute;
};

// src/data/Normalise.ts
var Normalise_exports = {};
__export(Normalise_exports, {
  array: () => array2,
  stream: () => stream
});
var stream = (minDefault, maxDefault) => {
  let min3 = minDefault ?? Number.MAX_SAFE_INTEGER;
  let max3 = maxDefault ?? Number.MIN_SAFE_INTEGER;
  throwNumberTest(minDefault);
  throwNumberTest(maxDefault);
  return (v) => {
    throwNumberTest(v);
    min3 = Math.min(min3, v);
    max3 = Math.max(max3, v);
    return scale(v, min3, max3);
  };
};
var array2 = (values, minForced, maxForced) => {
  if (!Array.isArray(values)) {
    throw new TypeError(`Param 'values' should be an array. Got: ${typeof values}`);
  }
  const mma = minMaxAvg(values);
  const min3 = minForced ?? mma.min;
  const max3 = maxForced ?? mma.max;
  return values.map((v) => clamp(scale(v, min3, max3)));
};

// src/data/MonitorChanges.ts
var compareDataExecute = (o, options) => {
  let current = o;
  const cbs = /* @__PURE__ */ new Map();
  for (const [k, v] of Object.entries(options.onFieldChange)) {
    cbs.set(k.replaceAll(`_`, `.`), v);
  }
  return (value) => {
    const changes = compareData2(current, value, { includeParents: true });
    for (const c of changes) {
      const cb = cbs.get(c.path);
      if (cb) {
        c.value = cb(c.value, c.previous, c.path);
      }
    }
    console.log(`post`, JSON.stringify(changes));
    return current;
  };
};

// src/data/ObjectTracker.ts
var ObjectTracker = class extends TrackerBase {
  //abstract onSeen(_p: Array<V>): SeenResultType;
  values;
  constructor(opts = {}) {
    super(opts);
    this.values = [];
  }
  onTrimmed() {
  }
  /**
   * Reduces size of value store to `limit`. 
   * Returns number of remaining items
   * @param limit
   */
  trimStore(limit) {
    if (limit >= this.values.length) return this.values.length;
    this.values = this.values.slice(-limit);
    return this.values.length;
  }
  /**
   * Allows sub-classes to be notified when a reset happens
   * @ignore
   */
  onReset() {
    this.values = [];
  }
  /**
   * Tracks a value
   * @ignore
   */
  filterData(p) {
    const ts = p.map(
      (v) => `at` in v ? v : {
        ...v,
        at: Date.now()
      }
    );
    const last = ts.at(-1);
    if (this.storeIntermediate) this.values.push(...ts);
    else switch (this.values.length) {
      case 0: {
        this.values.push(last);
        break;
      }
      case 1: {
        this.values.push(last);
        break;
      }
      case 2: {
        this.values[1] = last;
        break;
      }
    }
    return ts;
  }
  /**
   * Last seen value. If no values have been added, it will return the initial value
   */
  get last() {
    if (this.values.length === 1) return this.values[0];
    return this.values.at(-1);
  }
  /**
   * Returns the initial value
   */
  get initial() {
    return this.values.at(0);
  }
  /**
   * Returns number of recorded values (includes the initial value in the count)
   */
  get size() {
    return this.values.length;
  }
  /**
   * Returns the elapsed time, in milliseconds since the initial value
   */
  get elapsed() {
    return Date.now() - this.values[0].at;
  }
};

// src/data/PointTracker.ts
var PointTracker = class extends ObjectTracker {
  /**
   * Function that yields the relation from initial point
   */
  initialRelation;
  /**
   * Last result
   */
  lastResult;
  constructor(opts = {}) {
    super(opts);
  }
  onTrimmed() {
    this.initialRelation = void 0;
  }
  /**
   * Returns the last x coord
   */
  get x() {
    return this.last.x;
  }
  /**
   * Returns the last y coord
   */
  get y() {
    return this.last.y;
  }
  /**
   * @ignore
   */
  onReset() {
    super.onReset();
    this.lastResult = void 0;
    this.initialRelation = void 0;
  }
  seenEvent(p) {
    if (`getCoalescedEvents` in p) {
      const events = p.getCoalescedEvents();
      const asPoints = events.map((event2) => ({ x: event2.clientX, y: event2.clientY }));
      return this.seen(...asPoints);
    } else {
      return this.seen({ x: p.clientX, y: p.clientY });
    }
  }
  /**
   * Tracks a point, returning data on its relation to the
   * initial point and the last received point.
   * 
   * Use {@link seenEvent} to track a raw `PointerEvent`.
   * 
   * @param _p Point
   */
  computeResults(_p) {
    const currentLast = this.last;
    const previousLast = this.values.at(-2);
    if (this.initialRelation === void 0 && this.initial) {
      this.initialRelation = relation(this.initial);
    } else if (this.initialRelation === void 0) {
      throw new Error(`Bug: No initialRelation, and this.inital is undefined?`);
    }
    const lastRelation = previousLast === void 0 ? relation(currentLast) : relation(previousLast);
    const initialRel = this.initialRelation(currentLast);
    const speed = previousLast === void 0 ? 0 : length$1(previousLast, currentLast) / (currentLast.at - previousLast.at);
    const lastRel = {
      ...lastRelation(currentLast),
      speed
    };
    const r = {
      fromInitial: initialRel,
      fromLast: lastRel,
      values: [...this.values]
    };
    this.lastResult = r;
    return r;
  }
  /**
   * Returns a polyline representation of stored points.
   * Returns an empty array if points were not saved, or there's only one.
   */
  get line() {
    if (this.values.length === 1) return [];
    return joinPointsToLines(...this.values);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a polar coordinate
   */
  get vectorPolar() {
    return Vector_exports.fromLinePolar(this.lineStartEnd);
  }
  /**
   * Returns a vector of the initial/last points of the tracker.
   * Returns as a Cartesian coordinate
   */
  get vectorCartesian() {
    return Vector_exports.fromLineCartesian(this.lineStartEnd);
  }
  /**
   * Returns a line from initial point to last point.
   *
   * If there are less than two points, Lines.Empty is returned
   */
  get lineStartEnd() {
    const initial = this.initial;
    if (this.values.length < 2 || !initial) return Empty2;
    return {
      a: initial,
      b: this.last
    };
  }
  /**
   * Returns distance from latest point to initial point.
   * If there are less than two points, zero is returned.
   *
   * This is the direct distance from initial to last,
   * not the accumulated length.
   * @returns Distance
   */
  distanceFromStart() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? distance(initial, this.last) : 0;
  }
  /**
   * Difference between last point and the initial point, calculated
   * as a simple subtraction of x & y.
   *
   * `Points.Placeholder` is returned if there's only one point so far.
   */
  difference() {
    const initial = this.initial;
    return this.values.length >= 2 && initial !== void 0 ? subtract(this.last, initial) : Placeholder;
  }
  /**
   * Returns angle (in radians) from latest point to the initial point
   * If there are less than two points, undefined is return.
   * @returns Angle in radians
   */
  angleFromStart() {
    const initial = this.initial;
    if (initial !== void 0 && this.values.length > 2) {
      return angle(initial, this.last);
    }
  }
  /**
   * Returns the total length of accumulated points.
   * Returns 0 if points were not saved, or there's only one
   */
  get length() {
    if (this.values.length === 1) return 0;
    const l = this.line;
    return length$1(l);
  }
};
var TrackedPointMap = class extends TrackedValueMap {
  constructor(opts = {}) {
    super((key, start) => {
      if (start === void 0) throw new Error(`Requires start point`);
      const p = new PointTracker({
        ...opts,
        id: key
      });
      p.seen(start);
      return p;
    });
  }
  /**
   * Track a PointerEvent
   * @param event
   */
  seenEvent(event2) {
    if (`getCoalescedEvents` in event2) {
      const events = event2.getCoalescedEvents();
      const seens = events.map((subEvent) => super.seen(subEvent.pointerId.toString(), subEvent));
      return Promise.all(seens);
    } else {
      return Promise.all([super.seen(event2.pointerId.toString(), event2)]);
    }
  }
};
var pointsTracker = (opts = {}) => new TrackedPointMap(opts);
var pointTracker = (opts = {}) => new PointTracker(opts);

// src/data/Pool.ts
var Pool_exports = {};
__export(Pool_exports, {
  Pool: () => Pool,
  PoolUser: () => PoolUser,
  Resource: () => Resource,
  create: () => create
});
var PoolUser = class extends SimpleEventEmitter {
  /**
   * Constructor
   * @param key User key
   * @param resource Resource being used
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  constructor(key, resource) {
    super();
    this.key = key;
    this.resource = resource;
    this._lastUpdate = performance.now();
    this._pool = resource.pool;
    this._userExpireAfterMs = this._pool.userExpireAfterMs;
    this._state = `idle`;
    this._pool.log.log(`PoolUser ctor key: ${this.key}`);
  }
  _lastUpdate;
  _pool;
  _state;
  _userExpireAfterMs;
  /**
   * Returns a human readable debug string
   * @returns
   */
  toString() {
    if (this.isDisposed) return `PoolUser. State: disposed`;
    return `PoolUser. State: ${this._state} Elapsed: ${performance.now() - this._lastUpdate} Data: ${JSON.stringify(this.resource.data)}`;
  }
  /**
   * Resets countdown for instance expiry.
   * Throws an error if instance is disposed.
   */
  keepAlive() {
    if (this._state === `disposed`) throw new Error(`PoolItem disposed`);
    this._lastUpdate = performance.now();
  }
  /**
   * @internal
   * @param reason
   * @returns
   */
  _dispose(reason, data) {
    if (this._state === `disposed`) return;
    const resource = this.resource;
    this._state = `disposed`;
    resource._release(this);
    this._pool.log.log(`PoolUser dispose key: ${this.key} reason: ${reason}`);
    this.fireEvent(`disposed`, { data, reason });
    super.clearEventListeners();
  }
  /**
   * Release this instance
   * @param reason
   */
  release(reason) {
    if (this.isDisposed) throw new Error(`User disposed`);
    const resource = this.resource;
    const data = resource.data;
    this._pool.log.log(`PoolUser release key: ${this.key} reason: ${reason}`);
    this.fireEvent(`released`, { data, reason });
    this._dispose(`release-${reason}`, data);
  }
  // #region Properties
  get data() {
    if (this.isDisposed) throw new Error(`User disposed`);
    return this.resource.data;
  }
  /**
   * Returns true if this instance has expired.
   * Expiry counts if elapsed time is greater than `userExpireAfterMs`
   */
  get isExpired() {
    if (this._userExpireAfterMs > 0) {
      return performance.now() > this._lastUpdate + this._userExpireAfterMs;
    }
    return false;
  }
  /**
   * Returns elapsed time since last 'update'
   */
  get elapsed() {
    return performance.now() - this._lastUpdate;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this._state === `disposed`;
  }
  /**
   * Returns true if instance is neither disposed nor expired
   */
  get isValid() {
    if (this.isDisposed || this.isExpired) return false;
    if (this.resource.isDisposed) return false;
    return true;
  }
  // #endregion
};
var Resource = class {
  /**
   * Constructor.
   * @param pool Pool
   * @param data Data
   */
  constructor(pool, data) {
    this.pool = pool;
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    if (pool === void 0) throw new Error(`Parameter 'pool' is undefined`);
    this.#data = data;
    this.#lastUsersChange = 0;
    this.#resourcesWithoutUserExpireAfterMs = pool.resourcesWithoutUserExpireAfterMs;
    this.#capacityPerResource = pool.capacityPerResource;
    this.#users = [];
    this.#state = `idle`;
  }
  #state;
  #data;
  #users;
  #capacityPerResource;
  #resourcesWithoutUserExpireAfterMs;
  #lastUsersChange;
  /**
   * Gets data associated with resource.
   * Throws an error if disposed
   */
  get data() {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    return this.#data;
  }
  /**
   * Changes the data associated with this resource.
   * Throws an error if disposed or `data` is undefined.
   * @param data
   */
  updateData(data) {
    if (this.#state === `disposed`) throw new Error(`Resource disposed`);
    if (data === void 0) throw new Error(`Parameter 'data' is undefined`);
    this.#data = data;
  }
  /**
   * Returns a human-readable debug string for resource
   * @returns
   */
  toString() {
    return `Resource (expired: ${this.isExpiredFromUsers} users: ${this.#users.length}, state: ${this.#state}) data: ${JSON.stringify(this.data)}`;
  }
  /**
   * Assigns a user to this resource.
   * @internal
   * @param user
   */
  _assign(user) {
    const existing = this.#users.find((u) => u === user || u.key === user.key);
    if (existing) throw new Error(`User instance already assigned to resource`);
    this.#users.push(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Releases a user from this resource
   * @internal
   * @param user
   */
  _release(user) {
    this.#users = this.#users.filter((u) => u !== user);
    this.pool._release(user);
    this.#lastUsersChange = performance.now();
  }
  /**
   * Returns true if resource can have additional users allocated
   */
  get hasUserCapacity() {
    return this.usersCount < this.#capacityPerResource;
  }
  /**
   * Returns number of uses of the resource
   */
  get usersCount() {
    return this.#users.length;
  }
  /**
   * Returns true if automatic expiry is enabled, and that interval
   * has elapsed since the users list has changed for this resource
   */
  get isExpiredFromUsers() {
    if (this.#resourcesWithoutUserExpireAfterMs <= 0) return false;
    if (this.#users.length > 0) return false;
    return performance.now() > this.#resourcesWithoutUserExpireAfterMs + this.#lastUsersChange;
  }
  /**
   * Returns true if instance is disposed
   */
  get isDisposed() {
    return this.#state === `disposed`;
  }
  /**
   * Disposes the resource.
   * If it is already disposed, it does nothing.
   * @param reason
   * @returns
   */
  dispose(reason) {
    if (this.#state === `disposed`) return;
    const data = this.#data;
    this.#state = `disposed`;
    this.pool.log.log(`Resource disposed (${reason})`);
    for (const u of this.#users) {
      u._dispose(`resource-${reason}`, data);
    }
    this.#users = [];
    this.#lastUsersChange = performance.now();
    this.pool._releaseResource(this, reason);
    if (this.pool.freeResource) this.pool.freeResource(data);
  }
};
var Pool = class {
  _resources;
  _users;
  capacity;
  userExpireAfterMs;
  resourcesWithoutUserExpireAfterMs;
  capacityPerResource;
  fullPolicy;
  generateResource;
  freeResource;
  log;
  /**
   * Constructor.
   *
   * By default, no capacity limit, one user per resource
   * @param opts Pool options
   */
  constructor(opts = {}) {
    this.capacity = opts.capacity ?? -1;
    this.fullPolicy = opts.fullPolicy ?? `error`;
    this.capacityPerResource = opts.capacityPerResource ?? 1;
    this.userExpireAfterMs = opts.userExpireAfterMs ?? -1;
    this.resourcesWithoutUserExpireAfterMs = opts.resourcesWithoutUserExpireAfterMs ?? -1;
    this.generateResource = opts.generate;
    this.freeResource = opts.free;
    this._users = /* @__PURE__ */ new Map();
    this._resources = [];
    this.log = logSet(`Pool`, opts.debug ?? false);
    const timer = Math.max(
      this.userExpireAfterMs,
      this.resourcesWithoutUserExpireAfterMs
    );
    if (timer > 0) {
      setInterval(() => {
        this.maintain();
      }, timer * 1.1);
    }
  }
  /**
   * Returns a debug string of Pool state
   * @returns
   */
  dumpToString() {
    let r = `Pool
    capacity: ${this.capacity} userExpireAfterMs: ${this.userExpireAfterMs} capacityPerResource: ${this.capacityPerResource}
    resources count: ${this._resources.length}`;
    const resource = this._resources.map((r2) => r2.toString()).join(`\r
	`);
    r += `\r
Resources:\r
	` + resource;
    r += `\r
Users: \r
`;
    for (const [k, v] of this._users.entries()) {
      r += `	k: ${k} v: ${v.toString()}\r
`;
    }
    return r;
  }
  /**
   * Sorts users by longest elapsed time since update
   * @returns
   */
  getUsersByLongestElapsed() {
    return [...this._users.values()].sort((a, b) => {
      const aa = a.elapsed;
      const bb = b.elapsed;
      if (aa === bb) return 0;
      if (aa < bb) return 1;
      return -1;
    });
  }
  /**
   * Returns resources sorted with least used first
   * @returns
   */
  getResourcesSortedByUse() {
    return [...this._resources].sort((a, b) => {
      if (a.usersCount === b.usersCount) return 0;
      if (a.usersCount < b.usersCount) return -1;
      return 1;
    });
  }
  /**
   * Adds a resource to the pool.
   * Throws an error if the capacity limit is reached.
   * @param resource
   * @returns
   */
  addResource(resource) {
    if (resource === void 0) {
      throw new Error(`Cannot add undefined resource`);
    }
    if (resource === null) throw new Error(`Cannot add null resource`);
    if (this.capacity > 0 && this._resources.length === this.capacity) {
      throw new Error(
        `Capacity limit (${this.capacity}) reached. Cannot add more.`
      );
    }
    this.log.log(`Adding resource: ${JSON.stringify(resource)}`);
    const pi = new Resource(this, resource);
    this._resources.push(pi);
    return pi;
  }
  /**
   * Performs maintenance, removing disposed/expired resources & users.
   * This is called automatically when using a resource.
   */
  maintain() {
    let changed = false;
    const nuke = [];
    for (const p of this._resources) {
      if (p.isDisposed) {
        this.log.log(`Maintain, disposed resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      } else if (p.isExpiredFromUsers) {
        this.log.log(`Maintain, expired resource: ${JSON.stringify(p.data)}`);
        nuke.push(p);
      }
    }
    if (nuke.length > 0) {
      for (const resource of nuke) {
        resource.dispose(`diposed/expired`);
      }
      changed = true;
    }
    const userKeysToRemove = [];
    for (const [key, user] of this._users.entries()) {
      if (!user.isValid) {
        this.log.log(
          `Maintain. Invalid user: ${user.key} (Disposed: ${user.isDisposed} Expired: ${user.isExpired} Resource disposed: ${user.resource.isDisposed})`
        );
        userKeysToRemove.push(key);
        user._dispose(`invalid`, user.data);
      }
    }
    for (const userKey of userKeysToRemove) {
      this._users.delete(userKey);
      changed = true;
    }
    if (changed) {
      this.log.log(
        `End: resource len: ${this._resources.length} users: ${this.usersLength}`
      );
    }
  }
  /**
   * Iterate over resources in the pool.
   * To iterate over the data associated with each resource, use
   * `values`.
   */
  *resources() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r;
    }
  }
  /**
   * Iterate over resource values in the pool.
   * to iterate over the resources, use `resources`.
   *
   * Note that values may be returned even though there is no
   * active user.
   */
  *values() {
    const resource = [...this._resources];
    for (const r of resource) {
      yield r.data;
    }
  }
  /**
   * Unassociate a key with a pool item
   * @param userKey
   */
  release(userKey, reason) {
    const pi = this._users.get(userKey);
    if (!pi) return;
    pi.release(reason ?? `Pool.release`);
  }
  /**
   * @internal
   * @param user
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _release(user) {
    this._users.delete(user.key);
  }
  /**
   * @internal
   * @param resource
   * @param _
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _releaseResource(resource, _) {
    this._resources = this._resources.filter((v) => v !== resource);
  }
  /**
   * Returns true if `v` has an associted resource in the pool
   * @param resource
   * @returns
   */
  hasResource(resource) {
    const found = this._resources.find((v) => v.data === resource);
    return found !== void 0;
  }
  /**
   * Returns true if a given `userKey` is in use.
   * @param userKey
   * @returns
   */
  hasUser(userKey) {
    return this._users.has(userKey);
  }
  /**
   * @internal
   * @param key
   * @param resource
   * @returns
   */
  //eslint-disable-next-line functional/prefer-immutable-types
  _assign(key, resource) {
    const u = new PoolUser(key, resource);
    this._users.set(key, u);
    resource._assign(u);
    return u;
  }
  /**
   * @internal
   * @param userKey
   * @returns
   */
  _findUser(userKey) {
    const sorted = this.getResourcesSortedByUse();
    if (sorted.length > 0 && sorted[0].hasUserCapacity) {
      const u = this._assign(userKey, sorted[0]);
      return u;
    }
    if (this.generateResource && (this.capacity < 0 || this._resources.length < this.capacity)) {
      this.log.log(
        `capacity: ${this.capacity} resources: ${this._resources.length}`
      );
      const resourceGenerated = this.addResource(this.generateResource());
      const u = this._assign(userKey, resourceGenerated);
      return u;
    }
  }
  /**
   * Return the number of users
   */
  get usersLength() {
    return [...this._users.values()].length;
  }
  /**
   * 'Uses' a resource, returning the value
   * @param userKey
   * @returns
   */
  useValue(userKey) {
    const resource = this.use(userKey);
    return resource.resource.data;
  }
  /**
   * Gets a pool item based on a user key.
   * The same key should return the same pool item,
   * for as long as it still exists.
   * @param userKey
   * @returns
   */
  use(userKey) {
    const pi = this._users.get(userKey);
    if (pi) {
      pi.keepAlive();
      return pi;
    }
    this.maintain();
    const match = this._findUser(userKey);
    if (match) return match;
    if (this.fullPolicy === `error`) {
      throw new Error(
        `Pool is fully used (fullPolicy: ${this.fullPolicy}, capacity: ${this.capacity})`
      );
    }
    if (this.fullPolicy === `evictOldestUser`) {
      const users = this.getUsersByLongestElapsed();
      if (users.length > 0) {
        this.release(users[0].key, `evictedOldestUser`);
        const match2 = this._findUser(userKey);
        if (match2) return match2;
      }
    }
    throw new Error(`Pool is fully used (${this.fullPolicy})`);
  }
};
var create = (opts = {}) => new Pool(opts);

// src/data/Proportion.ts
var proportion = (v, t) => {
  if (typeof v === `function`) v = v();
  if (typeof t === `function`) t = t();
  throwNumberTest(v, `percentage`, `v`);
  throwNumberTest(t, `percentage`, `t`);
  return v * t;
};

// src/data/ResolveFields.ts
async function resolveValue(valueOrFunction) {
  if (typeof valueOrFunction === `object` && `next` in valueOrFunction) {
    const v = await valueOrFunction.next();
    return v.value;
  }
  if (typeof valueOrFunction === `function`) {
    const v = await valueOrFunction();
    return v;
  }
  return valueOrFunction;
}
async function fieldResolve(object2) {
  const output = [];
  for (const entry of Object.entries(object2)) {
    const key = entry[0];
    const valueOrFunction = entry[1];
    const value = await resolveValue(valueOrFunction);
    output.push([key, value]);
  }
  return Object.fromEntries(output);
}
function fieldResolver(object2) {
  return () => fieldResolve(object2);
}
function reactiveUpdate(schema, updaters) {
  const current = sources_exports.object(schema);
  let fetch = async () => {
    return current.last();
  };
  let replaceSource = (field2, source, disposeOld) => {
  };
  const applyNewData = (data) => {
    return current.update(data);
  };
  if (updaters !== void 0) {
    const rx = pull(updaters);
    fetch = async () => {
      const data = await rx.compute();
      return applyNewData(data);
    };
    replaceSource = rx.replaceSource;
  }
  return { ...current, pull: fetch, replaceSource };
}
function pull(value) {
  const sources = {};
  const fixedValues = {};
  const callers = {};
  const setSource = (field2, source) => {
    if (Array.isArray(source) || isPrimitive(source)) {
      fixedValues[field2] = source;
    } else if (typeof source === `function`) {
      callers[field2] = source;
    } else {
      try {
        const s = resolveSource(source);
        latestToObjectRx.replaceSource(field2, s);
      } catch {
        fixedValues[field2] = source;
      }
    }
  };
  const removeSource = (field2, disposeOld) => {
    if (field2 in sources) {
      const s = sources[field2];
      delete sources[field2];
      if (disposeOld) s.dispose(`ResolveFields.pull.removeSource`);
      return s;
    } else if (field2 in fixedValues) {
      const s = fixedValues[field2];
      delete fixedValues[field2];
      return s;
    } else if (field2 in callers) {
      const s = callers[field2];
      delete callers[field2];
      return s;
    } else throw new Error(`Field '${field2}' not found`);
  };
  for (const [key, v] of Object.entries(value)) {
    setSource(key, v);
  }
  const latestToObjectRx = combineLatestToObject(sources, { onSourceDone: `allow` });
  let lastRxValue;
  const latestToObjectOff = latestToObjectRx.onValue((v) => {
    lastRxValue = v;
  });
  const computeCallers = async () => {
    const r = {};
    for (const [key, value2] of Object.entries(callers)) {
      r[key] = await value2();
    }
    return r;
  };
  let lastComputed = mapObjectShallow(value, (args) => {
    return void 0;
  });
  const compute = async () => {
    lastComputed = { ...fixedValues, ...lastRxValue, ...await computeCallers() };
    return lastComputed;
  };
  const dispose = () => {
    latestToObjectOff();
    latestToObjectRx.dispose(`ResolveFields.dispose`);
  };
  return {
    last: () => lastComputed,
    compute,
    dispose,
    /**
     * Replaces a source, returning previous. This is useful if a source needs to be disposed.
     * Throws an error if 'field' does not exist.
     * @param field 
     * @param source 
     * @returns 
     */
    replaceSource: (field2, source, disposeOld) => {
      const existing = removeSource(field2, disposeOld);
      setSource(field2, source);
      return existing;
    }
  };
}

// src/data/Softmax.ts
var softmax = (logits) => {
  const maxLogit = logits.reduce((a, b) => Math.max(a, b), Number.NEGATIVE_INFINITY);
  const scores = logits.map((l) => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map((s) => s / denom);
};

// src/data/TrackUnique.ts
var trackUnique = (toString = toStringDefault) => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null) throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
    const asString = typeof value === `string` ? value : toString(value);
    if (set.has(asString)) return false;
    set.add(asString);
    return true;
  };
};
var trackUniqueInstances = () => {
  const set = /* @__PURE__ */ new Set();
  return (value) => {
    if (value === null) throw new TypeError(`Param 'value' cannot be null`);
    if (value === void 0) throw new TypeError(`Param 'value' cannot be undefined`);
    if (set.has(value)) return false;
    set.add(value);
    return true;
  };
};

// src/data/graphs/index.ts
var graphs_exports = {};
__export(graphs_exports, {
  Directed: () => DirectedGraph_exports,
  Undirected: () => UndirectedGraph_exports
});

// src/data/graphs/UndirectedGraph.ts
var UndirectedGraph_exports = {};
__export(UndirectedGraph_exports, {
  adjacentVertices: () => adjacentVertices2,
  connect: () => connect2,
  connectTo: () => connectTo2,
  createVertex: () => createVertex2,
  dumpGraph: () => dumpGraph2,
  edgesForVertex: () => edgesForVertex,
  getConnection: () => getConnection,
  getOrCreate: () => getOrCreate2,
  graph: () => graph2,
  hasConnection: () => hasConnection,
  toAdjacencyMatrix: () => toAdjacencyMatrix2,
  updateGraphVertex: () => updateGraphVertex2
});
var createVertex2 = (id) => {
  return {
    id
  };
};
var updateGraphVertex2 = (graph3, vertex) => {
  const gr = {
    ...graph3,
    vertices: graph3.vertices.set(vertex.id, vertex)
  };
  return gr;
};
var getOrCreate2 = (graph3, id) => {
  const v = graph3.vertices.get(id);
  if (v !== void 0) return { graph: graph3, vertex: v };
  const vv = createVertex2(id);
  const gg = updateGraphVertex2(graph3, vv);
  return { graph: gg, vertex: vv };
};
function resolveVertex2(graph3, idOrVertex) {
  const v = typeof idOrVertex === `string` ? graph3.vertices.get(idOrVertex) : idOrVertex;
  if (v === void 0) throw new Error(`Id not found ${idOrVertex}`);
  return v;
}
var hasConnection = (graph3, a, b) => {
  const edge = getConnection(graph3, a, b);
  return edge !== void 0;
};
var getConnection = (graph3, a, b) => {
  const aa = resolveVertex2(graph3, a);
  const bb = resolveVertex2(graph3, b);
  for (const edge of graph3.edges) {
    if (edge.a == aa.id && edge.b === bb.id) return edge;
    if (edge.a == bb.id && edge.b === aa.id) return edge;
  }
  return;
};
function connectTo2(graph3, a, b, weight) {
  const aResult = getOrCreate2(graph3, a);
  graph3 = aResult.graph;
  const bResult = getOrCreate2(graph3, b);
  graph3 = bResult.graph;
  let edge = getConnection(graph3, a, b);
  if (edge !== void 0) return { graph: graph3, edge };
  edge = {
    a,
    b,
    weight
  };
  const graphChanged = {
    ...graph3,
    edges: [...graph3.edges, edge]
  };
  return { graph: graphChanged, edge };
}
function connect2(graph3, options) {
  const { a, weight, b } = options;
  const destinations = Array.isArray(b) ? b : [b];
  for (const destination of destinations) {
    const result = connectTo2(graph3, a, destination, weight);
    graph3 = result.graph;
  }
  return graph3;
}
var graph2 = (...initialConnections) => {
  let g = {
    vertices: immutable$2(),
    edges: []
  };
  for (const ic of initialConnections) {
    g = connect2(g, ic);
  }
  return g;
};
function toAdjacencyMatrix2(graph3) {
  const v = [...graph3.vertices.values()];
  const table = new Table();
  table.labelColumns(...v.map((vv) => vv.id));
  table.labelRows(...v.map((vv) => vv.id));
  for (let i = 0; i < v.length; i++) {
    table.setRow(i, v.length, false);
    const ii = v[i];
    for (const [j, jj] of v.entries()) {
      const connected = hasConnection(graph3, ii, jj);
      if (connected) {
        table.set(i, j, true);
      }
    }
  }
  return table;
}
var dumpGraph2 = (graph3) => {
  const lines = debugGraphToArray2(graph3);
  return lines.join(`
`);
};
var debugGraphToArray2 = (graph3) => {
  const r = [];
  r.push(`Vertices: ${[...graph3.vertices.values()].map((v) => v.id).join(`, `)}`);
  r.push(`Edges:`);
  for (const edge of graph3.edges) {
    r.push(stringForEdge(edge));
  }
  return r;
};
var stringForEdge = (edge) => {
  const weight = edge.weight ? ` (${edge.weight})` : ``;
  return `${edge.a} <-> ${edge.b}${weight}`;
};
function* adjacentVertices2(graph3, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context) yield resolveVertex2(graph3, edge.b);
    else if (edge.b === context) yield resolveVertex2(graph3, edge.a);
  }
}
function* edgesForVertex(graph3, context) {
  if (context === void 0) return;
  const vertex = typeof context === `string` ? graph3.vertices.get(context) : context;
  if (vertex === void 0) throw new Error(`Vertex not found ${JSON.stringify(context)}`);
  for (const edge of graph3.edges) {
    if (edge.a === context) yield edge;
    else if (edge.b === context) yield edge;
  }
}

// src/data/index.ts
var piPi$1 = Math.PI * 2;

// src/visual/index.ts
var visual_exports = {};
__export(visual_exports, {
  BipolarView: () => BipolarView_exports,
  Colour: () => Colour_exports,
  Drawing: () => Drawing_exports,
  ImageDataGrid: () => ImageDataGrid_exports,
  Palette: () => Palette_exports,
  Plot2: () => Plot2_exports,
  PlotOld: () => PlotOld_exports,
  SceneGraph: () => SceneGraph_exports,
  Svg: () => Svg_exports,
  Video: () => Video_exports,
  scaleCanvas: () => scaleCanvas
});

// src/visual/Drawing.ts
var Drawing_exports = {};
__export(Drawing_exports, {
  arc: () => arc,
  bezier: () => bezier,
  circle: () => circle,
  connectedPoints: () => connectedPoints,
  copyToImg: () => copyToImg,
  dot: () => dot,
  drawingStack: () => drawingStack,
  ellipse: () => ellipse,
  getContext: () => getContext,
  line: () => line,
  lineThroughPoints: () => lineThroughPoints,
  makeHelper: () => makeHelper,
  paths: () => paths,
  pointLabels: () => pointLabels,
  rect: () => rect,
  textBlock: () => textBlock,
  textBlockAligned: () => textBlockAligned,
  textHeight: () => textHeight,
  textRect: () => textRect,
  textWidth: () => textWidth,
  translatePoint: () => translatePoint,
  triangle: () => triangle$1
});
var PIPI = Math.PI * 2;
var getContext = (canvasElementContextOrQuery) => {
  if (canvasElementContextOrQuery === null) {
    throw new Error(
      `canvasElCtxOrQuery null. Must be a 2d drawing context or Canvas element`
    );
  }
  if (canvasElementContextOrQuery === void 0) {
    throw new Error(
      `canvasElCtxOrQuery undefined. Must be a 2d drawing context or Canvas element`
    );
  }
  const ctx = canvasElementContextOrQuery instanceof CanvasRenderingContext2D ? canvasElementContextOrQuery : canvasElementContextOrQuery instanceof HTMLCanvasElement ? canvasElementContextOrQuery.getContext(`2d`) : typeof canvasElementContextOrQuery === `string` ? resolveEl(canvasElementContextOrQuery).getContext(`2d`) : canvasElementContextOrQuery;
  if (ctx === null) throw new Error(`Could not create 2d context for canvas`);
  return ctx;
};
var makeHelper = (ctxOrCanvasEl, canvasBounds) => {
  const ctx = getContext(ctxOrCanvasEl);
  return {
    ctx,
    paths(pathsToDraw, opts) {
      paths(ctx, pathsToDraw, opts);
    },
    line(lineToDraw, opts) {
      line(ctx, lineToDraw, opts);
    },
    rect(rectsToDraw, opts) {
      rect(ctx, rectsToDraw, opts);
    },
    bezier(bezierToDraw, opts) {
      bezier(ctx, bezierToDraw, opts);
    },
    connectedPoints(pointsToDraw, opts) {
      connectedPoints(ctx, pointsToDraw, opts);
    },
    pointLabels(pointsToDraw, opts) {
      pointLabels(ctx, pointsToDraw, opts);
    },
    dot(dotPosition, opts) {
      dot(ctx, dotPosition, opts);
    },
    circle(circlesToDraw, opts) {
      circle(ctx, circlesToDraw, opts);
    },
    arc(arcsToDraw, opts) {
      arc(ctx, arcsToDraw, opts);
    },
    textBlock(lines, opts) {
      if (opts.bounds === void 0 && canvasBounds !== void 0) {
        opts = { ...opts, bounds: { ...canvasBounds, x: 0, y: 0 } };
      }
      textBlock(ctx, lines, opts);
    }
  };
};
var optsOp = (opts) => coloringOp(opts.strokeStyle, opts.fillStyle);
var applyOpts = (ctx, opts = {}, ...additionalOps) => {
  if (ctx === void 0) throw new Error(`ctx undefined`);
  const stack = drawingStack(ctx).push(optsOp(opts), ...additionalOps);
  stack.apply();
  return stack;
};
var arc = (ctx, arcs, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (arc2) => {
    ctx.beginPath();
    ctx.arc(arc2.x, arc2.y, arc2.radius, arc2.startRadian, arc2.endRadian);
    ctx.stroke();
  };
  const arcsArray = Array.isArray(arcs) ? arcs : [arcs];
  for (const arc2 of arcsArray) {
    draw2(arc2);
  }
};
var coloringOp = (strokeStyle, fillStyle) => {
  const apply = (ctx) => {
    if (fillStyle) ctx.fillStyle = fillStyle;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
  };
  return apply;
};
var lineOp = (lineWidth, lineJoin, lineCap) => {
  const apply = (ctx) => {
    if (lineWidth) ctx.lineWidth = lineWidth;
    if (lineJoin) ctx.lineJoin = lineJoin;
    if (lineCap) ctx.lineCap = lineCap;
  };
  return apply;
};
var drawingStack = (ctx, stk) => {
  if (stk === void 0) stk = new StackImmutable();
  const push = (...ops) => {
    if (stk === void 0) stk = new StackImmutable();
    const s = stk.push(...ops);
    for (const o of ops) o(ctx);
    return drawingStack(ctx, s);
  };
  const pop = () => {
    const s = stk?.pop();
    return drawingStack(ctx, s);
  };
  const apply = () => {
    if (stk === void 0) return drawingStack(ctx);
    for (const op of stk.data) op(ctx);
    return drawingStack(ctx, stk);
  };
  return { push, pop, apply };
};
var lineThroughPoints = (ctx, points, opts) => {
  applyOpts(ctx, opts);
  ctx.moveTo(points[0].x, points[0].y);
  for (const [index, p] of points.entries()) {
    if (index + 2 >= points.length) continue;
    const pNext = points[index + 1];
    const mid = {
      x: (p.x + pNext.x) / 2,
      y: (p.y + pNext.y) / 2
    };
    const cpX1 = (mid.x + p.x) / 2;
    const cpX2 = (mid.x + pNext.x) / 2;
    ctx.quadraticCurveTo(cpX1, pNext.y, mid.x, mid.y);
    ctx.quadraticCurveTo(cpX2, pNext.y, pNext.x, pNext.y);
  }
};
var circle = (ctx, circlesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, PIPI);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  if (Array.isArray(circlesToDraw)) {
    for (const c of circlesToDraw) draw2(c);
  } else {
    draw2(circlesToDraw);
  }
};
var ellipse = (ctx, ellipsesToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (ellipse2) => {
    ctx.beginPath();
    const rotation = ellipse2.rotation ?? 0;
    const startAngle = ellipse2.startAngle ?? 0;
    const endAngle = ellipse2.endAngle ?? PIPI;
    ctx.ellipse(ellipse2.x, ellipse2.y, ellipse2.radiusX, ellipse2.radiusY, rotation, startAngle, endAngle);
    if (opts.strokeStyle) ctx.stroke();
    if (opts.fillStyle) ctx.fill();
  };
  const ellipsesArray = Array.isArray(ellipsesToDraw) ? ellipsesToDraw : [ellipsesToDraw];
  for (const ellipse2 of ellipsesArray) {
    draw2(ellipse2);
  }
};
var paths = (ctx, pathsToDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (path) => {
    if (isQuadraticBezier(path)) quadraticBezier(ctx, path, opts);
    else if (isLine(path)) line(ctx, path, opts);
    else throw new Error(`Unknown path type ${JSON.stringify(path)}`);
  };
  if (Array.isArray(pathsToDraw)) {
    for (const p of pathsToDraw) draw2(p);
  } else {
    draw2(pathsToDraw);
  }
};
var connectedPoints = (ctx, pts, opts = {}) => {
  const shouldLoop = opts.loop ?? false;
  throwArrayTest(pts);
  if (pts.length === 0) return;
  for (const [index, pt] of pts.entries()) guard$1(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  if (opts.lineWidth) ctx.lineWidth = opts.lineWidth;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (const pt of pts) ctx.lineTo(pt.x, pt.y);
  if (shouldLoop) ctx.lineTo(pts[0].x, pts[0].y);
  if (opts.strokeStyle || opts.strokeStyle === void 0 && opts.fillStyle === void 0) {
    ctx.stroke();
  }
  if (opts.fillStyle) {
    ctx.fill();
  }
};
var pointLabels = (ctx, pts, opts = {}, labels) => {
  if (pts.length === 0) return;
  for (const [index, pt] of pts.entries()) guard$1(pt, `Index ${index}`);
  applyOpts(ctx, opts);
  for (const [index, pt] of pts.entries()) {
    const label = labels !== void 0 && index < labels.length ? labels[index] : index.toString();
    ctx.fillText(label.toString(), pt.x, pt.y);
  }
};
var translatePoint = (ctx, point) => {
  const m = ctx.getTransform();
  return {
    x: point.x * m.a + point.y * m.c + m.e,
    y: point.x * m.b + point.y * m.d + m.f
  };
};
var copyToImg = (canvasEl) => {
  const img = document.createElement(`img`);
  img.src = canvasEl.toDataURL(`image/jpeg`);
  return img;
};
var dot = (ctx, pos, opts) => {
  if (opts === void 0) opts = {};
  const radius = opts.radius ?? 10;
  applyOpts(ctx, opts);
  const makePath = () => {
    ctx.beginPath();
    if (Array.isArray(pos)) {
      for (const p of pos) {
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      }
    } else {
      const p = pos;
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    }
  };
  makePath();
  if (opts.filled || !opts.stroke) {
    ctx.fill();
  }
  if (opts.stroke) {
    if (opts.strokeWidth) ctx.lineWidth = opts.strokeWidth;
    ctx.stroke();
  }
};
var bezier = (ctx, bezierToDraw, opts) => {
  if (isQuadraticBezier(bezierToDraw)) {
    quadraticBezier(ctx, bezierToDraw, opts);
  } else if (isCubicBezier(bezierToDraw)) {
    cubicBezier(ctx, bezierToDraw, opts);
  }
};
var cubicBezier = (ctx, bezierToDraw, opts = {}) => {
  let stack = applyOpts(ctx, opts);
  const { a, b, cubic1, cubic2 } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.bezierCurveTo(cubic1.x, cubic1.y, cubic2.x, cubic2.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    stack.apply();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(cubic1.x, cubic1.y);
    ctx.stroke();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(cubic2.x, cubic2.y);
    ctx.stroke();
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`c1`, cubic1.x + 5, cubic1.y);
    ctx.fillText(`c2`, cubic2.x + 5, cubic2.y);
    dot(ctx, cubic1, { radius: 3 });
    dot(ctx, cubic2, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var quadraticBezier = (ctx, bezierToDraw, opts = {}) => {
  const { a, b, quadratic } = bezierToDraw;
  const isDebug = opts.debug ?? false;
  let stack = applyOpts(ctx, opts);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.quadraticCurveTo(quadratic.x, quadratic.y, b.x, b.y);
  ctx.stroke();
  if (isDebug) {
    stack = stack.push(
      optsOp({
        ...opts,
        strokeStyle: opacity(opts.strokeStyle ?? `silver`, 0.6),
        fillStyle: opacity(opts.fillStyle ?? `yellow`, 0.4)
      })
    );
    connectedPoints(ctx, [a, quadratic, b]);
    ctx.fillText(`a`, a.x + 5, a.y);
    ctx.fillText(`b`, b.x + 5, b.y);
    ctx.fillText(`h`, quadratic.x + 5, quadratic.y);
    dot(ctx, quadratic, { radius: 3 });
    dot(ctx, a, { radius: 3 });
    dot(ctx, b, { radius: 3 });
    stack = stack.pop();
    stack.apply();
  }
};
var line = (ctx, toDraw, opts = {}) => {
  const isDebug = opts.debug ?? false;
  const o = lineOp(opts.lineWidth, opts.lineJoin, opts.lineCap);
  applyOpts(ctx, opts, o);
  const draw2 = (d) => {
    const { a, b } = d;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    if (isDebug) {
      ctx.fillText(`a`, a.x, a.y);
      ctx.fillText(`b`, b.x, b.y);
      dot(ctx, a, { radius: 5, strokeStyle: `black` });
      dot(ctx, b, { radius: 5, strokeStyle: `black` });
    }
    ctx.stroke();
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) draw2(t);
  } else {
    draw2(toDraw);
  }
};
var triangle$1 = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const draw2 = (t) => {
    connectedPoints(ctx, corners2(t), { ...opts, loop: true });
    if (opts.debug) {
      pointLabels(ctx, corners2(t), void 0, [`a`, `b`, `c`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var rect = (ctx, toDraw, opts = {}) => {
  applyOpts(ctx, opts);
  const filled = opts.filled ?? (opts.fillStyle === void 0 ? false : true);
  const stroked = opts.stroked ?? (opts.strokeStyle === void 0 ? false : true);
  const draw2 = (d) => {
    const x = `x` in d ? d.x : 0;
    const y = `y` in d ? d.y : 0;
    if (filled) ctx.fillRect(x, y, d.width, d.height);
    if (stroked ?? true) ctx.strokeRect(x, y, d.width, d.height);
    if (opts.debug) {
      pointLabels(ctx, corners(d), void 0, [`NW`, `NE`, `SE`, `SW`]);
    }
  };
  if (Array.isArray(toDraw)) {
    for (const t of toDraw) {
      draw2(t);
    }
  } else {
    draw2(toDraw);
  }
};
var textWidth = (ctx, text, padding = 0, widthMultiple) => {
  const rect2 = textRect(ctx, text, padding, widthMultiple);
  return rect2.width;
};
var textRect = (ctx, text, padding = 0, widthMultiple) => {
  if (text === void 0 || text === null || text.length === 0) return empty;
  const m = ctx.measureText(text);
  const width = widthMultiple ? roundUpToMultiple(m.width, widthMultiple) + padding : m.width + padding;
  return {
    width,
    height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding + padding
  };
};
var textHeight = (ctx, text, padding = 0) => {
  const rect2 = textRect(ctx, text, padding);
  return rect2.height;
};
var textBlock = (ctx, lines, opts) => {
  applyOpts(ctx, opts);
  const anchorPadding = opts.anchorPadding ?? 0;
  const anchor = opts.anchor;
  const bounds = opts.bounds ?? { x: 0, y: 0, width: 1e6, height: 1e6 };
  const blocks = lines.map((l) => ctx.measureText(l));
  const widths = blocks.map((tm) => tm.width);
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const maxWidth = Math.max(...widths);
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let { x, y } = anchor;
  if (anchor.x + maxWidth > bounds.width) {
    x = bounds.width - (maxWidth + anchorPadding);
  } else x -= anchorPadding;
  if (x < bounds.x) x = bounds.x + anchorPadding;
  if (anchor.y + totalHeight > bounds.height) {
    y = bounds.height - (totalHeight + anchorPadding);
  } else y -= anchorPadding;
  if (y < bounds.y) y = bounds.y + anchorPadding;
  for (const [index, line2] of lines.entries()) {
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
};
var textBlockAligned = (ctx, text, opts) => {
  const { bounds } = opts;
  const { horiz = `left`, vert = `top` } = opts;
  const lines = typeof text === `string` ? [text] : text;
  applyOpts(ctx, opts);
  ctx.save();
  ctx.translate(bounds.x, bounds.y);
  ctx.textAlign = `left`;
  ctx.textBaseline = `top`;
  const middleX = bounds.width / 2;
  const middleY = bounds.height / 2;
  const blocks = lines.map((l) => ctx.measureText(l));
  const heights = blocks.map(
    (tm) => tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
  );
  const totalHeight = heights.reduce((accumulator, value) => accumulator + value, 0);
  let y = 0;
  if (vert === `center`) y = middleY - totalHeight / 2;
  else if (vert === `bottom`) {
    y = bounds.height - totalHeight;
  }
  for (const [index, line2] of lines.entries()) {
    let x = 0;
    if (horiz === `center`) x = middleX - blocks[index].width / 2;
    else if (horiz === `right`) x = bounds.width - blocks[index].width;
    ctx.fillText(line2, x, y);
    y += heights[index];
  }
  ctx.restore();
};

// src/visual/Plot2.ts
var Plot2_exports = {};
__export(Plot2_exports, {
  AxisX: () => AxisX,
  AxisY: () => AxisY,
  Legend: () => Legend,
  Plot: () => Plot,
  PlotArea: () => PlotArea,
  Series: () => Series
});

// src/visual/SceneGraph.ts
var SceneGraph_exports = {};
__export(SceneGraph_exports, {
  Box: () => Box,
  CanvasBox: () => CanvasBox,
  CanvasLayoutState: () => CanvasLayoutState,
  CanvasMeasureState: () => CanvasMeasureState,
  LayoutState: () => LayoutState,
  MeasureState: () => MeasureState,
  boxRectFromPx: () => boxRectFromPx,
  boxRectFromRectPx: () => boxRectFromRectPx,
  boxUnitFromPx: () => boxUnitFromPx
});

// src/geometry/rect/Clamp.ts
var clamp3 = (value, maximum) => {
  return Object.freeze({
    ...value,
    width: Math.min(value.width, maximum.width),
    height: Math.min(value.height, maximum.height)
  });
};

// src/visual/SceneGraph.ts
var boxUnitFromPx = (v) => {
  return { type: `px`, value: v };
};
var boxRectFromPx = (x, y, width, height) => {
  return {
    x: boxUnitFromPx(x),
    y: boxUnitFromPx(y),
    width: boxUnitFromPx(width),
    height: boxUnitFromPx(height)
  };
};
var boxRectFromRectPx = (r) => {
  return {
    x: boxUnitFromPx(r.x),
    y: boxUnitFromPx(r.y),
    width: boxUnitFromPx(r.width),
    height: boxUnitFromPx(r.height)
  };
};
var unitIsEqual = (a, b) => {
  if (a.type === `px` && b.type === `px`) {
    return a.value === b.value;
  }
  return false;
};
var boxRectIsEqual = (a, b) => {
  if (a === void 0 && b === void 0) return true;
  if (a === void 0) return false;
  if (b === void 0) return false;
  if (a.x && b.x && !unitIsEqual(a.x, b.x)) return false;
  if (a.y && b.y && !unitIsEqual(a.y, b.y)) return false;
  if (a.width && b.width && !unitIsEqual(a.width, b.width)) return false;
  if (a.height && b.height && !unitIsEqual(a.height, b.height)) return false;
  return true;
};
var BaseState = class {
  bounds;
  pass;
  constructor(bounds) {
    this.bounds = bounds;
    this.pass = 0;
  }
  resolveToPx(u, maxValue, defaultValue) {
    if (u === void 0 && defaultValue !== void 0) return defaultValue;
    if (u === void 0) return;
    if (u.type === void 0) throw new TypeError(`Expected 'type' and 'value' fields. Type is missing`);
    if (u.value === void 0) throw new TypeError(`Expected 'type' and 'value' fields. Value is missing`);
    if (u.type === `px`) return u.value;
    if (u.type === `pc`) return u.value * maxValue;
    throw new Error(`Unknown unit type: ${u.type}`);
  }
  resolveBox(box) {
    if (box === void 0) return void 0;
    const x = this.resolveToPx(box.x, this.bounds.width);
    const y = this.resolveToPx(box.y, this.bounds.height);
    const width = this.resolveToPx(box.width, this.bounds.width);
    const height = this.resolveToPx(box.height, this.bounds.height);
    if (!width || !height) throw new TypeError(`Expected width and height`);
    if (x === void 0 && y === void 0) {
      return Object.freeze({ width, height });
    } else {
      if (!x || !y) throw new TypeError(`Expected x and y`);
      return Object.freeze({
        x,
        y,
        width,
        height
      });
    }
  }
};
var MeasureState = class extends BaseState {
  measurements;
  constructor(bounds) {
    super(bounds);
    this.measurements = /* @__PURE__ */ new Map();
  }
  getActualSize(id) {
    const s = this.measurements.get(id);
    if (s === void 0) return;
    if (isPlaceholder2(s.actual)) return;
    return s.actual;
  }
  whatIsMeasured() {
    return [...this.measurements.keys()];
  }
};
var LayoutState = class extends BaseState {
  layouts;
  constructor(bounds) {
    super(bounds);
    this.layouts = /* @__PURE__ */ new Map();
  }
};
var Box = class {
  /** Rectangle Box occupies in canvas/etc */
  canvasRegion = placeholderPositioned;
  _desiredRect;
  _measuredSize;
  _layoutPosition;
  children = [];
  _parent;
  _idMap = /* @__PURE__ */ new Map();
  debugLayout = false;
  _visible = true;
  _ready = true;
  takesSpaceWhenInvisible = false;
  _needsMeasuring = true;
  _needsLayoutX = true;
  _needsDrawing = true;
  debugHue = randomHue();
  id;
  /**
   * Constructor.
   * 
   * If `parent` is provided, `parent.onChildAdded(this)` is called.
   * @param parent parent box 
   * @param id id of this box
   */
  constructor(parent, id) {
    this.id = id;
    this._parent = parent;
    parent?.onChildAdded(this);
  }
  /**
   * Returns _true_ if `box` is a child
   * @param box 
   * @returns 
   */
  hasChild(box) {
    const byReference = this.children.find((c) => c === box);
    const byId2 = this.children.find((c) => c.id === box.id);
    return byReference !== void 0 || byId2 !== void 0;
  }
  /**
   * Sends a message to all child boxes.
   * 
   * This first calls `onNotify` on this instance,
   * before calling `notify()` on each child.
   * @param message 
   * @param source 
   */
  notify(message, source) {
    this.onNotify(message, source);
    for (const c of this.children) c.notify(message, source);
  }
  *getChildren() {
    return this.children.entries();
  }
  /**
   * Handles a received message
   * @param _message 
   * @param _source 
   */
  onNotify(_message, _source) {
  }
  /**
   * Notification a child box has been added
   * 
   * Throws if
   * - child has parent as its own child
   * - child is same as this
   * - child is already child of this
   * @param child 
   */
  onChildAdded(child) {
    if (child.hasChild(this)) throw new Error(`Recursive`);
    if (child === this) throw new Error(`Cannot add self as child`);
    if (this.hasChild(child)) throw new Error(`Child already present`);
    this.children.push(child);
    this._idMap.set(child.id, child);
    this.layoutInvalidated(`Box.onChildAdded`);
  }
  /**
   * Sets `_ready` to `ready`. If `includeChildren` is _true_,
   * `setReady` is called on each child
   * @param ready 
   * @param includeChildren 
   */
  setReady(ready, includeChildren = false) {
    this._ready = ready;
    if (includeChildren) {
      for (const c of this.children) c.setReady(ready, includeChildren);
    }
  }
  /**
   * Gets visible state
   */
  get visible() {
    return this._visible;
  }
  /**
   * Sets visible state
   */
  set visible(v) {
    if (this._visible === v) return;
    this._visible = v;
    this.layoutInvalidated(`Box.set visible`);
  }
  /**
   * Gets the box's desired region, or _undefined_
   */
  get desiredRegion() {
    return this._desiredRect;
  }
  /**
   * Sets the box's desired region.
   * Calls `onLayoutNeeded()`
   */
  set desiredRegion(v) {
    if (boxRectIsEqual(v, this._desiredRect)) return;
    this._desiredRect = v;
    this.layoutInvalidated(`set desiredRegion`);
  }
  /**
   * Calls `notifyChildLayoutNeeded`
   */
  layoutInvalidated(reason) {
    if (reason === void 0) debugger;
    this.debugLog(`layoutInvalidated ${reason}`);
    this._needsMeasuring = true;
    this._needsLayoutX = true;
    this._needsDrawing = true;
    this.notifyChildLayoutNeeded();
  }
  drawingInvalidated(_reason) {
    this._needsDrawing = true;
  }
  /**
   * Called from a child, notifying us that
   * its layout has changed
   * @returns 
   */
  notifyChildLayoutNeeded() {
    this._needsDrawing = true;
    this._needsLayoutX = true;
    this._needsMeasuring = true;
    if (this._parent === void 0) return;
    this._parent.notifyChildLayoutNeeded();
  }
  /**
   * Returns the root box
   */
  get root() {
    if (this._parent === void 0) return this;
    return this._parent.root;
  }
  /**
   * Prepare for measuring
   */
  measurePreflight() {
  }
  /**
   * Applies actual size, returning _true_ if size is different than before
   * 
   * 1. Sets `_needsLayout` to _false_.
   * 2. Sets `visual` to `m`
   * 3. Calls `measureApply` on each child
   * 4. If there's a change or `force`, sets `needsDrawing` to _true_, and notifies root of `measureApplied`
   * @param m Measurement for box
   * @returns 
   */
  measureApply(m) {
    this._needsMeasuring = false;
    const different = this._measuredSize === void 0 ? true : !isEqualSize(m.actual, this._measuredSize);
    if (different) {
      this._needsLayoutX = true;
    }
    this._measuredSize = { width: m.actual.width, height: m.actual.height };
    for (const c of m.children) {
      if (c !== void 0) c.ref.measureApply(c);
    }
    if (different) {
      this.root.notify(`measureApplied`, this);
    }
    return different;
  }
  layoutApply(l) {
    this._needsLayoutX = false;
    const different = this._layoutPosition === void 0 ? true : !isEqual$1(l.actual, this._layoutPosition);
    this._layoutPosition = { x: l.actual.x, y: l.actual.y };
    for (const c of l.children) {
      if (c !== void 0) c.ref.layoutApply(c);
    }
    if (different) {
      this.root.notify(`layoutApplied`, this);
    }
    return different;
  }
  /**
   * Debug log from this box context
   * @param m 
   */
  debugLog(m) {
    if (!this.debugLayout) return;
    console.log(this.id, m);
  }
  layoutStart(measureState, layoutState, force, parent) {
    const m = {
      ref: this,
      actual: Empty,
      children: []
    };
    layoutState.layouts.set(this.id, m);
    const currentPosition = this.layoutSelf(measureState, layoutState, parent);
    this.root.notify(`laidout`, this);
    if (currentPosition === void 0) return;
    m.actual = currentPosition;
    m.children = this.children.map((c) => c.layoutStart(measureState, layoutState, force, m));
    if (withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  layoutSelf(measureState, layoutState, _parent) {
    const box = layoutState.resolveBox(this._desiredRect);
    const x = box === void 0 ? 0 : `x` in box ? box.x : 0;
    const y = box === void 0 ? 0 : `y` in box ? box.y : 0;
    if (x === void 0) debugger;
    if (y === void 0) debugger;
    return { x, y };
  }
  /**
   * Start of measuring
   * 1. Keeps track of measurements in `opts.measurements`
   * 2. If this box takes space
   * 2.1. Measure itself if needed
   * 2.2. Use size
   * 2. Calls `measureStart` on each child
   * @param opts Options
   * @param force Force measurement
   * @param parent Parent's measurement 
   * @returns Measurement
   */
  measureStart(opts, force, parent) {
    this.measurePreflight();
    const m = {
      ref: this,
      // So far no known measurement
      actual: placeholder,
      children: []
    };
    opts.measurements.set(this.id, m);
    if (!this._visible && !this.takesSpaceWhenInvisible) {
      m.actual = emptyPositioned;
    } else {
      let currentMeasurement = this._measuredSize;
      if (this._needsMeasuring || this._measuredSize === void 0) {
        currentMeasurement = this.measureSelf(opts, parent);
        this.root.notify(`measured`, this);
      }
      if (typeof currentMeasurement === `string`) {
        return;
      } else if (currentMeasurement === void 0) {
        return;
      }
      m.actual = currentMeasurement;
    }
    m.children = this.children.map((c) => c.measureStart(opts, force, m));
    if (withoutUndefined(m.children).length < this.children.length) {
      return void 0;
    }
    return m;
  }
  /**
   * Measure the box
   * 1. Uses desired rectangle, if possible
   * 2. Otherwise uses parent's size
   * @param opts Measure state
   * @param parent Parent size
   * @returns 
   */
  measureSelf(opts, parent) {
    let size = placeholder;
    const context = parent ? parent.actual : opts.bounds;
    const desired = opts.resolveBox(this._desiredRect);
    size = desired ? clamp3(desired, context) : context;
    if (isPlaceholder2(size)) {
      return `Box.measureSelf - No size for box?`;
    }
    return size;
  }
  // protected updateDone(state: MeasureState, force: boolean): void {
  //   this.onUpdateDone(state, force);
  //   for (const c of this.children) c.updateDone(state, force);
  // }
  /**
   * Update has completed
   * @param state 
   * @param force 
   */
  //abstract onUpdateDone(state: MeasureState, force: boolean): void;
  /**
   * Update
   * 1. Calls `this.updateBegin()` to initialise measurement state
   * 2. In a loop, run `measureStart()` and then `measureApply` if possible
   * 3. Call `updateDone` when finished
   * @param force Force update
   * @returns 
   */
  update(context, force = false) {
    if (context === void 0) throw new Error(`context is undefined`);
    if (!this._needsMeasuring && !this._needsLayoutX && !force) return;
    const [measureState, layoutState] = this.updateBegin(context);
    let attempts = 5;
    let measureApplied = false;
    let layoutApplied = false;
    if (this._needsMeasuring || force) {
      while (attempts--) {
        const m = this.measureStart(measureState, force);
        if (m !== void 0) {
          this.measureApply(m);
          if (!this._ready) return;
          measureApplied = true;
        }
      }
      if (!measureApplied) this.debugLog(`Ran out of measurement attempts`);
    }
    if (this._needsLayoutX || force) {
      const p = this.layoutStart(measureState, layoutState, force);
      if (p === void 0) {
        this.debugLog(`Warning: could not layout`);
      } else {
        this.layoutApply(p);
        layoutApplied = true;
      }
    }
    this.updateComplete(measureApplied, layoutApplied);
  }
};
var CanvasMeasureState = class extends MeasureState {
  ctx;
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0) throw new Error(`ctx is undefined`);
  }
};
var CanvasLayoutState = class extends LayoutState {
  ctx;
  constructor(bounds, ctx) {
    super(bounds);
    this.ctx = ctx;
    if (ctx === void 0) throw new Error(`ctx is undefined`);
  }
};
var CanvasBox = class _CanvasBox extends Box {
  bounds;
  constructor(parent, id, bounds) {
    super(parent, id);
    this.bounds = bounds;
    this.debugLog(`CanvasBox ctor bounds: ${JSON.stringify(bounds)}`);
  }
  static fromCanvas(canvasElement) {
    const box = new _CanvasBox(void 0, `canvas-box`, canvasElement.getBoundingClientRect());
    return box;
  }
  /**
   * Called if this is the parent Box
   */
  addEventHandlers(element) {
    element.addEventListener(`pointermove`, (event2) => {
      const p = { x: event2.offsetX, y: event2.offsetY };
      this.notifyPointerMove(p);
    });
    element.addEventListener(`pointerleave`, (_event) => {
      this.notifyPointerLeave();
    });
    element.addEventListener(`click`, (event2) => {
      const p = { x: event2.offsetX, y: event2.offsetY };
      this.notifyClick(p);
    });
  }
  onClick(_p) {
  }
  /**
   * Click event has happened on canvas
   * 1. If it's within our range, call `onClick` and pass to all children via `notifyClick`
   * @param p 
   * @returns 
   */
  notifyClick(p) {
    if (isPlaceholder2(this.canvasRegion)) return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onClick(pp);
      for (const c of this.children) c.notifyClick(pp);
    }
  }
  /**
   * Pointer has left
   * 1. Pass notification to all children via `notifyPointerLeave`
   */
  notifyPointerLeave() {
    this.onPointerLeave();
    for (const c of this.children) c.notifyPointerLeave();
  }
  /**
   * Pointer has moved
   * 1. If it's within range `onPointerMove` is called, and pass on to all children via `notifyPointerMove`
   * @param p 
   * @returns 
   */
  notifyPointerMove(p) {
    if (isPlaceholder2(this.canvasRegion)) return;
    if (intersectsPoint(this.canvasRegion, p)) {
      const pp = subtract(p, this.canvasRegion.x, this.canvasRegion.y);
      this.onPointerMove(pp);
      for (const c of this.children) c.notifyPointerMove(pp);
    }
  }
  /**
   * Handler when pointer has left
   */
  onPointerLeave() {
  }
  /**
   * Handler when pointer moves within our region
   * @param _p 
   */
  onPointerMove(_p) {
  }
  /**
   * Performs recalculations and drawing as necessary
   * If nothing needs to happen, function returns.
   * @param context 
   * @param force Force update
   */
  update(context, force = false) {
    super.update(context, force);
    this.draw(context, force);
  }
  getBounds() {
    return this.bounds === void 0 && this._parent ? this._parent.bounds : this.bounds;
  }
  /**
   * Update begins.
   * @returns MeasureState
   */
  updateBegin(context) {
    if (context === void 0) throw new Error(`Context is undefined`);
    let bounds = this.getBounds();
    if (bounds === void 0) {
      this.debugLog(`No bounds for element or parent, using canvas bounds`);
      bounds = { x: 0, y: 0, width: context.canvas.width, height: context.canvas.height };
    }
    return [
      new CanvasMeasureState(bounds, context),
      new CanvasLayoutState(bounds, context)
    ];
  }
  updateComplete(_measureChanged, _layoutChanged) {
    this.canvasRegion = placeholderPositioned;
  }
  measureApply(m) {
    const different = super.measureApply(m);
    if (different) this.canvasRegion = placeholderPositioned;
    return different;
  }
  layoutApply(l) {
    const different = super.layoutApply(l);
    if (different) this.canvasRegion = placeholderPositioned;
    return different;
  }
  draw(ctx, force = false) {
    if (this._needsDrawing || force) {
      if (isPlaceholder2(this.canvasRegion)) {
        if (this._layoutPosition === void 0) return;
        if (this._measuredSize === void 0) return;
        this.canvasRegion = {
          x: this._layoutPosition.x,
          y: this._layoutPosition.y,
          width: this._measuredSize.width,
          height: this._measuredSize.height
        };
      }
      if (this._needsLayoutX || this._needsMeasuring) ;
      ctx.save();
      const v = this.canvasRegion;
      ctx.translate(v.x, v.y);
      if (this.debugLayout) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsl(${this.debugHue}, 100%, 50%)`;
        ctx.strokeRect(0, 0, v.width, v.height);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillText(this.id, 10, 10, v.width);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(v.width, v.height);
        ctx.stroke();
      }
      this.drawSelf(ctx);
      this._needsDrawing = false;
      ctx.restore();
    }
    for (const c of this.children) {
      c.draw(ctx, force);
    }
  }
  /**
   * Draw this object
   * @param _ctx 
   */
  drawSelf(_ctx) {
  }
};

// src/visual/ScaleCanvas.ts
var scaleCanvas = (domQueryOrElement) => {
  const canvasElement = resolveEl(domQueryOrElement);
  const ratio = window.devicePixelRatio;
  canvasElement.style.width = canvasElement.width + `px`;
  canvasElement.style.height = canvasElement.height + `px`;
  canvasElement.width *= devicePixelRatio;
  canvasElement.height *= devicePixelRatio;
  const getContext2 = () => {
    const ctx = canvasElement.getContext(`2d`);
    if (ctx === null) throw new Error(`Could not get drawing context`);
    ctx.save();
    ctx.scale(ratio, ratio);
    return ctx;
  };
  return { ctx: getContext2(), element: canvasElement, bounds: canvasElement.getBoundingClientRect() };
};

// src/dom/DomRx.ts
var DomRx_exports = {};
__export(DomRx_exports, {
  resizeObservable: () => resizeObservable,
  themeChange: () => themeChange,
  windowResize: () => windowResize
});
var windowResize = (elapsed2) => Ops.debounce({ elapsed: elapsed2 ?? 100 })(sources_exports.event(window, `resize`, { innerWidth: 0, innerHeight: 0 }));
var themeChange = () => {
  const m = sources_exports.observable((stream2) => {
    const ro = new MutationObserver((entries) => {
      stream2.set(entries);
    });
    const opts = {
      attributeFilter: [`class`],
      attributes: true
    };
    ro.observe(document.documentElement, opts);
    return () => {
      ro.disconnect();
    };
  });
  return m;
};
var resizeObservable = (elem, timeout2) => {
  if (elem === null) {
    throw new Error(`elem parameter is null. Expected element to observe`);
  }
  if (elem === void 0) {
    throw new Error(`elem parameter is undefined. Expected element to observe`);
  }
  const m = sources_exports.observable((stream2) => {
    const ro = new ResizeObserver((entries) => {
      stream2.set(entries);
    });
    ro.observe(elem);
    return () => {
      ro.unobserve(elem);
    };
  });
  return Ops.debounce({ elapsed: timeout2 ?? 100 })(m);
};

// src/dom/CanvasSizing.ts
var parentSizeCanvas = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el2.nodeName}`
    );
  }
  const parent = el2.parentElement;
  if (parent === null) throw new Error(`Element has no parent`);
  const ctx = el2.getContext(`2d`);
  if (ctx === null) throw new Error(`Could not create drawing context`);
  el2.style.width = `100%`;
  el2.style.height = `100%`;
  const ro = resizeObservable(parent, timeoutMs).onValue(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0) return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el2.setAttribute(`width`, el2.offsetWidth + `px`);
      el2.setAttribute(`height`, el2.offsetHeight + `px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ ctx, el: el2, bounds });
      }
    }
  );
  return ro;
};
var fullSizeCanvas = (domQueryOrEl, onResized, skipCss = false) => {
  if (domQueryOrEl === null || domQueryOrEl === void 0) {
    throw new Error(`domQueryOrEl is null or undefined`);
  }
  const el2 = resolveEl(domQueryOrEl);
  if (el2.nodeName !== `CANVAS`) {
    throw new Error(
      `Expected HTML element with node name CANVAS, not ${el2.nodeName}`
    );
  }
  const ctx = el2.getContext(`2d`);
  if (ctx === null) throw new Error(`Could not create drawing context`);
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el2.width = width;
    el2.height = height;
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: { x: width / 2, y: height / 2 }
      };
      onResized({ ctx, el: el2, bounds });
    }
  };
  if (!skipCss) {
    el2.style.top = `0`;
    el2.style.left = `0`;
    el2.style.zIndex = `-100`;
    el2.style.position = `fixed`;
  }
  const r = windowResize();
  r.onValue(update);
  update();
  return r;
};

// src/visual/Plot2.ts
var ArrayDataSource = class {
  data;
  series;
  dirty = false;
  type = `array`;
  _range;
  constructor(series) {
    this.series = series;
    this.data = [];
    this.dirty = true;
  }
  clear() {
    this.set([]);
    this._range = void 0;
  }
  set(data) {
    this.data = data;
    this.dirty = true;
  }
  get length() {
    return this.data.length;
  }
  get range() {
    if (!this.dirty && this._range !== void 0) return this._range;
    this.dirty = false;
    const updatedRange = minMaxAvg(this.data);
    if (this._range === void 0 || updatedRange.max !== this._range.max || updatedRange.min !== this._range.min) {
      this._range = updatedRange;
      return { ...this._range, changed: true };
    } else {
      return { ...this._range, changed: false };
    }
  }
  add(value) {
    this.data = [...this.data, value];
    this.dirty = true;
  }
};
var StreamingDataSource = class extends ArrayDataSource {
  desiredDataPointMinWidth = 5;
  add(value) {
    const lastWidth = this.series.lastPxPerPt;
    if (lastWidth > -1 && lastWidth < this.desiredDataPointMinWidth) {
      const pts = Math.floor(this.desiredDataPointMinWidth / lastWidth);
      const d = [...this.data.slice(pts), value];
      super.set(d);
    } else super.add(value);
  }
};
var Series = class {
  constructor(name, sourceType, plot2, opts) {
    this.plot = plot2;
    this.name = name;
    this.drawingStyle = opts.drawingStyle ?? `line`;
    this.colour = opts.colour;
    this.width = opts.width ?? 3;
    this.axisRange = opts.axisRange ?? { min: Number.NaN, max: Number.NaN };
    this._visualRange = { ...this.axisRange };
    this._visualRangeStretch = opts.visualRangeStretch ?? true;
    if (sourceType === `array`) {
      this.source = new ArrayDataSource(this);
    } else if (sourceType === `stream`) {
      this.source = new StreamingDataSource(this);
    } else throw new Error(`Unknown sourceType. Expected array|stream`);
  }
  name;
  colour;
  source;
  drawingStyle;
  width = 3;
  dataHitPoint;
  tooltip;
  precision = 2;
  axisRange;
  // How many pixels wide per data point on last draw
  lastPxPerPt = -1;
  _visualRange;
  _visualRangeStretch;
  formatValue(v) {
    return v.toFixed(this.precision);
  }
  get visualRange() {
    let vr = this._visualRange;
    const sourceRange = this.source.range;
    let changed = false;
    if (sourceRange.changed) {
      if (this._visualRangeStretch) {
        const rmin = Math.min(ifNaN(vr.min, sourceRange.min), sourceRange.min);
        const rmax = Math.max(ifNaN(vr.max, sourceRange.max), sourceRange.max);
        if (rmin !== vr.min || rmax !== vr.max) {
          vr = { min: rmin, max: rmax };
          changed = true;
        }
      } else {
        if (!isRangeEqual(sourceRange, vr)) {
          vr = sourceRange;
          changed = true;
        }
      }
    }
    this._visualRange = vr;
    return { ...vr, changed };
  }
  scaleValue(value) {
    if (this.source === void 0) return value;
    const r = this.visualRange;
    if (r.changed) {
      this.plot.notify(`range-change`, this.plot.plotArea);
    }
    if (r.min == r.max) {
      return 0.5;
    }
    return scale(value, r.min, r.max);
  }
  add(value) {
    throwNumberTest(value, ``, `value`);
    this.source.add(value);
    this.plot.plotArea.drawingInvalidated(`Series.add`);
  }
  /**
   * Clears the underlying source
   * and sets a flag that the plot area needs redrawing
   */
  clear() {
    this.source.clear();
    this._visualRange = { ...this.axisRange };
    this.plot.plotArea.layoutInvalidated(`Series.clear`);
  }
};
var PlotArea = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `PlotArea`, region);
    this.plot = plot2;
  }
  paddingPx = 5;
  piPi = Math.PI * 2;
  // If pointer is more than this distance away from a data point, it's ignored
  pointerDistanceThreshold = 20;
  lastRangeChange = 0;
  pointer;
  clear() {
    this.lastRangeChange = 0;
    this.pointer = void 0;
  }
  measureSelf(opts, _parent) {
    const axisY = opts.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const legend = opts.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const axisX = opts.getActualSize(`AxisX`);
    const axisXHeight = axisX?.height ?? 0;
    if (!axisY) return `No AxisY. Measured: ${opts.whatIsMeasured().join(`, `)}`;
    if (!legend) return `No Legend`;
    if (!axisX) return `No AxisX`;
    return {
      width: opts.bounds.width - axisY.width - this.paddingPx,
      height: opts.bounds.height - legendHeight - axisXHeight - padding
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const padding = this.paddingPx;
    const axisYWidth = axisY?.width ?? 0;
    return {
      x: axisYWidth,
      y: padding
      // layoutState.bounds.height - height - axisXHeight - legendHeight
    };
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY)
      this.layoutInvalidated(`PlotArea.onNotify measureApplied to axisY`);
    if (message === `laidout` && source === this.plot.legend)
      this.layoutInvalidated(`PlotArea.onNotify laidout to legend`);
  }
  // protected onClick(p: Point): void {
  //   this.plot.frozen = !this.plot.frozen;
  // }
  onPointerLeave() {
    for (const series of this.plot.series.values()) {
      series.tooltip = void 0;
    }
    this.pointer = void 0;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerLeave`);
  }
  onPointerMove(p) {
    this.pointer = p;
    this.plot.legend.drawingInvalidated(`PlotArea.onPointerMove`);
  }
  measurePreflight() {
    this.updateTooltip();
  }
  updateTooltip() {
    const p = this.pointer;
    if (p === void 0) return;
    for (const series of this.plot.series.values()) {
      if (p === void 0) {
        series.tooltip = void 0;
        return;
      }
      if (series.dataHitPoint === void 0) return;
      const v = series.dataHitPoint(p);
      if (v[0] === void 0) return;
      if (v[1] > this.pointerDistanceThreshold) return;
      series.tooltip = series.formatValue(v[0].value);
    }
    this.plot.legend.drawingInvalidated(`PlotArea.updateTooltip`);
  }
  drawSelf(ctx) {
    if (this.plot.frozen) return;
    const seriesCopy = this.plot.seriesArray();
    ctx.clearRect(0, -1, this.canvasRegion.width, this.canvasRegion.height);
    for (const series of seriesCopy) {
      if (series.source.type === `array` || series.source.type === `stream`) {
        const arraySeries = series.source;
        if (arraySeries.data === void 0) return;
        const d = [...arraySeries.data];
        this.drawDataSet(series, d, ctx);
      } else console.warn(`Unknown data source type ${series.source.type}`);
    }
  }
  computeY(series, rawValue) {
    const s = series.scaleValue(rawValue);
    return flip(s) * this.canvasRegion.height + this.paddingPx;
  }
  drawDataSet(series, d, ctx) {
    const padding = this.paddingPx + series.width;
    const v = subtract3(this.canvasRegion, padding * 2, padding * 3.5);
    const pxPerPt = v.width / d.length;
    series.lastPxPerPt = pxPerPt;
    let x = padding;
    ctx.strokeStyle = series.colour;
    ctx.lineWidth = series.width;
    const shapes = [];
    series.dataHitPoint = (pt) => {
      const distances = shapes.map((v2) => distanceToExterior(pt, v2));
      const index = minIndex(...distances);
      const closest = shapes[index];
      return [closest, distances[index]];
    };
    if (series.drawingStyle === `line`) {
      let y = 0;
      ctx.beginPath();
      for (let index = 0; index < d.length; index++) {
        const scaled = clamp(series.scaleValue(d[index]));
        y = padding + this.paddingPx + v.height * flip(scaled);
        shapes.push({ x, y, index, value: d[index] });
        if (index == 0) ctx.moveTo(x + pxPerPt / 2, y);
        else ctx.lineTo(x + pxPerPt / 2, y);
        if (y > this.canvasRegion.height)
          console.warn(`${y} h: ${this.canvasRegion.height}`);
        x += pxPerPt;
      }
      ctx.strokeStyle = series.colour;
      ctx.stroke();
    } else if (series.drawingStyle === `dotted`) {
      let y = 0;
      ctx.fillStyle = series.colour;
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        y = padding + v.height * flip(scaled);
        ctx.beginPath();
        ctx.arc(x + pxPerPt / 2, y, series.width, 0, this.piPi);
        ctx.fill();
        shapes.push({ radius: series.width, x, y, index, value: d[index] });
        x += pxPerPt;
      }
    } else if (series.drawingStyle === `bar`) {
      ctx.fillStyle = series.colour;
      const interBarPadding = Math.ceil(pxPerPt * 0.1);
      for (let index = 0; index < d.length; index++) {
        const scaled = series.scaleValue(d[index]);
        const h = v.height * scaled;
        const r = {
          x: x + interBarPadding,
          y: v.height - h + padding,
          width: pxPerPt - interBarPadding,
          height: h,
          index,
          value: d[index]
        };
        ctx.fillRect(r.x, r.y, r.width, r.height);
        shapes.push(r);
        x += pxPerPt;
      }
    }
  }
};
var Legend = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `Legend`, region);
    this.plot = plot2;
  }
  sampleSize = { width: 10, height: 10 };
  padding = 3;
  widthSnapping = 20;
  labelMeasurements = /* @__PURE__ */ new Map();
  clear() {
  }
  layoutSelf(measureState, layoutState, _parent) {
    const axisY = measureState.getActualSize(`AxisY`);
    const axisYWidth = axisY?.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: axisYWidth,
      y: layoutState.bounds.height - height
    };
  }
  measureSelf(opts, _parent) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    const widthSnapping = this.widthSnapping;
    const ctx = opts.ctx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    let x = padding;
    let y = padding;
    const availableWidth = opts.bounds.width - yAxisWidth - padding;
    let rowHeight = 0;
    for (const s of series) {
      const startX = x;
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      const text = textRect(ctx, s.name, padding, widthSnapping);
      x += textWidth(ctx, s.name, padding, widthSnapping);
      if (s.tooltip) {
        x += textWidth(ctx, s.tooltip, padding, widthSnapping);
      }
      const r = { width: 10, height: 10, x: startX, y };
      this.labelMeasurements.set(s.name, r);
      rowHeight = Math.min(sample.height + padding + padding, text.height + padding + padding);
      x += padding;
      if (x > availableWidth) {
        x = padding;
        y += rowHeight;
      }
    }
    return {
      width: availableWidth,
      height: y + rowHeight
    };
  }
  drawSelf(ctx) {
    const series = this.plot.seriesArray();
    const sample = this.sampleSize;
    const padding = this.padding;
    this.debugLog(`drawSelf`);
    ctx.clearRect(0, 0, this.canvasRegion.width, this.canvasRegion.height);
    for (const s of series) {
      const r = this.labelMeasurements.get(s.name);
      if (r === void 0) continue;
      let x = r.x;
      ctx.fillStyle = s.colour;
      ctx.fillRect(x, r.y, sample.width, sample.height);
      x += sample.width + padding;
      ctx.textBaseline = `middle`;
      ctx.fillStyle = this.plot.legendTextColour;
      ctx.fillText(s.name, x, r.y + sample.height / 2);
      if (s.tooltip) {
        ctx.fillStyle = this.plot.legendTextColour;
        ctx.fillText(s.tooltip, r.x, r.y + sample.height / 2);
      }
    }
  }
  onNotify(message, source) {
    this.debugLog(`onNotify ${message} source: ${source.id}`);
    if (message === `measureApplied` && source === this._parent.axisY) {
      this.layoutInvalidated(`Legend.onNotify measureApplied to axisY`);
    }
  }
};
var AxisX = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisX`, region);
    this.plot = plot2;
  }
  paddingPx = 2;
  colour;
  clear() {
  }
  onNotify(message, source) {
    if (message === `measureApplied` && source === this.plot.axisY) {
      this.layoutInvalidated(`AxisX.onNotify measureApplied to axisY`);
    }
  }
  drawSelf(ctx) {
    const plot2 = this.plot;
    const v = this.canvasRegion;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.moveTo(0, strokeWidth / 2);
    ctx.lineTo(v.width, strokeWidth / 2);
    ctx.stroke();
  }
  measureSelf(opts, _parent) {
    const plot2 = this.plot;
    const padding = this.paddingPx;
    const yAxis = opts.measurements.get(`AxisY`);
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const heightOfText = 0;
    const h = plot2.axisStrokeWidth + heightOfText + padding + padding;
    return {
      width: opts.bounds.width - yAxisWidth - padding,
      height: h
    };
  }
  layoutSelf(measureState, _layoutState, _parent) {
    const yAxis = measureState.measurements.get(`AxisY`);
    const legend = measureState.getActualSize(`Legend`);
    const legendHeight = legend?.height ?? 0;
    const yAxisWidth = yAxis?.actual.width ?? 0;
    const height = this._measuredSize?.height ?? 0;
    return {
      x: yAxisWidth,
      y: measureState.bounds.height - height - legendHeight
    };
  }
};
var isRangeEqual = (a, b) => a.max === b.max && a.min === b.min;
var isRangeSinglePoint = (a) => a.max === a.min;
var AxisY = class extends CanvasBox {
  constructor(plot2, region) {
    super(plot2, `AxisY`, region);
    this.plot = plot2;
    this.lastRange = { min: 0, max: 0 };
  }
  // Number of digits axis will be expected to show as a data legend
  _maxDigits = 1;
  seriesToShow;
  paddingPx = 2;
  colour;
  lastRange;
  lastPlotAreaHeight = 0;
  clear() {
    this.lastRange = { min: 0, max: 0 };
    this.lastPlotAreaHeight = 0;
  }
  measurePreflight() {
  }
  onNotify(message, source) {
    const pa = this.plot.plotArea;
    if (message === `range-change`) {
      this.drawingInvalidated(`range-change`);
      return;
    }
    if (message === `measureApplied` && source === pa && pa.canvasRegion.height !== this.lastPlotAreaHeight) {
      this.lastPlotAreaHeight = pa.canvasRegion.height;
      this.drawingInvalidated(`AxisY.onNotify height change`);
    }
  }
  measureSelf(copts) {
    if (copts.ctx === void 0) throw new Error(`opts.ctx is undefined`);
    const paddingPx = this.paddingPx;
    let width = this.plot.axisStrokeWidth + paddingPx;
    const series = this.getSeries();
    if (series !== void 0) {
      const r = series.visualRange;
      this._maxDigits = Math.ceil(r.max).toString().length + series.precision + 1;
      const textToMeasure = `9`.repeat(this._maxDigits);
      width += textWidth(copts.ctx, textToMeasure, paddingPx * 2);
    }
    const w = copts.resolveToPx(this.desiredRegion?.width, width, width);
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      width: w,
      height: copts.bounds.height
    };
  }
  layoutSelf(_measureState, _layoutState, _parent) {
    return { x: 0, y: 0 };
  }
  drawSelf(ctx) {
    const s = this.getSeries();
    if (s === void 0) {
      if (this.seriesToShow === void 0) return;
      console.warn(`Plot AxisY series '${this.seriesToShow}' is missing.`);
    } else {
      this.seriesAxis(s, ctx);
    }
  }
  getSeries() {
    return this.seriesToShow === void 0 ? (
      // Pick first series
      this.plot.seriesArray()[0]
    ) : (
      // Try designated series name
      this.plot.series.get(this.seriesToShow)
    );
  }
  seriesAxis(series, ctx) {
    const plot2 = this.plot;
    const plotArea = plot2.plotArea;
    const v = this.canvasRegion;
    const paddingPx = this.paddingPx;
    const r = series.visualRange;
    const strokeWidth = plot2.axisStrokeWidth;
    const colour = this.colour ?? plot2.axisStrokeColour;
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    if (Number.isNaN(r.min) && Number.isNaN(r.max)) return;
    this.lastRange = r;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    const lineX = v.width - strokeWidth / 2;
    ctx.moveTo(lineX, plotArea.paddingPx + strokeWidth);
    ctx.lineTo(lineX, plotArea.canvasRegion.height + paddingPx + strokeWidth + strokeWidth);
    ctx.stroke();
    ctx.textBaseline = `top`;
    const fromRight = v.width - paddingPx * 4;
    ctx.fillStyle = plot2.axisTextColour;
    if (isRangeSinglePoint(r)) {
      this.debugLog(`rangeSinglePoint`);
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) - paddingPx * 4
      ]);
    } else {
      drawText(ctx, series.formatValue(r.max), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.max) + strokeWidth / 2
      ]);
      drawText(ctx, series.formatValue(r.min), (size) => [
        fromRight - size.width,
        plotArea.computeY(series, r.min) - 5
      ]);
    }
  }
};
var drawText = (ctx, text, position) => {
  if (ctx === void 0) throw new Error(`ctx is undefined`);
  const size = ctx.measureText(text);
  const xy = position(size);
  ctx.fillText(text, xy[0], xy[1]);
};
var Plot = class extends CanvasBox {
  plotArea;
  legend;
  axisX;
  axisY;
  axisStrokeColour;
  axisTextColour;
  legendTextColour;
  axisStrokeWidth;
  series;
  _frozen = false;
  _canvasEl;
  _ctx;
  defaultSeriesOpts;
  constructor(canvasElementOrQuery, opts = {}) {
    const { ctx, element, bounds } = scaleCanvas(canvasElementOrQuery);
    super(void 0, `Plot`);
    this._canvasEl = element;
    this._ctx = ctx;
    if (opts.autoSize) {
      parentSizeCanvas(element, (event2) => {
        this.drawingInvalidated(`resize`);
        this.layoutInvalidated(`resize`);
        this.update(event2.ctx, true);
      });
    }
    this.axisStrokeColour = opts.axisStrokeColour ?? `black`;
    this.axisTextColour = opts.axisTextColour ?? `black`;
    this.legendTextColour = opts.legendTextColour ?? `black`;
    this.axisStrokeWidth = opts.axisStrokeWidth ?? 3;
    this.series = /* @__PURE__ */ new Map();
    this.plotArea = new PlotArea(this, bounds);
    this.legend = new Legend(this, bounds);
    this.axisX = new AxisX(this, bounds);
    this.axisY = new AxisY(this, bounds);
  }
  update(ctx, force = false) {
    if (ctx === void 0) ctx = this._ctx;
    super.update(ctx, force);
  }
  /**
   * Calls 'clear()' on each of the series
   */
  clearSeries() {
    for (const series of this.series.values()) {
      series.clear();
    }
    this.update();
  }
  /**
   * Removes all series, plot, legend
   * and axis data.
   */
  clear() {
    this.series = /* @__PURE__ */ new Map();
    this.plotArea.clear();
    this.legend.clear();
    this.axisX.clear();
    this.axisY.clear();
    this.layoutInvalidated(`Plot.clear`);
    this.drawingInvalidated(`Plot.clear`);
    this.update();
  }
  get frozen() {
    return this._frozen;
  }
  set frozen(v) {
    this._frozen = v;
    if (v) {
      this._canvasEl.classList.add(`frozen`);
      this._canvasEl.title = `Plot frozen. Tap to unfreeze`;
    } else {
      this._canvasEl.title = ``;
      this._canvasEl.classList.remove(`frozen`);
    }
  }
  seriesArray() {
    return [...this.series.values()];
  }
  get seriesLength() {
    return this.series.size;
  }
  /**
   * Plots a simple object, eg `{ x: 10, y: 20, z: 300 }`
   * Series are automatically created for each property of `o`
   *
   * Be sure to call `update()` to visually refresh.
   * @param o
   */
  plot(o) {
    const paths2 = getPaths(o, true);
    let seriesCreated = false;
    for (const p of paths2) {
      let s = this.series.get(p);
      if (s === void 0) {
        s = this.createSeries(p, `stream`);
        s.drawingStyle = `line`;
        seriesCreated = true;
      }
      s.add(getField(o, p));
    }
    if (seriesCreated) this.legend.layoutInvalidated(`new series`);
    this.update();
  }
  createSeriesFromObject(o, prefix = ``) {
    const keys = Object.keys(o);
    const create3 = (key) => {
      const v = o[key];
      if (typeof v === `object`) {
        return this.createSeriesFromObject(v, `${prefix}${key}.`);
      } else if (typeof v === `number`) {
        return [this.createSeries(key, `stream`)];
      } else {
        return [];
      }
    };
    return keys.flatMap((k) => create3(k));
  }
  createSeries(name, type = `array`, seriesOpts) {
    const seriesLength = this.seriesLength;
    if (name === void 0) name = `series-${seriesLength}`;
    if (this.series.has(name))
      throw new Error(`Series name '${name}' already in use`);
    let opts = {
      colour: `hsl(${seriesLength * 25 % 360}, 70%,50%)`,
      ...seriesOpts
    };
    if (this.defaultSeriesOpts) opts = { ...this.defaultSeriesOpts, ...opts };
    const s = new Series(name, type, this, opts);
    this.series.set(name, s);
    this.setReady(true, true);
    this.plotArea.drawingInvalidated(`Plot.createSeries`);
    return s;
  }
};

// src/visual/Palette.ts
var Palette_exports = {};
__export(Palette_exports, {
  create: () => create2
});
var create2 = (fallbacks) => new PaletteImpl(fallbacks);
var PaletteImpl = class {
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #store = /* @__PURE__ */ new Map();
  /* eslint-disable-next-line functional/prefer-readonly-type */
  #aliases = /* @__PURE__ */ new Map();
  fallbacks;
  #lastFallback = 0;
  #elementBase;
  constructor(fallbacks) {
    if (fallbacks !== void 0) this.fallbacks = fallbacks;
    else this.fallbacks = [`red`, `blue`, `green`, `orange`];
    this.#elementBase = document.body;
  }
  setElementBase(el2) {
    this.#elementBase = el2;
  }
  add(key, colour) {
    this.#store.set(key, colour);
  }
  alias(from, to2) {
    this.#aliases.set(from, to2);
  }
  get(key, fallback) {
    const alias = this.#aliases.get(key);
    if (alias !== void 0) key = alias;
    const c = this.#store.get(key);
    if (c !== void 0) return c;
    const varName = `--` + key;
    let fromCss = getComputedStyle(this.#elementBase).getPropertyValue(varName).trim();
    if (fromCss === void 0 || fromCss.length === 0) {
      if (fallback !== void 0) return fallback;
      fromCss = this.fallbacks[this.#lastFallback];
      this.#lastFallback++;
      if (this.#lastFallback === this.fallbacks.length) this.#lastFallback = 0;
    }
    return fromCss;
  }
  getOrAdd(key, fallback) {
    if (this.has(key)) return this.get(key);
    const c = this.get(key, fallback);
    this.add(key, c);
    return c;
  }
  has(key) {
    return this.#store.has(key);
  }
};

// src/visual/BipolarView.ts
var BipolarView_exports = {};
__export(BipolarView_exports, {
  init: () => init
});
function getNumericAttribute(el2, name, defaultValue) {
  const a = el2.getAttribute(name);
  if (a === null) return defaultValue;
  return Number.parseInt(a);
}
var init = (elementQuery, opts = {}) => {
  const element = document.querySelector(elementQuery);
  if (!element) throw new Error(`Element query could not be found (${elementQuery})`);
  const labels = opts.labels ?? [`x`, `y`];
  const labelPrecision = opts.labelPrecision ?? 2;
  const asPercentages = opts.asPercentages ?? false;
  const displayLastValues = opts.displayLastValues ?? 0;
  const showWhiskers = opts.showWhiskers ?? true;
  const showDot = opts.showDot ?? true;
  const showLabels = opts.showLabels ?? true;
  const yAxisBottomNegative = opts.yAxisBottomNegative ?? true;
  const axisColour = resolveToString(opts.axisColour, `silver`);
  const bgColour = resolveToString(opts.bgColour, `white`);
  const whiskerColour = resolveToString(opts.whiskerColour, `black`);
  const dotColour = resolveToString(opts.dotColour, opts.whiskerColour, `black`);
  const labelColour = resolveToString(opts.labelColour, opts.axisColour, `silver`);
  const axisWidth = opts.axisWidth ?? 1 * window.devicePixelRatio;
  const dotRadius = opts.dotRadius ?? 5 * window.devicePixelRatio;
  const pad = opts.padding ?? 10 * window.devicePixelRatio;
  const whiskerSize = opts.whiskerSize ?? 5 * window.devicePixelRatio;
  const width = opts.width ?? getNumericAttribute(element, `width`, 200) * window.devicePixelRatio;
  const height = opts.height ?? getNumericAttribute(element, `height`, 200) * window.devicePixelRatio;
  let lastValues;
  if (displayLastValues > 0) {
    lastValues = immutable$1({
      capacity: displayLastValues,
      discardPolicy: `older`
    });
  }
  element.width = width;
  element.height = height;
  element.style.width = `${width / window.devicePixelRatio}px`;
  element.style.height = `${height / window.devicePixelRatio}px`;
  const midY = height / 2;
  const midX = width / 2;
  const ctx = element.getContext(`2d`);
  if (!ctx) throw new Error(`Could not create drawing context`);
  if (window.devicePixelRatio >= 2) {
    ctx.font = `20px sans-serif`;
  }
  const percentageFormat = (v) => `${Math.round(v * 100)}%`;
  const fixedFormat = (v) => v.toFixed(labelPrecision);
  const valueFormat = asPercentages ? percentageFormat : fixedFormat;
  if (showLabels) {
    labels[0] = labels[0] + `:`;
    labels[1] = labels[1] + `:`;
  } else {
    labels[0] = ``;
    labels[1] = ``;
  }
  const renderBackground = opts.renderBackground ?? ((ctx2, width2, height2) => {
    if (opts.bgColour === `transparent`) {
      ctx2.clearRect(0, 0, width2, height2);
    } else {
      ctx2.fillStyle = bgColour;
      ctx2.fillRect(0, 0, width2, height2);
    }
  });
  return (x, y) => {
    x = clamp2(x);
    y = clamp2(y);
    renderBackground(ctx, width, height);
    ctx.fillStyle = labelColour;
    ctx.textBaseline = `top`;
    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText((labels[1] + ` ` + valueFormat(y)).trim(), -midX + pad, 1);
    ctx.restore();
    ctx.fillText((labels[0] + ` ` + valueFormat(x)).trim(), pad, midX + 2);
    if (!yAxisBottomNegative) y *= -1;
    ctx.strokeStyle = axisColour;
    ctx.lineWidth = axisWidth;
    ctx.beginPath();
    ctx.moveTo(pad, midY);
    ctx.lineTo(width - pad, midY);
    ctx.moveTo(midX, pad);
    ctx.lineTo(midX, height - pad);
    ctx.stroke();
    ctx.closePath();
    const yy = (height - pad - pad) / 2 * -y;
    const xx = (width - pad - pad) / 2 * x;
    const dotPos = { x: xx, y: yy, radius: dotRadius };
    if (lastValues) {
      lastValues = lastValues.enqueue(dotPos);
    }
    ctx.save();
    ctx.translate(midX, midY);
    if (showDot) {
      if (lastValues) {
        const opacityStep = 1 / lastValues.length;
        let opacity2 = 1;
        lastValues.forEach((d) => {
          const colour = opacity(dotColour, opacity2);
          circle(ctx, d, { fillStyle: colour });
          opacity2 -= opacityStep;
        });
      } else {
        circle(ctx, dotPos, { fillStyle: dotColour });
      }
    }
    if (showWhiskers) {
      ctx.strokeStyle = whiskerColour;
      ctx.beginPath();
      ctx.moveTo(0, yy - whiskerSize);
      ctx.lineTo(0, yy + whiskerSize);
      ctx.moveTo(xx - whiskerSize, 0);
      ctx.lineTo(xx + whiskerSize, 0);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  };
};

// src/visual/PlotOld.ts
var PlotOld_exports = {};
__export(PlotOld_exports, {
  add: () => add,
  calcScale: () => calcScale,
  defaultAxis: () => defaultAxis,
  draw: () => draw,
  drawValue: () => drawValue,
  plot: () => plot
});
var piPi2 = Math.PI * 2;
var defaultAxis = (name) => ({
  endWith: `none`,
  lineWidth: 1,
  namePosition: `none`,
  name,
  showLabels: name === `y`,
  showLine: true,
  // For y axis, it's the width, for x axis it's the text height
  textSize: name === `y` ? 20 : 10
});
var calcScale = (buffer, drawingOpts, seriesColours) => {
  const scales = [];
  for (const s of buffer.keys()) {
    const series = [...buffer.get(s)];
    if (series.length === 0) break;
    let { min: min3, max: max3 } = minMaxAvg(series);
    let range = max3 - min3;
    let colour;
    if (seriesColours !== void 0) {
      colour = seriesColours[s];
    }
    if (colour == void 0) {
      colour = drawingOpts.defaultSeriesVariable ? getCssVariable(
        `accent`,
        drawingOpts.defaultSeriesColour
      ) : drawingOpts.defaultSeriesColour;
    }
    if (range === 0) {
      range = min3;
      min3 = min3 - range / 2;
      max3 = max3 + range / 2;
    }
    scales.push({
      min: min3,
      max: max3,
      range,
      name: s,
      colour
    });
  }
  return scales;
};
var add = (buffer, value, series = ``) => {
  buffer.addKeyedValues(series, value);
};
var drawValue = (index, buffer, drawing) => {
  const c = {
    ...drawing,
    translucentPlot: true,
    leadingEdgeDot: false
  };
  draw(buffer, c);
  drawing = {
    ...drawing,
    highlightIndex: index,
    leadingEdgeDot: true,
    translucentPlot: false,
    style: `none`,
    clearCanvas: false
  };
  draw(buffer, drawing);
};
var scaleWithFixedRange = (buffer, range, drawing) => calcScale(buffer, drawing, drawing.seriesColours).map((s) => ({
  ...s,
  range: range[1] - range[0],
  min: range[0],
  max: range[1]
}));
var draw = (buffer, drawing) => {
  const { x: xAxis, y: yAxis, ctx, canvasSize } = drawing;
  const margin = drawing.margin;
  const series = drawing.y.scaleRange ? scaleWithFixedRange(buffer, drawing.y.scaleRange, drawing) : calcScale(buffer, drawing, drawing.seriesColours);
  if (drawing.clearCanvas)
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (drawing.debug) {
    ctx.strokeStyle = `orange`;
    ctx.strokeRect(0, 0, canvasSize.width, canvasSize.height);
  }
  ctx.translate(margin, margin);
  const plotSize = drawing.plotSize ?? plotSizeFromBounds(canvasSize, drawing);
  const axisSize = {
    height: plotSize.height + margin + margin,
    width: plotSize.width
  };
  if (yAxis.showLabels || yAxis.showLine) {
    for (const s of series) {
      if (yAxis.allowedSeries !== void 0 && !yAxis.allowedSeries.includes(s.name)) continue;
      drawYSeriesScale(s, axisSize, drawing);
    }
    if (series.length > 0 && yAxis.showLine)
      drawYLine(axisSize, series[0], drawing);
  }
  if ((xAxis.showLabels || xAxis.showLine) && series.length > 0) {
    const yPos = yAxis.labelRange ? yAxis.labelRange[0] : series[0].min;
    drawXAxis(
      plotSize.width,
      calcYForValue(yPos, series[0], plotSize.height) + margin + xAxis.lineWidth,
      drawing
    );
  }
  const plotDrawing = {
    ...drawing,
    plotSize
  };
  translatePoint(ctx, drawing.pointer);
  for (const s of series) {
    const data = buffer.getSource(s.name);
    if (data === void 0) continue;
    let leadingEdgeIndex = buffer.typeName === `circular` ? data.pointer - 1 : data.length - 1;
    if (drawing.highlightIndex !== void 0)
      leadingEdgeIndex = drawing.highlightIndex;
    ctx.save();
    ctx.translate(0, margin + margin);
    drawSeriesData(s, data, plotSize, plotDrawing, leadingEdgeIndex);
    ctx.restore();
  }
  if (drawing.showLegend) {
    ctx.save();
    ctx.translate(0, plotSize.height + margin + margin + margin);
    ({
      width: plotSize.width,
      height: drawing.x.textSize + margin + margin
    });
    drawLegend(series, drawing);
    ctx.restore();
  }
  ctx.resetTransform();
};
var drawYSeriesScale = (series, plotSize, drawing) => {
  const { ctx, y, digitsPrecision, margin } = drawing;
  const { height } = plotSize;
  if (drawing.debug) {
    ctx.strokeStyle = `purple`;
    ctx.strokeRect(0, 0, y.textSize, height + margin);
  }
  ctx.fillStyle = series.colour.length > 0 ? series.colour : `white`;
  if (y.colour) ctx.fillStyle = y.colour;
  const min3 = y.labelRange ? y.labelRange[0] : series.min;
  const max3 = y.labelRange ? y.labelRange[1] : series.max;
  const range = y.labelRange ? max3 - min3 : series.range;
  const mid = min3 + range / 2;
  const halfHeight = drawing.textHeight / 2;
  ctx.textBaseline = `top`;
  ctx.fillText(
    min3.toFixed(digitsPrecision),
    0,
    calcYForValue(min3, series, height) - halfHeight
  );
  ctx.fillText(
    mid.toFixed(digitsPrecision),
    0,
    calcYForValue(mid, series, height) - halfHeight
  );
  ctx.fillText(
    max3.toFixed(digitsPrecision),
    0,
    calcYForValue(max3, series, height) - margin
  );
  ctx.translate(y.textSize + margin, 0);
};
var drawYLine = (plotSize, series, drawing) => {
  if (series === void 0) throw new Error(`series undefined`);
  const { ctx, y } = drawing;
  const { height } = plotSize;
  const min3 = y.labelRange ? y.labelRange[0] : series.min;
  const max3 = y.labelRange ? y.labelRange[1] : series.max;
  const minPos = calcYForValue(min3, series, height);
  const maxPos = calcYForValue(max3, series, height);
  ctx.translate(y.lineWidth, 0);
  ctx.lineWidth = y.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, minPos);
  ctx.lineTo(0, maxPos);
  ctx.strokeStyle = series.colour;
  if (y.colour) ctx.strokeStyle = y.colour;
  ctx.stroke();
  ctx.translate(y.lineWidth, 0);
};
var drawLegend = (series, drawing, size) => {
  const { ctx } = drawing;
  const lineSampleWidth = 10;
  let x = 0;
  const lineY = drawing.margin * 3;
  const textY = drawing.margin;
  ctx.lineWidth = drawing.lineWidth;
  for (const s of series) {
    ctx.moveTo(x, lineY);
    ctx.strokeStyle = s.colour;
    ctx.lineTo(x + lineSampleWidth, lineY);
    ctx.stroke();
    x += lineSampleWidth + drawing.margin;
    let label = s.name;
    if (s.lastValue)
      label += ` ` + s.lastValue.toFixed(drawing.digitsPrecision);
    const labelSize = ctx.measureText(label);
    ctx.fillStyle = s.colour;
    ctx.fillText(label, x, textY);
    x += labelSize.width;
  }
};
var drawXAxis = (width, yPos, drawing) => {
  const { ctx, x, y } = drawing;
  if (!x.showLine) return;
  if (x.colour) ctx.strokeStyle = x.colour;
  ctx.lineWidth = x.lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, yPos);
  ctx.lineTo(width, yPos);
  ctx.stroke();
};
var drawSeriesData = (series, values, plotSize, drawing, leadingEdgeIndex) => {
  const { ctx, lineWidth, translucentPlot = false, margin, x: xAxis } = drawing;
  const style = drawing.style ?? `connected`;
  const height = plotSize.height - margin;
  let dataXScale = 1;
  if (xAxis.scaleRange) {
    const xAxisRange = xAxis.scaleRange[1] - xAxis.scaleRange[0];
    dataXScale = plotSize.width / xAxisRange;
  } else {
    dataXScale = drawing.capacity === 0 ? plotSize.width / values.length : plotSize.width / drawing.capacity;
  }
  const incrementBy = drawing.coalesce ? dataXScale < 0 ? Math.floor(1 / dataXScale) : 1 : 1;
  let x = 0;
  let leadingEdge;
  if (drawing.debug) {
    ctx.strokeStyle = `green`;
    ctx.strokeRect(0, 0, plotSize.width, plotSize.height);
  }
  const colourTransform = (c) => {
    if (translucentPlot) return opacity(c, 0.2);
    return c;
  };
  if (style === `dots`) {
    ctx.fillStyle = colourTransform(series.colour);
  } else if (style === `none`) ; else {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colourTransform(series.colour);
  }
  for (let index = 0; index < values.length; index += incrementBy) {
    const y = calcYForValue(values[index], series, height) - 1;
    if (style === `dots`) {
      ctx.beginPath();
      ctx.arc(x, y, lineWidth, 0, piPi2);
      ctx.fill();
    } else if (style === `none`) ; else {
      if (index == 0) ctx.moveTo(x, y);
      ctx.lineTo(x, y);
    }
    if (index === leadingEdgeIndex) {
      leadingEdge = { x, y };
      series.lastValue = values[index];
    }
    x += dataXScale;
  }
  if (style === `connected`) {
    ctx.stroke();
  }
  if (leadingEdge !== void 0 && drawing.leadingEdgeDot) {
    ctx.beginPath();
    ctx.fillStyle = colourTransform(series.colour);
    ctx.arc(leadingEdge.x, leadingEdge.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var calcYForValue = (v, series, height) => (1 - (v - series.min) / series.range) * height;
var calcSizing = (margin, x, y, showLegend) => {
  let fromLeft = margin;
  if (y.showLabels) fromLeft += y.textSize;
  if (y.showLine) fromLeft += y.lineWidth;
  if (y.showLabels || y.showLine) fromLeft += margin + margin;
  const fromRight = margin;
  const fromTop = margin + margin;
  let fromBottom = margin + margin;
  fromBottom += x.showLabels ? x.textSize : margin;
  if (x.showLine) fromBottom += x.lineWidth;
  if (x.showLabels || x.showLine) fromBottom += margin;
  if (showLegend) fromBottom += x.textSize;
  return {
    left: fromLeft,
    right: fromRight,
    top: fromTop,
    bottom: fromBottom
  };
};
var plotSizeFromBounds = (bounds, opts) => {
  const { width, height } = bounds;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width - sizing.left - sizing.right,
    height: height - sizing.top - sizing.bottom
  };
};
var canvasSizeFromPlot = (plot2, opts) => {
  const { width, height } = plot2;
  const sizing = calcSizing(opts.margin, opts.x, opts.y, opts.showLegend);
  return {
    width: width + sizing.left + sizing.right,
    height: height + sizing.top + sizing.bottom
  };
};
var plot = (parentElementOrQuery, opts) => {
  if (parentElementOrQuery === null)
    throw new Error(`parentElOrQuery is null. Expected string or element`);
  const parentEl = resolveEl(parentElementOrQuery);
  let canvasEl;
  let destroyCanvasEl = true;
  let plotSize = opts.plotSize;
  let canvasSize;
  if (parentEl.nodeName === `CANVAS`) {
    canvasEl = parentEl;
    destroyCanvasEl = false;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  } else {
    canvasEl = document.createElement(`CANVAS`);
    parentEl.append(canvasEl);
    plotSize = opts.plotSize;
    canvasSize = { width: canvasEl.width, height: canvasEl.height };
  }
  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event2) => {
    pointer.x = event2.offsetX;
    pointer.y = event2.offsetY;
  };
  canvasEl.addEventListener(`pointermove`, onPointerMove);
  const ctx = canvasEl.getContext(`2d`);
  const capacity = opts.capacity ?? 10;
  const buffer = capacity > 0 ? ofCircularMutable({ capacity }) : ofArrayMutable();
  const metrics = ctx.measureText(`Xy`);
  const coalesce = opts.coalesce ?? true;
  if (ctx === null) throw new Error(`Drawing context not available`);
  let xAxis = defaultAxis(`x`);
  if (opts.x) xAxis = { ...xAxis, ...opts.x };
  let yAxis = defaultAxis(`y`);
  if (opts.y) yAxis = { ...yAxis, ...opts.y };
  let drawingOpts = {
    ...opts,
    y: yAxis,
    x: xAxis,
    pointer,
    capacity,
    coalesce,
    plotSize,
    canvasSize,
    ctx,
    textHeight: opts.textHeight ?? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    style: opts.style ?? `connected`,
    defaultSeriesColour: opts.defaultSeriesColour ?? `yellow`,
    margin: 3,
    clearCanvas: true,
    leadingEdgeDot: true,
    debug: opts.debug ?? false,
    digitsPrecision: opts.digitsPrecision ?? 2,
    lineWidth: opts.lineWidth ?? 2,
    showLegend: opts.showLegend ?? false
  };
  if (plotSize) {
    const canvasSize2 = canvasSizeFromPlot(plotSize, drawingOpts);
    canvasEl.width = canvasSize2.width;
    canvasEl.height = canvasSize2.height;
    drawingOpts.canvasSize = canvasSize2;
  }
  if (opts.autoSizeCanvas) {
    parentSizeCanvas(canvasEl, (args) => {
      const bounds = args.bounds;
      drawingOpts = {
        ...drawingOpts,
        plotSize: plotSizeFromBounds(bounds, drawingOpts),
        canvasSize: bounds
      };
      draw(buffer, drawingOpts);
    });
  }
  return {
    drawValue: (index) => {
      drawValue(index, buffer, drawingOpts);
    },
    dispose: () => {
      canvasEl.removeEventListener(`pointermove`, onPointerMove);
      if (destroyCanvasEl) canvasEl.remove();
    },
    add: (value, series = ``, skipDrawing = false) => {
      add(buffer, value, series);
      if (skipDrawing) return;
      draw(buffer, drawingOpts);
    },
    draw: () => {
      draw(buffer, drawingOpts);
    },
    clear: () => {
      buffer.clear();
    }
  };
};

// src/visual/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Visuals: {
        SceneGraph: SceneGraph_exports,
        Plot2: Plot2_exports,
        Drawing: Drawing_exports,
        Svg: Svg_exports,
        Palette: Palette_exports,
        Colour: Colour_exports,
        Video: Video_exports
      }
    };
  }
} catch {
}

// src/dom/index.ts
var dom_exports = {};
__export(dom_exports, {
  CanvasHelper: () => CanvasHelper,
  DataDisplay: () => DataDisplay,
  DataTable: () => DataTable_exports,
  DragDrop: () => DragDrop_exports,
  Forms: () => Forms_exports,
  Rx: () => DomRx_exports,
  Variables: () => CssVariables_exports,
  byId: () => byId,
  cardinalPosition: () => cardinalPosition,
  clear: () => clear,
  copyToClipboard: () => copyToClipboard,
  createAfter: () => createAfter,
  createIn: () => createIn,
  cycleCssClass: () => cycleCssClass,
  defaultErrorHandler: () => defaultErrorHandler,
  el: () => el,
  elRequery: () => elRequery,
  fullSizeCanvas: () => fullSizeCanvas,
  fullSizeElement: () => fullSizeElement,
  getTranslation: () => getTranslation,
  inlineConsole: () => inlineConsole,
  insertSorted: () => insertSorted,
  log: () => log,
  parentSize: () => parentSize,
  parentSizeCanvas: () => parentSizeCanvas,
  pointScaler: () => pointScaler,
  pointerVisualise: () => pointerVisualise,
  positionFn: () => positionFn,
  positionFromMiddle: () => positionFromMiddle,
  positionRelative: () => positionRelative,
  query: () => query,
  reconcileChildren: () => reconcileChildren,
  resolveEl: () => resolveEl,
  resolveEls: () => resolveEls,
  setCssClass: () => setCssClass,
  setCssDisplay: () => setCssDisplay,
  setCssToggle: () => setCssToggle,
  setHtml: () => setHtml,
  setProperty: () => setProperty,
  setText: () => setText,
  viewportToSpace: () => viewportToSpace
});

// src/dom/CanvasHelper.ts
var CanvasHelper = class extends SimpleEventEmitter {
  el;
  opts;
  #scaler;
  #currentSize = empty;
  #ctx;
  constructor(domQueryOrEl, opts = {}) {
    super();
    if (!domQueryOrEl) throw new Error(`Param 'domQueryOrEl' is null or undefined`);
    this.el = resolveEl(domQueryOrEl);
    if (this.el.nodeName !== `CANVAS`) {
      throw new Error(`Expected CANVAS HTML element. Got: ${this.el.nodeName}`);
    }
    this.opts = {
      fill: opts.fill ?? `none`,
      height: opts.height ?? -1,
      width: opts.width ?? -1,
      zIndex: opts.zIndex ?? -1,
      scaleBy: opts.scaleBy ?? `both`,
      onResize: opts.onResize,
      clearOnResize: opts.clearOnResize ?? true,
      draw: opts.draw,
      skipCss: opts.skipCss ?? false
    };
    this.#scaler = scaler(`both`);
    this.#init();
  }
  #getContext(reset = false) {
    if (this.#ctx === void 0 || reset) {
      const ratio = this.ratio;
      const c = this.el.getContext(`2d`);
      if (c === null) throw new Error(`Could not create drawing context`);
      this.#ctx = c;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.scale(ratio, ratio);
    }
    return this.#ctx;
  }
  #setLogicalSize(logicalSize) {
    guard3(logicalSize, `logicalSize`);
    const ratio = window.devicePixelRatio || 1;
    this.#scaler = scaler(this.opts.scaleBy, logicalSize);
    const pixelScaled = multiply4(logicalSize, ratio, ratio);
    this.el.width = pixelScaled.width;
    this.el.height = pixelScaled.height;
    this.el.style.width = logicalSize.width.toString() + `px`;
    this.el.style.height = logicalSize.height.toString() + `px`;
    this.#getContext(true);
    if (this.opts.clearOnResize) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.#currentSize = logicalSize;
    const r = this.opts.onResize;
    if (r) {
      setTimeout(() => {
        r(this.ctx, this.size, this);
      }, 100);
    }
    this.fireEvent(`resize`, { ctx: this.ctx, size: this.#currentSize, helper: this });
  }
  /**
   * Notified that parent has changed size
   * @returns 
   */
  #onParentResize() {
    const parentEl = this.el.parentElement;
    if (!parentEl) return;
    const bounds = parentEl.getBoundingClientRect();
    this.#setLogicalSize({ width: bounds.width, height: bounds.height });
  }
  /**
   * Notified that window has changed size
   */
  #onWindowResize() {
    this.#setLogicalSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  #init() {
    switch (this.opts.fill) {
      case `viewport`: {
        if (!this.opts.skipCss) {
          this.el.style.position = `absolute`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
          this.el.style.zIndex = this.opts.zIndex.toString();
        }
        const r = windowResize();
        r.onValue(() => {
          this.#onWindowResize();
        });
        this.#onWindowResize();
        break;
      }
      case `parent`: {
        const parentEl = this.el.parentElement;
        if (!parentEl) throw new Error(`Canvas element has no parent?!`);
        if (!this.opts.skipCss) {
          this.el.style.position = `relative`;
          this.el.style.left = `0px`;
          this.el.style.top = `0px`;
        }
        const r = windowResize();
        r.onValue(() => {
          this.#onParentResize();
        });
        this.#onParentResize();
        break;
      }
      case `none`: {
        let { width, height } = this.el.getBoundingClientRect();
        if (this.opts.width > 0) width = this.opts.width;
        if (this.opts.height > 0) height = this.opts.height;
        const desiredSize = { width, height };
        this.#setLogicalSize(desiredSize);
        break;
      }
      default: {
        throw new Error(`Unknown 'fill' value. Expecting: 'none', 'viewport' or 'fill'`);
      }
    }
    const d = this.opts.draw;
    if (d) {
      const sched = () => {
        d(this.ctx, this.#currentSize, this);
        requestAnimationFrame(sched);
      };
      setTimeout(() => {
        sched();
      }, 100);
    }
  }
  /**
   * Clears the canvas.
   * 
   * Shortcut for:
   * `this.ctx.clearRect( 0, 0, this.width, this.height)`
   */
  clear() {
    if (this.#ctx) {
      this.#ctx.clearRect(0, 0, this.width, this.height);
    }
  }
  /**
   * Gets the drawing context
   */
  get ctx() {
    if (this.#ctx === void 0) throw new Error(`Context not available`);
    return this.#getContext();
  }
  /**
   * Gets the logical width of the canvas
   * See also: {@link height}, {@link size}
   */
  get width() {
    return this.#currentSize.width;
  }
  /**
   * Gets the logical height of the canvas
   * See also: {@link width}, {@link size}
   */
  get height() {
    return this.#currentSize.height;
  }
  /**
   * Gets the logical size of the canvas
   * See also: {@link width}, {@link height}
   */
  get size() {
    return this.#currentSize;
  }
  /**
   * Gets the current scaling ratio being used
   * to compensate for high-DPI display
   */
  get ratio() {
    return window.devicePixelRatio || 1;
  }
  /**
   * Returns the width or height, whichever is smallest
   */
  get dimensionMin() {
    return Math.min(this.width, this.height);
  }
  /**
   * Returns the width or height, whichever is largest
   */
  get dimensionMax() {
    return Math.max(this.width, this.height);
  }
  /**
   * Returns a {@link Scaler} that converts from relative to absolute
   * coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x600
   * toAbsolute({ x: 1, y: 1 });      // { x: 800, y: 600}
   * toAbsolute({ x: 0, y: 0 });      // { x: 0, y: 0}
   * toAbsolute({ x: 0.5, y: 0.5 });  // { x: 400, y: 300}
   * ```
   */
  get toAbsolute() {
    return this.#scaler.abs;
  }
  /**
   * Returns a {@link Scaler} that converts from absolute
   * to relative coordinates.
   * This is based on the canvas size.
   * 
   * ```js
   * // Assuming a canvas of 800x500
   * toRelative({ x: 800, y:600 });  // { x: 1,   y: 1 }
   * toRelative({ x: 0,   y: 0 });   // { x: 0,   y: 0 }
   * toRelative({ x: 400, y: 300 }); // { x: 0.5, y: 0.5 }
   * ```
   */
  get toRelative() {
    return this.#scaler.rel;
  }
  /**
   * Gets the center coordinate of the canvas
   */
  get center() {
    return { x: this.width / 2, y: this.height / 2 };
  }
};

// src/dom/Css.ts
var setCssClass = (selectors, value, cssClass) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0) return;
  for (const element of elements2) {
    if (value) element.classList.add(cssClass);
    else element.classList.remove(cssClass);
  }
};
var setCssToggle = (selectors, cssClass) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0) return;
  for (const element of elements2) {
    element.classList.toggle(cssClass);
  }
};
var setCssDisplay = (selectors, value) => {
  const elements2 = resolveEls(selectors);
  if (elements2.length === 0) return;
  for (const element of elements2) {
    element.style.display = value;
  }
};

// src/dom/CssVariables.ts
var CssVariables_exports = {};
__export(CssVariables_exports, {
  parseAsAttributes: () => parseAsAttributes,
  setFromVariables: () => setFromVariables
});
var parseAsAttributes = (options) => {
  return options.map((opt) => {
    let defaultValue;
    if (Array.isArray(opt)) {
      defaultValue = opt[1];
      opt = opt[0];
    }
    const dash = opt.indexOf(`-`);
    if (dash < 0) throw new Error(`Simple expression expects form of: 'elementid-attribute'`);
    return {
      variable: opt,
      attribute: opt.slice(dash + 1),
      id: opt.slice(0, dash),
      defaultValue
    };
  });
};
var setFromVariables = (context, ...options) => {
  const contextEl = resolveEl(context);
  const style = window.getComputedStyle(contextEl);
  for (const opt of options) {
    const variable = afterMatch(opt.variable, `--`);
    let v = style.getPropertyValue(`--${variable}`);
    if (v === null || v.length === 0) {
      if (opt.defaultValue === void 0) {
        continue;
      } else {
        v = opt.defaultValue;
      }
    }
    let query2;
    let els;
    if (`query` in opt && opt.query !== void 0) {
      query2 = opt.query;
    } else if (`id` in opt && opt.id !== void 0) {
      query2 = `#${opt.id}`;
    } else if (`element` in opt && opt.element !== void 0) {
      els = Array.isArray(opt.element) ? opt.element : [opt.element];
    }
    if (query2 === void 0) {
      if (els === void 0) {
        throw new Error(`Missing query, id or element`);
      }
    } else {
      els = [...contextEl.querySelectorAll(query2)];
    }
    if (els === null) continue;
    if (els === void 0) continue;
    if (opt.attribute) {
      for (const el2 of els) {
        el2.setAttribute(opt.attribute, v);
      }
    } else if (opt.field) {
      for (const el2 of els) {
        el2[opt.field] = v;
      }
    } else {
      throw new Error(`Neither 'attribute' or 'field' to set is defined in option (${JSON.stringify(opt)})`);
    }
  }
};

// src/dom/DataTable.ts
var DataTable_exports = {};
__export(DataTable_exports, {
  fromList: () => fromList,
  fromObject: () => fromObject
});
var import_json5 = __toESM(require_dist(), 1);
var toHtmlSimple = (v, options) => {
  if (v === null) return `(null)`;
  if (v === void 0) return `(undefined)`;
  if (typeof v === `boolean`) return v ? `true` : `false`;
  if (typeof v === `string`) return `"${v}"`;
  if (typeof v === `number`) {
    let vAsNumber = v;
    if (options.roundNumbers !== void 0) vAsNumber = round(options.roundNumbers, v);
    if (options.precision !== void 0) return vAsNumber.toFixed(options.precision);
    return vAsNumber.toString();
  }
  if (typeof v === `object`) return toTableSimple(v, options);
  return import_json5.default.stringify(v);
};
var toTableSimple = (v, options) => {
  let html = `<div style="display:grid; grid-template-columns: repeat(2, 1fr)">`;
  for (const entry of Object.entries(v)) {
    const value = toHtmlSimple(entry[1], options);
    html += `<div class="label" style="display:table-cell">${entry[0]}</div>
      <div class="data" style="display:table-cell">${value}</div>`;
  }
  html += `</div>`;
  return html;
};
var fromList = (parentOrQuery, data) => {
  const parent = resolveEl(parentOrQuery);
  let container = document.createElement(
    `DIV`
  );
  parent.append(container);
  const remove2 = () => {
    if (!container) return false;
    container.remove();
    container = void 0;
    return true;
  };
  const update = (data2) => {
    const seenTables = /* @__PURE__ */ new Set();
    for (const [key, value] of data2) {
      const tKey = `table-${key}`;
      seenTables.add(tKey);
      let t = parent.querySelector(`#${tKey}`);
      if (t === null) {
        t = document.createElement(`table`);
        if (!t) throw new Error(`Could not create table element`);
        t.id = tKey;
        parent.append(t);
      }
      updateElement(t, value);
    }
    const tables = Array.from(parent.querySelectorAll(`table`));
    for (const t of tables) {
      if (!seenTables.has(t.id)) {
        t.remove();
      }
    }
  };
  if (data) update(data);
  return { update, remove: remove2 };
};
var updateElement = (t, data, opts = {}) => {
  const precision = opts.precision ?? 2;
  const idPrefix = opts.idPrefix ?? ``;
  const objectsAsTables = opts.objectsAsTables ?? false;
  if (data === void 0) {
    t.innerHTML = ``;
    return;
  }
  const seenRows = /* @__PURE__ */ new Set();
  for (const [key, value] of Object.entries(data)) {
    const domKey = `${idPrefix}-row-${key}`;
    seenRows.add(domKey);
    let rowEl = t.querySelector(`tr[data-key='${domKey}']`);
    if (rowEl === null) {
      rowEl = document.createElement(`tr`);
      t.append(rowEl);
      rowEl.setAttribute(`data-key`, domKey);
      const keyEl = document.createElement(`td`);
      keyEl.textContent = key;
      keyEl.classList.add(`label`);
      rowEl.append(keyEl);
    }
    let valEl = rowEl.querySelector(`td[data-key='${domKey}-val']`);
    if (valEl === null) {
      valEl = document.createElement(`td`);
      valEl.classList.add(`data`);
      valEl.setAttribute(`data-key`, `${domKey}-val`);
      rowEl.append(valEl);
    }
    let valueHTML;
    if (opts.formatter) {
      valueHTML = opts.formatter(value, key);
    }
    if (valueHTML === void 0) {
      if (typeof value === `object`) {
        valueHTML = objectsAsTables ? toTableSimple(value, opts) : import_json5.default.stringify(value);
      } else if (typeof value === `number`) {
        valueHTML = opts.roundNumbers ? Math.round(value).toString() : value.toFixed(precision);
      } else if (typeof value === `boolean`) {
        valueHTML = value ? `true` : `false`;
      } else if (typeof value === `string`) {
        valueHTML = `"${value}"`;
      } else {
        valueHTML = JSON.stringify(value);
      }
    }
    valEl.innerHTML = valueHTML;
  }
  const rows = Array.from(t.querySelectorAll(`tr`));
  for (const r of rows) {
    const key = r.getAttribute(`data-key`);
    if (!seenRows.has(key)) {
      r.remove();
    }
  }
};
var fromObject = (parentOrQuery, data, opts) => {
  const parent = resolveEl(parentOrQuery);
  const idPrefix = opts?.idPrefix ?? Math.floor(Math.random() * 1e3).toString();
  let t = document.createElement(`table`);
  parent.append(t);
  const remove2 = () => {
    if (!t) return false;
    t.remove();
    t = void 0;
    return true;
  };
  if (data) updateElement(t, data, opts);
  const update = (d) => {
    if (!t) throw new Error(`Table disposed`);
    updateElement(t, d, { ...opts, idPrefix });
  };
  return { remove: remove2, update };
};

// src/dom/DataDisplay.ts
var DataDisplay = class {
  dataTable;
  /**
   * Constructor
   * @param options Options
   */
  constructor(options = {}) {
    const theme = options.theme ?? `dark`;
    const existing = document.querySelector(`#ixfx-data-display`);
    if (existing !== null) throw new Error(`DataDisplay already loaded on this page`);
    const container = document.createElement(`div`);
    container.id = `ixfx-data-display`;
    container.classList.add(`theme-${theme}`);
    const css = document.createElement(`style`);
    css.textContent = `
    #ixfx-data-display {
      background: white;
      color: black;
      border: 2px solid hsl(0deg 0.61% 90%);
      border-radius: 4px;
      z-index: 1000;
      opacity: 40%;
      padding: 1em;
      font-family: monospace;
      position: fixed;
      right: 1em;
      top: 1em;
    }
    #ixfx-data-display.theme-dark {
      background: black;
      color: white;
      border: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display:hover {
      opacity: 100%;
    }
    #ixfx-data-display table {
      border-collapse: collapse;
    }
    #ixfx-data-display tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 90%);
    }
    #ixfx-data-display.dark tr:not(:last-child) {
      border-bottom: 2px solid hsl(0deg 0.61% 10%);
    }
    #ixfx-data-display td {
      padding-bottom: 0.4em;
      padding-top: 0.4em;
    }
    #ixfx-data-display .label {
      color: hsl(0deg 0.61% 60%);
      text-align: right;
      padding-right: 0.5em;
    }
    #ixfx-data-display.theme-dark .label {
      color: gray;
    }
    `;
    container.style.display = `inline-block`;
    document.body.append(css);
    document.body.append(container);
    this.dataTable = fromObject(container, void 0, {
      objectsAsTables: true,
      roundNumbers: 2
    });
  }
  update(data) {
    this.dataTable.update(data);
  }
};

// src/dom/DragDrop.ts
var DragDrop_exports = {};
__export(DragDrop_exports, {
  draggable: () => draggable
});
var draggable = (elem, listener) => {
  let initial = point_exports.Placeholder;
  let token;
  const onParentClick = () => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    }
  };
  const onElementClick = (event2) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (selected) {
      elem.classList.remove(`drag-sel`);
    } else {
      elem.classList.add(`drag-sel`);
    }
    event2.stopPropagation();
  };
  elem.ownerDocument.addEventListener(`click`, onParentClick);
  elem.addEventListener(`click`, onElementClick);
  const dragCleanup = () => {
    elem.classList.remove(`drag-progress`);
    elem.ownerDocument.removeEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.removeEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.removeEventListener(`pointercancel`, onDragCancel);
  };
  const dispose = () => {
    console.log(`drag dispose`);
    if (elem.classList.contains(`drag-progress`)) {
      onDragCancel(void 0, `dispose`);
    } else {
      dragCleanup();
    }
    elem.ownerDocument.removeEventListener(`click`, onParentClick);
    elem.removeEventListener(`click`, onElementClick);
  };
  const onPointerMove = (moveEvent) => {
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
    const offset = point_exports.isPlaceholder(initial) ? { x: moveEvent.offsetX, y: moveEvent.offsetY } : {
      x: moveEvent.x - initial.x,
      y: moveEvent.y - initial.y
    };
    const state = {
      delta: offset,
      initial,
      token
    };
    if (typeof listener.progress !== `undefined` && !listener.progress(state)) {
      onDragCancel(void 0, `discontinued`);
    }
  };
  const onPointerUp = (upEvent) => {
    dragCleanup();
    const offset = {
      x: upEvent.x - initial.x,
      y: upEvent.y - initial.y
    };
    const state = {
      initial,
      token,
      delta: offset
    };
    if (typeof listener.success !== `undefined`) {
      listener.success(state);
    }
  };
  const onDragCancel = (event2, reason = `pointercancel`) => {
    dragCleanup();
    const state = {
      token,
      initial,
      delta: { x: -1, y: -1 }
    };
    if (typeof listener.abort !== `undefined`) {
      listener.abort(reason, state);
    }
  };
  elem.addEventListener(`pointerdown`, (event2) => {
    const selected = elem.classList.contains(`drag-sel`);
    if (!selected) return;
    initial = { x: event2.x, y: event2.y };
    const s = typeof listener.start === `undefined` ? { allow: true, token } : listener.start();
    if (!s.allow) return;
    token = s.token;
    elem.classList.add(`drag-progress`);
    elem.ownerDocument.addEventListener(`pointermove`, onPointerMove);
    elem.ownerDocument.addEventListener(`pointerup`, onPointerUp);
    elem.ownerDocument.addEventListener(`pointercancel`, onDragCancel);
  });
  return dispose;
};

// src/dom/El.ts
var el = (selectors) => {
  const elements2 = resolveEls(selectors);
  const text = setText(elements2);
  const html = setHtml(elements2);
  return {
    text,
    html,
    cssDisplay: (value) => {
      setCssDisplay(elements2, value);
    },
    cssClass: (value, cssClass) => {
      setCssClass(elements2, value, cssClass);
    },
    cssToggle: (cssClass) => {
      setCssToggle(elements2, cssClass);
    },
    el: () => elements2[0],
    els: () => elements2
  };
};
var elRequery = (selectors) => {
};

// src/dom/ElementSizing.ts
var fullSizeElement = (domQueryOrEl, onResized) => {
  const el2 = resolveEl(domQueryOrEl);
  const r = windowResize();
  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    el2.setAttribute(`width`, width.toString());
    el2.setAttribute(`height`, height.toString());
    if (onResized !== void 0) {
      const bounds = {
        min: Math.min(width, height),
        max: Math.max(width, height),
        width,
        height,
        center: {
          x: width / 2,
          y: height / 2
        }
      };
      onResized({ el: el2, bounds });
    }
  };
  r.onValue(update);
  update();
  return r;
};
var parentSize = (domQueryOrEl, onResized, timeoutMs = 100) => {
  const el2 = resolveEl(domQueryOrEl);
  const parent = el2.parentElement;
  if (parent === null) throw new Error(`Element has no parent`);
  const ro = resizeObservable(parent, timeoutMs).onValue(
    (entries) => {
      const entry = entries.find((v) => v.target === parent);
      if (entry === void 0) return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      el2.setAttribute(`width`, `${width}px`);
      el2.setAttribute(`height`, `${height}px`);
      if (onResized !== void 0) {
        const bounds = {
          min: Math.min(width, height),
          max: Math.max(width, height),
          width,
          height,
          center: { x: width / 2, y: height / 2 }
        };
        onResized({ el: el2, bounds });
      }
    }
  );
  return ro;
};

// src/dom/ErrorHandler.ts
var defaultErrorHandler = () => {
  let enabled = true;
  const container = document.createElement(`div`);
  container.style.color = `black`;
  container.style.border = `2px solid red`;
  container.style.backgroundColor = `hsl(0, 80%, 90%)`;
  container.style.padding = `1em`;
  container.style.display = `none`;
  container.style.top = `1em`;
  container.style.left = `1em`;
  container.style.position = `absolute`;
  container.style.fontFamily = `monospace`;
  const messageElement = document.createElement(`div`);
  messageElement.style.maxWidth = `50vw`;
  messageElement.style.maxHeight = `50vh`;
  messageElement.style.overflowY = `scroll`;
  container.innerHTML = `<h1>Error</h1>`;
  container.append(messageElement);
  const styleButton = (b) => {
    b.style.padding = `0.3em`;
    b.style.marginTop = `1em`;
  };
  const buttonClose = document.createElement(`button`);
  buttonClose.textContent = `Close`;
  buttonClose.addEventListener(`click`, () => {
    hide();
  });
  const buttonStop = document.createElement(`button`);
  buttonStop.textContent = `Stop displaying errors`;
  buttonStop.addEventListener(`click`, () => {
    enabled = false;
    hide();
  });
  styleButton(buttonClose);
  styleButton(buttonStop);
  container.append(buttonClose);
  container.append(buttonStop);
  document.body.append(container);
  const show = (ex) => {
    container.style.display = `inline`;
    messageElement.innerHTML += ex.stack ? `<pre>${ex.stack}</pre>` : `<p>${getErrorMessage(ex)}</p>`;
  };
  const hide = () => {
    container.style.display = `none`;
  };
  window.onerror = (message, url, lineNo, colNo, error) => {
    if (enabled) {
      if (error) {
        console.log(error);
        show(error);
      } else {
        console.log(message);
        show(message);
      }
    }
  };
  window.addEventListener(`unhandledrejection`, (event2) => {
    console.log(event2.reason);
    if (enabled) {
      show(event2.reason);
    }
  });
  return { show, hide };
};

// src/dom/ShadowDom.ts
var addShadowCss = (parentEl, styles) => {
  const styleEl = document.createElement(`style`);
  styleEl.textContent = styles;
  let shadowRoot;
  if (parentEl.shadowRoot) {
    shadowRoot = parentEl.shadowRoot;
    shadowRoot.innerHTML = ``;
  } else {
    shadowRoot = parentEl.attachShadow({ mode: `open` });
  }
  shadowRoot.append(styleEl);
  return shadowRoot;
};

// src/dom/Log.ts
var log = (domQueryOrElement, opts = {}) => {
  const {
    capacity = 0,
    monospaced = true,
    timestamp = false,
    collapseDuplicates = true,
    css = ``
  } = opts;
  let added = 0;
  let lastLog;
  let lastLogRepeats = 0;
  const parentElement = resolveEl(domQueryOrElement);
  const fontFamily = monospaced ? `Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace` : `normal`;
  const shadowRoot = addShadowCss(
    parentElement,
    `
  .log {
    font-family: ${fontFamily};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
    word-break: break-word;
  }
  ${css}
  `
  );
  const el2 = document.createElement(`div`);
  el2.className = `log`;
  shadowRoot.append(el2);
  const error = (messageOrError) => {
    const line2 = document.createElement(`div`);
    if (typeof messageOrError === `string`) {
      line2.innerHTML = messageOrError;
    } else if (messageOrError instanceof Error) {
      const stack = messageOrError.stack;
      line2.innerHTML = stack === void 0 ? messageOrError.toString() : stack.toString();
    } else {
      line2.innerHTML = messageOrError;
    }
    line2.classList.add(`error`);
    append(line2);
    lastLog = void 0;
    lastLogRepeats = 0;
  };
  let lastLogTime = 0;
  const warn = (whatToLog = ``) => {
    const element = log2(whatToLog);
    if (!element) return element;
    element.classList.add(`warning`);
    return element;
  };
  const log2 = (whatToLog = ``) => {
    let message;
    const interval = window.performance.now() - lastLogTime;
    if (opts.minIntervalMs && interval < opts.minIntervalMs) return;
    lastLogTime = window.performance.now();
    if (typeof whatToLog === `object`) {
      message = JSON.stringify(whatToLog);
    } else if (whatToLog === void 0) {
      message = `(undefined)`;
    } else if (whatToLog === null) {
      message = `(null)`;
    } else if (typeof whatToLog === `number`) {
      if (Number.isNaN(message)) message = `(NaN)`;
      message = whatToLog.toString();
    } else {
      message = whatToLog;
    }
    if (message.length === 0) {
      const rule = document.createElement(`hr`);
      lastLog = void 0;
      append(rule);
    } else if (message === lastLog && collapseDuplicates) {
      const lastElement = el2.firstElementChild;
      let lastBadge = lastElement.querySelector(`.badge`);
      if (lastBadge === null) {
        lastBadge = document.createElement(`div`);
        lastBadge.className = `badge`;
        lastElement.insertAdjacentElement(`beforeend`, lastBadge);
      }
      if (lastElement !== null) {
        lastBadge.textContent = (++lastLogRepeats).toString();
      }
      return lastElement;
    } else {
      const line2 = document.createElement(`div`);
      line2.textContent = message;
      append(line2);
      lastLog = message;
      return line2;
    }
  };
  const append = (line2) => {
    if (timestamp) {
      const wrapper = document.createElement(`div`);
      const timestamp2 = document.createElement(`div`);
      timestamp2.className = `timestamp`;
      timestamp2.textContent = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      wrapper.append(timestamp2, line2);
      line2.classList.add(`msg`);
      wrapper.classList.add(`line`);
      line2 = wrapper;
    } else {
      line2.classList.add(`line`, `msg`);
    }
    if (opts.reverse) {
      el2.append(line2);
    } else {
      el2.insertBefore(line2, el2.firstChild);
    }
    if (capacity > 0 && ++added > capacity * 2) {
      while (added > capacity) {
        el2.lastChild?.remove();
        added--;
      }
    }
    if (opts.reverse) {
      el2.scrollTop = el2.scrollHeight;
    }
    lastLogRepeats = 0;
  };
  const clear2 = () => {
    el2.innerHTML = ``;
    lastLog = void 0;
    lastLogRepeats = 0;
    added = 0;
  };
  const dispose = () => {
    el2.remove();
  };
  return {
    error,
    log: log2,
    warn,
    append,
    clear: clear2,
    dispose,
    get isEmpty() {
      return added === 0;
    }
  };
};

// src/dom/InlineConsole.ts
var inlineConsole = (opts = {}) => {
  const original = {
    log: console.log,
    error: console.error,
    warn: console.warn
  };
  const logElement = document.createElement(`DIV`);
  logElement.id = `ixfx-log`;
  logElement.style.position = `fixed`;
  logElement.style.left = `0px`;
  logElement.style.top = `0px`;
  logElement.style.pointerEvents = `none`;
  logElement.style.display = `none`;
  document.body.prepend(logElement);
  const logger = log(logElement, opts);
  const visibility = (show) => {
    logElement.style.display = show ? `block` : `none`;
  };
  console.error = (message, ...optionalParameters) => {
    logger.error(message);
    if (optionalParameters.length > 0) {
      logger.error(optionalParameters);
    }
    original.error(message, ...optionalParameters);
    visibility(true);
  };
  console.warn = (message, ...optionalParameters) => {
    logger.warn(message);
    if (optionalParameters.length > 0) {
      logger.warn(optionalParameters);
    }
    visibility(true);
  };
  console.log = (message, ...optionalParameters) => {
    logger.log(message);
    if (optionalParameters.length > 0) {
      logger.log(optionalParameters);
    }
    original.log(message, ...optionalParameters);
    visibility(true);
  };
  window.onerror = (event2, source, lineno, _colno, error) => {
    const abbreviatedSource = source === void 0 ? `` : afterMatch(source, `/`, { fromEnd: true });
    const eventString = getErrorMessage(error);
    logger.error(eventString + ` (${abbreviatedSource}:${lineno})`);
    visibility(true);
  };
};

// src/dom/PointerVisualise.ts
var pointerVisualise = (elOrQuery, opts = {}) => {
  const touchRadius = opts.touchRadius ?? 45;
  const mouseRadius = opts.touchRadius ?? 20;
  const trace = opts.trace ?? false;
  const hue = opts.hue ?? 100;
  const startFillStyle = `hsla(${hue}, 100%, 10%, 10%)`;
  let currentHue = hue;
  const el2 = resolveEl(elOrQuery);
  const tracker = pointsTracker({
    storeIntermediate: trace
  });
  const svg = document.createElementNS(
    `http://www.w3.org/2000/svg`,
    `svg`
  );
  svg.id = `pointerVis`;
  svg.style.zIndex = `-1000`;
  svg.style.position = `fixed`;
  svg.style.top = `0`;
  svg.style.left = `0`;
  svg.style.width = `100%`;
  svg.style.height = `100%`;
  svg.style.boxSizing = `border-box`;
  svg.style.border = `3px solid red`;
  svg.style.pointerEvents = `none`;
  svg.style.touchAction = `none`;
  fullSizeElement(svg);
  let pointerCount = 0;
  const lostPointer = (event2) => {
    const id = event2.pointerId.toString();
    tracker.delete(id);
    currentHue = hue;
    svg.querySelector(`#pv-start-${id}`)?.remove();
    for (let index = 0; index < pointerCount + 10; index++) {
      svg.querySelector(`#pv-progress-${id}-${index}`)?.remove();
    }
    pointerCount = 0;
  };
  const trackPointer = async (event2) => {
    const id = event2.pointerId.toString();
    const pt = { x: event2.x, y: event2.y };
    const type = event2.pointerType;
    if (event2.type === `pointermove` && !tracker.has(id)) {
      return;
    }
    const info = await tracker.seen(event2.pointerId.toString(), { x: event2.clientX, y: event2.clientY });
    if (info.values.length === 1) {
      const el3 = SvgElements_exports.circle(
        {
          ...info.values[0],
          radius: type === `touch` ? touchRadius : mouseRadius
        },
        svg,
        {
          fillStyle: startFillStyle
        },
        `#pv-start-${id}`
      );
      el3.style.pointerEvents = `none`;
      el3.style.touchAction = `none`;
    }
    const fillStyle = `hsla(${currentHue}, 100%, 50%, 50%)`;
    const el22 = SvgElements_exports.circle(
      { ...pt, radius: type === `touch` ? touchRadius : mouseRadius },
      svg,
      {
        fillStyle
      },
      `#pv-progress-${id}-${info.values.length}`
    );
    el22.style.pointerEvents = `none`;
    el22.style.touchAction = `none`;
    currentHue += 1;
    pointerCount = info.values.length;
  };
  document.body.append(svg);
  el2.addEventListener(`pointerdown`, trackPointer);
  el2.addEventListener(`pointermove`, trackPointer);
  el2.addEventListener(`pointerup`, lostPointer);
  el2.addEventListener(`pointerleave`, lostPointer);
  el2.addEventListener(`contextmenu`, (event2) => {
    event2.preventDefault();
  });
};

// src/dom/Query.ts
async function* query(queryOrElement, options = {}) {
  if (typeof queryOrElement === `string`) {
    return query([queryOrElement], options);
  } else if (typeof queryOrElement === `object` && `nodeName` in queryOrElement) {
    return query([queryOrElement], options);
  }
  const ensureUnique = options ?? false;
  const isUnique = ensureUnique ? trackUniqueInstances() : (_) => true;
  if (Array.isArray(queryOrElement)) {
    for (const item of queryOrElement) {
      if (typeof item === `string`) {
        for (const element of document.querySelectorAll(item)) {
          const elementProper = element;
          if (isUnique(elementProper)) {
            yield elementProper;
          }
        }
      } else {
        if (isUnique(item)) {
          yield item;
        }
      }
    }
  } else {
    for await (const item of queryOrElement) {
      if (typeof item === `string`) {
        for (const element of document.querySelectorAll(item)) {
          if (isUnique(element)) {
            yield element;
          }
        }
      } else {
        if (isUnique(item)) {
          yield item;
        }
      }
    }
  }
}

// src/dom/Util.ts
var import_json52 = __toESM(require_dist(), 1);
var pointScaler = (reference = `viewport`) => {
  switch (reference) {
    case `viewport`: {
      return (a, b) => {
        const pt = getPointParameter2(a, b);
        return Object.freeze({
          x: pt.x / window.innerWidth,
          y: pt.y / window.innerHeight
        });
      };
    }
    case `screen`: {
      return (a, b) => {
        const pt = getPointParameter2(a, b);
        return Object.freeze({
          x: pt.x / screen.width,
          y: pt.y / screen.height
        });
      };
    }
    case `document`: {
      return (a, b) => {
        const pt = getPointParameter2(a, b);
        return Object.freeze({
          x: pt.x / document.body.scrollWidth,
          y: pt.y / document.body.scrollHeight
        });
      };
    }
    default: {
      throw new Error(
        `Unknown 'reference' parameter: ${JSON.stringify(reference)}`
      );
    }
  }
};
var positionFn = (domQueryOrEl, opts = {}) => {
  const targetSpace = opts.target ?? `viewport`;
  const relative = opts.relative ?? false;
  const anchor = opts.anchor ?? `nw`;
  const el2 = resolveEl(domQueryOrEl);
  const vpToSpace = viewportToSpace(targetSpace);
  if (relative) {
    const s = pointScaler(targetSpace);
    return () => s(vpToSpace(cardinal(el2.getBoundingClientRect(), anchor)));
  } else {
    return () => vpToSpace(cardinal(el2.getBoundingClientRect(), anchor));
  }
};
var cardinalPosition = (domQueryOrEl, anchor = `nw`) => {
  const el2 = resolveEl(domQueryOrEl);
  return cardinal(el2.getBoundingClientRect(), anchor);
};
var positionRelative = (domQueryOrEl, target = `viewport`) => {
  const f = positionFn(domQueryOrEl, { relative: true, target });
  return f();
};
var viewportToSpace = (targetSpace = `viewport`) => {
  switch (targetSpace) {
    case `screen`: {
      return (a, b) => {
        const pt = getPointParameter2(a, b);
        return Object.freeze({
          x: pt.x + window.screenX,
          y: pt.y + window.screenY
        });
      };
    }
    case `document`: {
      return (a, b) => {
        const pt = getPointParameter2(a, b);
        return Object.freeze({
          x: pt.x + window.scrollX,
          y: pt.y + window.scrollY
        });
      };
    }
    case `viewport`: {
      return (a, b) => {
        const pt = getPointParameter2(a, b);
        return Object.freeze({
          x: pt.x,
          y: pt.y
        });
      };
    }
    default: {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Unexpected target coordinate space: ${targetSpace}. Expected: viewport, document or screen`
      );
    }
  }
};
var positionFromMiddle = (domQueryOrEl, relativePos, relativeTo = `window`) => {
  if (!domQueryOrEl) throw new Error(`domQueryOrEl is null or undefined`);
  const el2 = resolveEl(domQueryOrEl);
  const absPosition = multiply2(
    relativePos,
    window.innerWidth,
    window.innerHeight
  );
  const thingRect = el2.getBoundingClientRect();
  const offsetPos = subtract(
    absPosition,
    thingRect.width / 2,
    thingRect.height / 2
  );
  el2.style.transform = `translate(${offsetPos.x}px, ${offsetPos.y}px)`;
};
var cycleCssClass = (el2, list) => {
  if (el2 === null || !el2) return;
  if (!Array.isArray(list)) {
    throw new TypeError(`List should be an array of strings`);
  }
  for (let index = 0; index < list.length; index++) {
    if (el2.classList.contains(list[index])) {
      el2.classList.remove(list[index]);
      if (index + 1 < list.length) {
        el2.classList.add(list[index + 1]);
      } else {
        el2.classList.add(list[0]);
      }
      return;
    }
  }
  el2.classList.add(list[0]);
};
var getTranslation = (domQueryOrEl) => {
  const el2 = resolveEl(domQueryOrEl);
  const style = window.getComputedStyle(el2);
  const matrix = style.transform;
  if (matrix === `none` || typeof matrix === `undefined`) {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  }
  const matrixType = matrix.includes(`3d`) ? `3d` : `2d`;
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(`, `);
  if (matrixType === `2d`) {
    return {
      x: Number.parseFloat(matrixValues[4]),
      y: Number.parseFloat(matrixValues[5]),
      z: 0
    };
  }
  if (matrixType === `3d`) {
    return {
      x: Number.parseFloat(matrixValues[12]),
      y: Number.parseFloat(matrixValues[13]),
      z: Number.parseFloat(matrixValues[14])
    };
  }
  return { x: 0, y: 0, z: 0 };
};
var createAfter = (sibling, tagName) => {
  const el2 = document.createElement(tagName);
  sibling.parentElement?.insertBefore(el2, sibling.nextSibling);
  return el2;
};
var createIn = (parent, tagName) => {
  const el2 = document.createElement(tagName);
  parent.append(el2);
  return el2;
};
var clear = (parent) => {
  let c = parent.lastElementChild;
  while (c) {
    c.remove();
    c = parent.lastElementChild;
  }
};
var copyToClipboard = (object2) => {
  const p = new Promise((resolve, reject) => {
    const string_ = import_json52.default.stringify(object2);
    navigator.clipboard.writeText(JSON.stringify(string_)).then(
      () => {
        resolve(true);
      },
      (error) => {
        console.warn(`Could not copy to clipboard`);
        console.log(string_);
        reject(new Error(error));
      }
    );
  });
  return p;
};
var insertSorted = (parent, element) => {
  const elSort = element.getAttribute(`data-sort`) ?? ``;
  let elAfter;
  let elBefore;
  for (const c of parent.children) {
    const sort = c.getAttribute(`data-sort`) ?? ``;
    if (elSort >= sort) elAfter = c;
    if (elSort <= sort) elBefore = c;
    if (elAfter !== void 0 && elBefore !== void 0) break;
  }
  if (elAfter !== void 0) {
    elAfter.insertAdjacentElement(`afterend`, element);
  } else if (elBefore === void 0) {
    parent.append(element);
  } else {
    elBefore.insertAdjacentElement(`beforebegin`, element);
  }
};
var reconcileChildren = (parentEl, list, createUpdate) => {
  if (parentEl === null) throw new Error(`parentEl is null`);
  if (parentEl === void 0) throw new Error(`parentEl is undefined`);
  const seen = /* @__PURE__ */ new Set();
  for (const [key, value] of list) {
    const id = `c-${key}`;
    const el2 = parentEl.querySelector(`#${id}`);
    const finalEl = createUpdate(value, el2);
    if (el2 !== finalEl) {
      finalEl.id = id;
      parentEl.append(finalEl);
    }
    seen.add(id);
  }
  const prune = [];
  for (const child of parentEl.children) {
    if (!seen.has(child.id)) {
      prune.push(child);
    }
  }
  for (const p of prune) p.remove();
};
var byId = (id) => {
  const element = document.getElementById(id);
  if (element === null) throw new Error(`HTML element with id '${id}' not found`);
  return element;
};

// src/rx/sources/Dom.ts
function domNumberInputValue(targetOrQuery, options = {}) {
  const input = domInputValue(targetOrQuery, options);
  const el2 = input.el;
  const relative = options.relative ?? false;
  const inverted = options.inverted ?? false;
  const rx = transform(input, (v) => {
    return Number.parseFloat(v);
  });
  if (relative) {
    el2.max = inverted ? "0" : "1";
    el2.min = inverted ? "1" : "0";
    if (!el2.hasAttribute(`step`)) {
      el2.step = "0.1";
    }
  }
  el2.type = `range`;
  const set = (value) => {
    input.set(value.toString());
  };
  return {
    ...rx,
    last() {
      return Number.parseFloat(input.last());
    },
    set
  };
}
function domHslInputValue(targetOrQuery, options = {}) {
  const input = domInputValue(targetOrQuery, {
    ...options,
    upstreamFilter(value) {
      return typeof value === `object` ? visual_exports.Colour.toHex(value) : value;
    }
  });
  const rx = transform(input, (v) => {
    return toHsl(v);
  });
  return {
    ...rx,
    last() {
      return toHsl(input.last());
    },
    set(value) {
      input.set(toHex(value));
    }
  };
}
function domInputValue(targetOrQuery, options = {}) {
  const target = typeof targetOrQuery === `string` ? document.querySelector(targetOrQuery) : targetOrQuery;
  if (target === null && typeof targetOrQuery === `string`) throw new Error(`Element query could not be resolved '${targetOrQuery}'`);
  if (target === null) throw new Error(`targetOrQuery is null`);
  const el2 = resolveEl(targetOrQuery);
  const when = options.when ?? `changed`;
  const eventName = when === `changed` ? `change` : `input`;
  const emitInitialValue = options.emitInitialValue ?? false;
  const fallbackValue = options.fallbackValue ?? ``;
  const upstreamSource = options.upstreamSource;
  let upstreamSourceUnsub = () => {
  };
  let attribName = options.attributeName;
  let fieldName = options.fieldName;
  if (fieldName === void 0 && attribName === void 0) {
    attribName = fieldName = `value`;
  }
  const readValue = () => {
    let value;
    if (attribName) {
      value = el2.getAttribute(attribName);
    }
    if (fieldName) {
      value = el2[fieldName];
    }
    if (value === void 0 || value === null) value = fallbackValue;
    return value;
  };
  const setValue = (value) => {
    if (attribName) {
      el2.setAttribute(attribName, value);
    }
    if (fieldName) {
      el2[fieldName] = value;
    }
  };
  const setUpstream = (v) => {
    v = options.upstreamFilter ? options.upstreamFilter(v) : v;
    setValue(v);
  };
  if (upstreamSource) {
    upstreamSourceUnsub = upstreamSource.onValue(setUpstream);
    if (hasLast(upstreamSource)) {
      setUpstream(upstreamSource.last());
    }
  }
  const rxEvents = eventTrigger(el2, eventName, {
    fireInitial: emitInitialValue,
    debugFiring: options.debugFiring ?? false,
    debugLifecycle: options.debugLifecycle ?? false
  });
  const rxValues = transform(rxEvents, (_trigger) => readValue());
  return {
    ...rxValues,
    el: el2,
    last() {
      return readValue();
    },
    set(value) {
      setValue(value);
    },
    dispose(reason) {
      upstreamSourceUnsub();
      rxValues.dispose(reason);
      rxEvents.dispose(reason);
    }
  };
}

// src/rx/sources/FunctionPinged.ts
function pinged(source, callback, options = {}) {
  const closeOnError = options.closeOnError ?? true;
  const lazy = options.lazy ?? `initial`;
  const internalAbort = new AbortController();
  const internalAbortCallback = (reason) => {
    internalAbort.abort(reason);
  };
  let upstreamOff;
  if (options.signal) {
    options.signal.addEventListener(`abort`, (_) => {
      done(`Signal received (${options.signal?.reason})`);
    });
  }
  const events = initStream({
    onFirstSubscribe() {
      if (lazy !== `never` && upstreamOff === void 0) start();
    },
    onNoSubscribers() {
      if (lazy === `very` && upstreamOff !== void 0) {
        upstreamOff();
        upstreamOff = void 0;
      }
    }
  });
  const start = () => {
    upstreamOff = source.on((message) => {
      if (messageIsDoneSignal(message)) {
        done(`Upstream closed`);
      } else if (messageIsSignal(message)) {
        events.signal(message.signal);
      } else if (messageHasValue(message)) {
        void trigger(message.value);
      }
    });
  };
  const done = (reason) => {
    events.dispose(reason);
    if (upstreamOff) upstreamOff();
  };
  const trigger = async (value) => {
    try {
      const v = await callback(value, internalAbortCallback);
      events.set(v);
      if (internalAbort.signal.aborted) {
        done(`callback function aborted (${internalAbort.signal.reason})`);
        return false;
      }
    } catch (error) {
      if (closeOnError) {
        done(`Function error: ${getErrorMessage(error)}`);
        return false;
      } else {
        events.signal(`warn`, getErrorMessage(error));
      }
    }
  };
  if (lazy === `never`) start();
  return events;
}

// src/rx/sources/Number.ts
function number(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set
  };
}

// src/rx/sources/ObjectProxy.ts
var objectProxy = (target) => {
  const rx = object(target);
  const proxy = new Proxy(target, {
    set(target2, p, newValue, _receiver) {
      const isArray = Array.isArray(target2);
      if (isArray && p === `length`) return true;
      if (typeof p === `string`) {
        rx.updateField(p, newValue);
      }
      if (isArray && typeof p === `string`) {
        const pAsNumber = Number.parseInt(p);
        if (!Number.isNaN(pAsNumber)) {
          target2[pAsNumber] = newValue;
          return true;
        }
      }
      target2[p] = newValue;
      return true;
    }
  });
  return { proxy, rx };
};
var objectProxySymbol = (target) => {
  const { proxy, rx } = objectProxy(target);
  const p = proxy;
  p[symbol] = rx;
  return p;
};

// src/rx/sources/Observable.ts
function observable(init2) {
  const ow = observableWritable(init2);
  return {
    dispose: ow.dispose,
    isDisposed: ow.isDisposed,
    on: ow.on,
    onValue: ow.onValue
  };
}
function observableWritable(init2) {
  let onCleanup = () => {
  };
  const ow = manual({
    onFirstSubscribe() {
      onCleanup = init2(ow);
    },
    onNoSubscribers() {
      if (onCleanup) onCleanup();
    }
  });
  return {
    ...ow,
    onValue: (callback) => {
      return ow.on((message) => {
        if (messageHasValue(message)) {
          callback(message.value);
        }
      });
    }
  };
}

// src/rx/sources/String.ts
function string(initialValue) {
  let value = initialValue;
  const events = initStream();
  const set = (v) => {
    value = v;
    events.set(v);
  };
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    last: () => value,
    on: events.on,
    onValue: events.onValue,
    set
  };
}

// src/rx/index.ts
function manual(options = {}) {
  const events = initStream(options);
  return {
    dispose: events.dispose,
    isDisposed: events.isDisposed,
    set(value) {
      events.set(value);
    },
    on: events.on,
    onValue: events.onValue
  };
}
var Sinks = {
  setHtmlText: (options) => {
    return (source) => {
      setHtmlText(source, options);
    };
  }
};
var Ops = {
  /**
  * Annotates values with the result of a function.
  * The input value needs to be an object.
  * 
  * For every value `input` emits, run it through `annotator`, which should
  * return the original value with additional fields.
  * 
  * Conceptually the same as `transform`, just with typing to enforce result
  * values are V & TAnnotation
  * @param annotator 
  * @returns 
  */
  annotate: (annotator) => opify(annotate, annotator),
  /**
   * Annotates the input stream using {@link ReactiveOp} as the source of annotations.
   * The output values will have the shape of `{ value: TIn, annotation: TAnnotation }`.
   * Meaning that the original value is stored under `.value`, and the annotation under `.annotation`.
   * 
   * ```js
   * // Emit values from an array
   * const r1 = Rx.run(
   *  Rx.From.array([ 1, 2, 3 ]),
   *  Rx.Ops.annotateWithOp(
   *    // Add the 'max' operator to emit the largest-seen value
   *    Rx.Ops.sum()
   *  )
   * );
   * const data = await Rx.toArray(r1);
   * // Data =  [ { value: 1, annotation: 1 }, { value: 2, annotation: 3 }, { value: 3, annotation: 6 } ]
   * ```
   * @param annotatorOp 
   * @returns 
   */
  annotateWithOp: (annotatorOp) => opify(annotateWithOp, annotatorOp),
  /**
   * Takes a stream of values and batches them up (by quantity or time elapsed),
   * emitting them as an array.
   * @param options 
   * @returns 
   */
  batch: (options) => {
    return (source) => {
      return batch(source, options);
    };
  },
  cloneFromFields: () => {
    return (source) => {
      return cloneFromFields(source);
    };
  },
  /**
  * Merges values from several sources into a single source that emits values as an array.
  * @param options 
  * @returns 
  */
  combineLatestToArray: (options = {}) => {
    return (sources) => {
      return combineLatestToArray(sources, options);
    };
  },
  /**
   * Merges values from several sources into a single source that emits values as an object.
   * @param options
   * @returns 
   */
  combineLatestToObject: (options = {}) => {
    return (reactiveSources) => {
      return combineLatestToObject(reactiveSources, options);
    };
  },
  /**
  * Debounce values from the stream. It will wait until a certain time
  * has elapsed before emitting latest value.
  * 
  * Effect is that no values are emitted if input emits faster than the provided
  * timeout.
  * 
  * See also: throttle
  * @param options 
  * @returns 
  */
  debounce: (options) => {
    return (source) => {
      return debounce(source, options);
    };
  },
  elapsed: () => opify(elapsed),
  /**
   * Yields the value of a field from an input stream of values.
   * Eg if the source reactive emits `{ colour: string, size: number }`,
   * we might use `field` to pluck out the `colour` field, thus returning
   * a stream of string values.
   * @param fieldName 
   * @param options 
   * @returns 
   */
  field: (fieldName, options) => {
    return (source) => {
      return field(source, fieldName, options);
    };
  },
  /**
   * Filters the input stream, only re-emitting values that pass the predicate
   * @param predicate 
   * @returns 
   */
  filter: (predicate) => opify(filter$1, predicate),
  /**
  * Outputs the minimum numerical value of the stream.
  * A value is only emitted when minimum decreases.
  * @returns 
  */
  min: (options) => opify(min2, options),
  /**
   * Outputs the maxium numerical value of the stream.
   * A value is only emitted when maximum increases.
   * @returns 
   */
  max: (options) => opify(max2, options),
  sum: (options) => opify(sum2, options),
  average: (options) => opify(average3, options),
  tally: (options) => opify(tally2, options),
  rank: (rank3, options) => opify(rank2, rank3, options),
  pipe: (...streams) => {
    return (source) => {
      const resolved = resolveSource(source);
      const s = [resolved, ...streams];
      return pipe(...s);
    };
  },
  singleFromArray: (options = {}) => {
    return (source) => {
      return singleFromArray(source, options);
    };
  },
  split: (options = {}) => {
    return (source) => {
      return split(source, options);
    };
  },
  splitLabelled: (labels) => {
    return (source) => {
      return splitLabelled(source, labels);
    };
  },
  switcher: (cases, options = {}) => {
    return (source) => {
      return switcher(source, cases, options);
    };
  },
  syncToArray: (options = {}) => {
    return (reactiveSources) => {
      return syncToArray(reactiveSources, options);
    };
  },
  syncToObject: (options = {}) => {
    return (reactiveSources) => {
      return syncToObject(reactiveSources, options);
    };
  },
  tapProcess: (processor) => {
    return (source) => {
      return tapProcess(source, processor);
    };
  },
  tapStream: (divergedStream) => {
    return (source) => {
      return tapStream(source, divergedStream);
    };
  },
  tapOps: (...ops) => {
    return (source) => {
      return tapOps(source, ...ops);
    };
  },
  /**
  * Throttle values from the stream.
  * Only emits a value if some minimum time has elapsed.
  * @param options 
  * @returns 
  */
  throttle: (options) => opify(throttle, options),
  /**
   * Trigger a value if 'source' does not emit a value within an interval.
   * Trigger value can be a fixed value, result of function, or step through an iterator.
   * @param options 
   * @returns 
   */
  timeoutTrigger: (options) => {
    return (source) => {
      return timeoutTrigger(source, options);
    };
  },
  transform: (transformer, options = {}) => {
    return (source) => {
      return transform(source, transformer, options);
    };
  },
  /**
  * Reactive where last (or a given initial) value is available to read
  * @param opts 
  * @returns 
  */
  withValue: (opts) => {
    return opify(withValue, opts);
  }
};
function cache(r, initialValue) {
  let lastValue = initialValue;
  r.onValue((value) => {
    lastValue = value;
  });
  return {
    ...r,
    last() {
      return lastValue;
    },
    reset() {
      lastValue = void 0;
    }
  };
}
async function takeNextValue(source, maximumWait = 1e3) {
  const rx = resolveSource(source);
  let off = () => {
  };
  let watchdog;
  const p = new Promise((resolve, reject) => {
    off = rx.on((message) => {
      if (watchdog) clearTimeout(watchdog);
      if (messageHasValue(message)) {
        off();
        resolve(message.value);
      } else {
        if (messageIsDoneSignal(message)) {
          reject(new Error(`Source closed. ${message.context ?? ``}`));
          off();
        }
      }
    });
    watchdog = setTimeout(() => {
      watchdog = void 0;
      off();
      reject(new Error(`Timeout waiting for value (${JSON.stringify(maximumWait)})`));
    }, intervalToMs(maximumWait));
  });
  return p;
}
var to = (a, b, transform2, closeBonA = false) => {
  const unsub = a.on((message) => {
    if (messageHasValue(message)) {
      const value = transform2 ? transform2(message.value) : message.value;
      b.set(value);
    } else if (messageIsDoneSignal(message)) {
      unsub();
      if (closeBonA) {
        b.dispose(`Source closed (${message.context ?? ``})`);
      }
    } else {
      console.warn(`Unsupported message: ${JSON.stringify(message)}`);
    }
  });
  return unsub;
};

// src/modulation/PingPong.ts
var pingPongPercent = function(interval = 0.1, lower, upper, start, rounding) {
  if (lower === void 0) lower = 0;
  if (upper === void 0) upper = 1;
  if (start === void 0) start = lower;
  throwNumberTest(interval, `bipolar`, `interval`);
  throwNumberTest(upper, `bipolar`, `end`);
  throwNumberTest(start, `bipolar`, `offset`);
  throwNumberTest(lower, `bipolar`, `start`);
  return pingPong(interval, lower, upper, start, rounding);
};
var pingPong = function* (interval, lower, upper, start, rounding) {
  if (lower === void 0) throw new Error(`Parameter 'lower' is undefined`);
  if (interval === void 0) {
    throw new Error(`Parameter 'interval' is undefined`);
  }
  if (upper === void 0) throw new Error(`Parameter 'upper' is undefined`);
  if (rounding === void 0 && interval <= 1 && interval >= 0) {
    rounding = 10 / interval;
  } else if (rounding === void 0) rounding = 1234;
  if (Number.isNaN(interval)) throw new Error(`interval parameter is NaN`);
  if (Number.isNaN(lower)) throw new Error(`lower parameter is NaN`);
  if (Number.isNaN(upper)) throw new Error(`upper parameter is NaN`);
  if (Number.isNaN(start)) throw new Error(`upper parameter is NaN`);
  if (lower >= upper) throw new Error(`lower must be less than upper`);
  if (interval === 0) throw new Error(`Interval cannot be zero`);
  const distance = upper - lower;
  if (Math.abs(interval) >= distance) {
    throw new Error(`Interval should be between -${distance} and ${distance}`);
  }
  let incrementing = interval > 0;
  upper = Math.floor(upper * rounding);
  lower = Math.floor(lower * rounding);
  interval = Math.floor(Math.abs(interval * rounding));
  if (interval === 0) {
    throw new Error(`Interval is zero (rounding: ${rounding})`);
  }
  start = start === void 0 ? lower : Math.floor(start * rounding);
  if (start > upper || start < lower) {
    throw new Error(
      `Start (${start / rounding}) must be within lower (${lower / rounding}) and upper (${upper / rounding})`
    );
  }
  let v = start;
  yield v / rounding;
  let firstLoop = true;
  while (true) {
    v = v + (incrementing ? interval : -interval);
    if (incrementing && v >= upper) {
      incrementing = false;
      v = upper;
      if (v === upper && firstLoop) {
        v = lower;
        incrementing = true;
      }
    } else if (!incrementing && v <= lower) {
      incrementing = true;
      v = lower;
      if (v === lower && firstLoop) {
        v = upper;
        incrementing = false;
      }
    }
    yield v / rounding;
    firstLoop = false;
  }
};

// src/modulation/Jitter.ts
var jitterAbsolute = (options) => {
  const { relative, absolute } = options;
  const clamped = options.clamped ?? false;
  const source = options.source ?? defaultRandom;
  if (absolute !== void 0) {
    return (value) => {
      const abs = source() * absolute * 2 - absolute;
      const valueNew = value + abs;
      if (clamped) return clamp(valueNew, 0, value);
      return valueNew;
    };
  }
  if (relative !== void 0) {
    return (value) => {
      const rel = value * relative;
      const abs = source() * rel * 2 - rel;
      const valueNew = value + abs;
      if (clamped) return clamp(valueNew, 0, value);
      return valueNew;
    };
  }
  throw new Error(`Either absolute or relative fields expected`);
};
var jitter = (options = {}) => {
  const clamped = options.clamped ?? true;
  let r = (_) => 0;
  if (options.absolute !== void 0) {
    throwNumberTest(
      options.absolute,
      clamped ? `percentage` : `bipolar`,
      `opts.absolute`
    );
    const absRand = floatSource({
      min: -options.absolute,
      max: options.absolute,
      source: options.source
    });
    r = (v) => v + absRand();
  } else if (options.relative === void 0) {
    throw new TypeError(`Either absolute or relative jitter amount is required.`);
  } else {
    const rel = options.relative ?? 0.1;
    throwNumberTest(
      rel,
      clamped ? `percentage` : `bipolar`,
      `opts.relative`
    );
    r = (v) => v + float({
      min: -Math.abs(rel * v),
      max: Math.abs(rel * v),
      source: options.source
    });
  }
  const compute = (value) => {
    throwNumberTest(value, clamped ? `percentage` : `bipolar`, `value`);
    let v = r(value);
    if (clamped) v = clamp(v);
    return v;
  };
  return compute;
};

// src/modulation/index.ts
var modulation_exports = {};
__export(modulation_exports, {
  Easings: () => Easing_exports,
  Envelopes: () => Envelope_exports,
  Forces: () => Forces_exports,
  Oscillators: () => Oscillator_exports,
  adsr: () => adsr,
  adsrIterable: () => adsrIterable,
  defaultAdsrOpts: () => defaultAdsrOpts,
  jitter: () => jitter,
  jitterAbsolute: () => jitterAbsolute,
  perMinute: () => perMinute,
  perSecond: () => perSecond,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent
});

// src/modulation/Envelope.ts
var Envelope_exports = {};
__export(Envelope_exports, {
  adsr: () => adsr,
  adsrIterable: () => adsrIterable,
  defaultAdsrOpts: () => defaultAdsrOpts
});
var defaultAdsrOpts = () => ({
  attackBend: -1,
  decayBend: -0.3,
  releaseBend: -0.3,
  peakLevel: 1,
  initialLevel: 0,
  sustainLevel: 0.6,
  releaseLevel: 0,
  attackDuration: 600,
  decayDuration: 200,
  releaseDuration: 800,
  shouldLoop: false
});
var adsrTransitionsInstance = Object.freeze({
  attack: [`decay`, `release`],
  decay: [`sustain`, `release`],
  sustain: [`release`],
  release: [`complete`],
  //eslint-disable-next-line unicorn/no-null
  complete: null
});
var AdsrBase = class extends SimpleEventEmitter {
  #sm;
  #timeSource;
  #timer;
  #holding;
  #holdingInitial;
  attackDuration;
  decayDuration;
  releaseDuration;
  decayDurationTotal;
  shouldLoop;
  constructor(opts) {
    super();
    this.attackDuration = opts.attackDuration ?? 300;
    this.decayDuration = opts.decayDuration ?? 500;
    this.releaseDuration = opts.releaseDuration ?? 1e3;
    this.shouldLoop = opts.shouldLoop ?? false;
    this.#sm = new StateMachineWithEvents(
      adsrTransitionsInstance,
      { initial: `attack` }
    );
    this.#sm.addEventListener(`change`, (event) => {
      if (event.newState === `release` && this.#holdingInitial) {
        this.#timer?.reset();
      }
      super.fireEvent(`change`, event);
    });
    this.#sm.addEventListener(`stop`, (event) => {
      super.fireEvent(`complete`, event);
    });
    this.#timeSource = msElapsedTimer;
    this.#holding = this.#holdingInitial = false;
    this.decayDurationTotal = this.attackDuration + this.decayDuration;
  }
  switchState() {
    if (this.#timer === void 0) return false;
    let elapsed = this.#timer.elapsed;
    const wasHeld = this.#holdingInitial && !this.#holding;
    let hasChanged = false;
    do {
      hasChanged = false;
      switch (this.#sm.state) {
        case `attack`: {
          if (elapsed > this.attackDuration || wasHeld) {
            this.#sm.next();
            hasChanged = true;
          }
          break;
        }
        case `decay`: {
          if (elapsed > this.decayDurationTotal || wasHeld) {
            this.#sm.next();
            hasChanged = true;
          }
          break;
        }
        case `sustain`: {
          if (!this.#holding || wasHeld) {
            elapsed = 0;
            this.#sm.next();
            this.#timer.reset();
            hasChanged = true;
          }
          break;
        }
        case `release`: {
          if (elapsed > this.releaseDuration) {
            this.#sm.next();
            hasChanged = true;
          }
          break;
        }
        case `complete`: {
          if (this.shouldLoop) {
            this.trigger(this.#holdingInitial);
          }
        }
      }
    } while (hasChanged);
    return hasChanged;
  }
  /**
   * Computes a stage progress from 0-1
   * @param allowStateChange
   * @returns
   */
  computeRaw(allowStateChange = true) {
    if (this.#timer === void 0) return [void 0, 0, this.#sm.state];
    if (allowStateChange) this.switchState();
    const previousStage = this.#sm.state;
    const elapsed = this.#timer.elapsed;
    let relative = 0;
    const state = this.#sm.state;
    switch (state) {
      case `attack`: {
        relative = elapsed / this.attackDuration;
        break;
      }
      case `decay`: {
        relative = (elapsed - this.attackDuration) / this.decayDuration;
        break;
      }
      case `sustain`: {
        relative = 1;
        break;
      }
      case `release`: {
        relative = Math.min(elapsed / this.releaseDuration, 1);
        break;
      }
      case `complete`: {
        return [void 0, 1, previousStage];
      }
      default: {
        throw new Error(`State machine in unknown state: ${state}`);
      }
    }
    return [state, relative, previousStage];
  }
  get isDone() {
    return this.#sm.isDone;
  }
  onTrigger() {
  }
  trigger(hold = false) {
    this.onTrigger();
    this.#sm.reset();
    this.#timer = this.#timeSource();
    this.#holding = hold;
    this.#holdingInitial = hold;
  }
  compute() {
  }
  release() {
    if (this.isDone || !this.#holdingInitial) return;
    this.#holding = false;
    this.compute();
  }
};
var AdsrImpl = class extends AdsrBase {
  attackPath;
  decayPath;
  releasePath;
  initialLevel;
  peakLevel;
  releaseLevel;
  sustainLevel;
  attackBend;
  decayBend;
  releaseBend;
  initialLevelOverride;
  retrigger;
  releasedAt;
  constructor(opts) {
    super(opts);
    this.initialLevel = opts.initialLevel ?? 0;
    this.peakLevel = opts.peakLevel ?? 1;
    this.releaseLevel = opts.releaseLevel ?? 0;
    this.sustainLevel = opts.sustainLevel ?? 0.75;
    this.retrigger = opts.retrigger ?? true;
    this.attackBend = opts.attackBend ?? 0;
    this.releaseBend = opts.releaseBend ?? 0;
    this.decayBend = opts.decayBend ?? 0;
    const max = 1;
    this.attackPath = toPath3(
      quadraticSimple(
        { x: 0, y: this.initialLevel },
        { x: max, y: this.peakLevel },
        -this.attackBend
      )
    );
    this.decayPath = toPath3(
      quadraticSimple(
        { x: 0, y: this.peakLevel },
        { x: max, y: this.sustainLevel },
        -this.decayBend
      )
    );
    this.releasePath = toPath3(
      quadraticSimple(
        { x: 0, y: this.sustainLevel },
        { x: max, y: this.releaseLevel },
        -this.releaseBend
      )
    );
  }
  onTrigger() {
    this.initialLevelOverride = void 0;
    if (!this.retrigger) {
      const [_stage, scaled, _raw] = this.compute();
      if (!Number.isNaN(scaled) && scaled > 0) {
        this.initialLevelOverride = scaled;
      }
    }
  }
  get value() {
    return this.compute(true)[1];
  }
  compute(allowStateChange = true) {
    const [stage, amt] = super.computeRaw(allowStateChange);
    if (stage === void 0) return [void 0, Number.NaN, Number.NaN];
    let v;
    switch (stage) {
      case `attack`: {
        v = this.attackPath.interpolate(amt).y;
        if (this.initialLevelOverride !== void 0) {
          v = scale(v, 0, 1, this.initialLevelOverride, 1);
        }
        this.releasedAt = v;
        break;
      }
      case `decay`: {
        v = this.decayPath.interpolate(amt).y;
        this.releasedAt = v;
        break;
      }
      case `sustain`: {
        v = this.sustainLevel;
        this.releasedAt = v;
        break;
      }
      case `release`: {
        v = this.releasePath.interpolate(amt).y;
        if (this.releasedAt !== void 0) {
          v = scale(v, 0, this.sustainLevel, 0, this.releasedAt);
        }
        break;
      }
      case `complete`: {
        v = this.releaseLevel;
        this.releasedAt = void 0;
        break;
      }
      default: {
        throw new Error(`Unknown state: ${stage}`);
      }
    }
    return [stage, v, amt];
  }
};
var adsr = (opts) => new AdsrImpl(opts);
async function* adsrIterable(opts) {
  const envelope = adsr(opts.env);
  const sampleRateMs = opts.sampleRateMs ?? 100;
  envelope.trigger();
  for await (const v of interval(
    () => {
      if (envelope.isDone) return;
      return envelope.value;
    },
    {
      fixed: sampleRateMs,
      signal: opts.signal
    }
  )) {
    yield v;
  }
}

// src/modulation/Forces.ts
var Forces_exports = {};
__export(Forces_exports, {
  accelerationForce: () => accelerationForce,
  angleFromAccelerationForce: () => angleFromAccelerationForce,
  angleFromVelocityForce: () => angleFromVelocityForce,
  angularForce: () => angularForce,
  apply: () => apply,
  attractionForce: () => attractionForce,
  computeAccelerationToTarget: () => computeAccelerationToTarget,
  computeAttractionForce: () => computeAttractionForce,
  computePositionFromAngle: () => computePositionFromAngle,
  computePositionFromVelocity: () => computePositionFromVelocity,
  computeVelocity: () => computeVelocity,
  constrainBounce: () => constrainBounce,
  guard: () => guard,
  magnitudeForce: () => magnitudeForce,
  nullForce: () => nullForce,
  orientationForce: () => orientationForce,
  pendulumForce: () => pendulumForce,
  springForce: () => springForce,
  targetForce: () => targetForce,
  velocityForce: () => velocityForce
});
var guard = (t, name = `t`) => {
  if (t === void 0) {
    throw new Error(`Parameter ${name} is undefined. Expected ForceAffected`);
  }
  if (t === null) {
    throw new Error(`Parameter ${name} is null. Expected ForceAffected`);
  }
  if (typeof t !== `object`) {
    throw new TypeError(
      `Parameter ${name} is type ${typeof t}. Expected object of shape ForceAffected`
    );
  }
};
var constrainBounce = (bounds, dampen = 1) => {
  if (!bounds) bounds = { width: 1, height: 1 };
  const minX = getEdgeX(bounds, `left`);
  const maxX = getEdgeX(bounds, `right`);
  const minY = getEdgeY(bounds, `top`);
  const maxY = getEdgeY(bounds, `bottom`);
  return (t) => {
    const position = computePositionFromVelocity(
      t.position ?? point_exports.Empty,
      t.velocity ?? point_exports.Empty
    );
    let velocity = t.velocity ?? point_exports.Empty;
    let { x, y } = position;
    if (x > maxX) {
      x = maxX;
      velocity = point_exports.invert(point_exports.multiply(velocity, dampen), `x`);
    } else if (x < minX) {
      x = minX;
      velocity = point_exports.invert(point_exports.multiply(velocity, dampen), `x`);
    }
    if (y > maxY) {
      y = maxY;
      velocity = point_exports.multiply(point_exports.invert(velocity, `y`), dampen);
    } else if (position.y < minY) {
      y = minY;
      velocity = point_exports.invert(point_exports.multiply(velocity, dampen), `y`);
    }
    return Object.freeze({
      ...t,
      position: { x, y },
      velocity
    });
  };
};
var attractionForce = (attractors, gravity, distanceRange = {}) => (attractee) => {
  let accel = attractee.acceleration ?? point_exports.Empty;
  for (const a of attractors) {
    if (a === attractee) continue;
    const f = computeAttractionForce(a, attractee, gravity, distanceRange);
    accel = point_exports.sum(accel, f);
  }
  return {
    ...attractee,
    acceleration: accel
  };
};
var computeAttractionForce = (attractor, attractee, gravity, distanceRange = {}) => {
  if (attractor.position === void 0) {
    throw new Error(`attractor.position not set`);
  }
  if (attractee.position === void 0) {
    throw new Error(`attractee.position not set`);
  }
  const distributionRangeMin = distanceRange.min ?? 0.01;
  const distributionRangeMax = distanceRange.max ?? 0.7;
  const f = point_exports.normalise(
    point_exports.subtract(attractor.position, attractee.position)
  );
  const d = clamp(point_exports.distance(f), distributionRangeMin, distributionRangeMax);
  return point_exports.multiply(
    f,
    gravity * (attractor.mass ?? 1) * (attractee.mass ?? 1) / (d * d)
  );
};
var targetForce = (targetPos, opts = {}) => {
  const fn = (t) => {
    const accel = computeAccelerationToTarget(
      targetPos,
      t.position ?? { x: 0.5, y: 0.5 },
      opts
    );
    return {
      ...t,
      acceleration: point_exports.sum(t.acceleration ?? point_exports.Empty, accel)
    };
  };
  return fn;
};
var apply = (t, ...accelForces) => {
  if (t === void 0) throw new Error(`t parameter is undefined`);
  for (const f of accelForces) {
    if (f === null || f === void 0) continue;
    t = typeof f === `function` ? f(t) : {
      ...t,
      acceleration: point_exports.sum(t.acceleration ?? point_exports.Empty, f)
    };
  }
  const velo = computeVelocity(
    t.acceleration ?? point_exports.Empty,
    t.velocity ?? point_exports.Empty
  );
  const pos = computePositionFromVelocity(t.position ?? point_exports.Empty, velo);
  const ff = {
    ...t,
    position: pos,
    velocity: velo,
    // Clear accel, because it has been integrated into velocity
    acceleration: point_exports.Empty
  };
  return ff;
};
var accelerationForce = (vector, mass = `ignored`) => (t) => Object.freeze({
  ...t,
  acceleration: massApplyAccel(vector, t, mass)
  //Points.sum(t.acceleration ?? Points.Empty, op(t.mass ?? 1))
});
var massApplyAccel = (vector, thing, mass = `ignored`) => {
  let op;
  switch (mass) {
    case `dampen`: {
      op = (mass2) => divide(vector, mass2, mass2);
      break;
    }
    case `multiply`: {
      op = (mass2) => point_exports.multiply(vector, mass2, mass2);
      break;
    }
    case `ignored`: {
      op = (_mass) => vector;
      break;
    }
    default: {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Unknown 'mass' parameter '${mass}. Expected 'dampen', 'multiply' or 'ignored'`
      );
    }
  }
  return point_exports.sum(thing.acceleration ?? point_exports.Empty, op(thing.mass ?? 1));
};
var magnitudeForce = (force, mass = `ignored`) => (t) => {
  if (t.velocity === void 0) return t;
  const mag = point_exports.distance(point_exports.normalise(t.velocity));
  const magSq = force * mag * mag;
  const vv = point_exports.multiply(point_exports.invert(t.velocity), magSq);
  return Object.freeze({
    ...t,
    acceleration: massApplyAccel(vv, t, mass)
  });
};
var nullForce = (t) => t;
var velocityForce = (force, mass) => {
  const pipeline = point_exports.pipeline(
    // Points.normalise,
    point_exports.invert,
    (v) => point_exports.multiply(v, force)
  );
  return (t) => {
    if (t.velocity === void 0) return t;
    const v = pipeline(t.velocity);
    return Object.freeze({
      ...t,
      acceleration: massApplyAccel(v, t, mass)
    });
  };
};
var angularForce = () => (t) => {
  const accumulator = t.angularAcceleration ?? 0;
  const vel = t.angularVelocity ?? 0;
  const angle = t.angle ?? 0;
  const v = vel + accumulator;
  const a = angle + v;
  return Object.freeze({
    ...t,
    angle: a,
    angularVelocity: v,
    angularAcceleration: 0
  });
};
var angleFromAccelerationForce = (scaling = 20) => (t) => {
  const accel = t.acceleration ?? point_exports.Empty;
  return Object.freeze({
    ...t,
    angularAcceleration: accel.x * scaling
  });
};
var angleFromVelocityForce = (interpolateAmt = 1) => (t) => {
  const a = point_exports.angle(t.velocity ?? point_exports.Empty);
  return Object.freeze({
    ...t,
    angle: interpolateAmt < 1 ? interpolateAngle(interpolateAmt, t.angle ?? 0, a) : a
  });
};
var springForce = (pinnedAt, restingLength = 0.5, k = 2e-4, damping = 0.999) => (t) => {
  const direction = point_exports.subtract(t.position ?? point_exports.Empty, pinnedAt);
  const mag = point_exports.distance(direction);
  const stretch = Math.abs(restingLength - mag);
  const f = point_exports.pipelineApply(
    direction,
    point_exports.normalise,
    (p) => point_exports.multiply(p, -k * stretch)
  );
  const accel = massApplyAccel(f, t, `dampen`);
  const velo = computeVelocity(
    accel ?? point_exports.Empty,
    t.velocity ?? point_exports.Empty
  );
  const veloDamped = point_exports.multiply(velo, damping, damping);
  return {
    ...t,
    velocity: veloDamped,
    acceleration: point_exports.Empty
  };
};
var pendulumForce = (pinnedAt, opts = {}) => (t) => {
  if (!pinnedAt) pinnedAt = { x: 0, y: 0 };
  const length = opts.length ?? point_exports.distance(pinnedAt, t.position ?? point_exports.Empty);
  const speed = opts.speed ?? 1e-3;
  const damping = opts.damping ?? 0.995;
  let angle = t.angle;
  if (angle === void 0) {
    if (t.position) {
      angle = point_exports.angle(pinnedAt, t.position) - Math.PI / 2;
    } else {
      angle = 0;
    }
  }
  const accel = -1 * speed / length * Math.sin(angle);
  const v = (t.angularVelocity ?? 0) + accel;
  angle += v;
  return Object.freeze({
    angularVelocity: v * damping,
    angle,
    position: computePositionFromAngle(length, angle + Math.PI / 2, pinnedAt)
  });
};
var computeVelocity = (acceleration, velocity, velocityMax) => {
  const p = point_exports.sum(velocity, acceleration);
  return velocityMax === void 0 ? p : point_exports.clampMagnitude(p, velocityMax);
};
var computeAccelerationToTarget = (targetPos, currentPos, opts = {}) => {
  const diminishBy = opts.diminishBy ?? 1e-3;
  const direction = point_exports.subtract(targetPos, currentPos);
  if (opts.range && // If direction is less than range, return { x: 0, y: 0}
  point_exports.compare(point_exports.abs(direction), opts.range) === -2) {
    return point_exports.Empty;
  }
  return point_exports.multiply(direction, diminishBy);
};
var computePositionFromVelocity = (position, velocity) => point_exports.sum(position, velocity);
var computePositionFromAngle = (distance, angleRadians, origin) => Polar_exports.toCartesian(distance, angleRadians, origin);
var _angularForce = angularForce();
var _angleFromAccelerationForce = angleFromAccelerationForce();
var orientationForce = (interpolationAmt = 0.5) => {
  const angleFromVel = angleFromVelocityForce(interpolationAmt);
  return (t) => {
    t = _angularForce(t);
    t = _angleFromAccelerationForce(t);
    t = angleFromVel(t);
    return t;
  };
};

// src/modulation/Oscillator.ts
var Oscillator_exports = {};
__export(Oscillator_exports, {
  saw: () => saw,
  sine: () => sine,
  sineBipolar: () => sineBipolar,
  spring: () => spring,
  square: () => square,
  triangle: () => triangle
});
var piPi = Math.PI * 2;
var springRaw = (opts = {}, from = 0, to = 1) => {
  const mass = opts.mass ?? 1;
  const stiffness = opts.stiffness ?? 100;
  const soft = opts.soft ?? false;
  const damping = opts.damping ?? 10;
  const velocity = opts.velocity ?? 0.1;
  const delta = to - from;
  if (soft || 1 <= damping / (2 * Math.sqrt(stiffness * mass))) {
    const angularFrequency = -Math.sqrt(stiffness / mass);
    const leftover = -angularFrequency * delta - velocity;
    return (t) => to - (delta + t * leftover) * Math.E ** (t * angularFrequency);
  } else {
    const dampingFrequency = Math.sqrt(4 * mass * stiffness - damping ** 2);
    const leftover = (damping * delta - 2 * mass * velocity) / dampingFrequency;
    const dfm = 0.5 * dampingFrequency / mass;
    const dm = -(0.5 * damping) / mass;
    return (t) => to - (Math.cos(t * dfm) * delta + Math.sin(t * dfm) * leftover) * Math.E ** (t * dm);
  }
};
function* spring(opts = {}, timerOrFreq) {
  if (timerOrFreq === void 0) timerOrFreq = msElapsedTimer();
  else if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  const fn = springRaw(opts, 0, 1);
  let doneCountdown = opts.countdown ?? 10;
  while (doneCountdown > 0) {
    const s = fn(timerOrFreq.elapsed / 1e3);
    yield s;
    if (s === 1) {
      doneCountdown--;
    } else {
      doneCountdown = 100;
    }
  }
}
function* sine(timerOrFreq) {
  if (timerOrFreq === void 0) throw new TypeError(`Parameter 'timerOrFreq' is undefined`);
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield (Math.sin(timerOrFreq.elapsed * piPi) + 1) / 2;
  }
}
function* sineBipolar(timerOrFreq) {
  if (timerOrFreq === void 0) throw new TypeError(`Parameter 'timerOrFreq' is undefined`);
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield Math.sin(timerOrFreq.elapsed * piPi);
  }
}
function* triangle(timerOrFreq) {
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    let v = timerOrFreq.elapsed;
    if (v < 0.5) {
      v *= 2;
    } else {
      v = 2 - v * 2;
    }
    yield v;
  }
}
function* saw(timerOrFreq) {
  if (timerOrFreq === void 0) throw new TypeError(`Parameter 'timerOrFreq' is undefined`);
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield timerOrFreq.elapsed;
  }
}
function* square(timerOrFreq) {
  if (typeof timerOrFreq === `number`) {
    timerOrFreq = frequencyTimer(timerOrFreq);
  }
  while (true) {
    yield timerOrFreq.elapsed < 0.5 ? 0 : 1;
  }
}

// src/modulation/PerSecond.ts
var perSecond = (amount, options = {}) => {
  const perMilli = amount / 1e3;
  const min = options.min ?? Number.MIN_SAFE_INTEGER;
  const max = options.max ?? Number.MAX_SAFE_INTEGER;
  let called = performance.now();
  return () => {
    const now = performance.now();
    const elapsed = now - called;
    called = now;
    const x = perMilli * elapsed;
    if (x > max) return max;
    if (x < min) return min;
    return x;
  };
};
var perMinute = (amount, options = {}) => {
  return perSecond(amount / 60, options);
};

// src/modulation/index.ts
try {
  if (typeof window !== `undefined`) {
    window.ixfx = {
      ...window.ixfx,
      Modulation: { Forces: Forces_exports, Envelopes: Envelope_exports, Oscillators: Oscillator_exports, Easings: Easing_exports }
    };
  }
} catch {
}

// src/numbers/index.ts
var numbers_exports = {};
__export(numbers_exports, {
  applyToValues: () => applyToValues,
  average: () => average$1,
  averageWeighted: () => averageWeighted,
  count: () => count$1,
  dotProduct: () => dotProduct,
  filter: () => filter,
  isApproximately: () => isApproximately,
  isValid: () => isValid,
  jitter: () => jitter,
  jitterAbsolute: () => jitterAbsolute,
  linearSpace: () => linearSpace,
  max: () => max$2,
  maxFast: () => maxFast,
  maxIndex: () => maxIndex,
  min: () => min$3,
  minFast: () => minFast,
  minIndex: () => minIndex,
  numericPercent: () => numericPercent,
  numericRange: () => numericRange,
  numericRangeRaw: () => numericRangeRaw,
  pingPong: () => pingPong,
  pingPongPercent: () => pingPongPercent,
  quantiseEvery: () => quantiseEvery,
  randomInteger: () => integer,
  randomUniqueInteger: () => integerUniqueGen,
  relativeDifference: () => relativeDifference,
  round: () => round,
  roundUpToMultiple: () => roundUpToMultiple,
  total: () => total,
  totalFast: () => totalFast,
  tracker: () => tracker,
  validNumbers: () => validNumbers,
  weight: () => weight
});

// src/numbers/ApplyToValues.ts
var applyToValues = (object, apply) => {
  const o = { ...object };
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === `number`) {
      o[key] = apply(value);
    } else {
      o[key] = value;
    }
  }
  return o;
};

// src/numbers/Guard.ts
var isValid = (possibleNumber) => {
  if (typeof possibleNumber !== `number`) return false;
  if (Number.isNaN(possibleNumber)) return false;
  return true;
};

// src/numbers/Filter.ts
function* filter(it) {
  for (const v of it) {
    if (isValid(v)) yield v;
  }
}

// src/numbers/Generate.ts
var numericRangeRaw = function* (interval, start = 0, end, repeating = false) {
  if (interval <= 0) throw new Error(`Interval is expected to be above zero`);
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  let v = start;
  do {
    while (v < end) {
      yield v;
      v += interval;
    }
  } while (repeating);
};
var numericRange = function* (interval, start = 0, end, repeating = false, rounding) {
  throwNumberTest(interval, `nonZero`);
  const negativeInterval = interval < 0;
  if (end === void 0) ; else {
    if (negativeInterval && start < end) {
      throw new Error(
        `Interval of ${interval} will never go from ${start} to ${end}`
      );
    }
    if (!negativeInterval && start > end) {
      throw new Error(
        `Interval of ${interval} will never go from ${start} to ${end}`
      );
    }
  }
  rounding = rounding ?? 1e3;
  if (end === void 0) end = Number.MAX_SAFE_INTEGER;
  else end *= rounding;
  interval = interval * rounding;
  do {
    let v = start * rounding;
    while (!negativeInterval && v <= end || negativeInterval && v >= end) {
      yield v / rounding;
      v += interval;
    }
  } while (repeating);
};
var numericPercent = function(interval = 0.01, repeating = false, start = 0, end = 1) {
  throwNumberTest(interval, `percentage`, `interval`);
  throwNumberTest(start, `percentage`, `start`);
  throwNumberTest(end, `percentage`, `end`);
  return numericRange(interval, start, end, repeating);
};

// src/numbers/IsApproximately.ts
function isApproximately(baseValue, rangePercent, v) {
  throwNumberTest(rangePercent, `percentage`, `rangePercent`);
  throwNumberTest(baseValue, ``, `baseValue`);
  const diff = baseValue * rangePercent;
  const test = (v2) => {
    try {
      throwNumberTest(v2, ``, `v`);
      let diffV = Math.abs(v2 - baseValue);
      if (Math.abs(baseValue) <= 2) {
        diffV = round(5, diffV);
      }
      return diffV <= diff;
    } catch {
      return false;
    }
  };
  return v === void 0 ? test : test(v);
}

// src/numbers/RelativeDifference.ts
var relativeDifference = (initial) => (v) => v / initial;

// src/numbers/index.ts
var tracker = (options) => numberTracker(options);

// src/debug/index.ts
var debug_exports = {};
__export(debug_exports, {
  getErrorMessage: () => getErrorMessage,
  logColours: () => logColours,
  logSet: () => logSet,
  logger: () => logger,
  resolveLogOption: () => resolveLogOption
});

export { Colour_exports as C, Drawing_exports as D, Ellipse_exports as E, Grid_exports as G, Normalise_exports as N, PlotOld_exports as P, SvgElements_exports as S, Vector_exports as V, Palette_exports as a, DomRx_exports as b, continuously as c, debounce$2 as d, radianToDegree as e, flow_exports as f, DragDrop_exports as g, Polar_exports as h, arc_exports as i, Svg_exports as j, circle_exports as k, line_exports as l, makeHelper$1 as m, numbers_exports as n, point_exports as p, repeat$2 as r, set_exports as s };
