import { validate } from 'uuid';
import users from "./../database/users";
import { ControllerResponse } from "types/types";

let badRes: ControllerResponse = {
  statusCode: 404,
  content: { message: 'User not found!' },
};

const getUser = (id: string) => {  
  if(!validate(id)) return {
    statusCode: 400,
    content: {message: 'Invalid ID format(not UUID)'},
  };
  
  const user = users.getUser(id);
  if(user) return { statusCode: 200, content: {data: user} };

  return badRes;
}
export default getUser;