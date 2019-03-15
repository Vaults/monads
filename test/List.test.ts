import {Identity} from "../src/Identity";
import {List} from "../src/List";
import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";
import {assertEquals} from "./AssertionHelpers";
import {getDescriptionString, getLawString} from "./DescriptionHelpers";

describe(getDescriptionString(List), () => {

    it(getLawString(1), (done) => {
        const square = (x: number) => Identity.of(x * x);
        assertEquals(List.of([9]), List.of([3]).bind(square), done);
    });

    it(getLawString(2), (done) => {
        const list = List.of([3]);
        assertEquals(list, list.bind(x => List.of([x])), done);
    });

    it(getLawString(3), (done) => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const seed = List.of([2]);

        const expected = seed.bind(square).bind(add);
        const actual = seed.bind((x: number) => square(x).bind(add));
        assertEquals(expected, actual, done);
    });

    it("Larger test", (done) => {
       // TODO: Don't have Either yet
        type eitherSub<T> = (n: number) => Monad<T>;
        const toSqrt: eitherSub<number> = (n) => {
           if (n < 0) {
               return Maybe.nothing();
           } else {
               const positiveSqrt = Math.sqrt(n);
               return List.of([-positiveSqrt, positiveSqrt]);
           }
       };

        const filterPositive: eitherSub<number> = (n) => {
           if (n < 0) {
               return Maybe.nothing();
           } else {
               return Identity.of(n);
           }
       };

        const sqrtMonad: Monad<number> = List.of([-1, -10, 9])
            .bind(toSqrt);
        assertEquals(sqrtMonad.bind(filterPositive), Identity.of(3), done);
    });
});