import { ErrorType } from "../../controller/types/ErrorType";
import { UserType, userNotSensitive } from "../../controller/types/UserType";
import { db } from "../repositories/mysql.repo";


export const createNewUser=async (user:UserType):Promise<userNotSensitive|ErrorType>=>{
  try{



    const result=await db.user.create({
        data:{
            username:user.username,
            gmail:user.gmail,
            password:user.password
        },
        select:{
            username:true,
            gmail:true
        }
    })
    return {
        username:result.username,
        gmail:result.gmail
    }

  }catch(e:any){
    console.log(e.message)
    return {
        message:"Error al crrear el usuario",
        error:e.message,
        status:500
    }
  }
}

export const getUser=async(gmail:string):Promise<UserType>=>{
    try{
        const user=await db.user.findUnique({
            where:{
                gmail:gmail
            },
            select:{
                id:true,
                username:true,
                gmail:true,
                password:true
            }
        })
        if(!user?.id){
            throw new Error("User not found")
        }
         return user as UserType
        
     
    }catch(e:any){
        throw new Error(e.message)
    }
}