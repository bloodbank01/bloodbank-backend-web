import dotenv from "dotenv"
dotenv.config();
import { RES_MESSAGE, RES_STATUS, STATUS_CODE } from "../../common/satusMessageCode";
import Handler from "../../common/handler";
import { Contacts } from "../../models/contact";

class ContactService {

  async createContactService(req: any) {
    try {
      const { first_name, last_name, email, phone_no, message } = req.body

      let obj:any = { first_name, last_name, email, phone_no, message }
      const contact = await Contacts.create(obj)

      return Handler.Success(RES_STATUS.E1, STATUS_CODE.EC200, "Query Sended Successfully!", null)

    } catch (error: any) {
      console.log('Error :- ', error)
      return Handler.Error(RES_STATUS.E2, STATUS_CODE.EC500, RES_MESSAGE.EM500)
    }
  }

}

export default new ContactService();
