import Appointement from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTO): Promise<Appointement>;
  findByDate(date: Date): Promise<Appointement | undefined>;
  findAllInMontFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointement[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointement[]>;
}
