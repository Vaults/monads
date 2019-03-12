import {assert} from "chai";
import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";
import Done = Mocha.Done;

// TODO: Monadify
const doAssert = <T>(expected: Monad<T>, actual: Monad<T>, assertFunction: (expected: T, actual: T) => void): void => {
    expected.bind((x: T) => {
        return actual.bind((y: T) => {
            assertFunction(x, y);
            return Maybe.nothing();
        });
    });
};

export const assertEquals = <T>(expected: Monad<T>, actual: Monad<T>, done?: Done) => {
    doAssert(expected, actual, (x: T, y: T) => {
        assert.equal(x, y);
        if (done) {
            done();
        }
    });
};

export const assertNotEquals = <T>(expected: Monad<T>, actual: Monad<T>) => {
    doAssert(expected, actual, (x: T, y: T) => {
        assert.notEqual(x, y);
    });
};