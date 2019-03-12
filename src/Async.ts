import {Identity} from "./Identity";
import {Monad} from "./Monad";

type ThenFunction = (rawValue: any) => Monad<any>;

export class Async<T> implements Monad<T> {

    public static wait<T>(seconds: number, value: T): Async<T> {
        const async = Async.just<T>();
        setTimeout(() => async.resolve(value), seconds * 1000);
        return async;
    }

    public static just<T>(): Async<T> {
        return new Async([]);
    }

    public static of<T>(thenFunctions: ThenFunction[]): Async<T> {
        return new Async(thenFunctions);
    }

    constructor(public thenFunctions: ThenFunction[]) {}

    public resolve(value: T): void {
        this.thenFunctions.reduce((acc: Monad<any>, next) => {
           return acc.bind(next);
        }, Identity.of(value));
    }

    public bind<U>(bindFunction: (rawValue: T) => Monad<U>): Monad<U> {
        this.thenFunctions.push(bindFunction);
        return new Async(this.thenFunctions);
    }

}