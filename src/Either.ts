import {BindFunction, Monad} from "./Monad";

export class Either<T, U> implements Monad<T> {
    public static of<T, U>(value: T, right: BindFunction<T, U>, left: BindFunction<T, U>) {
        return new Either(value, right, left);
    }

    constructor(private value: T, private right: BindFunction<T, U>, private left: BindFunction<T, U>) { }

    public bind(bindFunction: BindFunction<T, any>): Monad<any> {
        return bindFunction(this.value)
            .bind((value: any) => {
                if (value) {
                    return this.right(this.value);
                } else {
                    return this.left(this.value);
                }
            });
    }

}