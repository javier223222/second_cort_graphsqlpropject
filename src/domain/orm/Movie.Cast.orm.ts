
import { get } from "http"
import { CastType } from "../../controller/types/CastType"

import { ErrorType } from "../../controller/types/ErrorType"

import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"
import { PaginationType } from "../../controller/types/PaginationType"
import { ActorType } from "../../controller/types/ActorType"


export const addCast = async(castTy:CastType):Promise<CastType|ErrorType>=>{
    try{
 
    const result=await db.cast.create({
         data:{
           idActor:castTy.idActor,
           idMovie:castTy.idMovie
         },
         select:{
             idActor:true,
             idMovie:true,
             idCast:true,
             created_at:true
         }
     })
 
     return {
         idActor:result.idActor,
         idMovie:result.idMovie,
         idCast:result.idCast,
         created_at:result.created_at
         
     
     }
 
 
 
    }catch(e:any){
          return errorMesagge("Erro al agregar un nuevo registro en la tabla Cast",e.message,500)
    }
 
 }
 /**
  * funcion para agregar un director a le pelicula
  * @param directInfo implementa el tipo de dato DirectorToMovieType que es un objeto con los campos idDirector y idMovie
  * @returns  un DirectorToMovieType con la informacion agregada recien  o un errortype con el erro
  */

/**
 * 
 * @param idMovie  id de la pelicula
 * @returns un array de CastType con la informacion de la tabla Cast o un errortype con el error
 */
 export const getCast=async(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|ErrorType|PaginationType>=>{
    try{

        if(page && limit){
            const skip=(page-1)*limit
            const totalCast:number=await db.cast.count({
                where:{
                    idMovie:idMovie
                }
            })
            const totalpages=Math.ceil(totalCast/limit)
            const result=await db.cast.findMany({
                skip:skip,
                take:limit,
                where:{
                    idMovie:idMovie
                },
                select:{
                    idActor:true,
                    idMovie:true,
                    idCast:true,
                    created_at:true,
                    actor:{
                        select:{
                            idActor:true,
                            name:true,
                            lastName:true,
                            created_at:true,
                            ImageOfActor:{
                                select:{
                                    idActor:true,
                                    idActorImg:true,
                                    urlImage:true,
                                    created_at:true
                                }
                            }
                        
                        }
                        
                    }
                },
                orderBy:{
                    created_at:"desc"
                }
            })
            return {
                totalPage:totalpages,
                currentPage:page,
                result:result
            
            }
        }
            const result=await db.cast.findMany({
                where:{
                    idMovie:idMovie
                },
                select:{
                    idActor:true,
                    idMovie:true,
                    idCast:true,
                    created_at:true,
                    actor:{
                        select:{
                            idActor:true,
                            name:true,
                            lastName:true,
                            created_at:true,
                            ImageOfActor:{
                                select:{
                                    idActor:true,
                                    idActorImg:true,
                                    urlImage:true,
                                    created_at:true
                                }
                            }
                        
                        }
                        
                    }
                },
                orderBy:{
                    created_at:"desc"
                }
            })
            return result
        
    }catch(e:any){
        return errorMesagge("Erro al obtener los registros de la tabla Cast",e.message,500)
    }
 }
 /**
  * 
  * @param idCastOfmovie id del registro de la tabla Cast
  * @returns  un CastType con la informacion eliminada recien  o un errortype con el error
  */

 export const deleteCast=async(idCastOfmovie:number):Promise<ActorType>=>{
    try{
        const result=await db.cast.delete({
            where:{
                idCast:idCastOfmovie
            },
            select:{
                idActor:true,
                idMovie:true,
                idCast:true,
                created_at:true,
                actor:{
                    select:{
                        name:true,
                        lastName:true,
                        description:true,
                        ImageOfActor:{
                            select:{
                                urlImage:true
                            }
                        }
                    }
                }
            }
        })
        return {
           name:result.actor.name,
           lastName:result.actor.lastName,
           image:result.actor.ImageOfActor[0].urlImage ,
           description:result.actor.description 
           
     }

    }catch(e:any){
         throw new  Error(e.message)
    }

 }