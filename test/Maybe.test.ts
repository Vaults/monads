import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";
import {assertEquals, assertNothing} from "./AssertionHelpers";

describe("Monad - Maybe", () => {

    it("Law 1 - left identity", (done) => {
        const square = (x: number) => Maybe.just(x * x);
        assertEquals(square(3), Maybe.just(3).bind(square), done);
    });

    it("Law 2 - right identity", (done) => {
        const square = (x: number) => Maybe.just(x * x);
        const identity: Monad<number> = Maybe.just(3);
        assertEquals(square(3), identity.bind(square), done);
    });

    it("Law 3 - associativity", (done) => {
        const square = (x: number) => Maybe.just(x * x);
        const add = (x: number) => Maybe.just(x + x);
        const expected = Maybe.just(3).bind(square).bind(add);
        const actual = Maybe.just(3).bind(x => square(x).bind(add));
        assertEquals(expected, actual, done);
    });

    it("Nothing short circuiting", () => {
       const shortCircuited = Maybe.just(10)
           .bind(x => Maybe.nothing())
           .bind(x => Maybe.just("wow"));

       assertNothing(shortCircuited);

    });

    it("Just chaining", (done) => {
        const shortCircuited = Maybe.just(10)
            .bind(x => Maybe.just(x + 1))
            .bind(x => Maybe.just(x + 1));

        assertEquals(shortCircuited, Maybe.just(12), done);
    });

});