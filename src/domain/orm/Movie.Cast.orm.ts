
import { get } from "http"
import { CastType } from "../../controller/types/CastType"

import { ErrorType } from "../../controller/types/ErrorType"

import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"


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
 export const getCast=async(idMovie:number):Promise<Array<any>|ErrorType>=>{
    try{
            const result=await db.cast.findMany({
                where:{
                    idMovie:idMovie
                },
                select:{
                    idActor:true,
                    idMovie:true,
                    idCast:true,
                    created_at:true
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

 export const deleteCast=async(idCastOfmovie:number):Promise<CastType|ErrorType>=>{
    try{
        const result=await db.cast.delete({
            where:{
                idCast:idCastOfmovie
            }
        })
        return {
            idActor:result.idActor,
            idMovie:result.idMovie,
            idCast:result.idCast,
            created_at:result.created_at
        }

    }catch(e:any){
        return errorMesagge("Erro al obtener los registros de la tabla Cast",e.message,500)
    }

 }