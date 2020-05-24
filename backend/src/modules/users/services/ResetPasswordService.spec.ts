import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('deve permitir resetar o password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Tiago',
      email: 'tiago@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '123123', token });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('não deve permiter resetar senha sem token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'nao_existe_token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve permiter resetar senha sem usuário', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'nao_exite_usuario',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve setar a senha se passou 2 horas', async () => {
    const user = await fakeUserRepository.create({
      name: 'tiago',
      email: 'tiago@gmail.com',
      password: '123123',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custonDate = new Date();

      return custonDate.setHours(custonDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
