import { v4 as uuid } from 'uuid';
import { TUser, TUsers } from "types/types";

class UsersDB {
  users: TUsers;

  constructor() {
    this.users = [];
  }

  getUsers = () => this.users;

  getUser = (id: string) => this.users.find(user => user.id === id);

  deleteUser = (id: string) => {
    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
  }

  addUser = (username: string, age: number, hobbies: string[]) => {
    const id = uuid();
    const user: TUser = { id, username, age, hobbies };
    this.users.push(user);
    return user;
  }

  updateUser = (_user: TUser) => {
    const {id} = _user;
    let user = this.getUser(id!);
    if(user) user = {..._user};
    return user;
  }
}

const users = new UsersDB();

export default users;
