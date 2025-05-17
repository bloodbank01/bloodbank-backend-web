import express from 'express'
import AppointmentService from './service'
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from '../../common/satusMessageCode';
import Handler from '../../common/handler';
import handleAuthorization from '../../middleware/handleAuthorization';
import dtoValidationMiddleware from '../../middleware/validation';
import { createAppointment } from '../../dto/appointment';

class AppointmentRouterClass {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private async getAppointment(req: any, res: any): Promise<void> {
    try {
      const result = await AppointmentService.getAppointmentService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private async createAppointment(req: any, res: any): Promise<void> {
    try {
      const result = await AppointmentService.createAppointmentService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private async deleteAppointment(req: any, res: any): Promise<void> {
    try {
      const result = await AppointmentService.deleteAppointmentService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private initializeRoutes(): void {
    this.router.post("/", handleAuthorization, dtoValidationMiddleware(createAppointment), this.createAppointment)
    this.router.get("/", handleAuthorization, this.getAppointment)
    this.router.delete("/:id", handleAuthorization, this.deleteAppointment)
  }
}

export default new AppointmentRouterClass().router;
