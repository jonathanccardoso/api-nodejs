const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NAME_FILE = "cli/heroes.json";
  }
  async getDataFile() {
    const file = await readFileAsync(this.NAME_FILE, "utf8");

    return JSON.parse(file.toString());
  }
  async writeFile(data) {
    await writeFileAsync(this.NAME_FILE, JSON.stringify(data));
    return true;
  }

  async create(hero) {
    const data = await this.getDataFile();
    const id = hero.id <= 2 ? hero.id : Date.now();

    const heroIdWithId = {
      id,
      ...hero,
    };

    const dataFinal = [...data, heroIdWithId];
    const result = await this.writeFile(dataFinal);
    return result;
  }

  async list(id) {
    const data = await this.getDataFile();
    const dataFilter = data.filter((item) => (id ? item.id === id : true));
    return dataFilter;
  }

  async delete(id) {
    if (!id) {
      return await this.writeFile([]);
    }

    const data = await this.getDataFile();
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      throw Error("O usuário informado nao existe");
    }

    data.splice(index, 1);
    return await this.writeFile(data);
  }

  async update(id, newData) {
    const data = await this.getDataFile();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("The hero defined not exist");
    }
    const current = dada[index];
    const objUpdated = {
      ...current,
      ...newData,
    };
    data.splice(index, 1);

    return await this.writeFile([...data, objUpdated]);
  }
}

module.exports = new Database();
