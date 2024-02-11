import { validate } from 'uuid';
import users from './../database/users';
import { ERROR_UUID, SUCSESS, USER_NOT_FOUND } from './../utils/responses';

const deleteUser = (id: string) => {
  if (!validate(id)) return ERROR_UUID;

  const user = users.getUser(id);
  if (user) {
    users.deleteUser(id);
    return SUCSESS;
  }

  return USER_NOT_FOUND;
};
export default deleteUser;
