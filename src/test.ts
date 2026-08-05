import assert from "./utest/assert";
import Exports from "./utest/exports";


export function test(): void {
  Exports({
    Array: {
      "#hello-world": {
        "hello-world": function () {
          const str = "hello world";
          assert(str === "hello world");
        },
      },
    },
  });
}
