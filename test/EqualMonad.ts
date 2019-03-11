import {Monad} from '../src/Monad';
import Assert = Chai.Assert;

export class EqualMonad<T> implements Monad<T> {

    constructor(private value: T){
        Assert.equals
    }

    bind<U>(bindFunction: (rawValue: T) => U): Monad<U> {
        return new EqualMonad(bindFunction);
    }


}