import {Identity} from "../src/Identity";
import {Monad} from "../src/Monad";
import {assertEquals} from "./AssertionHelpers";

describe("Monad - Identity", () => {

    it("Law 1 - left identity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        assertEquals(square(3), Identity.of(3).bind(square), done);
    });

    it("Law 2 - right identity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        const identity: Monad<number> = Identity.of(3);
        assertEquals(square(3), identity.bind(square), done);
    });

    it("Law 3 - associativity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const expected = Identity.of(3).bind(square).bind(add);
        const actual = Identity.of(3).bind((x: number) => square(x).bind(add));
        assertEquals(expected, actual, done);
    });
});