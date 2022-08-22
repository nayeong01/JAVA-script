class Item{
    #coffee=2000;
    #coke=1000;

    constructor(cokeQ, coffeeQ) {
        this.cokeQ = cokeQ;
        this.coffeeQ = coffeeQ;
    }
    get coke(){
        return this.#coke;
    }
    set coke(coke){
        coke = this.#coke;
    }
    get coffee(){
        return this.#coffee;
    }
    set coffee(coffee){
        coffee = this.#coffee;
    }

    get total(){
        return (this.#coffee*this.coffeeQ+this.#coke*this.cokeQ);
    }

    totalPrice(){
        return("\ncoffee Price: "+(this.#coffee*this.coffeeQ)+"\n"+
                "coke Price: "+ (this.#coke*this.cokeQ)+"\n"+
                "total: "+(this.#coffee*this.coffeeQ+this.#coke*this.cokeQ));
    }
}

let item1 = new Item(10,10);
let price = item1.totalPrice();
item1.total();

let item2 = new Item(0,30);
let price1 = item2.totalPrice();
console.log(price1);

let item3 = new Item(20,40);
let price2 = item3.totalPrice();
console.log(price2);