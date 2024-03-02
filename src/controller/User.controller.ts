import { createNewUser } from "../domain/orm/User.orm";
import { IUserController } from "./interfaces";
import { ErrorType } from "./types/ErrorType";
import { UserType, userNotSensitive } from "./types/UserType";
import bycrypt from "bcrypt"
export default class UserController implements IUserController {
   public async createUser(user: UserType): Promise<userNotSensitive | ErrorType> {
        try{
          let password:string= bycrypt.hashSync(user.password,10)
          const result=await createNewUser({
              username:user.username,
              gmail:user.gmail,
              password:password
          })

           return result as userNotSensitive

        }catch(e:any){
            return {
                message:"Error al crrear el usuario",
                error:e.message,
                status:500
            }
        }
    }
}


