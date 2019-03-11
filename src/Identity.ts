import {Monad} from "./Monad";

export class Identity<T> implements Monad<T> {

    constructor(private value: T) {}

    public bind<U>(bindFunction: (rawValue: T) => Monad<U>): Monad<U> {
        return bindFunction(this.value);
    }

}