import {Async} from '../src/Async';
import {Either} from "../src/Either";
import {Identity} from "../src/Identity";
import {List} from "../src/List";
import {Maybe} from "../src/Maybe";
import {assertEquals} from "./AssertionHelpers";

describe("Integration tests", () => {

    it("let's go crazy ( ͡° ͜ʖ ͡°)", (done) => {
        const monad = Identity.of(1337)
            .bind(x => List.of([1, 2, 3, 4, 5].map((_, i) => x + i)))
            .bind(x => Identity.of(x % 2 === 0 ? null : x))
            .bind(Maybe.of)
            .bind(x => List.of([1, 2, 3, 4, 5].map((_, i) => (x + "") + i)))
            .bind(x =>
                Either.of(x, Identity.of, Maybe.nothing)
                    .bind(y => Identity.of(y === "13390")))
            .bind(x => Async.wait(0.01, x));

        assertEquals(monad, Identity.of("13390"), done);
    });

});