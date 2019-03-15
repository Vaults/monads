import {BindFunction, Monad} from "./Monad";

export class Identity<T> implements Monad<T> {

    public static of<T>(value: T): Identity<T> {
        return new Identity<T>(value);
    }

    constructor(private value: T) {}

    public bind<U>(bindFunction: BindFunction<T, U>): Monad<U> {
        return bindFunction(this.value);
    }

}