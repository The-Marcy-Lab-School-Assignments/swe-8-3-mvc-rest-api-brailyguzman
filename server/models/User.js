const getId = require('../utils/getId.js');

const users = [
  {
    id: getId(),
    name: 'Mark Williams',
    email: 'mark@email.com',
  },
  {
    id: getId(),
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
  },
  {
    id: getId(),
    name: 'Emily Davis',
    email: 'emily@email.com',
  },
  {
    id: getId(),
    name: 'John Smith',
    email: 'john@email.com',
  },
  {
    id: getId(),
    name: 'David Brown',
    email: 'david@email.com',
  },
];

class User {
  static create(name, email) {
    const newUser = {
      id: getId(),
      name,
      email,
    };

    users.push(newUser);
    return newUser;
  }

  static list() {
    return [...users];
  }

  static find(id) {
    return users.find((user) => user.id === id);
  }

  static edit(id, email) {
    const userIndex = users.findIndex((user) => user.id === id);

    const user = users[userIndex];
    user.email = email;

    return user;
  }

  static delete(id) {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) return false;
    users.splice(userIndex, 1);

    return true;
  }
}

module.exports = User;
