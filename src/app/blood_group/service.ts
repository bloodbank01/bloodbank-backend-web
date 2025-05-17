import dotenv from "dotenv"
dotenv.config();
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from "../../common/satusMessageCode";
import Handler from "../../common/handler";
import { BloodGroup } from "../../models/blood_group";

class BloodGroupService {

  async getBloodGroupService(req: any) {
    try {

      const find_blood_groups = await BloodGroup.findAll({
        order: [['name', 'ASC']]
      })

      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "BloodGroup Data Get Successfully!", find_blood_groups)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }

}

export default new BloodGroupService();
