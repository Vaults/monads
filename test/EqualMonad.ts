import {assert} from "chai";
import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";

export const assertEquals = <T>(expected: Monad<T>, actual: Monad<T>) => {
    return expected.bind(x => actual.bind(y => new EqualMonad(x, y)));
};

export class EqualMonad<T> implements Monad<T> {

    constructor(private expected: T, private actual: T) {
        assert.equal(expected, actual);
    }

    public bind<U>(bindFunction: (rawValue: T) => Monad<U>): Monad<U> {
        return Maybe.nothing();
    }

}