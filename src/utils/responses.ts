import { ControllerResponse } from 'types/types';

export const ERROR_FIELDS: ControllerResponse = {
  statusCode: 400,
  content: { message: 'Request body does not contain required fields' },
};

export const ERROR_UUID: ControllerResponse = {
  statusCode: 400,
  content: { message: 'Invalid ID format(not UUID)' },
};

export const ERROR_JSON: ControllerResponse = {
  statusCode: 400,
  content: { message: 'Wrong JSON format' },
};

export const USER_NOT_FOUND: ControllerResponse = {
  statusCode: 404,
  content: { message: 'User not found' },
};