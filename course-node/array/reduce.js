const { getPeople } = require("./service");

Array.prototype.myReduce = function (callback, initialValue) {
  let valueFinal = typeof valueInitial !== undefined ? initialValue : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    valueFinal = callback(valueFinal, this[index], this);
  }

  return valueFinal;
};

async function main() {
  try {
    const { results } = await getPeople("a");
    const height = results.map((item) => parseInt(item.height));

    // const total = height.reduce((previous, current) => {
    //   return previous + current;
    // }, 0);
    // console.log("total", total);

    const myList = [
      ["Jonathan", "Cardoso"],
      ["Frontend", "Backend"],
    ];
    const total = myList
      .myReduce((previous, current) => {
        return previous.concat(current);
      }, [])
      .join(", ");
    console.log("total", total);
  } catch (error) {
    console.log("Failed service", error);
  }
}

main();
