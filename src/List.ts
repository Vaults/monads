import {Identity} from "./Identity";
import {BindFunction, Monad} from "./Monad";

export class List<T> implements Monad<T> {

    public static of<T>(list: T[]) {
        return new List(list.map(Identity.of));
    }

    constructor(private wrappedValue: Array<Monad<T>>) { }

    public bind<U>(bindFunction: BindFunction<T, U>): Monad<U> {
        return new List(this.wrappedValue.map(o => o.bind(bindFunction)));
    }

}