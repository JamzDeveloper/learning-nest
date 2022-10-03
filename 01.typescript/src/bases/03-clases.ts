class Pokemon {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  get sayHi() {
    return `hello my name is ${this.name}`;
  }
}

class Fuego extends Pokemon {
  private poder: string;

  constructor(name: string, poder: string) {
    super(name);
    this.poder = poder;
  }
  get attack() :string{
    return ` ${this.poder} haaaaa`;
  }
}

export const charmander: Fuego = new Fuego("charmander", "bola de fuego");
console.log(charmander);
