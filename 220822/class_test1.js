class Animal {
    constructor(name, sound) {
        this.sound = sound;
        this.name = name;
    }

    result() {
        return this.name + "는 "+ this.sound + "하고 웁니다."
    }
}

class Dog extends Animal {
    constructor(name, sound) {
        super(name, sound= "bow wow");
    }
}
class Cat extends Animal {
    constructor(name, sound) {
        super(name, sound="meow");
    }
}

Animal.prototype.introduce = function () {
    console.log(this.name + "는 "+ this.sound + "하고 웁니다.");
    console.log(`${this.name}가 좋아하는건 ${this.habit}입니다.`)
}

Dog.prototype.habit = "tug";
Cat.prototype.habit = "nap";

let dog = new Dog("dog");
dog.introduce();

let cat = new Cat("cat");
cat.introduce();

