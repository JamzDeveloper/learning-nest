export class NewPokemon {
  constructor(public readonly id: number, public name: string) {}
  sayHi() {
    console.log(`No quiero `);
  }
  attack() {
    console.log(`No quiero`);
  }
}
const MyDecorator = () => {
  return (target: Function) => {
    return NewPokemon;
  };
};

@MyDecorator()
export class Pokemon {
  constructor(public readonly id: number, public name: string) {}
  sayHi() {
    console.log(`hello my name is ${this.name}`);
  }
  attack() {
    console.log(`No quiero`);
  }
}

export const charmander: Pokemon = new Pokemon(1, "charmander");
charmander.sayHi();
