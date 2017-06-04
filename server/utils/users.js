[{
  id: '12345',
  name: 'Serge',
  room: 'Gym'
}]

class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }
  getUserDescription () {
    return `${this.name} is ${this.age} years old`;
  }
}

var me = new Person('Valery', 25);
var description = me.getUserDescription();
console.log(description);
