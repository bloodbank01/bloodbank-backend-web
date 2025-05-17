import express from 'express'
import ContactService from './service'
import dtoValidationMiddleware from '../../middleware/validation';
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from '../../common/satusMessageCode';
import Handler from '../../common/handler';
import handleAuthorization from '../../middleware/handleAuthorization';
import { createContact } from '../../dto/contact';

class ContactRouterClass {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private async createContact(req: any, res: any): Promise<void> {
    try {
      const result = await ContactService.createContactService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private initializeRoutes(): void {
    this.router.post("/", dtoValidationMiddleware(createContact), this.createContact)
  }
}

export default new ContactRouterClass().router;
