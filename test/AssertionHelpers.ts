import {assert} from "chai";
import {Identity} from "../src/Identity";
import {Maybe} from "../src/Maybe";
import {Monad} from "../src/Monad";
import Done = Mocha.Done;

type AssertFunction<T> = (expected: T, actual: T) => void;

// TODO: Monadify
const doAssert = <T>(expected: Monad<T>, actual: Monad<T>, assertFunction: AssertFunction<T>): void => {
    const comp = new BinaryAsyncComparator(assertFunction);
    expected.bind(x => {
        comp.setA(x);
        return Identity.of(x);
    });
    actual.bind(x => {
        comp.setB(x);
        return Identity.of(x);
    });
};

class BinaryAsyncComparator {
    private isSetA = false;
    private isSetB = false;
    private a: any = null;
    private b: any = null;

    constructor(private callback: (a: any, b: any) => void) { }

    public setA(a: any): void {
        this.a = a;
        this.isSetA = true;
        this.tryCallback();
    }

    public setB(b: any): void {
        this.b = b;
        this.isSetB = true;
        this.tryCallback();
    }

    private tryCallback() {
        if (this.isSetA && this.isSetB) {
            this.callback(this.a, this.b);
        }
    }

}

export const assertEquals = <T>(expected: Monad<T>, actual: Monad<T>, done: Done) => {
    doAssert(expected, actual, (x, y) => {
        assert.equal(x, y);
        done();
    });
};

export const assertNothing = <T>(expected: Monad<T>) => {
    expected.bind(value => {
       assert.fail("Asserted nothing, but method not short circuited!");
       return Maybe.nothing();
    });
};