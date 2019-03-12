import {Identity} from "../src/Identity";
import {Monad} from "../src/Monad";
import {assertEquals} from "./AssertionHelpers";

describe("Monad - Identity", () => {

    it("Law 1 - left identity", () => {
        const square = (x: number) => Identity.of(x * x);
        assertEquals(square(3), Identity.of(3).bind(square));
    });

    it("Law 2 - right identity", () => {
        const square = (x: number) => Identity.of(x * x);
        const identity: Monad<number> = Identity.of(3);
        assertEquals(square, identity.bind(square));
    });

    it("Law 3 - associativity", () => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const expected = Identity.of(3).bind(square).bind(add);
        const actual = Identity.of(3).bind((x: number) => square(x).bind(add));
        assertEquals(expected, actual);
    });
});