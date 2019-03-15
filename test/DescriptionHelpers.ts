export const getDescriptionString: (item: any) => string = (item) => {
    return `Monad - ${item.name}`;
};

export const getLawString: (law: number) => string = (law) => {
    return [
        `Law 1 - Left identity - unit(x).bind(f) === f(x)`,
        `Law 2 - Right identity - m.bind(unit) === m`,
        `Law 3 - Associativity - m.bind(f).bind(g) === m.bind(x => f(x).bind(g))`,
    ][law - 1];
};