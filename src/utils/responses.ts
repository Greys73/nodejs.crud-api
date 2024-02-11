import { ControllerResponse } from 'types/types';

export const SUCSESS: ControllerResponse = {
  statusCode: 204,
  content: { message: 'Record is found and deleted' },
};

export const ERROR_FIELDS: ControllerResponse = {
  statusCode: 400,
  content: { message: 'Request body contains errors' },
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

export const ERROR_ENDPOINT: ControllerResponse = {
  statusCode: 404,
  content: { message: 'Non-existing endpoint' },
};
