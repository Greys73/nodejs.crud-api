import { get, createServer } from 'node:http';
import { serverController } from './../controllers/server';
import users from '../database/users';

const server = () =>
  new Promise((resolve) => {
    createServer(serverController).listen(3001, () => {
      resolve('');
    });
  });

const request = (url: string) =>
  new Promise((resolve) => {
    get(url, (res) => {
      let body = '';
      res.on('data', (chunk: string) => {
        body += chunk.toString();
      });
      res.on('end', () => resolve(body));
    });
  });

describe('API tests', () => {
  test('should create users', async () => {
    await server();
    let res = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ).data;
    expect(res.length).toBe(0);
    users.addUser({ username: 'User1', age: 20, hobbies: ['a', 'b'] });
    users.addUser({ username: 'User2', age: 22, hobbies: ['b', 'a'] });
    users.addUser({ username: 'User3', age: 25, hobbies: ['s', 'f'] });
    res = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ).data;
    expect(res.length).toBe(3);
  });

  test('should delete user', async () => {
    let res = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ).data;
    expect(res.length).toBe(3);
    users.deleteUser(res[0].id);
    res = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ).data;
    expect(res.length).toBe(2);
  });

  test('should get user by id', async () => {
    const res = JSON.parse(
      (await request('http://localhost:3001/api/users')) as string,
    ).data;
    const user = users.getUser(res[0].id);
    expect(user?.id).toBe(res[0].id);
  });

  test('should get message by wrong user id', async () => {
    const wrongId = 'b100574a-dcda-48f3-808b-8cf420446b31';
    const res = JSON.parse(
      (await request(`http://localhost:3001/api/users/${wrongId}`)) as string,
    );
    expect(res.message).toBe('User not found');
  });

  test('should get message by wrong endpoint', async () => {
    const wrongEndpoint = '/some/wrong/endpoint';
    const res = JSON.parse(
      (await request(
        `http://localhost:3001/api/users/${wrongEndpoint}`,
      )) as string,
    );
    expect(res.message).toBe('Non-existing endpoint');
  });
});
