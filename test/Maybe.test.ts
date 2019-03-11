import {Identity} from "../src/Identity";
import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";
import {assertEquals} from "./EqualMonad";

describe("Monad - Maybe", () => {

    it("Law 1 - left identity", () => {
        const square = (x: number) => Maybe.just(x * x);
        assertEquals(square(3), Maybe.just(3).bind(square));
    });

    it("Law 2 - right identity", () => {
        const square = (x: number) => Maybe.just(x * x);
        const identity: Monad<number> = Maybe.just(3);
        assertEquals(square, identity.bind(square));
    });

    it("Law 3 - associativity", () => {
        const square = (x: number) => Maybe.just(x * x);
        const add = (x: number) => Maybe.just(x + x);
        const expected = Maybe.just(3).bind(square).bind(add);
        const actual = Maybe.just(3).bind(x => square(x).bind(add));
        assertEquals(expected, actual);
    });

    it("Nothing short circuiting", () => {
       const shortCircuited = Maybe.just(10)
           .bind(x => Maybe.nothing())
           .bind(x => Maybe.just("wow"));

       assertEquals(shortCircuited, Maybe.nothing());

    });

    it("Just chaining", () => {
        const shortCircuited = Maybe.just(10)
            .bind(x => Maybe.just(x + 1))
            .bind(x => Maybe.just(x + 1));

        assertEquals(shortCircuited, Maybe.just(12));
    });

});