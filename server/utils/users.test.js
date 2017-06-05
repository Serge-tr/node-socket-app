const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Lorenzo',
      room: 'Node'
    }, {
      id: '2',
      name: 'Solomon',
      room: 'JS'
    }, {
      id: '3',
      name: 'John',
      room: 'Node'
    }]
  });

  it ('should add new user', () => {
    let users = new Users();
    let user = {
      id: '12345',
      name: 'Ivan',
      room: 'CoffeeShop'
    };

    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should find a user', () => {
    let userId = '2';
    let user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should return names for Node', () => {
    let userList = users.getUserList('Node');
    expect(userList).toEqual(['Lorenzo', 'John']);
  })
})
