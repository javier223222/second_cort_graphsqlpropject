import { TypeEvent, WebHpoksType, WebHpoksTypeEvent } from "../../controller/types/WebHpoksType";
import { db } from "../repositories/mysql.repo";

export const createWebHoks= async (webHooData:WebHpoksType):Promise<WebHpoksType>=>{
     try{
        const webHoks = await db.weebHook.create({
            data:{
                idUser: webHooData.idUser,
                url:webHooData.url,

            },
            select:{
                idWeebHook:true,
                idUser:true,
                url:true
            }
        })

        return {
            idWeebHook:webHoks.idWeebHook,
            idUser:webHoks.idUser,
            url:webHoks.url
        }

     }catch(e:any){
       throw new Error(e.message)
     }
}


export const addWebHoks= async (webHooEvent:WebHpoksTypeEvent):Promise<WebHpoksTypeEvent>=>{

    try{
        const webHoks = await db.weebHookSucriptionP.create({
            data:{
                idWeebHook:webHooEvent.idWeebHook,
                idTypeEvent:webHooEvent.idTypeEvent
            },
            select:{
                idWeebHook:true,
                idTypeEvent:true
            }
        })
        return {
            idWeebHook:webHoks.idWeebHook,
            idTypeEvent:webHoks.idTypeEvent
        }
      
    }catch(e:any){
        throw new Error(e.message)
    }
}
export const createNewTypeEvent= async (typeEvent:TypeEvent):Promise<TypeEvent>=>{
    try{
        const result=await db.typeEvent.create({
            data:{
                name:typeEvent.name
            },
            select:{
                idTypeEvent:true,
                name:true
            }
        })
        return {
            idTypeEvent:result.idTypeEvent,
            name:result.name
        }
    }catch(e:any){
        throw new Error(e.message)
    
    }

}

export const searchWebHoksType= async (name:string):Promise<TypeEvent|null>=>{
   try{
    const result=await db.typeEvent.findFirst({
        where:{
            name:name
        },
        select:{
            idTypeEvent:true,
            name:true
        }
    })
    if(result?.idTypeEvent){
        return {
            idTypeEvent:result?.idTypeEvent||0,
            name:result?.name||""
        }
    }
   return  null

   }catch(e:any){
       throw new Error(e.message)
   }
}

export const getAllTypesEvent= async ():Promise<Array<any>>=>{
    try{

        const result=await db.typeEvent.findMany({
            select:{
                idTypeEvent:true,
                
            }
        })
        return result
    }catch(e:any){
        throw new Error(e.message)
    }


}



