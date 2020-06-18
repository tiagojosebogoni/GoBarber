import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const avalilability = await listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(avalilability);
  }
}

export default ProviderDayAvailabilityController;
