import {Maybe} from "../src/Maybe";
import {assertEquals, assertNothing} from "./AssertionHelpers";
import {getDescriptionString, getLawString} from "./DescriptionHelpers";

describe(getDescriptionString(Maybe), () => {

    it(getLawString(1), (done) => {
        const square = (x: number) => Maybe.just(x * x);
        assertEquals(square(3), Maybe.just(3).bind(square), done);
    });

    it(getLawString(2), (done) => {
        const maybe = Maybe.just(3);
        assertEquals(maybe, maybe.bind(Maybe.just), done);
    });

    it(getLawString(3), (done) => {
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