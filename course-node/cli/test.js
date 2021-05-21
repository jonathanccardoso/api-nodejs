const { deepEqual, ok, deepStrictEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CREATE = {
  id: 1,
  name: "Flash",
  power: "Speed",
};

const DEFAULT_ITEM_UPDATE = {
  id: 1,
  name: "Lanterna Verde",
  power: "Energia do anel",
};

describe("Hero manipulation suite", () => {
  before(async () => {
    await database.create(DEFAULT_ITEM_CREATE);
    await database.create(DEFAULT_ITEM_UPDATE);
  });

  it("Must search a hero, using files", async () => {
    const expected = DEFAULT_ITEM_CREATE;
    // result on position 0
    const [result] = await database.list(expected.id);

    deepStrictEqual(result, expected);
  });

  it("Must register a hero, using files", async () => {
    const expected = DEFAULT_ITEM_CREATE;
    const result = await database.create(DEFAULT_ITEM_CREATE);
    const [actual] = await database.list(DEFAULT_ITEM_CREATE.id);

    deepStrictEqual(actual, expected);
  });

  it("Must remove a hero by id", async () => {
    const expected = true;
    const result = await database.delete(DEFAULT_ITEM_CREATE.id);

    deepStrictEqual(result, expected);
  });

  it("Must updated a hero by id", async () => {
    const expected = { ...DEFAULT_ITEM_UPDATE, name: "Batman", power: "Money" };
    const newData = {
      name: "Batman",
      power: "Money",
    };

    await database.update(DEFAULT_ITEM_UPDATE.id, expected);
    const [result] = await database.list(DEFAULT_ITEM_UPDATE.id);
    deepStrictEqual(result, expected);
  });
});
