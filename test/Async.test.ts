import {Async} from "../src/Async";
import {Identity} from "../src/Identity";
import {Monad} from "../src/Monad";
import {assertEquals} from "./AssertionHelpers";
import {getDescriptionString, getLawString} from "./DescriptionHelpers";

const delay = 10;
describe(getDescriptionString(Async), () => {

    it(getLawString(1), (done) => {
        const square = (x: number) => Identity.of(x * x);
        const expected = Async.of([square]);
        const actualAsync = Async.just<number>();
        const actual = actualAsync.bind(square);


        setTimeout(() => {
            expected.resolve(3);
            actualAsync.resolve(3);
        }, delay);

        assertEquals(expected, actual, done);

    });

    it(getLawString(2), (done) => {
        const async = Async.just();
        const resync = async.bind(x => Async.wait(delay / 1000, x));

        setTimeout(() => {
            async.resolve(3);
        }, delay);

        assertEquals(async, resync, done);

    });

    it(getLawString(3), (done) => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const expectedAsync = Async.just<number>();
        const expected = expectedAsync.bind(square).bind(add);
        const actualAsync = Async.just<number>();
        const actual = actualAsync.bind(x => square(x).bind(add));

        setTimeout(() => {
            expectedAsync.resolve(3);
            actualAsync.resolve(3);
        }, delay);

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
        }, delay);

    });

    it("wait", (done) => {
        const wait = Async.wait(delay / 1000, delay / 1000)
            .bind(x => Async.wait(x, "Yes!"))
            .bind(Identity.of);

        assertEquals(wait, Identity.of("Yes!"), done);

    });

});