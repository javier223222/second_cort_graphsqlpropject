import { addWebHoks, createNewTypeEvent, createWebHoks, getAllTypesEvent, searchWebHoksType } from "../domain/orm/WeebHoks.orm";
import { ITypeEventController } from "./interfaces";

export class TypeEventController implements ITypeEventController{
    public async addTypeEvent(url: string, idUser: number, type: string[],allType?:boolean): Promise<string> {
        if(allType){
            try{
                const createWeb=await createWebHoks({
                    
                     idUser:idUser,
                        url:url
                })

                const result =await getAllTypesEvent()
                for (let index = 0; index < result.length; index++) {
                    let element = result[index];
                    const addWeEvent=await addWebHoks({
                        idWeebHook:createWeb.idWeebHook||0,
                        idTypeEvent:element.idTypeEvent
                    })
                }

                return "webHook created with all type of events"
            }catch(e:any){
                throw new Error(e.message)
            }
        }
        
        try{
            const createWeb=await createWebHoks({
                
                 idUser:idUser,
                    url:url
            })


           for (let index = 0; index < type.length; index++) {
            let element = type[index];
            const result =await searchWebHoksType(element.toLowerCase())
            if(!result){
                const newType=await createNewTypeEvent({
                    idTypeEvent:0,
                    name:element.toLowerCase()
                })
                const addWeEvent=await addWebHoks({
                    idWeebHook:createWeb.idWeebHook||0,
                    idTypeEvent:newType.idTypeEvent
                })


            }
            const addWeEvent=await addWebHoks({
                idWeebHook:createWeb.idWeebHook||0,
                idTypeEvent:result?.idTypeEvent||0
            })


            
           }
           return "webHook created"


        }catch(e:any){
            throw new Error(e.message)
        }
    }
}