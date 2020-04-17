import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error('Usuário não encontrado');

    const passwordMatched = await compare(password, user?.password);

    if (!passwordMatched) throw new Error('Usuário não encontrado');

    const token = sign({}, '1e761c13d4e0e19a2f675008ed812f47', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
