import users from './../database/users';
import { ControllerResponse } from 'types/types';

const getAllUsers = (): ControllerResponse => {
  const result = {
    statusCode: 200,
    content: { data: users.getUsers() },
  };
  return result;
};
export default getAllUsers;
