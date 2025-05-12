import supertest from 'supertest';
import { server, startServer } from '../src/server';
import { Server } from 'http';
import { addUserController } from '../src/controllers/UserController';

jest.mock('../src/controllers/UserController', () => ({
  ...jest.requireActual('../src/controllers/UserController'),
  addUserController: jest.fn(),
}));

describe('API Server Error', () => {
  const USER_ENDPOINT = '/api/users';
  const request = supertest(server);
  let serverInstance: Server;

  beforeAll(() => {
    serverInstance = startServer(0);
  });

  afterAll(() => {
    serverInstance.close();
  });

  it('should return 500 for an internal server error (POST /api/users)', async () => {
    (addUserController as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Internal failure');
    });

    const user = { username: 'Nastya', age: 25, hobbies: ['reading'] };
    const res = await request.post(USER_ENDPOINT).send(user);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });
});
