const { Pokemon, conn } = require("../../src/db.js");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe("Name", () => {
      it("arroja un error si name es null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Funciona si el name es valido", () => {
        Pokemon.create({ name: "Pikachu" })
      });
    });
  });

  describe("Stats", () => {
    it("Arroja un error si vida no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", vida: "asd" })
        .then(() => done(new Error("Vida no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si fuerza no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", fuerza: "asd" })
        .then(() => done(new Error("Fuerza no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si defensa no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", defensa: "asd" })
        .then(() => done(new Error("Defensa no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si velocidad no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", velocidad: "asd" })
        .then(() => done(new Error("Velocidad no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si altura no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", altura: "asd" })
        .then(() => done(new Error("Altura no es un numero")))
        .catch(() => done());
    });

    it("Arroja un error si peso no es numero", (done) => {
      Pokemon.create({ name: "Pikachu", peso: "asd" })
        .then(() => done(new Error("Peso no es un numero")))
        .catch(() => done());
    });

    it("Funciona si no se pasa un valor algun valor", () => {
      Pokemon.create({ name: "Pikachu" });
      Pokemon.create({ name: "Pikachu", vida: 100});
      Pokemon.create({ name: "Pikachu", defensa: 100 });
      Pokemon.create({ name: "Pikachu", velocidad: 100 });
      Pokemon.create({ name: "Pikachu", altura: 100 });
    });

  });
});
