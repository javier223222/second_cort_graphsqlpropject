import { db } from "../repositories/mysql.repo";
import { ErrorType } from "../../controller/types/ErrorType";
import { ActorType } from "../../controller/types/ActorType";
export const CreateActor=async(actor:ActorType):Promise<ActorType>=>{
    try{
       const result=await db.actor.create({
             data:{
                name:actor.name,
                lastName:actor.lastName,
                description:actor.description,
                ImageOfActor:{
                    create:{
                        urlImage:actor.image,
                        public_id:"re4445"
                    }
                }
             },
             select:{
                idActor:true,
                name:true,
                lastName:true,
                description:true,
                ImageOfActor:{
                    select:{
                        urlImage:true
                    }
                }
             }
       })

       return {
          idActor:result.idActor,
           name:result.name,
           lastName:result.lastName,
           description:result.description,
           image:result.ImageOfActor[0].urlImage

           
       }


    }catch(e:any){
     throw new Error(e.message)


    }


}


export const getActorUn=async(name:string,lastName:string):Promise<ActorType|false>=>{
    try{
        const result=await db.actor.findFirst({
            where:{
                name:name,
                lastName:lastName,
                
            },
            select:{
                idActor:true,
                name:true,
                lastName:true,
                description:true,
                ImageOfActor:{
                    select:{
                        urlImage:true
                    }
                }
            }
        })

        if(result){
            return {
                idActor:result!.idActor,
                name:result!.name,
                lastName:result!.lastName,
                description:result!.description,
                image:result!.ImageOfActor[0].urlImage
            }
            
        }
        return false

       

    }catch(e:any){
       throw new Error(e.message)
    }
}