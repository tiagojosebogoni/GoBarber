import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, email }: Request): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const findUser = await userRepository.findEmail(email);

    if (findUser) {
      throw new Error('Email duplicado');
    }

    const user = userRepository.create({ name, email });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
