import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';
import { responseErrors, responseSuccess } from '../utils/Response';
import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../models/ResponseResult';
import { isValidUserData } from '../utils/TypeGuard';

const users: User[] = [];

export const getUsers = (): ResponseResultSuccess<User[]> =>
  responseSuccess.OK(users);

export const getUserById = (
  id: string,
): ResponseResultSuccess<User> | ResponseResultError => {
  const user = users.find((user) => user.id === id);
  return user ? responseSuccess.OK(user) : responseErrors.NF();
};

export const addUser = (
  body: unknown,
): ResponseResultSuccess<User> | ResponseResultError => {
  if (!isValidUserData(body)) {
    return responseErrors.MRF();
  }

  const { username, age, hobbies } = body;

  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);

  return responseSuccess.CREATE(newUser);
};

export const updateUser = (
  id: string,
  body: unknown,
): ResponseResultSuccess<User> | ResponseResultError => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return responseErrors.NF();
  }

  if (!isValidUserData(body)) {
    return responseErrors.MRF();
  }

  const { username, age, hobbies } = body;
  users[index] = { id, username, age, hobbies };
  return responseSuccess.OK(users[index]);
};

export const deleteUser = (
  id: string,
): ResponseResultSuccess<undefined> | ResponseResultError => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return responseErrors.NF();
  }
  users.splice(index, 1);
  return responseSuccess.DELETE();
};
