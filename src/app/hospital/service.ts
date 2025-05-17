import dotenv from "dotenv"
dotenv.config();
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from "../../common/satusMessageCode";
import Handler from "../../common/handler";
import { Addresses } from "../../models/adresses";
import { Hospitals } from "../../models/hospital";

class HospitalService {

  async getHospitalService(req: any) {
    try {

      const find_hospitals = await Hospitals.findAll({
        include: [
          {
            model: Addresses,
            as: 'address',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ],
        order: [['createdAt', 'DESC']]
      })
      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "Hospital Data Get Successfully!", find_hospitals)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }

}

export default new HospitalService();
