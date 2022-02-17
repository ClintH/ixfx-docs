import {Arrays} from "ixfx/lib/collections";

const fruits = `kiwi apple orange grape orange banana mango passionfruit grapefruit pineapple pear apricot peach blueberry raspberry strawberry starfruit watermelon honeydew-melon`.split(` `);
const characters = `sweet sour ripe unripe juicy dry frozen`.split(` `);

export const fruit = () => Arrays.randomElement(characters) + ' ' + Arrays.randomElement(fruits);
