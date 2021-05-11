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

const userPromise = getUser();
userPromise
  .then(function (user) {
    // pass data to another then
    return getPhone(user.id).then(function resolvePhone(result) {
      return {
        user: {
          name: user.name,
          id: user.id,
        },
        phone: result,
      };
    });
  })
  .then(function (result1) {
    const address = getAddressAsync(result1.user.id);
    return address.then(function resolveAddress(result) {
      return {
        user: result1.user,
        phone: result1.phone,
        address: result,
      };
    });
  })
  .then(function (result) {
    console.log(`
    Nome: ${result.user.name}
    Endereco: ${result.address.street}, ${result.address.number}
    Telefone: (${result.phone.ddd}) ${result.phone.phone}
    `);
  })
  .catch(function (error) {
    console.log("Failed on user", error);
  });

// const phone = getPhone(user.id);
// console.log("phone", phone);
