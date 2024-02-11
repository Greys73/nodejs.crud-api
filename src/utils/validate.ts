import { TUser } from './../types/types';
export const isValidUser = (obj: TUser & object) => {
  const isRequired = ['username', 'age', 'hobbies'].every((id) => id in obj);
  if (!isRequired) return false;

  const isCorrect =
    typeof obj.username === 'string' &&
    typeof obj.age === 'number' &&
    Array.isArray(obj.hobbies)&&
    obj.hobbies.every((item) => typeof item === 'string');

  return isCorrect;
};
