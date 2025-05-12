import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';
import { responseErrors, responseSuccess } from '../utils/Response';
import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../models/ResponseResult';

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
  body: Omit<User, 'id'>,
): ResponseResultSuccess<User> | ResponseResultError => {
  const { username, age, hobbies } = body;
  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    return responseErrors.MRF();
  }
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);

  return responseSuccess.CREATE(newUser);
};

export const updateUser = (
  id: string,
  body: Omit<User, 'id'>,
): ResponseResultSuccess<User> | ResponseResultError => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return responseErrors.NF();
  }
  const { username, age, hobbies } = body;
  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    return responseErrors.MRF();
  }
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
