import {Monad} from "./Monad";

export class Maybe<T> implements Monad<T> {

    public static just<T>(value: T) {
        if (value === null || value === undefined) {
            throw new Error("Invalid Maybe.some()! Value is non-existent.")
        }
        return new Maybe(value);
    }

    public static nothing<T>() {
        return new Maybe<T>(null);
    }

    constructor(private wrappedValue: T | null) {}

    public bind<U>(bindFunction: (rawValue: T) => Monad<U>): Monad<U> {
        if (this.wrappedValue == null) {
            return Maybe.nothing();
        }
        return bindFunction(this.wrappedValue);
    }

}