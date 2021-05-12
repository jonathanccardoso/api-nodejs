const service = require("./service");

Array.prototype.myArray = function (callback) {
  const newArray = [];
  for (let i = 0; i <= this.length - 1; i++) {
    const result = callback(this[i], i);
    newArray.push(result);
  }

  return newArray;
};

async function main() {
  try {
    const results = await service.getPeople("a");
    // const names = [];
    // results.results.forEach(function (item) {
    //   names.push(item.name);
    // });

    // const names = results.results.map((item) => item.name);

    const names = results.results.myArray((people, index) => {
      // return people.name;
      return `[${index}] ${people.name}`;
    });
    console.log("names", names);
  } catch (error) {
    console.log("Failed service", error);
  }
}

main();
