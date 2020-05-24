import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('deve permitir recuperar a senha usando o email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Tiago',
      email: 'tiago@gmail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'tiago@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('não permitir recuperar a senha de um email não existente', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'tiago@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve permitir um token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Tiago',
      email: 'tiago@gmail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'tiago@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
