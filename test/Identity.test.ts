import {Identity} from "../src/Identity";
import {Monad} from "../src/Monad";
import {assertEquals} from "./EqualMonad";

describe("Monad - Identity", () => {

    it("Law 1 - left identity", () => {
        const square = (x: number) => new Identity(x * x);
        assertEquals(square(3), new Identity(3).bind(square));
    });

    it("Law 2 - right identity", () => {
        const square = (x: number) => new Identity(x * x);
        const identity: Monad<number> = new Identity(3);
        assertEquals(square, identity.bind(square));
    });

    it("Law 3 - associativity", () => {
        const square = (x: number) => new Identity(x * x);
        const add = (x: number) => new Identity(x + x);
        const expected = new Identity(3).bind(square).bind(add);
        const actual = new Identity(3).bind(x => square(x).bind(add));
        assertEquals(expected, actual);
    });
});