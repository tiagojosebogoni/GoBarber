import Appointement from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTO): Promise<Appointement>;
  findByDate(date: Date): Promise<Appointement | undefined>;
}
