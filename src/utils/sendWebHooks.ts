import axios from "axios";
import { db } from "../domain/repositories/mysql.repo"

export const responseAll=async(nameEvent:string,content:any)=>{
      const evewnId=await db.typeEvent.findFirst({
        where:{
            name:nameEvent
        },
        select:{
            idTypeEvent:true
        }
      })
    const result=await db.weebHookSucriptionP.findMany({
        where:{
            typeEvent:{
                 idTypeEvent:evewnId?.idTypeEvent
            }
        },
        select:{
            weebHook:{
                select:{
                    url:true
                }
            }
        }
    })

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
       await axios.post(element.weebHook.url,{
          content:content
       })
    }
}