// callback resolve async to sync methods

function getUser(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      name: "Aladin",
      birthday: new Date(),
    });
  }, 1000);
}

function getPhone(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      phone: "1190000000",
      ddd: 11,
    });
  }, 2000);
}

function getAddress(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      street: "Rua XXX",
      number: 0,
    });
  }, 2000);
}

function resolveUser(error, user) {
  console.log("user", user);
}

getUser(function resolveUser(error, user) {
  if (error) {
    console.error("Failed user", error);
    return;
  }
  getPhone(user.id, function resolvePhone(error1, phone) {
    if (error1) {
      console.error("Failed phone", error1);
      return;
    }
    getAddress(user.id, function resolveAdrress(error2, address) {
      if (error2) {
        console.error("Failed phone", error2);
        return;
      }

      console.log(`
      Nome: ${user.name},
      Endereco: ${address.street}, nº${address.number},
      Telefone: (${phone.ddd}) ${phone.phone}
      `);
    });
  });
});

// const phone = getPhone(user.id);
// console.log("phone", phone);
