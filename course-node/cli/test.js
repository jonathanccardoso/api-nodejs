const { deepEqual, ok, deepStrictEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = {
  id: 1,
  name: "Flash",
  power: "Speed",
};

describe("Hero manipulation suite", () => {
  it("Must search a hero, using files", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    
    // result is position 0
    const [result] = await database.list(expected.id);

    deepStrictEqual(result, expected);
  });

  // it("Must register a hero, using files", async () => {
  //   const expected = DEFAULT_ITEM_CADASTRAR;

  //   ok(null, expected);
  // });
});
