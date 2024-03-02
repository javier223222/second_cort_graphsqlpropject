import { AnotherLenguagesType } from "../../controller/types/AnotherLenguages"

import { ErrorType } from "../../controller/types/ErrorType"
import { PaginationType } from "../../controller/types/PaginationType"

import { errorMesagge } from "../../utils/ErroMessage"
import { db } from "../repositories/mysql.repo"





/**
 *  funcion para agregar otro lenguaje a una pelicula
 * @param anotherLenguaj implementa el tipo de dato AnotherLenguagesType que es un objeto con los campos idLenguage y idMovie
 * @returns   un AnotherLenguagesType con la informacion agregada recien  o un errortype con el erro
 */

export const addAnotherLenguage =async(anotherLenguaj:AnotherLenguagesType):Promise<AnotherLenguagesType|ErrorType>=>{
    try{
        const result=await db.anotherLenguageOfMovie.create({
            data:{
                idLenguage:anotherLenguaj.idLenguage,
                idMovie:anotherLenguaj.idMovie
            },
            select:{
                idLenguage:true,
                idMovie:true,
                idAnotherLenguageOfMovie:true,
                created_at:true
            }
        })
        return {
             idLenguage:result.idLenguage,
            idMovie:result.idMovie,
            idAnotherLenguages:result.idAnotherLenguageOfMovie,
            created_at:result.created_at
        }
    }catch(e:any){
        return errorMesagge("Erro al agregar un nuevo registro en la tabla AnotherLenguages",e.message,500)
    }
}

/**
 * funcion para obtener todos los registros de la tabla AnotherLenguages
 * @returns  un array de AnotherLenguagesType con la informacion de la tabla AnotherLenguages o un errortype con el error
 */
export const getAnotherLenguages=async(idMovie:number,page ?:number,limit ?:number):Promise<Array<any>|ErrorType|PaginationType>=>{
   try{

     if(page && limit){
        const skip=(page-1)*limit
        const totallenguges:number=await db.anotherLenguageOfMovie.count({
            where:{
                idMovie:idMovie
            }
        })
        const totalpages=Math.ceil(totallenguges/limit)
        const result=await db.anotherLenguageOfMovie.findMany({
            skip:skip,
            take:limit,
            where:{
                idMovie:idMovie
            },
            orderBy:{
              created_at:"desc"
            },
            select:{
                idLenguage:true,
                idMovie:true,
                idAnotherLenguageOfMovie:true,
                created_at:true,
                lenguage:{
                    select:{
                        idLenguageTalked:true,
                        name:true,
                    }
                }
              }
        })

        return {

            totalPage:totalpages,
            currentPage:page,
            result:result
        
        }
     }
         const result=await db.anotherLenguageOfMovie.findMany({
              where:{
                idMovie:idMovie
              },
              select:{
                idLenguage:true,
                idMovie:true,
                idAnotherLenguageOfMovie:true,
                created_at:true,
                lenguage:{
                    select:{
                        idLenguageTalked:true,
                        name:true,
                    }
                }
              },
              orderBy:{
                created_at:"desc"
              }
         })

         return result

   }catch(e:any){
         return errorMesagge("Erro al obtener los registros de la tabla AnotherLenguages",e.message,500)
   }
}

/**
 * 
 * @param idAnotherLenguageOfMovie recibe el id del registro de la tabla AnotherLenguages que se desea eliminar
 * @returns   un AnotherLenguagesType con la informacion eliminada recien  o un errortype con el error
 */

export const deleteAnotherLenguage=async(idAnotherLenguageOfMovie:number):Promise<AnotherLenguagesType|ErrorType>=>{
     try{
        const result=await db.anotherLenguageOfMovie.delete({
            where:{
                idAnotherLenguageOfMovie:idAnotherLenguageOfMovie

            },
            select:{
                idAnotherLenguageOfMovie:true,
                idMovie:true,
                idLenguage:true,
            }
        })
        return {
            idAnotherLenguages:result.idAnotherLenguageOfMovie,
            idMovie:result.idMovie,
            idLenguage:result.idLenguage
        }

     }catch(e:any){
            return errorMesagge("Erro al eliminar un registro en la tabla AnotherLenguages",e.message,500)
     }
}



