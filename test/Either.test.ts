import {Either} from "../src/Either";
import {Identity} from "../src/Identity";
import {assertEquals} from "./AssertionHelpers";
import {getDescriptionString, getLawString} from "./DescriptionHelpers";


const pickRight = (x: any) => Identity.of(true);
describe(getDescriptionString(Either), () => {

    it(getLawString(1), (done) => {
        const square = (x: number) => Identity.of(x * x);
        const either = Either.of(3,
            (x) => Identity.of(x),
            (x) => Identity.of(x));
        assertEquals(square(3), either.bind(pickRight).bind(square), done);
    });

    it(getLawString(2), (done) => {
        const createEither = (v: any) => Either.of(v, Identity.of, Identity.of);
        const either = createEither(3);
        assertEquals(either, either.bind(createEither), done);
    });

    it(getLawString(3), (done) => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const either = Either.of(3,
            (x) => Identity.of(x),
            (x) => Identity.of(x));


        const expected = either.bind(pickRight).bind(square).bind(add);
        const actual = either.bind(pickRight).bind((x: number) => square(x).bind(add));
        assertEquals(expected, actual, done);
    });

});