import {Identity} from "../src/Identity";
import {List} from "../src/List";
import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";
import {assertEquals} from "./AssertionHelpers";

describe("Monad - List", () => {

    it("Law 1 - left identity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        assertEquals(List.of([9]), List.of([3]).bind(square), done);
    });

    it("Law 2 - right identity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        const list: Monad<number> = List.of([3]);
        assertEquals(square(3), list.bind(square), done);
    });

    it("Law 3 - associativity", (done) => {
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