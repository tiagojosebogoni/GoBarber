import User from '@modules/users/infra/typeorm/entities/User';
import IcreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IcreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
