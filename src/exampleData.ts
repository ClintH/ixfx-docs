import {Arrays} from "ixfx/lib/collections";

const fruits = `kiwi apple orange grape banana mango passionfruit grapefruit pineapple pear apricot plum nectarine peach blueberry raspberry strawberry starfruit watermelon honeydew-melon`.split(` `);
const characters = `sweet sour ripe unripe juicy dry frozen mouldy blended mashed preserved`.split(` `);

export const fruit = () => Arrays.randomElement(characters) + ' ' + Arrays.randomElement(fruits);
