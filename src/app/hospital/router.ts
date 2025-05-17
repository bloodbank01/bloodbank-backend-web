import express from 'express'
import HospitalService from './service'
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from '../../common/satusMessageCode';
import Handler from '../../common/handler';
import handleAuthorization from '../../middleware/handleAuthorization';

class HospitalRouterClass {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private async getHospital(req: any, res: any): Promise<void> {
    try {
      const result = await HospitalService.getHospitalService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private initializeRoutes(): void {
    this.router.get("/", handleAuthorization, this.getHospital)
  }
}

export default new HospitalRouterClass().router;
