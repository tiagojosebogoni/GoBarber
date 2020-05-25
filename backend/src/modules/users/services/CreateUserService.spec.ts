import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('deve permitir criar um novo usuário', async () => {
    const user = await createUser.execute({
      name: 'Tiago',
      email: 'tiago@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('não deve criar um usuário com email repetido', async () => {
    await createUser.execute({
      name: 'Tiago',
      email: 'tiago@gmail.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Tiago',
        email: 'tiago@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
