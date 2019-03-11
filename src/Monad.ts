
export interface Monad<T> {
    bind<U>(bindFunction: (rawValue: T) => Monad<U>): Monad<U>;
}
