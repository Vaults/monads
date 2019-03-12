import {Async} from "../src/Async";
import {Identity} from "../src/Identity";

describe("Monad - Async", () => {

    it("should resolve in chains", (done) => {
        const async = new Async<number>();
        async
            .bind((x: number) => new Identity( x + 3))
            .bind((x: number) => {
                console.log(x, 'test');
                done();
                return new Identity(x);
            });



        setTimeout(() => {
            async.resolve(8);
        }, 100);

    });

});