import { IncomingMessage, ServerResponse } from 'http';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from './controllers';
import { ControllerResponse } from './../types/types';
import { ERROR_ENDPOINT } from './../utils/responses';
import parseUserId from './../utils/parseUserId';

const DEF_PATH = '/api/users';
const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export const serverController = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { url, method } = request;
  let respData: ControllerResponse = ERROR_ENDPOINT;

  if (url?.startsWith(DEF_PATH)) {
    const endPoint = url.replace(DEF_PATH, '');
    const userId = parseUserId(endPoint);
    if (userId) {
      switch (method) {
        case 'GET':
          respData = getUser(userId);
          break;
        case 'PUT':
          respData = (await updateUser(userId, request)) as ControllerResponse;
          break;
        case 'DELETE':
          respData = deleteUser(userId);
          break;
        default:
          break;
      }
    } else if (endPoint.length === 0 || endPoint === '/') {
      switch (method) {
        case 'GET':
          respData = getAllUsers();
          break;
        case 'POST':
          respData = (await createUser(request)) as ControllerResponse;
          break;
        default:
          break;
      }
    }
  }
  response.writeHead(respData.statusCode, CONTENT_TYPE);
  response.end(JSON.stringify(respData.content));
};
