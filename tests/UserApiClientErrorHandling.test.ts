import supertest from 'supertest';
import { server, startServer } from '../src/server';
import { Server } from 'http';
import { v4 as uuidv4 } from 'uuid';

describe('API Error Handling', () => {
  const USER_ENDPOINT = '/api/users';
  const request = supertest(server);

  let serverInstance: Server;

  beforeAll(() => {
    serverInstance = startServer(0);
  });

  afterAll(() => {
    serverInstance.close();
  });

  it('GET /api/users/{userId} - should return 404 if the user is not found', async () => {
    const randomId = uuidv4();
    const res = await request.get(`${USER_ENDPOINT}/${randomId}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: 'User not found',
    });
  });

  it('GET /api/users/{userId} - should return 400 if the user ID format is invalid', async () => {
    const invalidUserId = '123';
    const res = await request.get(`${USER_ENDPOINT}/${invalidUserId}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Invalid ID format',
    });
  });

  it('POST /api/users - should return 400 if required fields are missing', async () => {
    const invalidData = { username: 'Nastya' };
    const res = await request.post(USER_ENDPOINT).send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Missing required fields',
    });
  });

  it('PUT /api/users/{userId} - should return 404 if the user is not found', async () => {
    const randomId = uuidv4();
    const data = { username: 'Nastya', age: 25, hobbies: ['reading'] };
    const res = await request.put(`${USER_ENDPOINT}/${randomId}`).send(data);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: 'User not found',
    });
  });

  it('PUT /api/users/{userId} - should return 400 if the user ID format is invalid', async () => {
    const invalidUserId = '123';
    const data = { username: 'Nastya', age: 25, hobbies: ['reading'] };
    const res = await request
      .put(`${USER_ENDPOINT}/${invalidUserId}`)
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Invalid ID format',
    });
  });

  it('DELETE /api/users/{userId} - should return 404 if the user is not found', async () => {
    const randomId = uuidv4();
    const res = await request.delete(`${USER_ENDPOINT}/${randomId}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: 'User not found',
    });
  });

  it('DELETE /api/users/{userId} - should return 400 if the user ID format is invalid', async () => {
    const invalidUserId = '123';
    const res = await request.delete(`${USER_ENDPOINT}/${invalidUserId}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: 'Invalid ID format',
    });
  });
});
