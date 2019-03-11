import {Monad} from "./Monad";

export class Identity<T> implements Monad<T> {

    constructor(private wrappedValue: T){}

    bind<U, V>(bindFunction: (rawValue: T) => Monad<U> | V): Monad<U> | V {
        return bindFunction(this.wrappedValue);
    }

    unit(wrappedValue: T): Monad<T> {
        return new Identity(wrappedValue);
    }

}