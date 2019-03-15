import {Identity} from "../src/Identity";
import {assertEquals} from "./AssertionHelpers";
import {getDescriptionString, getLawString} from "./DescriptionHelpers";

describe(getDescriptionString(Identity), () => {

    it(getLawString(1), (done) => {
        const square = (x: number) => Identity.of(x * x);
        assertEquals(square(3), Identity.of(3).bind(square), done);
    });

    it(getLawString(2), (done) => {
        const m = Identity.of(3);
        assertEquals(m, m.bind(Identity.of), done);
    });

    it(getLawString(3), (done) => {
        const square = (x: number) => Identity.of(x * x);
        const add = (x: number) => Identity.of(x + x);
        const expected = Identity.of(3).bind(square).bind(add);
        const actual = Identity.of(3).bind((x: number) => square(x).bind(add));
        assertEquals(expected, actual, done);
    });
});