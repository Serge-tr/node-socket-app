[{
  id: '12345',
  name: 'Serge',
  room: 'Gym'
}]

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} years old`;
//   }
// }
//
// var me = new Person('Valery', 25);
// var description = me.getUserDescription();
// console.log(description);
