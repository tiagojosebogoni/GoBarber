import ICreateAppointmentDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificatonsRepository {
  create(data: ICreateAppointmentDTO): Promise<Notification>;

}
