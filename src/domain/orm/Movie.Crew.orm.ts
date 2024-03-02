import { ErrorType } from "../../controller/types/ErrorType"
import { GenerOfMovieType } from "../../controller/types/GenerOfMovie"
import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"
import {CrewOfMovieType} from "../../controller/types/CrewOfMovieType"
import { PaginationType } from "../../controller/types/PaginationType"


/**
 * fcuncion para agregar un crew a una pelicula
 * @param crew implementa el tipo de dato CrewOfMovieType que es un objeto con los campos idCrew, idMovie, typeOfCrew
 * @returns  un CrewOfMovieType con la informacion agregada recien  o un errortype con el erro
 */
export const addCrewOfMovie=async(crew: CrewOfMovieType):Promise<CrewOfMovieType|ErrorType>=>{
    try{
      const result=await db.crewOfMovie.create({
        data:{
            idCrewOfPeople:crew.idCrew,
            idMovie:crew.idMovie,
            type:crew.typeOfCrew
        },
        select:{
            idcrewOfMovie:true,
            idCrewOfPeople:true,
            idMovie:true,
            type:true,
            created_at:true
        }
      })
      return {
        idCrewOfMovie:result.idcrewOfMovie,
        idMovie:result.idMovie,
        typeOfCrew:result.type,
        idCrew:result.idCrewOfPeople,
        created_at:result.created_at
      }
    }catch(e:any){
        return errorMesagge("Erro al agregar un nuevo registro en la tabla CrewOfMovie",e.message,500)
    }
}
/**
 * funcion para obtener todos los crew de una pelicula
 * @param idMovie id de la pelicula
 * @returns un array de CrewOfMovieType con la informacion de la tabla CrewOfMovie o un errortype con el error
 */

export const getCrewOfMovie=async(idMovie:number,page ?:number ,limit ?:number):Promise<Array<any>|ErrorType|PaginationType>=>{
    
    try{
        if(page && limit){
            const skip=(page-1)*limit
            const totalCrew:number=await db.crewOfMovie.count({
                where:{
                    idMovie:idMovie
                }
            })
            const totalpages=Math.ceil(totalCrew/limit)
            const result=await db.crewOfMovie.findMany({
                where:{
                    idMovie:idMovie
                },
                select:{
                    idcrewOfMovie:true,
                    idCrewOfPeople:true,
                    idMovie:true,
                    type:true,
                    created_at:true,
                    crewOfPeople:{
                        select:{
                            idCrewOfPeople:true,
                            name:true,
                            lastName:true,
                            created_at:true
                        }
                    }
                },
                orderBy:{
                    created_at:"desc"
            
                },
                skip:skip,
                take:limit
            })
            return{
                result:result,
                totalPage:totalpages,
                currentPage:page,
            } 
        }
        const result=await db.crewOfMovie.findMany({
            where:{
                idMovie:idMovie
            },
            select:{
                idcrewOfMovie:true,
                idCrewOfPeople:true,
                idMovie:true,
                type:true,
                created_at:true,
                crewOfPeople:{
                    select:{
                        idCrewOfPeople:true,
                        name:true,
                        lastName:true,
                        created_at:true
                    }
                }
            },
            orderBy:{
                created_at:"desc"
        
            }
        })
        return result
    }catch(e:any){
        return errorMesagge("Erro al obtener los registros de la tabla CrewOfMovie",e.message,500)
    }
}

/**
 *  funcion para eliminar un crew de una pelicula
 * @param idCrewOfMovie id del crew de la pelicula
 * @returns  un CrewOfMovieType con la informacion eliminada recien  o un errortype con el erro
 */

export const deleteCrewOfMovie=async(idCrewOfMovie:number):Promise<CrewOfMovieType|ErrorType>=>{
   try{
         const result=await db.crewOfMovie.delete({
              where:{
                idcrewOfMovie:idCrewOfMovie
              },
              select:{
                idcrewOfMovie:true,
                idCrewOfPeople:true,
                idMovie:true,
                type:true,
                created_at:true
              }
         })
         return {
              idCrewOfMovie:result.idcrewOfMovie,
              idMovie:result.idMovie,
              typeOfCrew:result.type,
              idCrew:result.idCrewOfPeople,
              created_at:result.created_at
         }
   }catch(e:any){
         return errorMesagge("Erro al agregar un nuevo registro en la tabla CrewOfMovie",e.message,500)
   }
}