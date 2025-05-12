import { User } from '../models/User';

export const isValidUserData = (body: unknown): body is Omit<User, 'id'> => {
  return (
    typeof body === 'object' &&
    body !== null &&
    'username' in body &&
    'age' in body &&
    'hobbies' in body &&
    typeof body.username === 'string' &&
    typeof body.age === 'number' &&
    Array.isArray(body.hobbies)
  );
};
