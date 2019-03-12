import {Identity} from "./Identity";
import {Monad} from "./Monad";

type ThenFunction = (rawValue: any) => Monad<any>;

export class Async<T> implements Monad<T> {
    constructor(public thenFunctions: ThenFunction[] = []) {}

    public resolve(value: T): void {
        this.thenFunctions.reduce((acc: Monad<any>, next) => {
           return acc.bind(next);
        }, new Identity(value));
    }

    public bind<U>(bindFunction: (rawValue: T) => Monad<U>): Monad<U> {
        this.thenFunctions.push(bindFunction);
        return new Async(this.thenFunctions);
    }

}