import { ControllerResponse } from './../types/types';
import { IncomingMessage, ServerResponse } from 'http';
import { createUser, getAllUsers, getUser } from './controllers';
// import users from '../database/users';

const DEF_PATH = '/api/users';
const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export const serverController = async (request: IncomingMessage, response: ServerResponse) => {
  const { url, method } = request;
  let respData: ControllerResponse = {
    statusCode: 404,
    content: { message: 'Non-existing endpoint!' },
  }

  // users.addUser({ username: 'Vasya', age: 25 ,hobbies: [] });
  // users.addUser({ username: 'Nina', age: 25 ,hobbies: [] });

  if (url?.startsWith(DEF_PATH)) {
    const userId = url.replace(DEF_PATH,'');
    if (userId) {
      switch (method) {
        case 'GET':
          respData = getUser(userId);
          break;
        case 'POST':
          respData = getUser(userId);
          break;
        case 'PUT':
          respData = getUser(userId);
          break;
        case 'DELETE':
          respData = getUser(userId);
          break;
        default:
          break;
      }
    } else {
      switch (method) {
        case 'GET':
          respData = getAllUsers();
          break;
        case 'POST':
          respData = await createUser(request) as ControllerResponse;
          break;
      
        default:
          break;
      }
    }
  }
  response.writeHead(respData.statusCode, CONTENT_TYPE);
  response.end(JSON.stringify(respData.content));
};