// callback resolve async to sync methods

const util = require("util"); //to convert callback to promise
const getAddressAsync = util.promisify(getAddress);

function getUser() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error("Failed user!"));

      return resolve({
        id: 1,
        name: "Aladin",
        birthday: new Date(),
      });
    }, 1000);
  });
}

function getPhone(idUser) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        phone: "1190000000",
        ddd: 11,
      });
    }, 2000);
  });
}

function getAddress(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      street: "Rua XXX",
      number: 0,
    });
  }, 2000);
}

// async only as functions promises!
main();

async function main() {
  try {
    console.time("time-promise");
    const user = await getUser();
    // const phone = await getPhone(user.id);
    // const address = await getAddressAsync(user.id);

    // run in background is more performative
    const result = await Promise.all([
      getPhone(user.id),
      getAddressAsync(user.id),
    ]);
    const phone = result[0];
    const address = result[1];

    console.log(`
      Nome: ${user.name}
      Endereco: ${address.street}, ${address.number}
      Telefone: (${phone.ddd}) ${phone.phone}
    `);
    console.timeEnd("time-promise");
  } catch (error) {
    console.error("Failed!", error);
  }
}
