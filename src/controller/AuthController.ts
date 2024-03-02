import { getUser } from "../domain/orm/User.orm";
import { generateToken } from "../middlewares";
import { IAuthController } from "./interfaces";
import { LoginResponse } from "./types/LoginResponse";
import { UserLogin, UserType } from "./types/UserType";
import bcrypt from "bcrypt"

export default class AuthController implements IAuthController {
 public async login(user: UserLogin): Promise<LoginResponse> {
    try{
        const result:UserType=await getUser(user.gmail)
        if(bcrypt.compareSync(user.password,result.password) ) {
            const token=await generateToken({
                id:result.id,
                username:result.username,
                gmail:result.gmail
            })
            return {
                status:200,
                message:"Login success",
                token:token
                
            }
        }

        return {
            message:"Error al iniciar sesion",
            status:401
        }
        
         
    }catch(e:any){
        return {
            message:"Error al iniciar sesion",
            status:500
        }
    }
     
 }
}