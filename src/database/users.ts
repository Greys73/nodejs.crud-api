import { v4 as uuid } from 'uuid';
import { TUser, TUsers } from './../types/types';

class UsersDB {
  users: TUsers;

  constructor() {
    this.users = [];
  }

  getUsers = () => this.users;

  getUser = (id: string) => this.users.find((user) => user.id === id);

  deleteUser = (id: string) => {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  };

  addUser = (_user: TUser) => {
    const { username, age, hobbies } = _user;
    const id = uuid();
    const user: TUser = { id, username, age, hobbies };
    this.users.push(user);
    return user;
  };

  updateUser = (_user: TUser) => {
    const { id, username, age, hobbies } = _user;
    const user = this.getUser(id!);
    if (user) {
      user.username = username;
      user.age = age;
      user.hobbies = hobbies;
    }
    return user;
  };
}

const users = new UsersDB();

export default users;
