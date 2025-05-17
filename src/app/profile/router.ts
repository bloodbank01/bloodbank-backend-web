import express from 'express'
import ProfileService from './service'
import dtoValidationMiddleware from '../../middleware/validation';
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from '../../common/satusMessageCode';
import Handler from '../../common/handler';
import handleAuthorization from '../../middleware/handleAuthorization';
import { upload_profile } from '../../middleware/multer';

class ProfileRouterClass {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private async getProfile(req: any, res: any): Promise<void> {
    try {
      const result = await ProfileService.getProfileService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private async updateProfile(req: any, res: any): Promise<void> {
    try {
      const result = await ProfileService.updateProfileService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private async updateProfilePic(req: any, res: any): Promise<void> {
    try {
      const result = await ProfileService.updateProfilePicService(req);
      res.status(result?.success?.statusCode || result?.error?.statusCode).json(result);
    } catch (error: any) {
      res.status(STATUS_CODE.EC500).json(Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500));
    }
  }

  private initializeRoutes(): void {
    this.router.get("/", handleAuthorization, this.getProfile)
    this.router.put("/", handleAuthorization, this.updateProfile)
    this.router.post("/upload-profile-pic", handleAuthorization, upload_profile, this.updateProfilePic)
  }
}

export default new ProfileRouterClass().router;
