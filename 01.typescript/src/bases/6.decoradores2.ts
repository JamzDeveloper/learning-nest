const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      // console.log({target})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}
  export class Pokemon {
    constructor(public readonly id: number, public name: string) {}
    speak2() {
      console.log(`hello my name is ${this.name}`);
    }
    @Deprecated('Most use speak2 method instead')
    speak(){
        console.log("metodo 1")
    }
    attack() {
      console.log(`No quiero`);
    }
  }
  
  export const charmander: Pokemon = new Pokemon(1, "charmander");
  charmander.speak2();
  