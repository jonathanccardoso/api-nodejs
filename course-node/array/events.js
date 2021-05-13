const stdin = process.openStdin();

function main() {
  return new Promise(function (resolve, reject) {
    stdin.addListener("data", function (value) {
      // console.log(`Voce digitou: ${value.toString().trim()}`);
      return resolve(value);
    });
  });
}

// promise its run 1x
main().then(function (result) {
  console.log("result", result.toString());
});

// exec Nx
stdin.addListener("data", function (value) {
  console.log(`Voce digitou: ${value.toString().trim()}`);
});
