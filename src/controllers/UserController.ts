import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from '../storage/UserStorage';
import { User } from '../models/User';

export const getUsersController = () => getUsers();
export const getUserByIdController = (id: string) => getUserById(id);
export const addUserController = (body: Omit<User, 'id'>) => addUser(body);
export const updateUserController = (id: string, body: Omit<User, 'id'>) =>
  updateUser(id, body);
export const deleteUserController = (id: string) => deleteUser(id);
