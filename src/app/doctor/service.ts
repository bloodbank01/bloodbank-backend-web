import dotenv from "dotenv"
dotenv.config();
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from "../../common/satusMessageCode";
import Handler from "../../common/handler";
import { Addresses } from "../../models/adresses";
import { Doctors } from "../../models/doctor";
import { Profile } from "../../models/profile";
import { Hospitals } from "../../models/hospital";
import { Sequelize } from "sequelize";
const saltRoute = 10;

class DoctorService {
  async getDoctorService(req: any) {
    try {
      const { userId, type } = req
      let user: any = null;

      if (type != 'admin') {
        user = await Doctors.findOne({ where: { id: userId }, raw: true })
      }

      console.log("🚀 ~ DoctorService ~ getDoctorService ~ user:", user)

      const find_doctors = await Doctors.findAll({
        include: [
          {
            model: Profile,
            as: 'profile',
            attributes: {
              include: [
                [
                  Sequelize.literal(`CASE 
                    WHEN profile.profile_pic IS NOT NULL THEN CONCAT('${process.env.IMAGE_BASE_URL}', profile.profile_pic)
                    ELSE NULL 
                  END`),
                  'profile_pic'
                ]
              ]
            }
          },
          {
            model: Addresses,
            as: 'address'
          },
          {
            model: Hospitals,
            as: 'hospital',
            where: user ? { id: user.hospital_id } : {},
            required: user ? true : false
          }
        ],
        where: user ? {} : { admin_id: userId },
        order: [['createdAt', 'DESC']]
      })
      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "Doctors Data Get Successfully!", find_doctors)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }
}

export default new DoctorService();
