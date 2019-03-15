export type BindFunction<T, U> = (rawValue: T) => Monad<U>;

export interface Monad<T> {
    bind<U>(bindFunction: BindFunction<T, U>): Monad<U>;
}
