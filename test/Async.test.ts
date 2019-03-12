import {Async} from "../src/Async";
import {Identity} from "../src/Identity";
import {Monad} from "../src/Monad";
import {assertEquals} from "./AssertionHelpers";

describe("Monad - Async", () => {

    it("Law 1 - left identity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        const expected = Async.of([square]);
        const actualAsync = Async.just<number>();
        const actual = actualAsync.bind(square);

        setTimeout(() => {
            expected.resolve(3);
            actualAsync.resolve(3);
        }, 100);

        assertEquals(expected, actual, done);

    });

    it("Law 2 - right identity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        const simple = Async.just<number>();

        setTimeout(() => {
            simple.resolve(3);
        }, 100);

        assertEquals(square(3), simple.bind(square), done);
    });

    it("Law 3 - associativity", (done) => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const expectedAsync = Async.just<number>();
        const expected = expectedAsync.bind(square).bind(add);
        const actualAsync = Async.just<number>();
        const actual = actualAsync.bind(x => square(x).bind(add));

        setTimeout(() => {
            expectedAsync.resolve(3);
            actualAsync.resolve(3);
        }, 100);

        assertEquals(expected, actual, done);

    });

    it("should resolve in chains", (done) => {
        const async = Async.just<number>();
        const monad: Monad<number> = async
            .bind((x: number) => Identity.of(x + 3))
            .bind((x: number) => Identity.of(x * x));

        assertEquals(monad, Identity.of(121), done);

        setTimeout(() => {
            async.resolve(8);
        }, 100);

    });

    it("wait", (done) => {
        const wait = Async.wait(2, 2)
            .bind(x => Async.wait(x, "Yes!"))
            .bind(x => Identity.of(x));

        assertEquals(wait, Identity.of("Yes!"), done);

    }).timeout(5000);

});