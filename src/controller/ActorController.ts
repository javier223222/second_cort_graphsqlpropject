import { CreateActor, getActorUn } from "../domain/orm/Actor.orm";
import { addCast, deleteCast } from "../domain/orm/Movie.Cast.orm";
import { IActorController } from "./interfaces";
import { ActorType } from "./types/ActorType";
import { ErrorType } from "./types/ErrorType";

export default class ActorController implements IActorController{
   public async addActor(actor: ActorType,idMovie:number): Promise<ActorType> {
       try{
        console.log("ss")
          const search=await getActorUn(actor.name,actor.lastName)
          console.log(search)
          if(search){
              const result=await addCast({
                idActor:search.idActor||1,
                idMovie:idMovie
              })
                return search
          }
          

          const  actorCreat:ActorType=await CreateActor({
                name:actor.name.toLowerCase(),
                lastName:actor.lastName.toLowerCase(),
                description:actor.description,
                image:actor.image
          })
        
            const result=await addCast({
                    idActor:actorCreat.idActor || 1,
                    idMovie:idMovie
            })

            return actorCreat as ActorType



       }catch(e:any){
        console.log(e.message)
        
         throw new Error(e.message)
       }
    }
   public async deletActor(idCast: number): Promise<ActorType> {
        try{
          const result:ActorType=await deleteCast(idCast)
          return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}