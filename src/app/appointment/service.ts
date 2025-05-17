import dotenv from "dotenv"
dotenv.config();
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from "../../common/satusMessageCode";
import Handler from "../../common/handler";
import { Addresses } from "../../models/adresses";
import { Profile } from "../../models/profile";
import { Hospitals } from "../../models/hospital";
import { Sequelize } from "sequelize";
import { Appointment } from "../../models/appointment";
import { Doctors } from "../../models/doctor";
import { BloodGroup } from "../../models/blood_group";

class AppointmentService {

  async getAppointmentService(req: any) {
    try {

      const { userId } = req

      const find_appointments = await Appointment.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Hospitals,
            as: 'hospital',
            attributes: ['id', 'name']
          },
          {
            model: BloodGroup,
            as: 'blood_group',
            attributes: ['id', 'name']
          },
          {
            model: Doctors,
            as: 'doctor'
          },
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
          }
        ]
      })
      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "Appointment Data Get Successfully!", find_appointments)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }

  async createAppointmentService(req: any) {
    try {
      const { userId } = req
      const { first_name, last_name, phone_no, hospital_id, message, blood_id } = req.body
      const request_type = await Handler.capitalizeFirstLetter(req.body.request_type)

      let obj: any = { user_id: userId, first_name, last_name, phone_no, hospital_id, message, request_type, blood_id }

      const appointment = await Appointment.create(obj)
      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "Our Team Will Contact You Soon!", appointment)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }

  async deleteAppointmentService(req: any) {
    try {
      const { id } = req.params

      if (!id) {
        return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC400, "Id Require!")
      }

      const find_appointment = await Appointment.findOne({
        where: { id }
      })

      if (!find_appointment) {
        return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC400, "Appointment Not Found!")
      }

      await find_appointment.destroy()
      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "Appointment Delete Successfully!", null)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }

}

export default new AppointmentService();
