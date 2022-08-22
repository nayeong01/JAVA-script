class Person {
    #firstname;
    #lastname;
    constructor(firstname, lastname) {

        if(firstname.startsWith("M")){
            this.#firstname = firstname; 
          } else {
            this.#firstname = "M" + firstname; 
          }
          this.#lastname = lastname; 
        }
      
    get firstname() {
        return this.#firstname;
      }
    set firstname(firstname) {
        this.#firstname = firstname;
      } 
    get lastname() {
        return this.#lastname;
      }
    set lastname(lastname) {
        this.#lastname = lastname;
      }       
  }
  let p = new Person("Maria", "Saga");
  let p1 = new Person("kay", "Moon");
  p.firstname = "Adnane"; // 갱신가능

  console.log(p.firstname);
  console.log(p1.firstname);
  